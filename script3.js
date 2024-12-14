const productList = document.getElementById('product-list');

// Fetch products from the database
async function fetchProducts() {
    try {
        const response = await fetch('/products');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Display products
function displayProducts(products) {
    productList.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
        `;
        productList.appendChild(productElement);
    });
}

// Initialize
fetchProducts();
