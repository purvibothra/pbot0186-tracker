function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
document.addEventListener('DOMContentLoaded', function () {
  const addProductButton = document.getElementById('addProductButton');
  const productPopup = document.getElementById('productPopup');
  const closePopup = document.querySelector('.close');
  const saveProductButton = document.getElementById('saveProductButton');
  const productList = document.getElementById('productList');

  addProductButton.addEventListener('click', function () {
    productPopup.style.display = 'block';
  });

  closePopup.addEventListener('click', function () {
    productPopup.style.display = 'none';
  });

  saveProductButton.addEventListener('click', function () {
    const productName = document.getElementById('productName').value;
    const productBrand = document.getElementById('productBrand').value;

    if (productName && productBrand) {
      const product = {
        name: productName,
        brand: productBrand
      };

      saveProduct(product);
      displayProduct(product);

      productPopup.style.display = 'none';
    } else {
      alert('Please enter product name and brand.');
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
    productCard.innerHTML = `<p>Name: ${product.name}</p><p>Brand: ${product.brand}</p>`;
    productList.appendChild(productCard);
  }

  function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.forEach(product => {
      displayProduct(product);
    });
  }

  loadProducts();
});
