// 1. Создайте класс Condidate который будет принимать параметром объект из массива condidateArr. Добавить геттер state который вернет штат в котором живает наш кондидат. Информация о штате находится в свойстве address и это третья запись после запятой. свойства передаем с помощью Object.assign

class Candidate {
  constructor(obj) {
    Object.assign(this, obj);
  }

  get state() {
    return this.address.split(',')[2];
  }

  // task 2
  get registeredFormat() {
    return new Date(this.registered.split(' '[0]));
  }

  // task 4
  get allFriends() {
    return (this.friends.map(item => item.name.split(' ')[0])).join(', ');
  }

  // task 7
  get addressInfo() {
    let arr = (this.address.split(', '));
    return { street: arr[0], city: arr[1], state: arr[2], postalCode: arr[3] };
  }
}

const candidate = new Candidate(condidateArr[0]);
console.log(candidate.state);

const candidatesArr = condidateArr.map(item => new Candidate(item));


// 2. Форматировать у каждого экзепляра Condidate registered, так что бы оно было  представленно в виде js данных Date.
console.log(candidate.registeredFormat);


// 3. Создать функцию которая будет удалять людей из массива condidateArr по индексу, который мы передадим параметром.
const removeUser = (arr, index) => arr.splice(index, 1);

removeUser(condidateArr, 1);
console.log(condidateArr);


// 4. Создать геттер allFriends, котрый вернет строкой имена всех друзей, но без фамилии. Используем join.
console.log(candidate.allFriends);


// 5. Создать функцию которая вернет все ключи обьекта переданного параметром
const getAllKeys = (obj) => Object.keys(obj);
console.log(getAllKeys(condidateArr[0]));


// 6. Создать функцию которая вернет все значения обьекта переданного параметром
const getAllValues = (obj) => Object.values(obj);
console.log(getAllValues(condidateArr[0]));


// 7. Создать геттер addressInfo, котрый вернет объектом информацию об адресе кондидата.
console.log(candidate.addressInfo);


//! Additionl task
// 8. Содать функцию,где мы первым параметром передадим объект с новым кандидатом, а вторым id любого кондидата в массиве condidateArr. Функция должна будет вставить кандидата созданного через конструктор Condidate на основе данных из первого параметра в массив перед кондидатом у которого id равно тому что передали в параметре
const newCandidate = {
  "_id": "5e216bc9a6059760578aefa4",
  "index": 66,
  "guid": "e325a387-e1f4-4c1a-8df8-f188b06e3a2a",
  "isActive": true,
  "balance": "$3,365.14",
  "picture": "http://placehold.it/32x32",
  "age": 34,
  "eyeColor": "brown",
  "name": "Bernice Walton",
  "gender": "female",
  "company": "EZENT",
  "email": "bernicewalton@ezent.com",
  "phone": "+1 (803) 433-2863",
  "address": "229 Granite Street, Durham, Colorado, 6084",
  "about": "Nisi cupidatat excepteur non in et ex consequat dolor. Esse exercitation id culpa non. Eiusmod cupidatat est esse dolor ex ex dolor labore exercitation. Reprehenderit dolor velit magna voluptate irure do nulla aliquip enim. Aute sit veniam tempor nulla irure sit culpa culpa excepteur labore nostrud cupidatat. Eu amet dolor culpa dolor pariatur ipsum labore. Minim ad qui qui culpa consequat amet id irure culpa tempor esse eu.\r\n",
  "registered": "2015-11-05T05:14:05 -02:00",
  "latitude": -31.58974,
  "longitude": -174.55185,
  "tags": ["quis", "ad", "amet", "Lorem", "et", "magna", "ut"],
  "friends": [
    {
      "id": 0,
      "name": "Clayton Mccarthy"
    },
    {
      "id": 1,
      "name": "Odonnell Sharp"
    },
    {
      "id": 2,
      "name": "Marisol Olsen"
    },
    {
      "id": 3,
      "name": "Audrey Henson"
    },
    {
      "id": 4,
      "name": "Dickson Maxwell"
    },
    {
      "id": 5,
      "name": "Trudy Singleton"
    },
    {
      "id": 6,
      "name": "Tyson Ayala"
    },
    {
      "id": 7,
      "name": "Sharron Porter"
    },
    {
      "id": 8,
      "name": "Lenore Cleveland"
    },
    {
      "id": 9,
      "name": "Shelton Curtis"
    }
  ],
  "greeting": "Hello, Bernice Walton! You have 4 unread messages.",
  "favoriteFruit": "strawberry"
}

const insertIntoarr = (obj, id) => {
  return candidatesArr.splice(id, 0, new Candidate(obj));
}

insertIntoarr(newCandidate, 4)
console.log(candidatesArr);