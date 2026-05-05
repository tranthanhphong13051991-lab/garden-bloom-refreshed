import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useCallback, useEffect } from "react";
import {
  Upload,
  FolderOpen,
  CheckCircle,
  XCircle,
  Loader2,
  Save,
  ChevronDown,
  ChevronUp,
  Trash2,
  Download,
} from "lucide-react";
import { checkAdminPassword, analyzeProductImage } from "@/server/adminAnalyze.functions";

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = "bo-hoa" | "gio-hoa" | "khai-truong" | "chia-buon" | "lan-ho-diep" | "hoa-lua";

const GALLERY_ANGLES = [
  { key: "chinh-dien", label: "Góc chính diện" },
  { key: "can-canh",   label: "Góc cận cảnh" },
  { key: "tren-cao",   label: "Góc từ trên cao" },
  { key: "anh-sang",   label: "Ánh sáng tự nhiên" },
] as const;

type GalleryAngleKey = typeof GALLERY_ANGLES[number]["key"];

type GallerySlot = {
  file: File | null;
  previewUrl: string;
};

type ProductDraft = {
  id: string;
  file: File;
  previewUrl: string;
  status: "pending" | "analyzing" | "done" | "error";
  errorMsg?: string;
  slug: string;
  name: string;
  category: Category;
  short: string;
  description: string;
  keywords: string[];
  badge: string | null;
  colorNames: string[];
  gallery: Record<GalleryAngleKey, GallerySlot>;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const VIETNAMESE_MAP: Record<string, string> = {
  à: "a", á: "a", ả: "a", ã: "a", ạ: "a",
  ă: "a", ắ: "a", ằ: "a", ẳ: "a", ẵ: "a", ặ: "a",
  â: "a", ấ: "a", ầ: "a", ẩ: "a", ẫ: "a", ậ: "a",
  è: "e", é: "e", ẻ: "e", ẽ: "e", ẹ: "e",
  ê: "e", ế: "e", ề: "e", ể: "e", ễ: "e", ệ: "e",
  ì: "i", í: "i", ỉ: "i", ĩ: "i", ị: "i",
  ò: "o", ó: "o", ỏ: "o", õ: "o", ọ: "o",
  ô: "o", ố: "o", ồ: "o", ổ: "o", ỗ: "o", ộ: "o",
  ơ: "o", ớ: "o", ờ: "o", ở: "o", ỡ: "o", ợ: "o",
  ù: "u", ú: "u", ủ: "u", ũ: "u", ụ: "u",
  ư: "u", ứ: "u", ừ: "u", ử: "u", ữ: "u", ự: "u",
  ỳ: "y", ý: "y", ỷ: "y", ỹ: "y", ỵ: "y",
  đ: "d",
};

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .split("")
    .map((c) => VIETNAMESE_MAP[c] ?? c)
    .join("")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function resizeToBase64(
  file: File,
  maxPx = 1024,
): Promise<{ base64: string; mimeType: "image/jpeg" }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      let { width, height } = img;
      if (width > maxPx || height > maxPx) {
        if (width > height) { height = Math.round((height * maxPx) / width); width = maxPx; }
        else { width = Math.round((width * maxPx) / height); height = maxPx; }
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) { reject(new Error("Canvas không khả dụng")); return; }
      ctx.drawImage(img, 0, 0, width, height);
      const base64 = canvas.toDataURL("image/jpeg", 0.82).replace("data:image/jpeg;base64,", "");
      resolve({ base64, mimeType: "image/jpeg" });
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Không load được ảnh")); };
    img.src = url;
  });
}

function emptyGallery(): Record<GalleryAngleKey, GallerySlot> {
  return Object.fromEntries(
    GALLERY_ANGLES.map(({ key }) => [key, { file: null, previewUrl: "" }])
  ) as Record<GalleryAngleKey, GallerySlot>;
}

