let cart = JSON.parse(sessionStorage.getItem("storeCart")) || [];
let summary = document.getElementById("summary");
let orderSummary = document.getElementById("ordersummary");
let sumPrice = [];

let sumOfCart = () => {
  let cartSum = document.getElementById("cartsum");
  let sum = cart.map((data) => data.item).reduce((x, y) => x + y, 0);
  cartSum.innerHTML = sum;
};

const url =
  "https://kronia.one/wpgamehub/wp-json/wc/store/products?category=16";

async function getData() {
  const response = await fetch(url);
  const gameList = await response.json();
  let cartItems = () => {
    if (cart.length !== 0) {
      return (summary.innerHTML = cart
        .map((unit) => {
          console.log(unit);
          let { id, item } = unit;
          let search = gameList.find((y) => y.id == id);
          return `<div class="summary_games">
    <img
      src="${search.images[0].src}"
      alt="${search.name} cover"
      class="cover_checkout"
    />
    <div class="game_number">
      <h3>${search.name}</h3>
      <div>
        <button
          type="button"
          name="reduce-games"
          class="add_minus"
          title="Add number of games"
          onclick="increase(${search.id})"
        >
          +
        </button>
        <input
          type="text"
          name="number-of-games"
          value="${item}"
          class="number"
          title="number of games"
          id="${search.id}"
        />
        <button
          type="button"
          name="add-games"
          class="add_minus"
          title="Reduced number of games"
          onclick="reduce(${search.id})"
        >
          -
        </button>
      </div>
    </div>
    <span class="sum_each_game">${search.prices.price}</span>
  </div>`;
        })
        .join(""));
    } else {
      return (summary.innerHTML = "The cart is empty");
    }
  };
  cartItems();
  return cartItems;
}

getData();

let sumOrder = () => {
  if (cart.length !== 0) {
    let amount = cart
      .map((unit) => {
        console.log(unit);
        let { id, item } = unit;
        let search = gameList.find((y) => y.id == id);
        return item * search.price;
      })
      .reduce((a, b) => a + b, 0);
    orderSummary.innerHTML = `<span>Sum order</span>
    <span>$${amount}</span>`;
    console.log(amount);
  }
};
let increase = (id) => {
  let selectedGame = id;
  let search = cart.find((data) => data.id === id);
  if (search === undefined) {
    cart.push({
      id: selectedGame,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  sessionStorage.setItem("storeCart", JSON.stringify(cart));
  cartItems();
  update(id);
};

let reduce = (id) => {
  let selectedGame = id;
  console.log(selectedGame);
  let search = cart.find((data) => data.id === id);
  if (search === undefined) {
    return;
  } else if (search.item === 0) {
    return;
  } else {
    search.item -= 1;
  }

  update(id);
  cart = cart.filter((x) => x.item != 0);
  cartItems();
  sessionStorage.setItem("storeCart", JSON.stringify(cart));
};

let update = (id) => {
  let search = cart.find((x) => (x.id = id));
  document.getElementById(id).value = search.item;
  sumOfCart();
  sumOrder();
};

cartItems();
sumOfCart();
sumOrder();

function deleteStorage() {
  sessionStorage.clear();
}
