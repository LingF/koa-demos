const fs = require('fs')

// - 回调式写法 -
// fs.readFile('./package.json', (err, data) => {
//   if (err) return console.log(err)

//   data = JSON.parse(data)
//   console.log(data.name)
// })

// - promise -
// function readFileAsync(path) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(path, (err, data) => {
//       if (err) reject(err)
//       else resolve(data)
//     })
//   })
// }

// readFileAsync('./package.json')
//   .then(data => {
//     data = JSON.parse(data)
//     console.log(data.name)
//   })
//   .catch(err => {
//     console.log(err)
//   })

// - promisify
// 包装回调式的api，使其可以直接使用promise -
const util = require('util');

util.promisify(fs.readFile)('./package.json')
  .then(JSON.parse)
  .then(data => {
    console.log(data.name)
  })
  .catch(err => {
    console.log(err)
  })




