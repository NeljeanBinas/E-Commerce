// DONT TOUCH!!!!!!!!!!!!!!!!!!!!!!!!!!!

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  setupLoadingState();
  setupBackToTop();
});

function updateCartCount() {
  const cartCount = document.getElementById("cart-count");

  if (!cartCount) {
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const totalItems = cart.reduce((total, item) => {
    return total + (item.quantity || 0);
  }, 0);

  cartCount.textContent = totalItems;
}

function setupLoadingState() {
  document.body.classList.add("page-loaded");
}

function setupBackToTop() {
  const backToTop = document.getElementById("back-to-top");

  if (!backToTop) {
    return;
  }

  backToTop.addEventListener("click", (event) => {
    event.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
