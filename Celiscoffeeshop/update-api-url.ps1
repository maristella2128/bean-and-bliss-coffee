# Script to update API URL for deployment
# Usage: .\update-api-url.ps1 "https://your-api-url.onrender.com"

param(
    [Parameter(Mandatory=$true)]
    [string]$ApiUrl
)

Write-Host "Updating API URL to: $ApiUrl" -ForegroundColor Green

# Update netlify.toml
$netlifyToml = Get-Content "netlify.toml" -Raw
$netlifyToml = $netlifyToml -replace 'VITE_API_URL = "https://your-api-url.onrender.com"', "VITE_API_URL = `"$ApiUrl`""
Set-Content "netlify.toml" $netlifyToml

Write-Host "✅ Updated netlify.toml" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Commit and push changes: git add netlify.toml && git commit -m 'Update API URL' && git push" -ForegroundColor Cyan
Write-Host "2. Deploy to Netlify (it will auto-deploy if connected to GitHub)" -ForegroundColor Cyan
Write-Host ""
Write-Host "Or build and deploy manually:" -ForegroundColor Yellow
Write-Host "npm run build" -ForegroundColor Cyan
Write-Host "netlify deploy --prod" -ForegroundColor Cyan

