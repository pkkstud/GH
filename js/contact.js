const form = document.querySelector("#form");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const contactMessage = document.querySelector("#contactMessage");
const contactMessageError = document.querySelector("#contactMessageError");
const regEx = /\S+@\S+\.\S+/;
let cart = JSON.parse(sessionStorage.getItem("storeCart")) || [];

function sumOfCart() {
  let cartSum = document.getElementById("cartsum");
  let sum = cart.map((data) => data.item).reduce((x, y) => x + y, 0);
  cartSum.innerHTML = sum;
}

sumOfCart();

function validateForm(event) {
  event.preventDefault();
  if (regEx.test(email.value)) {
    emailError.style.visibility = "hidden";
  } else {
    emailError.style.visibility = "visible";
  }
  if (contactMessage.value.trim().length >= 20) {
    contactMessageError.style.visibility = "hidden";
  } else {
    contactMessageError.style.visibility = "visible";
  }
  if (regEx.test(email.value) && contactMessage.value.trim().length >= 20) {
    window.location.assign("contact-sendt.html");
  } else {
    return;
  }
}

form.addEventListener("submit", validateForm);
