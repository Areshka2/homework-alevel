// 1. Напиши функцию, которая принимает 1 параметр. При первом вызове, она его запоминает, при втором,- суммирует переданый параметр с тем, что передали первый раз и тд
const sum = (sum = 0) => (num) => typeof num === 'number' ? sum += num : sum;

let counter = sum();
console.log(counter(3)); // 3
console.log(counter(5)); // 8
console.log(counter(228)); // 236


// 2. Создать функцию которая будет возвращать массив в котором будут лежать все значения - аргументы переданные в данную функцию. Но если мы ничего не передадим в параметрах, то массив очистится.
const getArrArg = (arr = []) => (arg) => {
  arg ? arr.push(arg) : arr.length = 0;
  return arr;
}

let getUpdatedArr = getArrArg();
console.log(getUpdatedArr(3)); // [3]
console.log(getUpdatedArr(5)); // [3, 5]
console.log(getUpdatedArr({ name: 'Vasya' })); // [3, 5, {}]
console.log(getUpdatedArr()); // []
console.log(getUpdatedArr(4)); // [4]


// 3. Создать класс Room. В нем есть свойство, это kidsArr - массив с объектами типа Kid. Создать новый массив в котором будут находится все экземпляры Kid созданные с помощью обьекта в kidsArr. 
const kidsArr = [
  {
    name: 'Kostya',
    age: 10,
    gender: 'male',
  },
  {
    name: 'Vasya',
    age: 9,
    gender: 'male',
  },
  {
    name: 'Masha',
    age: 9,
    gender: 'female',
  },
  {
    name: 'Mitya',
    age: 8,
    gender: 'male',
  },
];

class Kid {
  constructor(obj) {
    this.id = Kid.id++;
    Object.assign(this, obj);
  }

  static id = 1;
}

const kids = kidsArr.map(item => new Kid(item));
console.log(kids);

class Room {
  constructor(kidsArr, roomNumber) {
    this.kidsArr = kidsArr;
    this.roomNumber = roomNumber;
  }

  get kidsCount() {
    return this.kidsArr.length;
  }

  get femaleCount() {
    return this.kidsArr.filter(item => item.gender === 'female').length;
  }

  get maleCount() {
    return this.kidsArr.filter(item => item.gender === 'male').length;
  }

  get lastKid() {
    return this.kidsArr[this.kidsArr.length - 1];
  }

  set lastKid(value) {
    this.kidsArr.push(new Kid(value));
  }
}

const room = new Room(kids, 101)
console.log(room);

console.log(room.kidsCount);
console.log(room.femaleCount);
console.log(room.maleCount);
console.log(room.lastKid);
room.lastKid = { name: 'Kolya', age: 9, gender: 'male' };
console.log(room.lastKid);
console.log(room.kidsCount);