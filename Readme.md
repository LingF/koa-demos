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
14. koa - lib - request.js
    * 暴露一个对象 {}
    * 定义属性，各种 get set
15. koa - lib - response.js
    * 暴露一个对象 {}
    * 定义属性，各种 get set
        - socket 套接pai   _注释中 @public api 都是可以被访问到的_ 
        - header 拿到响应头中之前设置好的header // headers 只是一个依赖
        - status    get 返回的状态码 set 设置状态码
        - message 消息内容 例：404 资源未到了
        - body 拿到返回的详尽内容，可能是中间件中设置过context.body
            + 内容null  status -> 204 无内容处理
            + 字符串    < 开始，判断是html，不是则普通纯文本
            + buffer
            + stream 流
            + json
        - length 响应内容的长度
        - headerSent 判断header的内容有没有被写入到套接字里面去，通常判断是否是已经开始响应部分内容写到客户端了
        - vary  服务端总要有个合适的文档版本对应上，让客户端包括缓存服务器，能够合理的去解释这个文档，这个就是内容协商。如果服务端提供的内容不实一些常规的协商字段，那么响应头中必须包含这个字段，且内容包含useragent。也就是通过vary列出一些响应的字段列表，帮助缓存服务器使用合适的版本去解释这个文档
        - redirect 重定向
        - attachment 附件
        - type 设置返回的文档类型
        - lastModified 文件上次的更新时间，通知客户端内容更新了，不要用缓存了
        - etag 由服务器生成一个实体tag，标识是否发生了更新或改变，配合lastModified
        - is 是否是某种类型
        - get 拿到header某一个设置项具体的内容
        - set
        - append 插入自定义配置项
        - remove
        - writable 检查response还是否可写，有时候请求已发送完成
        - flushHeaders 刷新之前设置过的headers
16. 中间件
    * app.use(xxx)  xxx 就是中间件，一切尽是中间件
    * await next() 交出控制权，进入下一个中间件
    * 堆栈式的执行，且每个中间件可以做一部分事情，再让别人去做，最后补完自己的事情
17. 纯函数
    * 入参 x，返回值 y。既不依赖，也不会改变全局状态。
18. koa-compose 一个个不想干的中间件串在一起
    * 伪递归
    * 入参 middleware 数组
    * 返回值 匿名普通函数 (context, next)
        - 返回一个 dispatch  -> 返回一个 Promise
        - 真正返回的就是一个 Promise
        - Promise.resolve(fn) fn是返回的结果，其实就是某个中间件
        - 中间件接收 context，next函数，同时运行这个中间件
        - dispatch(i + 1) 就是执行下个中间件
        - 一直执行到下标与数组长度一致，fn = next （undefined），所以Promise.resolve()
    * 
19. 
    

## 模块
* `co`
* `node-fetch`
* `babel-cli` `babel-preset-env`  
    - nodemon -w src
    - --exec babel-node src
* `nodemon`
* `babel-plugin-transform-runtime` `babel-runtime` （babel插件运行环境、babel运行环境，-S）
* `koa`