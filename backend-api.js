// ProfitLens AI - Backend API Client

const API_BASE_URL = 'http://localhost:3000/api';

class BackendAPI {
    constructor() {
        this.baseUrl = API_BASE_URL;
    }

    // Helper method for API calls
    async request(endpoint, options = {}) {
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'API request failed');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // ===== AUTHENTICATION =====

    async register(userData) {
        return this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    }

    async login(credentials) {
        return this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
    }

    async updateProfile(userId, updates) {
        return this.request(`/auth/profile/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(updates)
        });
    }

    // ===== CLAUDE API =====

    async analyzeWithClaude(systemPrompt, userMessage, userId, analysisType) {
        return this.request('/claude/analyze', {
            method: 'POST',
            body: JSON.stringify({
                systemPrompt,
                userMessage,
                userId,
                analysisType
            })
        });
    }

    // ===== CHATBOT =====

    async sendChatMessage(message, language, userId, conversationId) {
        return this.request('/chatbot/message', {
            method: 'POST',
            body: JSON.stringify({
                message,
                language,
                userId,
                conversationId
            })
        });
    }

    async getConversation(conversationId) {
        return this.request(`/chatbot/conversation/${conversationId}`);
    }

    // ===== CONTACT =====

    async submitContact(contactData) {
        return this.request('/contact', {
            method: 'POST',
            body: JSON.stringify(contactData)
        });
    }

    // ===== ANALYTICS =====

    async getUserAnalytics(userId) {
        return this.request(`/analytics/${userId}`);
    }

    // ===== HEALTH CHECK =====

    async checkHealth() {
        return this.request('/health');
    }
}

// Create global instance
const backendAPI = new BackendAPI();

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BackendAPI, backendAPI };
}
