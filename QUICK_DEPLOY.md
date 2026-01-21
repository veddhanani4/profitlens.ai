# Quick Deployment Commands - ProfitLens AI

## 🚀 Quick Start (Copy & Paste)

### Step 1: Initialize Git and Push to GitHub

```bash
# Navigate to project directory
cd C:\Users\A\Downloads\antigravity

# Initialize Git (if not already done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Complete ProfitLens AI application with all features"

# Add your GitHub repository (REPLACE YOUR_USERNAME!)
git remote add origin https://github.com/YOUR_USERNAME/profitlens-ai.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**⚠️ IMPORTANT:** Replace `YOUR_USERNAME` with your actual GitHub username!

---

### Step 2: Deploy to Vercel (CLI Method)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to Vercel
vercel

# Deploy to production
vercel --prod
```

---

## 📝 Alternative: Manual Steps

### Create GitHub Repository First:

1. Go to https://github.com/new
2. Repository name: `profitlens-ai`
3. Description: `AI-powered profit leak detection for SMBs`
4. Public or Private (your choice)
5. **DO NOT** check "Initialize with README"
6. Click "Create repository"

### Then run these commands:

```bash
cd C:\Users\A\Downloads\antigravity
git init
git add .
git commit -m "Initial commit: Complete ProfitLens AI application"
git remote add origin https://github.com/YOUR_USERNAME/profitlens-ai.git
git branch -M main
git push -u origin main
```

---

## 🔑 If You Need Personal Access Token:

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Note: `ProfitLens AI Deployment`
4. Expiration: 90 days (or your preference)
5. Select scopes: ✅ **repo** (all)
6. Click "Generate token"
7. **COPY THE TOKEN** (you won't see it again!)
8. Use this token as password when pushing to GitHub

---

## 🌐 Vercel Dashboard Deployment (Easier):

1. Go to https://vercel.com/login
2. Click "Continue with GitHub"
3. Authorize Vercel
4. Click "Add New..." → "Project"
5. Import `profitlens-ai` repository
6. Add environment variable:
   - Name: `ANTHROPIC_API_KEY`
   - Value: Your Anthropic API key
7. Click "Deploy"
8. Wait 1-2 minutes
9. Done! 🎉

---

## ✅ Verification

### Check GitHub:
```
https://github.com/YOUR_USERNAME/profitlens-ai
```

### Check Vercel:
```
https://profitlens-ai.vercel.app
```
(URL will be shown after deployment)

---

## 🔄 Future Updates

```bash
# Make changes to your code

# Stage changes
git add .

# Commit
git commit -m "Description of what you changed"

# Push (auto-deploys to Vercel!)
git push origin main
```

---

## 🆘 Quick Troubleshooting

### "git: command not found"
Install Git: https://git-scm.com/downloads

### "Permission denied"
Use Personal Access Token as password (see above)

### "Vercel deployment failed"
Check environment variables are set in Vercel dashboard

### "npm: command not found"
Install Node.js: https://nodejs.org/

---

## 📞 Need Help?

Read full guide: `DEPLOYMENT.md`

---

**Ready to deploy? Start with Step 1! 🚀**
