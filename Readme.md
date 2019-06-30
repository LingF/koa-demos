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

### 《4》
1. git checkout master -b xxx 切换到新分支
2. git add / git commit
3. git push origin xxx 推送到远程分支
4. koa-views（模版路径，指定扩展名），通过use挂载在ctx
5. 首页模块/播放器DPlayer

### 《5》
1. Puppeteer 抓取目标网站数据
2. 单线程 —— 主进程 —— 子进程
3. 子进程
    * `child_process`
    * fork(执行脚本，[]) return 子进程对象
        - 派生出一个子进程
    * 继承事件循环（Event Loop？），所以可以用on监听事件
    * api访问 `request-promise-native` 对回调形式的request做了一层封装
4. 同步——异步，阻塞——非阻塞
    * （1）A使用中，B等待使用 ——> 同步阻塞
    * （2）A使用中，B不等待，| 隔段时间查看是否空闲（可使用）=> 轮询 | ——> 同步非阻塞
    * 区别：
        - 第（1）种 B 不能做其他事情：阻塞的；对于 A 都是同步，被动的
    * （3）发现（A）占用某个资源，则启动X，等不占用时，X会通知B；
        - B做事的状态从 阻塞 -> 非阻塞；
        - B查看的行为从 同步 -> 异步；
        - 相对于轮询，我只是注册了一个回调函数（启动X），执行回调（X通知我）
    * （4）启动X，然后继续等待X通知，异步阻塞，傻叉？
    * 总结：
        - 同步异步是过程在于有无消息通知的机制，调用方是主动等待的还是被动通知进度
        - 阻塞非阻塞是状态，调用方是干等还是各不耽误
        - nodejs —— 卖点 ——> 异步非阻塞
    * 身份互换
5. 上传到 七牛云 图床

### 《6》
1. 举例IO
    * 阻塞同步的IO接口：fs.readFileSync
    * 非阻塞异步IO接口：fs.readFile
2. stage.js
    * 事件循环 -> libuv -> unix/core.c -> uv_run
        - int uv_run(uv_loop_t* loop, uv_run_mode mode) 函数分析
        - 入参：
            + uv_loop_t* loop 指向到uv_loop_t的指针，uv_loop_t事件循环的结构
            + uv_run_mode
        - 每一次执行uv_run的时候，都是进行一次事件循环的迭代
        - while 所谓的循环就是这个while的循环
            + uv__update_time
            + uv__run_timers
            + uv__run_pending
            + uv__run_idle
            + uv__run_prepare
            + uv__io_poll
            + uv__run_check
            + uv__run_closing_handles
            + 8个函数代表8个头尾相连的阶段
            + 这些阶段串联起来就形成了事件循环的整个过程
        - 官方定义：_允许Node.js执行一些异步非阻塞的操作所制定的规则_
    * 6个阶段：
        - 【timers 定时器阶段】（setTimeout，setInterval）
            + 对应 uv__run_timers
        - 【I/O callbacks】 执行一些系统错误的处理（socket 错误，Stream，TCP/UDP错误等等）
            + 对应 uv__run_pending
        - 【poll 轮询阶段】 向系统去获取新的I/O事件，执行对应I/O回调
            + 处理到期的定时器回调
            + 处理poll队列中的回调，直到队列中全部被清空，或者达到处理上限
            + 判断队列是否为空 ？
              * 非空（有setImmediate），中止当前的poll阶段，前往check阶段执行setImmediate。
              * 空，Node.js会去查看有没有定时器任务到期了 ？
                - 有，前往timers阶段执行定时器的回调
                - 没有，close callback
        - 【check】 会执行setImmediate回调，_而且setImmediate的回调只能在check阶段执行_
        - 【close callback】 结束回调
    * stage 顺序分析
        - 每个阶段的callback都会被全部执行完毕，或者达到最大数量；就会进入到下个阶段检查新的队列并执行回调，直到运行完 全部的阶段 和 每个阶段的 全部的队列。
        - 但是这些阶段不是严格按顺序，有的阶段会被外部触发
        - process.nextTick 是在任意的两个阶段中间，只要有未被执行的process.nextTick，就优先执行他的回调，包括Promise这类macros Tasks
        - process.nextTick
        - Promise.resolve
        - emit 事件回调 -> 
        - 当前循环体内还有一个nextTick未执行，所以又会被优先执行
        - 进入timers阶段，执行0ms定时器，且100ms/200ms定时器还没到期
        - poll阶段，发现有回调函数->读文件的操作
        - poll队列执行清空，发现有注册了setImmediate回调函数，则执行
        - 再次前往timers阶段，执行定时器回调函数
