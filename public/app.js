// Global Variables
let products = [];
let cart = [];
let currentCategory = 'all';
let clickCount = 0;
let totalSoldToday = Math.floor(Math.random() * 500) + 200;
let currentViewers = Math.floor(Math.random() * 20) + 5;

// Sound Effects
const sounds = {
    click: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjGJ0fPTgjMGHm7A7+OZSR4JPZfZ8c+APgcZb7zs6I9HCxJOqd/xr2EVCzyM0fPPfzAHH2u+7+GXRQ4NUKjh8bllGQg0j8zp0X8qBSBuvu7mnEQOC0+n3/K0aRkIL4zP8dt8LAUgb73u5phEDgxPqN7yuWkYCTCNzvDXfywFIG++7emaRQ4MUKjh8btqGAkwjc7w1X8sBSBvvu7omEQOC0+n4PK8axgKMI3O8NZ/KwUgb7zu55tEDgtPp+Hyu2sYCjCNzvDWfywFIG++7uibRQ4MUKjh8bxrGAowjc7w1n8sBSBvvu7pm0UOC0+n4PK8axgKMI3O8NZ/KwUgb7zu6JpFDgxPqODyu2sYCjCNzvDWfywFIG++7umaSQ4NUKjh8rxrGAowjc7w1n8rBSBvvO7omEQOC0+n4PO7axgKMI3O8NZ/LAUgb77u6JpFDgxQqOHxvGoYCjCNzvDWfywFIG++7uibRQ4MUKjh8bxqGAowjc7w1X8rBSBvvO7omkUODE+o4fG8ahgKMI3O8NZ/LAUgb77u6ZpFDgxQqOHxvGoYCjCNzvDWfywFIG++7uibRQ4MUKjh8bxqGAowjc7w1n8rBSBvvO7om0UOC0+o4PO7axgKMI3O8NZ/LAUgb77u6ZpFDgxQqOHxvGoYCjCNzvDWfywFIG++7uibRQ4MUKjh8bxqGAowjc7w1n8rBSBvvO7omkUODE+o4fG8ahgKMI3O8NZ/LAUgb77u6ZpFDgxQqOHxvGoYCjCNzvDWfywFIG++7uibRQ4MUKjh8bxqGAowjc7w1n8rBSBvvO7omkUODE+o4fG8ahgKMI3O8NZ/LAUgb77u6ZpFDgxQqOHxvGoYCjCNzvDWfywFIG++7uibRQ4MUKjh8bxqGAowjc7w1n8rBSBvvO7omkUODE+o4PO7axgKMI3O8NZ/LAUgb77u6ZpFDgxQqOHxvGoYCjCNzvDWfywFIG++7umaSQ4NUKjh8rxqGAowjc7w1n8rBSBvvO7omEQOC0+n4PO7axgKMI3O8NZ/LAUgb77u6JpFDgxPqODyu2sYCjCNzvDWfywFIG++7uibRQ4MUKjh8bxqGAowjc7w1n8rBSBvvO7omkQODE+o4PK8axgKMI3O8NZ/LAUgb77u6ZlFDgxPqN/yu2sYCjCNzvDWfywFIG++7uiaRQ4LUKjg8bxqGAowjc7w1n8sBSBvvu7omUUOC0+o3/K7axgKMI3O8NZ/LAUgb77u6JpFDgxQqOHxvGoYCjCNzvDWfywFIG++7uibRQ4MUKjh8bxqGAowjc7w1n8rBSBvvO7omkUODE+o4PK7axgKMI3O8NZ/LAUgb77u6ZlFDgxPqN/yu2sYCjCNzvDWfywFIG++7uiaRQ4MUKjh8bxqGAowjc7w1n8rBSBvvO7omkUODE+o4PK7axgKMI3O8NZ/LAUgb77u6ZpFDgxQqOHxvGoYCjCNzvDWfywFIG++7uibRQ4MUKjh8bxqGAowjc7w1n8rBSBvvO7omkUODE+o4PK7axgKMI3O8NZ/LAUgb77u6ZpFDg=='),
    success: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjGJ0fPTgjMGHm7A7+OZSR4JPZfZ8c+APgcZb7zs6I9HCxJOqd/xr2EVCzyM0fPPfzAHH2u+7+GXRQ4NUKjh8bllGQg0j8zp0X8qBSBuvu7mnEQOC0+n3/K0aRkIL4zP8dt8LAUgb73u5phEDgxPqN7yuWkYCTCNzvDXfywFIG++7emaRQ4MUKjh8btqGAkwjc7w1X8sBSBvvu7omEQOC0+n4PK8axgKMI3O8NZ/KwUgb7zu55tEDgtPp+Hyu2sYCjCNzvDWfywFIG++7uibRQ4MUKjh8bxrGAowjc7w1n8sBSBvvu7pm0UOC0+n4PK8axgKMI3O8NZ/KwUgb7zu6JpFDgxPqODyu2sYCjCNzvDWfywFIG++7umaSQ4NUKjh8rxrGAowjc7w1n8rBSBvvO7omEQOC0+n4PO7axgKMI3O8NZ/LAUgb77u6JpFDgxQqOHxvGoYCjCNzvDWfywFIG++7uibRQ4MUKjh8bxqGAowjc7w1X8rBSBvvO7omkUODE+o4fG8ahgKMI3O8NZ/LAUgb77u6ZpFDgxQqOHxvGoYCjCNzvDWfywFIG++7uibRQ4MUKjh8bxqGAowjc7w1n8rBSBvvO7om0UOC0+o4PO7axgKMI3O8NZ/LAUgb77u6ZpFDgxQqOHxvGoYCjCNzvDWfywFIG++7uibRQ4MUKjh8bxqGAowjc7w1n8rBSBvvO7omkUODE+o4fG8ahgKMI3O8NZ/LAUgb77u6ZpFDgxQqOHxvGoYCjCNzvDWfywFIG++7uibRQ4MUKjh8bxqGAowjc7w1n8rBSBvvO7omkUODE+o4fG8ahgKMI3O8NZ/LAUgb77u6ZpFDgxQqOHxvGoYCjCNzvDWfywFIG++7uibRQ4MUKjh8bxqGAowjc7w1n8rBSBvvO7omkUODE+o4fG8ahgKMI3O8NZ/LAUgb77u6ZpFDgxQqOHxvGoYCjCNzvDWfywFIG++7uibRQ4MUKjh8bxqGAowjc7w1n8rBSBvvO7omkUODE+o4PO7axgKMI3O8NZ/LAUgb77u6ZpFDgxQqOHxvGoYCjCNzvDWfywFIG++7umaSQ4NUKjh8rxqGAowjc7w1n8rBSBvvO7omEQOC0+n4PO7axgKMI3O8NZ/LAUgb77u6JpFDgxPqODyu2sYCjCNzvDWfywFIG++7uibRQ4MUKjh8bxqGAowjc7w1n8rBSBvvO7omkQODE+o4PK8axgKMI3O8NZ/LAUgb77u6ZlFDgxPqN/yu2sYCjCNzvDWfywFIG++7uiaRQ4LUKjg8bxqGAowjc7w1n8sBSBvvu7omUUOC0+o3/K7axgKMI3O8NZ/LAUgb77u6JpFDgxQqOHxvGoYCjCNzvDWfywFIG++7uibRQ4MUKjh8bxqGAowjc7w1n8rBSBvvO7omkUODE+o4PK7axgKMI3O8NZ/LAUgb77u6ZlFDgxPqN/yu2sYCjCNzvDWfywFIG++7uiaRQ4MUKjh8bxqGAowjc7w1n8rBSBvvO7omkUODE+o4PK7axgKMI3O8NZ/LAUgb77u6ZpFDgxQqOHxvGoYCjCNzvDWfywFIG++7uibRQ4MUKjh8bxqGAowjc7w1n8rBSBvvO7omkUODE+o4PK7axgKMI3O8NZ/LAUgb77u6ZpFDg==')
};

