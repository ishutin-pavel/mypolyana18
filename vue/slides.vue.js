const Slides = Vue.directive('slide', {
  bind: function(el, binding, vnode) {
    el.style.background = `url('/img/slide${binding.value}.jpg') no-repeat top center / cover`;
  }
});