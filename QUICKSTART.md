# 🚀 ProfitLens AI - Quick Start Guide

Get up and running with ProfitLens AI in 5 minutes!

## Step 1: Get Your API Key (2 minutes)

1. Visit **[Anthropic Console](https://console.anthropic.com/)**
2. Sign up or log in
3. Go to **API Keys** section
4. Click **Create Key**
5. Copy your API key

## Step 2: Configure the App (1 minute)

1. Open `config.js` in a text editor
2. Find this line:
   ```javascript
   apiKey: ''
   ```
3. Paste your API key:
   ```javascript
   apiKey: 'sk-ant-your-key-here'
   ```
4. Save the file

## Step 3: Run the Application (1 minute)

### Option A: Direct File Opening
Simply double-click `index.html` to open in your browser.

### Option B: Local Server (Recommended)
```bash
# If you have Python installed:
python -m http.server 8000

# If you have Node.js installed:
npx http-server -p 8000

# If you have PHP installed:
php -S localhost:8000
```

Then open: `http://localhost:8000`

## Step 4: Create an Account (1 minute)

1. Click **"Get Started Free"** on the homepage
2. Click the **"Sign Up"** tab
3. Fill in:
   - Full Name
   - Business Name (optional)
   - Email
   - Password
4. Click **"Sign Up"**

You're now logged in with a **Free plan**!

## Step 5: Try the Features (2 minutes)

### Test Profit Leak Detection

1. You'll be on the **Profit Analyzer** page
2. Enter sample data:
   - Monthly Revenue: `100000`
   - Monthly Costs: `85000`
   - Inventory: `50000`
   - Employees: `10`
   - Industry: `Retail`
3. Click **"Analyze Now"**
4. Wait 5-10 seconds for AI analysis
5. Review the detected profit leaks!

### Test Electricity Bill Analysis

1. Click **"Electricity Analyzer"** in the navigation
2. Enter sample data:
   - Bill Amount: `5000`
   - Units Consumed: `500`
   - Billing Period: `January 2026`
   - Provider: `Your Provider`
3. Click **"Analyze Bill"**
4. Review the analysis and any overcharges detected!

## 🎯 What You Can Do Now

### Free Plan Includes:
- ✅ 3 Profit Analyses per month
- ✅ 2 Electricity Analyses per month
- ✅ Basic insights and recommendations
- ✅ All 4 languages (EN, HI, ZH, ID)

### Try These Features:
- 🌐 **Switch languages** using the language selector (top right)
- 📊 **View usage stats** on the analyzer pages
- 💾 **Download complaint drafts** for electricity overcharges
- 🔄 **Test different business scenarios** with various data inputs

## 📱 Test on Mobile

Open the same URL on your phone to see the responsive design!

## ⚠️ Important Notes

### For Development/Testing:
- ✅ The current setup works perfectly for testing
- ✅ All features are functional
- ✅ Data is stored in browser localStorage

### Before Production Deployment:
- 🔐 **Move API key to backend** (never expose in client code)
- 🔐 **Implement proper authentication** (server-side)
- 🔐 **Add payment gateway** for paid plans
- 🔐 **Set up database** for user data persistence

## 🆘 Troubleshooting

### "API key not configured" error
**Fix**: Make sure you added your API key to `config.js` and saved the file.

### Analysis not working
**Fix**: 
1. Check browser console (F12) for errors
2. Verify your API key is correct
3. Check your internet connection

### Page looks broken
**Fix**: Make sure all files are in the same directory and you're using a modern browser (Chrome, Firefox, Safari, Edge).

### Language not switching
**Fix**: Refresh the page and try again. Make sure JavaScript is enabled.

## 🎉 You're All Set!

You now have a fully functional AI-powered business intelligence platform!

### Next Steps:
1. **Analyze your real business data**
2. **Test the electricity bill analyzer** with actual bills
3. **Explore different languages**
4. **Review the pricing tiers** and plan your upgrade path
5. **Read the full README.md** for deployment options

## 📚 Additional Resources

- **README.md** - Complete documentation
- **WALKTHROUGH.md** - Detailed feature guide
- **config.js** - Customize pricing and settings
- **translations.js** - Add or modify translations

---

**Need help?** Check the README.md troubleshooting section or review the browser console for error messages.

**Ready to save money?** Start analyzing! 💰✨
