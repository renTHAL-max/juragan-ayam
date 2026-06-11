# 🚀 Panduan Deploy Juragan Ayam ke Vercel

## Persiapan

### 1. Install Git (jika belum)
Download dari: https://git-scm.com/download/win

### 2. Install Vercel CLI
```bash
npm install -g vercel
```

### 3. Buat Akun Vercel
- Buka: https://vercel.com/signup
- Daftar dengan GitHub/Google/Email

---

## Cara Deploy

### Metode 1: Via GitHub (Recommended)

#### A. Upload ke GitHub
1. **Buat Repository di GitHub**
   - Buka: https://github.com/new
   - Nama: `juragan-ayam`
   - Public atau Private (terserah)
   - Klik "Create repository"

2. **Upload Project ke GitHub**
   ```bash
   cd juragan-ayam
   git init
   git add .
   git commit -m "Initial commit - Juragan Ayam"
   git branch -M main
   git remote add origin https://github.com/USERNAME/juragan-ayam.git
   git push -u origin main
   ```
   *Ganti USERNAME dengan username GitHub Anda*

#### B. Deploy dari Vercel Dashboard
1. Login ke https://vercel.com
2. Klik "Add New" → "Project"
3. Import repository `juragan-ayam`
4. Settings:
   - **Framework Preset**: Other
   - **Build Command**: `npm install`
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`
   
5. Klik "Deploy"
6. Tunggu 1-2 menit
7. ✅ Website live di: `juragan-ayam.vercel.app`

---

### Metode 2: Via Vercel CLI (Lebih Cepat)

```bash
cd juragan-ayam
vercel login
vercel
```

Jawab pertanyaan:
- Set up and deploy? → Y
- Which scope? → Pilih akun Anda
- Link to existing project? → N
- What's your project's name? → juragan-ayam
- In which directory is your code located? → ./
- Want to override the settings? → N

Tunggu proses deploy selesai, akan muncul URL seperti:
```
✅ https://juragan-ayam.vercel.app
```

---

## Konfigurasi Tambahan

### File yang Perlu Ditambahkan

#### 1. vercel.json
Buat file `vercel.json` di root project:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    },
    {
      "src": "public/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/public/$1"
    }
  ]
}
```

#### 2. .vercelignore
```
node_modules
.git
data
*.log
```

#### 3. Update package.json
Tambahkan di `scripts`:
```json
"scripts": {
  "start": "node server.js",
  "dev": "node server.js",
  "build": "echo 'No build step required'"
}
```

---

## Custom Domain (Opsional)

### Gunakan Domain Gratis Vercel
- Default: `juragan-ayam.vercel.app`
- Custom: Bisa tambah domain sendiri di Vercel Dashboard

### Cara Ganti Nama Project
1. Buka Vercel Dashboard
2. Pilih project "juragan-ayam"
3. Settings → General → Project Name
4. Ganti sesuai keinginan
5. Save

---

## Update Website

Setelah deploy, setiap kali ada perubahan:

### Via GitHub
```bash
git add .
git commit -m "Update fitur baru"
git push
```
Vercel otomatis deploy perubahan baru!

### Via Vercel CLI
```bash
vercel --prod
```

---

## Troubleshooting

### Error: Cannot find module
```bash
npm install
vercel --prod
```

### Database/Data Hilang
- Vercel adalah serverless, file lokal tidak persisten
- Gunakan database cloud:
  - MongoDB Atlas (gratis)
  - Supabase (gratis)
  - PlanetScale (gratis)

### API Error
- Pastikan base URL di `app.js` sudah benar
- Ubah dari `http://localhost:3000/api` ke `/api`

---

## Alternative: Netlify

### Deploy ke Netlify
1. Buka: https://app.netlify.com
2. Drag & drop folder `juragan-ayam`
3. Website live!

URL: `juragan-ayam.netlify.app`

---

## Alternative: Railway

### Deploy ke Railway
1. Buka: https://railway.app
2. Login dengan GitHub
3. New Project → Deploy from GitHub
4. Pilih repository `juragan-ayam`
5. Railway otomatis detect Node.js
6. Website live dengan custom URL!

---

## Kesimpulan

**Vercel (Recommended):**
- ✅ Gratis
- ✅ HTTPS otomatis
- ✅ Deploy cepat (1-2 menit)
- ✅ Auto deploy dari GitHub
- ✅ Custom domain support
- ✅ Analytics gratis

**Hasil Akhir:**
```
https://juragan-ayam.vercel.app
atau
https://juraganayam.vercel.app
```

---

## Support

Butuh bantuan? 
- Vercel Docs: https://vercel.com/docs
- Discord Vercel: https://vercel.com/discord

Selamat mencoba! 🚀🐔
