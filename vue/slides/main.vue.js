const MainContentModal = {
  template: `
  <div class="modal fade"
    id="mainContentModal" tabindex="-1" role="dialog"
    aria-labelledby="mainContentModalLabel" aria-hidden="true"
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

const MainContentSlide = Vue.component('main-content', {
  data: function() {
    return {
      order: {
        plot: null,
        name: '',
        phone: '',
        comment: 'Экскурсия',
      },
      isAgree: false
    }
  },
  components: {
    'modal': MainContentModal
  },
  methods: {
    sendOrder: function() {
      axios.post('/api/orders.php/', this.order)
        .then((response) => {
          $('#mainContentModal').modal('show');
        })
        .catch((error) => {
          console.log(error);
        })
    }
  },
  template: `
  <div class="container main-content">
    <modal></modal>
    <div class="row">
      <!--<div class="col-12 d-none d-lg-block" style="height:5vh">
      </div>-->
      <div class="col-12 d-none d-xl-block" style="height:180px">
      </div>
      <div class="col-12 d-none d-md-block d-xl-none" style="height:100px">
      </div>
      <div class="col-12 d-block d-md-none" style="height:130px">
      </div>
      <div class="col-11 mx-auto">
        <h1 class="text-center text-white text-uppercase font-weight-bold display-4 d-none d-sm-block"
          style="font-family: din-2014, sans-serif;font-style: normal;font-weight: 700;text-shadow: black 0.1em 0.1em 0.3em;">Земельные участки под ижс</h1>
        <h1 class="text-center text-white text-uppercase font-weight-bold d-block d-sm-none"
          style="font-family: din-2014, sans-serif;font-style: normal;font-weight: 700;text-shadow: black 0.1em 0.1em 0.3em;">Земельные участки под ижс</h1>
      </div>
      <div class="col-12 col-lg-7 mx-auto">
        <p class="text-white text-center d-none d-sm-block" style="font-size: 15pt;text-shadow: black 0.1em 0.1em 0.2em;">в 5 минутах от Завьялово по Гольянскому тракту</p>
        <h1 class="text-center text-white text-uppercase font-weight-bold display-4 d-none d-sm-block"
          style="font-family: din-2014, sans-serif;font-style: normal;font-weight: 700;text-shadow: black 0.1em 0.1em 0.3em;">18 000 рублей за сотку</h1>
        <p class="text-white text-center d-block d-sm-none" style="text-shadow: black 0.1em 0.1em 0.2em;">в 5 минутах от Завьялово по Гольянскому тракту</p>
        <h1 class="text-center text-white text-uppercase font-weight-bold d-block d-sm-none"
          style="font-family: din-2014, sans-serif;font-style: normal;font-weight: 700;text-shadow: black 0.1em 0.1em 0.3em;">18 000 рублей за сотку</h1>
      </div>
      <div class="col-12 col-lg-11 mx-auto">
        <form class="row"
          @submit.prevent="sendOrder()">
          <div class="col-12 col-lg-4">
            <text-edit
              class="mb-2"
              v-model="order.name"
              placeholder="ФИО"
            ></text-edit>
          </div>
          <div class="col-12 col-lg-4">
            <text-edit
              type="number"
              class="mb-2"
              v-model="order.phone"
              placeholder="Телефон"
            ></text-edit>
          </div>
          <div class="col-12 col-lg-4 contact-button">
            <btn :disabled="!isAgree" type="submit" onclick="ym(55437763, 'reachGoal', 'ekskurs'); return true;">Заказать экскурсию</btn>
            <small class="text-white text-center">
              <input type="checkbox" v-model="isAgree">
              <span style="cursor:pointer" onclick="$('#policyModal').modal('show')">Согласен на обработку персональных данных</span>
            </small>
          </div>
        </form>
      </div>
    </div>
    <!--<div class="main_content_block_h1 row justify-content-center">
      <div class="main_content_h1 col-lg-7 ">
        <h1 class="text-center font-weight-bold display-4">Земельные участки под ижс</h1>
      </div>
    </div>  
    <div class="main_content_block_p row justify-content-center">
      <div class="main_content_p col-lg-7 my-lg-4">
        <p style="font-size: 20pt">Отправьте заявку и получите бесплатную экскурсию</p>
      </div>  
    </div>
    <form class="main_content_block_contact row justify-content-md-center"
      @submit.prevent="sendOrder()">
      <div class="col-lg-3 col-md-3 name">
        <text-edit
          class="mb-2"
          v-model="order.name"
          placeholder="ФИО"
        ></text-edit>
      </div>
      <div class="col-lg-3 col-md-3 phone justify-content-center">
        <text-edit
          class="mb-2"
          v-model="order.phone"
          placeholder="Телефон"
        ></text-edit>
      </div>
      <div class="col-lg-3 col-md-3 contact-button">
        <btn :disabled="!isAgree" type="submit">Заказать экскурсию</btn>
        <small class="text-white text-center">
          <input type="checkbox" v-model="isAgree">
          Согласен на обработку персональных данных
        </small>
      </div>
    </form>-->
  </div>`
});