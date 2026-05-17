# Plan: Deploy to Vercel

1. ✅ Write `VERCEL_DEPLOY_GUIDE.md` (done)
2. Update `vite.config.ts` — disable Cloudflare plugin, remove custom server entry
3. Update `src/server.ts` — make it Vercel-compatible (no Cloudflare Worker wrappers)
4. Create `api/index.js` — Vercel serverless function entry point  
5. Create `vercel.json` — routing configuration