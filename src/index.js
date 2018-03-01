// import { promisify } from 'util'
import { resolve as r } from 'path'
// import { readFile, writeFileSync as wfs } from 'fs'
// import * as qs from 'querystring'

// promisify(readFile)(r(__dirname, '../package.json'))
//   .then(data => {
//     data = JSON.parse(data)

//     console.log(data.name)

//     wfs(r(__dirname, './name'), String(data.name), 'utf-8')
//   })
import { promisify } from 'util'
import { readFile } from 'fs'
import { name, getName } from './ex'
// import age from './ex'
import {
  name2 as name3,
  getName2 as getName3,
  age as age3
} from './ex'

// console.log(age)
// console.log(name)
// console.log(getName())

console.log('name3: ' + name3)
console.log('age3: ' + age3)
console.log('getName3: ' + getName3())


async function init() {
  let data = await promisify(readFile)(r(__dirname, '../package.json'))

  data = JSON.parse(data)

  console.log(data.name)
}

init()