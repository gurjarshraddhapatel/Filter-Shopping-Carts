// Function to fetch data from the API
async function fetchData() {
    try {
        const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

// Function to filter and display products based on the selected category
async function filterProducts(category) {
    const data = await fetchData();
    const products = data.categories.find(cat => cat.category_name === category)?.category_products || [];
    displayProducts(products);
}

// Function to display products on the web page
function displayProducts(products) {
    const productContainer = document.getElementById('product-container');
    productContainer.innerHTML = ''; // Clear previous content

    // Use map to create HTML elements for each product
    const productElements = products.map(product => {
        const productElement = document.createElement('div');

        productElement.innerHTML = `
       
            <div class="product-card">
            
                <h3>${product.title}</h3>
                <div class="img-container">
                    <img class="product-image" src="${product.image}" alt="${product.title}">
                </div>
            <div class="product-details">
              <p>Vendor: ${product.vendor}</p>
              <p class="product-price">Price: ${product.price}</p>
              <p class="compare-at-price">Compare at Price: ${product.compare_at_price || 'N/A'}</p>
              <p class="badge">Badge: ${product.badge_text || 'N/A'}</p>
              <p class="percent-off"> Off: ${calculateDiscountPercentage(product.price, product.compare_at_price)}%</p>
              <button class="add-to-cart-button">Add to Cart</button>
            </div>
            </div>
         
        `;
        return productElement;
    });

    // Append the product elements to the container
    productElements.forEach(element => {
        productContainer.appendChild(element);
    });
}
// Function to calculate discount percentage
function calculateDiscountPercentage(price, compareAtPrice) {
    if (!compareAtPrice) {
        return 0;
    }

    const priceFloat = parseFloat(price);
    const compareAtPriceFloat = parseFloat(compareAtPrice);
    const discountPercentage = ((compareAtPriceFloat - priceFloat) / compareAtPriceFloat) * 100;
    return Math.round(discountPercentage);
}

// Dummy function for "Add to Cart" button
function addToCart() {
    alert('Product added to cart (dummy action)');
}

// Initial display of all products
filterProducts('Men'); // Assuming 'Men' is a default category or fetch all products initially