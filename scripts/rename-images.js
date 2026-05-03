import { readdirSync, renameSync, existsSync } from 'fs';
import { join, parse } from 'path';

const imgDir = './public/images/products';

if (!existsSync(imgDir)) {
  console.error("❌ Không tìm thấy thư mục: " + imgDir);
  process.exit(1);
}

const files = readdirSync(imgDir).filter(f => 
  f.toLowerCase().endsWith('.jpg') || 
  f.toLowerCase().endsWith('.png') || 
  f.toLowerCase().endsWith('.webp') || 
  f.toLowerCase().endsWith('.jpeg')
);

if (files.length === 0) {
  console.log("⚠️ Không có hình ảnh nào trong thư mục " + imgDir);
  process.exit(0);
}

// Hàm chuyển chuỗi tiếng Việt có dấu thành chuỗi URL thân thiện (slug)
function toSlug(str) {
  return str.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, "") // Bỏ dấu
    .replace(/[đĐ]/g, 'd') // Chữ Đ
    .replace(/[^a-z0-9]+/g, '-') // Biến khoảng trắng và ký tự đặc biệt thành dấu gạch ngang
    .replace(/^-+|-+$/g, ''); // Xoá dấu gạch ngang ở đầu và cuối
}

let count = 0;

files.forEach(file => {
  const oldPath = join(imgDir, file);
  
  // Lấy tên file (không có đuôi) và đuôi file (chuyển đuôi thành viết thường)
  const parsed = parse(file);
  const newName = toSlug(parsed.name);
  const ext = parsed.ext.toLowerCase(); // Đổi .JPG thành .jpg
  
  const newFileName = newName + ext;
  const newPath = join(imgDir, newFileName);
  
  // Nếu tên mới khác tên cũ thì tiến hành đổi tên
  if (oldPath !== newPath) {
    // Tránh việc đổi tên đè lên file đã có sẵn trùng tên
    let finalPath = newPath;
    let finalFileName = newFileName;
    let index = 1;
    
    while (existsSync(finalPath) && oldPath !== finalPath) {
      finalFileName = newName + "-" + index + ext;
      finalPath = join(imgDir, finalFileName);
      index++;
    }

    renameSync(oldPath, finalPath);
    console.log(`✅ Đã đổi tên: "${file}" ➔ "${finalFileName}"`);
    count++;
  }
});

console.log(`\n🎉 Hoàn tất! Đã đổi tên chuẩn hoá cho ${count} file ảnh.`);
console.log(`👉 Bây giờ bạn có thể chạy tiếp lệnh: node scripts/import-products.js để tạo dữ liệu.`);
