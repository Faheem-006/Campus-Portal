#!/bin/bash
echo "🚀 Setting up CampusVoice Portal..."

echo "📦 Installing backend dependencies..."
cd backend && npm install
cd ..

echo "📦 Installing frontend dependencies..."
cd frontend && npm install
cd ..

echo "✅ Setup complete!"
echo ""
echo "To start the application:"
echo "  Terminal 1 (Backend):  cd backend && npm run dev"
echo "  Terminal 2 (Frontend): cd frontend && npm start"
