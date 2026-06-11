// Check if user is logged in
function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
    const loginTime = sessionStorage.getItem('loginTime');
    
    // Check if not logged in
    if (isLoggedIn !== 'true') {
        window.location.href = 'login.html';
        return false;
    }
    
    // Check if session expired (24 hours)
    if (loginTime) {
        const currentTime = new Date().getTime();
        const timeDiff = currentTime - parseInt(loginTime);
        const hoursDiff = timeDiff / (1000 * 60 * 60);
        
        if (hoursDiff > 24) {
            // Session expired
            sessionStorage.clear();
            alert('Sesi login telah habis. Silakan login kembali.');
            window.location.href = 'login.html';
            return false;
        }
    }
    
    return true;
}

// Logout function
function logout() {
    if (confirm('Yakin mau logout? 👋')) {
        sessionStorage.clear();
        window.location.href = 'login.html';
    }
}

// Global Variables
let products = [];
let orders = [];
let currentSection = 'dashboard';

const API_URL = 'http://localhost:3000/api';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check authentication first
    if (!checkAuth()) {
        return;
    }
    
    loadData();
    setInterval(loadData, 30000); // Refresh every 30 seconds
});

// Load All Data
async function loadData() {
    await loadProducts();
    await loadOrders();
    updateDashboard();
}

// Load Products
async function loadProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        const data = await response.json();
        
        if (data.success) {
            products = data.data;
            displayProducts();
            updateProductsCount();
        }
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Load Orders
async function loadOrders() {
    try {
        const response = await fetch(`${API_URL}/orders`);
        const data = await response.json();
        
        if (data.success) {
            orders = data.data;
            displayOrders();
            updateOrdersCount();
        }
    } catch (error) {
        console.error('Error loading orders:', error);
    }
}

