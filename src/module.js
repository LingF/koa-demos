const fs = require('fs')

fs.writeFile()

// 运行时加载
// const { writeFile } = require('fs')


// 静态加载
// nodejs 未实现这种加载 -> 引入 babel
// babel问题：项目臃肿，编译加长，编译后有些会不兼容
import { writeFile } from 'fs'