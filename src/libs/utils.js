export const transitionRun = function () {
  let el = document.createElement('demo')
  var transitions = {
    'transition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'MozTransition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd'
  }
  for (let t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t]
    }
  }
}
