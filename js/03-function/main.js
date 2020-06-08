let jobTitle = prompt("Введите название задания", "");

switch (jobTitle) {
  case "switch: sizes":
    let size = +prompt("Введите размер одежды в укр. системе", "");
    convertSizes(size);
    break;

  case "switch: if":
    var color = prompt("Введите цвет", "");
    setBgColor(color);
    break;

  case "prompt: or":
    alert(userAge());
    break;

  case "confirm: or this days":
    alert(shopping());
    break;

  case "confirm: if this days":
    shoppingUsingIf();
    break;

  case "triple prompt":
    deriveFullName();
    break;

  case "default: or":
    deriveFullNameUsingOr();
    break;

  case "default: if":
    deriveFullNameUsingIf();
    break;

  case "login and password":
    userVerification();
    break;

  case "currency calc":
  case "currency calc: improved":
  case "currency calc: two rates":
    currencyCalc();
    break;

  case "currency calc: if":
    currencyCalcUsingIf();
    break;

  case "scissors":
    scissors();
    break;

  case "Задание на синий пояс":
    currencyCalcUsingObj();
    break;

  case "Задание на черный пояс":
    scissorsLogicalOperations();
    break;

  default:
    alert("Неверное название задания");
    break;
}

// switch: sizes
function convertSizes(sizeUA) {
  let sizeUSA;
  if (sizeUA) {
    switch (sizeUA) {
      case 40:
        sizeUSA = 6;
        break;
      case 42:
        sizeUSA = 8;
        break;
      case 44:
        sizeUSA = 10;
        break;
      case 46:
        sizeUSA = 12;
        break;
      case 48:
        sizeUSA = 14;
        break;
      case 50:
        sizeUSA = 16;
        break;
      case 52:
        sizeUSA = 18;
        break;
      case 54:
        sizeUSA = 20;
        break;
      default:
        sizeUSA = '"неизвестное значение"';
        break;
    }
    alert(`Размер ${sizeUA} в американской системе равен ${sizeUSA}`);
  } else {
    alert('До свидания!')
  }
}
//============================================================================================

// switch: if
function setBgColor(color) {
  if (color == "red") {
    document.write("<div style='background-color: red;'>красный</div>");
    document.write("<div style='background-color: black; color: white;'>черный</div>");
  } else if (color == "black") {
    document.write("<div style='background-color: black; color: white;'>черный</div>");
  } else if (color == "blue") {
    document.write("<div style='background-color: blue;'>синий</div>");
    document.write("<div style='background-color: green;'>зеленый</div>");
  } else if (color == "green") {
    document.write("<div style='background-color: green;'>зеленый</div>");
  } else {
    document.write("<div style='background-color: gray;'>Я не понял</div>");
  }
}
//============================================================================================

// prompt: or
function userAge() {
  let now = new Date();
  let nowYear = now.getFullYear();
  let userAge = +prompt("Сколько Вам лет:", '');
  return userAge && "Ваш год рождения " + (nowYear - +userAge) || "Вы ничего не ввели!!!";
}
//============================================================================================


// confirm: or this days
function shopping() {
  return confirm("шопинг?") && "класс" || "ты - бяка";
}
//============================================================================================

// confirm: if this days
function shoppingUsingIf() {
  if (confirm("шопинг?")) {
    alert("класс");
  } else {
    alert("ты - бяка");
  }
}
//============================================================================================

// triple prompt
function deriveFullName() {
  let surname = prompt("Фамилия", "");
  let name = prompt("Имя", "");
  let fathername = prompt("Отчество", "");
  alert(`ФИО - ${surname} ${name} ${fathername}`);
}
//============================================================================================

// default: or
function deriveFullNameUsingOr() {
  let surname = prompt("Фамилия", "") || "Иванов";
  let name = prompt("Имя", "") || "Иван";
  let fathername = prompt("Отчество", "") || "Иванович";
  alert(`ФИО - ${surname} ${name} ${fathername}`);
}
//============================================================================================

// default: if
function deriveFullNameUsingIf() {
  let surname = prompt("Фамилия", "");
  if (!surname) {
    surname = "Иванов";
  }
  let name = prompt("Имя", "");
  if (!name) {
    name = "Иван";
  }
  let fathername = prompt("Отчество", "");
  if (!fathername) {
    fathername = "Иванович";
  }
  alert(`ФИО - ${surname} ${name} ${fathername}`);
}
//============================================================================================

// login and password
function userVerification() {
  const user = {
    login: "Admin",
    password: "qwerty"
  }

  let login = prompt("Введите логин", "");
  if (login === user.login) {
    let password = prompt("Введите пароль", "");
    if (password === user.password) {
      alert(`Вы успешно вошли как ${login}!`);
    } else {
      alert("Не верный пароль!");
    }
  } else {
    alert("Не верный логин!");
  }
}
//============================================================================================

