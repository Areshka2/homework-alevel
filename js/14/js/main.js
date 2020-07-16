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

  return `
    <div class="pizza-item col mb-5">
      <div class="card h-100 pb-3 pt-2">
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
      </div>
    </div>
  `;
}

//! render pizzas function
function renderPizzas(pizzaArr) {
  let fragment = '';

  pizzaArr.forEach((pizza => {
    const pizzaItem = cardTemplate(pizza);
    fragment += pizzaItem;
  }));

  pizzaListBlock.innerHTML = '';
  pizzaListBlock.insertAdjacentHTML('afterbegin', fragment);
}

// loaded Pizzas
document.addEventListener('DOMContentLoaded', function () {
  renderPizzas(pizzas);
});


//! Search Pizzas Function
// get search form
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