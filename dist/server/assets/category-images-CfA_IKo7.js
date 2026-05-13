import { create } from "zustand";
import { persist } from "zustand/middleware";
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Không đọc được file"));
    reader.readAsDataURL(file);
  });
}
const useCategoryImages = create()(
  persist(
    (set) => ({
      images: {},
      setImage: async (category, file) => {
        const base64 = await fileToBase64(file);
        set((s) => ({
          images: { ...s.images, [category]: base64 }
        }));
      },
      removeImage: (category) => set((s) => {
        const newImages = { ...s.images };
        delete newImages[category];
        return { images: newImages };
      })
    }),
    {
      name: "thanh-ngoc-category-images",
      skipHydration: true
    }
  )
);
export {
  useCategoryImages as u
};
