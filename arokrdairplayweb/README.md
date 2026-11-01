# AirBridge Web (arokrdairplayweb)

Modern, high-performance landing page and download hub for **AirBridge** (Native iOS AirPlay Receiver for Windows & Arch Linux).

Designed with a clean, Apple-inspired **White & Blue** aesthetic, interactive app screenshots, feature breakdown, and one-click `.exe` download triggers.

---

## 🚀 Features

- **White & Blue Aesthetic:** Glassmorphic UI with vibrant electric blue `#007AFF` accents, ice-blue gradients, and crisp white cards.
- **Direct Downloads:** Instant one-click download for `AirBridge.exe`, `AirBridge-setup-1.0.0.exe`, and portable `.zip`.
- **Full-Stack API Routes:**
  - `/api/download?target=exe`: Direct redirect or stream to download the standalone executable.
  - `/api/download?target=installer`: Download the full Windows setup installer.
  - `/api/release`: Cached proxy to GitHub API for latest release info.
- **App Showcase:** Live framed preview of the actual Windows 11 Blue & White UI (`preview.png`) and iOS Control Center flow.
- **Vercel Ready:** Preconfigured for instant one-click deployment on Vercel with zero config.

---

## 🛠️ Local Development

```bash
# Navigate to the web folder
cd arokrdairplayweb

# Install dependencies (pnpm or npm)
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚢 Deploying to Vercel

### Option 1: Via Vercel CLI (Fastest)

```bash
# In the arokrdairplayweb directory
npm i -g vercel
vercel
```

Follow the prompt to log in and deploy. For production:
```bash
vercel --prod
```

### Option 2: Via GitHub Import on Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and log in.
2. Click **Add New** → **Project**.
3. Import your GitHub repository `Aro-KRD/aro-krd-airplay`.
4. In **Root Directory**, click **Edit** and choose `arokrdairplayweb`.
5. Click **Deploy**! Vercel will automatically build and publish your site with a free `*.vercel.app` domain and SSL certificate.
