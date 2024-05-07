document.addEventListener("DOMContentLoaded", function() {
    // Get the button element
    var scrollToTopBtn = document.getElementById("scrollToTopBtn");
  
    // Add a click event listener to the button
    scrollToTopBtn.addEventListener("click", function() {
      // Calculate the distance to scroll to the top
      var distanceToTop = window.pageYOffset || document.documentElement.scrollTop;
  
      // Scroll to the top of the page smoothly
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  });
  