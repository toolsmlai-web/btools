#!/bin/bash

# Lovable Clone Setup Script
# This script will help you set up the project quickly

echo "🚀 Lovable Clone Setup"
echo "====================="
echo ""

# Check Node.js version
echo "Checking Node.js version..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version is too old. Please upgrade to Node.js 18 or higher."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

# Check for .env.local
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from template..."
    cp .env.example .env.local
    echo "✅ .env.local created"
    echo ""
    echo "⚠️  IMPORTANT: Please edit .env.local and add your API keys:"
    echo "   - ANTHROPIC_API_KEY (required)"
    echo "   - NEXT_PUBLIC_SUPABASE_URL (optional)"
    echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY (optional)"
    echo ""
    echo "Get your Anthropic API key from: https://console.anthropic.com/"
    echo ""
else
    echo "✅ .env.local already exists"
    echo ""
fi

# Ask if user wants to start dev server
read -p "Do you want to start the development server now? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "🚀 Starting development server..."
    echo "   Open http://localhost:3000 in your browser"
    echo ""
    npm run dev
else
    echo ""
    echo "Setup complete! 🎉"
    echo ""
    echo "Next steps:"
    echo "1. Edit .env.local and add your API keys"
    echo "2. Run: npm run dev"
    echo "3. Open: http://localhost:3000"
    echo ""
fi
