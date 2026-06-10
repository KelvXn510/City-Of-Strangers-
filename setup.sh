#!/bin/bash

# The City of Strangers - Local Development Setup

echo "🏙️  Setting up The City of Strangers..."

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20.x or higher."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Setup environment
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo "⚠️  Please update .env.local with your Supabase and OpenAI credentials"
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npm run db:generate

echo "✅ Setup complete!"
echo ""
echo "🚀 To start development server, run:"
echo "   npm run dev"
echo ""
echo "📚 To seed the database with default districts, run:"
echo "   npm run db:seed"
echo ""
echo "💾 To access Prisma Studio, run:"
echo "   npm run db:studio"
