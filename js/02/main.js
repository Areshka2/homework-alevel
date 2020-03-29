/**
 ** assign: evaluation
 ** Исследуйте код, найдите выражения в нём. Расставьте скобки так, что бы код не изменил своего поведения (работал так же как и сейчас). Объясните как и в каком порядке вычисляются выражения и подвыражения.
 */
// В JS выражения вычисляються слева на право. Приоритет операторов определяют порядок их выполнения в комплексных выражениях.
var a = (5);
//сначала будет вычислено выражение (5), которое присваивается в переменную а.
var b, c;
// создаются не определенные переменные b, c
(b) = ((a) * (5));
//сначала будет вычислено подвыражение (b), затем в (а) подставляется значение (5). После этого будет выполнено умножение (5*5). Результат (25) присваивается переменной (b).
(b) = (((c) = (b) / (2)));
//сначала вычисляется подвыражение (b), затем выражение (с=b/2), в (b) подставляется значение (25). Выполняется деление 25/2. Результат деления (12,5) присваивается переменной (с), а затем (b).
console.log(b);


/**
 ** semicolon: error
 ** Сделайте несколько примеров кода, отсутствие ; в которых приводит к синтаксической ошибке
 */
//1. в примере ниже, при присваивании без точки с запятой, выражение (2+1) будет считаться как вызов функции
// const i = 0
// (2+1).toString();
//2. JavaScript не вставляет точку с запятой перед квадратными скобками [...]
// alert("Сейчас будет ошибка")
// [1, 2].forEach(alert)
//3. в цикле for указаны параметры через запятую, а не через точку с запятой
// for (let i = 0, i < 3; i++) {}


/**
 ** semicolon: mistake
 ** Сделайте несколько примеров кода, наличиe или отсутствие ; в которых приводит к логической ошибке (т. е. код выполняется без синтаксических ошибок, но делает не то, что задумано)
 */
//последний alert будет срабатывать всегда.
// if (+age < 18) alert("Рано вам еще");
// else; alert("Смотрите на здоровье");


/**
 ** Number: age
 ** С помощью prompt спросить у пользователя его возраст и подсчитать год рождения. Год рождения вывести с помощью alert.
 */
// let now = new Date();
// let nowYear = now.getFullYear();
// let userAge = +prompt("Сколько Вам лет:", '');
// let message = userAge ? "Ваш год рождения " + (nowYear - userAge) : "До свидания!!!";
// alert(message);


/**
 ** Number: temperature
 ** С помощью prompt спросить у пользователя температуру в градусах Цельсия и перевести их в Фаренгейты и/или наоборот.
 */
// let temperatureCelsius = prompt("Введите температуру в градусах Цельсия:", '');
// let temperatureFahrenheit = temperatureCelsius * 1.8 + 32;
// alert('Фаренгейт: ' + temperatureFahrenheit);
// temperatureFahrenheit = prompt("Введите температуру в градусах Фаренгейт:", '');
// temperatureCelsius = (temperatureFahrenheit - 32) / 1.8;
// alert('Цельсий: ' + temperatureCelsius);


/**
 ** Number: divide
 ** Сделайте калькулятор для расчета деления нацело двух чисел. Используйте Math.floor или альтернативы.
 */
// let number1 = +prompt("Введите первое число:", "");
// let number2 = +prompt("Введите второе число:", "");
// let result = Math.floor(number1 / number2);
// alert(result);


/**
 ** Number: odd
 ** С помощью prompt узнайте число, введенное пользователем. С помощью if проверьте что число корректно преобразовано из строки. В случае ошибки выведите сообщение Выведите четное число или нет, используя if.
 */
// let number = prompt("Введите число:", "");
// if (isNaN(parseInt(number))) {
//   alert("Ошибка, Not a number");
// } else {
//   if (number % 2 == 0) {
//     alert("Число четное!");
//   } else {
//     alert("Число не четное!");
//   }
// }


/**
 ** String: greeting
 ** Спросите у пользователя имя, и поприветствуйте его с помощью alert.
 */
// let userName = prompt("Как вас зовут?", "");
// if (userName) {
//   alert(`Привет, ${userName} !!!`);
// } else {
//   alert("Ошибка, вы не ввели имя")
// }


/**
 ** String: lexics
 ** Спросите у пользователя текст, и проверьте его на наличие некорректного слова или нескольких некорректных слов. Используйте метод indexOf (или includes) строки:
 */
// let textIndex = prompt("Введите текст", "").indexOf("text");
// let message = textIndex == -1 ? "Все Ок" : "Найдены некоректные слова";
// alert(message);


/**
 ** confirm
 ** Поэкспериментируйте с confirm, определите тип данных, который он возвращает, и конкретные значения этого типа данных.
 */
// confirm возвращает тип данных boolean
// if (confirm("Подтвердите действие")) {
//   alert("При нажатии ОК возвращает true");
// } else {
//   alert("При нажатии Отмена возвращает false");
// }


/**
 ** Boolean
 ** Напишите код, который спрашивает те или иные вопросы с ответом "да"/"нет" с помощью confirm, и сохраняет ответы в переменных.
 */
// let isAdmin = confirm("Вы - Администратор?") ? "Да" : "Нет";


/**
 ** Boolean: if
 ** Расширьте предыдущее задание условиями по полученным переменным условиями (if else). Например, если вы спрашиваете пол пользователя с помощью confirm, то по условию сделайте alert("Вы женщина") и alert("Вы мужчина")
 */
