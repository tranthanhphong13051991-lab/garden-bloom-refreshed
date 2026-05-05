/**
 * AI Analyzer & Product Importer
 *
 * Công cụ tự động phân tích ẢNH SẢN PHẨM bằng AI (Ollama + llava:7b)
 * và sinh dữ liệu sản phẩm chuẩn SEO, đồng bộ với cấu trúc dự án.
 *
 * Luồng xử lý:
 *   1. Lấy danh sách ảnh mới (chưa có trong products.ts)
 *   2. Phân tích ảnh bằng LLava (vision model) để nhận diện hoa, màu sắc, kiểu dáng
 *   3. Sinh tên, slug, category, keywords, description chuẩn SEO
 *   4. Chèn tự động vào src/data/products.ts
 *
 * Cách dùng:
 *   1. Đặt ảnh sản phẩm vào public/images/images/
 *   2. Chạy: node scripts/ai-analyze-and-import.js
 *   3. Hoặc xử lý ảnh nhanh: node scripts/ai-analyze-and-import.js --fast
 *
 * Yêu cầu: Ollama đang chạy với model llava:7b (hoặc qwen2.5:7b nếu --fast)
 * Cài đặt: ollama pull llava:7b
 */

import { readdirSync, writeFileSync, readFileSync, existsSync } from "fs";
import { join } from "path";
import { spawn } from "child_process";

// ─── Cấu hình ──────────────────────────────────────────────────────────
const CONFIG = {
  imageDir: "./public/images/images",
  targetFile: "./src/data/products.ts",
  // AI Vision Model (phân tích ảnh)
  visionModel: "llava:7b",
  // AI Text Model (sinh SEO - fallback text-only)
  textModel: "qwen2.5:7b",
  maxImages: 10,
  defaultPrices: {
    "bo-hoa": 550000,
    "gio-hoa": 750000,
    "khai-truong": 1500000,
    "chia-buon": 680000,
    "lan-ho-diep": 890000,
  },
  categoryKeywords: {
    "bo-hoa": ["bó hoa", "bouquet", "hoa tươi", "cầm tay"],
    "gio-hoa": ["giỏ hoa", "lẵng hoa", "basket"],
    "khai-truong": ["kệ hoa", "khai trương", "stand", "kệ"],
    "chia-buon": ["chia buồn", "tang lễ", "vòng hoa"],
    "lan-ho-diep": ["lan hồ điệp", "chậu lan", "phalaenopsis"],
  },
};

// ─── Hàm tiện ích ─────────────────────────────────────────────────────

