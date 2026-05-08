# Script deploy tự động cho Hoa Tươi Thanh Ngọc
# Cách dùng: Chạy file này bằng PowerShell

$NODE_PATH = "D:\Storage\3_du_an\dữ liệu"
$env:PATH = "$NODE_PATH;" + $env:PATH

Write-Host "🌸 Bắt đầu build dự án..." -ForegroundColor Cyan
& "$NODE_PATH\npm.cmd" run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build thất bại! Kiểm tra lỗi bên trên." -ForegroundColor Red
    exit 1
}

Write-Host "⚙️ Cập nhật cấu hình deploy..." -ForegroundColor Cyan

# Đọc file wrangler.json được tạo tự động
$wranglerPath = "dist\client\wrangler.json"
$config = Get-Content $wranglerPath | ConvertFrom-Json

# Thêm main và routes cho tên miền
$config | Add-Member -Force -NotePropertyName "main" -NotePropertyValue "../server/server.js"
$config | Add-Member -Force -NotePropertyName "routes" -NotePropertyValue @(
    @{ pattern = "hoatuoithanhngoc.com/*"; zone_name = "hoatuoithanhngoc.com" },
    @{ pattern = "www.hoatuoithanhngoc.com/*"; zone_name = "hoatuoithanhngoc.com" }
)

# Thêm ASSETS binding
$assets = @{ directory = "."; binding = "ASSETS" }
$config | Add-Member -Force -NotePropertyName "assets" -NotePropertyValue $assets

$config | ConvertTo-Json -Depth 10 | Set-Content $wranglerPath

Write-Host "🚀 Đang deploy lên Cloudflare..." -ForegroundColor Cyan
& "$NODE_PATH\npx.cmd" wrangler deploy

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Deploy thành công! Website đã cập nhật." -ForegroundColor Green
    Write-Host "🌐 Truy cập: https://hoatuoithanhngoc.com" -ForegroundColor Green
} else {
    Write-Host "❌ Deploy thất bại!" -ForegroundColor Red
}