// API Base URL
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api' 
    : '/api';

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const checkoutModal = document.getElementById('checkoutModal');
const closeCartBtn = document.getElementById('closeCartBtn');
const closeCheckoutBtn = document.getElementById('closeCheckoutBtn');
const cartCount = document.getElementById('cartCount');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutForm = document.getElementById('checkoutForm');
const categoryBtns = document.querySelectorAll('.category-btn');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    loadCart();
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    cartBtn.addEventListener('click', toggleCartModal);
    closeCartBtn.addEventListener('click', toggleCartModal);
    closeCheckoutBtn.addEventListener('click', toggleCheckoutModal);
    checkoutBtn.addEventListener('click', openCheckoutModal);
    checkoutForm.addEventListener('submit', handleCheckout);
    
    // Payment method change listener
    const paymentMethodSelect = document.getElementById('paymentMethod');
    if (paymentMethodSelect) {
        paymentMethodSelect.addEventListener('change', handlePaymentMethodChange);
    }
    
    // Category buttons
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            filterProducts();
        });
    });
    
    // Close modal when clicking outside
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) toggleCartModal();
    });
    
    checkoutModal.addEventListener('click', (e) => {
        if (e.target === checkoutModal) toggleCheckoutModal();
    });
    
    // Smooth scroll for navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Load Products from API
