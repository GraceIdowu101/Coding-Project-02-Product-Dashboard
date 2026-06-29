function fetchProductsThen() {
  fetch("https://www.course-api.com/javascript-store-products")
    .then(function(response) {
      return response.json();
    })
    .then(function(products) {
      products.forEach(function(product) {
        console.log(product.fields.name);
      });
    })
    .catch(function(error) {
      console.log("Fetch error:", error);
    });
}

async function fetchProductsAsync() {
  try {
    const response = await fetch("https://www.course-api.com/javascript-store-products");
    const products = await response.json();

    displayProducts(products);
  } catch (error) {
    handleError(error);
  }
}

function displayProducts(products) {
  const productContainer = document.getElementById("product-container");

  for (let i = 0; i < 5; i++) {
    const product = products[i];

    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    const productImage = document.createElement("img");
    productImage.src = product.fields.image[0].url;
    productImage.alt = product.fields.name;

    const productName = document.createElement("h3");
    productName.textContent = product.fields.name;

    const productPrice = document.createElement("p");
    productPrice.textContent = "$" + (product.fields.price / 100).toFixed(2);

    productCard.appendChild(productImage);
    productCard.appendChild(productName);
    productCard.appendChild(productPrice);

    productContainer.appendChild(productCard);
  }
}

function handleError(error) {
  console.log("An error occurred:", error.message);
}

fetchProductsThen();
fetchProductsAsync();