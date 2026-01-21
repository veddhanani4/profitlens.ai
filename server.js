// ProfitLens AI - Backend Server
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Data storage paths
const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const ANALYSES_FILE = path.join(DATA_DIR, 'analyses.json');
const CONVERSATIONS_FILE = path.join(DATA_DIR, 'conversations.json');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');

// Initialize data directory and files
async function initializeDataStorage() {
    try {
        await fs.mkdir(DATA_DIR, { recursive: true });

        const files = [
            { path: USERS_FILE, default: [] },
            { path: ANALYSES_FILE, default: [] },
            { path: CONVERSATIONS_FILE, default: [] },
            { path: CONTACTS_FILE, default: [] }
        ];

        for (const file of files) {
            try {
                await fs.access(file.path);
            } catch {
                await fs.writeFile(file.path, JSON.stringify(file.default, null, 2));
            }
        }

        console.log('✅ Data storage initialized');
    } catch (error) {
        console.error('❌ Error initializing data storage:', error);
    }
}

// Helper functions for data persistence
async function readJSON(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error reading ${filePath}:`, error);
        return [];
    }
}

async function writeJSON(filePath, data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error(`Error writing ${filePath}:`, error);
        return false;
    }
}

// ===== AUTHENTICATION ENDPOINTS =====

// Register new user
app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password, fullName, businessName } = req.body;

        const users = await readJSON(USERS_FILE);

        // Check if user exists
        if (users.find(u => u.email === email)) {
            return res.status(400).json({ success: false, error: 'Email already registered' });
        }

        // Create new user
        const newUser = {
            id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            email,
            password, // In production, use bcrypt to hash passwords
            fullName,
            businessName: businessName || '',
            plan: 'free',
            createdAt: new Date().toISOString(),
            usage: {
                profitAnalysis: 0,
                electricityAnalysis: 0
            }
        };

        users.push(newUser);
        await writeJSON(USERS_FILE, users);

        const { password: _, ...userWithoutPassword } = newUser;
        res.json({ success: true, user: userWithoutPassword });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// Login user
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const users = await readJSON(USERS_FILE);
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        const { password: _, ...userWithoutPassword } = user;
        res.json({ success: true, user: userWithoutPassword });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// Update user profile
app.put('/api/auth/profile/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const updates = req.body;

        const users = await readJSON(USERS_FILE);
        const userIndex = users.findIndex(u => u.id === userId);

        if (userIndex === -1) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        users[userIndex] = { ...users[userIndex], ...updates };
        await writeJSON(USERS_FILE, users);

        const { password: _, ...userWithoutPassword } = users[userIndex];
        res.json({ success: true, user: userWithoutPassword });
    } catch (error) {
        console.error('Profile update error:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// ===== CLAUDE API PROXY =====

app.post('/api/claude/analyze', async (req, res) => {
    try {
        const { systemPrompt, userMessage, userId } = req.body;

        if (!process.env.ANTHROPIC_API_KEY) {
            return res.status(500).json({
                success: false,
                error: 'API key not configured on server'
            });
        }

        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 4096,
                system: systemPrompt,
                messages: [{ role: 'user', content: userMessage }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'API request failed');
        }

        const data = await response.json();
        const content = data.content?.[0]?.text || '';

        // Save analysis
        if (userId) {
            const analyses = await readJSON(ANALYSES_FILE);
            analyses.push({
                id: `analysis_${Date.now()}`,
                userId,
                timestamp: new Date().toISOString(),
                type: req.body.analysisType || 'unknown',
                content,
                usage: data.usage
            });
            await writeJSON(ANALYSES_FILE, analyses);
        }

        res.json({
            success: true,
            content,
            usage: {
                inputTokens: data.usage?.input_tokens || 0,
                outputTokens: data.usage?.output_tokens || 0,
                totalTokens: (data.usage?.input_tokens || 0) + (data.usage?.output_tokens || 0)
            }
        });
    } catch (error) {
        console.error('Claude API error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// ===== CHATBOT ENDPOINT =====

app.post('/api/chatbot/message', async (req, res) => {
    try {
        const { message, language, userId, conversationId } = req.body;

        if (!process.env.ANTHROPIC_API_KEY) {
            return res.status(500).json({
                success: false,
                error: 'API key not configured'
            });
        }

        // Load conversation history
        const conversations = await readJSON(CONVERSATIONS_FILE);
        let conversation = conversations.find(c => c.id === conversationId);

        if (!conversation) {
            conversation = {
                id: conversationId || `conv_${Date.now()}`,
                userId,
                language,
                messages: [],
                createdAt: new Date().toISOString()
            };
            conversations.push(conversation);
        }

        // Build conversation context
        const conversationHistory = conversation.messages.slice(-10).map(msg => ({
            role: msg.role,
            content: msg.content
        }));

        // System prompt for chatbot
        const systemPrompt = `You are ProfitLens AI Assistant, a helpful and knowledgeable business advisor specializing in:
- Profit leak detection and cost optimization
- Electricity bill analysis and overcharge detection
- Business intelligence for SMBs
- Financial advice and savings strategies

Your personality:
- Professional yet friendly and approachable
- Patient and understanding
- Explain complex concepts simply
- Provide actionable advice
- Encourage users to use the analysis features

Capabilities:
- Answer questions about profit leaks, cost optimization, electricity bills
- Explain how to use ProfitLens AI features
- Provide business advice and best practices
- Help troubleshoot issues
- Guide users through the platform

Language: Respond in ${language === 'hi' ? 'Hindi' : language === 'zh' ? 'Chinese' : language === 'id' ? 'Indonesian' : 'English'}.

Be concise but thorough. Use bullet points for clarity. Always be helpful and encouraging.`;

        // Call Claude API
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-sonnet-4-20250514',
                max_tokens: 1024,
                system: systemPrompt,
                messages: [
                    ...conversationHistory,
                    { role: 'user', content: message }
                ]
            })
        });

        if (!response.ok) {
            throw new Error('Chatbot API request failed');
        }

        const data = await response.json();
        const botResponse = data.content?.[0]?.text || 'Sorry, I could not process your request.';

        // Save conversation
        conversation.messages.push(
            { role: 'user', content: message, timestamp: new Date().toISOString() },
            { role: 'assistant', content: botResponse, timestamp: new Date().toISOString() }
        );
        conversation.updatedAt = new Date().toISOString();

        await writeJSON(CONVERSATIONS_FILE, conversations);

        res.json({
            success: true,
            response: botResponse,
            conversationId: conversation.id,
            usage: data.usage
        });
    } catch (error) {
        console.error('Chatbot error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get conversation history
app.get('/api/chatbot/conversation/:conversationId', async (req, res) => {
    try {
        const { conversationId } = req.params;
        const conversations = await readJSON(CONVERSATIONS_FILE);
        const conversation = conversations.find(c => c.id === conversationId);

        if (!conversation) {
            return res.status(404).json({ success: false, error: 'Conversation not found' });
        }

        res.json({ success: true, conversation });
    } catch (error) {
        console.error('Get conversation error:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// ===== CONTACT FORM ENDPOINT =====

app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message, userId } = req.body;

        const contacts = await readJSON(CONTACTS_FILE);

        const newContact = {
            id: `contact_${Date.now()}`,
            userId: userId || null,
            name,
            email,
            subject,
            message,
            status: 'new',
            createdAt: new Date().toISOString()
        };

        contacts.push(newContact);
        await writeJSON(CONTACTS_FILE, contacts);

        res.json({ success: true, message: 'Contact form submitted successfully' });
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// ===== ANALYTICS ENDPOINTS =====

// Get user analytics
app.get('/api/analytics/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const analyses = await readJSON(ANALYSES_FILE);
        const userAnalyses = analyses.filter(a => a.userId === userId);

        const stats = {
            totalAnalyses: userAnalyses.length,
            profitAnalyses: userAnalyses.filter(a => a.type === 'profit').length,
            electricityAnalyses: userAnalyses.filter(a => a.type === 'electricity').length,
            recentAnalyses: userAnalyses.slice(-5).reverse()
        };

        res.json({ success: true, stats });
    } catch (error) {
        console.error('Analytics error:', error);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

// ===== HEALTH CHECK =====

app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        apiConfigured: !!process.env.ANTHROPIC_API_KEY
    });
});

// ===== START SERVER =====

async function startServer() {
    await initializeDataStorage();

    app.listen(PORT, () => {
        console.log(`
╔════════════════════════════════════════╗
║     ProfitLens AI Backend Server      ║
╚════════════════════════════════════════╝

✅ Server running on: http://localhost:${PORT}
✅ Data storage: ${DATA_DIR}
✅ API Key configured: ${process.env.ANTHROPIC_API_KEY ? 'Yes' : 'No'}

Endpoints:
  POST /api/auth/register
  POST /api/auth/login
  PUT  /api/auth/profile/:userId
  POST /api/claude/analyze
  POST /api/chatbot/message
  GET  /api/chatbot/conversation/:conversationId
  POST /api/contact
  GET  /api/analytics/:userId
  GET  /api/health

Frontend: Open index.html in your browser
    `);
    });
}

startServer();