async function loadProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        const data = await response.json();
        
        if (data.success) {
            products = data.data;
            displayProducts(products);
        }
    } catch (error) {
        console.error('Error loading products:', error);
        productsGrid.innerHTML = '<p class="error">Gagal memuat produk. Pastikan server berjalan.</p>';
    }
}

// Display Products
function displayProducts(productsToShow) {
    productsGrid.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">Rp ${product.price.toLocaleString('id-ID')}</span>
                    <span class="product-stock ${product.stock < 10 ? 'stock-low' : ''}">
                        Stok: ${product.stock}
                    </span>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})" ${product.stock === 0 ? 'disabled' : ''}>
                    <i class="fas fa-shopping-cart"></i> ${product.stock === 0 ? 'Habis' : 'Tambah ke Keranjang'}
                </button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Filter Products by Category
function filterProducts() {
    if (currentCategory === 'all') {
        displayProducts(products);
    } else {
        const filtered = products.filter(p => p.category === currentCategory);
        displayProducts(filtered);
    }
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || product.stock === 0) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        if (existingItem.quantity < product.stock) {
            existingItem.quantity++;
        } else {
            alert('Stok tidak mencukupi!');
            return;
        }
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartUI();
    
    // Play sound and show animation
    sounds.click.play();
    playRandomChickenSound();
    
    // Cart button animation
    const cartBtn = document.getElementById('cartBtn');
    cartBtn.classList.add('added');
    setTimeout(() => cartBtn.classList.remove('added'), 500);
    
    showNotification('🐔 Ayam ditambahkan ke keranjang!');
    
    // Random increase viewers
    currentViewers++;
    totalSoldToday++;
}

// Update Cart Quantity
function updateCartQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    const product = products.find(p => p.id === productId);
    
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    if (item.quantity > product.stock) {
        item.quantity = product.stock;
        alert('Stok tidak mencukupi!');
    }
    
    saveCart();
    updateCartUI();
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

// Update Cart UI
function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart"><i class="fas fa-shopping-cart" style="font-size: 3rem; color: #ddd;"></i><p>Keranjang kosong</p></div>';
        cartTotal.textContent = 'Rp 0';
        checkoutBtn.disabled = true;
        return;
    }
    
    checkoutBtn.disabled = false;
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">Rp ${item.price.toLocaleString('id-ID')}</div>
                <div class="cart-item-quantity">
                    <button class="qty-btn" onclick="updateCartQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateCartQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `Rp ${total.toLocaleString('id-ID')}`;
}

// Toggle Cart Modal
function toggleCartModal() {
    cartModal.classList.toggle('active');
}

// Toggle Checkout Modal
function toggleCheckoutModal() {
    checkoutModal.classList.toggle('active');
    // Reset payment details when closing
    if (!checkoutModal.classList.contains('active')) {
        const paymentDetails = document.getElementById('paymentDetails');
        if (paymentDetails) {
            paymentDetails.style.display = 'none';
            paymentDetails.innerHTML = '';
        }
    }
}

