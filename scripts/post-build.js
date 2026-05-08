// Script tự động tạo dist/server/wrangler.json sau khi build
import { writeFileSync, readFileSync } from 'fs';

// Đọc API key TỪNG FILE .env (Ưu tiên tuyệt đối để tránh dính biến môi trường cũ của Windows)
let groqApiKey = '';
try {
  const envContent = readFileSync('.env', 'utf8');
  const match = envContent.match(/^GROQ_API_KEY\s*=\s*(.+)$/m);
  if (match) {
    groqApiKey = match[1].trim().replace(/^["']|["']$/g, '');
  }
} catch {
  console.warn('⚠️  Không đọc được .env file');
}

if (!groqApiKey) {
  // Fallback nếu không có trong .env
  groqApiKey = process.env.GROQ_API_KEY;
}

if (!groqApiKey) {
  console.error('❌ CẢNH BÁO: Không tìm thấy GROQ_API_KEY! Bot AI sẽ không hoạt động.');
}

const config = {
  name: "hoatuoithanhngoc",
  main: "server.js",
  compatibility_date: "2024-11-01",
  compatibility_flags: ["nodejs_compat", "nodejs_compat_populate_process_env"],
  vars: {

    // Đổi tên biến thành GROQ_KEY để né bị kẹt secret cũ trên Cloudflare Dashboard
    ...(groqApiKey ? { GROQ_KEY: groqApiKey } : {})
  },
  assets: {
    directory: "../client",
    binding: "ASSETS"
  },
  routes: [
    { pattern: "hoatuoithanhngoc.com/*", zone_name: "hoatuoithanhngoc.com" },
    { pattern: "www.hoatuoithanhngoc.com/*", zone_name: "hoatuoithanhngoc.com" }
  ],
  kv_namespaces: [
    { binding: "BOT_STORAGE", id: "dbde16950a7b4b3d8e814d97a566540b" }
  ]
};

writeFileSync('dist/server/wrangler.json', JSON.stringify(config, null, 2));
console.log('✅ dist/server/wrangler.json đã được tạo thành công!');
if (groqApiKey) {
  console.log('🔑 GROQ_API_KEY đã được đưa vào cấu hình deploy.');
}
