
// document.addEventListener('DOMContentLoaded', function() {
//   // Stock status dropdown select element
//   const stockStatusSelect = document.getElementById('stockStatusFilter');

//   // Event listener for stock status select
//   stockStatusSelect.addEventListener('change', function() {
//       const selectedStockStatus = this.value;
//       filterProducts(selectedStockStatus);
//   });

//   // Function to filter products based on selected stock status
//   function filterProducts(selectedStockStatus) {
//       const productCards = document.querySelectorAll('.product-card');

//       productCards.forEach(card => {
//           const cardStockStatus = card.querySelector('.stock-status').classList[1]; // Get stock status class
//           if (!selectedStockStatus || cardStockStatus === selectedStockStatus) {
//               card.style.display = 'block'; // Show product card
//           } else {
//               card.style.display = 'none'; // Hide product card
//           }
//       });


//     // Adjust flexbox properties to show cards next to each other
//     const productList = document.getElementById('productList');
//     productList.style.display = 'flex';
//     productList.style.flexWrap = 'wrap';
//     productList.style.alignItems = 'flex-start'; // Adjust as needed
//   }
// });

// // Set the date purchased input to today's date by default
// document.addEventListener('DOMContentLoaded', function() {
//   const datePurchasedInput = document.getElementById('datePurchased');
//   const today = new Date().toISOString().split('T')[0];
//   datePurchasedInput.value = today;
// });


// document.addEventListener('DOMContentLoaded', function() {
//   // Get routine checkboxes including the new custom routine checkbox
//   var routineCheckboxes = document.querySelectorAll('.options .routine input[type="checkbox"]');
//   var allCheckbox = document.getElementById('allCheckbox');

//   // Add event listeners to routine checkboxes
//   routineCheckboxes.forEach(function(checkbox) {
//     checkbox.addEventListener('change', function() {
//       if (this !== allCheckbox && this.checked) {
//         allCheckbox.checked = false; // Uncheck "All" checkbox if any other checkbox is checked
//       }
//       filterProductsByRoutine(); // Trigger filtering function
//     });
//   });

//   // Add event listener to the "All" checkbox
//   allCheckbox.addEventListener('change', function() {
//     if (this.checked) {
//       // Check all other checkboxes if "All" checkbox is checked
//       routineCheckboxes.forEach(function(checkbox) {
//         checkbox.checked = true;
//       });
//     } else {
//       // Uncheck all other checkboxes if "All" checkbox is unchecked
//       routineCheckboxes.forEach(function(checkbox) {
//         if (checkbox !== allCheckbox) {
//           checkbox.checked = false;
//         }
//       });
//     }
//     filterProductsByRoutine(); // Trigger filtering function
//   });

//   // Function to filter products based on selected routines
//   function filterProductsByRoutine() {
//     const selectedRoutines = Array.from(routineCheckboxes)
//       .filter(checkbox => checkbox.checked && checkbox !== allCheckbox) // Exclude the "All" checkbox
//       .map(checkbox => checkbox.value.toLowerCase());

//     const productCards = document.querySelectorAll('.product-card');

//     productCards.forEach(card => {
//       const routine = card.dataset.routine || ''; // Ensure routine is not undefined
//       if (selectedRoutines.length === 0 || selectedRoutines.includes(routine.toLowerCase())) {
//         card.style.display = 'block'; // Show product card
//       } else {
//         card.style.display = 'none'; // Hide product card
//       }
//     });

//     const productList = document.getElementById('productList');
//     productList.style.display = 'flex';
//     productList.style.flexWrap = 'wrap';
//     productList.style.alignItems = 'flex-start';
//   }

//   // Get rating checkboxes including the new custom rating checkbox
//   var ratingCheckboxes = document.querySelectorAll('.options .rating input[type="checkbox"]');

//   // Get the "All" checkbox for rating
//   var allRatingCheckbox = document.getElementById('allRatingCheckbox');

//   // Add event listeners to rating checkboxes
//   ratingCheckboxes.forEach(function(checkbox) {
//     checkbox.addEventListener('change', function() {
//       if (this !== allRatingCheckbox && this.checked) {
//         allRatingCheckbox.checked = false; // Uncheck "All" checkbox if any other checkbox is checked
//       }
//       filterProductsByRating(); // Trigger filtering function
//     });
//   });