// Handle Payment Method Change
function handlePaymentMethodChange(e) {
    const paymentMethod = e.target.value;
    const paymentDetails = document.getElementById('paymentDetails');
    
    if (!paymentMethod || paymentMethod === 'cash') {
        paymentDetails.style.display = 'none';
        paymentDetails.innerHTML = '';
        return;
    }
    
    paymentDetails.style.display = 'block';
    
    if (paymentMethod === 'transfer') {
        paymentDetails.innerHTML = `
            <div class="payment-info">
                <h4><i class="fas fa-university"></i> Informasi Transfer Bank</h4>
                <div class="bank-list">
                    <div class="bank-item">
                        <strong>Bank BCA</strong>
                        <p>No. Rek: <span class="copy-text" onclick="copyToClipboard('1234567890')">1234567890</span></p>
                        <p>a.n. Juragan Ayam</p>
                    </div>
                    <div class="bank-item">
                        <strong>Bank Mandiri</strong>
                        <p>No. Rek: <span class="copy-text" onclick="copyToClipboard('0987654321')">0987654321</span></p>
                        <p>a.n. Juragan Ayam</p>
                    </div>
                    <div class="bank-item">
                        <strong>Bank BNI</strong>
                        <p>No. Rek: <span class="copy-text" onclick="copyToClipboard('5555666677')">5555666677</span></p>
                        <p>a.n. Juragan Ayam</p>
                    </div>
                </div>
                <p class="payment-note">💡 Silakan transfer sesuai total pembayaran dan kirim bukti transfer ke WhatsApp kami</p>
            </div>
        `;
    } else if (paymentMethod === 'ewallet') {
        paymentDetails.innerHTML = `
            <div class="payment-info">
                <h4><i class="fas fa-mobile-alt"></i> Informasi E-Wallet</h4>
                <div class="ewallet-list">
                    <div class="ewallet-item">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/8/86/Gopay_logo.svg" alt="GoPay" style="height: 30px;">
                        <p>No. HP: <span class="copy-text" onclick="copyToClipboard('081234567890')">081234567890</span></p>
                        <p>a.n. Juragan Ayam</p>
                    </div>
                    <div class="ewallet-item">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/e/eb/Logo_ovo_purple.svg" alt="OVO" style="height: 30px;">
                        <p>No. HP: <span class="copy-text" onclick="copyToClipboard('081234567890')">081234567890</span></p>
                        <p>a.n. Juragan Ayam</p>
                    </div>
                    <div class="ewallet-item">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/7/72/Logo_dana_blue.svg" alt="DANA" style="height: 30px;">
                        <p>No. HP: <span class="copy-text" onclick="copyToClipboard('081234567890')">081234567890</span></p>
                        <p>a.n. Juragan Ayam</p>
                    </div>
                </div>
                <p class="payment-note">💡 Transfer ke salah satu e-wallet di atas dan kirim bukti transfer</p>
            </div>
        `;
    } else if (paymentMethod === 'qris') {
        paymentDetails.innerHTML = `
            <div class="payment-info qris-payment">
                <h4><i class="fas fa-qrcode"></i> Scan QRIS</h4>
                <div class="qris-container">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=JURAGANAYAM.COM/PAY/QRIS" alt="QRIS Code" class="qris-code">
                    <p class="qris-note">Scan QR Code di atas dengan aplikasi pembayaran Anda</p>
                    <div class="qris-apps">
                        <span>💳 Semua Bank</span>
                        <span>📱 GoPay</span>
                        <span>📱 OVO</span>
                        <span>📱 DANA</span>
                        <span>📱 ShopeePay</span>
                    </div>
                </div>
                <p class="payment-note">💡 Setelah pembayaran berhasil, pesanan akan otomatis diproses</p>
            </div>
        `;
    }
}

// Copy to Clipboard Function
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('✅ Nomor rekening berhasil disalin!');
    }).catch(() => {
        showNotification('❌ Gagal menyalin nomor rekening');
    });
}

// Open Checkout Modal
function openCheckoutModal() {
    if (cart.length === 0) return;
    
    toggleCartModal();
    toggleCheckoutModal();
    
    // Update checkout items
    const checkoutItems = document.getElementById('checkoutItems');
    checkoutItems.innerHTML = cart.map(item => `
        <div class="checkout-item">
            <span>${item.name} x ${item.quantity}</span>
            <span>Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</span>
        </div>
    `).join('');
    
    // Update checkout total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('checkoutTotal').textContent = `Rp ${total.toLocaleString('id-ID')}`;
}

