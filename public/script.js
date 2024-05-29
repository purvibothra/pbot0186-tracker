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

  const productBrandMap = {
    "Green Tea Cleanser": "Innisfree",
    "Apricot Mask": "Beauty of Joseon",
    "Gentle Exfoliator": "GO-TO",
    "Pomegranate Mask": "Clean & Vitality",
    "Rose Mask": "Clean & Vitality",
    "Avocado Mask": "TonyMoly",
    "Long Wear Makeup Remover": "Bobbi Brown",
    "Daily Facial Moisturiser": "Essano",
    "Watermelon Serum": "Glow Recipe",
    "Salicylic Spot Treatment": "The Ordinary",
    "SPF 50+ Sunscreen": "Natio Sun",
    "Rose Water Toner": "Mamonde",
    "Eye Cream": "Coco & Eve",
  };

  const stockTextMap = {
    "wishlist": "Wishlist",
    "in-stock": "In Stock",
    "running-out": "Running Out",
    "restock": "Restock",
    "finished": "Finished",
    "not-using": "No Longer Using"
  };

  const ratingImageMap = {
    0: "assets/0-star.png",
    1: "assets/1-star.png",
    2: "assets/2-stars.png",
    3: "assets/3-stars.png",
    4: "assets/4-stars.png",
    5: "assets/5-stars.png"
  };
  


  // Get form elements
  const productNameInput = document.getElementById('productName');
  const productImage = document.getElementById('productImage');
  const productBrand = document.getElementById('productBrand');
  const productPopUp = document.getElementById('productPopUp');
  const addProductButton = document.getElementById('addProductButton');
  const closePopup = document.querySelector('.close');
  const saveProductButton = document.getElementById('saveProductButton');
  const productList = document.getElementById('productList');
  const stars = document.querySelectorAll('.rate i');


      // Set rating stars
// Set rating stars
function setRating(rating) {
  stars.forEach((star, index) => {
    if (index < rating) {
      star.style.color = '#E26F6F'; // Change color for filled stars
    } else {
      star.style.color = ''; // Reset color for unfilled stars
    }
  });
}

// Get rating from stars
function getRating() {
  const stars = document.querySelectorAll('.rate i');
  let rating = 0;
  stars.forEach((star, index) => {
    if (star.style.color === 'rgb(226, 111, 111)') { // Check if star is filled
      rating = index + 1; // Rating is index + 1 (stars are 1-indexed)
    }
  });
  return rating;
}

function updateProductCounter() {
  const productCounter = document.getElementById('productCounter');
  const productCards = document.querySelectorAll('.product-card');
  productCounter.textContent = productCards.length;
}

function updateRestockCounter() {
  const restockCounter = document.getElementById('restockCounter');
  const productCards = document.querySelectorAll('.product-card');

  let restockCount = 0;

  productCards.forEach(card => {
    const stockStatus = card.querySelector('.stock-status').classList[1]; // Get stock status class
    if (stockStatus === 'restock') {
      restockCount++;
    }
  });

  restockCounter.textContent = restockCount;
  console.log('Restock counter updated');
}

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


  // Function to load existing products from local storage
function loadProducts() {
  const products = JSON.parse(localStorage.getItem('products')) || [];

  products.sort((a, b) => new Date(b.datePurchased) - new Date(a.datePurchased));

  products.forEach(product => {
    displayProduct(product);
    updateProductCounter();
    updateRestockCounter();

  });
}
  

  

  
  // Get the input element
const costInput = document.getElementById('cost');

