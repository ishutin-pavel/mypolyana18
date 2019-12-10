const OplataSlide = Vue.component('oplata', {
  data: function() {
    return {
      order: {
        name: '',
        phone: '',
        comment: ''
      },
      isAgree: false,
      cards: [
        {
          title: 'Наличный расчет',
          image: 'ик нал.png',
          text: '',
          price: '20 000 руб/сотка',
          showForm: false
        },
        {
          title: 'Рассрочка банка',
          image: 'ик банк.png',
          text: '',
          price: 'от 8 000 руб/месяц.',
          showForm: false
        },
        {
          title: 'Расрочка компании',
          image: 'ик комп.png',
          text: '',
          price: 'от 7 550 руб/месяц',
          showForm: false
        },
      ]
    }
  },
  methods: {
    sendOrder: function(comment) {
      this.order.comment = comment;
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
    <div class="container py-5 py-xl-2">
      <div class="row pt-5 pt-lg-0 pb-lg-3">
        <div class="col-12">
          <h2 class="text-white" style="text-shadow: black 0.1em 0.1em 0.2em;"><a name="oplata">Варианты оплаты</a></h2>
        </div>
      </div>
      <div class="row mb-xl-5 pb-xl-5">
        <div class="col-12 col-md-6 col-xl-4 mx-auto mb-3" v-for="card in cards" :key="card.title">
          <card class="scale-sm">
            <div class="col-12">
              <h5 class="card-title text-center font-weight-bold">{{ card.title }}</h5>
            </div>
            <div class="col-8 col-xl-8 mx-auto">
              <img class="d-block w-100" :src="'/img/o_icon/'+card.image">
            </div>
            <div class="col-12" style="height:50px">
              <p class="card-text text-center">{{ card.text }}</p>
            </div>
            <div class="col-12">
              <p class="card-text text-center pb-lg-3"><b>{{ card.price }}</b></p>
            </div>
            <div class="col-12">
              <button class="btn btn-warning btn-sm shadow w-100" @click="card.showForm = !card.showForm">Расчитать стоимость</button>
            </div>
            <div class="col-12 mt-2" v-if="card.showForm">
              <form class="row"
                @submit.prevent="sendOrder(card.title)">
                <div class="col-12">
                  <text-edit
                    class="mb-2"
                    v-model="order.name"
                    placeholder="ФИО"
                  ></text-edit>
                </div>
                <div class="col-12">
                  <text-edit
                    class="mb-2"
                    type="number"
                    v-model="order.phone"
                    placeholder="Телефон"
                  ></text-edit>
                </div>
                <div class="col-12 contact-button">
                  <btn :disabled="!isAgree" type="submit"
                    onclick="ym(55437763, 'reachGoal', ',trio'); return true;"
                  >Отправить</btn>
                  <small class="text-black text-center">
                    <input type="checkbox" v-model="isAgree">
                    <span style="cursor:pointer" onclick="$('#policyModal').modal('show')">Согласен на обработку персональных данных</span>
                  </small>
                </div>
              </form>
            </div>
          </card>
        </div>
      </div>
    </div>`
});