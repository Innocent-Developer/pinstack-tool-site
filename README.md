# PinStack.cc — The Modern Developer Tool Stack

> **Domain:** [https://pinstack.cc](https://pinstack.cc)  
> **Ecosystem:** A free utility suite by [apitestlab.org](https://apitestlab.org)  
> **Created by:** [Abubakkar Sajid (abubakkar.dev)](https://abubakkar.dev)

PinStack is an ultra-fast, zero-latency suite of developer utilities designed for software engineers, backend architects, and API developers. 

Built with **Next.js 14 (App Router)** and **Tailwind CSS**, featuring **100% in-browser client-side execution**, **zero server compute costs**, and **advanced SEO & Google AdSense optimization**.

---

## 📌 Key Architectural Features

1. **"My Pinned Stack" Workflow:** Developers can click the pin icon (📌) on any tool card to prioritize their most frequently used utilities. Stored automatically in `localStorage`.
2. **100% Client-Side Privacy:** Sensitive JSON responses, SQL schemas, and JWT authorization tokens execute strictly in the browser. No data is transmitted to remote servers.
3. **Core Web Vitals & Sub-Millisecond Speed:** Instant real-time parsing with zero layout shifts (CLS), clean typography, and responsive light theme.
4. **Google AdSense Ready:** Pre-configured responsive and horizontal ad unit containers with official `ads.txt` and Google AdSense loader.
5. **Advanced SEO & Rich Snippets:**
   - `WebSite` Schema with Sitelinks SearchBox
   - `SoftwareApplication` Schema on each tool
   - `FAQPage` Schema with interactive accordions
   - `BlogPosting` Schema across all guides
   - Dynamic `sitemap.ts` and `robots.ts`

---

## 🛠 Included Interactive Utilities

- **JSON to TypeScript, Go & Python** (`/tools/json-to-typescript`)
- **SQL Query Formatter & Beautifier** (`/tools/sql-formatter`)
- **JWT Token Debugger & Inspector** (`/tools/jwt-debugger`)
- **Regex Live Tester & Explainer** (`/tools/regex-tester`)
- **Cron Expression Schedule Generator** (`/tools/cron-generator`)
- **Base64 & URL Encoder / Decoder** (`/tools/base64-encoder`)

---

## 📚 Technical Blog & Guides

- `/blog/how-to-convert-json-to-typescript-interfaces`
- `/blog/debugging-jwt-tokens-safely`
- `/blog/sql-formatting-best-practices`
- `/blog/master-crontab-syntax-guide`
- `/blog/regex-cheat-sheet-and-real-world-patterns`

---

## 🚀 Deployment Instructions for `pinstack.cc`

### 1. DNS Settings (at your domain registrar)
Add these two DNS records for `pinstack.cc`:
- **A Record:** `@` -> `76.76.21.21`
- **CNAME Record:** `www` -> `cname.vercel-dns.com`

### 2. Vercel Deployment
1. Push this directory to your GitHub account (`pinstack-web`).
2. Import project into [Vercel](https://vercel.com).
3. Under **Project Settings -> Domains**, assign:
   - `pinstack.cc`
   - `www.pinstack.cc` (redirect to `pinstack.cc`)

### 3. Google AdSense Setup
1. Replace `ca-pub-XXXXXXXXXXXXXXXX` in `src/lib/siteConfig.ts` with your AdSense Publisher ID.
2. Update `public/ads.txt` with your numerical ID.
3. Submit `pinstack.cc` under **Sites -> Add site** in Google AdSense.