/**
 ** currency calc 
 *! +
 ** currency calc: improved    
 *! +
 ** currency calc: two rates     
 */
function currencyCalc() {
  let currency = prompt("Введите валюту: usd, eur", "").toLowerCase();
  let currency2Uah;
  switch (currency) {
    case 'usd':
      currency2Uah = confirm("Покупка - ОК, Продажа - Отмена") ? 27.973 : 28.669;
      currencyIcon = "$"
      break;
    case 'eur':
      currency2Uah = confirm("Покупка - ОК, Продажа - Отмена") ? 30.331 : 31.512;
      currencyIcon = "€";
      break;
    default:
      alert('Неизвестная валюта');
      break;
  }
  if (currency2Uah) {
    let uahValue = +prompt("Введите сумму в грн.", "");
    let currencyValue;
    if (uahValue) {
      currencyValue = +(uahValue / currency2Uah).toFixed(3);
      alert(`${uahValue} ₴ = ${currencyValue} ${currencyIcon}`);
    } else {
      alert("Вы ничего не ввели");
    }
  }
}
//============================================================================================

// currency calc: if
function currencyCalcUsingIf() {
  let currency = prompt("Введите валюту: usd, eur", "").toLowerCase();
  let currency2Uah;
  if (currency === "usd") {
    currency2Uah = confirm("Покупка - ОК, Продажа - Отмена") ? 27.973 : 28.669;
    currencyIcon = "$"
  } else if (currency === "eur") {
    currency2Uah = confirm("Покупка - ОК, Продажа - Отмена") ? 30.331 : 31.512;
    currencyIcon = "€";
  } else {
    alert('Неизвестная валюта');
  }

  if (currency2Uah) {
    let uahValue = +prompt("Введите сумму в грн.", "");
    let currencyValue;
    if (uahValue) {
      currencyValue = +(uahValue / currency2Uah).toFixed(3);
      alert(`${uahValue} ₴ = ${currencyValue} ${currencyIcon}`);
    } else {
      alert("Вы ничего не ввели");
    }
  }
}
//============================================================================================

// scissors
function scissors() {
  const objPlay = {
    1: "камень",
    2: "ножницы",
    3: "бумага"
  }

  let userOption = prompt("Сделайте Ваш выбор (камень, ножницы, или бумага)", "");
  if (userOption) {
    userOption = userOption.toLowerCase();
    let randOption = objPlay[Math.floor(1 + Math.random() * 3)];
    alert(randOption);
    if ((userOption === "камень" && randOption === "ножницы") || (userOption === "ножницы" && randOption === "бумага") || (userOption === "бумага" && randOption === "камень")) {
      alert("Вы победили");
    } else if (userOption === randOption) {
      alert("Ничья");
    } else {
      alert("Вы проиграли");
    }
  } else {
    alert("Вы ничего не ввели!")
  }
}
//============================================================================================

// Задание на синий пояс
function currencyCalcUsingObj() {
  const ratios = {
    usd: {
      buy: 27.973,
      sale: 28.669
    },
    eur: {
      buy: 30.331,
      sale: 31.512
    }
  }

  let currency = prompt("Введите валюту: usd, eur", "").toLowerCase();
  let currency2Uah;
  if (currency === "usd") {
    currency2Uah = confirm("Покупка - ОК, Продажа - Отмена") ? ratios["usd"]["buy"] : ratios["usd"]["sale"];
    currencyIcon = "$"
  } else if (currency === "eur") {
    currency2Uah = confirm("Покупка - ОК, Продажа - Отмена") ? ratios["eur"]["buy"] : ratios["eur"]["sale"];
    currencyIcon = "€";
  } else {
    alert('Неизвестная валюта');
  }

  if (currency2Uah) {
    let uahValue = +prompt("Введите сумму в грн.", "");
    let currencyValue;
    if (uahValue) {
      currencyValue = +(uahValue / currency2Uah).toFixed(3);
      alert(`${uahValue} ₴ = ${currencyValue} ${currencyIcon}`);
    } else {
      alert("Вы ничего не ввели");
    }
  }
}
//============================================================================================

// Задание на черный пояс
function scissorsLogicalOperations() {
  const objPlay = {
    1: "камень",
    2: "ножницы",
    3: "бумага"
  };
  let userChoice, randChoice;
  (userChoice = prompt("Сделайте Ваш выбор (камень, ножницы, или бумага)", "")) && !alert(randChoice = objPlay[Math.floor(1 + Math.random() * 3)]) && (((userChoice === "камень" && randChoice === "ножницы") || (userChoice === "ножницы" && randChoice === "бумага") || (userChoice === "бумага" && randChoice === "камень")) && !alert("Вы победили") || (userChoice === randChoice) && !alert("Ничья") || !alert("Вы проиграли")) || alert("Вы ничего не ввели!");
}
//============================================================================================