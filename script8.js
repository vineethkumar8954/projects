document.addEventListener("DOMContentLoaded", () => {
    let cartTotal = 0;
    let itemCount = 0;
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalElement = document.querySelector('.cart-total');
    const totalAmountElement = document.querySelector('.total--amount .cart-total');
    const cartCountElement = document.querySelector('.icons span');

    function updateCartTotal(amount) {
        cartTotal += amount;
        if (cartTotal <= 0) {
            cartTotal = 0; // Ensure total doesn't go negative
            itemCount = 0; // Reset item count when cart is empty
        }
        cartTotalElement.textContent = `₹${cartTotal.toFixed(2)}`;
        totalAmountElement.textContent = `₹${cartTotal.toFixed(2)}`;
        localStorage.setItem('cartTotal', cartTotal);
    }
    

    function updateCartCount() {
        cartCountElement.textContent = itemCount;
    }

    function addItemToCart(productName, productAmount) {
        const existingCartItem = [...cartItemsContainer.children].find(item => item.querySelector('span').textContent === productName);

        if (existingCartItem) {
            incrementItem(existingCartItem, productAmount);
        } else {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <span class="product-name">${productName}</span>
                <span class="item-amount">₹${productAmount.toFixed(2)}</span>
                <div class="quantity-controls">
                    <button class="decrement-btn"><i class="fas fa-minus"></i></button>
                    <span class="item-quantity">1</span>
                    <button class="increment-btn"><i class="fas fa-plus"></i></button>
                </div>
                <button class="remove-btn"><i class="fas fa-trash"></i></button>
            `;
            cartItemsContainer.appendChild(cartItem);

            cartItem.querySelector('.remove-btn').addEventListener('click', () => {
                removeItemFromCart(cartItem, productAmount);
            });
            cartItem.querySelector('.increment-btn').addEventListener('click', () => {
                incrementItem(cartItem, productAmount);
            });
            cartItem.querySelector('.decrement-btn').addEventListener('click', () => {
                decrementItem(cartItem, productAmount);
            });

            updateCartTotal(productAmount);
            itemCount++;
            updateCartCount();
        }
    }

    function removeItemFromCart(cartItem, productAmount) {
        const quantityElement = cartItem.querySelector('.item-quantity');
        const quantity = parseInt(quantityElement.textContent);
        const itemTotal = productAmount * quantity;
        cartItemsContainer.removeChild(cartItem);
        cartTotal -= itemTotal;
        itemCount -= quantity;
        updateCartTotal(-itemTotal);
        updateCartCount();
    }

    function incrementItem(cartItem, productAmount) {
        const quantityElement = cartItem.querySelector('.item-quantity');
        let quantity = parseInt(quantityElement.textContent);
        quantity++;
        quantityElement.textContent = quantity;
        updateCartTotal(productAmount);
        cartItem.querySelector('.item-amount').textContent = `₹${(productAmount * quantity).toFixed(2)}`;
    }

    function decrementItem(cartItem, productAmount) {
        const quantityElement = cartItem.querySelector('.item-quantity');
        let quantity = parseInt(quantityElement.textContent);
        if (quantity > 1) { 
            quantity--;
            quantityElement.textContent = quantity;
            updateCartTotal(-productAmount);
            cartItem.querySelector('.item-amount').textContent = `₹${(productAmount * quantity).toFixed(2)}`;
        } else {
            removeItemFromCart(cartItem, productAmount);
        }
    }

    document.querySelector('#search-btn').onclick = () => {
        const searchValue = document.querySelector('#search-box').value.toLowerCase().trim();
        document.querySelectorAll('.box').forEach(box => {
            const productName = box.querySelector('h2').textContent.toLowerCase();
            box.style.display = productName.includes(searchValue) ? 'block' : 'none';
        });
        const recipeSection = document.querySelector(`[data-recipe="${searchValue}"]`);
        if (recipeSection) {
            recipeSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    document.querySelectorAll('.add-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const productName = e.target.closest('li').textContent.trim().split(' ')[0];
            const productAmount = parseFloat(e.target.getAttribute('data-product-amount'));
            addItemToCart(productName, productAmount); 
        });
    });

    document.querySelectorAll('.add-recipe').forEach(button => {
        button.addEventListener('click', (e) => {
            const recipe = e.target.closest('.recipe');
            const recipeName = recipe.querySelector('h2').textContent;
            const recipeAmount = parseFloat(recipe.getAttribute('data-product-amount'));
            addItemToCart(recipeName, recipeAmount);
        });
    });

    document.querySelector('#search-btn').onclick = () => {
        document.querySelector('.search-form').classList.toggle('active');
        document.querySelector('.shopping-cart').classList.remove('active');
        document.querySelector('.login-form').classList.remove('active');
        document.querySelector('.navbar').classList.remove('active');
    };

    document.querySelector('#cart-btn').onclick = () => {
        document.querySelector('.shopping-cart').classList.toggle('active');
        document.querySelector('.search-form').classList.remove('active');
        document.querySelector('.login-form').classList.remove('active');
        document.querySelector('.navbar').classList.remove('active');
    };

    const savedCartTotal = localStorage.getItem('cartTotal');
    if (savedCartTotal) {
        cartTotal = parseFloat(savedCartTotal);
        cartTotalElement.textContent = `₹${cartTotal.toFixed(2)}`;
        totalAmountElement.textContent = `₹${cartTotal.toFixed(2)}`;
    }
});