3. event-loop
    * 试启动的时候，有可能定时器的回调函数未被检测到，所以看上去在immdiate后面执行了，其实他是在第一轮未被检测到，第二轮的第一阶段执行。
    * 预判
      - 执行前会把所有 process.nextTick的队列，Promise里面的队列执行完毕
      - 才进入定时器阶段 1
      - 事件循环按照1-2-3（定时器，io，setImmdeiate）
      - 后面每个阶段新增的 process.nextTick，Promise都会等待当前阶段执行完毕之后，在切入到下一个阶段之前执行完毕
    * 总结
      - 一共三个阶段，某个阶段回调函数队列被执行完毕，前往下个阶段
      - 无论在哪个阶段增加 process.nextTick，除非当前的回调没有执行完毕，在下个阶段开始之前一定执行 process.nextTick 包括 Promise 的 macros Tasks。而且在 process.nextTick 和 Promise 新增的 macros Tasks 会马上加入队列尾部来马上执行，执行完毕才会进入下个阶段；process.nextTick 优先于 Promise
      - 一旦又阻塞代码同步执行的时候，不会影响整个事件的循环顺序。但会影响到在他 _前|后_ 的 process.nextTick ，会等待同步代码执行完毕才会执行（7、8）

> 从Node.js官方对Event Loop解释和示例图做切入
> 了解事件循环的涵义
> 然后从源码入手，了解libuv - unix/core.c - vu_run 核心函数
> 初步了解事件循环的6个阶段和执行顺序，以及每个阶段执行的函数（stage.js）
> 测试案例总结规则（event-loop.js）

### 《7》
1. MongoDB
    * brew install mongodb
    * brew services start mongodb
    * mongo [--host x.x.x.x:xx]
2. connection.on 监听事件
3. MongoDB （—— 对应关系数据库，等同于什么）
    * document 文档，键值对组成 —— 关系数据库一行记录 row
    * collection 集合，多行记录 —— 一张表 table
    * database 数据库  —— 数据库 db
4. Mongoose 对象模型工具  
    * schema 一种数据定义，映射到 MongoDB 的 collection —— 参考mysql，每个字段的类型、长度等
    * model 模型，schema 发布生成的。具备某张表操纵能力的函数集合
    * entity model 生成的数据实体
5. mongoose.Promise = global.Promise 使用nodejs原生的Promise
6. Schema.Types (Mixed, ObjectId...)
7. ref 指向关系，指向的模型
8. mongoose.model(a, b) a：模型名字，b：发布生成所需要的 Schema
    * 单独指定a时，获取对应 model
9. unhandledRejection 事件

> 对 MongoDB 和 Mongoose 的认识与使用
> 利用 schema/model 创建数据模型
> 向数据库导入爬取的数据

### 《8》
1. koa-router 网站路由 -> 实现api服务
    * 问题
      - ctx.path === '/xx' 也可以，为什么使用koa-router？
        + 规则复杂及判断请求方法时，不好维护；layer 层概念
      - 使用有什么问题？
        + 路径规则多时，拆分。可以生成多个router实例，来分配不同的控制器
      - 请求的参数或cookie进行验证，返回数据前需要加工？
        + 控制层前面再加一些中间件。支持，但不同文件不同router实例，依然麻烦
    * 使用场景
      - 适用：网站api个数不多，每个api内置的校验规则，中间件规则比较复杂
      - 不适用：需要暴露N+个api，用 koa-router 做路由切分反而显得臃肿
    * 基本用法
      - 不同参数 '/movies/all?a=1' - '/movies/all?b=2' 会命中同一个路由规则
      - _路由参数_ '/movies/:id/comments/:cid' -> ctx.params.id / cid
      - 中间件 async (ctx, next) => { await ; return next()}
        + router.get('/', 中间件(多个、数组), 控制器)
      - 声名时加前缀 (实现逻辑上子域名/应用/栏目)
        + new Router({ prefix: '/movies' })
      - router.use(mid1()).use(mid2()) 使用中间件
    * 改造原因2
      - 对后台服务（业务层、逻辑层、控制层、数据层、api层）拆分完善利于迭代
