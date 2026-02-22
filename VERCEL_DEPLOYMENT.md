# 🚀 Vercel Deployment - Complete Setup Guide

## ✅ Pre-Deployment Checklist

Your code is now **Vercel-ready**! All dependency conflicts have been resolved.

---

## Step 1: Get Resend API Key (2 minutes)

Resend is a modern email service perfect for serverless (3,000 free emails/month).

1. **Sign up**: https://resend.com/signup
2. **Verify email**
3. **Get API Key**: 
   - Go to https://resend.com/api-keys
   - Click "Create API Key"
   - Name it "ArcTrack Production"
   - Copy the key (starts with `re_...`)

**Important**: Save this key - you'll need it in Step 3!

---

## Step 2: Deploy to Vercel

### Method 1: GitHub Auto-Deploy (Recommended)

1. **Your code is already on GitHub**: ✅
   ```
   Repository: github.com/VirathShuklla/schoollandingpage
   Branch: main
   ```

2. **Go to Vercel**: https://vercel.com/new

3. **Import Repository**:
   - Click "Add New" → "Project"
   - Select "Import Git Repository"
   - Choose `VirathShuklla/schoollandingpage`

4. **Configure Project**:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend` ⚠️ **IMPORTANT!**
   - **Build Command**: `yarn build` (auto-detected)
   - **Output Directory**: `build` (auto-detected)
   - **Install Command**: `yarn install` (auto-detected)

5. **Add Environment Variables** (Click "Environment Variables"):

   | Variable Name | Value | Description |
   |---------------|-------|-------------|
   | `RESEND_API_KEY` | `re_your_key_here` | Your Resend API key from Step 1 |
   | `ADMIN_EMAIL` | `arctrackdev@gmail.com` | Where lead notifications go |
   | `MONGODB_URI` | (optional) | MongoDB connection string |
   | `MONGODB_DB_NAME` | `arctrack_db` | (optional) Database name |

6. **Click "Deploy"** 🚀

   Vercel will:
   - Install dependencies with yarn
   - Build your React app
   - Deploy serverless functions
   - Give you a URL: `https://your-project.vercel.app`

---

## Step 3: Set Up Environment Variables in Vercel

After deployment, add these in **Project Settings → Environment Variables**:

### Required Variables:

```bash
# Resend Email Service
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx

# Admin Email (where leads are sent)
ADMIN_EMAIL=arctrackdev@gmail.com
```

### Optional Variables (for database):

```bash
# MongoDB Connection (optional - for storing leads)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority

# Database Name
MONGODB_DB_NAME=arctrack_db
```

**Note**: If you don't add MongoDB, leads will still email you but won't be saved to database.

---

## Step 4: Update Email "From" Address (Important!)

By default, Resend uses `onboarding@resend.dev`. For production:

### Option A: Use Default (Quick Start)
Leave it as is - emails will come from `ArcTrack <onboarding@resend.dev>`

### Option B: Use Your Domain (Professional)

1. **Add Domain to Resend**:
   - Go to https://resend.com/domains
   - Click "Add Domain"
   - Enter your domain (e.g., `arctrack.com`)

2. **Add DNS Records**:
   - Resend will show DNS records
   - Add them to your domain provider
   - Wait for verification (usually 5-10 minutes)

3. **Update Code** (`/api/submit-lead.js`):
   ```javascript
   from: 'ArcTrack <leads@arctrack.com>'
   ```

4. **Redeploy**: Push to GitHub (auto-deploys)

---

## Step 5: Test Your Deployment

1. **Visit your Vercel URL**: `https://your-project.vercel.app`

2. **Fill out the lead form**:
   - Click "Get Started"
   - Fill in test data
   - Submit

3. **Check your email** (arctrackdev@gmail.com):
   - You should receive notification email
   - Test lead should receive welcome email

4. **Check Vercel Logs**:
   - Go to Vercel Dashboard → Your Project → Functions
   - Click `submit-lead` function
   - View logs to see if emails sent

---

## Step 6: Custom Domain (Optional)

1. **Add Domain in Vercel**:
   - Project Settings → Domains
   - Add `www.arctrack.com` and `arctrack.com`

2. **Update DNS** at your domain provider:
   - Add CNAME or A record as shown
   - SSL certificate auto-generated

3. **Update Environment Variables**:
   - No changes needed - it just works!

---

## 📧 Email System Details

### How It Works on Vercel:

1. **User fills form** → Frontend submits to `/api/submit-lead`
2. **Vercel Function runs** → Serverless function executes
3. **Resend sends 2 emails**:
   - Email to you (arctrackdev@gmail.com)
   - Confirmation to the person who filled form
4. **Optional**: Saves to MongoDB if configured

### Email Templates:

#### Admin Notification:
```
Subject: 🎯 New Lead: [School Name]
Content: All lead details in formatted table
```

