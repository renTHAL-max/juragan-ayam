const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// File untuk menyimpan data
const DATA_FILE = path.join(__dirname, 'data', 'products.json');
const ORDERS_FILE = path.join(__dirname, 'data', 'orders.json');

// Pastikan folder data ada
if (!fs.existsSync('./data')) {
    fs.mkdirSync('./data');
}

// Inisialisasi data produk jika belum ada
if (!fs.existsSync(DATA_FILE)) {
    const initialProducts = [
        {
            id: 1,
            name: "Ayam Kentucky Original",
            description: "Ayam kentucky dengan bumbu original yang gurih dan renyah",
            price: 25000,
            image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&h=400&fit=crop&q=80",
            category: "original",
            stock: 50
        },
        {
            id: 2,
            name: "Ayam Kentucky Spicy",
            description: "Ayam kentucky pedas dengan sensasi yang menggigit",
            price: 27000,
            image: "https://h2omart.com.au/wp-content/uploads/2023/12/fried1.jpg",
            category: "spicy",
            stock: 45
        },
        {
            id: 3,
            name: "Ayam Kentucky Crispy",
            description: "Extra crispy dengan lapisan tepung yang super renyah",
            price: 28000,
            image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=500&h=400&fit=crop&q=80",
            category: "crispy",
            stock: 40
        },
        {
            id: 4,
            name: "Paket Hemat 5 Potong",
            description: "Paket hemat berisi 5 potong ayam kentucky pilihan",
            price: 115000,
            image: "https://statik.tempo.co/data/2024/01/09/id_1269783/1269783_720.jpg",
            category: "paket",
            stock: 30
        },
        {
            id: 5,
            name: "Ayam Kentucky Cheese",
            description: "Ayam kentucky dengan taburan keju mozarella",
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
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialProducts, null, 2));
}

// Inisialisasi data orders jika belum ada
if (!fs.existsSync(ORDERS_FILE)) {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2));
}

// Helper functions
const readProducts = () => {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
};

const writeProducts = (products) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2));
};

const readOrders = () => {
    const data = fs.readFileSync(ORDERS_FILE, 'utf8');
    return JSON.parse(data);
};

const writeOrders = (orders) => {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
};

// API Routes

// GET semua produk
app.get('/api/products', (req, res) => {
    try {
        const products = readProducts();
        res.json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET produk by ID
app.get('/api/products/:id', (req, res) => {
    try {
        const products = readProducts();
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

        const products = readProducts();
        const orders = readOrders();

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
        const newOrder = {
            id: orders.length + 1,
            orderNumber: `ORD${Date.now()}`,
            customerName,
            phone,
            address,
            paymentMethod,
            items,
            total,
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        orders.push(newOrder);
        writeOrders(orders);
        writeProducts(products);

        res.json({ 
            success: true, 
            message: 'Pesanan berhasil dibuat', 
            data: newOrder 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET semua orders
app.get('/api/orders', (req, res) => {
    try {
        const orders = readOrders();
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
        
        const orders = readOrders();
        const orderIndex = orders.findIndex(o => o.orderNumber === orderNumber);
        
        if (orderIndex === -1) {
            return res.status(404).json({ 
                success: false, 
                message: 'Pesanan tidak ditemukan' 
            });
        }
        
        orders[orderIndex].status = status;
        orders[orderIndex].updatedAt = new Date().toISOString();
        
        writeOrders(orders);
        
        res.json({ 
            success: true, 
            message: 'Status pesanan berhasil diupdate',
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
        
        let orders = readOrders();
        const initialLength = orders.length;
        orders = orders.filter(o => o.orderNumber !== orderNumber);
        
        if (orders.length === initialLength) {
            return res.status(404).json({ 
                success: false, 
                message: 'Pesanan tidak ditemukan' 
            });
        }
        
        writeOrders(orders);
        
        res.json({ 
            success: true, 
            message: 'Pesanan berhasil dihapus'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
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
