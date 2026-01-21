# 🚀 Backend Setup Guide

## Complete Setup Instructions for ProfitLens AI with Backend

This guide will help you set up the complete ProfitLens AI application with backend server, persistent storage, and AI chatbot.

---

## 📋 Prerequisites

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **Anthropic API Key** - [Get from Anthropic Console](https://console.anthropic.com/)
- **Text Editor** (VS Code, Sublime, etc.)
- **Modern Web Browser** (Chrome, Firefox, Safari, Edge)

---

## 🛠️ Step-by-Step Setup

### Step 1: Install Node.js Dependencies

Open a terminal in the project directory and run:

```bash
npm install
```

This will install:
- `express` - Web server framework
- `cors` - Cross-origin resource sharing
- `body-parser` - Request body parsing
- `dotenv` - Environment variable management

### Step 2: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   copy .env.example .env
   ```

2. Open `.env` in a text editor

3. Add your Anthropic API key:
   ```
   ANTHROPIC_API_KEY=sk-ant-your-api-key-here
   PORT=3000
   ```

4. Save the file

### Step 3: Start the Backend Server

Run the server:

```bash
npm start
```

You should see:
```
╔════════════════════════════════════════╗
║     ProfitLens AI Backend Server      ║
╚════════════════════════════════════════╝

✅ Server running on: http://localhost:3000
✅ Data storage: C:\Users\A\Downloads\antigravity\data
✅ API Key configured: Yes
```

**Keep this terminal window open!** The server needs to run while you use the application.

### Step 4: Open the Application

1. Open a **new terminal window** (keep the server running in the first one)

2. Open `index.html` in your browser:
   - **Option A**: Double-click `index.html`
   - **Option B**: Right-click → Open with → Your Browser
   - **Option C**: Use a local file server (see below)

### Step 5: Test the Application

1. **Sign Up**: Create a new account
2. **Analyze Profit Leaks**: Enter business data and get AI analysis
3. **Analyze Electricity Bill**: Enter bill data and detect overcharges
4. **Try the Chatbot**: Go to Contact page and chat with the AI assistant
5. **Switch Languages**: Use the language selector to test multi-language support

---

## 🗂️ Data Storage

The backend automatically creates a `data` folder with JSON files:

```
data/
├── users.json          # User accounts
├── analyses.json       # Profit & electricity analyses
├── conversations.json  # Chatbot conversations
└── contacts.json       # Contact form submissions
```

All data is **persisted** and survives server restarts!

---

## 🤖 Chatbot Features

The AI chatbot can:
- ✅ Answer questions about profit leaks and cost optimization
- ✅ Explain electricity bill analysis
- ✅ Guide users through the platform
- ✅ Provide business advice
- ✅ Respond in 4 languages (EN, HI, ZH, ID)
- ✅ Remember conversation context
- ✅ Store conversation history

**Access the chatbot:**
1. Click the 💬 button in the bottom-right corner
2. Or visit the Contact page

---

## 📡 API Endpoints

The backend provides these endpoints:

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `PUT /api/auth/profile/:userId` - Update profile

### Analysis
- `POST /api/claude/analyze` - Analyze with Claude AI

### Chatbot
- `POST /api/chatbot/message` - Send chat message
- `GET /api/chatbot/conversation/:id` - Get conversation history

### Contact
- `POST /api/contact` - Submit contact form

### Analytics
- `GET /api/analytics/:userId` - Get user analytics

### Health
- `GET /api/health` - Check server status

---

## 🔧 Development Mode

For development with auto-restart on file changes:

```bash
npm run dev
```

This uses `nodemon` to automatically restart the server when you edit files.

---

## 🌐 Frontend-Backend Connection

The frontend automatically connects to the backend:

1. **Backend Available**: All API calls go through the backend (secure)
2. **Backend Unavailable**: Falls back to localStorage (development only)

The connection is handled by `backend-api.js` which provides:
- Automatic retry logic
- Error handling
- Fallback mechanisms

---

## 🔒 Security Features

### Current Implementation
- ✅ API key stored securely on server (not exposed to client)
- ✅ All Claude API calls proxied through backend
- ✅ User data persisted in JSON files
- ✅ CORS enabled for local development

### Production Recommendations
- 🔐 Use a real database (PostgreSQL, MongoDB)
- 🔐 Implement proper password hashing (bcrypt)
- 🔐 Add JWT authentication
- 🔐 Enable HTTPS
- 🔐 Add rate limiting
- 🔐 Implement input validation
- 🔐 Add CSRF protection

---

## 🐛 Troubleshooting

### Server won't start

**Error**: `Cannot find module 'express'`
**Solution**: Run `npm install`

**Error**: `Port 3000 already in use`
**Solution**: Change PORT in `.env` to 3001 or kill the process using port 3000

### API calls failing

**Error**: `API key not configured`
**Solution**: Make sure `.env` file exists with valid ANTHROPIC_API_KEY

**Error**: `CORS error`
**Solution**: Make sure the backend server is running

### Chatbot not responding

**Check**:
1. Backend server is running
2. API key is configured in `.env`
3. Browser console for errors (F12)

### Data not persisting

**Check**:
1. `data` folder exists
2. Server has write permissions
3. Check server console for errors

---

## 📊 Testing the Complete System

### Test 1: User Registration & Login
1. Sign up with a new email
2. Check `data/users.json` - your user should be there
3. Logout and login again
4. Data should persist

### Test 2: Profit Analysis
1. Login and go to Profit Analyzer
2. Enter business data and analyze
3. Check `data/analyses.json` - analysis should be saved
4. Refresh page - usage stats should persist

### Test 3: Chatbot
1. Go to Contact page
2. Click the chatbot button
3. Send a message
4. Check `data/conversations.json` - conversation should be saved
5. Refresh and continue conversation - context should be maintained

### Test 4: Multi-Language
1. Switch to Hindi using language selector
2. Use the chatbot - it should respond in Hindi
3. Switch to Chinese - chatbot should respond in Chinese
4. All UI elements should translate

---

## 🚀 Deployment

### Deploy Backend (Recommended: Railway, Render, Heroku)

1. **Railway**:
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login and deploy
   railway login
   railway init
   railway up
   ```

2. **Set environment variables** on the platform:
   - `ANTHROPIC_API_KEY=your-key`
   - `PORT=3000`

3. **Update frontend**: Change `API_BASE_URL` in `backend-api.js` to your deployed URL

### Deploy Frontend (Vercel, Netlify, GitHub Pages)

1. **Update `backend-api.js`**:
   ```javascript
   const API_BASE_URL = 'https://your-backend.railway.app/api';
   ```

2. **Deploy**:
   ```bash
   # Vercel
   vercel
   
   # Netlify
   netlify deploy
   ```

---

## 📝 File Structure

```
antigravity/
├── server.js              # Backend server
├── package.json           # Node.js dependencies
├── .env                   # Environment variables (create this)
├── .env.example           # Environment template
├── backend-api.js         # Frontend-backend connector
├── data/                  # Persistent storage (auto-created)
│   ├── users.json
│   ├── analyses.json
│   ├── conversations.json
│   └── contacts.json
├── index.html             # Landing page
├── auth.html              # Login/Signup
├── profit-analyzer.html   # Profit analyzer
├── electricity-analyzer.html # Electricity analyzer
├── contact.html           # Contact page with chatbot
├── styles.css             # Design system
├── config.js              # App configuration
├── utils.js               # Utilities
├── translations.js        # Multi-language
├── components.js          # UI components
├── prompts.js             # Claude prompts
├── claude-api.js          # Claude integration
├── auth.js                # Authentication
└── app.js                 # Main app logic
```

---

## ✅ Success Checklist

- [ ] Node.js installed
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file created with API key
- [ ] Backend server running (`npm start`)
- [ ] Frontend opens in browser
- [ ] Can sign up and login
- [ ] Profit analyzer works
- [ ] Electricity analyzer works
- [ ] Chatbot responds
- [ ] Multi-language works
- [ ] Data persists after refresh

---

## 🎉 You're All Set!

Your complete ProfitLens AI application is now running with:
- ✅ Backend server with persistent storage
- ✅ Secure API key management
- ✅ Multilingual AI chatbot
- ✅ Contact form
- ✅ User authentication
- ✅ Data persistence

**Need help?** Check the troubleshooting section or review the server console for error messages.

---

**Happy analyzing! 💰✨**
