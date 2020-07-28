/** GET PIZZA LIST */
const pizzaList = [];
// function get pizza list from localStorage
const getPizzasListFromLS = () => {
  const pizzasListFromLS = JSON.parse(localStorage.getItem('pizzas'));
  if (pizzasListFromLS) {
    pizzasListFromLS.forEach((pizza, i) => pizzaList[i] = pizza);
  }
}

getPizzasListFromLS();

/** CART */
let cart = [];

// get cart data from localStorage
function getCartData() {
  const pizzaFromCartLS = JSON.parse(localStorage.getItem('cart'));
  if (pizzaFromCartLS) {
    pizzaFromCartLS.forEach((pizza, i) => cart[i] = pizza);
  }
}

getCartData();

// set cart data to localStorage
function setCartData(data) {
  localStorage.setItem('cart', JSON.stringify(data));
}

// create cart item template
const cartItemTemplate = (pizza) => {
  let pizzaFromCart = pizzaList.find(item => item.id == pizza.id);

  const productItem = document.createElement('tr');

  let imgSrc = pizzaFromCart.img.includes('base64') ? pizzaFromCart.img : `img/${pizzaFromCart.img}`;

  productItem.innerHTML = `       
    <td><img class="product__img" src="${imgSrc}"></td>
    <td><h5 class="product__title">${pizzaFromCart.name}</h5></td>
    <td><input class="product__count" type="number" value="${pizza.count}"></td>
    <td>${pizzaFromCart.price}</td>
    <td>${pizzaFromCart.price * pizza.count}</td>
    <td class='product__remove'>&times;</td>
  `;

  return productItem;
}

const totalOptions = () => {
  return cart.reduce((a, b) => {
    let pizzaFromCart = pizzaList.find(item => item.id == b.id);

    a.totalPrice += pizzaFromCart.price * b.count;
    a.totalCount += b.count;
    return {
      totalPrice: a.totalPrice,
      totalCount: a.totalCount
    }
  }, {
    totalPrice: 0,
    totalCount: 0
  })

}

const loadCart = () => {
  const cartContent = document.querySelector('#cart__content');
  cartContent.innerHTML = '';

  const productList = document.createElement('table');
  productList.classList.add('product__list');

  if (cart.length) {
    document.querySelector('#cart__checkout').classList.add('btn-checkout--active');
    document.querySelector('#cart__clear').classList.add('btn-clear--active');

    productList.innerHTML = `
      <thead>
        <tr>
          <th></th>
          <th>Название</th>
          <th>Ко-во</th>
          <th>Цена</th>
          <th>Сумма</th>
          <th></th>
        </tr>
      </thead>
    `;

    cart.forEach((pizza, id) => {
      const productItem = cartItemTemplate(pizza);

      productList.appendChild(productItem);

      productItem.querySelector(".product__count").onchange = function () {
        pizza.count = +this.value;
        if (!pizza.count) {
          cart.splice(id, 1);
        }

        setCartData(cart);
        loadCart();
      };

      productItem.querySelector(".product__remove").addEventListener('click', function () {
        cart.splice(id, 1);
        setCartData(cart);
        loadCart();
      });
    });

    const totalPriceBlock = document.createElement('tfoot');
    totalPriceBlock.innerHTML = `
      <tr>
        <td class="" colspan="6">Итого: ${totalOptions().totalCount} шт. -  ${totalOptions().totalPrice} грн</td>
      <tr>`;
    productList.appendChild(totalPriceBlock);

    cartContent.appendChild(productList);
  } else {
    cartContent.textContent = 'Корзина пуста';
    document.querySelector('#cart__checkout').classList.remove('btn-checkout--active');
    document.querySelector('#cart__clear').classList.remove('btn-clear--active');
  }

}

loadCart();

// clear cart
const clearCart = () => {
  localStorage.removeItem('cart');
  localStorage.removeItem('userInfo');
  cart = [];
  loadCart();
}

document.querySelector('#cart__clear').onclick = function () {
  clearCart();
}

// function generate order ID
const genID = function () {
  const random = +(Math.random().toString().slice(2));
  const time = new Date().getTime();
  return ((random + time).toString(36).slice(0, 8));
};


const renderOrder = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  return `<div>
    <h6>${userInfo.surname} ${userInfo.name}.
    Ваш заказ № <span style="color:red">${genID()}</span></h6>
    Телефон: ${userInfo.phone}.<br>
    Доставка по адресу: ${userInfo.address}
  </div>`;
}

const modal = () => {
  const modal = document.getElementById('modal');
  const modalContent = modal.children[0];
  const close = modalContent.getElementsByClassName("modal__close")[0];

  modalContent.innerHTML = '';
  modalContent.appendChild(close);  
  modalContent.insertAdjacentHTML('afterbegin', renderOrder())

  modal.classList.add('modal--active');

  close.onclick = function () {
    modal.classList.remove('modal--active');
  }

  window.onclick = function (e) {
    if (e.target === modal) {
      modal.classList.remove('modal--active');
    }
  }
}

document.querySelector('#cart__checkout').onclick = (e) => {
  modal();  
  setTimeout(clearCart, 5000);
  setTimeout(() => window.open('http://127.0.0.1:5500/js/17/index.html', '_self'), 5000);
}