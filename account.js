let cart = JSON.parse(sessionStorage.getItem("storeCart")) || [];

function sumOfCart() {
  let cartSum = document.getElementById("cartsum");
  let sum = cart.map((data) => data.item).reduce((x, y) => x + y, 0);
  cartSum.innerHTML = sum;
}

sumOfCart();
