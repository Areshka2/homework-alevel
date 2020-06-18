const arrOfUsers = []
for (let i = 0; i < 50; i++) {
  let fakeData = faker.helpers.createCard()
  arrOfUsers.push(fakeData)
}
// =========================================================================================

// 1. Cоздать функцию-конструктор Customer. Создаем функцию которая будет пушить в новый массив cutomerInstancessArr экземпляры созданные через new Customer(customer). Данные лежат в массиве arrOfUsers. У каждого созданного экзепляра должен быть уникальный id (cсоздаем в функции конструкторе)

class Customer {
  constructor({ name, username, email, address, phone, website, company, posts, accountHistory }) {
    this.id = Customer.id++;
    this.name = name;
    this.username = username;
    this.email = email;
    this.address = address;
    this.phone = phone;
    this.website = website;
    this.company = company;
    this.posts = posts;
    this.accountHistory = accountHistory;
  }

  static id = 1;
}

const createCustomersByConstructor = arrOfUsers => {
  let arrOfCustomers = [];

  for (let i = 0; i < arrOfUsers.length; i++) {
    const customer = new Customer(arrOfUsers[i]);
    arrOfCustomers.push(customer);
  }

  return arrOfCustomers;
}

const arrOfCustomers = createCustomersByConstructor(arrOfUsers);
console.table(arrOfCustomers);


// 2. Создать функцию getAllNameSAndEmails который вернет массив с обьектами в которых должны находится имя и email кастомера.

const getAllNameAndEmails = (array) => {
  let arrUserNamesAndEmails = [];

  for (let i = 0; i < array.length; i++) {
    const customer = {};
    let { name, email } = array[i];
    customer.name = name;
    customer.email = email;
    arrUserNamesAndEmails.push(customer);
  }
  return arrUserNamesAndEmails;
}

console.table(getAllNameAndEmails(arrOfCustomers));


// 3. Создать функцию getAllCustomersIdsWithComDomain которая вернет массив с id кастомеров, у которых свойство website имеет доменное имя первого уровня .com (site.com, james-site.com, harvik.com etc.)

const getAllCustomersIdsWithComDomain = (array) => {
  let arrCustomerIds = [];

  for (let i = 0; i < array.length; i++) {
    let { id, website } = array[i];
    const firstLevelDomain = website.split('.').slice(1).join('.');
    if ((firstLevelDomain) === 'com') {
      arrCustomerIds.push(id);
    }
  }

  return arrCustomerIds;
}

console.table(getAllCustomersIdsWithComDomain(arrOfCustomers));


// 4. Создать функцию getAllGmailCustomers которая вернет массив с id кастомеров, у которых свойство email имеет почтовый сервер gmail.com (alex@gmail.com, someHuman@gmail.com, etc.)

const getAllGmailCustomers = (array) => {
  let arrCustomerIds = [];

  for (let i = 0; i < array.length; i++) {
    let { id, email } = array[i];
    const mailServer = email.split('@').slice(1).join('.');

    if ((mailServer) === 'gmail.com') {
      arrCustomerIds.push(id);
    }
  }

  return arrCustomerIds;
}

console.table(getAllGmailCustomers(arrOfCustomers));


// 5. Создать функцию sortByCompanyType которая вернет объект, в котором будут свойства, ключами которых будут типы компаний, а значением этих ключей - массив состоящий из id кастомеров в которых они работают. Тип компании - последние символы в значении customer.company.name. Например: 'Kirlin Group'

const sortByCompanyType = (array) => {
  let companyTypeObj = {};

  for (let i = 0; i < array.length; i++) {
    let { id, company } = array[i];
    let arrTypeCompanySplit = company.name.split(' ');
    let typeOfCompany = arrTypeCompanySplit[arrTypeCompanySplit.length - 1];

    if (typeOfCompany in companyTypeObj) {
      companyTypeObj[typeOfCompany].push(id);
    } else {
      companyTypeObj[typeOfCompany] = [];
      companyTypeObj[typeOfCompany].push(id);
    }
  }

  return companyTypeObj;
}

console.table(sortByCompanyType(arrOfCustomers));


/*
 *Дополнительные задания 
*/
// 6.Содать функцию которая вернет отсортированный массив кастомеров по их общим тратам(свойство accountHistory смотрим на amount). Сортировка по возрастанию.
// 7. Содать функцию которая вернет отсартированный массив кастомеров по их общим тратам (свойство accountHistory смотрим на amount). Сортировка по параметру функции. Параметров может быть 2 вида ('asc', 'desc').

const sortCustomerByAccountHistory = (array, order = 'asc') => {

  const getTotalSpending = (obj) => {

    let { accountHistory } = obj;
    let sumAmount = 0;

    for (let i = 0; i < accountHistory.length; i++) {
      sumAmount += +accountHistory[i].amount;
    }

    return sumAmount;
  }

  array.sort(function (a, b) {
    if (order === 'asc') {
      return getTotalSpending(a) - getTotalSpending(b);
    }

    if (order === 'desc') {
      return getTotalSpending(b) - getTotalSpending(a);
    }
  });

  return arrOfCustomers;
}

console.log(sortCustomerByAccountHistory(arrOfCustomers, 'desc'));