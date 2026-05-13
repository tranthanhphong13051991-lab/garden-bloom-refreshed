import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Category } from "@/data/products";

type CategoryImagesState = {
  /** category id → base64 data URL of the category image */
  images: Partial<Record<Category, string>>;
  setImage: (category: Category, file: File) => Promise<void>;
  removeImage: (category: Category) => void;
};

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Không đọc được file"));
    reader.readAsDataURL(file);
  });
}

export const useCategoryImages = create<CategoryImagesState>()(
  persist(
    (set) => ({
      images: {},

      setImage: async (category, file) => {
        const base64 = await fileToBase64(file);
        set((s) => ({
          images: { ...s.images, [category]: base64 },
        }));
      },

      removeImage: (category) =>
        set((s) => {
          const newImages = { ...s.images };
          delete newImages[category];
          return { images: newImages };
        }),
    }),
    {
      name: "thanh-ngoc-category-images",
      skipHydration: true,
    },
  ),
);

/** Helper: lấy ảnh danh mục (ưu tiên ảnh đã upload, fallback về ảnh từ sản phẩm đầu tiên) */
export function getCategoryImageUrl(
  catId: Category,
  storedImages: Partial<Record<Category, string>>,
  fallbackUrl?: string,
): string | undefined {
  return storedImages[catId] || fallbackUrl;
}