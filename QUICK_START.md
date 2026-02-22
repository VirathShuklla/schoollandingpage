# Quick Vercel Deployment Guide

## ⚠️ Important: Root Directory Configuration

When deploying to Vercel, make sure to set:

**Root Directory**: `frontend`

This is because your GitHub repo structure is:
```
schoollandingpage/
├── frontend/          ← Your React app is here!
│   ├── api/
│   ├── src/
│   ├── public/
│   └── package.json
└── backend/          ← Not deployed to Vercel
```

---

## 🚀 Quick Deploy Steps

1. **Get Resend API Key**: https://resend.com/api-keys

2. **Deploy to Vercel**: https://vercel.com/new

3. **Configure**:
   - Repository: `VirathShuklla/schoollandingpage`
   - **Root Directory**: `frontend` ⚠️
   - Framework: Create React App (auto-detected)

4. **Environment Variables**:
   ```
   RESEND_API_KEY=re_your_key_here
   ADMIN_EMAIL=arctrackdev@gmail.com
   ```

5. **Deploy!** ✅

---

## 📧 Email System

Once deployed, your form will:
- ✅ Send email to `arctrackdev@gmail.com` with lead details
- ✅ Send confirmation email to the person who filled form
- ✅ Automatically save to MongoDB (if configured)

**No backend server deployment needed!** Everything runs serverless.

---

## 📖 Full Guide

See `/VERCEL_DEPLOYMENT.md` for complete step-by-step instructions.

---

## ✅ What's Already Done

- ✅ Dependencies fixed (react-day-picker updated to v9)
- ✅ Vercel configuration ready (vercel.json)
- ✅ Serverless function created (/api/submit-lead.js)
- ✅ Email templates ready (Resend)
- ✅ Build commands configured (yarn)

**You're ready to deploy!** 🎉
