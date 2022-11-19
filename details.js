const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const detailsContainer = document.querySelector(".details");
detailsContainer.innerHTML = "";
let cart = JSON.parse(sessionStorage.getItem("storeCart")) || [];
url = `https://kronia.one/wpgamehub/wp-json/wc/store/products?product=${id}`;

async function getDetails() {
  const response = await fetch(url);
  const gameList = await response.json();

  for (let i = 0; i < gameList.length; i++) {
    const element = gameList[i];

    if (element.id == id) {
      return (detailsContainer.innerHTML = `<div>
        <img src="${element.images[0].src}" alt="${element.name} cover" class="bestsellers_cover" />
    </div>
    <div>
        <h2>${element.name}</h2>
        <section class="rating">
            <i class="fa fa-star yellow_star" title="Rating star yellow"></i>
            <i class="fa fa-star yellow_star" title="Rating star yellow"></i>
            <i class="fa fa-star white_star" title="Rating star white"></i>
            <i class="fa fa-star white_star" title="Rating star white"></i>
            <i class="fa fa-star white_star" title="Rating star white"></i>
            <i class="ratings">55 ratings</i>
        </section>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Etiam at egestas metus. Pellentesque leo massa,
            lacinia ut ante hendrerit, imperdiet tincidunt ante.
            Sed ut dictum urna.</p>

        <section class="new_old_buttons">
          
            <input type="radio" id="used" name="neworusedgame" value="used">
            <label for="used">Used</label>
            <input type="radio" id="new" name="neworusedgame" value="new" checked="checked">
            <label for="new">New</label>
            
        </section>

        <div>
        <span class="price">$${element.prices.price}</span>
        
        
            
            <i
            
            class="cta details_cart"
            onclick="addToCart(${element.id})"
            >Add to cart</i>
            <p class="toCart details_cart add_one" id="toCart${element.id}">+1</p>
        </div>
        
    </div>`);
    }
  }
}

getDetails();

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