function generateCode(p: ProductDraft): string {
  const ext = p.file.name.split(".").pop()?.toLowerCase() || "jpg";
  const imgFile = `${p.slug}.${ext}`;
  const galleryImgs = GALLERY_ANGLES
    .filter(({ key }) => p.gallery[key].file !== null)
    .map(({ key }) => {
      const f = p.gallery[key].file!;
      const gExt = f.name.split(".").pop()?.toLowerCase() || "jpg";
      return `${p.slug}-${key}.${gExt}`;
    });
  const lines: string[] = [
    `  {`,
    `    slug: ${JSON.stringify(p.slug)},`,
    `    name: ${JSON.stringify(p.name)},`,
    `    category: ${JSON.stringify(p.category)},`,
  ];
  if (p.badge) lines.push(`    badge: ${JSON.stringify(p.badge)},`);
  lines.push(
    `    _img: ${JSON.stringify(imgFile)},`,
    `    short: ${JSON.stringify(p.short)},`,
    `    description: ${JSON.stringify(p.description)},`,
    `    keywords: ${JSON.stringify(p.keywords)},`,
    `    galleryImgs: ${JSON.stringify(galleryImgs)},`,
    `  },`,
  );
  return lines.join("\n");
}

function downloadFile(file: File, filename: string) {
  const url = URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function downloadDraftImages(draft: ProductDraft) {
  const ext = draft.file.name.split(".").pop()?.toLowerCase() || "jpg";
  downloadFile(draft.file, `${draft.slug}.${ext}`);
  for (const { key } of GALLERY_ANGLES) {
    const slot = draft.gallery[key];
    if (!slot.file) continue;
    const gExt = slot.file.name.split(".").pop()?.toLowerCase() || "jpg";
    setTimeout(() => downloadFile(slot.file!, `${draft.slug}-${key}.${gExt}`), 300);
  }
}

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "bo-hoa", label: "Bó hoa" },
  { value: "gio-hoa", label: "Giỏ hoa" },
  { value: "khai-truong", label: "Khai trương" },
  { value: "chia-buon", label: "Chia buồn" },
  { value: "lan-ho-diep", label: "Lan hồ điệp" },
  { value: "hoa-lua", label: "Hoa lụa" },
];

// ─── IndexedDB helpers để nhớ thư mục qua các lần refresh ───────────────────

const IDB_NAME = "admin-store";
const IDB_KEY = "dirHandle";

async function idbSave(handle: unknown) {
  return new Promise<void>((res, rej) => {
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

async function idbLoad(): Promise<unknown> {
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

// ─── Route ────────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin — Thêm Sản Phẩm | Hoa Tươi Thanh Ngọc" }],
  }),
  component: AdminPage,
});

// ─── Password Gate ────────────────────────────────────────────────────────────

