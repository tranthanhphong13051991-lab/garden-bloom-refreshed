# Script deploy tự động cho Hoa Tươi Thanh Ngọc
# Cách dùng: Chạy file này bằng PowerShell

Write-Host "🌸 Bắt đầu build và deploy dự án lên Cloudflare..." -ForegroundColor Cyan
npm run deploy

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Deploy thành công! Website đã cập nhật." -ForegroundColor Green
    Write-Host "🌐 Truy cập: https://hoatuoithanhngoc.com" -ForegroundColor Green
} else {
    Write-Host "❌ Deploy thất bại! Vui lòng kiểm tra lỗi hiển thị ở trên." -ForegroundColor Red
}
