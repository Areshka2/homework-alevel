// 1. Создать функцию которая в console.log выведет значение count и переменная count будет равна 5.
const mult = (count) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => { resolve(count *= 2) }, 3000);
  })
}

const sum = (result) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => { resolve(result += 1) }, 2000);
  })
}

mult(2).then(res => {
  sum(res).then(result => console.log(result))
})