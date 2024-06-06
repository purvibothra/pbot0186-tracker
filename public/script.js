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

  const categoryTextMap = {
    "cleanser": "Cleanser",
    "exfoliator": "Exfoliator",
    "eye-cream": "Eye Cream",
    "face-mask": "Face Mask",
    "face-oil": "Face Oil",
    "makeup-remover": "Makeup Remover",
    "moisturiser": "Moisturiser",
    "serum": "Serum",
    "sheet-mask": "Sheet Mask",
    "spot-treatment": "Spot Treatment",
    "sunscreen": "Sunscreen",
    "toner": "Toner"
  };

  const routineTextMap = {
    'morning': 'Morning Routine',
    'night': 'Night Routine',
    'morning-night': 'Morning and Night Routine',
    'once-week': 'Used Once a Week',
    '2-3-times': 'Used 2-3 Times a week',
    'Occasional': 'Occasional Use'
  };
  

  const ratingImageMap = {
    0: "assets/0-star.png",
    1: "assets/1-star.png",
    2: "assets/2-stars.png",
    3: "assets/3-stars.png",
    4: "assets/4-stars.png",
    5: "assets/5-stars.png"
  };
  
  // Get the input element


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
  const costInput = document.getElementById('cost');
  const datePurchasedInput = document.getElementById('datePurchased');
  const today = new Date().toISOString().split('T')[0];
  datePurchasedInput.value = today;

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

    // Function to set the form fields with the product details
    function setFormFields(product) {
      document.getElementById('productName').value = product.name;
      document.getElementById('productBrand').value = product.brand;
      document.getElementById('productLink').value = product.link;
      document.getElementById('routineSelect').value = product.routine;
      document.getElementById('stockStatus').value = product.status;
      document.getElementById('productCategory').value = product.productCategory; // Ensure correct field name
      document.getElementById('cost').value = product.cost;
      document.getElementById('datePurchased').value = product.datePurchased;
      document.getElementById('comments').value = product.comments;
      productImage.src = product.productImageSrc;
      productImage.alt = product.name;
      setRating(product.rating);
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
    const productLink = document.getElementById('productLink').value;
    const datePurchased = document.getElementById('datePurchased').value; // Ensure date is read
    const routineSelect = document.getElementById('routineSelect').value; // Get selected routine
    const stockStatus = document.getElementById('stockStatus').value;
    const rating = getRating(); // Retrieve star rating
    const cost = document.getElementById('cost').value;
    const productCategory = document.getElementById('productCategory').value;
    const comments = document.getElementById('comments').value;
    const productImageSrc = productImage.src; // Correct way to retrieve product image src

    // Validate product details
    if (productName && productBrand) {
      const product = {
        id: Date.now(),
        name: productName,
        brand: productBrand,
        link: productLink,
        datePurchased: datePurchased, // Ensure date is saved
        status: stockStatus,
        rating: rating, // Include star rating in the product object
        routine: routineSelect || '', // Include selected routine in the product object
        cost: cost,
        comments: comments,
        productCategory: productCategory,
        productImageSrc: productImageSrc // Include product image source
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


  // Save product to local storage
  function saveProduct(product) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    const productIndex = products.findIndex(p => p.id === product.id);
  
    if (productIndex > -1) {
      products[productIndex] = product;
    } else {
      products.unshift(product); // Add the new product to the start of the array
    }
  
    products.sort((a, b) => new Date(b.datePurchased) - new Date(a.datePurchased)); // Sort the products based on datePurchased
    localStorage.setItem('products', JSON.stringify(products)); // Update the local storage with the sorted products
  }





      // Event listener to handle editing product details
function editProduct(productId) {
  let products = JSON.parse(localStorage.getItem('products')) || [];
  const product = products.find(p => p.id === productId);

  if (product) {
    setFormFields(product);
    productPopUp.classList.add('active');
    productPopUp.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
}
    
  // Calculate days since purchase
  function calculateDaysSincePurchase(purchaseDate) {
    const today = new Date();
    const purchase = new Date(purchaseDate);
    const timeDifference = today - purchase;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
  }



  // Display product card
  function displayProduct(product) {
    const stockText = stockTextMap[product.status] || product.status;
    const productImageSrc = productImageMap[product.name] || "assets/product-images/placeholder-skincare.png";
    const ratingImageSrc = ratingImageMap[product.rating] || ratingImageMap[0]; // Default to 0 rating image if undefined
    const routineText = routineTextMap[product.routine] || product.routine; // Map the routine value


    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.setAttribute('data-id', product.id);
    productCard.setAttribute('data-routine', product.routine || ''); // Use original routine value
    productCard.setAttribute('data-category', product.productCategory  || '');
    productCard.setAttribute('data-cost', product.cost  || '');
    productCard.setAttribute('data-comments', product.comments  || '');
    productCard.setAttribute('data-link', product.link || '');


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

    productList.insertBefore(productCard, productList.firstChild); // Prepend the product card to the start of the product list

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

  loadProducts();

// Get the close button and the popup elements
const closeButton2 = document.getElementById('close-button2');
const productInfoPopup = document.getElementById('productInfoPopup');
const productInfoImage = document.getElementById('productInfoImage'); // Product info popup image

// Add event listener to the close button
closeButton2.addEventListener('click', function() {
  productInfoPopup.classList.remove('active');
  productInfoPopup.style.display = 'none';
  document.body.style.overflow = ''; // Re-enable body scroll if it was disabled
});

// Function to close product info popup
function closeProductInfoPopup() {
  productInfoPopup.classList.remove('active');
  productInfoPopup.style.display = 'none';
  document.body.style.overflow = '';
}

// Function to display product information in the popup
function displayProductInfo(product) {
  document.getElementById('productNameText').textContent = product.name;
  productInfoImage.src = product.productImageSrc; // Update the product info popup image
  productInfoImage.alt = product.name; // Update the alt text
  document.getElementById('productBrandText').textContent = product.brand;
  document.getElementById('productRatingImage').src = product.ratingImageSrc;
  document.getElementById('productRatingImage').alt = `Rating: ${product.rating}`;
  const restockDateElement = document.getElementById('productRestockDate');
  restockDateElement.textContent = `Last Restocked ${product.daysSincePurchase} days ago`;
  restockDateElement.classList.add('date-popup'); // Add extra class for styling  
  const stockStatus = document.getElementById('productStockStatus');
  stockStatus.className = `stock-status ${product.status} common-stock-status`;
  stockStatus.textContent = product.stockText;

    // Additional product details
    document.getElementById('productRoutine').textContent = `${product.routine}`;
    document.getElementById('productRoutine').classList.add('routine-popup');
    document.getElementById('productCategory-text').textContent = categoryTextMap[product.category];
    document.getElementById('productCost').textContent = `${product.cost}`;
    document.getElementById('productCost').classList.add('cost-popup');
    document.getElementById('productComments').textContent = `Comments: ${product.comments}`;
    document.getElementById('productComments').classList.add('comments-popup');
    document.getElementById('productLink-text').textContent = `${product.link}`;

    const productLink = document.getElementById('productLink-text');
    if (product.link) {
      productLink.innerHTML = `<a href="${product.link}" target="_blank">Product Link</a>`;
    } else {
      productLink.textContent = ''; // Clear the content if the link is empty
    }
      // Check if product link is available


    }

// Function to open the product info popup
function openProductInfoPopup(product) {
  displayProductInfo(product);
  productInfoPopup.classList.add('active');
  productInfoPopup.style.display = 'block';
  document.body.style.overflow = 'hidden'; // Disable body scroll when popup is active
}

productList.addEventListener('click', function(event) {
  const card = event.target.closest('.product-card');
  if (!card) return; // If the click is not on a product card, do nothing

  const commentsElement = card.querySelector('.comments');
  const product = {
    productImageSrc: card.querySelector('.product-image').src,
    name: card.querySelector('.product-name').textContent.trim(),
    brand: card.querySelector('.product-brand').textContent.trim(),
    ratingImageSrc: card.querySelector('.rating-image').src,
    rating: card.querySelector('.rating-image').alt.match(/\d+/)[0], // Assuming rating is a number
    daysSincePurchase: card.querySelector('.date-info').textContent.match(/\d+/)[0],
    status: card.querySelector('.stock-status').classList[1], // Extract the second class name as status
    stockText: card.querySelector('.stock-status').textContent.trim(),
    routine: routineTextMap[card.dataset.routine] || card.dataset.routine, // Use mapped routine text
    category: card.dataset.category, // Access data-category attribute
    cost: card.dataset.cost, // Access data-cost attribute
    comments: card.dataset.comments, // Access data-comments attribute
    link: card.dataset.link
  };


  openProductInfoPopup(product);
});

// Add event listener to the "Edit" button
const editProductButton = document.getElementById('editProductButton');
editProductButton.addEventListener('click', function() {
  const productName = document.getElementById('productNameText').textContent;
  let products = JSON.parse(localStorage.getItem('products')) || [];
  const product = products.find(p => p.name === productName);

  if (product) {
    setFormFields(product);
    closeProductInfoPopup(); // Close the product info popup
    productPopUp.classList.add('active');
    productPopUp.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
});


const sortSelect = document.createElement('select');
sortSelect.innerHTML = `
  <option value="date">Sort by Earliest Purchase</option>
  <option value="latestDate">Sort by Latest Purchase</option>
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
  } else if (value === 'latestDate') {
    sortByLatestDate();
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
function sortByLatestDate() {
  const products = Array.from(document.querySelectorAll('.product-card'));
  products.sort((a, b) => new Date(a.querySelector('.date-info').textContent.trim().match(/\d+/)[0]) - new Date(b.querySelector('.date-info').textContent.trim().match(/\d+/)[0]));
  productList.innerHTML = '';
  products.forEach(product => {
    productList.appendChild(product);
  });
}

// Function to sort products by date
function sortByDatePurchased() {
  const products = Array.from(document.querySelectorAll('.product-card'));
  products.sort((a, b) => new Date(b.querySelector('.date-info').textContent.trim().match(/\d+/)[0]) - new Date(a.querySelector('.date-info').textContent.trim().match(/\d+/)[0]));
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

  // Get routine checkboxes including the new custom routine checkbox
  var routineCheckboxes = document.querySelectorAll('.options .routine input[type="checkbox"]');
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

  // Get rating checkboxes including the new custom rating checkbox
  var ratingCheckboxes = document.querySelectorAll('.options .rating input[type="checkbox"]');
  var allRatingCheckbox = document.getElementById('allRatingCheckbox');

  // Add event listeners to rating checkboxes
  ratingCheckboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
      if (this !== allRatingCheckbox && this.checked) {
        allRatingCheckbox.checked = false; // Uncheck "All" checkbox if any other checkbox is checked
      }
      filterProductsByRating(); // Trigger filtering function
    });
  });

  // Add event listener to the "All" checkbox for rating
  allRatingCheckbox.addEventListener('change', function() {
    if (this.checked) {
      // Check all other checkboxes if "All" checkbox is checked
      ratingCheckboxes.forEach(function(checkbox) {
        checkbox.checked = true;
      });
    } else {
      // Uncheck all other checkboxes if "All" checkbox is unchecked
      ratingCheckboxes.forEach(function(checkbox) {
        if (checkbox !== allRatingCheckbox) {
          checkbox.checked = false;
        }
      });
    }
    filterProductsByRating(); // Trigger filtering function
  });

  // Function to filter products based on selected rating
  function filterProductsByRating() {
    const selectedRatings = Array.from(ratingCheckboxes)
      .filter(checkbox => checkbox.checked && checkbox !== allRatingCheckbox) // Exclude the "All" checkbox
      .map(checkbox => parseInt(checkbox.value)); // Map the value to integers

    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
      const rating = parseInt(card.querySelector('.rating-image').alt.match(/\d+/)[0]); // Extract rating from alt text
      if (selectedRatings.length === 0 || selectedRatings.includes(rating)) {
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


  
//Ends here
});

// Function to handle dropdown change events and filter products
function handleDropdownChange(dropdownId, filterFunction) {
  const dropdown = document.getElementById(dropdownId);
  dropdown.addEventListener('change', function() {
    filterFunction(dropdown.value); // Trigger filtering function with selected value
  });
}

// Function to filter products based on selected rating
function filterProductsByRating(selectedRating) {
  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach(card => {
    const rating = parseInt(card.querySelector('.rating-image').alt.match(/\d+/)[0]); // Extract rating from alt text
    if (selectedRating === 'all' || rating === parseInt(selectedRating)) {
      card.style.display = 'block'; // Show product card
    } else {
      card.style.display = 'none'; // Hide product card
    }
  });

  updateProductListDisplay(); // Update product list display
}

// Function to filter products based on selected routine
function filterProductsByRoutine(selectedRoutine) {
  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach(card => {
    const routine = card.dataset.routine; // Get routine value from data attribute
    if (selectedRoutine === 'all' || routine === selectedRoutine) {
      card.style.display = 'block'; // Show product card
    } else {
      card.style.display = 'none'; // Hide product card
    }
  });

  updateProductListDisplay(); // Update product list display
}

// Function to update product list display
function updateProductListDisplay() {
  const productList = document.getElementById('productList');
  productList.style.display = 'flex';
  productList.style.flexWrap = 'no-wrap';
  productList.style.alignItems = 'flex-start';
}

// Call handleDropdownChange function for rating dropdown
handleDropdownChange('ratingDropdown', filterProductsByRating);
// Call handleDropdownChange function for routine dropdown
handleDropdownChange('routineDropdown', filterProductsByRoutine);



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