// Handle Checkout
async function handleCheckout(e) {
    e.preventDefault();
    
    const customerName = document.getElementById('customerName').value;
    const customerPhone = document.getElementById('customerPhone').value;
    const customerAddress = document.getElementById('customerAddress').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
    
    // Get payment method text
    const paymentSelect = document.getElementById('paymentMethod');
    const paymentMethodText = paymentSelect.options[paymentSelect.selectedIndex].text;
    
    const orderData = {
        customerName,
        phone: customerPhone,
        address: customerAddress,
        paymentMethod: paymentMethodText,
        items: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
        })),
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };
    
    try {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Custom styled success modal
            const successModal = document.createElement('div');
            successModal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 3000;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s;
            `;
            
            successModal.innerHTML = `
                <div style="
                    background: white;
                    padding: 3rem;
                    border-radius: 20px;
                    text-align: center;
                    max-width: 500px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    animation: slideIn 0.4s;
                ">
                    <div style="
                        width: 80px;
                        height: 80px;
                        background: linear-gradient(135deg, #00b894, #00cec9);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto 1.5rem;
                        animation: scaleIn 0.5s;
                    ">
                        <i class="fas fa-check" style="font-size: 3rem; color: white;"></i>
                    </div>
                    <h2 style="
                        color: #2d3436;
                        font-size: 2rem;
                        margin-bottom: 1rem;
                    ">🎉 Pesanan Berhasil!</h2>
                    <div style="
                        background: linear-gradient(135deg, #ff6b35, #f7931e);
                        color: white;
                        padding: 1rem;
                        border-radius: 10px;
                        margin-bottom: 1rem;
                        font-weight: bold;
                        font-size: 1.1rem;
                    ">
                        <i class="fas fa-receipt"></i> ${data.data.orderNumber}
                    </div>
                    <div style="
                        background: #f8f9fa;
                        padding: 1rem;
                        border-radius: 10px;
                        margin-bottom: 1rem;
                        color: #2d3436;
                    ">
                        <strong>Metode Pembayaran:</strong><br>
                        ${paymentMethodText}
                    </div>
                    <p style="
                        color: #636e72;
                        font-size: 1.1rem;
                        margin-bottom: 2rem;
                        line-height: 1.6;
                    ">
                        Terima kasih telah berbelanja di <strong style="color: #ff6b35;">Juragan Ayam</strong>! 🐔<br>
                        Pesanan Anda sedang diproses dan akan segera diantar!
                    </p>
                    <button onclick="this.closest('div').parentElement.remove()" style="
                        background: linear-gradient(135deg, #ff6b35, #f7931e);
                        color: white;
                        border: none;
                        padding: 1rem 3rem;
                        border-radius: 50px;
                        font-size: 1.1rem;
                        font-weight: bold;
                        cursor: pointer;
                        transition: all 0.3s;
                    " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                        Oke, Siap! 👍
                    </button>
                </div>
            `;
            
            document.body.appendChild(successModal);
            
            // Reset
            cart = [];
            saveCart();
            updateCartUI();
            toggleCheckoutModal();
            checkoutForm.reset();
            loadProducts(); // Reload products to update stock
        } else {
            alert('Gagal membuat pesanan: ' + data.message);
        }
    } catch (error) {
        console.error('Error creating order:', error);
        alert('Terjadi kesalahan saat membuat pesanan. Pastikan server berjalan.');
    }
}

// Save Cart to LocalStorage
function saveCart() {
    localStorage.setItem('juraganAyamCart', JSON.stringify(cart));
}

// Load Cart from LocalStorage
function loadCart() {
    const savedCart = localStorage.getItem('juraganAyamCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #00b894, #00cec9);
        color: white;
        padding: 1.2rem 2rem;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 184, 148, 0.4);
        z-index: 3000;
        animation: slideInRight 0.4s;
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 600;
        font-size: 1rem;
        border-left: 5px solid #ffffff;
    `;
    notification.innerHTML = `
        <i class="fas fa-check-circle" style="font-size: 1.5rem;"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s';
        setTimeout(() => notification.remove(), 400);
    }, 2500);
}

// Scroll to Products
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}


// ========== FITUR LUCU & MENARIK ==========

// 1. FLOATING CHICKEN ANIMATION
function createFloatingChicken() {
    const chicken = document.createElement('div');
    chicken.style.cssText = `
        position: fixed;
        font-size: 3rem;
        z-index: 9999;
        pointer-events: none;
        animation: floatChicken 3s ease-in-out;
        left: ${Math.random() * window.innerWidth}px;
        top: -100px;
    `;
    chicken.textContent = '🐔';
    document.body.appendChild(chicken);
    
    setTimeout(() => chicken.remove(), 3000);
}

// 2. CHICKEN RAIN (Easter Egg)
function chickenRain() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => createFloatingChicken(), i * 100);
    }
    sounds.success.play();
}

// 3. LIVE STATS COUNTER
function initLiveStats() {
    const statsDiv = document.createElement('div');
    statsDiv.id = 'live-stats';
    statsDiv.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: linear-gradient(135deg, #ff6b35, #f7931e);
        color: white;
        padding: 15px 20px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(255, 107, 53, 0.4);
        z-index: 1000;
        font-weight: bold;
        animation: pulse 2s infinite;
    `;
    statsDiv.innerHTML = `
        <div style="margin-bottom: 5px;">🔥 ${currentViewers} orang sedang melihat</div>
        <div>🐔 ${totalSoldToday} ayam terjual hari ini!</div>
    `;
    document.body.appendChild(statsDiv);
    
    // Update viewers randomly
    setInterval(() => {
        currentViewers = Math.floor(Math.random() * 30) + 5;
        const viewerText = statsDiv.querySelector('div:first-child');
        if (viewerText) {
            viewerText.textContent = `🔥 ${currentViewers} orang sedang melihat`;
        }
    }, 5000);
}

// 4. MASCOT CHATBOT
function initMascotChatbot() {
    const mascot = document.createElement('div');
    mascot.id = 'mascot-chatbot';
    mascot.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, #ff6b35, #f7931e);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2.5rem;
        cursor: pointer;
        box-shadow: 0 10px 30px rgba(255, 107, 53, 0.5);
        z-index: 1001;
        animation: bounce 2s infinite;
    `;
    mascot.textContent = '🐔';
    mascot.onclick = showMascotDialog;
    document.body.appendChild(mascot);
}

function showMascotDialog() {
    const jokes = [
        "Kenapa ayam nyebrang jalan? Mau ke Juragan Ayam dong! 😄",
        "Ayam kami so crispy, bikin kamu happy! 🎉",
        "Laper? Pesan ayam dong bos! Dijamin nagih! 😋",
        "Fun fact: Hari ini sudah " + totalSoldToday + " ayam terjual! 🔥",
        "Psst... Ayam Cheese lagi diskon loh! 🧀",
        "Mau paket keluarga? Hemat dan kenyang! 👨‍👩‍👧‍👦"
    ];
    
    const joke = jokes[Math.floor(Math.random() * jokes.length)];
    
    const dialog = document.createElement('div');
    dialog.style.cssText = `
        position: fixed;
        bottom: 110px;
        right: 20px;
        background: white;
        padding: 15px 20px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 1002;
        max-width: 250px;
        animation: slideInRight 0.3s;
        border: 3px solid var(--primary-color);
    `;
    dialog.innerHTML = `
        <div style="font-weight: bold; color: var(--primary-color); margin-bottom: 5px;">Juragan Ayam 🐔</div>
        <div style="color: #2d3436;">${joke}</div>
    `;
    document.body.appendChild(dialog);
    
    sounds.click.play();
    
    setTimeout(() => {
        dialog.style.animation = 'fadeOut 0.3s';
        setTimeout(() => dialog.remove(), 300);
    }, 4000);
}

// 5. LOADING CHICKEN ANIMATION
function showLoadingChicken() {
    const loading = document.createElement('div');
    loading.id = 'loading-chicken';
    loading.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        animation: fadeIn 0.3s;
    `;
    loading.innerHTML = `
        <div style="font-size: 5rem; animation: spin 1s linear infinite;">🐔</div>
        <div style="color: white; font-size: 1.5rem; margin-top: 20px; font-weight: bold;">
            Ayam sedang digoreng... 🍗
        </div>
    `;
    document.body.appendChild(loading);
    
    setTimeout(() => {
        loading.style.animation = 'fadeOut 0.3s';
        setTimeout(() => loading.remove(), 300);
    }, 2000);
}

// 6. PROMOTIONAL ADS - Iklan Menarik Pop-up
function showPromotionalAd() {
    const promos = [
        {
            title: '🔥 FLASH SALE!',
            message: 'Diskon 20% Semua Menu!',
            subtitle: 'Buruan sebelum kehabisan!',
            emoji: '⚡',
            color: 'linear-gradient(135deg, #e74c3c, #c0392b)',
            action: 'AMBIL PROMO'
        },
        {
            title: '🎉 PROMO GAJIAN!',
            message: 'Beli 5 Gratis 1!',
            subtitle: 'Hemat sampai 50rb!',
            emoji: '💰',
            color: 'linear-gradient(135deg, #f39c12, #d68910)',
            action: 'GAS PESAN'
        },
        {
            title: '🍗 PAKET HEMAT!',
            message: 'Cuma 100rb aja!',
            subtitle: '5 potong ayam pilihan + nasi',
            emoji: '📦',
            color: 'linear-gradient(135deg, #27ae60, #229954)',
            action: 'PESAN SEKARANG'
        },
        {
            title: '🌶️ AYAM SPICY!',
            message: 'Pedas Mantap!',
            subtitle: 'Level pedas bisa request!',
            emoji: '🔥',
            color: 'linear-gradient(135deg, #e67e22, #ca6f1e)',
            action: 'MAU COBA'
        },
        {
            title: '🧀 NEW! Ayam Cheese!',
            message: 'Keju Mozarella Melimpah!',
            subtitle: 'Menu terbaru yang viral!',
            emoji: '😍',
            color: 'linear-gradient(135deg, #9b59b6, #8e44ad)',
            action: 'COBAIN YUK'
        },
        {
            title: '👨‍👩‍👧‍👦 PAKET KELUARGA!',
            message: '10 potong + Nasi + Minum',
            subtitle: 'Hemat! Cukup untuk 5 orang!',
            emoji: '💯',
            color: 'linear-gradient(135deg, #3498db, #2980b9)',
            action: 'ORDER NOW'
        }
    ];
    
    const promo = promos[Math.floor(Math.random() * promos.length)];
    
    const ad = document.createElement('div');
    const isMobile = window.innerWidth <= 768;
    
    ad.style.cssText = `
        position: fixed;
        left: ${isMobile ? '50%' : '20px'};
        top: ${isMobile ? 'auto' : '150px'};
        bottom: ${isMobile ? '80px' : 'auto'};
        ${isMobile ? 'transform: translateX(-50%);' : ''}
        background: ${promo.color};
        padding: ${isMobile ? '1rem' : '1.5rem'};
        border-radius: ${isMobile ? '15px' : '20px'};
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: ${isMobile ? 'bounceIn 0.5s' : 'slideInLeft 0.5s, bounce 2s ease-in-out infinite'};
        max-width: ${isMobile ? '85%' : '350px'};
        width: ${isMobile ? '85%' : 'auto'};
        color: white;
        cursor: pointer;
        transition: all 0.3s;
        border: 3px solid rgba(255,255,255,0.3);
    `;
    
    ad.innerHTML = `
        <div style="position: relative;">
            <button onclick="event.stopPropagation(); this.closest('div').parentElement.remove()" style="
                position: absolute;
                top: -10px;
                right: -10px;
                background: rgba(0,0,0,0.5);
                color: white;
                border: none;
                width: ${isMobile ? '28px' : '30px'};
                height: ${isMobile ? '28px' : '30px'};
                border-radius: 50%;
                cursor: pointer;
                font-size: ${isMobile ? '1rem' : '1.2rem'};
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s;
                z-index: 10;
            " onmouseover="this.style.transform='rotate(90deg)'" onmouseout="this.style.transform='rotate(0)'">×</button>
            
            <div style="text-align: center;">
                <div style="
                    font-size: ${isMobile ? '3rem' : '5rem'};
                    margin-bottom: ${isMobile ? '0.3rem' : '0.5rem'};
                    animation: rotateScale 2s infinite;
                    filter: drop-shadow(0 5px 10px rgba(0,0,0,0.3));
                ">${promo.emoji}</div>
                
                <h3 style="
                    font-size: ${isMobile ? '1.1rem' : '1.5rem'};
                    margin-bottom: ${isMobile ? '0.3rem' : '0.5rem'};
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
                    animation: glow 2s ease-in-out infinite;
                ">${promo.title}</h3>
                
                <div style="
                    font-size: ${isMobile ? '1.3rem' : '1.8rem'};
                    font-weight: bold;
                    margin-bottom: ${isMobile ? '0.2rem' : '0.3rem'};
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
                ">${promo.message}</div>
                
                <p style="
                    font-size: ${isMobile ? '0.8rem' : '0.95rem'};
                    opacity: 0.95;
                    margin-bottom: ${isMobile ? '0.8rem' : '1rem'};
                ">${promo.subtitle}</p>
                
                <button style="
                    background: white;
                    color: #2d3436;
                    border: none;
                    padding: ${isMobile ? '0.6rem 1.5rem' : '0.8rem 2rem'};
                    border-radius: 50px;
                    font-weight: bold;
                    font-size: ${isMobile ? '0.85rem' : '1rem'};
                    cursor: pointer;
                    transition: all 0.3s;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                    animation: pulse 2s infinite;
                    width: ${isMobile ? '100%' : 'auto'};
                " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">${promo.action} 🚀</button>
            </div>
        </div>
    `;
    
    ad.onclick = () => {
        // Scroll ke section products
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        throwConfetti();
        ad.remove();
    };
    
    ad.onmouseover = () => {
        ad.style.transform = 'scale(1.05) rotate(-2deg)';
        ad.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.4)';
    };
    
    ad.onmouseout = () => {
        ad.style.transform = '';
        ad.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3)';
    };
    
    document.body.appendChild(ad);
    
    // Auto remove after 10 seconds
    setTimeout(() => {
        ad.style.animation = 'slideOutLeft 0.5s';
        setTimeout(() => ad.remove(), 500);
    }, 10000);
}

// Confetti function
function throwConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        const emojis = ['🎉', '🎊', '✨', '⭐', '🌟', '💫', '🍗', '🐔'];
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

// 7. DISCO MODE (Easter Egg)
let discoMode = false;
function toggleDiscoMode() {
    discoMode = !discoMode;
    if (discoMode) {
        document.body.style.animation = 'disco 0.5s infinite';
        showNotification('🎉 DISCO MODE ACTIVATED! 🎉');
        sounds.success.play();
    } else {
        document.body.style.animation = '';
        showNotification('Disco mode off 😢');
    }
}

// 8. KONAMI CODE LISTENER
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        toggleDiscoMode();
        konamiCode = [];
    }
});