function AdminPage() {
  const [pw, setPw] = useState("");
  const [authed, setAuthed] = useState(false);
  const [pwError, setPwError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await checkAdminPassword({ data: { password: pw } });
      if (res.ok) setAuthed(true);
      else setPwError("Mật khẩu không đúng");
    } catch {
      setPwError("Lỗi kết nối server");
    } finally {
      setLoading(false);
    }
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-2xl border border-border bg-background p-8 shadow-soft"
        >
          <p className="ornament mb-2 text-center text-xs uppercase tracking-[0.35em] text-primary">
            Hoa Tươi Thanh Ngọc
          </p>
          <h1 className="mb-6 text-center font-serif text-3xl font-semibold text-foreground">
            Admin
          </h1>
          <input
            type="password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setPwError(""); }}
            placeholder="Mật khẩu admin..."
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            autoFocus
          />
          {pwError && <p className="mt-2 text-xs text-red-500">{pwError}</p>}
          <button
            type="submit"
            disabled={loading || !pw}
            className="mt-4 w-full rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
          >
            {loading ? "Đang kiểm tra..." : "Đăng nhập"}
          </button>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Mật khẩu mặc định: <code className="font-mono">thanhnoc2024</code>
            <br />Đổi qua biến môi trường <code className="font-mono">ADMIN_PASSWORD</code>
          </p>
        </form>
      </div>
    );
  }

  return <Dashboard onLogout={() => setAuthed(false)} />;
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function Dashboard({ onLogout }: { onLogout: () => void }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dirHandle, setDirHandle] = useState<any>(null);
  const [drafts, setDrafts] = useState<ProductDraft[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzeProgress, setAnalyzeProgress] = useState({ current: 0, total: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Restore saved folder handle from IndexedDB on mount
  useEffect(() => {
    idbLoad().then(async (handle: any) => {
      if (!handle) return;
      // Kiểm tra quyền truy cập — handle từ IndexedDB cần xác nhận lại
      const perm = await handle.queryPermission({ mode: "readwrite" }).catch(() => "denied");
      if (perm === "granted") {
        setDirHandle(handle);
      } else {
        // Lưu handle để hiển thị nút "Xác nhận lại quyền truy cập"
        setDirHandle(handle);
      }
    }).catch(() => {});
  }, []);

  const pickDirectory = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const handle = await (window as any).showDirectoryPicker({ mode: "readwrite" });
      setDirHandle(handle);
      idbSave(handle).catch(() => {});
    } catch {
      // User cancelled
    }
  };

  const addFiles = useCallback((files: File[]) => {
    const images = files.filter((f) => f.type.startsWith("image/"));
    const newDrafts: ProductDraft[] = images.map((file) => ({
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
      gallery: emptyGallery(),
    }));
    setDrafts((prev) => [...prev, ...newDrafts]);
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(Array.from(e.dataTransfer.files));
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(Array.from(e.target.files));
    e.target.value = "";
  };

  const analyzeAll = async () => {
    const pending = drafts.filter((d) => d.status === "pending");
    if (!pending.length) return;
    setIsAnalyzing(true);
    setAnalyzeProgress({ current: 0, total: pending.length });

    for (let i = 0; i < pending.length; i++) {
      const item = pending[i];
      setAnalyzeProgress({ current: i + 1, total: pending.length });
      setDrafts((prev) => prev.map((d) => d.id === item.id ? { ...d, status: "analyzing" } : d));

      try {
        const { base64, mimeType } = await resizeToBase64(item.file);
        const result = await analyzeProductImage({ data: { base64, mimeType, filename: item.file.name } });

        if (!result.ok) {
          setDrafts((prev) =>
            prev.map((d) => d.id === item.id ? { ...d, status: "error", errorMsg: result.error } : d),
          );
          continue;
        }

        const slug = toSlug(result.name);
        setDrafts((prev) =>
          prev.map((d) =>
            d.id === item.id
              ? {
                  ...d,
                  status: "done",
                  slug,
                  name: result.name,
                  category: result.category as Category,
                  short: result.short,
                  description: result.description,
                  keywords: result.keywords,
                  badge: result.badge,
                  colorNames: result.colorNames,
                }
              : d,
          ),
        );
      } catch (err) {
        setDrafts((prev) =>
          prev.map((d) =>
            d.id === item.id ? { ...d, status: "error", errorMsg: String(err) } : d,
          ),
        );
      }
    }
    setIsAnalyzing(false);
  };

  const updateDraft = (id: string, patch: Partial<ProductDraft>) => {
    setDrafts((prev) => prev.map((d) => (d.id === id ? { ...d, ...patch } : d)));
  };

  const removeDraft = (id: string) => {
    setDrafts((prev) => {
      const found = prev.find((d) => d.id === id);
      if (found) URL.revokeObjectURL(found.previewUrl);
      return prev.filter((d) => d.id !== id);
    });
  };

  const saveToProject = async () => {
    const done = drafts.filter((d) => d.status === "done");
    if (!done.length) return;
    if (!dirHandle) { alert("Vui lòng chọn thư mục dự án trước!"); return; }

    // Xác nhận quyền nếu chưa được cấp (sau khi restore từ IndexedDB)
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const perm = await (dirHandle as any).queryPermission({ mode: "readwrite" });
      if (perm !== "granted") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const newPerm = await (dirHandle as any).requestPermission({ mode: "readwrite" });
        if (newPerm !== "granted") { alert("Cần cấp quyền truy cập thư mục để lưu!"); return; }
      }
    } catch { /* ignore nếu API không hỗ trợ */ }

    setSaveStatus("saving");
    try {
      // 1. Lưu ảnh vào public/images/
      const publicDir = await dirHandle.getDirectoryHandle("public", { create: true });
      const img2Dir = await publicDir.getDirectoryHandle("images", { create: true });

      for (const draft of done) {
        // Lưu ảnh chính
        const ext = draft.file.name.split(".").pop()?.toLowerCase() || "jpg";
        const imgName = `${draft.slug}.${ext}`;
        const fh = await img2Dir.getFileHandle(imgName, { create: true });
        const writable = await fh.createWritable();
        await writable.write(draft.file);
        await writable.close();

        // Lưu ảnh gallery theo góc
        for (const { key } of GALLERY_ANGLES) {
          const slot = draft.gallery[key];
          if (!slot.file) continue;
          const gExt = slot.file.name.split(".").pop()?.toLowerCase() || "jpg";
          const gName = `${draft.slug}-${key}.${gExt}`;
          const gFh = await img2Dir.getFileHandle(gName, { create: true });
          const gWritable = await gFh.createWritable();
          await gWritable.write(slot.file);
          await gWritable.close();
        }
      }

      // 2. Cập nhật src/data/products.ts
      const srcDir = await dirHandle.getDirectoryHandle("src");
      const dataDir = await srcDir.getDirectoryHandle("data");
      const productsFh = await dataDir.getFileHandle("products.ts");
      const file = await productsFh.getFile();
      const content = await file.text();

      // Tìm điểm chèn: cuối mảng raw[] (trước dòng `];` đầu tiên sau khai báo raw)
      const rawStart = content.indexOf("const raw: RawProduct[] = [");
      if (rawStart === -1) throw new Error("Không tìm thấy mảng raw trong products.ts");
      const endMarker = "\n];\n";
      const insertAt = content.indexOf(endMarker, rawStart);
      if (insertAt === -1) throw new Error("Không tìm thấy cuối mảng raw trong products.ts");

      const newCode = done.map(generateCode).join("\n");
      const timestamp = new Date().toLocaleDateString("vi-VN");
      const comment = `\n\n  // ── THÊM ${timestamp} ────────────────────────────────────────────\n`;
      const newContent =
        content.slice(0, insertAt) + comment + newCode + content.slice(insertAt);

      const writable = await productsFh.createWritable();
      await writable.write(newContent);
      await writable.close();

      // Xoá khỏi danh sách sau khi lưu thành công
      setDrafts((prev) => prev.filter((d) => d.status !== "done"));
      setSaveStatus("done");
      setTimeout(() => setSaveStatus("idle"), 4000);
    } catch (err) {
      setSaveStatus("error");
      alert("Lỗi khi lưu: " + String(err));
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  };

  const pendingCount = drafts.filter((d) => d.status === "pending").length;
  const doneCount = drafts.filter((d) => d.status === "done").length;
  const fsSupportd = typeof window !== "undefined" && "showDirectoryPicker" in window;

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-primary px-6 py-4 text-primary-foreground shadow-sm">
        <div className="font-serif text-xl font-semibold">
          Hoa Tươi Thanh Ngọc — Thêm Sản Phẩm
        </div>
        <button
          onClick={onLogout}
          className="text-sm text-primary-foreground/70 transition hover:text-primary-foreground"
        >
          Đăng xuất
        </button>
      </div>

      <div className="mx-auto max-w-5xl space-y-6 px-4 py-8">
        {/* Browser support warning */}
        {!fsSupportd && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            ⚠️ Trình duyệt không hỗ trợ File System Access API. Vui lòng dùng Chrome hoặc Edge để có thể tự động lưu file.
          </div>
        )}

        {/* Folder picker */}
        <div className="flex items-center gap-4 rounded-xl border border-border bg-background p-4">
          <FolderOpen className="h-5 w-5 shrink-0 text-gold" />
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium text-foreground">Thư mục dự án</div>
            <div className="truncate text-xs text-muted-foreground">
              {dirHandle
                ? `✓ Đã chọn: ${dirHandle.name}`
                : "Chưa chọn — cần chọn để tự động lưu ảnh và products.ts"}
            </div>
          </div>
          {fsSupportd && (
            <button
              onClick={pickDirectory}
              className="shrink-0 rounded-lg border border-border px-4 py-2 text-sm font-medium transition hover:bg-muted"
            >
              {dirHandle ? "Đổi thư mục" : "Chọn thư mục dự án"}
            </button>
          )}
        </div>

        {/* Drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`cursor-pointer rounded-xl border-2 border-dashed p-14 text-center transition select-none ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border bg-background hover:border-primary/50"
          }`}
        >
          <Upload className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
          <p className="font-medium text-foreground">Kéo thả ảnh sản phẩm vào đây</p>
          <p className="mt-1 text-sm text-muted-foreground">Hoặc click để chọn ảnh từ máy tính</p>
          <p className="mt-2 text-xs text-muted-foreground">JPG, PNG, WEBP — nhiều ảnh cùng lúc</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileInput}
          />
        </div>

        {/* Drafts list */}
        {drafts.length > 0 && (
          <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                {drafts.length} ảnh
                {doneCount > 0 && ` · ${doneCount} đã phân tích`}
                {pendingCount > 0 && ` · ${pendingCount} chờ xử lý`}
              </p>
              <div className="flex gap-3">
                {pendingCount > 0 && (
                  <button
                    onClick={analyzeAll}
                    disabled={isAnalyzing}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Đang phân tích {analyzeProgress.current}/{analyzeProgress.total}…
                      </>
                    ) : (
                      <>✨ Phân tích {pendingCount} ảnh với AI</>
                    )}
                  </button>
                )}
                {doneCount > 0 && (
                  <button
                    onClick={() => {
                      drafts.filter((d) => d.status === "done").forEach((d, i) => {
                        setTimeout(() => downloadDraftImages(d), i * 500);
                      });
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium transition hover:bg-muted"
                  >
                    <Download className="h-4 w-4" /> Tải {doneCount} ảnh về máy
                  </button>
                )}
                {doneCount > 0 && (
                  <button
                    onClick={saveToProject}
                    disabled={saveStatus === "saving"}
                    className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-primary transition hover:scale-[1.02] disabled:opacity-60"
                  >
                    {saveStatus === "saving" ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> Đang lưu…</>
                    ) : saveStatus === "done" ? (
                      <><CheckCircle className="h-4 w-4" /> Đã lưu thành công!</>
                    ) : (
                      <><Save className="h-4 w-4" /> Lưu {doneCount} sản phẩm vào dự án</>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Cards */}
            <div className="space-y-3">
              {drafts.map((draft) => (
                <DraftCard
                  key={draft.id}
                  draft={draft}
                  onUpdate={(patch) => updateDraft(draft.id, patch)}
                  onRemove={() => removeDraft(draft.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Draft Card ───────────────────────────────────────────────────────────────

function DraftCard({
  draft,
  onUpdate,
  onRemove,
}: {
  draft: ProductDraft;
  onUpdate: (patch: Partial<ProductDraft>) => void;
  onRemove: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background shadow-sm">
      <div className="flex items-start gap-4 p-4">
        {/* Preview */}
        <img
          src={draft.previewUrl}
          alt=""
          className="h-24 w-24 shrink-0 rounded-lg object-cover"
        />

        {/* Content */}
        <div className="min-w-0 flex-1">
          {draft.status === "pending" && (
            <p className="text-sm text-muted-foreground">
              ⏳ Chờ phân tích — <span className="font-mono text-xs">{draft.file.name}</span>
            </p>
          )}

          {draft.status === "analyzing" && (
            <div className="flex items-center gap-2 text-sm text-primary">
              <Loader2 className="h-4 w-4 animate-spin" />
              Đang phân tích ảnh với Claude AI…
            </div>
          )}

          {draft.status === "error" && (
            <div>
              <p className="text-sm font-medium text-red-500">❌ Lỗi phân tích</p>
              <p className="mt-1 text-xs text-muted-foreground">{draft.errorMsg}</p>
            </div>
          )}

          {draft.status === "done" && (
            <div className="space-y-2">
              {/* Row 1: name + category + price + badge */}
              <div className="flex flex-wrap gap-2">
                <input
                  value={draft.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    onUpdate({ name, slug: toSlug(name) });
                  }}
                  className="min-w-52 flex-1 rounded border border-border px-2 py-1.5 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="Tên sản phẩm"
                />
                <select
                  value={draft.category}
                  onChange={(e) => onUpdate({ category: e.target.value as Category })}
                  className="rounded border border-border px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
                <select
                  value={draft.badge ?? ""}
                  onChange={(e) => onUpdate({ badge: e.target.value || null })}
                  className="rounded border border-border px-2 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="">Không badge</option>
                  <option value="Bán chạy">Bán chạy</option>
                  <option value="Nổi bật">Nổi bật</option>
                </select>
              </div>

              {/* Slug preview */}
              <p className="text-xs text-muted-foreground">
                Slug: <span className="font-mono">{draft.slug}</span>
                &nbsp;·&nbsp;Ảnh:{" "}
                <span className="font-mono">
                  {draft.slug}.{draft.file.name.split(".").pop()}
                </span>
              </p>

              {/* Expand toggle */}
              <button
                onClick={() => setExpanded(!expanded)}
                className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
              >
                {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                {expanded ? "Thu gọn" : "Chỉnh sửa chi tiết"}
              </button>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1">
          {draft.status === "done" && (
            <button
              onClick={() => downloadDraftImages(draft)}
              className="p-1 text-muted-foreground transition hover:text-primary"
              title={`Tải ảnh: ${draft.slug}.${draft.file.name.split(".").pop()}`}
            >
              <Download className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onRemove}
            className="p-1 text-muted-foreground transition hover:text-red-500"
            title="Xoá"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Expanded edit panel */}
      {expanded && draft.status === "done" && (
        <div className="space-y-3 border-t border-border bg-muted/20 p-4">
          <Field label="Mô tả ngắn (short)">
            <textarea
              value={draft.short}
              onChange={(e) => onUpdate({ short: e.target.value })}
              rows={2}
              className="mt-1 w-full rounded border border-border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            />
          </Field>
          <Field label="Mô tả đầy đủ (description)">
            <textarea
              value={draft.description}
              onChange={(e) => onUpdate({ description: e.target.value })}
              rows={3}
              className="mt-1 w-full rounded border border-border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            />
          </Field>
          <Field label="Keywords (phân cách bằng dấu phẩy)">
            <input
              value={draft.keywords.join(", ")}
              onChange={(e) =>
                onUpdate({
                  keywords: e.target.value
                    .split(",")
                    .map((k) => k.trim())
                    .filter(Boolean),
                })
              }
              className="mt-1 w-full rounded border border-border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
            />
          </Field>
          <Field label="Slug (URL-friendly, tự động sinh từ tên)">
            <input
              value={draft.slug}
              onChange={(e) => onUpdate({ slug: e.target.value })}
              className="mt-1 w-full rounded border border-border px-3 py-2 font-mono text-sm outline-none focus:ring-2 focus:ring-primary/30"
            />
          </Field>

          {/* Gallery angles */}
          <div>
            <label className="text-xs font-medium text-muted-foreground">Ảnh gallery (4 góc — tùy chọn)</label>
            <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {GALLERY_ANGLES.map(({ key, label }) => {
                const slot = draft.gallery[key];
                return (
                  <label key={key} className="cursor-pointer">
                    <div className={`relative flex h-24 items-center justify-center overflow-hidden rounded-lg border-2 border-dashed transition ${slot.previewUrl ? "border-primary/40" : "border-border hover:border-primary/40"}`}>
                      {slot.previewUrl ? (
                        <>
                          <img src={slot.previewUrl} alt={label} className="h-full w-full object-cover" />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              if (slot.previewUrl) URL.revokeObjectURL(slot.previewUrl);
                              onUpdate({ gallery: { ...draft.gallery, [key]: { file: null, previewUrl: "" } } });
                            }}
                            className="absolute right-1 top-1 rounded-full bg-black/50 p-0.5 text-white hover:bg-red-500"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </>
                      ) : (
                        <Upload className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <p className="mt-1 text-center text-xs text-muted-foreground">{label}</p>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (!f) return;
                        if (slot.previewUrl) URL.revokeObjectURL(slot.previewUrl);
                        onUpdate({ gallery: { ...draft.gallery, [key]: { file: f, previewUrl: URL.createObjectURL(f) } } });
                        e.target.value = "";
                      }}
                    />
                  </label>
                );
              })}
            </div>
          </div>

          {/* Code preview */}
          <Field label="Preview TypeScript code sẽ được chèn vào products.ts">
            <pre className="mt-1 overflow-auto rounded-lg bg-muted p-3 text-xs leading-relaxed">
              {generateCode(draft)}
            </pre>
          </Field>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}