// Display Products in Table
function displayProducts() {
    const table = document.getElementById('productsTable');
    if (!table) return;
    
    table.innerHTML = products.map(product => `
        <tr>
            <td>${product.id}</td>
            <td><img src="${product.image}" class="product-img" alt="${product.name}"></td>
            <td>${product.name}</td>
            <td><span class="status-badge">${product.category}</span></td>
            <td>Rp ${product.price.toLocaleString('id-ID')}</td>
            <td>${product.stock}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon btn-edit" onclick="editProduct(${product.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon btn-delete" onclick="deleteProduct(${product.id})" title="Hapus">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Display Orders in Table
function displayOrders() {
    const table = document.getElementById('ordersTable');
    if (!table) return;
    
    table.innerHTML = orders.map(order => `
        <tr>
            <td><strong>${order.orderNumber}</strong></td>
            <td>${order.customerName}</td>
            <td>${order.phone}</td>
            <td><strong>Rp ${order.total.toLocaleString('id-ID')}</strong></td>
            <td>${order.paymentMethod || 'N/A'}</td>
            <td>
                <span class="status-badge status-${order.status}">
                    ${order.status === 'pending' ? '⏳ Pending' : '✅ Selesai'}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon btn-view" onclick="viewOrder('${order.orderNumber}')" title="Detail">
                        <i class="fas fa-eye"></i>
                    </button>
                    ${order.status === 'pending' ? `
                    <button class="btn-icon btn-edit" onclick="completeOrder('${order.orderNumber}')" title="Selesaikan">
                        <i class="fas fa-check"></i>
                    </button>
                    ` : ''}
                    <button class="btn-icon btn-delete" onclick="deleteOrder('${order.orderNumber}')" title="Hapus">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Update Dashboard Stats
function updateDashboard() {
    // Total Orders
    document.getElementById('totalOrders').textContent = orders.length;
    
    // Total Revenue
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    document.getElementById('totalRevenue').textContent = `Rp ${totalRevenue.toLocaleString('id-ID')}`;
    
    // Total Products
    document.getElementById('totalProducts').textContent = products.length;
    
    // Pending Orders
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    document.getElementById('pendingOrders').textContent = pendingOrders;
    document.getElementById('ordersBadge').textContent = pendingOrders;
    
    // Recent Orders List
    const recentOrdersList = document.getElementById('recentOrdersList');
    if (recentOrdersList) {
        const recentOrders = orders.slice(-5).reverse();
        recentOrdersList.innerHTML = recentOrders.length > 0 ? recentOrders.map(order => `
            <div style="padding: 1rem; border-bottom: 1px solid #e9ecef; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <strong>${order.orderNumber}</strong><br>
                    <small>${order.customerName}</small>
                </div>
                <div style="text-align: right;">
                    <strong style="color: var(--primary-color);">Rp ${order.total.toLocaleString('id-ID')}</strong><br>
                    <span class="status-badge status-${order.status}">${order.status}</span>
                </div>
            </div>
        `).join('') : '<p style="padding: 1rem; text-align: center; color: #636e72;">Belum ada pesanan</p>';
    }
    
    // Top Products
    const topProductsList = document.getElementById('topProductsList');
    if (topProductsList) {
        topProductsList.innerHTML = products.slice(0, 5).map(product => `
            <div style="padding: 1rem; border-bottom: 1px solid #e9ecef; display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <img src="${product.image}" style="width: 40px; height: 40px; border-radius: 8px; object-fit: cover;">
                    <div>
                        <strong>${product.name}</strong><br>
                        <small>Stok: ${product.stock}</small>
                    </div>
                </div>
                <strong style="color: var(--primary-color);">Rp ${product.price.toLocaleString('id-ID')}</strong>
            </div>
        `).join('');
    }
    
    // Statistics Section
    const today = new Date().toDateString();
    const todayOrders = orders.filter(o => new Date(o.createdAt).toDateString() === today);
    
    if (document.getElementById('todaySales')) {
        document.getElementById('todaySales').textContent = todayOrders.length;
    }
    
    if (document.getElementById('todayRevenue')) {
        const todayRevenue = todayOrders.reduce((sum, o) => sum + o.total, 0);
        document.getElementById('todayRevenue').textContent = `Rp ${todayRevenue.toLocaleString('id-ID')}`;
    }
    
    if (document.getElementById('chickenSold')) {
        const totalChicken = orders.reduce((sum, order) => {
            return sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0);
        }, 0);
        document.getElementById('chickenSold').textContent = totalChicken;
    }
    
    if (document.getElementById('avgOrder')) {
        const avg = orders.length > 0 ? totalRevenue / orders.length : 0;
        document.getElementById('avgOrder').textContent = `Rp ${Math.round(avg).toLocaleString('id-ID')}`;
    }
}

// Update Counts
function updateProductsCount() {
    if (document.getElementById('totalProducts')) {
        document.getElementById('totalProducts').textContent = products.length;
    }
}

function updateOrdersCount() {
    if (document.getElementById('totalOrders')) {
        document.getElementById('totalOrders').textContent = orders.length;
    }
    
    const pendingCount = orders.filter(o => o.status === 'pending').length;
    if (document.getElementById('pendingOrders')) {
        document.getElementById('pendingOrders').textContent = pendingCount;
    }
    if (document.getElementById('ordersBadge')) {
        document.getElementById('ordersBadge').textContent = pendingCount;
    }
}

// Show Section
function showSection(section) {
    currentSection = section;
    
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
    
    // Show selected section
    document.getElementById(`${section}-section`).classList.add('active');
    
    // Update nav
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector(`[onclick="showSection('${section}')"]`).classList.add('active');
    
    // Update page title
    const titles = {
        dashboard: 'Dashboard',
        products: 'Manajemen Produk',
        orders: 'Manajemen Pesanan',
        statistics: 'Statistik Penjualan',
        settings: 'Pengaturan'
    };
    document.getElementById('pageTitle').textContent = titles[section];
}

// Toggle Sidebar (Mobile)
function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('active');
}

// Product Modal Functions
function showAddProductModal() {
    document.getElementById('modalTitle').textContent = 'Tambah Produk';
    document.getElementById('productForm').reset();
    document.getElementById('productModal').classList.add('active');
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
}

function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    document.getElementById('modalTitle').textContent = 'Edit Produk';
    document.getElementById('productName').value = product.name;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productStock').value = product.stock;
    document.getElementById('productImage').value = product.image;
    
    document.getElementById('productModal').classList.add('active');
}

function deleteProduct(id) {
    if (confirm('Yakin ingin menghapus produk ini?')) {
        alert('Fitur hapus produk akan segera tersedia!');
        // TODO: Implement delete API
    }
}