// 9. LOGO CLICK COUNTER (Easter Egg)
function initLogoEasterEgg() {
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', () => {
            clickCount++;
            sounds.click.play();
            
            if (clickCount >= 10) {
                chickenRain();
                showNotification('🎉 HUJAN AYAM! Selamat dapat diskon 20%! 🐔');
                clickCount = 0;
            }
        });
    }
}

// 10. PRODUCT HOVER EFFECTS
function initProductHoverEffects() {
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('.product-card')) {
            const card = e.target.closest('.product-card');
            card.style.transform = 'translateY(-15px) scale(1.02)';
        }
    });
    
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('.product-card')) {
            const card = e.target.closest('.product-card');
            card.style.transform = '';
        }
    });
}

// 11. PROMO BANNER ANIMATED
function initPromoBanner() {
    const banner = document.createElement('div');
    banner.style.cssText = `
        position: fixed;
        top: 70px;
        left: 0;
        width: 100%;
        background: linear-gradient(135deg, #e74c3c, #c0392b);
        color: white;
        padding: 10px;
        text-align: center;
        font-weight: bold;
        z-index: 999;
        animation: slideDown 0.5s;
    `;
    banner.innerHTML = `
        ⚡ PROMO GAJIAN! Beli 5 Gratis 1! Buruan sebelum kehabisan! ⚡
        <button onclick="this.parentElement.remove()" style="
            position: absolute;
            right: 20px;
            background: transparent;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
        ">×</button>
    `;
    document.body.appendChild(banner);
}

