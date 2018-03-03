## 执行环境
nodejs + cmd

``` cmd
node src/xx
```

## 章节顺序
1. iterator
2. cb-promise
3. promise-async
4. co
5. arrow
6. async
7. module
    * env：运行环境的描述；"node": "current" // node当前环境；
8. ex
9. 配置 build
    * "build": "rimraf dist && babel src -s -D -d dist --presets env"
    * "production" (async 转 generator function 时，async 是 es7 特性，babel 支持es6)，所以要装2个插件
10. .babelrc 修改配置 增加 "plugins"
    * "transform-runtime": {
        "polyfill": false,
        "regenerator": true
      }
11. - 3 - 安装 koa
12. koa - lib - application.js
    * isGeneratorFunction
    * debug
    * onFinished 监听http请求关闭完成或者出错时，调用注册的回调函数
    * response
    * componse 中间件的函数数组，数组中的值都是函数
    * isJson
    * context 整个运行服务的上下文（http 携带的信息、方法，返回的数据和方法）
    * request
    * statuses 请求的状态码
    * Cookies
    * accepts 约定哪些数据被服务端接收，涉及到内容的协商，主要是协议、资源的控制
    * Emitter 事件循环
    * assert 断言，判断是否符合预期
    * Stream 流
    * http 是针对 http 协议封装的上层web服务接口
    * only 白名单选择，筛选对象中的某些key
    * convert 针对老的 koa 里面的 generator function 做兼容，转成标准的 promise中间件
    * deprecate 判断当前koa的接口、方法是否过期
    * < createContext >
13. koa - lib - context.js _让context对象拥有请求和响应对象上的方法_
    * 暴露 proto 对象
    * delegate 挂载方法到对象上  Delegate(proto, prop)  prop -> proto
14. 

## 模块
* `co`
* `node-fetch`
* `babel-cli` `babel-preset-env`  
    - nodemon -w src
    - --exec babel-node src
* `nodemon`
* `babel-plugin-transform-runtime` `babel-runtime` （babel插件运行环境、babel运行环境，-S）
* `koa`