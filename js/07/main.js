class Candidate {
  constructor(obj) {
    let newObj = Object.assign({}, obj);
    this.address = newObj.address;
    this.company = newObj.company;
  }

  state() {
    return this.address.split(',')[2];
  }
}

const candidate = new Candidate(condidateArr[0]);
console.log(candidate);
console.log(candidate.state());


// 2. Создать функцию которая выведет массив с названиями фирм взятыми из св-ва company. Если фирмы повторяются в массиве, то удалить дубликаты.
const getCompanyNames = arrOfObj => {
  return arrOfObj.map(item => item.company);
};

console.log(getCompanyNames(condidateArr));


// 3. Создать функцию которая выведет мне массив id всех кондидатов, которые были зарагестрированны в том же году что и год указанный в параметре. Помним что сначала желательно отформатировать дату как в предыдущем дз.
const getUsersByYear = (arrOfObj, year = 2017) => {
  let arrId = [];

  arrOfObj.map(item => {
    let getYear = (new Date(Date.parse(item.registered))).getFullYear();
    if (year === getYear) arrId.push(item._id);
  });

  return arrId;
}
console.log(getUsersByYear(condidateArr, 2018));


// 4. Создать функцию которая вернет массив с кондидатами, отфильтрованных по кол-ву непрочитанных сообщений. Смотрим св-во greeting, там указанно это количество в строке, Вам надо достать это число из строки и сверять с тем что в параметер вашей функции.
const getCondidatesByUnreadMsg = (arrOfObj, num = 8) => {
  return arrOfObj.filter(item => {
    let numOfUnreadMsg = +item.greeting.match(/\d+/g);
    return numOfUnreadMsg === num;
  })
}

console.log(getCondidatesByUnreadMsg(condidateArr, 6));


// 5. Создать функцию которая вернет массив по свойству gender.
const getCondidatesByGender = (arrOfObj, gender = 'male') => {
  return arrOfObj.filter(item => item.gender === gender);
}

console.log(getCondidatesByGender(condidateArr, 'male'));


//! Additional task
// 6. Создать функцию reduce, join самому.

//! cusomeReduce
Array.prototype.customReduce = function (cb, startValue) {
  let result = startValue;

  for (let i = 0; i < this.length; i++) {
    result = cb(result, this[i], i);
  }

  return result;
}

let arr = [1, 2, 3, 4, 5];
const result = arr.customReduce((sum, currentItem) => (sum + currentItem), 0);
console.log(result);

//! customJoin
Array.prototype.customJoin = function (separator) {
  let result = '';

  for (let i = 0; i < this.length; i++) {
    if (i == this.length - 1) {
      result += this[i];
    } else {
      result += this[i] + separator;
    }
  }

  return result;
}

let arrName = ['Masha', 'Petya', 'Kolya'];
const str = arrName.customJoin(' - ');
console.log(str);
