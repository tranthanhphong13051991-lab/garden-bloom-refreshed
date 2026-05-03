import { readdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';

const imgDir = './public/images/products';
const targetFile = './src/data/products.ts';

const files = readdirSync(imgDir).filter(f => 
  f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.webp') || f.endsWith('.jpeg')
);

function guessCategory(filename) {
  const lower = filename.toLowerCase();
  if (lower.includes('gio') || lower.includes('giỏ')) return 'gio-hoa';
  if (lower.includes('khai-truong') || lower.includes('kt')) return 'khai-truong';
  if (lower.includes('chia-buon') || lower.includes('dam-tang') || lower.includes('cb')) return 'chia-buon';
  if (lower.includes('lan') || lower.includes('ho-diep')) return 'lan-ho-diep';
  return 'bo-hoa';
}

function formatName(filename) {
  let name = filename.replace(/\.[^/.]+$/, "");
  name = name.replace(/[-_]/g, " ");
  return name.replace(/\b\w/g, c => c.toUpperCase());
}

function toSlug(str) {
  return str.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const products = files.map((file, i) => {
  const cat = guessCategory(file);
  const rawName = formatName(file);
  const slug = toSlug(rawName) + "-" + (i + 1);
  
  return `  {
    slug: "${slug}",
    name: "${rawName}",
    category: "${cat}",
    _img: "${file}",
    short: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao.",
    description: "Sản phẩm được thiết kế thủ công từ hoa tươi chất lượng cao. Cam kết mang đến bó hoa tươi thắm nhất để bạn gửi gắm yêu thương.",
    price: 500000,
    keywords: ["hoa tươi", "hoa thiết kế"]
  }`;
});

let content = readFileSync(targetFile, 'utf-8');

// Thay thế đoạn `const raw: RawProduct[] = [` bằng nội dung mới
// Chúng ta sẽ ghép mảng mới vào đầu mảng hiện tại
const insertString = `const raw: RawProduct[] = [\n  // SẢN PHẨM AUTO IMPORT TỪ ẢNH\n${products.join(",\n")},\n\n`;

content = content.replace("const raw: RawProduct[] = [", insertString);

writeFileSync(targetFile, content, 'utf-8');
console.log(`Đã chèn thành công ${files.length} sản phẩm vào src/data/products.ts!`);
