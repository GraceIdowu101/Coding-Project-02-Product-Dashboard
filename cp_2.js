const API_URL = "https://www.course-api.com/javascript-store-products";

/**
 * Fetches product data using fetch() with .then().
 * This function demonstrates promise chaining.
 */
function fetchProductsThen() {
  return fetch(API_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          `Request failed with status ${response.status}`
        );
      }

      return response.json();
    })
    .then((products) => {
      products.forEach((product) => {
        console.log(product.fields.name);
      });

      return products;
    })
    .catch((error) => {
      handleError(error);
      return [];
    });
}

/**
 * Fetches product data using async/await and try/catch.
 * The retrieved products are passed to displayProducts().
 */
async function fetchProductsAsync() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(
        `Request failed with status ${response.status}`
      );
    }

    const products = await response.json();

    displayProducts(products);
  } catch (error) {
    handleError(error);
  }
}

/**
 * Displays the first five products on the page.
 *
 * @param {Array} products - Product data returned by the API.
 */
function displayProducts(products) {
  const productContainer = document.querySelector("#product-container");

  if (!productContainer) {
    console.error("The product container could not be found.");
    return;
  }

  productContainer.innerHTML = "";
  productContainer.setAttribute("aria-busy", "false");

  if (!Array.isArray(products) || products.length === 0) {
    productContainer.innerHTML = `
      <p class="empty-message">
        No products are currently available.
      </p>
    `;
    return;
  }

  const firstFiveProducts = products.slice(0, 5);

  for (const product of firstFiveProducts) {
    const productName = product.fields?.name ?? "Unnamed Product";
    const productImage =
      product.fields?.image?.[0]?.url ?? "";
    const productPrice =
      typeof product.fields?.price === "number"
        ? product.fields.price / 100
        : 0;

    const productCard = document.createElement("article");
    productCard.classList.add("product-card");

    const image = document.createElement("img");
    image.classList.add("product-image");
    image.src = productImage;
    image.alt = productName;
    image.loading = "lazy";

    image.addEventListener("error", () => {
      image.removeAttribute("src");
      image.alt = `${productName} image unavailable`;
    });

    const productDetails = document.createElement("div");
    productDetails.classList.add("product-details");

    const nameElement = document.createElement("h2");
    nameElement.classList.add("product-name");
    nameElement.textContent = productName;

    const priceElement = document.createElement("p");
    priceElement.classList.add("product-price");
    priceElement.textContent = productPrice.toLocaleString(
      "en-US",
      {
        style: "currency",
        currency: "USD"
      }
    );

    productDetails.append(nameElement, priceElement);
    productCard.append(image, productDetails);
    productContainer.append(productCard);
  }
}

/**
 * Handles API and application errors.
 *
 * @param {Error} error - The error that occurred.
 */
function handleError(error) {
  console.error("An error occurred:", error);

  const productContainer = document.querySelector("#product-container");

  if (!productContainer) {
    return;
  }

  productContainer.setAttribute("aria-busy", "false");

  productContainer.innerHTML = `
    <div class="error-message" role="alert">
      <h2>Unable to load products</h2>
      <p>
        The products could not be loaded. Please check your
        connection and try again later.
      </p>
    </div>
  `;
}

/*
  Both fetch approaches are included to demonstrate the two required
  asynchronous JavaScript techniques.

  The .then() version logs product names to the console.
  The async/await version displays the products on the page.
*/

fetchProductsThen();
fetchProductsAsync();
