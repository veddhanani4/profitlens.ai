# 🚀 Deployment Guide - ProfitLens AI

Complete guide to deploy ProfitLens AI to Vercel and push code to GitHub.

---

## 📋 Prerequisites

Before you begin, ensure you have:

- ✅ **Git** installed ([Download](https://git-scm.com/downloads))
- ✅ **Node.js** v16+ installed ([Download](https://nodejs.org/))
- ✅ **GitHub account** ([Sign up](https://github.com/signup))
- ✅ **Vercel account** ([Sign up](https://vercel.com/signup))
- ✅ **Anthropic API key** ([Get key](https://www.anthropic.com/))

---

## 🐙 Part 1: Push to GitHub

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com/)
2. Click **"New repository"** (green button)
3. Fill in details:
   - **Repository name:** `profitlens-ai`
   - **Description:** `AI-powered profit leak detection and electricity bill intelligence`
   - **Visibility:** Public or Private
   - **DO NOT** initialize with README (we already have one)
4. Click **"Create repository"**

### Step 2: Initialize Git (if not already done)

Open terminal in your project directory (`C:\Users\A\Downloads\antigravity`):

```bash
# Initialize git repository
git init

# Check git status
git status
```

### Step 3: Add All Files

```bash
# Add all files to staging
git add .

# Check what will be committed
git status
```

### Step 4: Create First Commit

```bash
# Commit with message
git commit -m "Initial commit: Complete ProfitLens AI application"
```

### Step 5: Connect to GitHub

Replace `YOUR_USERNAME` with your actual GitHub username:

```bash
# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/profitlens-ai.git

# Verify remote
git remote -v
```

### Step 6: Push to GitHub

```bash
# Push to main branch
git branch -M main
git push -u origin main
```

**If prompted for credentials:**
- Username: Your GitHub username
- Password: Use **Personal Access Token** (not password)

**To create Personal Access Token:**
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token
3. Select scopes: `repo` (full control)
4. Copy token and use as password

### Step 7: Verify on GitHub

1. Go to `https://github.com/YOUR_USERNAME/profitlens-ai`
2. You should see all your files!

---

## ☁️ Part 2: Deploy to Vercel

### Method 1: Deploy via Vercel Dashboard (Recommended)

#### Step 1: Login to Vercel

1. Go to [Vercel](https://vercel.com/)
2. Click **"Sign Up"** or **"Login"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub

#### Step 2: Import Project

1. Click **"Add New..."** → **"Project"**
2. Find your `profitlens-ai` repository
3. Click **"Import"**

#### Step 3: Configure Project

**Framework Preset:** Other (or leave as detected)

**Root Directory:** `./` (leave as is)

**Build Command:** Leave empty or `npm install`

**Output Directory:** Leave empty

**Install Command:** `npm install`

#### Step 4: Add Environment Variables

Click **"Environment Variables"** and add:

| Name | Value |
|------|-------|
| `ANTHROPIC_API_KEY` | `your_actual_api_key_here` |
| `PORT` | `3000` |

**Important:** Replace `your_actual_api_key_here` with your real Anthropic API key!

#### Step 5: Deploy

1. Click **"Deploy"**
2. Wait 1-2 minutes for deployment
3. You'll see "🎉 Congratulations!" when done

#### Step 6: Get Your URL

Your app will be live at:
```
https://profitlens-ai-YOUR_USERNAME.vercel.app
```

---

### Method 2: Deploy via Vercel CLI

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Login

```bash
vercel login
```

Follow the prompts to login via browser.

#### Step 3: Deploy

```bash
# Navigate to project directory
cd C:\Users\A\Downloads\antigravity

# Deploy
vercel
```

**Follow the prompts:**
- Set up and deploy? **Y**
- Which scope? Choose your account
- Link to existing project? **N**
- Project name? `profitlens-ai`
- Directory? `./` (press Enter)
- Override settings? **N**

#### Step 4: Add Environment Variables

```bash
# Add API key
vercel env add ANTHROPIC_API_KEY

# When prompted:
# - Environment: Production
# - Value: your_actual_api_key_here
```

#### Step 5: Deploy to Production

```bash
vercel --prod
```

---

## 🔧 Post-Deployment Configuration

### 1. Update API URLs

If your backend is on Vercel, update `backend-api.js`:

```javascript
const API_BASE_URL = 'https://your-app.vercel.app/api';
```

### 2. Configure Custom Domain (Optional)

**In Vercel Dashboard:**
1. Go to your project
2. Settings → Domains
3. Add your custom domain
4. Follow DNS configuration instructions

### 3. Set up Continuous Deployment

**Automatic deployment on push:**
- Vercel automatically deploys when you push to GitHub
- Every push to `main` branch triggers a new deployment

---

## 📝 Making Updates

### Update Code and Redeploy

```bash
# Make your changes to files

# Stage changes
git add .

# Commit
git commit -m "Description of changes"

# Push to GitHub
git push origin main

# Vercel will automatically deploy!
```

---

## 🔍 Troubleshooting

### Issue: "git: command not found"

**Solution:** Install Git from [git-scm.com](https://git-scm.com/)

### Issue: "Permission denied (publickey)"

**Solution:** Use HTTPS instead of SSH:
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/profitlens-ai.git
```

### Issue: "Vercel deployment failed"

**Solutions:**
1. Check `vercel.json` is present
2. Verify `package.json` has correct dependencies
3. Check build logs in Vercel dashboard
4. Ensure environment variables are set

### Issue: "API not working on Vercel"

**Solutions:**
1. Verify `ANTHROPIC_API_KEY` is set in Vercel environment variables
2. Check `server.js` is in root directory
3. Verify `vercel.json` routes are correct
4. Check Vercel function logs

### Issue: "Module not found"

**Solution:** Ensure all dependencies are in `package.json`:
```bash
npm install
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

---

## 📊 Monitoring

### Vercel Dashboard

Monitor your deployment:
- **Analytics:** View traffic and performance
- **Logs:** Check function logs
- **Deployments:** See deployment history
- **Settings:** Manage environment variables

### GitHub

Track your code:
- **Commits:** View commit history
- **Branches:** Manage branches
- **Issues:** Track bugs and features
- **Pull Requests:** Review code changes

---

## 🎯 Best Practices

### Git Workflow

```bash
# Before making changes
git pull origin main

# Make changes
# ...

# Stage and commit
git add .
git commit -m "Clear, descriptive message"

# Push
git push origin main
```

### Environment Variables

- ✅ **Never commit** `.env` file
- ✅ **Always use** `.env.example` as template
- ✅ **Set production** variables in Vercel dashboard
- ✅ **Rotate keys** regularly

### Deployment

- ✅ **Test locally** before pushing
- ✅ **Use descriptive** commit messages
- ✅ **Monitor** deployment logs
- ✅ **Verify** production site after deployment

---

## 🔐 Security Checklist

Before deploying:

- ✅ `.env` is in `.gitignore`
- ✅ No API keys in code
- ✅ CORS configured properly
- ✅ Rate limiting enabled
- ✅ Input validation active
- ✅ HTTPS enforced
- ✅ Security headers set

---

## 📞 Support

**Issues with deployment?**

1. Check [Vercel Documentation](https://vercel.com/docs)
2. Check [GitHub Documentation](https://docs.github.com/)
3. Review error logs
4. Search [Stack Overflow](https://stackoverflow.com/)

---

## ✅ Deployment Checklist

### Before Deployment:

- [ ] All files committed to Git
- [ ] `.env` in `.gitignore`
- [ ] `README.md` updated
- [ ] `package.json` has all dependencies
- [ ] `vercel.json` configured
- [ ] API keys ready

### GitHub:

- [ ] Repository created
- [ ] Code pushed
- [ ] README visible
- [ ] `.gitignore` working

### Vercel:

- [ ] Project imported
- [ ] Environment variables set
- [ ] Deployment successful
- [ ] Site accessible
- [ ] API working
- [ ] Custom domain configured (optional)

---

## 🎉 Success!

Your ProfitLens AI application is now:

✅ **Live on Vercel** - Accessible worldwide  
✅ **Hosted on GitHub** - Version controlled  
✅ **Auto-deploying** - Push to deploy  
✅ **Production-ready** - Secure and scalable  

**Share your live URL:**
```
https://profitlens-ai-YOUR_USERNAME.vercel.app
```

---

**Made with ❤️ for SMBs worldwide**

*Stop Profit Leaks. Start Saving.*
