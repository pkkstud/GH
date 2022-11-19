let list = document.getElementById("categorylistofgames");
let categoryheading = document.querySelector(".categoryheading");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const noGames = document.getElementById("noGames");
let cart = JSON.parse(sessionStorage.getItem("storeCart")) || [];
const url = `https://kronia.one/wpgamehub/wp-json/wc/store/products?category=${id}`;

function getHeader() {
  if (id == 19) {
    categoryheading.innerHTML = `Category: Action`;
  } else if (id == 18) {
    categoryheading.innerHTML = `Category: Adventure`;
  } else if (id == 23) {
    categoryheading.innerHTML = `Category: Racing`;
  } else if (id == 21) {
    categoryheading.innerHTML = `Category: RPG`;
  } else if (id == 17) {
    categoryheading.innerHTML = `Category: Sport`;
  } else if (id == 22) {
    categoryheading.innerHTML = `Category: Shooter`;
  } else if (id == 20) {
    categoryheading.innerHTML = `Category: Strategy`;
  }
}
getHeader();

async function getData() {
  const response = await fetch(url);
  const gameList = await response.json();
  console.log(gameList);
  let generateList = () => {
    return (list.innerHTML = gameList
      .map((data) => {
        if (gameList.length >= 0) {
          noGames.innerHTML = "";
          return `<div> 
          <div>
          <a href="game-details.html?id=${data.id}" title="Game details"
            ><img
              src="${data.images[0].src}"
              alt="${data.name} cover"
              class="bestsellers_cover"
          /></a>
        </div>
        <div class="bestsellers_info">
          <div class="bestsellers_price">
            <p>${data.name}</p>
            <p>$${data.prices.price}</p>
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
        }
      })
      .join(""));
  };

  generateList();
}

getData();

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
