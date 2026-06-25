const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Data directory (only for local development)
const DATA_DIR = path.join(__dirname, 'data');
const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL;

// Only create data directory in local development
if (!isProduction && !fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helper functions for file operations (only works locally)
const readJsonFile = (filename) => {
    if (isProduction) return null; // Skip file read in production
    
    const filepath = path.join(DATA_DIR, filename);
    if (fs.existsSync(filepath)) {
        return JSON.parse(fs.readFileSync(filepath, 'utf8'));
    }
    return null;
};

const writeJsonFile = (filename, data) => {
    if (isProduction) return; // Skip file write in production
    
    const filepath = path.join(DATA_DIR, filename);
    fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');
};

// In-memory data storage (untuk Vercel serverless)
let products = [
    {
        id: 1,
        name: "Juragan Ayam Original",
        description: "Ayam goreng dengan bumbu original yang gurih dan renyah",
        price: 25000,
        image: "https://i.imgur.com/2mZhAGX.png",
        category: "original",
        stock: 50
    },
    {
        id: 2,
        name: "Juragan Ayam Spicy",
        description: "Ayam goreng pedas dengan sensasi yang menggigit",
        price: 27000,
        image: "https://i.imgur.com/2mZhAGX.png",
        category: "spicy",
        stock: 45
    },
    {
        id: 3,
        name: "Juragan Ayam Crispy",
        description: "Extra crispy dengan lapisan tepung yang super renyah",
        price: 28000,
        image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=500&h=400&fit=crop&q=80",
        category: "crispy",
        stock: 40
    },
    {
        id: 4,
        name: "Paket Hemat 5 Potong",
        description: "Paket hemat berisi 5 potong ayam goreng pilihan",
        price: 115000,
        image: "https://statik.tempo.co/data/2024/01/09/id_1269783/1269783_720.jpg",
        category: "paket",
        stock: 30
    },
    {
        id: 5,
        name: "Juragan Ayam Keju",
        description: "Ayam goreng dengan taburan keju mozarella",
        price: 30000,
        image: "https://www.dapurkobe.co.id/wp-content/uploads/ayam-geprek-keju.jpg",
        category: "special",
        stock: 35
    },
    {
        id: 6,
        name: "Paket Keluarga",
        description: "Paket untuk keluarga berisi 10 potong ayam + nasi + minuman",
        price: 200000,
        image: "https://down-id.img.susercontent.com/file/id-11134207-7r98y-lqvdq6o99ykp75@resize_w900_nl.webp",
        category: "paket",
        stock: 20
    }
];

let orders = [];

// Settings data - load from file (local) or use default (production)
const defaultSettings = {
    address: "Jl. Ayam Goreng Raya No. 123, Jakarta",
    phone: "+62 812-3456-7890",
    email: "info@juraganayam.com"
};

let settings = readJsonFile('settings.json') || defaultSettings;

// Save default settings if file doesn't exist (local only)
if (!isProduction && !readJsonFile('settings.json')) {
    writeJsonFile('settings.json', settings);
    console.log('📁 Created default settings.json file');
}

console.log(`🌍 Environment: ${isProduction ? 'PRODUCTION (Vercel)' : 'LOCAL DEVELOPMENT'}`);
console.log('⚙️ Settings:', settings);

// API Routes

// GET semua produk
app.get('/api/products', (req, res) => {
    try {
        res.json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET produk by ID
app.get('/api/products/:id', (req, res) => {
    try {
        const product = products.find(p => p.id === parseInt(req.params.id));
        if (product) {
            res.json({ success: true, data: product });
        } else {
            res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST order baru
app.post('/api/orders', (req, res) => {
    try {
        const { customerName, phone, address, paymentMethod, items, total } = req.body;
        
        if (!customerName || !phone || !address || !paymentMethod || !items || !total) {
            return res.status(400).json({ 
                success: false, 
                message: 'Data tidak lengkap' 
            });
        }

        // Validasi dan kurangi stok
        for (const item of items) {
            const product = products.find(p => p.id === item.id);
            if (!product) {
                return res.status(404).json({ 
                    success: false, 
                    message: `Produk ${item.name} tidak ditemukan` 
                });
            }
            if (product.stock < item.quantity) {
                return res.status(400).json({ 
                    success: false, 
                    message: `Stok ${product.name} tidak mencukupi` 
                });
            }
            product.stock -= item.quantity;
        }

        // Simpan order
        // Tentukan status order berdasarkan metode pembayaran
        // Check if payment method contains "Cash" or "Tunai"
        const isCashPayment = paymentMethod.includes('Cash') || paymentMethod.includes('Tunai');
        const orderStatus = isCashPayment ? 'pending' : 'pending_payment';
        const paymentStatus = isCashPayment ? 'confirmed' : 'waiting_confirmation';
        
        const newOrder = {
            id: orders.length + 1,
            orderNumber: `ORD${Date.now()}`,
            customerName,
            phone,
            address,
            paymentMethod,
            items,
            total,
            status: orderStatus,
            paymentStatus: paymentStatus,
            createdAt: new Date().toISOString()
        };

        orders.push(newOrder);

        res.json({ 
            success: true, 
            message: isCashPayment 
                ? 'Pesanan berhasil dibuat! Siap diantar! 🚚' 
                : 'Pesanan berhasil dibuat! Silakan lakukan pembayaran dan tunggu konfirmasi admin. 💳',
            data: newOrder 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET semua orders
app.get('/api/orders', (req, res) => {
    try {
        res.json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// UPDATE order status
app.put('/api/orders/:orderNumber/status', (req, res) => {
    try {
        const { orderNumber } = req.params;
        const { status } = req.body;
        
        const orderIndex = orders.findIndex(o => o.orderNumber === orderNumber);
        
        if (orderIndex === -1) {
            return res.status(404).json({ 
                success: false, 
                message: 'Pesanan tidak ditemukan' 
            });
        }
        
        orders[orderIndex].status = status;
        orders[orderIndex].updatedAt = new Date().toISOString();
        
        res.json({ 
            success: true, 
            message: 'Status pesanan berhasil diupdate',
            data: orders[orderIndex]
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// CONFIRM payment (admin)
app.put('/api/orders/:orderNumber/confirm-payment', (req, res) => {
    try {
        const { orderNumber } = req.params;
        
        const orderIndex = orders.findIndex(o => o.orderNumber === orderNumber);
        
        if (orderIndex === -1) {
            return res.status(404).json({ 
                success: false, 
                message: 'Pesanan tidak ditemukan' 
            });
        }
        
        // Update payment status to confirmed and order status to pending
        orders[orderIndex].paymentStatus = 'confirmed';
        orders[orderIndex].status = 'pending'; // Now ready for delivery
        orders[orderIndex].paymentConfirmedAt = new Date().toISOString();
        
        res.json({ 
            success: true, 
            message: 'Pembayaran berhasil dikonfirmasi! Pesanan siap diproses! 💰',
            data: orders[orderIndex]
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// DELETE order
app.delete('/api/orders/:orderNumber', (req, res) => {
    try {
        const { orderNumber } = req.params;
        
        const initialLength = orders.length;
        orders = orders.filter(o => o.orderNumber !== orderNumber);
        
        if (orders.length === initialLength) {
            return res.status(404).json({ 
                success: false, 
                message: 'Pesanan tidak ditemukan' 
            });
        }
        
        res.json({ 
            success: true, 
            message: 'Pesanan berhasil dihapus'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET settings
app.get('/api/settings', (req, res) => {
    try {
        res.json({ success: true, data: settings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// UPDATE settings
app.put('/api/settings', (req, res) => {
    try {
        console.log('📝 Update settings request:', req.body);
        
        const { address, phone, email } = req.body;
        
        if (!address || !phone || !email) {
            console.log('❌ Validation failed: missing fields');
            return res.status(400).json({ 
                success: false, 
                message: 'Alamat, Telepon, dan Email harus diisi!' 
            });
        }
        
        settings.address = address;
        settings.phone = phone;
        settings.email = email;
        
        // Save to file for persistence (local only)
        if (!isProduction) {
            try {
                writeJsonFile('settings.json', settings);
                console.log('✅ Settings saved to file:', settings);
            } catch (fileError) {
                console.error('❌ File write error:', fileError);
                // Don't throw - continue even if file write fails
            }
        } else {
            console.log('⚠️ Production mode: settings stored in memory only');
        }
        
        res.json({ 
            success: true, 
            message: 'Informasi kontak berhasil diupdate! 📞' + (isProduction ? ' (Stored in memory - will reset on redeploy)' : ''),
            data: settings
        });
    } catch (error) {
        console.error('❌ Server error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Terjadi kesalahan: ' + error.message 
        });
    }
});

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🐔 Server Juragan Ayam berjalan di http://localhost:${PORT}`);
        console.log(`📦 API tersedia di http://localhost:${PORT}/api/products`);
    });
}

// Export for Vercel
module.exports = app;
