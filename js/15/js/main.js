// function add pizza list to localStorage
const setPizzasListToLS = () => {
  localStorage.setItem('pizzas', JSON.stringify(pizzaList));
}

// function get pizza list from localStorage
const getPizzasListFromLS = () => {
  const pizzasListFromLS = JSON.parse(localStorage.getItem('pizzas'));
  if (pizzasListFromLS) {
    pizzasListFromLS.forEach((pizza, i) => pizzaList[i] = pizza);
  }
}

getPizzasListFromLS();

// get container for pizza list
const pizzaListBlock = document.querySelector('.pizza-list');

// function pizza item template 
function cardTemplate(pizza) {
  const imgPath = 'img';

  const pizzaItem = document.createElement('div');
  pizzaItem.className = "pizza-item col mb-5";

  const card = document.createElement('div');
  card.className = "card h-100 pb-3 pt-2";

  // add to favorite
  const btnFavorite = document.createElement('button');
  btnFavorite.classList.add('btn-favorite');
  if (pizza.isFavorite) btnFavorite.classList.add('active');

  btnFavorite.addEventListener('click', function (e) {
    e.stopPropagation();
    this.classList.toggle('active');
    pizza.isFavorite = !pizza.isFavorite;
    console.log(pizza)

    setPizzasListToLS();
    renderPizzas(pizzaList);
  })

  let pathToImg = pizza.img.includes('base64') ? pizza.img : `${imgPath}/${pizza.img}`

  card.innerHTML = `    
    <img class="card-img-top w-50 mx-auto" src="${pathToImg}">
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
  card.appendChild(btnFavorite);

  // 1. Выводить информацию о пицце в модальном окне при клике на карточку с пиццей
  card.addEventListener('click', function (e) {
    console.log(e.target)
    if (!e.target.className.includes('btn-add-to-basket')) {
      modal(pizza);
    }
  });
  pizzaItem.appendChild(card);

  return pizzaItem;
}

// function render pizza list
function renderPizzas(pizzaArr) {
  pizzaListBlock.innerHTML = '';

  const fragment = document.createDocumentFragment();

  pizzaArr.forEach((pizza => {
    const pizzaItem = cardTemplate(pizza);
    fragment.appendChild(pizzaItem);
  }));

  pizzaListBlock.appendChild(fragment);
}

// loaded pizza list
renderPizzas(pizzaList);

// function sort pizza list
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
  renderPizzas(sortPizzas(pizzaList, sortSelect.value));
}

// function search pizza
const searchForm = document.querySelector('.form-search');

const searchPizzas = () => {
  // get input for search
  const searchInputValue = searchForm.querySelector('input[type="search"]').value;

  const result = pizzaList.filter(pizza => {
    const namesSearch = pizza.name.toLocaleLowerCase().includes(searchInputValue.toLocaleLowerCase());
    const compositionsSearch = pizza.composition.join(', ').toLocaleLowerCase().includes(searchInputValue.toLocaleLowerCase());

    return namesSearch || compositionsSearch;
  })

  renderPizzas(result);
}

searchForm.oninput = searchPizzas;

// function filter pizza list by Price
const filterByPrice = (e) => {
  e.preventDefault();

  let min = pizzaList.reduce((acc, curr) => acc.price < curr.price ? acc : curr);
  let max = pizzaList.reduce((acc, curr) => acc.price > curr.price ? acc : curr);

  minPrice.placeholder = min.price;
  maxPrice.placeholder = max.price;

  const minPriceValue = minPrice.value ? minPrice.value : min.price;
  const maxPriceValue = maxPrice.value ? maxPrice.value : max.price;

  const result = pizzaList.filter(item => item.price >= minPriceValue && item.price <= maxPriceValue)
  renderPizzas(result);
}

const filterPrice = document.querySelector('.filter-price')
const btnFilterByPrice = filterPrice.querySelector('.btn');
btnFilterByPrice.addEventListener('click', filterByPrice);

// function filter pizza list by Caloricity
const filterByCalorisity = (e) => {
  e.preventDefault();

  let min = pizzaList.reduce((acc, curr) => acc.caloricity < curr.caloricity ? acc : curr);
  let max = pizzaList.reduce((acc, curr) => acc.caloricity > curr.caloricity ? acc : curr);

  minCaloricity.placeholder = min.caloricity;
  maxCaloricity.placeholder = max.caloricity;

  const minCaloricityValue = minCaloricity.value ? minCaloricity.value : min.caloricity;
  const maxCaloricityValue = maxCaloricity.value ? maxCaloricity.value : max.caloricity;

  const result = pizzaList.filter(item => item.caloricity >= minCaloricityValue && item.caloricity <= maxCaloricityValue)
  renderPizzas(result);
}

const filterCaloricity = document.querySelector('.filter-caloricity');
const btnFilterByCaloricity = filterCaloricity.querySelector('.btn');
btnFilterByCaloricity.addEventListener('click', filterByCalorisity);

// clear filters
document.querySelector('.btn-reset').addEventListener('click', function (e) {
  e.preventDefault();
  this.parentNode.reset();
  renderPizzas(pizzaList);
})

// 1. Выводить информацию о пицце в модальном окне при клике на карточку с пиццей
const modal = (pizza) => {
  const modal = document.getElementById('modal');
  const modalContent = modal.querySelector('.modal__content');
  const close = modal.getElementsByClassName("modal__close")[0];

  modalContent.innerHTML = '';
  modalContent.appendChild(cardTemplate(pizza));
  modalContent.appendChild(close)

  modal.style.display = "flex";

  close.onclick = function () {
    modal.style.display = "none";
  }

  window.onclick = function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  }
}


// 2. Добавить кнопку "Создать пиццу" в header.
const btnModalOpen = document.querySelector('.btn-modal-open');
btnModalOpen.addEventListener('click', (e) => {
  e.stopPropagation();

  const modalCreatePizza = document.getElementById('modal-create-pizza');
  modalCreatePizza.style.display = "flex";

  const modalContent = modalCreatePizza.querySelector('.modal__content');

  // get form create pizza
  const formCreatePizza = modalContent.querySelector('.form-create-pizza');
  formCreatePizza.innerHTML = '';

  const pizzaImg = document.createElement('div');
  pizzaImg.classList.add('form-group');
  pizzaImg.innerHTML = `
    <input type="file" onchange="previewFile()"><br>
    <img id="pizzaImg" src="" height="200" alt="Image preview...">`;
  formCreatePizza.appendChild(pizzaImg);

  // create block pizza name
  const pizzaName = document.createElement('div');
  pizzaName.classList.add('form-group');
  pizzaName.innerHTML = `<input type="text" class="pizza-name form-control" placeholder="Название пиццы...">`;
  formCreatePizza.appendChild(pizzaName);

  // create block for pizza compozition
  const pizzaComposition = document.createElement('div');
  pizzaComposition.className = 'form-group pizza-composition';
  // filling the block with ingredients
  for (const ingredient of compositionList) {
    const formCheck = document.createElement('div');
    formCheck.classList.add('form-check', 'form-check-inline');
    formCheck.innerHTML = `
      <input class="form-check-input" type="checkbox" id="checkbox${ingredient.id}" value="${ingredient.name}">
      <label class="form-check-label" for="checkbox${ingredient.id}">${ingredient.name}</label>
    `

    pizzaComposition.appendChild(formCheck);
  }

  formCreatePizza.appendChild(pizzaComposition);

  // add button create pizza
  const btnCreatePizza = document.createElement('button');
  btnCreatePizza.className = 'btn btn-primary btn-create-pizza';
  btnCreatePizza.textContent = 'Создать';
  formCreatePizza.appendChild(btnCreatePizza);

  btnCreatePizza.addEventListener('click', function (e) {
    e.stopPropagation();
    e.preventDefault();
    cretePizza()
  })


  const close = modalCreatePizza.getElementsByClassName("modal__close")[0];
  close.onclick = function () {
    modalCreatePizza.style.display = "none";
  }

  window.onclick = function (e) {
    if (e.target === modalCreatePizza) {
      modalCreatePizza.style.display = "none";
    }
  }
});


function cretePizza() {
  const formCreatePizza = document.querySelector('.form-create-pizza');
  const pizzaImgSrc = document.getElementById('pizzaImg').src;
  console.log(pizzaImgSrc)
  const pizzaNameValue = formCreatePizza.querySelector('.pizza-name').value;
  const pizzaComposition = formCreatePizza.querySelector('.pizza-composition');
  const composition = pizzaComposition.querySelectorAll('input[type="checkbox"]');
  let compositionCheckedValue = Array.from(composition)
    .filter(item => item.checked)
    .map(item => item.value);

  let pizzaPrice = 0;
  let pizzaCaloricity = 1000;
  for (const ingredient of compositionList) {
    compositionCheckedValue.forEach(item => {
      if (ingredient.name === item) {
        pizzaPrice += ingredient.price;
        pizzaCaloricity += ingredient.caloricity;
      }
    })
  }

  if (pizzaNameValue && compositionCheckedValue && pizzaPrice) {
    const pizza = {
      id: pizzaList.length + 1,
      img: pizzaImgSrc,
      name: pizzaNameValue,
      composition: compositionCheckedValue,
      caloricity: pizzaCaloricity,
      price: pizzaPrice,
      selfCreated: true,
    }

    pizzaList.unshift(pizza);
    setPizzasListToLS();
    renderPizzas(pizzaList);
  }
}

//3. Добавить возможность при создании пиццы загружать изображение с пиццей.
function previewFile() {
  var preview = document.getElementById('pizzaImg');
  var file = document.querySelector('input[type=file]').files[0];
  var reader = new FileReader();
  console.log(reader)

  reader.onloadend = function () {
    preview.src = reader.result;
  }

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
}