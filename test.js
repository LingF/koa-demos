const Koa = require('koa')
const app = new Koa()
const indent = (n) => new Array(n).join(' ')
const mid1 = () => async(ctx, next) => {
  ctx.body = `<h3>请求 => 第一层中间件</h3>`
  await next()
  ctx.body += `<h3>响应 <= 第一层中间件</h3>`
}
const mid2 = () => async(ctx, next) => {
  ctx.body += `<h3>${indent(4)}请求 => 第二层中间件</h3>`
  await next()
  ctx.body += `<h3>${indent(4)}响应 <= 第二层中间件</h3>`
}
app.use(mid1())
app.use(mid2())
app.use(async(ctx, next) => {
  ctx.body += `<p style="color: #f60">${indent(12)}=> Koa 核心 处理业务 <=</p>`
})


const EventEmitter = require('events')
class EE extends EventEmitter {}
const yy = new EE()
yy.on('event', () => console.log('粗大事啦'))
setTimeout(() => console.log('0 毫秒后到期的定时器回调'), 0)
setTimeout(() => console.log('100 毫秒后到期的定时器回调'), 100)
setImmediate(() => console.log('immediate 立即回调'))
process.nextTick(() => console.log('process.nextTick 的回调'))
Promise.resolve().then(() => {
  yy.emit('event')
  process.nextTick(() => console.log('process.nextTick 的回调'))
  console.log('promise 第一次回调')
}).then(() => console.log('promise 第二次回调'))


app.listen(2333)