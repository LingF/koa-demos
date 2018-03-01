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
    * "production" (async 传 generator function 时，async 是 es7 特性，babel 支持es6)，所以要装2个插件
10. .babelrc 修改配置 增加 "plugins"
    * "transform-runtime": {
        "polyfill": false,
        "regenerator": true
      }
11. 

## 模块
* `co`
* `node-fetch`
* `babel-cli` `babel-preset-env`  
    - nodemon -w src
    - --exec babel-node src
* `nodemon`
* `babel-plugin-transform-runtime` `babel-runtime` （babel插件运行环境、babel运行环境，-S）