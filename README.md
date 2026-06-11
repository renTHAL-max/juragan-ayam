# 🐔 Juragan Ayam - Aplikasi Penjualan Ayam Kentucky

Selamat datang di **Juragan Ayam**! Aplikasi web untuk penjualan ayam Kentucky yang lezat dan renyah.

## 🌟 Fitur Utama

- ✅ Tampilan modern dan responsif
- ✅ Katalog produk dengan kategori
- ✅ Keranjang belanja interaktif
- ✅ Sistem pemesanan online
- ✅ Manajemen stok otomatis
- ✅ API RESTful backend

## 🛠️ Teknologi yang Digunakan

### Frontend
- HTML5
- CSS3 (dengan animasi modern)
- JavaScript (Vanilla JS)
- Font Awesome Icons

### Backend
- Node.js
- Express.js
- Body Parser
- CORS
- JSON File Database

## 📦 Instalasi

### 1. Pastikan Node.js sudah terinstall
Cek versi Node.js Anda:
```bash
node --version
```

Jika belum terinstall, download dari [nodejs.org](https://nodejs.org/)

### 2. Install Dependencies
Masuk ke folder project dan install:
```bash
cd juragan-ayam
npm install
```

### 3. Jalankan Server
```bash
npm start
```

Server akan berjalan di: **http://localhost:3000**

## 📱 Cara Menggunakan

1. **Buka aplikasi** di browser: `http://localhost:3000`
2. **Pilih kategori** ayam yang diinginkan (Original, Spicy, Crispy, dll)
3. **Tambahkan ke keranjang** dengan klik tombol "Tambah ke Keranjang"
4. **Lihat keranjang** dengan klik icon keranjang di header
5. **Checkout** dan isi form pemesanan
6. **Konfirmasi pesanan** dan dapatkan nomor pesanan

## 🎨 Fitur Frontend

- **Hero Section** - Banner menarik dengan gambar ayam
- **Filter Kategori** - Filter produk berdasarkan kategori
- **Product Cards** - Tampilan card produk yang menarik
- **Shopping Cart** - Keranjang belanja interaktif dengan CRUD
- **Checkout Form** - Form pemesanan lengkap
- **Responsive Design** - Tampilan optimal di semua device
- **Smooth Animations** - Animasi halus dan modern

## 🔌 API Endpoints

### Products
- `GET /api/products` - Dapatkan semua produk
- `GET /api/products/:id` - Dapatkan produk berdasarkan ID

### Orders
- `POST /api/orders` - Buat pesanan baru
- `GET /api/orders` - Dapatkan semua pesanan

### Contoh Request POST Order:
```json
{
  "customerName": "John Doe",
  "phone": "081234567890",
  "address": "Jl. Contoh No. 123",
  "items": [
    {
      "id": 1,
      "name": "Ayam Kentucky Original",
      "price": 25000,
      "quantity": 2
    }
  ],
  "total": 50000
}
```

## 📂 Struktur Project

```
juragan-ayam/
├── server.js              # Backend server
├── package.json           # Dependencies
├── data/                  # Database JSON
│   ├── products.json      # Data produk
│   └── orders.json        # Data pesanan
└── public/                # Frontend files
    ├── index.html         # Halaman utama
    ├── styles.css         # Stylesheet
    └── app.js             # JavaScript logic
```

## 🎯 Kategori Produk

1. **Original** - Ayam Kentucky rasa original
2. **Spicy** - Varian pedas
3. **Crispy** - Extra renyah
4. **Special** - Menu spesial (Cheese, dll)
5. **Paket** - Paket hemat untuk keluarga

## 🚀 Pengembangan Lebih Lanjut

Beberapa fitur yang bisa ditambahkan:
- Database MySQL/PostgreSQL/MongoDB
- Sistem autentikasi user
- Dashboard admin untuk manage produk
- Payment gateway integration
- Real-time order tracking
- Review dan rating produk
- Promo dan discount system

## 📞 Kontak

- **Alamat**: Jl. Ayam Kentucky No. 123, Jakarta
- **Telepon**: +62 812-3456-7890
- **Email**: info@juraganayam.com

## 📄 License

MIT License - Bebas digunakan untuk pembelajaran dan pengembangan.

---

**Dibuat dengan ❤️ untuk pecinta ayam Kentucky!**

🐔 **Juragan Ayam - Raja Ayam Kentucky se-Indonesia!** 🐔
