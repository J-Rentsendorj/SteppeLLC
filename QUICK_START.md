# 🚀 Quick Start Guide - Altan Dynamics Platform

## ⚡ Fastest Way to Start Development

### Option 1: One-Click Start (Recommended)

**Double-click either file in the project root:**
- `start-dev.bat` (for Command Prompt)
- `start-dev.ps1` (for PowerShell)

This will automatically:
1. ✅ Check if .NET and Node.js are installed
2. ✅ Start the backend API server (https://localhost:7212)
3. ✅ Start the frontend dev server (http://localhost:5173)
4. ✅ Open both in separate terminal windows

---

### Option 2: Manual Start (Two Terminals)

#### Terminal 1 - Backend API
```bash
cd backend/src/AltanDynamics.Api
dotnet run
```

#### Terminal 2 - Frontend
```bash
npm run dev
```

---

## 🌐 Access the Application

Once both servers are running:

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:5173 | Main website |
| **Backend API** | https://localhost:7212/api | API endpoints |
| **Swagger Docs** | https://localhost:7212/swagger | API documentation |

---

## 🔧 Troubleshooting

### ❌ Error: "Failed to submit inquiry" or "ERR_CONNECTION_REFUSED"

**Problem:** Backend server is not running

**Solution:**
1. Check if you see a terminal window with "Now listening on: https://localhost:7212"
2. If not, run `start-dev.bat` or manually start the backend

---

### ❌ Error: "A listener indicated an asynchronous response..."

**Problem:** Browser extension interference (harmless)

**Solution:** 
- This is a Chrome extension issue, NOT your code
- You can safely ignore it
- Or disable extensions for localhost in Chrome settings

---

### ❌ Port Already in Use

**Problem:** Another process is using port 5173 or 7212

**Solution:**
```bash
# Kill processes on Windows
netstat -ano | findstr :7212
netstat -ano | findstr :5173
taskkill /PID <process_id> /F
```

---

## 📧 Email Configuration

### Current Setup
- ❌ **Email notifications are NOT configured**
- ✅ Leads are saved to PostgreSQL database (Supabase)
- ✅ Critical leads (.mil/.gov) are logged with priority flags
- ✅ Admins can view all leads in the admin portal

### Where Leads Are Stored
- **Database:** PostgreSQL on Supabase
- **View Leads:** Login as Admin → Navigate to /admin

### To Add Email Notifications (Optional)
You would need to:
1. Add an email service (SendGrid, AWS SES, etc.)
2. Configure SMTP in `appsettings.json`
3. Modify `LeadsController.cs` to send emails

---

## 🎯 Features That Work Now

### ✅ Public Features (No Login Required)
- Landing page with all sections
- Contact forms (DoD/Federal, State & Local, Platform Briefing)
- Lead submission with priority calculation

### ✅ User Features (Login Required)
- User registration (pending admin approval)
- User login with JWT authentication
- Protected portal access

### ✅ Admin Features (Admin Role Required)
- View all pending user registrations
- Approve/reject user accounts
- View all inquiry leads
- Filter leads by priority/status
- Update lead status and notes

---

## 🏗️ Project Architecture

```
Frontend (React + Vite)     Backend (ASP.NET Core 8)
Port: 5173              →   Port: 7212
                            ↓
                        Database (PostgreSQL)
                        Supabase Cloud
```

**Why separate servers?**
- Different technologies require different runtime environments
- Industry standard for modern web applications
- Allows independent scaling and deployment
- Frontend → Static hosting (Vercel)
- Backend → API hosting (Azure/Railway)

---

## 📦 Prerequisites

Make sure you have installed:
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js 18+](https://nodejs.org/)
- Git (optional, for version control)

---

## 🔐 Default Credentials

To create an admin user:
1. Register through the UI
2. Manually update the database to set UserRole = 0 (Admin)
3. Or use SQL: `UPDATE "AspNetUsers" SET "Role" = 0 WHERE "Email" = 'your@email.com'`

---

## 💡 Development Tips

1. **Keep both servers running** - Frontend needs backend to function
2. **Check console logs** - Both terminals show useful debug info
3. **Use Swagger** - Test API endpoints at https://localhost:7212/swagger
4. **Hot reload enabled** - Changes auto-refresh (frontend & backend)
5. **Database connection** - Already configured with Supabase

---

## 🆘 Need Help?

- Check terminal output for error messages
- Verify both servers are running
- Ensure ports 5173 and 7212 are not blocked
- Check browser console (F12) for frontend errors
- View backend logs in the `logs/` folder

---

## 🚀 Production Deployment

See `README.md` for full deployment instructions to:
- Vercel (Frontend)
- Railway/Azure (Backend)