2. 改造方向
    * 路由拆分成单独文件，一块大功能路由的进和出
    * 不同的路由分配不同的路径空间（前缀）
3. 装饰器 decorator
    * 实现路由模块的封装，路由空间拆分，不同中间件的集成
    * `babel-plugin-transform-decorators-legacy` 浏览器运行
    * 运行 test/dec.js 试用装饰器
      - `babel-register` （or require('babel-core/register')()）
        + 改写require命令，为它加上一个钩子。此后，每当使用require加载.js、.jsx、.es和.es6后缀名的文件，就会先用Babel进行转码
      - `babel-polyfill` （为当前环境提供一个垫片）
        + Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。
    * 作用：new 出来的实例会被装饰器赋予能力（装饰了该 _对象_）
      - 参数：(target, key, descriptor)
        + target 指向装饰的对象
        + key 装饰器所修饰的方法名
        + descriptor 描述，针对对象的特定配置描述（是否可枚举，可写等等）
4. 结合 decorator 对 koa-router 进行抽象封装
    * 思路
      - 路由的控制器对应路由的前缀，暴露出去一个类
      - 类中增加路径的匹配，并且增加不同中间件
    * Object vs Map 表达一个集合
      - Object
        + 键值对 且键值必须是 String or Symbol，不能是 Object or Array 
        + 总是有个 prototype 原型，纯粹集合时没用
        + 键值对的个数 -> Object.keys(xx) 来获取不方便
      - Map
        + 键可以任意值
        + 键值个数 -> size
    * decorator.js [9-4]
      - 封装 Router -> 暴露一个Class -> Route
        + 构造函数接收 app（Koa实例） 和 apiPath（路由所在目录）
        + this.router = new Router()
        + 初始化方法 init() 加载每个 _路由文件_ 和初始化每个路由的 _控制器_
        + 加载文件参考 database/init.js - `glob.sync`
      - 定义 controller （装饰器）
        + 接受一个参数 path
        + 全部赋值到原型属性
        + 避免冲突且唯一，以 Symbol 为 key
      - 定义 请求方法 get/post/put/del... （装饰器）
        + 接受一个参数 path
        + router 接受一个 conf （= { method, path }）
      - 定义 router 方法 （装饰器）
        + 接受一个参数 conf
        + 处理 conf 里传过来的 path
        + 通过 Map 生成键值对 routerMap -> init()
      - 继续完成 init()
        + routerMap -> controllers | prefixPath
        + 为 router 注册中间件
        + 应用路由规则
      - 总结
        + router -> 实现对路由的装饰 -> 构建一个集合 `routerMap` -> 初始化时为所有的路由控制器（包括路由的方法和中间件）注册 -> `init()` 枚举 -> 拿到 `controllers`(多个)、`prefixPath`、`conf.path` -> 调用这个路由的函数 -> 注册完这些中间件可以应用这些所有路由规则
    * 使用：新建 middlewares/route.js
      - 定义
        + 暴露一个 router
        + new Route()
        + 传入 app，apiPath
        + init()
      - 此中间件被 use ，则初始化了路由中间层
5. service 抽出服务这层
    * 从 routes 中抽出
      - 新建 service 
        + routes/movie.js -> service/movie.js
    * 与数据库交互
6. 多路由文件，路由入口、service、decorator，怎样在入口文件使用这些中间件
    * 数组形式配置 -> 配置中间件清单 -> 利用函数式编程
    * ramda
      - 
    * MIDDLEWARES
