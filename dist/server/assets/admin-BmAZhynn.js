import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect, useCallback } from "react";
import { FolderOpen, Upload, Loader2, Download, CheckCircle, Save, Images, Trash2, ImageIcon, ChevronUp, ChevronDown } from "lucide-react";
import { c as createSsrRpc } from "./createSsrRpc-cz3zUEHg.js";
import { z } from "zod";
import { c as createServerFn } from "./server-ma-ijNXL.js";
import { C as CATEGORIES$1 } from "./products-c_hw6lyT.js";
import { u as useCategoryImages } from "./category-images-CfA_IKo7.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/react-router";
import "@tanstack/react-router/ssr/server";
import "zustand";
import "zustand/middleware";
const checkAdminPassword = createServerFn({
  method: "POST"
}).inputValidator((data) => z.object({
  password: z.string()
}).parse(data)).handler(createSsrRpc("deaaf386aabfab3b872266bf1935e099a77a5e41532c5d6561e4b0e73d639b04"));
const analyzeProductImage = createServerFn({
  method: "POST"
}).inputValidator((data) => z.object({
  base64: z.string().max(3e6),
  mimeType: z.enum(["image/jpeg", "image/png", "image/webp", "image/gif"]),
  filename: z.string()
}).parse(data)).handler(createSsrRpc("99fe2fc4ddf470671de046fee43bdd77e5b2556cb4a35890063ebbe2d3f19703"));
const GALLERY_ANGLES = [{
  key: "chinh-dien",
  label: "Góc chính diện"
}, {
  key: "can-canh",
  label: "Góc cận cảnh"
}, {
  key: "tren-cao",
  label: "Góc từ trên cao"
}, {
  key: "anh-sang",
  label: "Ánh sáng tự nhiên"
}];
const VIETNAMESE_MAP = {
  à: "a",
  á: "a",
  ả: "a",
  ã: "a",
  ạ: "a",
  ă: "a",
  ắ: "a",
  ằ: "a",
  ẳ: "a",
  ẵ: "a",
  ặ: "a",
  â: "a",
  ấ: "a",
  ầ: "a",
  ẩ: "a",
  ẫ: "a",
  ậ: "a",
  è: "e",
  é: "e",
  ẻ: "e",
  ẽ: "e",
  ẹ: "e",
  ê: "e",
  ế: "e",
  ề: "e",
  ể: "e",
  ễ: "e",
  ệ: "e",
  ì: "i",
  í: "i",
  ỉ: "i",
  ĩ: "i",
  ị: "i",
  ò: "o",
  ó: "o",
  ỏ: "o",
  õ: "o",
  ọ: "o",
  ô: "o",
  ố: "o",
  ồ: "o",
  ổ: "o",
  ỗ: "o",
  ộ: "o",
  ơ: "o",
  ớ: "o",
  ờ: "o",
  ở: "o",
  ỡ: "o",
  ợ: "o",
  ù: "u",
  ú: "u",
  ủ: "u",
  ũ: "u",
  ụ: "u",
  ư: "u",
  ứ: "u",
  ừ: "u",
  ử: "u",
  ữ: "u",
  ự: "u",
  ỳ: "y",
  ý: "y",
  ỷ: "y",
  ỹ: "y",
  ỵ: "y",
  đ: "d"
};
function toSlug(name) {
  return name.toLowerCase().split("").map((c) => VIETNAMESE_MAP[c] ?? c).join("").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-");
}
async function resizeToBase64(file, maxPx = 1024) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let {
        width,
        height
      } = img;
      if (width > maxPx || height > maxPx) {
        if (width > height) {
          height = Math.round(height * maxPx / width);
          width = maxPx;
        } else {
          width = Math.round(width * maxPx / height);
          height = maxPx;
        }
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas không khả dụng"));
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      const base64 = canvas.toDataURL("image/jpeg", 0.82).replace("data:image/jpeg;base64,", "");
      resolve({
        base64,
        mimeType: "image/jpeg"
      });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Không load được ảnh"));
    };
    img.src = url;
  });
}
function emptyGallery() {
  return Object.fromEntries(GALLERY_ANGLES.map(({
    key
  }) => [key, {
    file: null,
    previewUrl: ""
  }]));
}
function generateCode(p) {
  const ext = p.file.name.split(".").pop()?.toLowerCase() || "jpg";
  const imgFile = `${p.slug}.${ext}`;
  const galleryImgs = GALLERY_ANGLES.filter(({
    key
  }) => p.gallery[key].file !== null).map(({
    key
  }) => {
    const f = p.gallery[key].file;
    const gExt = f.name.split(".").pop()?.toLowerCase() || "jpg";
    return `${p.slug}-${key}.${gExt}`;
  });
  const lines = [`  {`, `    slug: ${JSON.stringify(p.slug)},`, `    name: ${JSON.stringify(p.name)},`, `    category: ${JSON.stringify(p.category)},`];
  if (p.badge) lines.push(`    badge: ${JSON.stringify(p.badge)},`);
  lines.push(`    _img: ${JSON.stringify(imgFile)},`, `    short: ${JSON.stringify(p.short)},`, `    description: ${JSON.stringify(p.description)},`, `    keywords: ${JSON.stringify(p.keywords)},`, `    galleryImgs: ${JSON.stringify(galleryImgs)},`, `  },`);
  return lines.join("\n");
}
function downloadFile(file, filename) {
  const url = URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1e3);
}
function downloadDraftImages(draft) {
  const ext = draft.file.name.split(".").pop()?.toLowerCase() || "jpg";
  downloadFile(draft.file, `${draft.slug}.${ext}`);
  for (const {
    key
  } of GALLERY_ANGLES) {
    const slot = draft.gallery[key];
    if (!slot.file) continue;
    const gExt = slot.file.name.split(".").pop()?.toLowerCase() || "jpg";
    setTimeout(() => downloadFile(slot.file, `${draft.slug}-${key}.${gExt}`), 300);
  }
}
const CATEGORIES = [{
  value: "bo-hoa",
  label: "Bó hoa"
}, {
  value: "gio-hoa",
  label: "Giỏ hoa"
}, {
  value: "khai-truong",
  label: "Khai trương"
}, {
  value: "chia-buon",
  label: "Chia buồn"
}, {
  value: "lan-ho-diep",
  label: "Lan hồ điệp"
}];
const IDB_NAME = "admin-store";
const IDB_KEY = "dirHandle";
async function idbSave(handle) {
  return new Promise((res, rej) => {
    const req = indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore("kv");
    req.onsuccess = () => {
      const tx = req.result.transaction("kv", "readwrite");
      tx.objectStore("kv").put(handle, IDB_KEY);
      tx.oncomplete = () => res();
      tx.onerror = () => rej(tx.error);
    };
    req.onerror = () => rej(req.error);
  });
}
async function idbLoad() {
  return new Promise((res, rej) => {
    const req = indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore("kv");
    req.onsuccess = () => {
      const tx = req.result.transaction("kv", "readonly");
      const get = tx.objectStore("kv").get(IDB_KEY);
      get.onsuccess = () => res(get.result ?? null);
      get.onerror = () => rej(get.error);
    };
    req.onerror = () => rej(req.error);
  });
}
function AdminPage() {
  const [pw, setPw] = useState("");
  const [authed, setAuthed] = useState(true);
  const [pwError, setPwError] = useState("");
  const [loading, setLoading] = useState(false);
  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await checkAdminPassword({
        data: {
          password: pw
        }
      });
      if (res.ok) setAuthed(true);
      else setPwError("Mật khẩu không đúng");
    } catch {
      setPwError("Lỗi kết nối server");
    } finally {
      setLoading(false);
    }
  }
  if (!authed) {
    return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-cream px-4", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleLogin, className: "w-full max-w-sm rounded-2xl border border-border bg-background p-8 shadow-soft", children: [
      /* @__PURE__ */ jsx("p", { className: "ornament mb-2 text-center text-xs uppercase tracking-[0.35em] text-primary", children: "Hoa Tươi Thanh Ngọc" }),
      /* @__PURE__ */ jsx("h1", { className: "mb-6 text-center font-serif text-3xl font-semibold text-foreground", children: "Admin" }),
      /* @__PURE__ */ jsx("input", { type: "password", value: pw, onChange: (e) => {
        setPw(e.target.value);
        setPwError("");
      }, placeholder: "Mật khẩu admin...", className: "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30", autoFocus: true }),
      pwError && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-red-500", children: pwError }),
      /* @__PURE__ */ jsx("button", { type: "submit", disabled: loading || !pw, className: "mt-4 w-full rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50", children: loading ? "Đang kiểm tra..." : "Đăng nhập" }),
      /* @__PURE__ */ jsxs("p", { className: "mt-4 text-center text-xs text-muted-foreground", children: [
        "Mật khẩu mặc định: ",
        /* @__PURE__ */ jsx("code", { className: "font-mono", children: "thanhnoc2024" }),
        /* @__PURE__ */ jsx("br", {}),
        "Đổi qua biến môi trường ",
        /* @__PURE__ */ jsx("code", { className: "font-mono", children: "ADMIN_PASSWORD" })
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsx(Dashboard, { onLogout: () => setAuthed(false) });
}
function Dashboard({
  onLogout
}) {
  const [dirHandle, setDirHandle] = useState(null);
  const [drafts, setDrafts] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzeProgress, setAnalyzeProgress] = useState({
    current: 0,
    total: 0
  });
  const [isDragging, setIsDragging] = useState(false);
  const [saveStatus, setSaveStatus] = useState("idle");
  const fileInputRef = useRef(null);
  useEffect(() => {
    idbLoad().then(async (handle) => {
      if (!handle) return;
      const perm = await handle.queryPermission({
        mode: "readwrite"
      }).catch(() => "denied");
      if (perm === "granted") {
        setDirHandle(handle);
      } else {
        setDirHandle(handle);
      }
    }).catch(() => {
    });
  }, []);
  const pickDirectory = async () => {
    try {
      const handle = await window.showDirectoryPicker({
        mode: "readwrite"
      });
      setDirHandle(handle);
      idbSave(handle).catch(() => {
      });
    } catch {
    }
  };
  const addFiles = useCallback((files) => {
    const images = files.filter((f) => f.type.startsWith("image/"));
    const newDrafts = images.map((file) => ({
      id: Math.random().toString(36).slice(2),
      file,
      previewUrl: URL.createObjectURL(file),
      status: "pending",
      slug: "",
      name: "",
      category: "bo-hoa",
      short: "",
      description: "",
      keywords: [],
      badge: null,
      colorNames: [],
      gallery: emptyGallery()
    }));
    setDrafts((prev) => [...prev, ...newDrafts]);
  }, []);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(Array.from(e.dataTransfer.files));
  };
  const handleFileInput = (e) => {
    if (e.target.files) addFiles(Array.from(e.target.files));
    e.target.value = "";
  };
  const analyzeAll = async () => {
    const pending = drafts.filter((d) => d.status === "pending");
    if (!pending.length) return;
    setIsAnalyzing(true);
    setAnalyzeProgress({
      current: 0,
      total: pending.length
    });
    for (let i = 0; i < pending.length; i++) {
      const item = pending[i];
      setAnalyzeProgress({
        current: i + 1,
        total: pending.length
      });
      setDrafts((prev) => prev.map((d) => d.id === item.id ? {
        ...d,
        status: "analyzing"
      } : d));
      try {
        const {
          base64,
          mimeType
        } = await resizeToBase64(item.file);
        const result = await analyzeProductImage({
          data: {
            base64,
            mimeType,
            filename: item.file.name
          }
        });
        if (!result.ok) {
          setDrafts((prev) => prev.map((d) => d.id === item.id ? {
            ...d,
            status: "error",
            errorMsg: result.error
          } : d));
          continue;
        }
        const slug = toSlug(result.name);
        setDrafts((prev) => prev.map((d) => d.id === item.id ? {
          ...d,
          status: "done",
          slug,
          name: result.name,
          category: result.category,
          short: result.short,
          description: result.description,
          keywords: result.keywords,
          badge: result.badge,
          colorNames: result.colorNames
        } : d));
      } catch (err) {
        setDrafts((prev) => prev.map((d) => d.id === item.id ? {
          ...d,
          status: "error",
          errorMsg: String(err)
        } : d));
      }
    }
    setIsAnalyzing(false);
  };
  const updateDraft = (id, patch) => {
    setDrafts((prev) => prev.map((d) => d.id === id ? {
      ...d,
      ...patch
    } : d));
  };
  const removeDraft = (id) => {
    setDrafts((prev) => {
      const found = prev.find((d) => d.id === id);
      if (found) URL.revokeObjectURL(found.previewUrl);
      return prev.filter((d) => d.id !== id);
    });
  };
  const saveToProject = async () => {
    const done = drafts.filter((d) => d.status === "done");
    if (!done.length) return;
    if (!dirHandle) {
      alert("Vui lòng chọn thư mục dự án trước!");
      return;
    }
    try {
      const perm = await dirHandle.queryPermission({
        mode: "readwrite"
      });
      if (perm !== "granted") {
        const newPerm = await dirHandle.requestPermission({
          mode: "readwrite"
        });
        if (newPerm !== "granted") {
          alert("Cần cấp quyền truy cập thư mục để lưu!");
          return;
        }
      }
    } catch {
    }
    setSaveStatus("saving");
    try {
      const publicDir = await dirHandle.getDirectoryHandle("public", {
        create: true
      });
      const img2Dir = await publicDir.getDirectoryHandle("images", {
        create: true
      });
      for (const draft of done) {
        const ext = draft.file.name.split(".").pop()?.toLowerCase() || "jpg";
        const imgName = `${draft.slug}.${ext}`;
        const fh = await img2Dir.getFileHandle(imgName, {
          create: true
        });
        const writable2 = await fh.createWritable();
        await writable2.write(draft.file);
        await writable2.close();
        for (const {
          key
        } of GALLERY_ANGLES) {
          const slot = draft.gallery[key];
          if (!slot.file) continue;
          const gExt = slot.file.name.split(".").pop()?.toLowerCase() || "jpg";
          const gName = `${draft.slug}-${key}.${gExt}`;
          const gFh = await img2Dir.getFileHandle(gName, {
            create: true
          });
          const gWritable = await gFh.createWritable();
          await gWritable.write(slot.file);
          await gWritable.close();
        }
      }
      const srcDir = await dirHandle.getDirectoryHandle("src");
      const dataDir = await srcDir.getDirectoryHandle("data");
      const productsFh = await dataDir.getFileHandle("products.ts");
      const file = await productsFh.getFile();
      const content = await file.text();
      const rawStart = content.indexOf("const raw: RawProduct[] = [");
      if (rawStart === -1) throw new Error("Không tìm thấy mảng raw trong products.ts");
      const endMarker = "\n];\n";
      const insertAt = content.indexOf(endMarker, rawStart);
      if (insertAt === -1) throw new Error("Không tìm thấy cuối mảng raw trong products.ts");
      const newCode = done.map(generateCode).join("\n");
      const timestamp = (/* @__PURE__ */ new Date()).toLocaleDateString("vi-VN");
      const comment = `

  // ── THÊM ${timestamp} ────────────────────────────────────────────
`;
      const newContent = content.slice(0, insertAt) + comment + newCode + content.slice(insertAt);
      const writable = await productsFh.createWritable();
      await writable.write(newContent);
      await writable.close();
      setDrafts((prev) => prev.filter((d) => d.status !== "done"));
      setSaveStatus("done");
      setTimeout(() => setSaveStatus("idle"), 4e3);
    } catch (err) {
      setSaveStatus("error");
      alert("Lỗi khi lưu: " + String(err));
      setTimeout(() => setSaveStatus("idle"), 3e3);
    }
  };
  const pendingCount = drafts.filter((d) => d.status === "pending").length;
  const doneCount = drafts.filter((d) => d.status === "done").length;
  const fsSupportd = typeof window !== "undefined" && "showDirectoryPicker" in window;
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-cream", children: [
    /* @__PURE__ */ jsxs("div", { className: "sticky top-0 z-10 flex items-center justify-between border-b border-border bg-primary px-6 py-4 text-primary-foreground shadow-sm", children: [
      /* @__PURE__ */ jsx("div", { className: "font-serif text-xl font-semibold", children: "Hoa Tươi Thanh Ngọc — Thêm Sản Phẩm" }),
      /* @__PURE__ */ jsx("button", { onClick: onLogout, className: "text-sm text-primary-foreground/70 transition hover:text-primary-foreground", children: "Đăng xuất" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl space-y-6 px-4 py-8", children: [
      /* @__PURE__ */ jsx(CategoryImageManager, {}),
      !fsSupportd && /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800", children: "⚠️ Trình duyệt không hỗ trợ File System Access API. Vui lòng dùng Chrome hoặc Edge để có thể tự động lưu file." }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 rounded-xl border border-border bg-background p-4", children: [
        /* @__PURE__ */ jsx(FolderOpen, { className: "h-5 w-5 shrink-0 text-gold" }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-foreground", children: "Thư mục dự án" }),
          /* @__PURE__ */ jsx("div", { className: "truncate text-xs text-muted-foreground", children: dirHandle ? `✓ Đã chọn: ${dirHandle.name}` : "Chưa chọn — cần chọn để tự động lưu ảnh và products.ts" })
        ] }),
        fsSupportd && /* @__PURE__ */ jsx("button", { onClick: pickDirectory, className: "shrink-0 rounded-lg border border-border px-4 py-2 text-sm font-medium transition hover:bg-muted", children: dirHandle ? "Đổi thư mục" : "Chọn thư mục dự án" })
      ] }),
      /* @__PURE__ */ jsxs("div", { onDragOver: (e) => {
        e.preventDefault();
        setIsDragging(true);
      }, onDragLeave: () => setIsDragging(false), onDrop: handleDrop, onClick: () => fileInputRef.current?.click(), className: `cursor-pointer rounded-xl border-2 border-dashed p-14 text-center transition select-none ${isDragging ? "border-primary bg-primary/5" : "border-border bg-background hover:border-primary/50"}`, children: [
        /* @__PURE__ */ jsx(Upload, { className: "mx-auto mb-3 h-10 w-10 text-muted-foreground" }),
        /* @__PURE__ */ jsx("p", { className: "font-medium text-foreground", children: "Kéo thả ảnh sản phẩm vào đây" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Hoặc click để chọn ảnh từ máy tính" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: "JPG, PNG, WEBP — nhiều ảnh cùng lúc" }),
        /* @__PURE__ */ jsx("input", { ref: fileInputRef, type: "file", accept: "image/*", multiple: true, className: "hidden", onChange: handleFileInput })
      ] }),
      drafts.length > 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
            drafts.length,
            " ảnh",
            doneCount > 0 && ` · ${doneCount} đã phân tích`,
            pendingCount > 0 && ` · ${pendingCount} chờ xử lý`
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-3", children: [
            pendingCount > 0 && /* @__PURE__ */ jsx("button", { onClick: analyzeAll, disabled: isAnalyzing, className: "inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60", children: isAnalyzing ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }),
              "Đang phân tích ",
              analyzeProgress.current,
              "/",
              analyzeProgress.total,
              "…"
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              "✨ Phân tích ",
              pendingCount,
              " ảnh với AI"
            ] }) }),
            doneCount > 0 && /* @__PURE__ */ jsxs("button", { onClick: () => {
              drafts.filter((d) => d.status === "done").forEach((d, i) => {
                setTimeout(() => downloadDraftImages(d), i * 500);
              });
            }, className: "inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium transition hover:bg-muted", children: [
              /* @__PURE__ */ jsx(Download, { className: "h-4 w-4" }),
              " Tải ",
              doneCount,
              " ảnh về máy"
            ] }),
            doneCount > 0 && /* @__PURE__ */ jsx("button", { onClick: saveToProject, disabled: saveStatus === "saving", className: "inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-primary transition hover:scale-[1.02] disabled:opacity-60", children: saveStatus === "saving" ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }),
              " Đang lưu…"
            ] }) : saveStatus === "done" ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(CheckCircle, { className: "h-4 w-4" }),
              " Đã lưu thành công!"
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(Save, { className: "h-4 w-4" }),
              " Lưu ",
              doneCount,
              " sản phẩm vào dự án"
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: drafts.map((draft) => /* @__PURE__ */ jsx(DraftCard, { draft, onUpdate: (patch) => updateDraft(draft.id, patch), onRemove: () => removeDraft(draft.id) }, draft.id)) })
      ] })
    ] })
  ] });
}
function DraftCard({
  draft,
  onUpdate,
  onRemove
}) {
  const [expanded, setExpanded] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "overflow-hidden rounded-xl border border-border bg-background shadow-sm", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-4 p-4", children: [
      /* @__PURE__ */ jsx("img", { src: draft.previewUrl, alt: "", className: "h-24 w-24 shrink-0 rounded-lg object-cover" }),
      /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
        draft.status === "pending" && /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
          "⏳ Chờ phân tích — ",
          /* @__PURE__ */ jsx("span", { className: "font-mono text-xs", children: draft.file.name })
        ] }),
        draft.status === "analyzing" && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm text-primary", children: [
          /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }),
          "Đang phân tích ảnh với Claude AI…"
        ] }),
        draft.status === "error" && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-red-500", children: "❌ Lỗi phân tích" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: draft.errorMsg })
        ] }),
        draft.status === "done" && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsx("input", { value: draft.name, onChange: (e) => {
              const name = e.target.value;
              onUpdate({
                name,
                slug: toSlug(name)
              });
            }, className: "min-w-52 flex-1 rounded border border-border px-2 py-1.5 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/30", placeholder: "Tên sản phẩm" }),
            /* @__PURE__ */ jsx("select", { value: draft.category, onChange: (e) => onUpdate({
              category: e.target.value
            }), className: "rounded border border-border px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary/30", children: CATEGORIES.map((c) => /* @__PURE__ */ jsx("option", { value: c.value, children: c.label }, c.value)) }),
            /* @__PURE__ */ jsxs("select", { value: draft.badge ?? "", onChange: (e) => onUpdate({
              badge: e.target.value || null
            }), className: "rounded border border-border px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary/30", children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Không badge" }),
              /* @__PURE__ */ jsx("option", { value: "Bán chạy", children: "Bán chạy" }),
              /* @__PURE__ */ jsx("option", { value: "Nổi bật", children: "Nổi bật" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Slug: ",
            /* @__PURE__ */ jsx("span", { className: "font-mono", children: draft.slug }),
            " · Ảnh:",
            " ",
            /* @__PURE__ */ jsxs("span", { className: "font-mono", children: [
              draft.slug,
              ".",
              draft.file.name.split(".").pop()
            ] })
          ] }),
          /* @__PURE__ */ jsxs("button", { onClick: () => setExpanded(!expanded), className: "inline-flex items-center gap-1 text-xs text-primary hover:underline", children: [
            expanded ? /* @__PURE__ */ jsx(ChevronUp, { className: "h-3 w-3" }) : /* @__PURE__ */ jsx(ChevronDown, { className: "h-3 w-3" }),
            expanded ? "Thu gọn" : "Chỉnh sửa chi tiết"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 items-center gap-1", children: [
        draft.status === "done" && /* @__PURE__ */ jsx("button", { onClick: () => downloadDraftImages(draft), className: "p-1 text-muted-foreground transition hover:text-primary", title: `Tải ảnh: ${draft.slug}.${draft.file.name.split(".").pop()}`, children: /* @__PURE__ */ jsx(Download, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsx("button", { onClick: onRemove, className: "p-1 text-muted-foreground transition hover:text-red-500", title: "Xoá", children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" }) })
      ] })
    ] }),
    expanded && draft.status === "done" && /* @__PURE__ */ jsxs("div", { className: "space-y-3 border-t border-border bg-muted/20 p-4", children: [
      /* @__PURE__ */ jsx(Field, { label: "Mô tả ngắn (short)", children: /* @__PURE__ */ jsx("textarea", { value: draft.short, onChange: (e) => onUpdate({
        short: e.target.value
      }), rows: 2, className: "mt-1 w-full rounded border border-border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" }) }),
      /* @__PURE__ */ jsx(Field, { label: "Mô tả đầy đủ (description)", children: /* @__PURE__ */ jsx("textarea", { value: draft.description, onChange: (e) => onUpdate({
        description: e.target.value
      }), rows: 3, className: "mt-1 w-full rounded border border-border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" }) }),
      /* @__PURE__ */ jsx(Field, { label: "Keywords (phân cách bằng dấu phẩy)", children: /* @__PURE__ */ jsx("input", { value: draft.keywords.join(", "), onChange: (e) => onUpdate({
        keywords: e.target.value.split(",").map((k) => k.trim()).filter(Boolean)
      }), className: "mt-1 w-full rounded border border-border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30" }) }),
      /* @__PURE__ */ jsx(Field, { label: "Slug (URL-friendly, tự động sinh từ tên)", children: /* @__PURE__ */ jsx("input", { value: draft.slug, onChange: (e) => onUpdate({
        slug: e.target.value
      }), className: "mt-1 w-full rounded border border-border px-3 py-2 font-mono text-sm outline-none focus:ring-2 focus:ring-primary/30" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "text-xs font-medium text-muted-foreground", children: "Ảnh gallery (4 góc — tùy chọn)" }),
        /* @__PURE__ */ jsx("div", { className: "mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4", children: GALLERY_ANGLES.map(({
          key,
          label
        }) => {
          const slot = draft.gallery[key];
          return /* @__PURE__ */ jsxs("label", { className: "cursor-pointer", children: [
            /* @__PURE__ */ jsx("div", { className: `relative flex h-24 items-center justify-center overflow-hidden rounded-lg border-2 border-dashed transition ${slot.previewUrl ? "border-primary/40" : "border-border hover:border-primary/40"}`, children: slot.previewUrl ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx("img", { src: slot.previewUrl, alt: label, className: "h-full w-full object-cover" }),
              /* @__PURE__ */ jsx("button", { type: "button", onClick: (e) => {
                e.preventDefault();
                if (slot.previewUrl) URL.revokeObjectURL(slot.previewUrl);
                onUpdate({
                  gallery: {
                    ...draft.gallery,
                    [key]: {
                      file: null,
                      previewUrl: ""
                    }
                  }
                });
              }, className: "absolute right-1 top-1 rounded-full bg-black/50 p-0.5 text-white hover:bg-red-500", children: /* @__PURE__ */ jsx(Trash2, { className: "h-3 w-3" }) })
            ] }) : /* @__PURE__ */ jsx(Upload, { className: "h-5 w-5 text-muted-foreground" }) }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-center text-xs text-muted-foreground", children: label }),
            /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: (e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              if (slot.previewUrl) URL.revokeObjectURL(slot.previewUrl);
              onUpdate({
                gallery: {
                  ...draft.gallery,
                  [key]: {
                    file: f,
                    previewUrl: URL.createObjectURL(f)
                  }
                }
              });
              e.target.value = "";
            } })
          ] }, key);
        }) })
      ] }),
      /* @__PURE__ */ jsx(Field, { label: "Preview TypeScript code sẽ được chèn vào products.ts", children: /* @__PURE__ */ jsx("pre", { className: "mt-1 overflow-auto rounded-lg bg-muted p-3 text-xs leading-relaxed", children: generateCode(draft) }) })
    ] })
  ] });
}
function CategoryImageManager() {
  const catImages = useCategoryImages((s) => s.images);
  const setCatImage = useCategoryImages((s) => s.setImage);
  const removeCatImage = useCategoryImages((s) => s.removeImage);
  useEffect(() => {
    useCategoryImages.persist.rehydrate();
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-border bg-background shadow-sm", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 border-b border-border p-4", children: [
      /* @__PURE__ */ jsx(Images, { className: "h-5 w-5 text-gold" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-foreground", children: "Ảnh Danh Mục" }),
        /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "Upload ảnh riêng cho từng danh mục hiển thị trên trang chủ" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5", children: CATEGORIES$1.map((cat) => {
      const currentImg = catImages[cat.id];
      return /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-border bg-cream/30 p-3", children: [
        /* @__PURE__ */ jsx("div", { className: "relative mb-2 aspect-[3/4] overflow-hidden rounded-lg bg-cream", children: currentImg ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("img", { src: currentImg, alt: cat.label, className: "h-full w-full object-cover" }),
          /* @__PURE__ */ jsx("button", { type: "button", onClick: () => removeCatImage(cat.id), className: "absolute right-1 top-1 rounded-full bg-black/50 p-1 text-white transition hover:bg-red-500", title: "Xoá ảnh", children: /* @__PURE__ */ jsx(Trash2, { className: "h-3 w-3" }) })
        ] }) : /* @__PURE__ */ jsx("div", { className: "flex h-full items-center justify-center", children: /* @__PURE__ */ jsx(ImageIcon, { className: "h-8 w-8 text-muted-foreground/40" }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs font-medium text-foreground", children: cat.label }),
          /* @__PURE__ */ jsxs("label", { className: "mt-1.5 inline-flex cursor-pointer items-center gap-1 rounded-full border border-border bg-background px-3 py-1 text-[11px] text-muted-foreground transition hover:border-primary hover:text-primary", children: [
            /* @__PURE__ */ jsx(Upload, { className: "h-3 w-3" }),
            currentImg ? "Đổi ảnh" : "Chọn ảnh",
            /* @__PURE__ */ jsx("input", { type: "file", accept: "image/*", className: "hidden", onChange: (e) => {
              const f = e.target.files?.[0];
              if (f) setCatImage(cat.id, f);
              e.target.value = "";
            } })
          ] })
        ] })
      ] }, cat.id);
    }) }),
    /* @__PURE__ */ jsx("div", { className: "border-t border-border px-4 py-2", children: /* @__PURE__ */ jsx("p", { className: "text-[11px] text-muted-foreground", children: "Ảnh sẽ được lưu trong trình duyệt (localStorage). Nên dùng ảnh tỉ lệ 3:4, kích thước ~400×533px." }) })
  ] });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("label", { className: "text-xs font-medium text-muted-foreground", children: label }),
    children
  ] });
}
export {
  AdminPage as component
};
