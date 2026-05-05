Write-Host "Building..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) { Write-Host "Build failed!" -ForegroundColor Red; exit 1 }

Write-Host "Deploying to hoatuoithanhngoc.com..." -ForegroundColor Cyan
npx wrangler deploy
if ($LASTEXITCODE -ne 0) { Write-Host "Deploy failed!" -ForegroundColor Red; exit 1 }

Write-Host "Done! Website updated." -ForegroundColor Green
