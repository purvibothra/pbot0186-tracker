document.addEventListener('DOMContentLoaded', function() {
  const productImageMap = {
    "Green Tea Cleanser": "assets/product-images/greentea.png",
    "Apricot Mask": "assets/product-images/claymask.png",
    "Gentle Exfoliator": "assets/product-images/exfoliator.png",
    "Pomegranate Mask": "assets/product-images/facemask-1.png",
    "Rose Mask": "assets/product-images/facemask-2.png",
    "Avocado Mask": "assets/product-images/facemask-3.png",
    "Long Wear Makeup Remover": "assets/product-images/makeup-remover.png",
    "Daily Facial Moisturiser": "assets/product-images/moisturiser.png",
    "Watermelon Serum": "assets/product-images/serum.png",
    "Salicylic Spot Treatment": "assets/product-images/spot-treatment.png",
    "SPF 50+ Sunscreen": "assets/product-images/sunscreen.png",
    "Rose Water Toner": "assets/product-images/toner.png",
    "Eye Cream": "assets/product-images/eye cream.png",
  };

  const stockTextMap = {
    "wishlist": "Wishlist",
    "in-stock": "In Stock",
    "running-out": "Running Out",
    "restock": "Restock",
    "finished": "Finished",
    "not-using": "No Longer Using"
  };

  // Get form elements
  const productNameInput = document.getElementById('productName');
  const productImage = document.getElementById('productImage');
  const productPopUp = document.getElementById('productPopUp');
  const addProductButton = document.getElementById('addProductButton');
  const closePopup = document.querySelector('.close');
  const saveProductButton = document.getElementById('saveProductButton');
  const productList = document.getElementById('productList');

  // Reset form function
  function resetForm() {
    document.getElementById('productName').value = '';
    document.getElementById('productBrand').value = '';
    document.getElementById('productLink').value = '';
    document.getElementById('routineSelect').value = '';
    document.getElementById('stockStatus').value = '';
    document.getElementById('productCategory').value = '';
    document.getElementById('cost').value = '';
    document.getElementById('datePurchased').value = new Date().toISOString().split('T')[0];
    document.getElementById('comments').value = '';
    productImage.src = "assets/product-images/placeholder-skincare.png";
    productImage.alt = '';
    setRating(0);
  }

  // Update product image based on product name input
  productNameInput.addEventListener('input', function() {
    const productName = productNameInput.value;
    if (productImageMap[productName]) {
      productImage.src = productImageMap[productName];
      productImage.alt = productName;
    } else {
      productImage.src = "assets/product-images/placeholder-skincare.png";
      productImage.alt = "Product Image Placeholder";
    }
  });

  // Show popup to add a new product
  addProductButton.addEventListener('click', function () {
    resetForm();
    productPopUp.classList.add('active');
    productPopUp.style.display = 'block';
    document.body.style.overflow = 'hidden';

    const stars = document.querySelectorAll('.rate i');
    stars.forEach((star, index) => {
      star.addEventListener('click', () => {
        setRating(index + 1);
      });
    });
  });

  // Close popup
  closePopup.addEventListener('click', function () {
    productPopUp.classList.remove('active');
    productPopUp.style.display = 'none';
    document.body.style.overflow = '';
    resetForm();
  });

  // Save product details
  saveProductButton.addEventListener('click', function () {
    const productName = productNameInput.value;
    const productBrand = document.getElementById('productBrand').value;
    const datePurchased = document.getElementById('datePurchased').value; // Ensure date is read
    const routineSelect = document.getElementById('routineSelect').value;
    const stockStatus = document.getElementById('stockStatus').value;

    // Validate product details
    if (productName && productBrand) {
      const product = {
        id: Date.now(),
        name: productName,
        brand: productBrand,
        datePurchased: datePurchased, // Ensure date is saved
        status: stockStatus,
        rating: getRating(),
      };

      saveProduct(product);
      displayProduct(product);

      resetForm();
      productPopUp.style.display = 'none';
      document.body.style.overflow = '';
    } else {
      alert('Please enter product details.');
    }
  });

  // Get rating from stars
  function getRating() {
    const stars = document.querySelectorAll('.rate i');
    let rating = 0;
    stars.forEach(star => {
      if (star.classList.contains('filled')) {
        rating = star.getAttribute('data-rating');
      }
    });
    return rating;
  }

  // Save product to local storage
  function saveProduct(product) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
  }

  // Calculate days since purchase
  function calculateDaysSincePurchase(purchaseDate) {
    const today = new Date();
    const purchase = new Date(purchaseDate);
    const timeDifference = today - purchase;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
  }

//   const productContainer = document.createElement('div');
// productContainer.classList.add('product-container');

// // Insert the container after the "Add Product" button
// addProductButton.parentElement.insertAdjacentElement('afterend', productContainer);

  // Display product card
  function displayProduct(product) {
    const stockText = stockTextMap[product.status] || product.status;
    const productImageSrc = productImageMap[product.name] || "assets/product-images/placeholder-skincare.png";

    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.setAttribute('data-id', product.id);

    let starsHTML = '';
    for (let i = 0; i < 5; i++) {
      starsHTML += `<i class="star ${i < product.rating ? 'filled' : ''}" data-rating="${i + 1}">★</i>`;
    }

    const daysSincePurchase = calculateDaysSincePurchase(product.datePurchased);

    productCard.innerHTML = `
      <img src="${productImageSrc}" alt="${product.name}" class="product-image"/>
      <p class="product-name">${product.name}</p>
      <p class="product-brand">${product.brand}</p>
      <div class="stock-status ${product.status}">${stockText}</div>
      <p class="date-info">Last Restocked ${daysSincePurchase} days ago</p>
      <span class="rate">${starsHTML}</span>
      <button class="delete-product"><img src="assets/delete-icon.png" alt="Delete Product"></button>
    `;

    productList.appendChild(productCard);

    // Delete product event listener
    productCard.querySelector('.delete-product').addEventListener('click', function() {
      deleteProduct(product.id);
      productCard.remove();
    });
  }

  // Delete product from local storage
  function deleteProduct(productId) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products = products.filter(product => product.id !== productId);
    localStorage.setItem('products', JSON.stringify(products));
  }

  // Load products from local storage on page load
  function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];

      products.sort((a, b) => new Date(b.datePurchased) - new Date(a.datePurchased));

    products.forEach(product => {
      displayProduct(product);
    });
  }

  // // Insert add product button
  // productList.insertBefore(addProductButton.parentElement, productList.firstChild);

  // Load existing products
  loadProducts();
});

// Set the date purchased input to today's date by default
document.addEventListener('DOMContentLoaded', function() {
  const datePurchasedInput = document.getElementById('datePurchased');
  const today = new Date().toISOString().split('T')[0];
  datePurchasedInput.value = today;
});

// Set rating stars
function setRating(rating) {
  const stars = document.querySelectorAll('.rate i');
  stars.forEach(star => {
    const starRating = parseInt(star.getAttribute('data-rating'));
    if (starRating <= rating) {
      star.classList.add('filled');
    } else {
      star.classList.remove('filled');
    }
  });
}

// Handle routine checkboxes
document.addEventListener('DOMContentLoaded', function() {
  var routineCheckboxes = document.querySelectorAll('.options .routine input[type="checkbox"]:not(#allCheckbox)');
  var allCheckbox = document.getElementById('allCheckbox');

  routineCheckboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
      if (this.checked) {
        allCheckbox.checked = false;
      }
    });
  });

  allCheckbox.addEventListener('change', function() {
    if (this.checked) {
      routineCheckboxes.forEach(function(checkbox) {
        checkbox.checked = false;
      });
    }
  });
});
