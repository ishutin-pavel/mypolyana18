const NavbarLink = Vue.component('navbar-link', {
  props: ['to'],
  template: `
  <li>
    <a :href="to">
      <slot></slot>
    </a>
  </li>`
});

const NavbarLinkList = Vue.component('navbar-link-list', {
  template: `
  <div class="col-12 col-sm-3 col-md-2 col-xl-2 mt-lg-0 mt-0">
    <ul class="list-unstyled">
      <slot></slot>
    </ul>
  </div>`
});

const Navbar = Vue.component('navbar', {
  data: function() {
    return {
      isShowMenu: false
    }
  },
  template: `
  <div class="header header_fix">
    <div class="row my-2 my-lg-5">
      <div class="col-5 col-md-3 col-lg-2">
        <img src="/img/LOGO.png" class="d-block" width="152" height="83">
      </div>
      <div class="col-lg-2 d-none d-lg-block">
        <h1>ЗЕМЕЛЬНЫЕ<br>УЧАСТКИ<br>ПОД ИЖС</h1>
      </div>
      <slot>
      </slot>
      <div class="col-md-4 d-none d-lg-block">
        <p class="text-right">
          Офис продаж<br>Ижевск, Удмурдская 304Н,оф.201<br><a href="tel:73412566370">+7(3412)56-63-70</a>
        </p>
      </div>
    </div>
  </div>`
});
