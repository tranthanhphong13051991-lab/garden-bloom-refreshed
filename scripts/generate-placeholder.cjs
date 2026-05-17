const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const files = [
  { name: "hong-phan-diu-em.png", w: 400, h: 500, r: 255, g: 220, b: 225 },
  { name: "hong-phan-diu-em-lifestyle.jpg", w: 400, h: 500, r: 250, g: 215, b: 220 },
  { name: "hong-phan-diu-em-closeup.jpg", w: 400, h: 500, r: 252, g: 225, b: 230 },
  { name: "hong-phan-diu-em-angle45.jpg", w: 400, h: 500, r: 248, g: 218, b: 223 },
  { name: "hong-phan-diu-em-delivery.jpg", w: 400, h: 500, r: 245, g: 210, b: 215 },
];

const outDir = path.resolve(__dirname, "../public/images");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function createPNG(w, h, r, g, b) {
  const width = w;
  const height = h;

  // Build raw pixel data (RGBA)
  const rawData = Buffer.alloc(height * (width * 4 + 1));
  for (let y = 0; y < height; y++) {
    const rowStart = y * (width * 4 + 1);
    rawData[rowStart] = 0; // filter byte
    for (let x = 0; x < width; x++) {
      const px = rowStart + 1 + x * 4;
      rawData[px] = r;
      rawData[px + 1] = g;
      rawData[px + 2] = b;
      rawData[px + 3] = 255;
    }
  }

  const deflated = zlib.deflateSync(rawData);

  // PNG chunks
  function crc32(buf) {
    let c = 0xffffffff;
    const table = new Int32Array(256);
    for (let n = 0; n < 256; n++) {
      let cr = n;
      for (let k = 0; k < 8; k++) cr = cr & 1 ? 0xedb88320 ^ (cr >>> 1) : cr >>> 1;
      table[n] = cr;
    }
    for (let i = 0; i < buf.length; i++) c = table[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
    return (c ^ 0xffffffff) >>> 0;
  }

  function chunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length);
    const typeB = Buffer.from(type, "ascii");
    const crcData = Buffer.concat([typeB, data]);
    const crc = Buffer.alloc(4);
    crc.writeUInt32BE(crc32(crcData));
    return Buffer.concat([len, typeB, data, crc]);
  }

  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 6; // color type RGBA
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace
  const ihdr = chunk("IHDR", ihdrData);
  const idat = chunk("IDAT", deflated);
  const iend = chunk("IEND", Buffer.alloc(0));

  return Buffer.concat([sig, ihdr, idat, iend]);
}

for (const f of files) {
  const png = createPNG(f.w, f.h, f.r, f.g, f.b);
  const outPath = path.join(outDir, f.name);
  fs.writeFileSync(outPath, png);
  console.log(`Created: ${outPath}`);
}

console.log("All placeholder images created!");