# Email Notification Setup Guide

## Current Status
✅ Email notification system is **already implemented**
✅ Configured to send to: **arctrackdev@gmail.com**
✅ Sends emails for every new lead submission

## What You'll Receive

When someone fills the lead form, you'll get an email with:
- 🏫 School Name
- 👥 Student Strength
- 📍 City
- 👤 Contact Person Name
- 📧 Email Address
- 📞 Phone Number
- 🔗 Source (Website Form)

## Setup Instructions (One-Time)

### Option 1: Gmail (Recommended)

1. **Enable 2-Factor Authentication**
   - Go to https://myaccount.google.com/security
   - Enable "2-Step Verification" if not already enabled

2. **Generate App Password**
   - Visit: https://myaccount.google.com/apppasswords
   - Select: App → "Mail", Device → "Other (Custom name)"
   - Enter: "ArcTrack Lead Notifications"
   - Click "Generate"
   - **Copy the 16-character password** (e.g., `abcd efgh ijkl mnop`)

3. **Update Backend Configuration**
   - Edit `/app/backend/.env`
   - Replace `your-16-char-app-password-here` with your actual app password
   - **Remove spaces** from the password

4. **Restart Backend**
   ```bash
   sudo supervisorctl restart backend
   ```

### Option 2: Other Email Providers

**Outlook/Hotmail:**
```
SMTP_SERVER="smtp-mail.outlook.com"
SMTP_PORT="587"
SMTP_USERNAME="your-email@outlook.com"
SMTP_PASSWORD="your-password"
```

**Yahoo:**
```
SMTP_SERVER="smtp.mail.yahoo.com"
SMTP_PORT="587"
SMTP_USERNAME="your-email@yahoo.com"
SMTP_PASSWORD="your-app-password"
```

**SendGrid (Professional):**
```
SMTP_SERVER="smtp.sendgrid.net"
SMTP_PORT="587"
SMTP_USERNAME="apikey"
SMTP_PASSWORD="your-sendgrid-api-key"
```

## Testing

Once configured, test by:
1. Visit: https://arctrack-demo.preview.emergentagent.com
2. Click "Get Started"
3. Fill the form with test data
4. Check arctrackdev@gmail.com inbox

## Email Templates

### Admin Notification Email
You receive a professional HTML email with:
- School details in organized format
- All contact information
- Action reminder (follow up within 24 hours)

### Lead Confirmation Email
The person who filled the form receives:
- Welcome message
- Next steps
- What to expect
- Your contact information

## Troubleshooting

### Emails not sending?
1. Check backend logs:
   ```bash
   tail -f /var/log/supervisor/backend.err.log
   ```

2. Verify .env file:
   ```bash
   cat /app/backend/.env | grep SMTP
   ```

3. Test SMTP connection:
   ```bash
   python3 -c "import smtplib; smtplib.SMTP('smtp.gmail.com', 587).starttls()"
   ```

### Common Issues:

**"Authentication failed"**
- Double-check app password
- Ensure 2FA is enabled
- Remove spaces from password

**"Connection refused"**
- Check SMTP_SERVER and SMTP_PORT
- Verify firewall settings

**"Password not configured"**
- Update SMTP_PASSWORD in .env
- Restart backend after changes

## Current Configuration

Location: `/app/backend/.env`

```bash
SMTP_SERVER="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USERNAME="arctrackdev@gmail.com"
SMTP_PASSWORD="[CONFIGURE THIS]"
ADMIN_EMAIL="arctrackdev@gmail.com"
```

## Security Notes

- ⚠️ Never commit .env file to version control
- ✅ Use app passwords, not your main password
- ✅ App passwords are revocable anytime
- ✅ Separate passwords for different apps

## Support

If you need help:
- Check logs in `/var/log/supervisor/backend.err.log`
- Email backend is non-blocking (form works even if email fails)
- Leads are always saved to database

---

**Status:** Ready to use once you add your Gmail App Password to .env file!
