document.addEventListener('DOMContentLoaded', function() {
  // Get all routine checkboxes except the "All" checkbox
  var routineCheckboxes = document.querySelectorAll('.options .routine input[type="checkbox"]:not(#allCheckbox)');
  // Get the "All" checkbox
  var allCheckbox = document.getElementById('allCheckbox');
  
  // Add change event listener to each routine checkbox
  routineCheckboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
      // If any routine checkbox is checked, uncheck the "All" checkbox
      if (this.checked) {
        allCheckbox.checked = false;
      }
    });
  });
  
  // Add change event listener to the "All" checkbox
  allCheckbox.addEventListener('change', function() {
    // If the "All" checkbox is checked, uncheck all other routine checkboxes
    if (this.checked) {
      routineCheckboxes.forEach(function(checkbox) {
        checkbox.checked = false;
      });
    }
  });


  const addProductButton = document.getElementById('addProductButton');
  const productPopUp = document.getElementById('productPopUp');
  const closePopup = document.querySelector('.close');
  const saveProductButton = document.getElementById('saveProductButton');
  const productList = document.getElementById('productList');

  addProductButton.addEventListener('click', function () {
    productPopUp.classList.add('active'); // Add the active class to show the popup

     productPopUp.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Disable scrolling

  });

  closePopup.addEventListener('click', function () {
    productPopUp.classList.remove('active'); // Remove the active class to hide the popup

   productPopUp.style.display = 'none';
    document.body.style.overflow = ''; // Enable scrolling

  });

  saveProductButton.addEventListener('click', function () {
    const productName = document.getElementById('productName').value;
    const productBrand = document.getElementById('productBrand').value;
    const routineSelect = document.getElementById('routineSelect').value;

    if (productName && productBrand) {
      const product = {
        name: productName,
        brand: productBrand,
        routine: routineSelect

      };

      saveProduct(product);
      displayProduct(product);

      productPopUp.style.display = 'none';
    } else {
      alert('Please enter product details.');
    }
  });

  function saveProduct(product) {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
  }

  function displayProduct(product) {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `<p>Name: ${product.name}</p><p>Brand: ${product.brand}</p><p>Routine: ${product.routine}</p>`;
    // Insert the new product card after the "Add Product" button
    addProductButton.parentElement.insertAdjacentElement('beforeend', productCard);
  }
  function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.forEach(product => {
      displayProduct(product);
    });
  }

  // Add the "Add Product" button as the first element in the product list
  productList.insertBefore(addProductButton.parentElement, productList.firstChild);

  loadProducts();
});

document.addEventListener('DOMContentLoaded', function() {
  // Get the date input element
  const datePurchasedInput = document.getElementById('datePurchased');
  
  // Get today's date in the format yyyy-mm-dd
  const today = new Date().toISOString().split('T')[0];
  
  // Set the value of the date input to today's date
  datePurchasedInput.value = today;
});

// Get all star elements
const stars = document.querySelectorAll('.rate i');

// Loop through each star
stars.forEach((star, index) => {
  // Add click event listener to each star
  star.addEventListener('click', () => {
    // Set the rating based on the index of the clicked star
    setRating(index + 1);
  });
});

// Function to set the rating
function setRating(rating) {
  // Reset all stars to default color
  stars.forEach((star, index) => {
    star.style.color = index < rating ? '#E26F6F' : '#f5c1c1';
  });
}
