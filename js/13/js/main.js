class Pizza {
  constructor(obj) {
    Object.assign(this, obj);
  }
}

// get a list of pizzas
const pizzas = pizzaList.map(item => new Pizza(item));
// get container for pizzas
const pizzaListBlock = document.querySelector('.pizza-list');

function cardTemplate(pizza) {
  const imgPath = 'img';
  const pizzaItem = document.createElement("div");
  pizzaItem.classList.add('pizza-item', 'col', 'mb-5');

  const card = document.createElement("div");
  card.classList.add('card', 'h-100', 'pb-3', 'pt-2');

  const cardImg = document.createElement('img');
  cardImg.classList.add('card-img-top', 'w-50', 'mx-auto');
  cardImg.src = imgPath + '/' + pizza.img;

  const cardBody = document.createElement("div");
  cardBody.classList.add('card-body');

  const title = document.createElement('h5');
  title.classList.add('card-title');
  title.textContent = pizza.name;

  const composition = document.createElement('p');
  composition.classList.add('card-text');
  composition.textContent = pizza.composition.join(', ');

  const caloricity = document.createElement('p');
  caloricity.classList.add('pizza-caloricity');
  caloricity.textContent = pizza.caloricity + ' кал';

  const cardFooter = document.createElement("div");
  cardFooter.classList.add('card-footer');

  const price = document.createElement('p');
  price.classList.add('card-price');
  price.innerHTML = pizza.price + ' &#8372;';

  const btnAdd = document.createElement('a');
  btnAdd.href = "#";
  btnAdd.classList.add('btn', 'btn-add-to-basket', 'd-block');
  btnAdd.textContent = '+';

  cardBody.appendChild(title);
  cardBody.appendChild(composition);
  cardFooter.appendChild(price);
  card.appendChild(cardImg);
  card.appendChild(caloricity);
  card.appendChild(cardBody);
  card.appendChild(cardFooter);
  card.appendChild(btnAdd);
  pizzaItem.appendChild(card);

  return pizzaItem;
}

// function add pizzas 
function renderPizzas(pizzaArr) {
  const fragment = document.createDocumentFragment();

  pizzaArr.forEach((pizza => {
    const pizzaItem = cardTemplate(pizza);
    fragment.appendChild(pizzaItem);
  }));

  pizzaListBlock.appendChild(fragment);
}

// get button search
const btnSearch = document.querySelector('.btn-search');
// get input for search
const search = document.querySelector('input[type="search"]')

btnSearch.onclick = e => {
  sessionStorage.setItem('searchValue', search.value);
}

if (sessionStorage.getItem('searchValue')) {
  const filterPizzasArr = pizzas.filter(pizza => pizza.name.toLowerCase() === sessionStorage.getItem('searchValue').toLowerCase());
  if (filterPizzasArr.length) {
    renderPizzas(filterPizzasArr);
  } else {
    renderPizzas(pizzas);
    alert('Нет такой пицы');
  }
} else {
  renderPizzas(pizzas);
}

// when reloading the page, remove sessionStorage searchValue
sessionStorage.setItem("is_reloaded", true);
if (sessionStorage.getItem("is_reloaded")) {
  sessionStorage.removeItem('searchValue')
}