// Add an event listener for the input event
costInput.addEventListener('input', function() {
    // Get the current value of the input
    let value = this.value.trim();

    // Remove any non-numeric characters except for period (.)
    value = value.replace(/[^0-9.]/g, '');

    // Add $ sign to the beginning of the value if it's not empty and not already prefixed with $
    if (value !== '' && !value.startsWith('$')) {
        value = '$' + value;
    }

    // Update the input value with the formatted value
    this.value = value;
});

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

    if (productBrandMap[productName]) {
      productBrand.value = productBrandMap[productName];
    } else {
      productBrand.value = '';
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
    const routineSelect = document.getElementById('routineSelect').value; // Get selected routine
    const stockStatus = document.getElementById('stockStatus').value;
    const rating = getRating(); // Retrieve star rating

    // Validate product details
    if (productName && productBrand) {
      const product = {
        id: Date.now(),
        name: productName,
        brand: productBrand,
        datePurchased: datePurchased, // Ensure date is saved
        status: stockStatus,
        rating: rating, // Include star rating in the product object
        routine: routineSelect || '', // Include selected routine in the product object
      };

      saveProduct(product);
      displayProduct(product);
      updateProductCounter();
      updateRestockCounter();

      resetForm();
      productPopUp.style.display = 'none';
      document.body.style.overflow = '';
    } else {
      alert('Please enter product details.');
    }
  });

  // // Get rating from stars
  // function getRating() {
  //   const stars = document.querySelectorAll('.rate i');
  //   let rating = 0;
  //   stars.forEach(star => {
  //     if (star.classList.contains('filled')) {
  //       rating = star.getAttribute('data-rating');
  //     }
  //   });
  //   return rating;
  // }

  // Save product to local storage
  function saveProduct(product) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product); // Add the new product to the end of the array
    products.sort((a, b) => new Date(b.datePurchased) - new Date(a.datePurchased)); // Sort the products based on datePurchased
    localStorage.setItem('products', JSON.stringify(products)); // Update the local storage with the sorted products
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
    const ratingImageSrc = ratingImageMap[product.rating] || ratingImageMap[0]; // Default to 0 rating image if undefined

    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.setAttribute('data-id', product.id);
    productCard.setAttribute('data-routine', product.routine ? product.routine.toLowerCase() : ''); // Set data-routine attribute


    updateProductCounter();
    updateRestockCounter();



    const daysSincePurchase = calculateDaysSincePurchase(product.datePurchased);

    productCard.innerHTML = `
      <img src="${productImageSrc}" alt="${product.name}" class="product-image"/>
      <p class="product-name">${product.name}</p>
      <p class="product-brand">${product.brand}</p>
      <img src="${ratingImageSrc}" alt="Rating: ${product.rating}" class="rating-image"/>
      <p class="date-info">Last Restocked ${daysSincePurchase} days ago</p>
      <div class="stock-status ${product.status}">${stockText}</div>
      <button class="delete-product"><img src="assets/delete-icon.png" alt="Delete Product"></button>
    `;

    productList.appendChild(productCard);

    // Delete product event listener
    productCard.querySelector('.delete-product').addEventListener('click', function() {
      deleteProduct(product.id);
      productCard.remove();
      updateProductCounter();
      updateRestockCounter();


    });
  }

  // Delete product from local storage
  function deleteProduct(productId) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products = products.filter(product => product.id !== productId);
    localStorage.setItem('products', JSON.stringify(products));
  // Remove product card from DOM
  const productCard = document.querySelector(`.product-card[data-id="${productId}"]`);
  if (productCard) {
    productCard.remove();
    updateProductCounter();
    updateRestockCounter();
    // Call updateProductCounter() after removing the product card
  }
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
  
document.addEventListener('DOMContentLoaded', function() {
  // Get routine checkboxes including the new custom routine checkbox
  var routineCheckboxes = document.querySelectorAll('.options .routine input[type="checkbox"]');

  // Get the "All" checkbox
  var allCheckbox = document.getElementById('allCheckbox');

  // Add event listeners to routine checkboxes
  routineCheckboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
      if (this !== allCheckbox && this.checked) {
        allCheckbox.checked = false; // Uncheck "All" checkbox if any other checkbox is checked
      }
      filterProductsByRoutine(); // Trigger filtering function
    });
  });

  // Add event listener to the "All" checkbox
  allCheckbox.addEventListener('change', function() {
    if (this.checked) {
      // Check all other checkboxes if "All" checkbox is checked
      routineCheckboxes.forEach(function(checkbox) {
        checkbox.checked = true;
      });
    } else {
      // Uncheck all other checkboxes if "All" checkbox is unchecked
      routineCheckboxes.forEach(function(checkbox) {
        if (checkbox !== allCheckbox) {
          checkbox.checked = false;
        }
      });
    }
    filterProductsByRoutine(); // Trigger filtering function
  });

  // Function to filter products based on selected routines
  function filterProductsByRoutine() {
    const selectedRoutines = Array.from(routineCheckboxes)
      .filter(checkbox => checkbox.checked && checkbox !== allCheckbox) // Exclude the "All" checkbox
      .map(checkbox => checkbox.value.toLowerCase());

    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
      const routine = card.dataset.routine || ''; // Ensure routine is not undefined
      if (selectedRoutines.length === 0 || selectedRoutines.includes(routine.toLowerCase())) {
        card.style.display = 'block'; // Show product card
      } else {
        card.style.display = 'none'; // Hide product card
      }
    });

    const productList = document.getElementById('productList');
    productList.style.display = 'flex';
    productList.style.flexWrap = 'wrap';
    productList.style.alignItems = 'flex-start';
  }
});


