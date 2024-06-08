
//Sort inspo: from week 5 tutorial https://canvas.sydney.edu.au/courses/56508/pages/week-5-content?module_item_id=2244487

// Using the DOMContentLoaded event listener so the code only runs when the HTML document has fully loaded, so that all HTML
// elements (including existing product cards and skincare dashboard data) are availale to be manipulated by JS. This can help
// prevent errors in the code in case the web-app has not fully loaded yet.  
document.addEventListener('DOMContentLoaded', function() {

  // Declaring local constants in the DOMContentLoaded event listener to be accessible anywhere in the functions within this
  // listener. I'm retrieving the HTML elements by either their specific ID (getElementById) or by class (querySelector or
  // querySelectorAll) to be manipulated later in the JS according to their function. I referred to Tutorial Activity 
  // 4 from Canvas. Week 4 Content: Advanced Web Design. (n.d.). Retrieved from https://canvas.sydney.edu.au/courses/56508/pages/week-4-content?module_item_id=2244482

const productPopUp = document.getElementById('productPopUp'); // Retrieving pop-up input form for new product
const productNameInput = document.getElementById('productName'); // Retrieving product name form input
const productImage = document.getElementById('productImage'); // Retrieving product image form element
const productBrand = document.getElementById('productBrand'); // Retrieving product brand form input
const addProductButton = document.getElementById('addProductButton');  // Retrieving add product button
const closePopup = document.querySelector('.close'); // Retrieving pop-up close button
const saveProductButton = document.getElementById('saveProductButton'); // Retrieving button to save new product to tracker
const productList = document.getElementById('productList');  // Retrieving container to showcase all skincare products
const stars = document.querySelectorAll('.rate i'); // Retrieving classes for star rating
const costInput = document.getElementById('cost'); // Retrieving product cost input for star rating
const datePurchasedInput = document.getElementById('datePurchased'); // Retrieving product purchase date input
const closeButton2 = document.getElementById('close-button2'); // Retrieving second pop-up close button
const productInfoPopup = document.getElementById('productInfoPopup'); // Retrieving pop-up for existing product information
const productInfoImage = document.getElementById('productInfoImage'); // Product product image for existing products
const editProductButton = document.getElementById('editProductButton');  // Product edit product button
const sortSelect = document.createElement('select');  // Declaring constant variable and assigning to new HTML drop-down select element
const routineCheckboxes = document.querySelectorAll('.options .routine input[type="checkbox"]'); // Retrieving all routine checkboxes including the new custom routine checkbox
const allRoutineCheckbox = document.getElementById('allCheckbox'); // Retrieving the 'all' checkbox option
const ratingCheckboxes = document.querySelectorAll('.options .rating input[type="checkbox"]'); // Retrieving all rating checkboxes including the new custom rating checkbox
const allRatingCheckbox = document.getElementById('allRatingCheckbox'); // Retrieving the 'all' checkbox option for rating
const stockStatusSelect = document.getElementById('stockStatusFilter'); // Retrieving the Stock status dropdown select element

// Creating a new Date object representing the current date and time. This converts the date to an ISO string format and splits it at the 'T' character
// The 'T' character separates the date and time parts of the ISO string. The first part (the date) is in the format 'YYYY-MM-DD'. This is so that when
// the user goes to add a new skincare product to their tracker, the default for date purchased is set to today's date (assuming they track the day they
// bought a product to minimise action. This can also be edited to the correct date.)

// I referred to w3Schools (n.d.) on how to use the Date toISOString() method on setting the purchase date to the current date. A function further down
// in the code handles the functionality of this.
const today = new Date().toISOString().split('T')[0]; 
datePurchasedInput.value = today; //Sets the value of the datePurchasedInput element to today's date. This populates the input field with the current date in 'YYYY-MM-DD' format

// Default/test values for the skincare tracker. Each product name is mapped to its respective image and brand. Realistically, the images would be
// retrieved fro the thumbnail of the product link that the user provides in the "URL" input field, however for the purposes of this small-scale
// web-app, 13 default values are provided as examples.
const productImageMap = {  // Map of product names to their respective image paths
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

const productBrandMap = { // Map of product names to their respective brands
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

const stockTextMap = { // Map of stock status option values to their respective text labels. This is more
  // legible and matches real world conventions.
  "wishlist": "Wishlist",
  "in-stock": "In Stock",
  "running-out": "Running Out",
  "restock": "Restock",
  "finished": "Finished",
  "not-using": "No Longer Using"
};

const categoryTextMap = { // Similarly matching the product category values to their respective text labels for readability
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

const routineTextMap = { // Similarly matching the skincare routine category values to their respective text labels. This is specifically
  // used for the pop-up when users click into existing skincare product cards.
  'morning': 'Morning Routine',
  'night': 'Night Routine',
  'morning-night': 'Morning and Night Routine',
  'once-week': 'Used Once a Week',
  '2-3-times': 'Used 2-3 Times a week',
  'Occasional': 'Occasional Use'
};


const ratingImageMap = { // This constant maps the index of the user's rating (out of 5) for a skincare product to an image that visualises this
  // numerical value as an image of 0-5 stars filled/unfilled for easier mapping and memorability on the product card, rather than just using numbers. 
  // I wasn't sure how to only include the star rating values on the product card (that the user uses to rate the product on the input form), so
  // I decided to design similar images for each star rating on Figma to map and show on the product card.
  0: "assets/0-star.png",
  1: "assets/1-star.png",
  2: "assets/2-stars.png",
  3: "assets/3-stars.png",
  4: "assets/4-stars.png",
  5: "assets/5-stars.png"
};


// This function adds an event listener for the 'input' event on the product cost field. It manipulates this value by the user by
// only accepting numerical values, and turns the numerical value input by the user into a string that includes $ for formatting.
// To learn how to do this, I referred to W3Schools (n.d.). for the startsWith() String method and ChatGPT to clean up the code (OpenAI, 2024)
// W3Schools. (n.d.).JavaScript String startsWith() Method. Retrieved from https://www.w3schools.com/jsref/jsref_startswith.asp
costInput.addEventListener('input', function() {
  let value = this.value.trim();   // Get the current value of the input and trim any leading/trailing spaces in the value that is unnecessary
  value = value.replace(/[^0-9.]/g, '');   // Removes any characters that are not 0-9 (numerical) except for the period (.). This shows the user the cost field is for numbers only.
  if (value !== '' && !value.startsWith('$')) {  
   value = '$' + value;  // Adds a $ sign to the beginning of the value if it's not empty and not already prefixed with $. This adds value to ths input so users associate it with the product cost which may impact the rating. 
  }
  this.value = value;   // Updates the input value with the formatted value real-time
});

// Function to visually set the rating of stars based on the provided rating in the product input form. This updates the star rating to reflect the user's
// product rating.
function setRating(rating) {
  stars.forEach((star, index) => {  // Loop iterates over each star element using the forEach element, referred to W3Schools. Source: W3Schools. (n.d.). JavaScript Array forEach() Method. Retrieved from https://www.w3schools.com/jsref/jsref_foreach.asp
    if (index < rating) {  // If the star's index is less than the rating, set its color to indicate it is filled. This determines if the star should be considered "filled" based on its position relative to the given rating. (i.e. if rating is 3, all stars preceding 3 including the 3rd star will be filled)
      star.style.color = 'rgb(226, 111, 111'; // Changes colour from light pink (unfilled) to dark reddish pink for filled stars. I wasn't sure how to use colour in a conditional if/else statement, so I researched and referred to W3Schools. Source: W3Schools. (n.d.). HTML DOM Style color Property. Retrieved from https://www.w3schools.com/jsref/prop_style_color.asp
    } else {
      star.style.color = ''; // Otherwise, resets the star's colour to indicate it is unfilled (default is light pink set in CSS)
    }
  });
}

// As the previous function sets the rating, the getRating() function retrieves this data of the star rating to be stored later on the product card if the user adds this
// new product to their tracker list.
function getRating() {
  let rating = 0;   // Initial/default rating is set to 0 when the user first clicks ot add a new product (shows no rating has been made yet)
  stars.forEach((star, index) => {   // Similarly iterates over each star element
    if (star.style.color === 'rgb(226, 111, 111)') { // Checks if the star is filled by comparing its colour
      rating = index + 1; // If filled, updates the rating to the current index + 1 (1-indexed)
    }
  });
  return rating;   // Returns the star rating value. This is significant for this data to be locally stored later on, in the skincare product card where the rating index is mapped to the star rating image. 
}

// The following functions control and manipulate the counter elements on the skincare dashboard, so the numbers update depending on the
// number of skincare products (including restock products) in the user's skincare tracker as an efficient way to reflect on their current
// routine, products and needs for restocking.
// This function updates the counter for the total number of products in the user's tracker. It should update immediately once the user
// adds or deletes a product.
function updateProductCounter() {
  const productCounter = document.getElementById('productCounter'); // Retrieves the product counter h3 text element to manipulate
  const productCards = document.querySelectorAll('.product-card'); // Retrieves all elements with the product-card class (skincare product cards) that are in the product list array
  productCounter.textContent = productCards.length; // Makes the product counter text equal to the length of the productCards array (number of cards [products] in product list)
}

// Function below similarly updates and records the number of skincare products, but only those who were added with the "restock" stock status
function updateRestockCounter() {
  const restockCounter = document.getElementById('restockCounter'); // Retrieves the restock product counter h3 text element 
  const productCards = document.querySelectorAll('.product-card'); // Also retrieves productCards array (all cards have the product-card class)
  let restockCount = 0; // Initialising with 0 as default
  productCards.forEach(card => { // Loop that iterates though every product object (skincare product card) in the productCards array to check its stock status value
    const stockStatus = card.querySelector('.stock-status').classList[1]; // Constant that retrieves the stock status class
    if (stockStatus === 'restock') {
      restockCount++; // If a product card is saved with the 'restock' option, the restock count will increase by 1
    }
  });
  restockCounter.textContent = restockCount; // Updates overall restock counter to the number of skincare products with 'restock' when the user adds or deletes a product from the tracker
}

// Resetting form to its default state. This ensures that everytime a user goes to add a new skincare product,
// all fields will be set to unfilled (empty strings for text input), the purchase date default will be set
// to 'today's' date (today is the day the user goes to add the new product information), and the product
// image is set to a default skincare product (none of the test values). The rating is also set to 0 (unfilled).
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
  productImage.alt = 'Skincare product';
  setRating(0);
}

// This function populates the skincare product form with data/properties from the
// 'product' object. This occurs when the user clicks "edit" on an EXISTING skincare
// product if they want to add comments, update the stock status or rating etc
// if they want to, after they added it. I adapted the code from above but instead of
// empty strings, it would be the skincare product's data.
function setFormFields(product) {
  document.getElementById('productName').value = product.name; // populating the productName text field with the product name value, etc
  document.getElementById('productBrand').value = product.brand;
  document.getElementById('productLink').value = product.link;
  document.getElementById('routineSelect').value = product.routine;
  document.getElementById('stockStatus').value = product.status;
  document.getElementById('productCategory').value = product.productCategory; 
  document.getElementById('cost').value = product.cost;
  document.getElementById('datePurchased').value = product.datePurchased;
  document.getElementById('comments').value = product.comments;
  productImage.src = product.productImageSrc; // Setting image to the product image
  productImage.alt = product.name;
  setRating(product.rating); // Setting the form rating to the rating provided by user
}

// This function loads skincare product data from the browser's local storage,
// sorts it by the date purchased in descending order, and then displays each product on the webpage
// in the skincare tracker container. 
// I referred to the tutorial activity completed in class on how to use localStorage to save
// product information from the Week 10. 
// Week 10 Content: Advanced Web Design. (n.d.). Retrieved from https://canvas.sydney.edu.au/courses/56508/pages/week-10-content
function loadProducts() {
  const products = JSON.parse(localStorage.getItem('products')) || [];
  products.sort((a, b) => new Date(b.datePurchased) - new Date(a.datePurchased)); // I wasn't sure how to sort the products on load by the date purchased with earlier (older) products first, so I
  // used ChatGPT to create a formula for this. Prompt: "How to sort products by date purchased, with earlier purchased products first". (OpenAI, 2024).
  products.forEach(product => { // iterates over each skincare product in the sorted 'products' array to:
    displayProduct(product); // Calls function to display the product cards in the skincare tracker list on load
    updateProductCounter(); // Calls the function to update the number of skincare products in the product array on load
    updateRestockCounter(); // Calls the function to update the number of skincare products that need restocking in user's list on load
  });
}

// This function updates the product image and brand based on the product name input. This name input is dependent (for the purposes
// of the web app demonstartion) on the test values provided in the productImageMap and productBrandMap constants. Because it reacts
// to the value input in the product name field, an event listener is added to this input field to update the brand and image field
// if it matches to one of the test values. 
// Realistically, if used wide-scale, the image and brand name would be autofilled from the product link instead of the product name.
productNameInput.addEventListener('input', function() { // Adds an event listener to the productNameInput element that listens for the user's input in the product name field
  const productName = productNameInput.value; // Retrieves the current value of the productNameInput element (input by user)
  if (productImageMap[productName]) { // Checks if there is an image URL in the productImageMap for the current product name
    productImage.src = productImageMap[productName]; // If yes, updates the productImage's src attribute to the corresponding URL image path
    productImage.alt = productName; // Also updates the productImage's alt attribute to the current product's name
  } else { // If there is no image URL for the current product name
    productImage.src = "assets/product-images/placeholder-skincare.png"; // Sets the productImage's src attribute to a placeholder image URL
    productImage.alt = "Product Image Placeholder"; // Sets the productImage's alt attribute to "Product Image Placeholder"
  }
  if (productBrandMap[productName]) { // Checks if there is a brand name in the productBrandMap for the current product name
    productBrand.value = productBrandMap[productName]; // If yes, updates the productBrand input field's value to the corresponding brand name
  } else { // If there is no brand name for the current product name, it clears the productBrand input field (remains empty for user's input)
    productBrand.value = '';
  }
});

// This function is triggered when the "Add Product" button is clicked. It prepares and displays the form for adding a new skincare product
// for the user to track through a modal window pop-up. I referred to W3Schools (n.d.) to understand how to use the addEventListener DOM element.
// source: W3Schools. (n.d.). HTML DOM Element addEventListener() Method. Retrieved from https://www.w3schools.com/jsref/met_element_addeventlistener.asp
addProductButton.addEventListener('click', function () { // Adds an event listener to the add product button (addProductButton element) that listens for the user's click
  resetForm(); // Calls the resetForm function to clear any existing data and reset the form to its default state
  productPopUp.classList.add('active'); // Adds the 'active' class to the productPopUp form element to mark it as active (for CSS styling)
  productPopUp.style.display = 'block'; // Sets the display style of the productPopUp element to 'block' to make it visible
  document.body.style.overflow = 'hidden'; // Disables scrolling on the body element to focus user attention on the popup
  const stars = document.querySelectorAll('.rate i'); // Selects all the star rating elements within the '.rate' container
  stars.forEach((star, index) => { // Iterates over each star element
    star.addEventListener('click', () => { // Adds a click event listener to each star element for the user's input
      setRating(index + 1); // Calls the setRating function with the star's index (adds 1) to set the rating based on the clicked star
    });
  });
});

// Function to close the pop-up which is called when the close button is clicked
closePopup.addEventListener('click', function () {
  productPopUp.classList.remove('active'); // Removes the active class to remove the popup from user's screen
  productPopUp.style.display = 'none'; // Does not display pop-up form
  document.body.style.overflow = ''; // Allows user to scroll again
  resetForm(); // Form is reset to all fields empty when closed (and a skincare product is not added or edited)
});

// Function to save new skincare product details. This function is triggered when the "Save Product" button is clicked. It collects product details from the form, 
// validates them, and saves the product if the required details are provided. The only required details are the product name and brand (as this would be the
// most important information for future reference) and the other fields are optional , additional product information the user can use to organise. 
saveProductButton.addEventListener('click', function () { // Adds an event listener to the saveProductButton element that listens for the user to click the 'add' (save) buttn on the input form
  const productName = productNameInput.value; // Retrieves the value of the product name input field
  const productBrand = document.getElementById('productBrand').value; // Retrieves the value of the product brand input field
  const productLink = document.getElementById('productLink').value; // Retrieves the value of the product link input field
  const datePurchased = document.getElementById('datePurchased').value; // Retrieves the value of the date purchased input field
  const routineSelect = document.getElementById('routineSelect').value; // Retrieves the selection in the routine select input field
  const stockStatus = document.getElementById('stockStatus').value; // Retrieves the selection in the stock status input field
  const rating = getRating(); // Retrieves the current star rating using the getRating function
  const cost = document.getElementById('cost').value; // Retrieves the value of the cost input field
  const productCategory = document.getElementById('productCategory').value; // Retrieves the selection in the product category input field
  const comments = document.getElementById('comments').value; // Retrieves the value of the comments input field
  const productImageSrc = productImage.src; // Retrieves the source URL (image path) of the product image

// Validates product details if product name and brand (most significant data input values) are filled
  if (productName && productBrand) { // Checks if these values are not empty
    const product = { // Creates a product object with the provided details
      id: Date.now(), // Assigns a unique ID to the product using the current timestamp to save storage for each individual skincare product
      name: productName, // Assigns the product name
      brand: productBrand, // Assigns the product brand
      link: productLink, // Assigns the product link
      datePurchased: datePurchased, // Assigns the date purchased
      status: stockStatus, // Assigns the stock status
      rating: rating, // Assigns the star rating
      routine: routineSelect || '', // Assigns the routine, or an empty string if not provided
      cost: cost, // Assigns the cost
      comments: comments, // Assigns the comments
      productCategory: productCategory, // Assigns the product category
      productImageSrc: productImageSrc // Assigns the product image source
    };

  saveProduct(product); // Saves the product using the saveProduct function
  displayProduct(product); // Displays the product in the skincare tracker container using the displayProduct function
  updateProductCounter(); // Updates the product counter using the updateProductCounter function
  updateRestockCounter(); // Updates the restock counter using the updateRestockCounter function
  resetForm(); // Resets the form to its default state
  productPopUp.style.display = 'none'; // Hides the product popup when the user clicks add product
  document.body.style.overflow = ''; // Re-enables scrolling on the body element when the pop-up is closed
  } else { // If the product name or brand is empty
  alert('Please enter product details.'); // Shows an alert to the user's device to enter product details otherwise product won't be added to their tracker
  }
});

// This function saved the newly added skincare product to local storage, so it remains saved to the user's skinare tracker list for each visit per device
function saveProduct(product) {
  let products = JSON.parse(localStorage.getItem('products')) || []; // Retrieves the products array from local storage, or initialises it as an empty array if it doesn't exist. I adapted this code form loadProducts function. 
  const productIndex = products.findIndex(p => p.id === product.id); // This finds the index of the product with the same id as the one being saved. I used ChatGPT to see how an existing product's information can be edited using the unique ID (OpenAI, 2024).
  if (productIndex > -1) {  // If/else statement checks if the product already exists in the array
      products[productIndex] = product;  // If it exists, it updates the existing product with the new data edited by the user
  } else {   // If it doesn't exist, adds the new product to the start of the array (so at first, users can easily see products they just added. It is then refreshed on load or using the sort options)
    products.unshift(product); // Uisng unshift to move newly added products initially to the start of the products card array, but this is refreshed to follow the default sort on load.
  }
  products.sort((a, b) => new Date(b.datePurchased) - new Date(a.datePurchased)); // Sorts the products array based on the datePurchased property, with the most recent first on load. I included this code written in the loadProducts() function.
  localStorage.setItem('products', JSON.stringify(products)); // Saves the updated and sorted products array back to local storage. I asked ChatGPT to clean the function and it included this code
// using stringify() to save the products array. 
}

// This function handle sthe process of editing an existing skincare product's details. It retrieves the product details from local storage 
// based on the given product ID, populates the form fields with these details (same input when the user first added a product), and displays the 
// form in the pop-up for editing. I used and adapted the above code to write the following as the functionalities are similar.
function editProduct(productId) {
  let products = JSON.parse(localStorage.getItem('products')) || []; // Similarly as above, retrieves the products array from local storage or initialises an empty array
  const product = products.find(p => p.id === productId); // Finds the product in the array with the matching productId
  if (product) {   // Checks if the product was found
    setFormFields(product);   // Populates the form fields with the product details if exists
    productPopUp.classList.add('active');   // Adds the 'active' class to the product popup to mark it as active so CSS styles for pop-up form can be applied
    productPopUp.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
}

// This function removes (deletes) a skincare product from local storage and the DOM based on the given product ID, then updates the product and restock counters to account for the removed product.
// This code is adapted from the save and edit product functions above.
function deleteProduct(productId) {
  let products = JSON.parse(localStorage.getItem('products')) || [];  
  products = products.filter(product => product.id !== productId);   // Filters out the product with the matching ID
  localStorage.setItem('products', JSON.stringify(products));   // Updates the local storage with the remaining products
  const productCard = document.querySelector(`.product-card[data-id="${productId}"]`); // Selects the product card in the DOM with the matching data-id attribute. I used chatGPT for the correct structure of selecting the specific deleted card (OpenAI, 2024).
  if (productCard) { 
    productCard.remove();   // If the product card exists in the DOM, it is removed from the product card list array
    updateProductCounter(); // Immediately updates the product and restock counter after removing the product card 
    updateRestockCounter();
  }
}

// This function is relevant for the product card when the user adds an existing skincare product, as the card
// specifically details how many days its been since the product was last purchased (or restocked) as a more
// efficient reflection of products needing urgent restock. It calculates the days since purchase to add to the card inner HTML.
function calculateDaysSincePurchase(purchaseDate) {
  const today = new Date(); // Gets the current date
  const purchase = new Date(purchaseDate); // Converts the purchase date string to a Date object
  const timeDifference = today - purchase;  // Calculates the time difference in milliseconds between today and the purchase date
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Converts the time difference from milliseconds to days. I used ChatGPT to see how to do this (OpenAI, 2024) Prompt: "How to convert time from today between date into days".
  return daysDifference; // Returns the number of days since purchase
}

// This function dynamically creates and displays a product card in the product list with select product information/data for the user's identification in the tracker.
// It also updates relevant counters and sets up an event listener for deleting the product. 
function displayProduct(product) {
  const productCard = document.createElement('div'); // Creates a new div element for the product card
  productCard.classList.add('product-card');   // Adds the 'product-card' class to the div for CSS styling
  const stockText = stockTextMap[product.status] || product.status; // Maps the product status to its corresponding text (outlined at beginning of code). The default is the original status value if undefined. 
  const productImageSrc = productImageMap[product.name] || "assets/product-images/placeholder-skincare.png";   // Maps the product name to its corresponding image source, and sets the default to a placeholder image if undefined (if the name input is not the test values)
  const ratingImageSrc = ratingImageMap[product.rating] || ratingImageMap[0]; // Maps the product rating to its corresponding image source to show on the product card, setting the default to the 0 star rating image if undefined
  const routineText = routineTextMap[product.routine] || product.routine;   // Maps the routine value to the mapped text (for the product info pop-up, not on the product card itself). The default is set to original routine if undefined  
  productCard.setAttribute('data-id', product.id); // Sets custom data attributes with product information for the product information pop-up. The following attributes are included in the pop-up when the user clicks into a card
  productCard.setAttribute('data-routine', product.routine || ''); // Referred to W3Schools (n.d.). Source:  W3Schools.(n.d.). HTML DOM Element setAttribute() Method. Retrieved June from https://www.w3schools.com/jsref/met_element_setattribute.asp
  productCard.setAttribute('data-category', product.productCategory  || '');
  productCard.setAttribute('data-cost', product.cost  || '');
  productCard.setAttribute('data-comments', product.comments  || '');
  productCard.setAttribute('data-link', product.link || '');
  const daysSincePurchase = calculateDaysSincePurchase(product.datePurchased);   // Calculates the number of days since the product was purchased so card can display how many days ago the product was purchased/last restocked

  // Sets the inner HTML of the product card with the product details. This uses innerHTML for custom layout, structure and styling.
  // Referred to W3Schools (n.d.). Source: W3Schools. (n.d.). HTML DOM Element innerHTML Property. Retrieved from https://www.w3schools.com/jsref/prop_html_innerhtml.asp
  // Asked ChatGPT to clean and format code and remove errors as there were issues with closing tags and quotations (OpenAI, 2024).
  // This structure follows the same in the wireframe, including relevant information on the product cards for the tracker. The user can see
  // the full dtata when clicking into each card.
  productCard.innerHTML = `
    <img src="${productImageSrc}" alt="${product.name}" class="product-image"/>
    <p class="product-name">${product.name}</p>
    <p class="product-brand">${product.brand}</p>
    <img src="${ratingImageSrc}" alt="Rating: ${product.rating}" class="rating-image"/>
    <p class="date-info">Last Restocked ${daysSincePurchase} days ago</p>
    <div class="stock-status ${product.status}">${stockText}</div>
    <button class="delete-product"><img src="assets/delete-icon.png" alt="Delete Product"></button>
    `;

  productList.insertBefore(productCard, productList.firstChild); // Inserts the product card at the start of the product list using insertBefore for clear visibility/feedback of it being added. (MDN, 2023). Source: MDN Node: insertBefore() method - Web APIs | MDN. (2023, April 7). Retrieved from https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore
  productCard.querySelector('.delete-product').addEventListener('click', function() {  // Add an event listener to the delete button for removing the product on click
    deleteProduct(product.id); // Calls the deleteProduct function with the product id, so it only deletes the skincare product card the user clicked delete from, not all products in the array
    productCard.remove();  // Removes the product card from the DOM and local storage
    updateProductCounter(); // Updates the product and restock counters
    updateRestockCounter();
  });
}

// Function to close the product information popup (popup when user clicks into an existing product)
function openProductInfoPopup(product) {
  displayProductInfo(product);
  productInfoPopup.classList.add('active');
  productInfoPopup.style.display = 'block';
  document.body.style.overflow = 'hidden'; // Disables scroll when popup is active
}

// Function to close the product information popup
function closeProductInfoPopup() {
  productInfoPopup.classList.remove('active'); // Removes the CSS styles for the active pop-up
  productInfoPopup.style.display = 'none'; // Hides the pop-up
  document.body.style.overflow = ''; // Re-enables scrolling of the web app
}
// This event listener controls closing the product information popup when the close button is clicked.
closeButton2.addEventListener('click', closeProductInfoPopup); // Calls the closeProductInfoPopup function when the button is clicked, so the pop-up form closes.


// This function updates the product information popup with the details of a specific skincare product given product. It includes all information that was input
// from the user, and dispalys it when the user clicks onto an existing product.
function displayProductInfo(product) {
  document.getElementById('productNameText').textContent = product.name;   // Sets the product name text
  productInfoImage.src = product.productImageSrc; // Updates the product info popup image
  productInfoImage.alt = product.name; // Updates the alt text of the product to the product name
  document.getElementById('productBrandText').textContent = product.brand;   // The following sets the product details to its given ID
  document.getElementById('productRoutine').textContent = `${product.routine}`;
  document.getElementById('productCategory-text').textContent = categoryTextMap[product.category];
  document.getElementById('productCost').textContent = `${product.cost}`;
  document.getElementById('productComments').textContent = `Comments: ${product.comments}`;
  document.getElementById('productLink-text').textContent = `${product.link}`;
  document.getElementById('productRatingImage').src = product.ratingImageSrc; // Sets rating image based on product's rating
  document.getElementById('productRatingImage').alt = `Rating: ${product.rating}`;
  const restockDateElement = document.getElementById('productRestockDate'); // Sets the restock date and format
  restockDateElement.textContent = `Last Restocked ${product.daysSincePurchase} days ago`;
  const stockStatus = document.getElementById('productStockStatus');   // Updates the stock status text and class in the popup
  stockStatus.className = `stock-status ${product.status} common-stock-status`; // Adding a class for styling
  stockStatus.textContent = product.stockText; // Sets the stock status text

  // Updates the product link text in the popup, so all links to the product (if provided) are enclosed
  // within the text 'Product Link' for a cleaner aesthetic.
  const productLink = document.getElementById('productLink-text');
  if (product.link) {   // If a link is provided, it creates a hyperlink element in the HTML
    productLink.innerHTML = `<a href="${product.link}" target="_blank">Product Link</a>`;
  } else {  // If no link is provided, it clears the content in the pop-up
    productLink.textContent = '';
  }
}

// This function handles the user's clicks on the product cards in the productList. When a product card is clicked, 
// it gathers the product details and opens the product information popup to display all skincare product details
// input by the user.
productList.addEventListener('click', function(event) {
  const card = event.target.closest('.product-card');   // Finds the closest product card element to the clicked target so the pop-up shows information of the right skincare product.
  // I wasn't sure how to map the pop-up to the correct card, so I asked ChatGPT for this. Prompt: 'How to open pop-up with information for each product card.' (OpenAI, 2024).
  if (!card) return; // If the click is not on a product card, does nothing
  const commentsElement = card.querySelector('.comments');   // Get the comments element within the product card
  const product = {   // Gathers all the relevant product details from the specific skincare product card (that stores all data input by user to track the skincare product)
    productImageSrc: card.querySelector('.product-image').src,
    name: card.querySelector('.product-name').textContent.trim(), // Get the product name and brand text, trimmed of whitespace
    brand: card.querySelector('.product-brand').textContent.trim(),
    ratingImageSrc: card.querySelector('.rating-image').src,
    rating: card.querySelector('.rating-image').alt.match(/\d+/)[0], // Extracts the rating number from the alt text of the rating image
    daysSincePurchase: card.querySelector('.date-info').textContent.match(/\d+/)[0], // Calculates days since purchase from the date-info text content
    status: card.querySelector('.stock-status').classList[1], //  Gets the stock status from the second class of the stock-status element
    stockText: card.querySelector('.stock-status').textContent.trim(),  // Gets the stock status text, trimmed of whitespace
    routine: routineTextMap[card.dataset.routine] || card.dataset.routine, // Maps the routine text or use the original routine value
    category: card.dataset.category, // Accesses the data-category attribute to get the product category
    cost: card.dataset.cost, // Accesses data-cost attribute ti get the product cost
    comments: card.dataset.comments, // Accesses the data-comments attribute for any product comments
    link: card.dataset.link// Accesses the data-link attribute if there is a URL for the product
  };
  openProductInfoPopup(product);   // Opens the product information popup with the gathered product details
});

// This function handles clicks on the "Edit" button for users wnating to edit information about an existing skincare product. It finds the product details from 
// local storage based on the displayed product name and opens the product form input pop-up with those details.
editProductButton.addEventListener('click', function() {
  const productName = document.getElementById('productNameText').textContent;   // Get the product name from the product info popup
  let products = JSON.parse(localStorage.getItem('products')) || [];   // Retrieves the products from local storage, or use an empty array if none are found
  const product = products.find(p => p.name === productName);   // Finds the product in the local storage that matches the product name
  if (product) {
    setFormFields(product); // Sets the form fields with the product details if found
    closeProductInfoPopup(); // Close the product info pop-up for the user to view the product form pop-up with details filled to edit/change/add
    productPopUp.classList.add('active');
    productPopUp.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
});

// The following code handles the 4 different sorting options for users to view their skincare product tracker.
// The options for the sort are provided using innerHTML and appended to the 'sort' div. 
sortSelect.innerHTML = `
  <option value="date">Sort by Earliest Purchase</option>
  <option value="latestDate">Sort by Latest Purchase</option>
  <option value="name">Sort by A-Z</option>
  <option value="dateAdded">Sort by Date Added</option>
`;
document.querySelector('.sort').appendChild(sortSelect); // Appends the sort dropdown to the div element with class 'sort'

// This event listener triggers different sorting functions based on the selected option.
sortSelect.addEventListener('change', function() {
  const value = this.value;   // Gets the selected option value from the dropdown
  if (value === 'name') {   // Using if/else to call the corresponding sorting function based on the selected value
    sortByName();
  } else if (value === 'date') {
    sortByDatePurchased();
  } else if (value === 'latestDate') {
    sortByLatestDate();
  } else if (value === 'dateAdded') {
    sortByDateAdded();
  }
});

// This function sorts the product cards array by product name (A-Z)
function sortByName() {
  const products = Array.from(document.querySelectorAll('.product-card'));  // Gets all product cards and converts them to an array
  products.sort((a, b) => {   // Sorts the product cards based on the product name in ascending order. I referred to 
    // W3Schools (n.d.) and Olawanle (2022) to understand how to do this. 
    // Source: Olwanle, J. (2022, July 29). Sort Alphabetically in JavaScript – How to Order by Name in JS. Retrieved from freeCodeCamp.org website: https://www.freecodecamp.org/news/how-to-sort-alphabetically-in-javascript/
    //  W3Schools. (n.d.). JavaScript Array sort() Method. Retrieved from https://www.w3schools.com/jsref/jsref_sort.asp
    // I cleaned up any errors in the code using ChatGPT (OpenAI, 2024)
    const nameA = a.querySelector('.product-name').textContent.trim().toLowerCase();
    const nameB = b.querySelector('.product-name').textContent.trim().toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
  productList.innerHTML = '';   // Clears the current product list
  products.forEach(product => {   // Appends the sorted product cards back to the product list
    productList.appendChild(product);
  });
}
// This function sorts the product cards array by the latest purchase date (purchased last/most recent purchase first).
function sortByLatestDate() {
  const products = Array.from(document.querySelectorAll('.product-card'));   // Gets all the product cards and converts them to an array
  products.sort((a, b) => new Date(a.querySelector('.date-info').textContent.trim().match(/\d+/)[0]) - new Date(b.querySelector('.date-info').textContent.trim().match(/\d+/)[0]));   // Sorts the product cards based on the latest purchase date in ascending order. I adapted this code from the loadProducts() function above.
  productList.innerHTML = ''; // Similar to above to sort cards back into product list
  products.forEach(product => {
    productList.appendChild(product);
  });
}

// This function sorts the product cards array by the earliest purchase date (purchased first/oldest purchase first).
// This uses the same sort in the loadProducts() function as the default, so users can see older products in their current
// routine first so they know what to buy/restock on next.
function sortByDatePurchased() {
  const products = Array.from(document.querySelectorAll('.product-card'));
  products.sort((a, b) => new Date(b.querySelector('.date-info').textContent.trim().match(/\d+/)[0]) - new Date(a.querySelector('.date-info').textContent.trim().match(/\d+/)[0]));
  productList.innerHTML = '';
  products.forEach(product => {
    productList.appendChild(product);
  });
}

// This function sorts skincare products by the date they were added in the tracker
function sortByDateAdded() {
  const products = Array.from(document.querySelectorAll('.product-card'));
  products.sort((a, b) => {   // Sorts the product cards based on the data-id attribute in descending order
    const idA = parseInt(a.getAttribute('data-id'));
    const idB = parseInt(b.getAttribute('data-id'));
    return idB - idA; // I referred and adapted the sortByName() function above
  });
  productList.innerHTML = '';
  products.forEach(product => {
    productList.appendChild(product);
  });
}

// The following code is relevant to controlling the functionality of the rating and routine filtering checkboxes and stock status filter on the skincare
// tracker section. The filterProducts function is responsible for filtering and displaying product cards based on selected routines, ratings, and stock status. 
// It adjusts the display of product cards according to the user's selections.
function filterProducts() {
  const selectedRoutines = Array.from(routineCheckboxes) // Retrieves an array of selected routine checkboxes, excluding the "All" checkbox, and converts routine names to lowercase
    .filter(checkbox => checkbox.checked && checkbox !== allRoutineCheckbox) // Excludes the "All" checkbox
    .map(checkbox => checkbox.value.toLowerCase());
  
    const selectedRatings = Array.from(ratingCheckboxes)  // Similalry retrieves rating array except All option, and converts ratings to integers
    .filter(checkbox => checkbox.checked && checkbox !== allRatingCheckbox) // Excludes the "All" checkbox
    .map(checkbox => parseInt(checkbox.value)); // Maps the value to integers so it can recognise the index of the product rating

  const selectedStockStatus = stockStatusSelect.value;   // Gets the selected stock status option from the dropdown menu
  const productCards = document.querySelectorAll('.product-card');   // Retrieves all product cards

  productCards.forEach(card => {   // Iterates over each product card
    // Retrieves the routine, rating, and stock status information from the skincare product card's data attributes and elements
    const routine = card.dataset.routine || ''; // Ensures routine is not undefined
    const rating = parseInt(card.querySelector('.rating-image').alt.match(/\d+/)[0]); // Extracts rating from the alt text (includes the numerical value)
    const cardStockStatus = card.querySelector('.stock-status').classList[1]; // Gets stock status class for the specific status
    // Checks if the card matches the selected routines, ratings, and stock status.
    // I used ChatGPT to check the matching across these 3 factors (OpenAI, 2024)
    const routineMatch = selectedRoutines.length === 0 || selectedRoutines.includes(routine.toLowerCase());
    const ratingMatch = selectedRatings.length === 0 || selectedRatings.includes(rating);
    const stockStatusMatch = !selectedStockStatus || cardStockStatus === selectedStockStatus;

    // Show or hide the card based on the matching criteria (stock status, routine and sleected rating all match)
    if (routineMatch && ratingMatch && stockStatusMatch) {
      card.style.display = 'block'; // Shows product card
    } else {
      card.style.display = 'none'; // Hides product card
    }
  });

  // Adjusts the flexbox properties on how cards are shown after being filtered, so layout remains the same
  const productList = document.getElementById('productList');
  productList.style.display = 'flex';
  productList.style.flexWrap = 'wrap';
  productList.style.alignItems = 'flex-start'; 
}

//This code adds event listeners to each routine checkbox (for teh skincare routine filter). When a routine checkbox is changed, 
// it triggers the filtering function of the product cards array.
// Firstly, this function iterates over each routine checkbox option to ensure if any other option other that 'all' is checked, then
// all is unchecked. 'All' is set as the default option to ensure there is no filtering applied to the product card list initially.
// I used ChatGPT to aid with controlling the 'all' option in regards to the other options (OpenAI, 2024). Prompt: "How to have all other options unchecked if the 'all' option is selected"
routineCheckboxes.forEach(function(checkbox) {
  checkbox.addEventListener('change', function() { // When any routine checkbox is changed ('change' event), it checks if the changed checkbox is not the "All" checkbox (allRoutineCheckbox) and if it's checked
    if (this !== allRoutineCheckbox && this.checked) {
     allRoutineCheckbox.checked = false; // Unchecks "All" checkbox if any other checkbox is checked
    }
    filterProducts(); // Triggers the filtering function
  });
});

// This part of the code adds an event listener to the "All" routine checkbox. When the "All" checkbox is changed, it either checks or 
// unchecks all routine checkboxes accordingly and triggers the filtering function.
allRoutineCheckbox.addEventListener('change', function() {
  if (this.checked) {  // Checks all other checkboxes if "All" checkbox is checked
    routineCheckboxes.forEach(function(checkbox) {
      checkbox.checked = true;
    });
  } else { // Unchecks all other checkboxes if "All" checkbox is unchecked (as this should automatically remove any filtering and show all products)
    routineCheckboxes.forEach(function(checkbox) {
      if (checkbox !== allRoutineCheckbox) {
        checkbox.checked = false;
      }
    });
  }
  filterProducts(); // Triggers the filtering function
});

// This set of event listeners manages the behavior when a user interacts with the rating checkboxes specifically. It ensures that if any individual rating checkbox is checked, 
// the "All" checkbox is unchecked. It then triggers the filterProducts function to update the product display accordingly.
// Similar to routine checkboxes, ensures the all checkbox is unchecked if any other checkbox is checked to enhance visual mapping
ratingCheckboxes.forEach(function(checkbox) {
  checkbox.addEventListener('change', function() {
    if (this !== allRatingCheckbox && this.checked) {
      allRatingCheckbox.checked = false; 
    }
    filterProducts(); 
  });
});

// Adds an event listener to the "All" checkbox for rating
allRatingCheckbox.addEventListener('change', function() {
  if (this.checked) { // Checks all other checkboxes if "All" checkbox is checked
    ratingCheckboxes.forEach(function(checkbox) {
      checkbox.checked = true;
    });
  } else { // Unchecks all other checkboxes if "All" checkbox is unchecked
    ratingCheckboxes.forEach(function(checkbox) {
      if (checkbox !== allRatingCheckbox) {
        checkbox.checked = false;
      }
    });
  }
  filterProducts();
});

// This event listener responds to changes in the stock status selection dropdown menu. It triggers the filterProducts function to 
// update the product display when a new stock status is chosen.
stockStatusSelect.addEventListener('change', function() {
  filterProducts();
});

loadProducts(); // Calls function to load products to default display and sort

});

// The following functions only are called in mobile view, when the routine and rating checkboxes are hidden and the user instead
// uses a drop-down selection to filter the skincare tracker. 
// This function attaches event listeners to dropdown elements. When the dropdown value changes, it triggers the corresponding filtering function 
// (filterProductsByRating or filterProductsByRoutine) with the selected value. I referred to W3Schools (n.d.). 
// Source: W3Schools. (n.d.). How To Search for/Filter Items in a Dropdown. Retrieved from https://www.w3schools.com/howto/howto_js_filter_dropdown.asp
function handleDropdownChange(dropdownId, filterFunction) {
const dropdown = document.getElementById(dropdownId); // Get dropdown element by ID
dropdown.addEventListener('change', function() {
  filterFunction(dropdown.value); // Triggers filtering function with selected value
});
}

// Function to filter products based on selected rating. This is similar to filtering usng the checkboxes on desktop view.
function filterProductsByRating(selectedRating) {
const productCards = document.querySelectorAll('.product-card'); // Gets all product cards
productCards.forEach(card => { // Iterates through each card in array to show/hide cards based on filter option.
  const rating = parseInt(card.querySelector('.rating-image').alt.match(/\d+/)[0]); 
  if (selectedRating === 'all' || rating === parseInt(selectedRating)) {
    card.style.display = 'block'; 
  } else {
    card.style.display = 'none'; 
  }
});
updateProductListDisplay(); // Updates the product list display after filtering
}

// Similar to above but filter product list by skincare routine for mobile view. 
function filterProductsByRoutine(selectedRoutine) {
const productCards = document.querySelectorAll('.product-card'); // Gets all product cards
productCards.forEach(card => {
  const routine = card.dataset.routine; // Gets routine value from data attribute to show/hide cards based off selected routine
  if (selectedRoutine === 'all' || routine === selectedRoutine) {
    card.style.display = 'block'; 
  } else {
    card.style.display = 'none'; 
  }
});
updateProductListDisplay(); // Update product list display after filtering
}

// Function to update product list display
function updateProductListDisplay() {
const productList = document.getElementById('productList'); // Gets product list element
productList.style.display = 'flex'; // Sets display property to flex for product list
productList.style.flexWrap = 'no-wrap'; // Prevents wrapping of product cards
productList.style.alignItems = 'flex-start'; // Aligns items to flex-start
}

// Attaches event listeners for dropdown change events. I asked ChatGPT on what property handles
// changes in the drop-down selection (OpenAI, 2024).
handleDropdownChange('ratingDropdown', filterProductsByRating); // Calls handleDropdownChange function for rating dropdown
handleDropdownChange('routineDropdown', filterProductsByRoutine); // Calls handleDropdownChange function for routine dropdown


// Finally, the code addresses user efficiency by adding event listeners to the scroll-to-top button to scroll to the start of the
// web-app, as well as for each anchor link in the nvaigation bar to quickly navigate to either section of the tracker web-app.

// This event listener adds a smooth scrolling behaviour for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function(e) {
  e.preventDefault(); // Prevent default anchor behavior
  const target = document.querySelector(this.getAttribute('href')); // Gets the target anchor link element
  if (target) { // If selected, scrolls to relevant section
    window.scrollTo({
      top: target.offsetTop, // Scrolls to target's top position to cover user's screen
      behavior: 'smooth' // Uses smooth scrolling behavior
    });
  }
});
});

// Function for users to scroll to the top of the web-app, especially useful for longer skincare product lists.
// I used ChatGPT for this function and aapted the scroll duration (OpenAI, 2024). Prompt: "How to scroll to top of page".
function scrollToTop() {
// Scroll to top over a duration of 500ms
const scrollDuration = 500; // Sets duration for scrolling animation
const scrollStep = -window.scrollY / (scrollDuration / 15); // Calculates te scroll step
const scrollInterval = setInterval(function() {
  if (window.scrollY !== 0) {
    window.scrollBy(0, scrollStep); // Scrolls by scroll step
  } else {
    clearInterval(scrollInterval); // Clears interval when top is reached
  }
}, 15); // Sets interval for smooth scrolling
}