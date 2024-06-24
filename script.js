'use strict'
/* eslint-env browser */

const fermerMenu = () => {
  // Récupérer le menu
  const input = document.getElementById('menu-cb')
  input.checked = false

  const fenetreNode = document.getElementById('menu-cote')
  fenetreNode.remove()
}

const changerEtatMenu = () => {
  // Récupérer le menu
  const input = document.getElementById('menu-cb')
  const actif = input.checked

  if (actif) {
    const fenetreNode = document.createElement('div')
    fenetreNode.id = 'menu-cote'
    fenetreNode.className = 'menu-cote'
    fenetreNode.addEventListener('click', fermerMenu)
    document.body.appendChild(fenetreNode)
  } else {
    const fenetreNode = document.getElementById('menu-cote')
    fenetreNode.remove()
  }
}

const input = document.getElementById('menu-cb')
input.addEventListener('click', changerEtatMenu)








function searchRedirect() {
  var searchTerm = document.getElementById("site-search").value;
  if (searchTerm === "vegeta") {
      window.location.href = "Test.html";
  }
}







// Gestion du panier
function addToCart(item) {
  let cart = getCart();
  let cartItem = cart.find(I => i.id === item.id);
  if (cartItem) {
    cartItem.quantity++;
  } else {
    item.quantity = 1;
    cart.push(item);
  }
  setCart(cart);
  alert('Article ajouté au panier');
}

function getCart() {
  let cart = [];
  const cartCookie = getCookie('cart');
  if (cartCookie) {
    cart = JSON.parse(cartCookie);
  }
  return cart;
}

function setCart(cart) {
  setCookie('cart', JSON.stringify(cart), 7);
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Exemple d'ajout au panier depuis la page produit
document.querySelector('.Panier .btn').addEventListener('click', function () {
  const item = {
    id: '1',
    name: 'Vegeta Figurine',
    price: 12.99,
    image: 'img/vegataimg4.png'
  };
  addToCart(item);
});

function loadCart() {
  const cart = getCart();
  const cartItemsContainer = document.getElementById('cart-items');
  let total = 0;

  cart.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item');
    itemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div>
        <h3>${item.name}</h3>
        <p>Prix: ${item.price} €</p>
        <p>Quantité: <input type="number" value="${item.quantity}" min="1" data-id="${item.id}" class="item-quantity"></p>
        <button onclick="removeFromCart('${item.id}')">Supprimer</button>
      </div>
    `;
    cartItemsContainer.appendChild(itemElement);
    total += item.price * item.quantity;
  });

  document.getElementById('cart-total').textContent = total.toFixed(2);

  document.querySelectorAll('.item-quantity').forEach(input => {
    input.addEventListener('change', function () {
      updateQuantity(this.dataset.id, parseInt(this.value));
    });
  });
}

function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== id);
  setCart(cart);
  loadCart();
}

function updateQuantity(id, quantity) {
  let cart = getCart();
  const item = cart.find(I => i.id === id);
  if (item) {
    item.quantity = quantity;
    setCart(cart);
    loadCart();
  }
}

function checkout() {
  alert('Passer à la caisse non implémenté');
}

document.addEventListener('DOMContentLoaded', loadCart);




