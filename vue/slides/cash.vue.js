const CashModal = {
  template: `
  <div class="modal fade"
    id="cashModal" tabindex="-1" role="dialog"
    aria-labelledby="cashModalLabel" aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content" style="border: 0;border-radius:20px">
        <div class="modal-body">
          <h3>Успешно отправлено</h3>
          <p>Ожидайте звонка в течение 30 минут</p>
        </div>
      </div>
    </div>
  </div>`
};

const CashSlide = Vue.component('cash', {
  template: `
  <div class="container">
    <div class="footer_contact_contact_map row my-lg-5">
      <div class="col-lg-4">
        <div class="row">
          <div class="col-12 my-lg-2">
            <div class="top_panel_txt text-left my-lg-3">
              <p>Офис продаж<br>Ижевск, Удмурдская 304Н,оф.201<br><a href="tel:73412566370">+7(3412)56-63-70</a></p>
              <navbar-link-list class="px-0">
                <navbar-link to="#commu">Коммуникации</navbar-link>
                <navbar-link to="#plan">План микрорайона</navbar-link>
                <navbar-link to="#infostr">Инфраструктура</navbar-link>
              </navbar-link-list>
              <navbar-link-list class="px-0">
                <navbar-link to="#oplata">Цены</navbar-link>
                <navbar-link to="#srtoi">Строительство</navbar-link>
                <li style="cursor:pointer" onclick="$('#policyModal').modal('show')">Политика конфиденциальности</li>
              </navbar-link-list>
            </div>
          </div>
        </div>
        <div class="row my-lg-3">
          <div class="col-6">
            <a href="#">
              <img src="img/LOGO.png" alt="">
            </a>
          </div>
          <div class="col-6">
            <div class="top_panel_h1">
              <h1>земльные<br>участки<br>под ижс</h1>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <a href="https://www.youtube.com/watch?v=OYLmMcMYAvo&t=2s">
              <img src="/img/twa.png" class="d-block w-100">
            </a>
          </div>
        </div>
      </div>
      <div class="col-lg-8 col-12 footer_map">
        <div style="border-radius: 20px">
          <iframe src="https://yandex.ru/map-widget/v1/-/CGceiJlv" width="100%" height="559" frameborder="0" allowfullscreen="true"></iframe>
        </div>
      </div>
      <div class="col-10 col-sm-4">
      </div>
    </div>
  </div>`
});