#### Lead Confirmation:
```
Subject: Thank you for your interest in ArcTrack!
Content: Welcome message + next steps
```

---

## 🔍 Monitoring & Debugging

### Check Deployment Status:
- **Vercel Dashboard**: https://vercel.com/dashboard
- View deployments, logs, and errors

### Check Email Delivery:
- **Resend Dashboard**: https://resend.com/emails
- See all sent emails and delivery status

### View Function Logs:
```bash
# In Vercel Dashboard:
Your Project → Functions → submit-lead → Logs
```

### Common Issues:

**❌ Emails not sending?**
- Check `RESEND_API_KEY` is set correctly
- View function logs for errors
- Verify Resend account is active

**❌ Form submission fails?**
- Check browser console for errors
- Verify function deployed correctly
- Test API endpoint manually:
  ```bash
  curl -X POST https://your-site.vercel.app/api/submit-lead \
    -H "Content-Type: application/json" \
    -d '{"schoolName":"Test","studentStrength":"801-1200","city":"Mumbai","contactName":"Test","email":"test@test.com","phone":"9876543210"}'
  ```

**❌ Build fails?**
- Check build logs in Vercel
- Ensure `Root Directory` is set to `frontend`
- Verify all dependencies in package.json

---

## 📊 MongoDB Setup (Optional)

If you want to store leads in a database:

1. **Create MongoDB Atlas Account**: https://www.mongodb.com/cloud/atlas/register

2. **Create Free Cluster**:
   - Choose M0 Sandbox (Free forever)
   - Select region closest to you
   - Create cluster

3. **Create Database User**:
   - Database Access → Add User
   - Choose username & password
   - Save credentials

4. **Whitelist IP**:
   - Network Access → Add IP Address
   - Add `0.0.0.0/0` (allow from anywhere)
   - Or add Vercel's IP ranges

5. **Get Connection String**:
   - Click "Connect" → "Connect your application"
   - Copy connection string:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

6. **Add to Vercel**:
   - Environment Variables → Add
   - `MONGODB_URI` = your connection string
   - `MONGODB_DB_NAME` = `arctrack_db`
   - Redeploy

---

## 🎯 Admin Dashboard

To use the admin dashboard on Vercel:

1. **MongoDB is REQUIRED** (see above)
2. **Access dashboard**: `https://your-site.vercel.app/admin`
3. **Password**: `arctrack2024` (change in production!)

**Without MongoDB**: Leads will email you but won't appear in dashboard.

---

## 💰 Cost Breakdown (Free Tier)

| Service | Free Tier | Your Usage | Cost |
|---------|-----------|------------|------|
| Vercel | 100GB bandwidth, unlimited sites | 1 site | **$0** |
| Resend | 3,000 emails/month | < 100/month | **$0** |
| MongoDB Atlas | 512MB storage | < 10MB | **$0** |
| **Total** | | | **$0/month** |

### When to Upgrade?

- **Vercel**: Only if >100GB traffic/month (unlikely)
- **Resend**: If >3,000 emails/month → $20/month
- **MongoDB**: If >512MB data → Still free

---

## 🔒 Security Checklist

Before going live:

- ✅ Environment variables in Vercel (not in code)
- ✅ HTTPS enabled automatically
- ✅ CORS configured properly
- ✅ Form validation on frontend & backend
- [ ] Change admin password in `AdminDashboard.js`
- [ ] Enable Resend domain authentication
- [ ] Set up MongoDB IP whitelist (if using)

---

## 🔄 Updates & Redeployment

### Auto-Deploy (Recommended):
Every time you push to `main` branch on GitHub, Vercel automatically:
1. Pulls latest code
2. Builds the app
3. Deploys new version
4. No downtime!

### Manual Redeploy:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel --prod
```

---

## ✅ Final Checklist

Before launching:

- [ ] Resend API key added to Vercel
- [ ] Test email received at arctrackdev@gmail.com
- [ ] Test lead receives confirmation email
- [ ] Form submission works on Vercel URL
- [ ] MongoDB connected (optional)
- [ ] Admin dashboard accessible (if MongoDB setup)
- [ ] Custom domain added (optional)
- [ ] Domain verified on Resend (optional)
- [ ] All environment variables set
- [ ] Test form on mobile device

---

## 🆘 Need Help?

### Resources:
- **Vercel Docs**: https://vercel.com/docs
- **Resend Docs**: https://resend.com/docs  
- **MongoDB Docs**: https://www.mongodb.com/docs/atlas/

### Quick Links:
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Resend Dashboard**: https://resend.com/emails
- **MongoDB Atlas**: https://cloud.mongodb.com

---

## 🎉 You're All Set!

Your ArcTrack landing page is ready for production deployment on Vercel!

**Next Steps**:
1. Get Resend API key
2. Deploy to Vercel
3. Add environment variables
4. Test the form
5. Launch! 🚀

**Email leads will automatically be sent to arctrackdev@gmail.com** ✉️