//   // Add event listener to the "All" checkbox for rating
//   allRatingCheckbox.addEventListener('change', function() {
//     if (this.checked) {
//       // Check all other checkboxes if "All" checkbox is checked
//       ratingCheckboxes.forEach(function(checkbox) {
//         checkbox.checked = true;
//       });
//     } else {
//       // Uncheck all other checkboxes if "All" checkbox is unchecked
//       ratingCheckboxes.forEach(function(checkbox) {
//         if (checkbox !== allRatingCheckbox) {
//           checkbox.checked = false;
//         }
//       });
//     }
//     filterProductsByRating(); // Trigger filtering function
//   });

//   // Function to filter products based on selected rating
//   function filterProductsByRating() {
//     const selectedRatings = Array.from(ratingCheckboxes)
//       .filter(checkbox => checkbox.checked && checkbox !== allRatingCheckbox) // Exclude the "All" checkbox
//       .map(checkbox => parseInt(checkbox.value)); // Map the value to integers

//     const productCards = document.querySelectorAll('.product-card');

//     productCards.forEach(card => {
//       const rating = parseInt(card.querySelector('.rating-image').alt.match(/\d+/)[0]); // Extract rating from alt text
//       if (selectedRatings.length === 0 || selectedRatings.includes(rating)) {
//         card.style.display = 'block'; // Show product card
//       } else {
//         card.style.display = 'none'; // Hide product card
//       }
//     });

//     const productList = document.getElementById('productList');
//     productList.style.display = 'flex';
//     productList.style.flexWrap = 'wrap';
//     productList.style.alignItems = 'flex-start';
//   }
// });


// document.addEventListener('DOMContentLoaded', function() {
//   // Your existing code...

//   const sortSelect = document.createElement('select');
//   sortSelect.innerHTML = `
//     <option value="date">Sort by Earliest Purchase</option>
//     <option value="latestDate">Sort by Latest Purchase</option>
//     <option value="name">Sort by A-Z</option>
//     <option value="dateAdded">Sort by Date Added</option>
//   `;
//   document.querySelector('.sort').appendChild(sortSelect);


//    // Event listener for sort select
//    sortSelect.addEventListener('change', function() {
//     const value = this.value;
//     if (value === 'name') {
//       sortByName();
//     } else if (value === 'date') {
//       sortByDatePurchased();
//     } else if (value === 'latestDate') {
//       sortByLatestDate();
//     } else if (value === 'dateAdded') {
//       sortByDateAdded();
//     }
//   });

//   // Function to sort products by name (A-Z)
//   function sortByName() {
//     const products = Array.from(document.querySelectorAll('.product-card'));
//     products.sort((a, b) => {
//       const nameA = a.querySelector('.product-name').textContent.trim().toLowerCase();
//       const nameB = b.querySelector('.product-name').textContent.trim().toLowerCase();
//       if (nameA < nameB) return -1;
//       if (nameA > nameB) return 1;
//       return 0;
//     });
//     productList.innerHTML = '';
//     products.forEach(product => {
//       productList.appendChild(product);
//     });
//   }
//   function sortByLatestDate() {
//     const products = Array.from(document.querySelectorAll('.product-card'));
//     products.sort((a, b) => new Date(a.querySelector('.date-info').textContent.trim().match(/\d+/)[0]) - new Date(b.querySelector('.date-info').textContent.trim().match(/\d+/)[0]));
//     productList.innerHTML = '';
//     products.forEach(product => {
//       productList.appendChild(product);
//     });
// }

//   // Function to sort products by date
//   function sortByDatePurchased() {
//     const products = Array.from(document.querySelectorAll('.product-card'));
//     products.sort((a, b) => new Date(b.querySelector('.date-info').textContent.trim().match(/\d+/)[0]) - new Date(a.querySelector('.date-info').textContent.trim().match(/\d+/)[0]));
//     productList.innerHTML = '';
//     products.forEach(product => {
//         productList.appendChild(product);
//     });

//   }
  

//   function sortByDateAdded() {
//     const products = Array.from(document.querySelectorAll('.product-card'));
//     products.sort((a, b) => {
//       const idA = parseInt(a.getAttribute('data-id'));
//       const idB = parseInt(b.getAttribute('data-id'));
//       return idB - idA;
//     });
//     productList.innerHTML = '';
//     products.forEach(product => {
//       productList.appendChild(product);
//     });
//   }


//   // // Load existing products
//   // sortByDatePurchased();
// });