'use strict';

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var init = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var data;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return readAsync('./package.json');

          case 2:
            data = _context2.sent;


            data = JSON.parse(data);

            console.log(data.name);

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function init() {
    return _ref.apply(this, arguments);
  };
}();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// js 异步场景的演变

var fs = require('fs');

// - 1 -
// 回调函数
function readFile(cb) {
  fs.readFile('./package.json', function (err, data) {
    if (err) return cb(err);
    cb(null, data);
  });
}

readFile(function (err, data) {
  if (!err) {
    data = JSON.parse(data);

    console.log(data.name);
  }
});

// - 2 -
// Promise
function readFileAsync(path) {
  return new Promise(function (resolve, reject) {
    fs.readFile(path, function (err, data) {
      if (err) reject(err);else resolve(data);
    });
  });
}

readFileAsync('./package.json').then(function (data) {
  data = JSON.parse(data);

  console.log(data.name);
}).catch(function (err) {
  console.log(err);
});

// - 3 -
// co + Generator Function + Promise
// 注：* 和 yield 比较适合用断点执行代码，而不简单地异步请求
var co = require('co');
var util = require('util');

co( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
  var data;
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return util.promisify(fs.readFile)('./package.json');

        case 2:
          data = _context.sent;


          data = JSON.parse(data);

          console.log(data.name);

        case 5:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this);
}));

// - 4 -
// Async 统一世界
var readAsync = util.promisify(fs.readFile);

init();
//# sourceMappingURL=async.js.map