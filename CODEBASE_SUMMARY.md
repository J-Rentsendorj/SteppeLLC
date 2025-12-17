# Altan Dynamics API - C# Codebase Summary

## Overview

**Project:** AltanDynamics.Api  
**Framework:** .NET 8.0  
**Architecture:** ASP.NET Core Web API with Clean Architecture principles  
**Database:** PostgreSQL (via Supabase)  
**Authentication:** JWT Bearer Tokens + ASP.NET Identity  
**Email:** SendGrid  
**Real-time:** SignalR  

---

## 📁 Project Structure

```
backend/src/AltanDynamics.Api/
├── Controllers/           # API endpoints
│   ├── AuthController.cs       # Login, Register, Token refresh
│   ├── LeadsController.cs      # Lead/inquiry management
│   └── UsersController.cs      # User profile management
├── Data/
│   └── ApplicationDbContext.cs # Entity Framework DbContext
├── Hubs/
│   └── ThreatSimulationHub.cs  # SignalR real-time hub
├── Models/
│   ├── DTOs/                   # Data Transfer Objects
│   │   ├── Auth/               # LoginDto, RegisterDto, TokenDto
│   │   ├── Lead/               # CreateLeadDto, LeadDto
│   │   └── User/               # UserDto
│   ├── Entities/               # Database entities
│   │   ├── ApplicationUser.cs  # User entity (extends IdentityUser)
│   │   ├── Lead.cs             # Lead/inquiry entity
│   │   ├── Document.cs         # Document storage entity
│   │   └── ActivityLog.cs      # Audit logging entity
│   └── Enums/                  # Enumeration types
│       ├── UserRole.cs         # Admin, Investor, User
│       ├── UserStatus.cs       # Pending, Approved, Rejected
│       ├── InquiryType.cs      # Platform, DoDFederal, StateLocal, Investor
│       ├── LeadPriority.cs     # Critical, High, Medium, Standard
│       └── LeadStatus.cs       # New, Contacted, Qualified, Converted, Closed
├── Services/
│   ├── IEmailService.cs        # Email service interface
│   ├── SendGridEmailService.cs # SendGrid implementation
│   └── NoOpEmailService.cs     # Fallback (logging only)
├── Migrations/                 # EF Core database migrations
├── Properties/
│   └── launchSettings.json     # Development launch profiles
├── Program.cs                  # Application entry point & DI config
├── appsettings.json            # Configuration
└── AltanDynamics.Api.csproj    # Project file
```

---

## 🔧 Core Technologies & NuGet Packages

| Package | Purpose |
|---------|---------|
| `Microsoft.AspNetCore.Identity.EntityFrameworkCore` | User authentication & authorization |
| `Microsoft.AspNetCore.Authentication.JwtBearer` | JWT token authentication |
| `Microsoft.EntityFrameworkCore` | ORM for database access |
| `Npgsql.EntityFrameworkCore.PostgreSQL` | PostgreSQL database provider |
| `SendGrid` | Email delivery service |
| `Serilog.AspNetCore` | Structured logging |
| `Swashbuckle.AspNetCore` | Swagger/OpenAPI documentation |

---

## 🎯 API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | Public | Register new investor account |
| POST | `/api/auth/login` | Public | Login and get JWT token |
| POST | `/api/auth/refresh` | Authenticated | Refresh JWT token |

### Leads (`/api/leads`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/leads` | **Public** | Submit contact form inquiry |
| GET | `/api/leads` | Admin | Get all leads with filtering |
| GET | `/api/leads/{id}` | Admin | Get specific lead |
| PUT | `/api/leads/{id}` | Admin | Update lead status/notes |

### Users (`/api/users`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/users/me` | Authenticated | Get current user profile |
| GET | `/api/users` | Admin | Get all users |
| PUT | `/api/users/{id}/approve` | Admin | Approve investor account |

---

## 📊 Data Models

### Lead Entity

```csharp
public class Lead
{
    public Guid Id { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }
    public string Organization { get; set; }
    public InquiryType InquiryType { get; set; }
    public string Message { get; set; }
    public string? Phone { get; set; }
    public LeadPriority Priority { get; set; }    // Auto-calculated
    public LeadStatus Status { get; set; }
    public string? Notes { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
```

### ApplicationUser Entity

```csharp
public class ApplicationUser : IdentityUser<Guid>
{
    public string FullName { get; set; }
    public string? Organization { get; set; }
    public UserRole Role { get; set; }           // Admin, Investor, User
    public UserStatus Status { get; set; }       // Pending, Approved, Rejected
    public DateTime CreatedAt { get; set; }
    public DateTime? LastLoginAt { get; set; }
}
```

---

## 🔥 Key Features

### 1. Lead Priority Auto-Calculation

