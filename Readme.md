## 执行环境
nodejs + cmd

``` cmd
node src/xx
```

## 章节顺序

### 《1、2》
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
19. session-cookie-路由   koa-session/index.js
    * 原理：客户端与服务端当前的会话，并且能知道客户端是否有保存一些状态（登陆状态、业务埋点等）
    

> 《1、2》总结： 
> 1. 在koa里，一切流程都是中间件
> 2. 一个http请求进入koa之后，都会流经预先配置好的中间件
> 3. 在中间件执行策略时会先经koa-compose把中间件组合在一起，一个接一个，数组里面的函数依次执行。通过next中间函数，将控制权（执行权）进行往下传递（koa洋葱模型）
> 4. 每个中间件都会拿到ctx，通过ctx可以访问request／response对象
> 5. 三者互相引用，request／response对象是koa中扩展出的对象，并非node原生的。
> 

### 《3》
1. koa1 -> koa2
    * 运行koa1
    * 运行koa2 logger比较老，所以需要koa-convert转换
        - var -> let const
        - 箭头函数
        - 不再支持 Generator Function，而是async
    * ----------
    * 中间件的处理，最外层到内，穿过中间件，拿到业务数据，请求转变为响应
    * 中间件如何知道来的是请求还是响应：
        - 并不知道，也不需要知道。请求肯定比响应早执行早被处理
        - 中间一分为二，前面是处理请求，后面是处理响应，分界线就是yield／await next
    * ----------
2. koa1与koa2区别
    * 依赖不同
        - koa 依托于 Generator Function／co库／
        - koa2 依托于 Async Function
    * 语法
        - es5／es6
        - es6／或更新的
    * 中间件执行的特征、链路相似（但是设计策略和执行的逻辑有区别）
    * 配套三方库（koa-convert）
        - 最新的logger是对koa2兼容了（这里只为演示）
3. express与koa区别
    * 都提供构造函数来生成一个服务器的实例
        - 内部生成
        - 显式 new
    * app上都有use，环境变量，配置
        - express更多控制权，配置权
            + disable/enable/router/render 等等
            + settings 也提供了：引擎配置/jsonp/严格的路由等等
    * koa 把请求的request/response/context通过引用的方式挂载context里面
    * 能力层面，koa没有express提供的丰富
    * API设计
        - 三大部分
            + app/requset/response 互相脱离的
            + 更能直接使用
        - koa 都提供了context
            + 更容易做底层的深度定制
    * 中间件执行模板
        - 单向流动
        - 洋葱模型
    * 编程体验
        - callback
        - Async Function
    * 工程构件模型、数据流集成方式、插件机制不同

## 模块
1. 《1、2》
    * `co`
    * `node-fetch`
    * `babel-cli` `babel-preset-env`  
        - nodemon -w src
        - --exec babel-node src
    * `nodemon`
    * `babel-plugin-transform-runtime` `babel-runtime` （babel插件运行环境、babel运行环境，-S）
    * `koa`
    * `koa-logger` `koa-session`
2. 《3》
    * `koa@1.2.0` `koa-logger@1.3.0`  -S
    * `koa@2.4.1` `koa-convert` -S
    * `koa-logger@latest` -S