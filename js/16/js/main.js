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

    setPizzasListToLS();
    renderPizzas(pizzaList);
  })

  // create bnt add to cart 
  const btnAddToCart = document.createElement('button');
  btnAddToCart.className = 'btn btn-add-to-basket d-block';
  btnAddToCart.textContent = "+";

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
  `;
  card.appendChild(btnFavorite);
  card.appendChild(btnAddToCart);

  //HW-16 track the click event 
  btnAddToCart.addEventListener('click', function (e) {
    e.stopPropagation();
    addToCart(pizza); // add pizza to the cart
  });

  // Display information about pizza in a modal window when clicking on a pizza card
  card.addEventListener('click', function (e) {
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

  const result = pizzaList.filter(item => item[option] >= minPriceValue && item[option] <= maxPriceValue)
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

const modal = (pizza) => {
  const modal = document.getElementById('modal');
  const modalContent = modal.children[0];
  const close = modalContent.getElementsByClassName("modal__close")[0];

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

const btnModalOpen = document.querySelector('.btn-modal-open');
btnModalOpen.addEventListener('click', () => {
  openCloseModal();
});

function openCloseModal() {
  // get modal block
  const modal = document.getElementById('modal-create-pizza');
  modal.classList.add('modal--active');

  // get form create pizza
  const formCreatePizza = modal.querySelector('.form-create-pizza');
  formCreatePizza.innerHTML = '';

  // create block pizza img
  const pizzaImgBlock = document.createElement('div');
  pizzaImgBlock.classList.add('form-group');

  pizzaImgBlock.innerHTML = `
      <input id="img-upload" type="file">
      <img id="pizzaImg" src="" height="100" alt="Image preview...">`;
  formCreatePizza.appendChild(pizzaImgBlock);
  document.querySelector('#img-upload').addEventListener('change', previewFile);

  // create block pizza name
  const pizzaNameBlock = document.createElement('div');
  pizzaNameBlock.classList.add('form-group');
  pizzaNameBlock.innerHTML = `<input type="text" class="pizza-name form-control" placeholder="Название пиццы...">`;
  formCreatePizza.appendChild(pizzaNameBlock);

  // create block for pizza compozition
  const pizzaCompositionBlock = document.createElement('div');
  pizzaCompositionBlock.className = 'form-group pizza-composition';

  // filling the block with ingredients
  for (const ingredient of compositionList) {
    const formCheck = document.createElement('div');
    formCheck.classList.add('form-check', 'form-check-inline');
    formCheck.innerHTML = `
        <input class="form-check-input" type="checkbox" id="checkbox${ingredient.id}" value="${ingredient.name}">
        <label class="form-check-label" for="checkbox${ingredient.id}">${ingredient.name}</label>`

    pizzaCompositionBlock.appendChild(formCheck);
  }

  formCreatePizza.appendChild(pizzaCompositionBlock);

  // add button create pizza
  const btnCreatePizza = document.createElement('button');
  btnCreatePizza.className = 'btn btn-primary btn-create-pizza';
  btnCreatePizza.type = 'submit';
  btnCreatePizza.textContent = 'Создать';
  formCreatePizza.appendChild(btnCreatePizza);

  formCreatePizza.addEventListener('submit', function (e) {
    e.preventDefault();
    cretePizza();
    modal.classList.remove('modal--active');
  })

  const close = modal.getElementsByClassName("modal__close")[0];
  close.onclick = function () {
    modal.classList.remove('modal--active');
  }

  window.onclick = function (e) {
    if (e.target === modal) {
      modal.classList.remove('modal--active');
    }
  }
}

// function create new Pizza
function cretePizza() {
  const formCreatePizza = document.querySelector('.form-create-pizza');
  const pizzaImgSrc = document.getElementById('pizzaImg').src;
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

// function conver img to base64
const convertToBase64 = file => {
  const fileReader = new FileReader();

  return new Promise((resolve, reject) => {
    fileReader.onerror = () => {
      fileReader.abort()
      reject("Problem parsing input file.");
    }
    fileReader.onload = () => {
      resolve(fileReader.result);
    }
    fileReader.readAsDataURL(file);
  })
}

// function set src to preview img
const previewFile = async (e) => {
  const preview = document.getElementById('pizzaImg');
  const file = e.target.files[0];

  try {
    preview.src = file ? await convertToBase64(file) : "";
  } catch (e) {
    console.warn(e.message)
  }
}

//HW-16 get cart data from localStorage
function getCartData() {
  return JSON.parse(localStorage.getItem('cart'));
}

//HW-16 set cart data to localStorage
function setCartData(data) {
  localStorage.setItem('cart', JSON.stringify(data));
  return false;
}

// HW-16 function add pizza to cart
function addToCart(pizza) {
  var cartData = getCartData() || [];
  let findPizzaById = cartData.find(item => item.id === pizza.id)

  if (findPizzaById) {
    findPizzaById.count += 1;
  } else {
    pizza.count = 1;
    cartData.push(pizza);
  }

  setCartData(cartData);
}