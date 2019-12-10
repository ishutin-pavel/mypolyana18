const PlanPlot = {
  props: ['data'],
  directives: {
    status: {
      bind: function(el, binding, vnode) {
        if (binding.value == 0)
          el.style.fill = 'green';
        else if (binding.value == 1) {
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
    <title>№{{ data.id }}</title>
  </path>`
};

const PlanPlotInfo = {
  props: ['data'],
  data: function() {
    return {
      plot: {}
    }
  },
  mounted: function() {
    this.plot = this.data;
  },
  methods: {
    updatePlot: function() {
      let status = this.plot.status;
      this.plot = this.data;
      this.plot.status = status;
      if (status == 0)
        this.plot.price = 20000;
      else if (status == 1)
        this.plot.price = 18000;
      else
        this.plot.price = 0;
      axios.put('/api/plots.php/', this.plot)
        .then((response) => {
          this.$emit('update');
        })
        .catch((error) => {
          console.log(error);
        })
    }
  },
  template: `
  <div class="modal fade"
    id="plotModal" tabindex="-1" role="dialog"
    aria-labelledby="plotModalLabel" aria-hidden="true"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content" style="border: 0;border-radius:20px;">
        <div class="modal-header">
          <h5 class="modal-title">Участок №{{ data.id }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-12">
              <p>Площадь: {{ data.area }} соток<br>
              Цена: {{ data.price }} руб.</p>
            </div>
            <div class="col-12">
              <form @submit.prevent="updatePlot()">
                <div class="form-group">
                  <label>Статус</label>
                  <button type="submit"
                    class="btn btn-success btn-sm mr-2"
                    v-if="data.status != 0"
                    @click="plot.status = 0"
                  >Освободить</button>
                  <button type="submit"
                    class="btn btn-warning btn-sm mr-2"
                    v-if="data.status != 1"
                    @click="plot.status = 1"
                  >Акционный</button>
                  <button type="submit"
                    class="btn btn-danger btn-sm mr-2"
                    v-if="data.status != 2"
                    @click="plot.status = 2"
                  >Занято</button>
                </div>
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
      currentPlot: {},
      loading: false
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
      this.loading = true;
      this.plots = [];
      axios.get('/api/plots.php/')
        .then((response) => {
          this.plots = response.data;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        })
    },
    showPlotInfo: function(plot) {
      this.currentPlot = plot;
      $('#plotModal').modal('show');
    }
  },
  template: `
  <div>
    <div class="spinner-border text-warning" role="status" v-if="loading">
      <span class="sr-only">Loading...</span>
    </div>
    <svg viewBox = "0 0 1084 711">
      <plot
        v-for="plot in plots"
        v-bind:key="plot.id"
        v-bind:data="plot"
        @click="showPlotInfo"
      ></plot>
    </svg>
    <plot-info
      v-bind:data="currentPlot"
      @update="getPlots"
    ></plot-info>
  </div>`
};

const PlanSlide = Vue.component('plan', {
  components: {
    'plot-list': PlanPlotList
  },
  template: `
  <div class="row">
    <div class="col-12">
      <h2><a name="plan">План микрорайона</a></h2>
    </div>
    <div class="col-12">
      <div class="plan_png">
        <div class="map col mx-auto">
          <plot-list>
          </plot-list>
          <!--<img src="/img/map1.jpg" alt="карта" class="w-100">-->
          <!--<img src="img/Интерактивная карта.png" alt="карта" class="w-100">-->
        </div>
      </div>
    </div>
  </div>`
});

const OrderList = Vue.component('order-list', {
  data: function() {
    return {
      orders: [],
      loading: false
    }
  },
  components: {
    'order': {
      props: ['data'],
      template: `
      <div class="col-12 col-lg-6 mb-3">
        <card class="mb-2">
          <div class="col-12">
            <h3>{{ data.name }}</h3>
            <a :href="'tel:'+data.phone">Позвонить ({{ data.phone }})</a>
            <p>Цель: {{ data.comment }} <span v-if="data.plot > 0">{{ data.plot }}</span><br>
            Дата: {{ data.date }}</p>
            <!--<button
              v-if="data.plot > 0"
              class="btn btn-warning btn-sm mb-2"
              @click="$emit('change-status', data.plot, 2)"
            >Занять</button>-->
            <button
              class="btn btn-danger btn-sm mb-2"
              @click="$emit('delete-order', data.id)"
            >Удалить</button>
          </div>
        </card>
      </div>`
    }
  },
  mounted: function() {
    this.getOrders();
  },
  methods: {
    getOrders: function() {
      this.loading = true;
      axios.get('/api/orders.php/')
        .then((response) => {
          this.orders = response.data;
          this.loading = false;
        })
        .catch((error) => {
          this.loading = false;
          console.log(error);
        })
    },
    changeStatus: function(id, status) {
      axios.get(`/api/orders.php?id=${id}&status=${status}/`)
        .then((response) => {
          this.getOrders();
        })
        .catch((error) => {
          console.log(error);
        })
    },
    deleteOrder: function(id) {
      axios.delete(`/api/orders.php?id=${id}/`)
        .then((response) => {
          this.getOrders();
        })
        .catch((error) => {
          console.log(error);
        })
    }
  },
  template: `
  <div class="row my-5">
    <div class="col-12 mb-2">
      <h2>Заявки</h2>
    </div>
    <div class="col-12">
      <div class="row" v-if="orders.length == 0">
        <div class="col-12">
          <p class="text-muted">Нет заявок</p>
        </div>
      </div>
      <div class="row" v-if="orders.length > 0">
        <order
          v-for="order in orders"
          v-bind:key="order.id"
          v-bind:data="order"
          @change-status="changeStatus"
          @delete-order="deleteOrder"
        ></order>
      </div>
    </div>
  </div>`
});

const Settings = Vue.component('settings', {
  data: function() {
    return {
      prices: []
    }
  },
  mounted: function() {
    this.getPrices();
  },
  methods: {
    getPrices: function() {
      axios.get('/api/prices.php/')
        .then((response) => {
          this.prices = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
    },
    updatePrices: function() {
      let prices = {
        relevant: this.prices[0]['price'],
        relevantOtp: this.prices[0]['price_otp'],
        relevantComp: this.prices[0]['price_comp'],
        notRelevant: this.prices[1]['price']
      };
      axios.put('/api/prices.php/', prices)
        .then((response) => {
        })
        .catch((error) => {
          console.log(eror);
        });
    }
  },
  template: `
  <div class="row mb-3 mb-md-5">
    <div class="col-12">
      <h2>Настройки</h2>
    </div>
    <div class="col-12">
      <form class="row" @submit.prevent="updatePrices()">
        <div class="form-group col-12 col-lg-3">
          <label>Обычные участки</label>
          <text-edit
            class="mb-2"
            type="number"
            v-model="prices[0]['price']"
          ></text-edit>
          <label>Рассрочка от ОТП-БАНК</label>
          <text-edit
            class="mb-2"
            type="number"
            v-model="prices[0]['price_otp']"
          ></text-edit>
          <label>Рассрочка от Компании</label>
          <text-edit
            class="mb-2"
            type="number"
            v-model="prices[0]['price_comp']"
          ></text-edit>
          <label>Акционные участки</label>
          <text-edit
            class="mb-2"
            type="number"
            v-model="prices[1]['price']"
          ></text-edit>
          <button type="submit" class="btn btn-primary btn-sm shadow">Сохранить</button>
        </div>
      </form>
    </div>
  </div>`
});

const Building = Vue.component('building', {
  data: function() {
    return {
      houses: [],
      details: [],
      loading: false
    }
  },
  mounted: function() {
    this.getHouses();
  },
  methods: {
    getHouses: function() {
      axios.get('/api/houses.php/')
        .then((response) => {
          this.houses = response.data;
          for (var i = this.houses.length - 1; i >= 0; i--) {
            this.houses[i].details = JSON.parse(this.houses[i].details);
          }
        })
        .catch((error) => {
          console.log(error);
        })
    },
    updateHouses: async function() {
      this.loading = true;
      for (var i = this.houses.length - 1; i >= 0; i--) {
        this.houses[i].details = JSON.stringify(this.houses[i].details);
        await axios.put('/api/houses.php/', this.houses[i])
          .then((response) => {})
          .catch((error) => {
            console.log(error);
          });
        this.houses[i].details = JSON.parse(this.houses[i].details);
      }
      this.loading = false;
    }
  },
  template: `
  <div class="row">
    <div class="col-12 mb-2">
      <h3>Строительство</h3>
    </div>
    <div class="spinner-border text-warning" role="status" v-if="loading">
      <span class="sr-only">Loading...</span>
    </div>
    <div class="col-12 mb-2" v-if="!loading">
      <form class="row" @submit.prevent="updateHouses()">
        <div class="col-12 mb-3 mb-md-5"
          v-for="house in houses"
        >
          <div class="row">
            <div class="col-12">
              <h4>{{ house.name }} ({{ house.sqr_meters }}<sup>м</sup>)</h4>
            </div>
            <div class="col-12 col-md-4"
              v-for="detail in house.details"
            >
              <div class="row">
                <div class="col-12">
                  <label>{{ detail.name }}</label>
                </div>
                <div class="col-12"
                  v-for="(value, index) in detail.values"
                >
                  <div class="row">
                    <div class="col-7">
                      <input
                        class="form-control form-control-sm shadow mb-2"
                        v-model="value.name"
                      >
                    </div>
                    <div class="col-3">
                      <input
                        class="form-control form-control-sm shadow mb-2"
                        v-model="value.price"
                      >
                    </div>
                    <div class="col-1">
                      <button type="button" class="close" aria-label="Close"
                        @click="detail.values.splice(index,1)"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="col-11 mt-2">
                  <button
                    class="form-control form-control-sm shadow-sm"
                    @click="detail.values.push({name:'Название',price:0})"
                  >Добавить</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <button class="btn btn-primary shadow"
            type="submit"
          >Сохранить</button>
        </div>
      </form>
    </div>
  </div>`
});