const routerMap = new Map()
const fn = function() {}
const conf = {
  method: function() {},
  path: '/1/2/3'
}
const target = 'Rout'

routerMap.set({
  target: target,
  ...conf
}, fn)

console.log(routerMap)