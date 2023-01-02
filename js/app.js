"use strict"
const productsSection = document.querySelector(".products-section");
const cartIcon = document.querySelector("#cart-icon");
const sideCart = document.querySelector(".side-cart");
const closeCart = document.querySelector(".close-cart");
const input = document.querySelector(".input-search");

// FETCH
const showProduct = async function () {
  try {
    const res = await fetch("./data/output.json");
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message}`);

    localStorage.setItem("products", JSON.stringify(data));
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", "[]");
    }
  } catch (err) {
    console.log(err);
  }
};

showProduct();

let products = JSON.parse(localStorage.getItem("products"));
let cart = JSON.parse(localStorage.getItem("cart"));

for (let i = 0; i < products.length; i++) {
  products[i]["inCart"] = 0;
  
}

// RENDER PRODUCT ON WEB
const renderProducts = function (products) {
  productsSection.innerHTML = "";
  for (let i = 0; i < products.length; i++) {
    let div = document.createElement("div");
    div.className = "product";
    productsSection.append(div);

    div.innerHTML += `
    <img src="${products[i].image}" alt="product-image" />
    <p class="product-name">${products[i].title}</p>
    <span class="price">${products[i].price} $</span>
    <button class="btn-add-to-cart" data-id="${products[i].id}">
      Add to Cart
    </button>
    
  `;
  }
  
};
document.onload = renderProducts(products);

// BTN ADDING TO CART
const btnAddToCart = document.querySelectorAll(".btn-add-to-cart");

btnAddToCart.forEach((btn) => {
  btn.addEventListener("click", () => {
    addItemToCart(btn.dataset.id);
  });
});

function addItemToCart(productId) {
  let product = products.find(function (item) {
    return item.id == productId;
  });
  

  let res = cart.find((element) => element.id == productId);

  
  if (res === undefined) {
    product.inCart = 1;
    cart.push(product);
    numberInCart(product);
  } else {
    // product.inCart += 1;
    alert('this product is added')
  }
 

  localStorage.setItem("cart", JSON.stringify(cart));
  console.log('click');
  
}



// REMOVE ITEM FROM CART
const removeFromCart = document.querySelectorAll(".remove-product");

removeFromCart.forEach((btn) => {
  btn.addEventListener("click", () => {
    removeItemFromCart(btn.dataset.id);
  });
});

function removeItemFromCart(productId) {
  let productNumbers = localStorage.getItem("cartNumbers");
  upDateProductsInCart = 0;
  for (let i = 0; i < cart.length; i++) {
    upDateProductsInCart += i;
  }

  productNumbers = upDateProductsInCart;

  cart = cart.filter((item) => item.id != productId);
  // 
  decreaseNumberInCartByRemoveItem();
  displayCart()
  totalPrice()
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
  
  
 
 
}
///////////////

const onLoadCartNumber = function () {
  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    document.querySelector(".number-in-cart").textContent = productNumbers;
  }
};
onLoadCartNumber();

const numberInCart = function (product) {
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = Number(productNumbers);
  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".number-in-cart").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".number-in-cart").textContent = 1;
  }
};

function decreaseNumberInCartByRemoveItem() {
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = Number(productNumbers);
  
  localStorage.setItem("cartNumbers", productNumbers - 1);
  document.querySelector(".number-in-cart").textContent = productNumbers - 1;
  
}

// FILTER PRODUCTS
const productSection = document.querySelector(".products-section");

const filterProducts = function () {
  let filterValue = input.value.toUpperCase();

  let items = productSection.querySelectorAll(".product");

  for (let i = 0; i < items.length; i++) {
    let p = items[i].querySelector(".product-name");
    if (p.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
      items[i].style.display = "flex";
    } else {
      items[i].style.display = "none";
    }
  }
};
input.addEventListener("input", filterProducts);
filterProducts();

// Categories

let categories = new Set();
const renderCategories = (items) => {
  for (let i = 0; i < items.length; i++) {
    categories.add(items[i].category);
  }

  const categoriesItems = document.querySelector(".categories-section");

  categories = ["all", ...categories];

  categories.forEach((category, index) => {
    const newCategory = document.createElement("button");
    newCategory.innerHTML = category;
    newCategory.dataset.category = category;
    categoriesItems.appendChild(newCategory);
  });
};


document.onload = renderCategories(products);


const categoriesButtons = document.querySelectorAll(".categories-section button");

categoriesButtons.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    const category = e.target.dataset.category;
    let currentProducts = products;
    
    
    if (category === "all"){
      renderProducts(currentProducts)
      location.reload()
    } else{
      currentProducts = currentProducts.filter((product) => product.category === category)
      localStorage.setItem("categoriesProducts", JSON.stringify(currentProducts));

    }

  let categoriesProduct =  JSON.parse(localStorage.getItem("categoriesProducts"));

    renderProducts(categoriesProduct)
    const btnAddToCart = document.querySelectorAll(".btn-add-to-cart");
    btnAddToCart.forEach((btn) => {
      btn.addEventListener("click", () => {
        addItemToCart(btn.dataset.id);
      });
    });
  })
  );

