/** GET PIZZA LIST**/
const pizzaList = [];
// function get pizza list from localStorage
const getPizzasListFromLS = () => {
  const pizzasListFromLS = JSON.parse(localStorage.getItem('pizzas'));
  if (pizzasListFromLS) {
    pizzasListFromLS.forEach((pizza, i) => pizzaList[i] = pizza);
  }
}

getPizzasListFromLS();

/** GET CART PIZZA **/
let cart = [];

// get cart data from localStorage
function getCartData() {
  const pizzaFromCartLS = JSON.parse(localStorage.getItem('cart'));
  if (pizzaFromCartLS) {
    pizzaFromCartLS.forEach((pizza, i) => cart[i] = pizza);
  }
}

getCartData();

/** RENDER CART */
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

const renderCart = () => {
  document.querySelector('.btn-cart-info').innerHTML = `${totalOptions().totalCount} шт. <br>  ${totalOptions().totalPrice} грн`
}

renderCart();

// function set user data
const setUserInfo = () => {
  const userSurname = document.getElementById('surname').value;
  const userName = document.getElementById('name').value;
  const userAddress = document.getElementById('address').value;
  const userPhone = document.getElementById('phone').value;
  const userEmail = document.getElementById('email').value;

  if (userSurname && userName && userPhone) {
    return {
      surname: userSurname,
      name: userName,
      address: userAddress,
      phone: userPhone,
      email: userEmail
    }
  }
}

document.querySelector('.user-info').onsubmit = function (e) {
  e.preventDefault();
  localStorage.setItem('userInfo', JSON.stringify(setUserInfo()));
  window.open('http://127.0.0.1:5500/js/17/cart.html', '_self');
}