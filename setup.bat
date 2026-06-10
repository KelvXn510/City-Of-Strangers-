@echo off
REM The City of Strangers - Local Development Setup

echo 🏙️  Setting up The City of Strangers...

REM Check for Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 20.x or higher.
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js version: %NODE_VERSION%

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

REM Setup environment
if not exist .env.local (
    echo 📝 Creating .env.local from .env.example...
    copy .env.example .env.local
    echo ⚠️  Please update .env.local with your Supabase and OpenAI credentials
)

REM Generate Prisma client
echo 🔧 Generating Prisma client...
call npm run db:generate

echo ✅ Setup complete!
echo.
echo 🚀 To start development server, run:
echo    npm run dev
echo.
echo 📚 To seed the database with default districts, run:
echo    npm run db:seed
echo.
echo 💾 To access Prisma Studio, run:
echo    npm run db:studio
