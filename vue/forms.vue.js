const Button = Vue.component('btn', {
  template: `
  <button class="btn btn-warning w-100 shadow scale-sm border-none">
    <slot></slot>
  </button>`
});

const ButtonLink = Vue.component('btn-link', {
  template: `
  <a class="btn btn-warning btn-sm w-100 shadow scale-sm">
    <slot></slot>
  </a>`
});

const Input = Vue.component('text-edit', {
  props: ['value'],
  template: `
  <input
    class="form-control w-100 shadow"
    type="text"
    :value="value"
    @input="$emit('input', $event.target.value)">`
});

const Card = Vue.component('card', {
  template: `
  <div class="card shadow">
    <div class="card-body">
      <div class="row">
        <slot></slot>
      </div>
    </div>
  </div>`
});
const CardBorderNone = Vue.component('card-bn', {
  template: `
  <div class="card border-none">
    <div class="card-body">
      <div class="row">
        <slot></slot>
      </div>
    </div>
  </div>`
});

const CardPaddingNone = Vue.component('card-pn', {
  template: `
  <div class="card shadow">
    <div class="card-body px-0 py-0">
      <div class="row">
        <slot></slot>
      </div>
    </div>
  </div>`
});