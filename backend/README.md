# Altan Dynamics Backend API

ASP.NET Core 8.0 Web API for the Altan Dynamics corporate platform.

## Technology Stack

- **Framework:** ASP.NET Core 8.0
- **Language:** C# 12
- **Database:** PostgreSQL (via Supabase)
- **ORM:** Entity Framework Core 8
- **Authentication:** ASP.NET Core Identity + JWT
- **Real-Time:** SignalR
- **Documentation:** Swagger/OpenAPI
- **Logging:** Serilog

## Getting Started

### Prerequisites

- .NET 8.0 SDK
- PostgreSQL database (or Supabase account)
- Visual Studio 2022 / VS Code / Rider

### Setup

1. **Clone the repository and navigate to backend:**
   ```bash
   cd backend
   ```

2. **Update connection string in `appsettings.json`:**
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Host=YOUR_HOST;Database=YOUR_DB;Username=YOUR_USER;Password=YOUR_PASSWORD"
     }
   }
   ```

3. **Update JWT secret key (use a strong, unique key in production):**
   ```json
   {
     "Jwt": {
       "Key": "YourSuperSecretKeyThatIsAtLeast32CharactersLong!"
     }
   }
   ```

4. **Run EF Core migrations:**
   ```bash
   cd src/AltanDynamics.Api
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```

5. **Run the application:**
   ```bash
   dotnet run
   ```

6. **Access Swagger UI:**
   Open https://localhost:5001/swagger in your browser

## Project Structure

```
backend/
├── src/
│   └── AltanDynamics.Api/
│       ├── Controllers/      # API endpoints
│       ├── Data/            # DbContext
│       ├── Hubs/            # SignalR hubs
│       ├── Models/          # Entities, DTOs, Enums
│       ├── Services/        # Business logic (future)
│       └── Program.cs       # Application entry point
├── tests/                   # Unit tests (future)
└── AltanDynamics.sln       # Solution file
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new investor
- `POST /api/auth/login` - Login and receive JWT
- `POST /api/auth/refresh` - Refresh JWT token

### Users (Admin)
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update profile
- `GET /api/users` - List all users (Admin)
- `PUT /api/users/{id}/approve` - Approve investor (Admin)
- `PUT /api/users/{id}/reject` - Reject investor (Admin)

### Leads
- `POST /api/leads` - Submit contact form (Public)
- `GET /api/leads` - List leads (Admin)
- `GET /api/leads/{id}` - Get lead details (Admin)
- `PUT /api/leads/{id}` - Update lead status (Admin)

### SignalR Hub
- `/hubs/threat-simulation` - Real-time threat detection simulation

## Lead Priority Triage Logic

| Priority | Criteria |
|----------|----------|
| Critical | .mil or .gov email domain |
| High | DoD/Federal or Investor inquiry type |
| Medium | State/Local inquiry type |
| Standard | All others |

## Environment Variables

For production, use environment variables or user secrets:

```bash
# Connection String
ConnectionStrings__DefaultConnection=Host=...;Database=...;Username=...;Password=...

# JWT Configuration
Jwt__Key=your-super-secret-key
Jwt__Issuer=AltanDynamics.Api
Jwt__Audience=AltanDynamics.Client

# CORS
Cors__AllowedOrigins__0=https://yourdomain.com
```

## Development

### Running Tests
```bash
dotnet test
```

### Building for Production
```bash
dotnet publish -c Release -o ./publish
```

## License

Proprietary - Altan Dynamics. All rights reserved.