document.addEventListener('DOMContentLoaded', function() {
  // Your existing code...

  // Sort dropdown select element
  const sortSelect = document.createElement('select');
  sortSelect.innerHTML = `
    <option value="date">Sort by Earliest Purchase</option>
    <option value="name">Sort by A-Z</option>
    <option value="dateAdded">Sort by Date Added</option>
  `;
  document.querySelector('.sort').appendChild(sortSelect);

  // Event listener for sort select
  sortSelect.addEventListener('change', function() {
    const value = this.value;
    if (value === 'name') {
      sortByName();
    } else if (value === 'date') {
      sortByDatePurchased();
    } else if (value === 'dateAdded') {
      sortByDateAdded();
    }
  });

  // Function to sort products by name (A-Z)
  function sortByName() {
    const products = Array.from(document.querySelectorAll('.product-card'));
    products.sort((a, b) => {
      const nameA = a.querySelector('.product-name').textContent.trim().toLowerCase();
      const nameB = b.querySelector('.product-name').textContent.trim().toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
    productList.innerHTML = '';
    products.forEach(product => {
      productList.appendChild(product);
    });
  }

  // Function to sort products by date
  function sortByDatePurchased() {
    const products = Array.from(document.querySelectorAll('.product-card'));
    products.sort((a, b) => new Date(a.querySelector('.date-info').textContent.trim().match(/\d+/)[0]) - new Date(b.querySelector('.date-info').textContent.trim().match(/\d+/)[0]));
    productList.innerHTML = '';
    products.forEach(product => {
      productList.appendChild(product);
    });
  }
  

  function sortByDateAdded() {
    const products = Array.from(document.querySelectorAll('.product-card'));
    products.sort((a, b) => {
      const idA = parseInt(a.getAttribute('data-id'));
      const idB = parseInt(b.getAttribute('data-id'));
      return idB - idA;
    });
    productList.innerHTML = '';
    products.forEach(product => {
      productList.appendChild(product);
    });
  }


  // // Load existing products
  // sortByDatePurchased();

   loadProducts();
});

document.addEventListener('DOMContentLoaded', function() {
  // Stock status dropdown select element
  const stockStatusSelect = document.getElementById('stockStatusFilter');

  // Event listener for stock status select
  stockStatusSelect.addEventListener('change', function() {
      const selectedStockStatus = this.value;
      filterProducts(selectedStockStatus);
  });

  // Function to filter products based on selected stock status
  function filterProducts(selectedStockStatus) {
      const productCards = document.querySelectorAll('.product-card');

      productCards.forEach(card => {
          const cardStockStatus = card.querySelector('.stock-status').classList[1]; // Get stock status class
          if (!selectedStockStatus || cardStockStatus === selectedStockStatus) {
              card.style.display = 'block'; // Show product card
          } else {
              card.style.display = 'none'; // Hide product card
          }
      });


    // Adjust flexbox properties to show cards next to each other
    const productList = document.getElementById('productList');
    productList.style.display = 'flex';
    productList.style.flexWrap = 'wrap';
    productList.style.alignItems = 'flex-start'; // Adjust as needed
  }
});


// Function to scroll to the top smoothly
function scrollToTop() {
  // Scroll to top over a specific duration
  const scrollDuration = 500; // in milliseconds
  const scrollStep = -window.scrollY / (scrollDuration / 15);
  const scrollInterval = setInterval(function() {
      if (window.scrollY !== 0) {
          window.scrollBy(0, scrollStep);
      } else {
          clearInterval(scrollInterval);
      }
  }, 15);
}

// Smooth scrolling behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
          window.scrollTo({
              top: target.offsetTop,
              behavior: 'smooth'
          });
      }
  });
});

