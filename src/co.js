const co = require('co')
const fetch = require('node-fetch')

// co包裹，自动执行完毕
// co(function *() {
//   const res = yield fetch('https://api.douban.com/v2/movie/1291843')

//   const movie = yield res.json()
//   const summary = movie.summary

//   console.log('summary', summary)
// })


// - 2 -
// 模拟co
// 把 迭代器generator 迭代成 promise
// co支持：对象，数组，promise，generator，xx函数
// 不支持：字符串、布尔值
function run(generator) {
  const iterator = generator()
  const it = iterator.next()
  const promise = it.value

  promise.then(data => {
    const it2 = iterator.next(data)
    const promise2 = it2.value

    promise2.then(data2 => {
      iterator.next(data2)
    })
  })
}

run(function *() {
  const res = yield fetch('https://api.douban.com/v2/movie/1291843')

  const movie = yield res.json()
  const summary = movie.summary

  console.log('summary', summary)
})