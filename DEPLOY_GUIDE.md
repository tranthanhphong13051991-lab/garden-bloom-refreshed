# Hướng Dẫn Deploy Trực Tiếp Bằng Kéo Thả Trên GitHub

## 1. Build dự án

```bash
npm install
npm run build
```

Sau khi build xong, thư mục `dist/` chứa toàn bộ file tĩnh (HTML, CSS, JS).

---

## 2. Tạo repository trên GitHub (nếu chưa có)

1. Vào [github.com/new](https://github.com/new)
2. Đặt tên repository (ví dụ: `garden-bloom-renewed`)
3. Chọn **Public**
4. Click **"Create repository"**

> **Lưu ý**: Nếu bạn muốn deploy bằng GitHub Pages, repository phải là **Public** (hoặc Private nếu có GitHub Pro).

---

## 3. Deploy bằng cách kéo thả trực tiếp lên GitHub

### Cách 1: Kéo thả toàn bộ dự án (bao gồm source code)

1. **Vào repository trên GitHub** → Click **"Add file"** → **"Upload files"**

2. **Kéo thả** toàn bộ thư mục dự án (gồm `dist/`, `src/`, `package.json`, ...) vào vùng upload.
   - Hoặc kéo thả riêng file/thư mục cần thiết.

3. **Commit message**: Nhập `Initial deploy bằng kéo thả`

4. **Chọn branch**: `main` (hoặc `master`)

5. Click **"Commit changes"**

### Cách 2: Chỉ kéo thả thư mục build `dist/` (dành cho GitHub Pages)

1. **Vào repository** → Tạo branch mới tên `gh-pages`
   ```
   Click "main" → gõ "gh-pages" → "Create branch: gh-pages"
   ```

2. **Chuyển sang branch `gh-pages`**

3. **Click "Add file"** → **"Upload files"**

4. **Kéo thả toàn bộ nội dung trong thư mục `dist/`** vào vùng upload (kéo các file bên trong `dist/`, không kéo cả thư mục `dist`)

5. **Commit message**: `Deploy build dist`

6. Click **"Commit changes"**

---

## 4. Kích hoạt GitHub Pages

1. **Vào repository** → **Settings** → **Pages** (thanh sidebar bên trái)

2. **Source**: Chọn **"Deploy from a branch"**

3. **Branch**: Chọn `gh-pages` → `/ (root)` → **Save**

4. Đợi 1-2 phút, GitHub sẽ cấp URL: `https://<username>.github.io/garden-bloom-renewed/`

---

## 5. Deploy lại khi có thay đổi (kéo thả lần 2)

Khi bạn update code và build lại:

1. **Vào repository trên GitHub**
2. **Chuyển sang branch `gh-pages`**
3. **Click "Add file"** → **"Upload files"**
4. **Kéo thả lại** nội dung mới từ thư mục `dist/`
5. **Chọn "Overwrite existing files"** nếu có thông báo
6. **Commit changes**

Sau vài phút, GitHub Pages sẽ tự động cập nhật.

---

## 6. Deploy bằng cách kéo thả lên GitHub Actions (CI/CD tự động)

1. **Tạo file `.github/workflows/deploy-pages.yml`** trong dự án của bạn:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

2. **Kéo thả file này lên GitHub**:
   - Vào repository → **"Add file"** → **"Upload files"**
   - Kéo thả file `deploy-pages.yml` vào
   - Commit

3. Từ lần sau, **chỉ cần push code lên branch `main`** (hoặc kéo thả file mới lên GitHub), GitHub Actions sẽ tự động build và deploy.

---

## Tóm tắt các bước nhanh

```
1. npm install && npm run build
2. Vào GitHub repository → Add file → Upload files
3. Kéo thả nội dung thư mục dist/ lên GitHub
4. Commit changes
5. Vào Settings → Pages → Chọn branch gh-pages
6. Done! 🎉