7. 整个链路：请求进入 -> 路由层面 - 通过 service 连接到数据库

### 《9》
1. 前端项目
    * 目录层次简单拆分
    * Parcel 打包构建
    * cssnext sass 引入
2. dev.js（开发热更新-动态编译，开发环境下由koa提供的静态文件的访问能力）
    * new Bundler 构建实例
      - 路径
      - 配置参数
    * dev 函数暴露
      - 构建 ->
      - 使用中间件 ->
        + 启动服务 serve
        + 网页访问 views （文件扩展名）
        + render
      - 返回
3. prod.js（只是提供静态文件的访问能力）
    * 服务部署到服务器之后，直接会启动 npm scripts 打包构建，不需要动态编译。
    * 发布到服务器后只需要访问编译好的静态文件
4. 如果前后端项目在一起，想要在一个项目内即提供api后台服务，又提供前端的静态网页，包括静态资源，通过serve里面配置一个koa中间件，让中间件加载parcel bundler。根据开发or生产，动态加载不同配置文件（dev | prod）
5. npm script -> start ／ 通过 nodemon（自动启动） 安装
    * nodemon.json
      - restartable 是否重启
      - ignore 相关文件变化不重启服务
      - execMap
      - watch 监听哪些变化
      - ext 监听扩展名
6. react
    * src/index.js 入口文件
      - 指定根容器 App -> 加载了一个业务级别 app
      - 分配了 BrowserRouter 路由
    * app.js 真正业务逻辑的代码
      - 所有的页面以路由配置的方式枚举一遍
      - 加载Route路由站，且通过async_load为每个页面级别的组件分配一个动态加载的机制
    * async_load.js
      - import 本质是个 Promise
      - 参数
        + loadComponent 加载的组件
        + placeholder 提示文案
      - 传入一个class
      - return 一个新的 class（AcyncComponent）
        + unmount 标识位
        + constructor
        + 将 Child 也就是页面路径传入的组件在 render 返回，等于外面路由拿到真正加载的组件
          1. 判断是否为空 -> 不是 -> 页面级别的组件
          2. 空 -> 提示文案
      - this.state 在组件加载的时候改变（被安装的时候）  async componentDidMount
        + 拿到 Child
        + 判断已被卸载 return
        + setState 设置当前 Child 组件
      - 被卸载前 componentWillUnmount
    * 整个流程回顾
      - 页面 -> 入口文件 index.js -> 入口文件指定 _根容器_ app
      - 同时指定 BrowserRouter -> 里面加载一个业务级别的 APP
      - APP -> 路由配置的方式枚举一遍 -> 加在整个 Route 这个路由站 -> 为每一个路由级别的组件来分配一个动态加载的机制（async_load）
7. 布局模版组件和导航菜单
    * LayoutDefault
    * render
    * matchRouteName 选中时候
      - props.match 传入的
      - navRoutes 遍历
    * nav.js


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
    * `koa@1.2.0` `koa-logger@1.3.0` -S
    * `koa@2.4.1` `koa-convert` -S
    * `koa-logger@latest` -S
3. 《4》
    * `cz-conventional-changelog` 
    * `ejs` `pug` 模版引擎
    * `koa-views`
4. 《5》
    * `puppeteer`
    * `request` `request-promise-native`
    * `qiniu` `nanoid`
5. 《6》
    * `events`
6. 《7》
    * `mongoose` -S
    * `glob` -S
7. 《8》
    * `koa-router` -S
    * `babel-plugin-transform-decorators-legacy` -D
    * `lodash`
    * `ramda`
    * `transform-object-rest-spread` -D
8. 《9》
    * `parcel-bundler` -g
    * `cssnext` `node-sass` `autoprefixer` -D
    * `koa-static` `nodemon` -D
    * `antd@3.0.0` `react@16.1.1` `react-dom@16.1.1` `react-router-dom@4.2.2` -S

> -S: --save
> -D: --save-dev

10-2
