# 📧 Email Notifications Setup Guide - SendGrid

## Overview

Email notifications are now integrated into the inquiry form system. When someone submits a lead (DoD/Federal, State & Local, Platform Briefing), you'll receive a beautifully formatted email with all the details.

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Create SendGrid Account

1. Go to **[SendGrid.com](https://signup.sendgrid.com/)**
2. Sign up for a **FREE account** (100 emails/day forever)
3. Verify your email address
4. Complete account setup

### Step 2: Create API Key

1. Log into SendGrid dashboard
2. Go to **Settings** → **API Keys**
3. Click **Create API Key**
4. Name it: `Altan-Dynamics-Notifications`
5. Select: **Full Access** (or at minimum "Mail Send")
6. Click **Create & View**
7. **⚠️ COPY THE KEY NOW** - you won't see it again!

### Step 3: Verify Sender Email

**Important:** SendGrid requires sender verification.

#### Option A: Single Sender Verification (Easiest)
1. Go to **Settings** → **Sender Authentication**
2. Click **Verify a Single Sender**
3. Enter your email (e.g., `john@yourdomain.com`)
4. Fill out the form
5. Check your email and click verification link
6. ✅ Done! You can now send from this email

#### Option B: Domain Authentication (Professional)
1. Go to **Settings** → **Sender Authentication**
2. Click **Authenticate Your Domain**
3. Follow DNS setup instructions
4. This makes emails look more professional and improves deliverability

### Step 4: Configure Your App

1. Open `backend/src/AltanDynamics.Api/appsettings.json`
2. Update the Email section:

```json
"Email": {
  "SendGridApiKey": "SG.your_actual_api_key_here",
  "FromEmail": "noreply@yourdomain.com",
  "FromName": "Altan Dynamics",
  "NotificationEmail": "your-email@example.com"
}
```

**Configuration Details:**
- **SendGridApiKey**: Your API key from Step 2
- **FromEmail**: MUST be the verified email from Step 3
- **FromName**: Display name shown in emails
- **NotificationEmail**: Where lead notifications are sent

### Step 5: Restart Backend

Close the backend terminal and restart:
```bash
# Either run the startup script again:
.\start-dev.bat

# Or manually:
cd backend/src/AltanDynamics.Api
dotnet run
```

You should see: `✅ SendGrid email service configured` in the logs

---

## 📬 What Emails Look Like

When someone submits an inquiry, you'll receive:

**Subject:** 🚨 New Critical Lead: DoD/Federal - Department of Defense

**Content:**
- Full name and contact info
- Organization
- Inquiry type (DoD/Federal, State & Local, etc.)
- Their message
- Priority level (Critical, High, Medium, Standard)
- Timestamp
- Beautifully formatted HTML email

**Features:**
- **Reply-To**: Automatically set to the lead's email
- **Priority Colors**: Critical = Red, High = Orange, Medium = Yellow
- **Mobile Friendly**: Responsive design
- **Professional Branding**: Altan Dynamics colors and logo styling

---

## 🎯 Priority System

Emails are automatically prioritized:

| Priority | Trigger | Email Indicator |
|----------|---------|-----------------|
| **Critical** | .mil or .gov email | 🔴 Red highlight |
| **High** | DoD/Federal or Investor inquiry | 🟠 Orange highlight |
| **Medium** | State & Local inquiries | 🟡 Yellow highlight |
| **Standard** | All other inquiries | 🟢 Green indicator |

---

## 🧪 Testing Email Configuration

### Test Endpoint (Coming Soon)
You can add a test endpoint to verify email works:

```csharp
// In LeadsController.cs
[HttpPost("test-email")]
public async Task<IActionResult> TestEmail([FromQuery] string email)
{
    var result = await _emailService.SendTestEmailAsync(email);
    return result 
        ? Ok(new { message = "Test email sent successfully!" })
        : BadRequest(new { message = "Failed to send test email. Check logs." });
}
```

Then test with:
```bash
curl -X POST "https://localhost:7212/api/leads/test-email?email=your@email.com"
```

---

## 🔧 Troubleshooting

### ⚠️ "Email service not configured" Warning

**Problem:** You see this in logs when leads are submitted.

**Solution:**
1. Check `appsettings.json` - ensure SendGridApiKey is not `YOUR_SENDGRID_API_KEY_HERE`
2. Verify API key is correct (no extra spaces)
3. Restart backend server

### ❌ Emails Not Arriving

**Check These:**
1. **Spam Folder**: First place to look!
2. **Sender Verification**: Ensure FromEmail is verified in SendGrid
3. **API Key Permissions**: Must have "Mail Send" permission
4. **SendGrid Dashboard**: Check Activity Feed for delivery status
5. **Backend Logs**: Look for error messages

### 📊 Monitor Email Status

1. Go to **SendGrid Dashboard** → **Activity**
2. See all sent emails, delivery status, and errors
3. Check for bounces or blocks

---

## 💰 SendGrid Pricing

| Plan | Price | Emails/Day | Best For |
|------|-------|------------|----------|
| **Free** | $0 | 100/day | Development & Testing |
| **Essentials** | $19.95/mo | 50,000/mo | Small Business |
| **Pro** | $89.95/mo | 100,000/mo | Growing Companies |

**For most startups:** Free tier (100/day) is plenty!

---

## 🔐 Security Best Practices

### ✅ DO:
- Keep API key in `appsettings.json` (not committed to git)
- Use environment variables in production
- Set up domain authentication
- Monitor SendGrid activity regularly

### ❌ DON'T:
- Never commit API keys to GitHub
- Don't share API keys publicly
- Don't use same key across multiple projects

### Production Security:
```bash
# Use environment variables
export SENDGRID_API_KEY="your_key_here"

# Or Azure App Settings
# Or AWS Secrets Manager
# Or similar secure storage
```

---

## 📊 Email Tracking

SendGrid provides built-in tracking:
- **Opens**: See when emails are opened
- **Clicks**: Track link clicks
- **Deliverability**: Monitor bounce rates
- **Engagement**: Analyze email performance

Enable in: **Settings** → **Tracking**

---

## 🚀 Advanced Features

### Custom Templates
Create reusable email templates in SendGrid dashboard for consistent branding.

### Multiple Recipients
Update `NotificationEmail` to send to multiple addresses:
```json
"NotificationEmail": "sales@company.com,ceo@company.com"
```

### Webhooks
Get real-time notifications when emails are delivered, opened, or bounced.

### A/B Testing
Test different email content to optimize engagement.

---

## 📞 Support

- **SendGrid Docs**: https://docs.sendgrid.com/
- **SendGrid Support**: Available through dashboard
- **Status Page**: https://status.sendgrid.com/

---

## ✅ Verification Checklist

Before going live, verify:

- [ ] SendGrid account created
- [ ] API key generated and saved
- [ ] Sender email verified
- [ ] `appsettings.json` configured
- [ ] Backend restarted
- [ ] Test email sent successfully
- [ ] Email arrives in inbox (not spam)
- [ ] Reply-to functionality works
- [ ] Priority levels display correctly
- [ ] Mobile view looks good

---

## 🎉 You're All Set!

Your inquiry forms now send professional email notifications automatically. Every lead is saved to the database AND emailed to you instantly!

**Next Steps:**
1. Test all three inquiry forms
2. Monitor SendGrid dashboard
3. Adjust settings as needed
4. Consider upgrading if you exceed 100/day