// let isAdmin = confirm("Вы - Администратор?");
// if (isAdmin) {
//   alert("Вы Администратор!");
// } else {
//   alert("Вы обычный пользователь!");
// }


/**
 ** Array: real
 ** Понаходите в вашей жизни вещи, которые похожи на массивы, и другие вещи, которые можно смоделировать с помощью массивов.
 */
// 1. Покупки. Каждый товар - это элемент массива.
// 2. Книги на полке. 


/**
 ** Array: booleans
 ** Создайте массив с переменными из заданий Boolean и Boolean if.
 */
// let arr = [true, false];


/**
 ** Array: plus
 ** Напишите код, который складывает первые два элемента массива и заносит это в элемент с индексом 2. Исследуйте полученный массив.
 */
let arr = [10, 8];
arr[2] = arr[0] + arr[1];
console.log(arr);


/**
 ** Array: plus string
 ** Что будет, если в предыдущий примере использовать строки вместо чисел? Сделайте версию для сложения 3х значений. Подумайте, зачем нужна эта возможность в наших примерах.
 */
let arrStr = ["I", "learn", "JS"];
arrStr[3] = arrStr[0] + arrStr[1] + arrStr[2];
console.log(arrStr);


/**
 ** Object: real
 ** Найдите те или иные реальные объекты и найдите их свойства. Например у маркера это цвет, толщина, уровень зарядки (количество краски), у автомобиля - бренд, модель, мощность двигателя, цвет и так далее. Создайте объекты с помощью {}. В качестве образца посмотрите объект персоны из материала предыдущего занятия
 */
let car = {
  model: "Audi",
  color: "red",
  power: 250
}

let book = {
  name: "Хоббит",
  author: "Толкин",
  pages: 350
}

/**
 ** Object: change
 ** Поменяйте значения свойств в ваших объектах, используя [] и . и присвоения.
 */
car.model = "BMW";
car['color'] = "black";
console.table(car);

book.name = "Игра престолов";
book['author'] = "Джексон";
console.table(book);

/**
 ** Comparison if
 ** Добавьте условие отрицательного возраста в пример выше. Расставьте недостающие (но синтаксически необязательные) фигурные скобки. Выкиньте лишнее из текущего кода
 */
// var age = +prompt("Сколько вам лет?", "");
// if (age < 0) {
//   alert("еще не родился");
// } else if (age < 18) {
//   alert("школьник");
// } else if (age > 18 && age < 30) {
//   alert("молодеж");
// } else if (age > 30 && age < 45) {
//   alert("зрелость");
// } else if (age > 45 && age < 60) {
//   alert("закат");
// } else if (age > 60) {
//   alert("как пенсия?");
// } else {
//   alert("то ли киборг, то ли ошибка");
// }


/**
 ** Comparison: sizes
 ** Сделайте перевод из нашей системы размеров в американскую или любую на выбор. Используйте prompt, условия сравнения и alert.
 */
// const sizeUA = [40, 42, 44, 46, 48, 50, 52, 54];
// const sizeUSA = [6, 8, 10, 12, 14, 16, 18, 20];
// let size = +prompt("Введите размер одежды в укр. системе", "");
// if (size) {
//   alert(`Размер ${size} в американской системе равен ${sizeUSA[sizeUA.indexOf(size)]}`);
// } else {
//   alert("Ошибка. Вы ничего не ввели.");
// }


/**
 ** Comparison: object
 ** Подумайте о том, как можно применить объекты к предыдущем заданию.
 */
// let sizes = {
//   UA: [40, 42, 44, 46, 48, 50, 52, 54],
//   USA: [6, 8, 10, 12, 14, 16, 18, 20]
// }
// let size = +prompt("Введите размер одежды в украинской системе", "");
// if (size) {
//   alert(`Размер ${size} в американской системе равен ${sizes.USA[sizes.UA.indexOf(size)]}`);
// } else {
//   alert("Ошибка. Вы ничего не ввели.");
// }


/**
 ** Ternary
 ** Спросите у пользователя пол (confirm). Выведите с помощью alert "Вы мужчина" или "Вы женщина". *Сделайте это оператором alert. Используйте тернарный оператор.
 */
// let gender = confirm("Вы мужчина?") ? "Вы мужчина" : "Вы женщина";
// alert(gender);


/**
 ** Синий пояс Number: flats
 ** Сделайте калькулятор, который позволит вам исходя из информации о количества этажей в доме и количества квартир на этаже находить подъезд и этаж определенной квартиры по её номеру. Например для 9этажного дома по 4 квартиры на этаж 81 квартира находится на 3м этаже третьего подъезда.
 */
let floors = 9; // ко-во этажей
let flatsPerFloor = 4; // ко-во квартир на этаже
let flatNumber = 81; // номер квартиры
let flatsPerPorch = floors * flatsPerFloor; // ко-во квартир в подьезде
let porchNumber = Math.ceil(flatNumber / flatsPerPorch); // номер подьезда
let floorNumber = Math.ceil((flatNumber % flatsPerPorch) / flatsPerFloor); // номер этажа
if (floorNumber == 0) {
  floorNumber = 9;
}
console.log(flatNumber + " квартира находится на " + floorNumber + " этаже " + porchNumber + " подьезда!");