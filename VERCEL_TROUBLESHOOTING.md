# 🔧 Vercel Form Submission Troubleshooting Guide

## Your Issue: Form works locally but fails on Vercel deployment

This guide addresses the specific error: "There was an error submitting your request"

---

## Quick Diagnosis Checklist

### 1. ✅ Environment Variables (Most Common Issue!)

**In Vercel Dashboard → Your Project → Settings → Environment Variables:**

| Variable | Required? | Value Example |
|----------|-----------|---------------|
| `RESEND_API_KEY` | ⚠️ Required | `re_xxxxxxxxxx` |
| `ADMIN_EMAIL` | Optional | `arctrackdev@gmail.com` |
| `MONGODB_URI` | Optional | `mongodb+srv://...` |

**⚠️ IMPORTANT**: After adding environment variables, you must **redeploy** for changes to take effect!

To redeploy:
1. Go to Vercel Dashboard → Your Project → Deployments
2. Click the three dots "..." on the latest deployment
3. Click "Redeploy"

---

### 2. ✅ Verify Root Directory

When importing to Vercel, the **Root Directory** must be set to `frontend`:

1. Go to Vercel Dashboard → Your Project → Settings → General
2. Check "Root Directory" is set to `frontend`
3. If not, change it and redeploy

---

### 3. ✅ Check Serverless Function Logs

To see what's happening when the form submits:

1. Go to Vercel Dashboard → Your Project
2. Click "Functions" tab
3. Click on `submit-lead` function
4. Click "Logs" tab
5. Submit the form again
6. Check for errors in the logs

---

### 4. ✅ Test the API Endpoint Directly

Run this in your terminal to test if the function works:

```bash
curl -X POST https://schoollandingpage-rust.vercel.app/api/submit-lead \
  -H "Content-Type: application/json" \
  -d '{
    "schoolName": "Test School",
    "studentStrength": "300-500",
    "city": "Mumbai",
    "contactName": "Test User",
    "email": "test@example.com",
    "phone": "9876543210"
  }'
```

**Expected Response (Success):**
```json
{
  "success": true,
  "id": "1234567890-abc123",
  "message": "Lead submitted successfully"
}
```

**If you get an error**, check the response for details.

---

### 5. ✅ Check Browser Console

1. Open your deployed site
2. Open Developer Tools (F12 or Cmd+Option+I)
3. Go to "Console" tab
4. Submit the form
5. Look for error messages

Common errors and fixes:

| Error | Cause | Fix |
|-------|-------|-----|
| `404 Not Found` | API route not deployed | Check Root Directory is `frontend` |
| `500 Internal Server Error` | Function crashed | Check function logs |
| `CORS error` | Cross-origin issue | Already fixed in latest code |
| `Network Error` | Request blocked | Check if ad-blocker is active |

---

### 6. ✅ Check Network Tab

1. Open Developer Tools (F12)
2. Go to "Network" tab
3. Submit the form
4. Look for the `submit-lead` request
5. Click on it to see:
   - **Status**: Should be 200
   - **Response**: Should show success JSON
   - **Request Payload**: Should contain form data

---

## Common Issues & Solutions

### Issue: "500 Internal Server Error"

**Cause**: The serverless function is crashing, usually due to missing environment variables.

**Solution**:
1. Add `RESEND_API_KEY` to Vercel Environment Variables
2. Redeploy the project

### Issue: "404 Not Found" on /api/submit-lead

**Cause**: The API folder isn't being deployed correctly.

**Solution**:
1. Verify Root Directory is `frontend`
2. Check that `/frontend/api/submit-lead.js` exists
3. Redeploy

### Issue: Form submits but no email received

**Cause**: Email service not configured or wrong email.

**Solution**:
1. Verify `RESEND_API_KEY` is correct
2. Check Resend Dashboard (https://resend.com/emails) for email logs
3. Check spam folder
4. Verify email in Resend is not bouncing

### Issue: "Build Failed"

**Cause**: Dependencies or configuration issues.

**Solution**:
1. Check build logs in Vercel
2. Ensure `yarn.lock` is committed
3. Verify `package.json` has all dependencies

---

## Get Your Resend API Key (If Missing)

1. Go to https://resend.com/signup
2. Create an account / Sign in
3. Go to https://resend.com/api-keys
4. Click "Create API Key"
5. Name it "ArcTrack"
6. Copy the key (starts with `re_`)
7. Add to Vercel Environment Variables as `RESEND_API_KEY`
8. Redeploy

---

## Still Not Working?

Please provide:
1. Screenshot of Vercel function logs
2. Screenshot of browser Network tab showing the failed request
3. Any error messages from browser Console

This will help diagnose the exact issue!
