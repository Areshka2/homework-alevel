// get cart data from localStorage
function getCartData() {
  return JSON.parse(localStorage.getItem('cart'));
}

// set cart data to localStorage
function setCartData(data) {
  localStorage.setItem('cart', JSON.stringify(data));
  return false;
}

// clear cart
document.querySelector('#clear__cart').onclick = function () {
  localStorage.removeItem('cart');
  loadCart();
}

const loadCart = () => {
  const cartData = getCartData();
  const cartContent = document.querySelector('#cart__content');
  cartContent.innerHTML = '';
  const productList = document.createElement('table');
  productList.classList.add('product__list');

  if (cartData) {
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

    let totalPrice = 0;

    cartData.forEach((product, id) => {
      let imgSrc = product.img.includes('base64') ? product.img : `img/${product.img}`;

      const productItem = document.createElement('tr');
      productItem.innerHTML = `       
        <td><img class="product__img" src="${imgSrc}"></td>
        <td><h5 class="product__title">${product.name}</h5></td>
        <td><input class="product__count" type="number" value="${product.count}"></td>
        <td>${product.price}</td>
        <td>${product.price * product.count}</td>
        <td class='product__remove'>&times;</td>
      `;

      productList.appendChild(productItem);

      totalPrice += product.count * product.price;

      productItem.querySelector(".product__count").onchange = function () {
        product.count = +this.value;
        setCartData(cartData);
        loadCart();
      };

      productItem.querySelector(".product__remove").onclick = function () {
        cartData.splice(id, 1);
        setCartData(cartData);
        loadCart();
      };
    });

    const totalPriceBlock = document.createElement('tfoot');
    totalPriceBlock.innerHTML = `<tr><td class="" colspan="6">Итого: ${totalPrice}</td><tr>`;
    productList.appendChild(totalPriceBlock);

    cartContent.appendChild(productList);
  } else {
    cartContent.textContent = 'Корзина пуста'
  }

}

loadCart();