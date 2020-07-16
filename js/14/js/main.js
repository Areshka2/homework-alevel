class Pizza {
  constructor(obj) {
    Object.assign(this, obj);
  }
}

// get a list of pizzas
const pizzas = pizzaList.map(item => new Pizza(item));
// get container for pizzas
const pizzaListBlock = document.querySelector('.pizza-list');

//! Pizza item template function
function cardTemplate(pizza) {
  const imgPath = 'img';

  const pizzaItem = document.createElement('div');
  pizzaItem.className = "pizza-item col mb-5";

  const card = document.createElement('div');
  card.className = "card h-100 pb-3 pt-2";

  // 4. Добавить возможность добовлять пиццу в избранное
  //! add to favorite
  const btnFav = document.createElement('button');
  btnFav.classList.add('btn-favorite');
  btnFav.addEventListener('click', function () {
    this.classList.toggle('active');
    if (this.classList.contains('active')) {
      pizza.isFavorite = true;
    } else {
      pizza.isFavorite = false;
    }
  })

  card.innerHTML = `    
    <img class="card-img-top w-50 mx-auto" src="${imgPath}/${pizza.img}">
    <p class="pizza-caloricity">${pizza.caloricity || ''} кал</p>    
    <div class="card-body">
      <h5 class="card-title">${pizza.name || ''}</h5>
      <p class="card-text">${pizza.composition.join(', ') || ''}</p>
    </div>
    <div class="card-footer">
      <p class="card-price">${pizza.price || ''} ₴</p>
    </div>
    <a href="#" class="btn btn-add-to-basket d-block">+</a>      
  `;
  card.appendChild(btnFav);
  pizzaItem.appendChild(card);
  return pizzaItem;
}

//! render pizzas function
function renderPizzas(pizzaArr) {
  pizzaListBlock.innerHTML = '';

  const fragment = document.createDocumentFragment();

  pizzaArr.forEach((pizza => {
    const pizzaItem = cardTemplate(pizza);
    fragment.appendChild(pizzaItem);
  }));

  pizzaListBlock.appendChild(fragment);
}

// loaded Pizzas
document.addEventListener('DOMContentLoaded', function () {
  renderPizzas(pizzas);
});

//! sort Pizzas Function
const sortPizzas = (array, order = "default") => {
  sortArr = [...array];
  sortArr.sort((a, b) => {
    if (order === 'default') return sortArr;
    if (order === 'asc') return a.price - b.price;
    if (order === 'desc') return b.price - a.price;
  })

  return sortArr;
}

const sortSelect = document.getElementById('sort');

sortSelect.onchange = e => {
  pizzaListBlock.innerHTML = '';
  renderPizzas(sortPizzas(pizzas, sortSelect.value));
}

//1. Добавить возможность поика по состовляющим пиццы (compositions)
//! Search Pizzas Function
const searchForm = document.querySelector('.form-search');

const searchPizzas = () => {
  // get input for search
  const searchInputValue = searchForm.querySelector('input[type="search"]').value;

  const result = pizzas.filter(pizza => {
    const namesSearch = pizza.name.toLocaleLowerCase().includes(searchInputValue.toLocaleLowerCase());
    const compositionsSearch = pizza.composition.join(', ').toLocaleLowerCase().includes(searchInputValue.toLocaleLowerCase());

    return namesSearch || compositionsSearch;
  })

  renderPizzas(result);
}

searchForm.oninput = searchPizzas;

// 2. Добавить фильтрацию по-калориям и по-цене
//! filter Pizzas by Price Function
const filterByPrice = (e) => {
  e.preventDefault();

  let min = pizzas.reduce((acc, curr) => acc.price < curr.price ? acc : curr);
  let max = pizzas.reduce((acc, curr) => acc.price > curr.price ? acc : curr);

  minPrice.placeholder = min.price;
  maxPrice.placeholder = max.price;

  const minPriceValue = minPrice.value ? minPrice.value : min.price;
  const maxPriceValue = maxPrice.value ? maxPrice.value : max.price;

  const result = pizzas.filter(item => item.price >= minPriceValue && item.price <= maxPriceValue)
  renderPizzas(result);
}

const filterPrice = document.querySelector('.filter-price')
const btnFilterByPrice = filterPrice.querySelector('.btn');
btnFilterByPrice.addEventListener('click', filterByPrice);

//! filter Pizzas by Caloricity Function
const filterByCalorisity = (e) => {
  e.preventDefault();

  let min = pizzas.reduce((acc, curr) => acc.caloricity < curr.caloricity ? acc : curr);
  let max = pizzas.reduce((acc, curr) => acc.caloricity > curr.caloricity ? acc : curr);

  minCaloricity.placeholder = min.caloricity;
  maxCaloricity.placeholder = max.caloricity;

  const minCaloricityValue = minCaloricity.value ? minCaloricity.value : min.caloricity;
  const maxCaloricityValue = maxCaloricity.value ? maxCaloricity.value : max.caloricity;

  const result = pizzas.filter(item => item.caloricity >= minCaloricityValue && item.caloricity <= maxCaloricityValue)
  renderPizzas(result);
}

const filterCaloricity = document.querySelector('.filter-caloricity');
const btnFilterByCaloricity = filterCaloricity.querySelector('.btn');
btnFilterByCaloricity.addEventListener('click', filterByCalorisity);

//3. Добавить кнопку сброса фильтров.
document.querySelector('.btn-reset').addEventListener('click', function (e) {
  e.preventDefault();
  this.parentNode.reset();
  renderPizzas(pizzas);
})