// 12. RANDOM CHICKEN SOUNDS
function playRandomChickenSound() {
    const chickenSounds = ['🐔', '🐓', '🍗'];
    const randomSound = chickenSounds[Math.floor(Math.random() * chickenSounds.length)];
    
    const soundEl = document.createElement('div');
    soundEl.style.cssText = `
        position: fixed;
        font-size: 2rem;
        z-index: 9999;
        pointer-events: none;
        animation: soundPop 1s ease-out;
        left: ${Math.random() * (window.innerWidth - 50)}px;
        top: ${Math.random() * (window.innerHeight - 50)}px;
    `;
    soundEl.textContent = randomSound;
    document.body.appendChild(soundEl);
    
    setTimeout(() => soundEl.remove(), 1000);
}

// Initialize all fun features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initLiveStats();
        initMascotChatbot();
        initLogoEasterEgg();
        initProductHoverEffects();
        initPromoBanner();
        
        // Show promotional ad every 20 seconds
        setInterval(showPromotionalAd, 20000);
        
        // Random chicken sounds every 30 seconds
        setInterval(playRandomChickenSound, 30000);
        
        // First promotional ad after 8 seconds
        setTimeout(showPromotionalAd, 8000);
    }, 1000);
});


// SALES TICKER - Running Text Penjualan
function initSalesTicker() {
    const ticker = document.createElement('div');
    ticker.id = 'sales-ticker';
    ticker.style.cssText = `
        position: fixed;
        top: 70px;
        left: 0;
        width: 100%;
        background: linear-gradient(90deg, #e74c3c, #c0392b);
        color: white;
        padding: 8px 0;
        z-index: 998;
        overflow: hidden;
        font-weight: bold;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    
    const tickerContent = document.createElement('div');
    tickerContent.style.cssText = `
        display: flex;
        white-space: nowrap;
        animation: tickerScroll 30s linear infinite;
    `;
    
    const messages = [
        '🔥 LAGI HOT! Ayam Spicy Ludes 50 porsi! ',
        '⚡ FLASH SALE! Paket Hemat cuma 100rb! ',
        '🎉 Promo Gajian! Beli 5 Gratis 1! ',
        '💯 Bu Siti beli 10 potong! Ikutan yuk! ',
        '🏆 Produk Terlaris: Ayam Crispy! ',
        '🔔 15 orang lagi ngeliatin nih! ',
        '⭐ Rating 4.9/5! Customer puas! ',
        '🚀 Sudah 347 ayam terjual hari ini! '
    ];
    
    // Duplicate messages for seamless loop
    const fullMessage = messages.join('  •  ') + '  •  ' + messages.join('  •  ');
    tickerContent.textContent = fullMessage;
    
    ticker.appendChild(tickerContent);
    document.body.appendChild(ticker);
}

// Initialize sales ticker
setTimeout(() => initSalesTicker(), 3000);