// Order Functions
function filterOrders(status) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    const filteredOrders = status === 'all' ? orders : orders.filter(o => o.status === status);
    
    const table = document.getElementById('ordersTable');
    table.innerHTML = filteredOrders.map(order => `
        <tr>
            <td><strong>${order.orderNumber}</strong></td>
            <td>${order.customerName}</td>
            <td>${order.phone}</td>
            <td><strong>Rp ${order.total.toLocaleString('id-ID')}</strong></td>
            <td>${order.paymentMethod || 'N/A'}</td>
            <td>
                <span class="status-badge status-${order.status}">
                    ${order.status === 'pending' ? '⏳ Pending' : '✅ Selesai'}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn-icon btn-view" onclick="viewOrder('${order.orderNumber}')" title="Detail">
                        <i class="fas fa-eye"></i>
                    </button>
                    ${order.status === 'pending' ? `
                    <button class="btn-icon btn-edit" onclick="completeOrder('${order.orderNumber}')" title="Selesaikan">
                        <i class="fas fa-check"></i>
                    </button>
                    ` : ''}
                    <button class="btn-icon btn-delete" onclick="deleteOrder('${order.orderNumber}')" title="Hapus">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function viewOrder(orderNumber) {
    const order = orders.find(o => o.orderNumber === orderNumber);
    if (!order) return;
    
    const detail = document.getElementById('orderDetail');
    detail.innerHTML = `
        <div style="padding: 1.5rem;">
            <h3 style="margin-bottom: 1rem;">Pesanan ${order.orderNumber}</h3>
            <div style="margin-bottom: 1rem;">
                <strong>Pelanggan:</strong> ${order.customerName}<br>
                <strong>Telepon:</strong> ${order.phone}<br>
                <strong>Alamat:</strong> ${order.address}<br>
                <strong>Metode Pembayaran:</strong> ${order.paymentMethod || 'N/A'}<br>
                <strong>Status:</strong> <span class="status-badge status-${order.status}">${order.status}</span>
            </div>
            <h4>Item Pesanan:</h4>
            <div style="margin: 1rem 0;">
                ${order.items.map(item => `
                    <div style="padding: 0.5rem 0; border-bottom: 1px solid #e9ecef; display: flex; justify-content: space-between;">
                        <span>${item.name} x ${item.quantity}</span>
                        <strong>Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</strong>
                    </div>
                `).join('')}
            </div>
            <div style="text-align: right; font-size: 1.2rem; margin-top: 1rem;">
                <strong>Total: Rp ${order.total.toLocaleString('id-ID')}</strong>
            </div>
        </div>
    `;
    
    document.getElementById('orderModal').classList.add('active');
}

function closeOrderModal() {
    document.getElementById('orderModal').classList.remove('active');
}

function completeOrder(orderNumber) {
    showFunnyConfirm(
        '🎉 Selesaikan Pesanan?',
        'Pesanan ini mau dimark selesai nih? Ayamnya udah sampe kan? 🐔',
        () => {
            fetch(`${API_URL}/orders/${orderNumber}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: 'completed' })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    throwConfetti();
                    playSuccessAnimation();
                    showNotification('🎊 MANTAP! Pesanan selesai! Customer pasti happy! 😋');
                    loadOrders();
                    updateDashboard();
                } else {
                    alert('Error: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Gagal update status pesanan');
            });
        }
    );
}

