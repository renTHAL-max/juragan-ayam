# 🔐 Informasi Login Admin

## Akses Admin Dashboard

### URL Login:
```
http://localhost:3000/login.html
```

### Kredensial Default:
```
Username: admin
Password: juragan2024
```

---

## 🔒 Fitur Keamanan

### 1. Session Management
- Login menggunakan `sessionStorage`
- Sesi berlaku selama **24 jam**
- Setelah 24 jam, otomatis logout dan harus login lagi

### 2. Protected Routes
- Halaman admin (`admin.html`) **tidak bisa diakses** tanpa login
- Otomatis redirect ke halaman login jika belum login
- Setelah login berhasil, langsung masuk dashboard

### 3. Logout
- Tombol logout tersedia di sidebar admin
- Confirm dialog sebelum logout
- Clear session data setelah logout

---

## 🛠️ Cara Ganti Username & Password

Edit file: `public/login.html`

Cari baris ini (sekitar line 182-183):
```javascript
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'juragan2024';
```

Ganti sesuai keinginan:
```javascript
const ADMIN_USERNAME = 'usernameKamu';
const ADMIN_PASSWORD = 'passwordKamu123';
```

**Recommended Password:**
- Minimal 8 karakter
- Kombinasi huruf, angka, dan simbol
- Contoh: `Ayam@2024!`

---

## 📱 Cara Akses

### 1. Dari Browser Komputer
```
http://localhost:3000/login.html
```

### 2. Setelah Deploy ke Vercel
```
https://juragan-ayam.vercel.app/login.html
```

### 3. Dari HP (setelah deploy)
```
https://juragan-ayam.vercel.app/login.html
```

---

## ⚠️ Keamanan Penting!

### Jangan Share:
- ❌ Username & password
- ❌ Link admin dashboard ke orang lain
- ❌ Screenshot login credentials

### Untuk Keamanan Lebih:
1. **Ganti password** secara berkala
2. **Gunakan password yang kuat**
3. **Logout** setelah selesai menggunakan
4. Jangan login di komputer umum/warnet

---

## 🔄 Alur Login

```
1. Buka login.html
   ↓
2. Masukkan username & password
   ↓
3. Klik "Login"
   ↓
4. Validasi credentials
   ↓
5. ✅ Berhasil → Redirect ke admin.html
   ❌ Gagal → Tampilkan error message
```

---

## 🎯 Testing Login

### Test Case 1: Login Berhasil
```
Username: admin
Password: juragan2024
Result: ✅ Masuk dashboard
```

### Test Case 2: Password Salah
```
Username: admin
Password: salah123
Result: ❌ Error message muncul
```

### Test Case 3: Username Salah
```
Username: user
Password: juragan2024
Result: ❌ Error message muncul
```

### Test Case 4: Akses Admin Tanpa Login
```
Langsung buka: admin.html
Result: ❌ Redirect ke login.html
```

---

## 🚀 Setelah Deploy

Setelah deploy ke Vercel, update URL di file berikut:

### File: `public/login.html`
Tidak perlu diubah (sudah relative path)

### File: `public/admin-script.js`
Ubah API_URL dari:
```javascript
const API_URL = 'http://localhost:3000/api';
```
Menjadi:
```javascript
const API_URL = '/api';
```

---

## 📞 Troubleshooting

### Lupa Password?
Edit `public/login.html` dan ganti password baru

### Session Expired?
Login ulang di `login.html`

### Tidak Bisa Login?
1. Cek username & password
2. Clear browser cache
3. Hard refresh (Ctrl + F5)

---

## 💡 Tips

1. **Bookmark** halaman login supaya mudah akses
2. **Save password** di browser (opsional)
3. **Test login** sebelum deploy
4. **Ganti password** setelah deploy

---

## ✅ Checklist Setelah Setup

- [ ] Test login dengan kredensial default
- [ ] Ganti username & password sesuai keinginan
- [ ] Test logout button
- [ ] Test akses admin tanpa login (harus redirect)
- [ ] Save kredensial di tempat aman
- [ ] Deploy ke Vercel
- [ ] Test login di versi online

---

**Dibuat untuk: Juragan Ayam**  
**Security Level: Basic (Session-based)**  
**Last Updated: 2024**

