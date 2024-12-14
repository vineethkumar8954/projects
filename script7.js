document.addEventListener('DOMContentLoaded', () => {
    const addtocartButtons = document.querySelectorAll('.add-to-cart'); // Select all buttons with class 'add-to-cart'
    const cartItemsList = document.querySelector('.cart-items');
    const cartCountElement = document.querySelector('.cart-count');
    const shoppingCart = document.querySelector('.shopping-cart');
    const searchForm = document.querySelector('.search-form');
    const loginForm = document.querySelector('.login-form');
    const navbar = document.querySelector('.navbar');

    let cartCount = 0; // Track number of items in cart
    let cartItems = [];
    let totalAmount = 0;

    function updateCartCount(count) {
        cartCountElement.textContent = count;
    }

    function updateCartUI() {
        updateCartItemCount(cartItems.length);
        updateCartItemList();
        updateCartTotal();
    }

    function updateCartItemCount(count) {
        cartCountElement.textContent = count;
    }

    function updateCartItemList() {
        cartItemsList.innerHTML = '';
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.textContent = `${item.name} - ₹${(item.price * item.quantity).toFixed(2)}`;
            cartItemsList.appendChild(cartItem);
        });
    }

    function updateCartTotal() {
        const cartTotal = document.querySelector('.cart-total');
        cartTotal.textContent = `Total: ₹${totalAmount.toFixed(2)}`;
    }

    // Function to add item to cart
    function addItemToCart(item) {
        const existingItem = cartItems.find((cartItem) => cartItem.name === item.name);
        if (existingItem) {
            existingItem.quantity += 1; // Increment quantity by 1
        } else {
            item.quantity = 1; // Set initial quantity to 1
            cartItems.push(item);
        }
        totalAmount += item.price; // Increment total by item price
        updateCartUI();
    }
    

    // Add event listener to 'Add to Cart' buttons
    addtocartButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const card = button.closest('.card');
            const itemName = card.querySelector('h3').textContent;
            const itemPrice = parseFloat(card.querySelector('.card--price .price').textContent.split('-')[1]);

            const item = {
                name: itemName,
                price: itemPrice,
            };

            addItemToCart(item);
        });
    });

    // Toggle search form
    document.querySelector('#search-btn').onclick = () => {
        searchForm.classList.toggle('active');
        shoppingCart.classList.remove('active');
        loginForm.classList.remove('active');
        navbar.classList.remove('active');
    };

    // Toggle shopping cart
    document.querySelector('#cart-btn').onclick = () => {
        shoppingCart.classList.toggle('active');
        searchForm.classList.remove('active');
        loginForm.classList.remove('active');
        navbar.classList.remove('active');
    };

    // Toggle login form
    document.querySelector('#login-btn').onclick = () => {
        loginForm.classList.toggle('active');
        searchForm.classList.remove('active');
        shoppingCart.classList.remove('active');
        navbar.classList.remove('active');
    };

    // Toggle navbar menu
    document.querySelector('#menu-btn').onclick = () => {
        navbar.classList.toggle('active');
        searchForm.classList.remove('active');
        shoppingCart.classList.remove('active');
        loginForm.classList.remove('active');
    };

    // Sidebar functionality
    const cartItemCount = document.querySelector('.icons span');
    const sidebar = document.getElementById('sidebar');

    cartItemCount.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    const closeButton = document.querySelector('.sidebar-close');
    closeButton.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });
});
