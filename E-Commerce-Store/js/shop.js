document.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.querySelector(".shop-product-grid");
  const sortProducts = document.getElementById("sort-products");
  const categoryLinks = document.querySelectorAll(".category-link");
  const productCount = document.getElementById("product-count");
  const shopHeading = document.getElementById("shop-heading");
  const emptyState = document.getElementById("shop-empty-state");

  if (!productGrid) {
    return;
  }

  const originalProducts = Array.from(
    productGrid.querySelectorAll(".shop-product-card"),
  );

  let currentCategory = "all";

  function getFilteredProducts() {
    if (currentCategory === "all") {
      return [...originalProducts];
    }

    if (currentCategory === "new") {
      return originalProducts.filter((product) => {
        return product.dataset.new === "true";
      });
    }

    return originalProducts.filter((product) => {
      return product.dataset.category === currentCategory;
    });
  }

  function sortProductsList(products) {
    const sortValue = sortProducts?.value || "featured";

    products.sort((a, b) => {
      switch (sortValue) {
        case "newest":
          return new Date(b.dataset.date) - new Date(a.dataset.date);

        case "price-low":
          return Number(a.dataset.price) - Number(b.dataset.price);

        case "price-high":
          return Number(b.dataset.price) - Number(a.dataset.price);

        case "featured":
        default:
          return Number(b.dataset.featured) - Number(a.dataset.featured);
      }
    });

    return products;
  }

  function updateShop() {
    let products = getFilteredProducts();

    products = sortProductsList(products);

    productGrid.replaceChildren();

    products.forEach((product, index) => {
      product.classList.remove("is-visible");

      productGrid.appendChild(product);

      requestAnimationFrame(() => {
        product.classList.add("is-visible");

        product.style.animationDelay = `${index * 70}ms`;
      });
    });

    const count = products.length;

    productCount.textContent = String(count).padStart(2, "0");

    if (count === 0) {
      emptyState.hidden = false;
    } else {
      emptyState.hidden = true;
    }

    updateShopHeading();
  }

  function updateShopHeading() {
    const activeCategory = document.querySelector(".category-link.active");

    if (!activeCategory) {
      return;
    }

    const category = activeCategory.dataset.category;

    const headings = {
      all: "All Pieces",
      new: "New Arrivals",
      dresses: "Dresses",
      tops: "Tops",
      outerwear: "Outerwear",
      accessories: "Accessories",
    };

    shopHeading.textContent = headings[category] || "All Pieces";
  }

  categoryLinks.forEach((link) => {
    link.addEventListener("click", () => {
      categoryLinks.forEach((item) => {
        item.classList.remove("active");
      });

      link.classList.add("active");

      currentCategory = link.dataset.category;

      updateShop();
    });
  });

  if (sortProducts) {
    sortProducts.addEventListener("change", () => {
      updateShop();
    });
  }

  updateShop();
});

///////////////////////////////////dont delete Anything unless needed
