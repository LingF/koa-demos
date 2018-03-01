// const arrow = function(param) {}
// const arrow = (param) => {}
// const arrow = param => {}
// const arrow = param => console.log(param)
// const arrow = param => ({param: param})
// const arrow = (param1, param2) => {}
// const arrow = ({id, movie}) => {
//   console.log(id, movie)
// }

const luke = {
  id: 2,
  say: function() {
    setTimeout(function() {
      console.log('id: ', this.id)
    }, 50)
  },
  sayWidthThis() {
    let that = this

    setTimeout(function() {
      console.log('this id: ', that.id)
    }, 500)
  },
  sayWidthArrow() {
    setTimeout(() => {
      console.log('arrow id: ', this.id)
    }, 1500)
  },
  sayWidthGlobalArrow: () => {
    setTimeout(() => {
      console.log('global arrow id: ', this.id)
    }, 2000)
  }
}


luke.say()
luke.sayWidthThis()
luke.sayWidthArrow()
luke.sayWidthGlobalArrow()



