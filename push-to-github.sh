#!/bin/bash

# Push to GitHub script
# Usage: ./push-to-github.sh

echo "🚀 Pushing to GitHub..."

# Check if remote is set
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "Setting up GitHub remote..."
    git remote add origin https://github.com/steven-gemmi/AI-Agent.git
fi

# Configure git user
git config user.name "steven-gemmi"
git config user.email "steven@example.com"

# Add all changes
git add .

# Commit
git commit -m "Update: English version + production ready

- Complete English translation
- Responsive design for mobile
- Clean modern UI
- Ready for deployment

#ai-agent #nextjs #dashboard"

# Push to GitHub
echo "Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "📦 Repository: https://github.com/steven-gemmi/AI-Agent"
    echo ""
    echo "Next steps:"
    echo "1. Go to GitHub and verify the code"
    echo "2. Enable GitHub Pages in repository settings"
    echo "3. Or run 'npm run build && npm start' locally"
else
    echo "❌ Push failed. Please check:"
    echo "1. Your GitHub credentials are configured"
    echo "2. You have write access to the repository"
    echo "3. Try: git push -u origin main --force"
fi
