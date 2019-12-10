const PlanPlot = {
  props: ['data'],
  directives: {
    status: {
      bind: function(el, binding, vnode) {
        if (binding.value == 0) {
          el.style.fill = 'green';
          el.style.opacity = '0.001';
        } else if (binding.value == 1) {
          el.style.fill = 'yellow';
          el.style.opacity = '0.5';
        } else {
          el.style.fill = 'red';
          el.style.opacity = '1';
        }
      }
    }
  },
  template: `
  <path v-status="data.status" :d="data.coordinates" @click="$emit('click', data)">
    <title>{{ data.area }} соток = {{ parseInt(data.area * data.price) }} руб.</title>
  </path>`
};

const PlanPlotInfo = {
  props: ['data'],
  data: function() {
    return {
      order: {
        plot: null,
        name: '',
        phone: '',
        comment: ''
      },
      isAgree: false,
      isSend: false
    }
  },
  methods: {
    sendOrder: function() {
      this.order.plot = this.data.id;
      this.order.comment = 'Резервация участка';
      axios.post('/api/orders.php/', this.order)
        .then((response) => {
          this.isSend = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getTriadPrice: function(price) {
      return price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    }
  },
  template: `
  <div class="modal fade"
    id="plotModal" tabindex="-1" role="dialog"
    aria-labelledby="plotModalLabel" aria-hidden="true"
  >
    <div class="modal-dialog modal-lg modal-dialog-scrollable" role="document">
      <div class="modal-content" style="border: 0;border-radius:20px;">
        <div class="modal-header" v-if="data.status != 2">
          <h5 class="modal-title">Участок №{{ data.id }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="isSend = false">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <h3 v-if="data.status == 2">Этот участок уже куплен, выберете другой, пожалуйста</h3>
          <div v-if="data.status != 2" class="row">
            <div class="col-12">
              <div class="row">
                <div class="col-12 mb-2">
                  <h5>Площадь: {{ data.area }} соток</h5>
                </div>
                <div class="col-12 mb-3">
                  <div class="row">
                    <div class="col-12 col-lg-4 mb-3">
                      <card>
                        <div class="col-12 mb-3">
                          <p class="font-weight-bold shadow text-white text-center bg-warning mt-2 border border-warning px-1 py-1"
                            style="border-radius: 5px"
                            v-if="data.status == 1"><b>АКЦИЯ</b></p>
                          <p class="text-muted">Оплата наличными</p>
                          <h5 class="border-bottom pb-2">{{ getTriadPrice(parseInt(data.area * data.price)) }} руб.</h5>
                          <ul class="list-unstyled">
                            <li><span class="text-success">Самая низкая цена</span> за сотку - 
                              <span :class="'text-success ' + (data.status == 1 ? 'font-weight-bold px-1 py-1' : '') ">{{ getTriadPrice(parseInt(data.price)) }} руб.</span>
                            </li>
                            <li>Участок переходит <span class="text-success">сразу в собственность</span></li>
                          </ul>
                        </div>
                      </card>
                    </div>
                    <div class="col-12 col-lg-4 mb-3" v-if="data.status != 1">
                      <card>
                        <div class="col-12">
                          <p class="text-muted">
                            В рассрочку от нашего партнера - 
                            <a href="https://www.otpbank.ru/" target="_blank">
                              БАНК ОТП
                            </a>
                          </p>
                          <h5 class="border-bottom pb-2">
                            <!--{{ getTriadPrice(parseInt(data.area * data.price_otp)) }} руб.<br>-->
                            <span>
                              {{ getTriadPrice(parseInt(data.area * data.price_otp / 24)) }} руб./мес.
                            </span>
                          </h5>
                          <ul class="list-unstyled">
                            <li><span class="text-success">Без</span> первоначального взноса</li>
                            <li><span class="text-success">Беспроцентная</span> рассрочка на <span class="text-success">24 месяца</span></li>
                            <li>Участок переходит <span class="text-success">сразу в собственность</span></li>
                            <li><span class="text-success">Мы единственные</span>, кто работает с <a href="https://www.otpbank.ru/" target="_blank">БАНК ОТП</a> на таких условиях. Если банк не одобрит рассрочку, то <span class="text-success">мы сделаем Вам скидку</span></li>
                          </ul>
                        </div>
                      </card>
                    </div>
                    <div class="col-12 col-lg-4 mb-3" v-if="data.status != 1">
                      <card>
                        <div class="col-12">
                          <p class="text-muted">В рассрочку от нашей компании</p>
                          <h5 class="border-bottom pb-2">
                            <!--{{ getTriadPrice(parseInt(data.area * data.price_comp)) }} руб.<br>-->
                            {{ getTriadPrice(parseInt(data.area * data.price_comp / 24)) }} руб./мес.</h5>
                          <ul class="list-unstyled">
                            <li>Первоначальный взнос <span class="text-danger">30 000 руб.</span></li>
                            <li><span class="text-success">Беспроцентная</span> рассрочка на <span class="text-success">24 месяца</span></li>
                            <li><span class="text-success">Гибкие условия</span> платежа</li>
                            <li>Участок <span class="text-danger">будет находиться в обременении до полной оплаты</span></li>
                          </ul>
                        </div>
                      </card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 mb-2">
              <h3 v-if="isSend" class="mt-3 mt-xl-4">Успешно отправлено!</h3>
              <p v-if="isSend">Ожидайте звонка в течение 30 минут</p>
              <form @submit.prevent="sendOrder()" v-if="!isSend && data.status != 2">
                <p>Отправьте заявку и забронируйте понравившийся участок за 10 секунд!</p>
                <input class="form-control shadow mb-2"
                  type="text"
                  v-model="order.name"
                  placeholder="Ваше имя">
                <input class="form-control shadow mb-2"
                  type="number"
                  v-model="order.phone"
                  placeholder="Ваш номер телефона">
                <button :disabled="!isAgree" class="btn btn-warning shadow mr-2" type="submit"
                >Отправить</button><br>
                <small class="text-center">
                  <input type="checkbox" v-model="isAgree">
                  <span>Согласен на обработку персональных данных</span>
                </small>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`
};

const PlanPlotList = {
  data: function() {
    return {
      plots: [],
      currentPlot: {}
    }
  },
  components: {
    'plot': PlanPlot,
    'plot-info': PlanPlotInfo
  },
  mounted: function() {
    this.getPlots();
  },
  methods: {
    getPlots: function() {
      axios.get('/api/plots.php/')
        .then((response) => {
          this.plots = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
    },
    showPlotInfo: function(plot) {
      this.currentPlot = plot;
      document.body.style.zoom = (window.innerWidth / window.outerWidth);
      $('body').css('MozTransform','scale(1)');
      $('#plotModal').modal('show');
    }
  },
  template: `
  <div class="plan_png row">
    <div class="map col mx-auto d-block d-lg-none" style="overflow-x:scroll;overflow-y:hidden">
      <div class="row" style="min-width:1400px;max-height:1400px">
        <div class="col">
          <svg viewBox = "0 0 1084 711">
            <plot
              v-for="plot in plots"
              v-bind:key="plot.id"
              v-bind:data="plot"
              @click="showPlotInfo"
            ></plot>
          </svg>
          <img src="/img/map1.jpg" alt="карта" class="w-100">
        </div>
      </div>
    </div>
    <div class="overflow-auto">
      <div class="map col mx-auto d-none d-lg-block">
        <svg viewBox = "0 0 1084 711">
          <plot
            v-for="plot in plots"
            v-bind:key="plot.id"
            v-bind:data="plot"
            @click="showPlotInfo"
          ></plot>
        </svg>
        <img src="/img/map1.jpg" alt="карта" class="w-100">
      </div>
    </div>
    <plot-info
      v-bind:data="currentPlot"
    ></plot-info>
  </div>`
};

const PlanSlide = Vue.component('plan', {
  components: {
    'plot-list': PlanPlotList
  },
  template: `
  <container-fluid>
    <div class="row">
      <div class="col-12 col-md-10 mx-auto">
        <h2><a name="plan">План микрорайона</a></h2>
        <p class="d-block d-lg-none">Подвиньте схему, чтобы увидеть все участки</p>
        <div class="row">
          <div class="col-12 col-md-5">
            <img src="/img/map-helper.png" class="d-block w-100">
          </div>
        </div>
      </div>
      </div>
      <div class="col-12">
        <plot-list></plot-list>
      </div>
      <div class="col-12">
        <h3 class="text-center">Участки, выделенные желтым, продаются <b>со скидкой!</b></h3>
      </div>
    </div>
  </container-fluid>`
});