function toSlug(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

function formatDisplayName(str) {
  return str
    .replace(/\.[^/.]+$/, "")
    .replace(/[-_\d]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Hàm phân tích ẢNH bằng Ollama vision model
 * Truyền file path ảnh vào prompt, model sẽ "nhìn" và trả về mô tả
 */
function analyzeImageWithVision(imagePath, imageFilename) {
  return new Promise((resolve, reject) => {
    const absolutePath = join(process.cwd(), imagePath);

    // Prompt tối ưu cho LLava: yêu cầu JSON, không dùng markdown
    const prompt = `Analyze this flower product image and return ONLY a valid JSON (no markdown, no explanation, no code fences).

Image: ${absolutePath}

Rules:
1. Identify: main flower type, colors, style (bouquet/basket/stand/pot)
2. Determine category: "bo-hoa" (bouquet), "gio-hoa" (basket), "khai-truong" (grand opening stand), "chia-buon" (condolence), "lan-ho-diep" (orchid)
3. Suggest a Vietnamese product name (SEO-friendly, max 60 chars, with diacritics)
4. Suggest 5 Vietnamese SEO keywords
5. Write a short Vietnamese description (max 120 chars)

Return this EXACT JSON format:
{
  "category": "bo-hoa",
  "mainFlowers": "hoa hồng kem",
  "colors": ["kem", "trắng"],
  "style": "sang trọng",
  "suggestedName": "Bó Hoa Hồng Kem Sang Trọng",
  "shortDescription": "Bó hoa hồng kem sang trọng từ Thanh Ngọc — thiết kế tinh tế, phù hợp mọi dịp.",
  "suggestedKeywords": ["bó hoa hồng kem", "hoa sang trọng", "hoa tươi tphcm", "bó hoa đẹp", "hoa sinh nhật"]
}`;

    const child = spawn("ollama", ["run", CONFIG.visionModel], {
      stdio: ["pipe", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (data) => (stdout += data.toString()));
    child.stderr.on("data", (data) => (stderr += data.toString()));

    child.on("close", (code) => {
      if (code !== 0) {
        console.warn(`   ⚠️ Ollama exit code ${code}, thử fallback text model...`);
        resolve(null); // fallback
        return;
      }

      let jsonStr = stdout.trim();
      // Lấy JSON object đầu tiên
      const jsonMatch = jsonStr.match(/\{[\s\S]*?\}/);
      if (!jsonMatch) {
        console.warn(`   ⚠️ Không tìm thấy JSON trong output`);
        resolve(null);
        return;
      }

      try {
        const result = JSON.parse(jsonMatch[0]);
        // Validate required fields
        if (!result.category || !result.suggestedName) {
          console.warn(`   ⚠️ Thiếu field bắt buộc trong JSON`);
          resolve(null);
          return;
        }
        resolve(result);
      } catch (e) {
        console.warn(`   ⚠️ Parse JSON lỗi: ${e.message}`);
        resolve(null);
      }
    });

    child.stdin.write(prompt);
    child.stdin.end();
  });
}

/**
 * Dùng qwen2.5:7b (text model) để sinh tên & SEO từ tên file
 * Dùng khi vision model fail hoặc --fast mode
 */
function generateFromTextModel(filename) {
  return new Promise((resolve) => {
    const name = formatDisplayName(filename);
    const prompt = `Bạn là chuyên gia SEO hoa tươi tại Việt Nam. Từ tên file "${name}", hãy suy luận và trả về JSON hợp lệ (không markdown):
{
  "category": "bo-hoa | gio-hoa | khai-truong | chia-buon | lan-ho-diep",
  "suggestedName": "Tên sản phẩm tiếng Việt có dấu chuẩn SEO",
  "shortDescription": "Mô tả ngắn từ Thanh Ngọc (tối đa 120 ký tự)",
  "suggestedKeywords": ["từ khóa 1", "từ khóa 2", "từ khóa 3", "từ khóa 4", "từ khóa 5"]
}`;

    const child = spawn("ollama", ["run", CONFIG.textModel], {
      stdio: ["pipe", "pipe", "pipe"],
    });

    let stdout = "";
    child.stdout.on("data", (data) => (stdout += data.toString()));
    child.on("close", () => {
      const jsonMatch = stdout.match(/\{[\s\S]*?\}/);
      if (jsonMatch) {
        try {
          resolve(JSON.parse(jsonMatch[0]));
          return;
        } catch {}
      }
      resolve(null);
    });

    child.stdin.write(prompt);
    child.stdin.end();
  });
}

/** Fallback khi cả 2 model đều lỗi */
function fallbackAnalysis(filename) {
  const name = formatDisplayName(filename).replace(/\s+/g, " ").trim();
  if (!name) return null;

  const lower = filename.toLowerCase();
  let category = "bo-hoa";
  if (lower.includes("gio") || lower.includes("giỏ")) category = "gio-hoa";
  else if (lower.includes("khai-truong") || lower.includes("kt") || lower.includes("ke-") || lower.includes("img34") || lower.includes("img37"))
    category = "khai-truong";
  else if (lower.includes("chia-buon") || lower.includes("dam-tang") || lower.includes("lang-") || lower.includes("tang"))
    category = "chia-buon";
  else if (lower.includes("lan") || lower.includes("diep") || lower.includes("phalaenopsis"))
    category = "lan-ho-diep";

  const productName = name.charAt(0).toUpperCase() + name.slice(1);

  return {
    category,
    suggestedName: productName,
    shortDescription: `${productName} từ Thanh Ngọc — thiết kế thủ công từ hoa tươi chất lượng cao.`,
    suggestedKeywords: [
      productName.toLowerCase(),
      "hoa tươi",
      "hoa thiết kế",
      "hoa tphcm",
      "hoa sinh nhật",
    ],
  };
}

function generateUniqueSlug(name, existingSlugs) {
  let slug = toSlug(name);
  if (!slug || slug.length < 3) slug = "san-pham-hoa";
  let baseSlug = slug;
  let counter = 1;
  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  return slug;
}

// ─── Main ──────────────────────────────────────────────────────────────

async function main() {
  const useFastMode = process.argv.includes("--fast");

  console.log("=".repeat(60));
  console.log("🌸 AI PRODUCT ANALYZER & IMPORTER");
  console.log("=".repeat(60));
  console.log(`📂 Vision Model: ${useFastMode ? "KHÔNG (fast mode)" : CONFIG.visionModel}`);
  console.log(`📂 Text Model: ${CONFIG.textModel}`);
  console.log(`📂 Thư mục ảnh: ${CONFIG.imageDir}`);
  console.log(`📂 File đích: ${CONFIG.targetFile}`);
  console.log("");

  // 1. Kiểm tra thư mục
  if (!existsSync(CONFIG.imageDir)) {
    console.error("❌ Không tìm thấy thư mục ảnh:", CONFIG.imageDir);
    process.exit(1);
  }

  // 2. Lấy danh sách ảnh
  const allImageFiles = readdirSync(CONFIG.imageDir)
    .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .sort();

  // 3. Đọc dữ liệu hiện có
  let existingContent = readFileSync(CONFIG.targetFile, "utf-8");
  const existingImages = new Set();
  let m;
  const imgRegex = /_img:\s*"([^"]+)"/g;
  while ((m = imgRegex.exec(existingContent)) !== null) existingImages.add(m[1]);

  const existingSlugs = [];
  const slugRegex = /slug:\s*"([^"]+)"/g;
  while ((m = slugRegex.exec(existingContent)) !== null) existingSlugs.push(m[1]);

  const newImages = allImageFiles.filter((f) => !existingImages.has(f));

  console.log(`📸 Tổng số ảnh: ${allImageFiles.length}`);
  console.log(`✅ Đã có: ${existingImages.size}`);
  console.log(`🆕 Chưa xử lý: ${newImages.length}`);
  console.log("");

  if (newImages.length === 0) {
    console.log("🎉 Không có ảnh mới!");
    process.exit(0);
  }

  const imagesToProcess = newImages.slice(0, CONFIG.maxImages);
  if (newImages.length > CONFIG.maxImages) {
    console.log(`⚠️ Chỉ xử lý ${CONFIG.maxImages}/${newImages.length} ảnh. Chạy lại để xử lý tiếp.`);
    console.log("");
  }

  // 4. Phân tích từng ảnh
  const results = [];

  for (let i = 0; i < imagesToProcess.length; i++) {
    const filename = imagesToProcess[i];
    const imagePath = join(CONFIG.imageDir, filename);

    console.log(`🔍 [${i + 1}/${imagesToProcess.length}] ${filename}`);

    let analysis = null;

    // Bước 1: Phân tích ảnh (nếu không phải fast mode)
    if (!useFastMode) {
      try {
        analysis = await analyzeImageWithVision(imagePath, filename);
      } catch (err) {
        console.warn(`   ⚠️ Vision error: ${err.message}`);
      }
    }

    // Bước 2: Nếu vision fail, thử text model
    if (!analysis) {
      console.log(`   📝 Đang dùng text model...`);
      try {
        analysis = await generateFromTextModel(filename);
      } catch {}
    }

    // Bước 3: Fallback cuối cùng
    if (!analysis) {
      analysis = fallbackAnalysis(filename);
      console.log(`   ⚠️ Dùng fallback (tên file)`);
    }

    // Validate & build product
    const name = analysis.suggestedName?.trim() || formatDisplayName(filename);
    if (!name) {
      console.warn(`   ⚠️ Bỏ qua ${filename} - không thể xác định tên`);
      continue;
    }

    const cat = analysis.category || "bo-hoa";
    const slug = generateUniqueSlug(name, existingSlugs);
    const keywords = analysis.suggestedKeywords?.length
      ? analysis.suggestedKeywords.slice(0, 6)
      : ["hoa tươi", "hoa thiết kế", "hoa tphcm"];
    const shortDesc =
      analysis.shortDescription?.replace(/["']/g, "'") ||
      `${name} từ Thanh Ngọc — thiết kế thủ công từ hoa tươi chất lượng cao.`;

    const product = {
      slug,
      name: name.replace(/["']/g, "'"),
      category: Object.keys(CONFIG.defaultPrices).includes(cat) ? cat : "bo-hoa",
      _img: filename,
      short: shortDesc,
      description: `${shortDesc} Giao tận nơi trong 2 giờ tại TP.HCM, kèm thiệp miễn phí. Liên hệ Zalo 0934926092 để được tư vấn.`,
      price: CONFIG.defaultPrices[cat] || 550000,
      keywords: keywords.map((k) => k.replace(/["']/g, "'")),
    };

    results.push(product);
    existingSlugs.push(slug);

    console.log(`   ✅ ${product.name}`);
    console.log(`      → ${product.slug} (${product.category})`);
    console.log(`      → ${product.price.toLocaleString("vi-VN")}₫`);
    console.log("");
  }

  if (results.length === 0) {
    console.log("⚠️ Không có sản phẩm nào được tạo!");
    process.exit(0);
  }

  // 5. Sinh code và chèn vào products.ts
  const productCode = results
    .map(
      (p) => `  {
    slug: "${p.slug}",
    name: "${p.name}",
    category: "${p.category}",
    _img: "${p._img}",
    short: "${p.short}",
    description: "${p.description}",
    price: ${p.price},
    keywords: ${JSON.stringify(p.keywords)},
  }`
    )
    .join(",\n");

  // Tìm vị trí chèn vào raw array
  const rawMatch = existingContent.match(/(const raw: RawProduct\[\] = \[[\s\S]*?)(\n\];)/);
  if (!rawMatch || !rawMatch[1]) {
    console.error("❌ Không tìm thấy raw array trong products.ts!");
    process.exit(1);
  }

  const insertionPoint = rawMatch[1].lastIndexOf(";");
  const newRawContent =
    rawMatch[1].substring(0, insertionPoint) + ",\n" + productCode + "\n];";

  const newContent =
    existingContent.substring(0, existingContent.indexOf("const raw: RawProduct[] = [")) +
    newRawContent +
    existingContent.substring(
      existingContent.indexOf("const raw: RawProduct[] = [") + rawMatch[1].length
    );

  writeFileSync(CONFIG.targetFile, newContent, "utf-8");

  // 6. Tổng kết
  console.log("=".repeat(60));
  console.log("📊 TỔNG KẾT");
  console.log("=".repeat(60));
  console.log(`✅ Đã thêm ${results.length} sản phẩm vào ${CONFIG.targetFile}`);
  console.log("");
  console.log("📋 Sản phẩm mới:");
  results.forEach((p, i) => console.log(`   ${i + 1}. ${p.name} (${p.category} - ${p.slug})`));
  console.log("");
  console.log("👉 Chạy: npm run dev  để xem kết quả");
  console.log(`👉 Xử lý tiếp: node scripts/ai-analyze-and-import.js`);
  console.log(`👉 Fast mode (không vision): node scripts/ai-analyze-and-import.js --fast`);
}

main().catch((err) => {
  console.error("❌ Lỗi:", err);
  process.exit(1);
});