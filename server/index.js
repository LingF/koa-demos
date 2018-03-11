const Koa = require('koa')
const logger =require('koa-logger')
const app = new Koa()

const mid1 = async(ctx, next) => {
  ctx.body = 'Hi'
  await next()
  ctx.body = ctx.body + ' Three'
}

const mid2 = async(ctx, next) => {
  ctx.type = 'text/html; charset=utf-8'
  await next()
}

const mid3 = async(ctx, next) => {
  ctx.body = ctx.body + ' Luke'
}

//
// 每次递归的时候都会保存当前方法调用栈
// 执行 tail(2) 的时候必须记得如何调用 tail(1)
// 过程中函数记录了太多堆栈深度还有堆栈状体，浪费性能
// function tail(i) {
//   if (i > 3) return
//   console.log('修改前 ', i);
//   tail(i + 1)
//   console.log('修改后 ', i);
// }

// 每次调用的时候，函数执行返回
// 执行后的结果就是下一次执行的入参
function tail(i) {
  if (i > 3) return i
  console.log('修改前 ', i);
  return tail(i + 1)
}

tail(0)

app.use(logger())
app.use(mid1)
app.use(mid2)
app.use(mid3)

app.listen(2333)