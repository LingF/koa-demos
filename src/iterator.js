// 核心：生成器
// 生成器的本质：迭代器
// 迭代器：是一个协议，遵循这个协议所实现的都是迭代器对象

// - 1 -
// function makeIterator(arr) {
//   let nextIndex = 0

//   // 返回一个迭代器对象
//   return {
//     next: () => {
//       // next() 方法返回的结果对象
//       if (nextIndex < arr.length) {
//         // done 迭代器是否完成
//         return { value: arr[nextIndex++], done: false }
//       } else {
//         return { done: true }
//       }
//     }
//   }
// }

// const it = makeIterator(['吃饭', '睡觉', '打豆豆'])

// console.log('首先', it.next().value)
// console.log('其次', it.next().value)
// console.log('然后', it.next().value)
// console.log('最后', it.next().done)


// - 2 -
// 通过生成器函数
// 简化迭代器创建过程
function *makeIterator(arr) {
  for (let i = 0; i < arr.length; i++) {
    yield arr[i]
  }
}

const gen = makeIterator(['吃饭', '睡觉', '打豆豆'])

console.log('首先', gen.next().value)
console.log('其次', gen.next().value)
console.log('然后', gen.next().value)
console.log('最后', gen.next().done)


