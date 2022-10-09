let list = document.getElementById("listofgames");

let cart = JSON.parse(sessionStorage.getItem("storeCart")) || [];

let generateList = () => {
  return (list.innerHTML = listItems
    .map((data) => {
      return `<div> 
    <div>
      <a href="game-details.html?id=${data.id}" title="Game details"
        ><img
          src="${data.img}"
          alt="${data.name} cover"
          class="bestsellers_cover"
      /></a>
    </div>
    <div class="bestsellers_info">
      <div class="bestsellers_price">
        <p>${data.name}</p>
        <p>$${data.price}</p>
      </div>
      
      <div class="sepcart">
      <p class="toCart" id="toCart${data.id}">+1</p>
      <i
        title="Add to cart"
        class="cta fa fa-shopping-cart"
        onclick="addToCart(${data.id})"
      ></i>
      </div>
    </div>
  </div>`;
    })
    .join(""));
};

generateList();

function addToCart(id) {
  let selectedGame = id;
  let search = cart.find((data) => data.id === selectedGame);
  if (search === undefined) {
    cart.push({
      id: selectedGame,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  sessionStorage.setItem("storeCart", JSON.stringify(cart));
  console.log(cart);
  sumOfCart();
  let toCart = document.querySelector(`#toCart${selectedGame}`);
  toCart.style.visibility = "visible";
  setTimeout(function () {
    toCart.style.visibility = "hidden";
  }, 1000);
}

function sumOfCart() {
  let cartSum = document.getElementById("cartsum");
  let sum = cart.map((data) => data.item).reduce((x, y) => x + y, 0);
  cartSum.innerHTML = sum;
}

sumOfCart();