function deleteOrder(orderNumber) {
    showFunnyConfirm(
        '🗑️ Hapus Pesanan?',
        'Yakin mau hapus? Nanti ayamnya gimana dong? 😢<br><small style="color: #e74c3c;">Aksi ini gak bisa di-undo loh!</small>',
        () => {
            fetch(`${API_URL}/orders/${orderNumber}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showNotification('💥 Poof! Pesanan menghilang! 🗑️');
                    playDeleteAnimation();
                    loadOrders();
                    updateDashboard();
                } else {
                    alert('Error: ' + data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Gagal menghapus pesanan');
            });
        }
    );
}

// Funny Confirmation Dialog
function showFunnyConfirm(title, message, onConfirm) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s;
    `;
    
    modal.innerHTML = `
        <div style="
            background: white;
            padding: 2rem;
            border-radius: 20px;
            text-align: center;
            max-width: 400px;
            animation: bounceIn 0.5s;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        ">
            <div style="font-size: 4rem; margin-bottom: 1rem; animation: wiggle 0.5s infinite;">${title.split(' ')[0]}</div>
            <h2 style="color: var(--dark-color); margin-bottom: 1rem;">${title.split(' ').slice(1).join(' ')}</h2>
            <p style="color: #636e72; margin-bottom: 2rem; line-height: 1.6;">${message}</p>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button id="cancelBtn" style="
                    padding: 0.8rem 2rem;
                    background: #95a5a6;
                    color: white;
                    border: none;
                    border-radius: 50px;
                    cursor: pointer;
                    font-weight: bold;
                    transition: all 0.3s;
                    font-size: 1rem;
                " onmouseover="this.style.background='#7f8c8d'" onmouseout="this.style.background='#95a5a6'">
                    🙅 Batal Deh
                </button>
                <button id="confirmBtn" style="
                    padding: 0.8rem 2rem;
                    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
                    color: white;
                    border: none;
                    border-radius: 50px;
                    cursor: pointer;
                    font-weight: bold;
                    transition: all 0.3s;
                    font-size: 1rem;
                " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
                    ✅ Gaskeun!
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    document.getElementById('cancelBtn').onclick = () => {
        modal.style.animation = 'fadeOut 0.3s';
        setTimeout(() => modal.remove(), 300);
    };
    
    document.getElementById('confirmBtn').onclick = () => {
        modal.style.animation = 'fadeOut 0.3s';
        setTimeout(() => {
            modal.remove();
            onConfirm();
        }, 300);
    };
}

// Success Animation
function playSuccessAnimation() {
    const successEmoji = document.createElement('div');
    successEmoji.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        font-size: 10rem;
        z-index: 9999;
        animation: successPop 1s forwards;
        pointer-events: none;
    `;
    successEmoji.textContent = '🎉';
    document.body.appendChild(successEmoji);
    
    setTimeout(() => successEmoji.remove(), 1000);
}

// Delete Animation
function playDeleteAnimation() {
    const deleteEmoji = document.createElement('div');
    deleteEmoji.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 8rem;
        z-index: 9999;
        animation: explosionEffect 1s forwards;
        pointer-events: none;
    `;
    deleteEmoji.textContent = '💥';
    document.body.appendChild(deleteEmoji);
    
    setTimeout(() => deleteEmoji.remove(), 1000);
}

// Form Submit
document.getElementById('productForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Fitur simpan produk akan segera tersedia!');
    closeProductModal();
});

document.getElementById('settingsForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Pengaturan berhasil disimpan!');
});

// Close modal when clicking outside
window.onclick = (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
};


// ========== FITUR LUCU & MENARIK UNTUK ADMIN ==========

// 1. MOTIVATIONAL QUOTES UNTUK ADMIN
const motivationalQuotes = [
    "💪 Semangat boss! Hari ini ayam laris manis! 🐔",
    "🔥 Yuk jual ayamnya! Rezeki nomplok nih! 💰",
    "⭐ Admin keren update stok tiap hari! 📦",
    "🎉 Cuaca cerah, cocok untuk jualan ayam! 🍗",
    "💼 Mode juragan: AKTIF! Let's go! 🤑",
    "🚀 Target hari ini: Jual semua ayam! 🎯",
    "😎 Ayam crispy, customer happy! 😋",
    "🎊 Ngitung duit capek? Alhamdulillah! 💵",
    "⚡ Flash sale mode: ON! Buruan gas! 🏃",
    "🌟 Mantap jiwa! Pesanan membludak! 📈"
];

function showMotivationalQuote() {
    const quote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    
    const quoteDiv = document.createElement('div');
    quoteDiv.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #6c5ce7, #a29bfe);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(108, 92, 231, 0.4);
        z-index: 9999;
        animation: slideInRight 0.5s;
        max-width: 300px;
        font-weight: bold;
    `;
    quoteDiv.innerHTML = `
        ${quote}
        <button onclick="this.parentElement.remove()" style="
            position: absolute;
            top: 5px;
            right: 10px;
            background: transparent;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
        ">×</button>
    `;
    document.body.appendChild(quoteDiv);
    
    setTimeout(() => quoteDiv.remove(), 5000);
}

// 2. ACHIEVEMENT SYSTEM
let achievements = {
    firstOrder: false,
    tenOrders: false,
    hundredOrders: false,
    millionRevenue: false
};

function checkAchievements() {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    
    if (totalOrders >= 1 && !achievements.firstOrder) {
        showAchievement('🎉 First Order!', 'Selamat! Pesanan pertama sudah masuk!');
        achievements.firstOrder = true;
    }
    
    if (totalOrders >= 10 && !achievements.tenOrders) {
        showAchievement('🔥 10 Orders!', 'Wow! Sudah 10 pesanan masuk!');
        achievements.tenOrders = true;
    }
    
    if (totalRevenue >= 1000000 && !achievements.millionRevenue) {
        showAchievement('💰 Millionaire!', 'Pendapatan sudah 1 juta! Mantap!');
        achievements.millionRevenue = true;
    }
}

function showAchievement(title, message) {
    const achievement = document.createElement('div');
    achievement.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        background: white;
        padding: 2rem;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        text-align: center;
        min-width: 300px;
        animation: achievementPop 0.5s forwards;
    `;
    achievement.innerHTML = `
        <div style="font-size: 4rem; margin-bottom: 1rem;">🏆</div>
        <h2 style="color: var(--primary-color); margin-bottom: 0.5rem;">${title}</h2>
        <p style="color: #636e72;">${message}</p>
    `;
    document.body.appendChild(achievement);
    
    setTimeout(() => {
        achievement.style.animation = 'fadeOut 0.5s';
        setTimeout(() => achievement.remove(), 500);
    }, 3000);
}

// 3. DANCING CHICKEN MASCOT
function createDancingChicken() {
    const chicken = document.createElement('div');
    chicken.id = 'dancing-chicken';
    chicken.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 20px;
        font-size: 4rem;
        cursor: pointer;
        animation: dance 1s infinite;
        z-index: 1000;
        filter: drop-shadow(0 5px 15px rgba(0,0,0,0.3));
    `;
    chicken.textContent = '🐔';
    chicken.onclick = () => {
        chicken.textContent = chicken.textContent === '🐔' ? '🍗' : '🐔';
        playChickenSound();
    };
    document.body.appendChild(chicken);
}

function playChickenSound() {
    const sounds = ['Bok bok bok! 🐔', 'Kukuruyuuk! 🐓', 'Kriuukk! 🍗'];
    const sound = sounds[Math.floor(Math.random() * sounds.length)];
    
    const soundBubble = document.createElement('div');
    soundBubble.style.cssText = `
        position: fixed;
        bottom: 180px;
        right: 20px;
        background: white;
        padding: 0.5rem 1rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1001;
        animation: fadeIn 0.3s;
        font-weight: bold;
        color: var(--primary-color);
    `;
    soundBubble.textContent = sound;
    document.body.appendChild(soundBubble);
    
    setTimeout(() => soundBubble.remove(), 1500);
}

// 4. DAILY TARGET TRACKER
function initDailyTarget() {
    const targetDiv = document.createElement('div');
    targetDiv.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: white;
        padding: 1rem;
        border-radius: 12px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        z-index: 999;
        min-width: 200px;
    `;
    
    const today = new Date().toDateString();
    const todayOrders = orders.filter(o => new Date(o.createdAt).toDateString() === today);
    const todayRevenue = todayOrders.reduce((sum, o) => sum + o.total, 0);
    const target = 1000000;
    const percentage = Math.min((todayRevenue / target) * 100, 100);
    
    targetDiv.innerHTML = `
        <h4 style="margin-bottom: 0.5rem; color: var(--dark-color);">🎯 Target Hari Ini</h4>
        <div style="background: #e9ecef; height: 20px; border-radius: 10px; overflow: hidden; margin-bottom: 0.5rem;">
            <div style="background: linear-gradient(90deg, var(--primary-color), var(--secondary-color)); height: 100%; width: ${percentage}%; transition: width 0.5s;"></div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.85rem;">
            <span>${percentage.toFixed(0)}%</span>
            <span>Rp ${todayRevenue.toLocaleString('id-ID')}</span>
        </div>
        <small style="color: #636e72;">Target: Rp ${target.toLocaleString('id-ID')}</small>
    `;
    
    document.body.appendChild(targetDiv);
}

// 5. CONFETTI CELEBRATION
function throwConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        const emojis = ['🎉', '🎊', '✨', '⭐', '🌟', '💫'];
        confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        confetti.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}%;
            top: -50px;
            font-size: 2rem;
            z-index: 9999;
            animation: confettiFall ${2 + Math.random() * 3}s linear;
            pointer-events: none;
        `;
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
}

// 6. ADMIN MOOD TRACKER
let adminMood = '😊';
const moods = {
    '😊': { label: 'Happy', color: '#00b894' },
    '😎': { label: 'Cool', color: '#6c5ce7' },
    '🤑': { label: 'Rich', color: '#fdcb6e' },
    '💪': { label: 'Strong', color: '#ff6b35' },
    '🔥': { label: 'Fire', color: '#d63031' }
};

function initMoodTracker() {
    const moodDiv = document.createElement('div');
    moodDiv.style.cssText = `
        position: fixed;
        bottom: 200px;
        right: 20px;
        background: white;
        padding: 1rem;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        cursor: pointer;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        transition: all 0.3s;
    `;
    moodDiv.textContent = adminMood;
    moodDiv.onclick = changeMood;
    moodDiv.onmouseover = () => moodDiv.style.transform = 'scale(1.2) rotate(15deg)';
    moodDiv.onmouseout = () => moodDiv.style.transform = '';
    document.body.appendChild(moodDiv);
}

function changeMood() {
    const moodKeys = Object.keys(moods);
    const currentIndex = moodKeys.indexOf(adminMood);
    const nextIndex = (currentIndex + 1) % moodKeys.length;
    adminMood = moodKeys[nextIndex];
    
    const moodDiv = document.querySelector('[style*="bottom: 200px"]');
    if (moodDiv) {
        moodDiv.textContent = adminMood;
        showNotification(`Mood: ${moods[adminMood].label}! ${adminMood}`);
    }
}

// 7. RANDOM FUN FACTS
const funFacts = [
    "🐔 Fun fact: Ayam bisa lari 14 km/jam! Tapi tetep kalah ama grab bike 😂",
    "🍗 Woi! KFC pertama buka tahun 1952! Udah lama banget cuy!",
    "💡 Kentucky itu dari Amerika, bukan dari Jakarta! 🤯",
    "🎯 Orang Indonesia doyan banget ayam goreng! Pantes laku!",
    "⭐ Ayam adalah unggas terpopuler! Kalah ama artis sih 😅",
    "🌍 Ada 25 miliar ayam di dunia! Lebih banyak dari manusia!",
    "🔥 Ayam goreng > pizza! Fight me! 🥊",
    "😋 Makan ayam bikin mood bagus! Scientifically proven! (probably)",
    "🎪 Colonel Sanders ditolak 1000x sebelum sukses! Jangan menyerah!",
    "💪 Admin keren adalah yang suka makan ayam! (verified!)"
];

function showRandomFact() {
    const fact = funFacts[Math.floor(Math.random() * funFacts.length)];
    showNotification(fact);
}

// 8. SALES MILESTONE CELEBRATION
let lastMilestone = 0;

function checkMilestones() {
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const milestones = [100000, 500000, 1000000, 5000000, 10000000];
    
    for (const milestone of milestones) {
        if (totalRevenue >= milestone && lastMilestone < milestone) {
            throwConfetti();
            showAchievement('🎊 Milestone!', `Pendapatan mencapai Rp ${milestone.toLocaleString('id-ID')}!`);
            lastMilestone = milestone;
            break;
        }
    }
}

// 9. ADMIN DASHBOARD EASTER EGG
let adminClickCount = 0;

function initAdminEasterEgg() {
    const avatar = document.querySelector('.avatar');
    if (avatar) {
        avatar.onclick = () => {
            adminClickCount++;
            if (adminClickCount === 5) {
                throwConfetti();
                showAchievement('🎮 Easter Egg!', 'Kamu menemukan secret easter egg!');
                adminClickCount = 0;
            }
        };
    }
}

// 10. HELPER NOTIFICATION
function showNotification(message) {
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideInRight 0.3s;
        border-left: 4px solid var(--primary-color);
        max-width: 350px;
        font-weight: 600;
    `;
    notif.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.8rem;">
            <div style="font-size: 1.8rem; animation: wiggleEmoji 0.5s infinite;">${message.split(' ')[0]}</div>
            <span style="flex: 1;">${message.split(' ').slice(1).join(' ')}</span>
            <button onclick="this.closest('div').parentElement.remove()" style="
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #636e72;
                transition: all 0.3s;
            " onmouseover="this.style.transform='rotate(90deg)'" onmouseout="this.style.transform='rotate(0)'">×</button>
        </div>
    `;
    document.body.appendChild(notif);
    
    setTimeout(() => {
        notif.style.animation = 'slideOutRight 0.3s';
        setTimeout(() => notif.remove(), 300);
    }, 4000);
}

// Initialize Fun Features
setTimeout(() => {
    showMotivationalQuote();
    createDancingChicken();
    initDailyTarget();
    initMoodTracker();
    initAdminEasterEgg();
    
    // Show random fact every 60 seconds
    setInterval(showRandomFact, 60000);
    
    // Check achievements when data loads
    setInterval(() => {
        checkAchievements();
        checkMilestones();
    }, 5000);
    
    // Motivational quote every 5 minutes
    setInterval(showMotivationalQuote, 300000);
}, 2000);
