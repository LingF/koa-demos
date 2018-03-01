'use strict';

// const arrow = function(param) {}
// const arrow = (param) => {}
// const arrow = param => {}
// const arrow = param => console.log(param)
// const arrow = param => ({param: param})
// const arrow = (param1, param2) => {}
// const arrow = ({id, movie}) => {
//   console.log(id, movie)
// }

var luke = {
  id: 2,
  say: function say() {
    setTimeout(function () {
      console.log('id: ', this.id);
    }, 50);
  },
  sayWidthThis: function sayWidthThis() {
    var that = this;

    setTimeout(function () {
      console.log('this id: ', that.id);
    }, 500);
  },
  sayWidthArrow: function sayWidthArrow() {
    var _this = this;

    setTimeout(function () {
      console.log('arrow id: ', _this.id);
    }, 1500);
  },

  sayWidthGlobalArrow: function sayWidthGlobalArrow() {
    setTimeout(function () {
      console.log('global arrow id: ', undefined.id);
    }, 2000);
  }
};

luke.say();
luke.sayWidthThis();
luke.sayWidthArrow();
luke.sayWidthGlobalArrow();
//# sourceMappingURL=arrow.js.map