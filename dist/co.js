'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var co = require('co');
var fetch = require('node-fetch');

// co包裹，自动执行完毕
// co(function *() {
//   const res = yield fetch('https://api.douban.com/v2/movie/1291843')

//   const movie = yield res.json()
//   const summary = movie.summary

//   console.log('summary', summary)
// })


// - 2 -
// 模拟co
// 把 迭代器generator 迭代成 promise
// co支持：对象，数组，promise，generator，xx函数
// 不支持：字符串、布尔值
function run(generator) {
  var iterator = generator();
  var it = iterator.next();
  var promise = it.value;

  promise.then(function (data) {
    var it2 = iterator.next(data);
    var promise2 = it2.value;

    promise2.then(function (data2) {
      iterator.next(data2);
    });
  });
}

run( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
  var res, movie, summary;
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return fetch('https://api.douban.com/v2/movie/1291843');

        case 2:
          res = _context.sent;
          _context.next = 5;
          return res.json();

        case 5:
          movie = _context.sent;
          summary = movie.summary;


          console.log('summary', summary);

        case 8:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this);
}));
//# sourceMappingURL=co.js.map