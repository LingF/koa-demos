'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var init = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _util.promisify)(_fs.readFile)((0, _path.resolve)(__dirname, '../package.json'));

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

  return function init() {
    return _ref.apply(this, arguments);
  };
}();

var _path = require('path');

var _util = require('util');

var _fs = require('fs');

var _ex = require('./ex');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// console.log(age)
// console.log(name)
// console.log(getName())

// import { readFile, writeFileSync as wfs } from 'fs'
// import * as qs from 'querystring'

// promisify(readFile)(r(__dirname, '../package.json'))
//   .then(data => {
//     data = JSON.parse(data)

//     console.log(data.name)

//     wfs(r(__dirname, './name'), String(data.name), 'utf-8')
//   })
console.log('name3: ' + _ex.name2);
// import age from './ex'
// import { promisify } from 'util'

console.log('age3: ' + _ex.age);
console.log('getName3: ' + (0, _ex.getName2)());

init();
//# sourceMappingURL=index.js.map