```csharp
private static LeadPriority CalculateLeadPriority(string email, InquiryType inquiryType)
{
    // Critical: .mil or .gov email domains
    if (email.EndsWith(".mil") || email.EndsWith(".gov"))
        return LeadPriority.Critical;

    // High: DoD/Federal or Investor inquiries
    if (inquiryType == InquiryType.DoDFederal || inquiryType == InquiryType.Investor)
        return LeadPriority.High;

    // Medium: State/Local inquiries
    if (inquiryType == InquiryType.StateLocal)
        return LeadPriority.Medium;

    return LeadPriority.Standard;
}
```

### 2. Investor Approval Workflow

- Users register with `Status = Pending`
- Admin must approve before login is allowed
- Login returns 401 with message "Your account is pending approval"

### 3. Email Notifications

- SendGrid integration for lead notifications
- HTML-formatted emails with priority badges
- Reply-to set to lead's email address
- Async sending (doesn't block API response)

### 4. JWT Authentication

- 60-minute access token expiration
- 7-day refresh token support
- SignalR authentication via query string

---

## ⚙️ Configuration (`appsettings.json`)

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=...;Database=postgres;Username=postgres;..."
  },
  "Jwt": {
    "Key": "YourSecretKey...",
    "Issuer": "AltanDynamics.Api",
    "Audience": "AltanDynamics.Client",
    "ExpirationInMinutes": 60,
    "RefreshTokenExpirationInDays": 7
  },
  "Email": {
    "SendGridApiKey": "SG.xxx",
    "FromEmail": "noreply@altandynamics.com",
    "FromName": "Altan Dynamics",
    "NotificationEmail": "admin@altandynamics.com"
  },
  "Cors": {
    "AllowedOrigins": ["http://localhost:5173"]
  }
}
```

---

## 🔐 Security Features

1. **Password Policy**
   - Minimum 8 characters
   - Requires uppercase, lowercase, digit, and special character

2. **Account Lockout**
   - 5 failed attempts triggers lockout
   - 5-minute lockout duration

3. **JWT Security**
   - HMAC-SHA256 signing
   - Issuer/Audience validation
   - Zero clock skew

4. **CORS**
   - Whitelist-based origin control
   - Credentials allowed for auth cookies

---

## 📝 Enumerations

### InquiryType
```csharp
public enum InquiryType
{
    Platform = 0,      // General platform briefing
    DoDFederal = 1,    // DoD/Federal inquiry
    StateLocal = 2,    // State & Local (LEO/SAR)
    Investor = 3       // Investor inquiry
}
```

### LeadPriority
```csharp
public enum LeadPriority
{
    Standard = 0,
    Medium = 1,
    High = 2,
    Critical = 3       // .mil/.gov domains
}
```

### LeadStatus
```csharp
public enum LeadStatus
{
    New = 0,
    Contacted = 1,
    Qualified = 2,
    Converted = 3,
    Closed = 4
}
```

### UserStatus
```csharp
public enum UserStatus
{
    Pending = 0,       // Awaiting approval
    Approved = 1,      // Can login
    Rejected = 2       // Denied access
}
```

---

## 🚀 Running the Application

### Development
```bash
cd backend/src/AltanDynamics.Api
dotnet run --launch-profile https
```

### API Endpoints
- **API:** https://localhost:7212
- **Swagger:** https://localhost:7212/swagger

### Database Migrations
```bash
dotnet ef migrations add MigrationName
dotnet ef database update
```

---

## 📧 Email Flow

1. User submits contact form → `POST /api/leads`
2. Lead saved to database with auto-calculated priority
3. Background task sends email via SendGrid
4. Admin receives HTML notification at `NotificationEmail`
5. Email includes lead details, priority badge, reply-to link

---

## 🧪 Testing

```bash
cd backend/tests/AltanDynamics.Api.Tests
dotnet test
```

Tests include:
- `LeadsControllerTests.cs` - Lead CRUD operations

---

## 📚 Key Files Reference

| File | Description |
|------|-------------|
| `Program.cs` | DI container setup, middleware pipeline |
| `ApplicationDbContext.cs` | EF Core DbContext with entity configurations |
| `AuthController.cs` | JWT token generation, user registration |
| `LeadsController.cs` | Lead management with priority routing |
| `SendGridEmailService.cs` | HTML email templates |
| `ThreatSimulationHub.cs` | SignalR real-time messaging |

---

## 🔄 API Response Format

### Success
```json
{
  "message": "Success message",
  "data": { ... }
}
```

### Error
```json
{
  "message": "Error description",
  "errors": ["Validation error 1", "Validation error 2"]
}
```

### Paginated
```json
{
  "data": [...],
  "totalCount": 100,
  "page": 1,
  "pageSize": 20,
  "totalPages": 5
}
```

---

*Generated: December 16, 2025*
