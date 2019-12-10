const Container = Vue.component('container', {
  template: `
  <div class="container-fluid bg-transparent">
    <div class="row">
      <div class="col-12 col-xl-10 mx-auto">
        <slot></slot>
      </div>
    </div>
  </div>`
});

const ContainerFluid = Vue.component('container-fluid', {
  template: `
  <div class="container-fluid bg-transparent">
    <slot></slot>
  </div>`
});