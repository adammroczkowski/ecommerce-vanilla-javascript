const productContainer = document.querySelector('.products-container')
let cart = JSON.parse(localStorage.getItem("cart"));

function displayCart() {
    productContainer.innerHTML = ``;
    if (cart !== null) {
      Object.values(cart).map((item) => {
        productContainer.innerHTML += `<div class = "cart-single-product">
  
        <img src="${item.image}" alt="" class="cart-img-product">
        <div class="detail-box">
        <h5 class="cart-product-title">PRODUCT: ${item.title}</h5>
        <h5 class="quantity"><button class = "decrease" data-id=${
          item.id
        }>-</button><p class="number" data-id=${
          item.id
        }">${item.inCart}</p> <button class = "increase" data-id=${
          item.id
        }>+</button></h5>
        <h5 class="cart-price">PRICE: ${Number(item.price * item.inCart).toFixed(2)}$</h5>
        <img src="/img/x-regular-24.png" alt="" class= "remove-product" data-id=${
          item.id
        }>
        </div>
          
        `;
      });
    }
  }
  displayCart();



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
  if(productNumbers <= 0){
    document.querySelector(".number-in-cart").textContent = 0
  }
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


const increaseBtn = document.querySelectorAll(".increase");

increaseBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    increaseProduct(btn.dataset.id)
  });
});


function increaseProduct(productId){
  let product = cart.find(function (item) {
    return item.id == productId;
  });
  
  product.inCart += 1
  displayCart()
  totalPrice()
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}




const decreaseBtn = document.querySelectorAll(".decrease");

decreaseBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    descreaseProduct(btn.dataset.id)
  });
});


function descreaseProduct(productId){
  let product = cart.find(function (item) {
    return item.id == productId;
  });
  
  product.inCart -= 1
  if(product.inCart <= 0) {
    removeItemFromCart(product.id)
  }
  
  displayCart()
 totalPrice()
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

function totalPrice (){
    const cartsPrice = document.querySelectorAll('.cart-price')
    let result = 0
    for ( const el of cartsPrice){
      let str = el.textContent;
      let singleResult = str.slice(7,-1);
      result += Number(singleResult)  
    }
    document.querySelector('.total-cost').innerHTML = `TOTAL COST: ${result.toFixed(2)} $`
  
}
  
  totalPrice()