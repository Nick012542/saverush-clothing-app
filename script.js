// Product data
const products = [
    {
        id: 1,
        name: "Classic White T-Shirt",
        price: 1299,
        image: "mens-tshirt-1.jpg",
        description: "Premium quality cotton t-shirt with a comfortable fit. Perfect for casual wear and everyday comfort. Made from 100% organic cotton with a soft, breathable fabric that gets better with every wash.",
        category: "men"
    },
    {
        id: 2,
        name: "Stylish Men's T-Shirt",
        price: 1499,
        image: "mens-tshirt-2.jpg",
        description: "Modern design t-shirt with superior comfort and style. Features a contemporary cut and premium fabric blend for the perfect balance of comfort and durability.",
        category: "men"
    },
    {
        id: 3,
        name: "Elegant Summer Dress",
        price: 2499,
        image: "womens-dress-1.jpg",
        description: "Beautiful summer dress perfect for any occasion. Lightweight, breathable fabric with an elegant silhouette that flatters all body types. Perfect for both casual and semi-formal events.",
        category: "women"
    },
    {
        id: 4,
        name: "Floral Print Dress",
        price: 2799,
        image: "womens-dress-2.jpg",
        description: "Stunning floral print dress with vibrant colors and comfortable fit. Made from high-quality materials with attention to detail in every stitch. Perfect for spring and summer occasions.",
        category: "women"
    },
    {
        id: 5,
        name: "Women's Skinny Jeans",
        price: 3299,
        image: "womens-jeans-1.jpg",
        description: "High-quality denim jeans with a perfect skinny fit. Features stretch fabric for comfort and movement, with a flattering high-waist design that pairs well with any top.",
        category: "women"
    },
    {
        id: 6,
        name: "Men's Classic Jeans",
        price: 3499,
        image: "mens-jeans-1.jpg",
        description: "Timeless denim jeans with a classic straight fit. Durable construction with premium denim fabric that ages beautifully. Perfect for both casual and smart-casual looks.",
        category: "men"
    },
    {
        id: 7,
        name: "Comfortable Hoodie",
        price: 2199,
        image: "hoodie-1.jpg",
        description: "Cozy and warm hoodie perfect for cooler weather. Made from soft fleece material with a spacious front pocket and adjustable hood. Ideal for layering or wearing on its own.",
        category: "unisex"
    },
    {
        id: 8,
        name: "Premium Hoodie",
        price: 2399,
        image: "hoodie-1.jpg",
        description: "Premium quality hoodie with superior comfort and style. Features a modern fit, high-quality materials, and excellent craftsmanship. Perfect for both casual wear and athletic activities.",
        category: "unisex"
    }
];

// Cart functionality
let cart = [];
let selectedProduct = null;
let selectedSize = null;
let quantity = 1;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    updateCartCount();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Size selector
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            selectedSize = this.dataset.size;
        });
    });

    // Search functionality
    document.getElementById('searchInput').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        filterProducts(searchTerm);
    });

    // Close modal when clicking outside
    document.getElementById('productModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
}

// Load products into the grid
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.onclick = () => openProductModal(product);

    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x250?text=Image+Not+Found'">
        </div>
        <div class="product-info">
            <h4>${product.name}</h4>
            <p class="product-price">₹${product.price.toLocaleString()}</p>
            <button class="quick-add-btn" onclick="event.stopPropagation(); quickAdd(${product.id})">
                Quick Add
            </button>
        </div>
    `;

    return card;
}

// Filter products based on search
function filterProducts(searchTerm) {
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );

    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Open product modal
function openProductModal(product) {
    selectedProduct = product;
    selectedSize = null;
    quantity = 1;

    document.getElementById('modalImage').src = product.image;
    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalPrice').textContent = `₹${product.price.toLocaleString()}`;
    document.getElementById('modalDescription').textContent = product.description;
    document.getElementById('quantity').textContent = quantity;

    // Reset size selection
    document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('selected'));

    document.getElementById('productModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close product modal
function closeModal() {
    document.getElementById('productModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    selectedProduct = null;
    selectedSize = null;
    quantity = 1;
}

// Quantity controls
function increaseQuantity() {
    quantity++;
    document.getElementById('quantity').textContent = quantity;
}

function decreaseQuantity() {
    if (quantity > 1) {
        quantity--;
        document.getElementById('quantity').textContent = quantity;
    }
}

// Quick add to cart
function quickAdd(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        addToCartWithDefaults(product);
        showNotification(`${product.name} added to cart!`);
    }
}

// Add to cart with default values
function addToCartWithDefaults(product) {
    const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: 'M', // Default size
        quantity: 1
    };

    const existingItem = cart.find(item => 
        item.id === cartItem.id && item.size === cartItem.size
    );

    if (existingItem) {
        existingItem.quantity += cartItem.quantity;
    } else {
        cart.push(cartItem);
    }

    updateCartCount();
    updateCartDisplay();
}

// Add to cart from modal
function addToCart() {
    if (!selectedProduct) return;
    
    if (!selectedSize) {
        showNotification('Please select a size!', 'error');
        return;
    }

    const cartItem = {
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        image: selectedProduct.image,
        size: selectedSize,
        quantity: quantity
    };

    const existingItem = cart.find(item => 
        item.id === cartItem.id && item.size === cartItem.size
    );

    if (existingItem) {
        existingItem.quantity += cartItem.quantity;
    } else {
        cart.push(cartItem);
    }

    updateCartCount();
    updateCartDisplay();
    closeModal();
    showNotification(`${selectedProduct.name} added to cart!`);
}

// Buy now functionality
function buyNow() {
    if (!selectedProduct) return;
    
    if (!selectedSize) {
        showNotification('Please select a size!', 'error');
        return;
    }

    addToCart();
    toggleCart();
    showNotification('Redirecting to checkout...', 'success');
    
    // Simulate checkout redirect
    setTimeout(() => {
        alert('Checkout functionality would be implemented here!');
    }, 1000);
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('open');
    
    if (cartSidebar.classList.contains('open')) {
        updateCartDisplay();
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;
}

// Update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #6B7280; padding: 2rem;">Your cart is empty</p>';
        cartTotal.textContent = '0';
        return;
    }

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/60x60?text=No+Image'">
            <div class="cart-item-info">
                <h5>${item.name}</h5>
                <p>Size: ${item.size} | Qty: ${item.quantity}</p>
                <p style="font-weight: bold; color: #F59E0B;">₹${(item.price * item.quantity).toLocaleString()}</p>
            </div>
            <button onclick="removeFromCart(${index})" style="background: #EF4444; color: white; border: none; border-radius: 50%; width: 25px; height: 25px; cursor: pointer;">×</button>
        `;
        
        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = total.toLocaleString();
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    updateCartDisplay();
    showNotification('Item removed from cart');
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#EF4444' : '#10B981'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 3000;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;

    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
        if (document.getElementById('cartSidebar').classList.contains('open')) {
            toggleCart();
        }
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

