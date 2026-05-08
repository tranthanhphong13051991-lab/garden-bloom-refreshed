// Script tự động tạo dist/server/wrangler.json sau khi build
// Đọc GROQ_API_KEY từ .env và đưa vào vars để process.env có thể đọc được
import { writeFileSync, readFileSync } from 'fs';

// Đọc API key từ .env file
let groqApiKey = process.env.GROQ_API_KEY;
if (!groqApiKey) {
  try {
    const envContent = readFileSync('.env', 'utf8');
    const match = envContent.match(/^GROQ_API_KEY\s*=\s*(.+)$/m);
    if (match) groqApiKey = match[1].trim().replace(/^["']|["']$/g, '');
  } catch {
    console.warn('⚠️  Không đọc được .env file');
  }
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

    // vars được truy cập qua process.env với nodejs_compat
    ...(groqApiKey ? { GROQ_API_KEY: groqApiKey } : {})
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
