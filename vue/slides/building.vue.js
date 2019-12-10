const BuildingSlide = Vue.component('building', {
  data: function() {
    return {
      houses: [],
      currentHouse: {},
      sum: 0,
      order: {
        plot: null,
        name: '',
        phone: '',
        comment: 'Строительство'
      },
      isAgree: false
    }
  },
  computed: {
    activeSlide: function() {
      return this.currentHouse.images[0];
    },
    nextSlides: function() {
      return this.currentHouse.images.slice(1);
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
            this.houses[i].images = JSON.parse(this.houses[i].images);
            this.houses[i].details = JSON.parse(this.houses[i].details);
            for (var l = this.houses[i].details.length - 1; l >= 0; l--) {
              this.houses[i].details[l].selected = 0;
            }
          }
          this.currentHouse = this.houses[0];
          this.getSum();
        })
        .catch((error) => {
          console.log(error);
        })
    },
    changeCurrentHouse: function(index) {
      this.currentHouse = this.houses[index];
      this.getSum();
    },
    sendOrder: function() {
      this.order.comment += ': ' + this.currentHouse.name;
      for (var i = 0; i < this.currentHouse.details.length; i++) {
        this.order.comment += ', ' + this.currentHouse.details[i].values[this.currentHouse.details[i].selected].name;
      }
      this.order.comment += ' = ' + this.sum + ' руб.';
      axios.post('/api/orders.php/', this.order)
        .then((response) => {
          $('#mainContentModal').modal('show');
        })
        .catch((error) => {
          console.log(error);
        })
    },
    getSum: function() {
      this.sum = 0;
      for (var i = this.currentHouse.details.length - 1; i >= 0; i--)
        this.sum += parseInt(this.currentHouse.details[i].values[this.currentHouse.details[i].selected].price);
    },
    getTriadPrice: function(price) {
      return price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    }
  },
  template: `
  <div class="row mb-3 pt-lg-5">
    <div class="col-12 mx-auto mb-lg-3">
      <h2><a name="srtoi">Строительство</a></h2>
      <p>Закажите дом под ключ из нашего каталога или пришлите свой проект и наша команда реализует его с учетом Ваших пожеланий!</p>
    </div>
    <div class="col-12 mx-auto mb-3 mb-md-5">
      <card-pn class="overflow-hidden">
        <div class="col-12 mb-2">
          <div id="carouselExampleControls"
            class="carousel slide"
            v-if="houses.length > 0"
            data-wrap="false"
            data-ride="false"
            data-interval="100000">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img :src="activeSlide" class="d-block w-100" alt="...">
              </div>
              <div class="carousel-item" v-for="slide in nextSlides">
                <img :src="slide" class="d-block w-100" alt="...">
              </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
              <!--<span class="carousel-control-prev-icon" aria-hidden="true"></span>-->
              <img src="/img/next-button.svg" class="d-block w-50 ml-2" style="transform: rotate(180deg)">
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
              <!--<span class="carousel-control-next-icon" aria-hidden="true"></span>-->
              <img src="/img/next-button.svg" class="d-block w-50 mr-2">
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>
        <div class="col-12">
          <form class="row px-3" @submit.prevent="">
            <div class="col-12 mx-auto mb-2">
              <p class="mb-2"><b>Планировка</b></p>
              <button
                type="button"
                :class="'btn btn-' + (currentHouse.id == house.id ? 'warning' : 'light') + ' mr-2 mb-2 shadow-sm'"
                v-for="(house, index) in houses"
                :key="house.id"
                @click="changeCurrentHouse(index)"
                onclick="$('#carouselExampleControls').carousel(0)"
              >{{ house.name }} ({{ house.sqr_meters }} м<sup>2</sup>)</button>
            </div>
            <div class="col-12 col-md-4 mb-3 mb-md-5 d-block d-sm-block"
              v-for="detail in currentHouse.details"
            >
              <label><b>{{ detail.name }}</b></label>
              <select class="form-control" v-model="detail.selected" @change="getSum()">
                <option v-for="(value, index) in detail.values" :value="index">{{ value.name }}</option>
              </select>
            </div>
            <div class="col-12 mb-2 d-block d-sm-block">
              <h3 class="text-center">Цена: <span style="border-bottom: 3px solid #fec009"><b>{{ getTriadPrice(sum) }} руб.</b></span></h3>
            </div>
            <div class="col-12">
              <div class="row">
                <div class="col-12">
                  <h3 class="text-center mt-4">ЧЕРНОВАЯ ОТДЕЛКА: фундамент, стены с утеплением, перегородки с утеплением и шумоизоляцией, крыша с гидроизоляцией, утепление крыши в двухэтажных домах, пол деревянный утепленный, крыльцо спереди и сзади, окна пластиковые и железные двери</h3>
                  <h3 class="text-center mt-4">ПРЕДЧИСТОВАЯ ОТДЕЛКА: Вентиляция, группа учета электричества с полной разводкой по дому. Полная разводка водяных труб, установлена выгребная яма. Электрический котел, радиаторы. Стены внутри дома готовы под покраску или обои, снаружи сайдинг</h3>
                  <!--<h3 class="text-center mt-3">Скоро тут появятся <span style="border-bottom: 3px solid #fec009"><b>привлекательные</b></span> цены!<br>Но вы уже можете подать заявку!</h3>-->
                </div>
              </div>
              <div class="footer_contact_form row justify-content-center">
                <form class="main_content_block_contact row justify-content-md-center p-lg-5"
                  @submit.prevent="sendOrder()">
                  <div class="col-lg-4 m-3 m-lg-0 col-md-4 name">
                    <text-edit
                      id="orderBuildingInput"
                      v-model="order.name"
                      placeholder="ФИО"
                    ></text-edit>
                  </div>
                  <div class="col-lg-4 m-3 m-lg-0 col-md-4 phone justify-content-center">
                    <text-edit
                      type="number"
                      v-model="order.phone"
                      placeholder="Телефон"
                    ></text-edit>
                  </div>
                  <div class="col-lg-4 col-md-4 m-3 m-lg-0 contact-button">
                    <btn :disabled="!isAgree" type="submit"
                      onclick="ym(55437763, 'reachGoal', ',bana'); return true;"
                    >Заказать</btn>
                  </div>
                </form>
              </div>
            </div>
          </form>
        </div>
      </card-pn>
    </div>
    <div class="col-12 d-none d-sm-none">
      <div class="row">
        <div class="col-12">
          <!--<h2 class="text-center">Закажите строительство дома на Вашем участке и получите баню в подарок!</h2>-->
        </div>
      </div>
      <div class="footer_contact_form row justify-content-center">
        <form class="main_content_block_contact row justify-content-md-center p-lg-5"
          @submit.prevent="sendOrder()">
          <div class="col-lg-4 m-3 m-lg-0 col-md-4 name">
            <text-edit
              id="orderBuildingInput"
              v-model="order.name"
              placeholder="ФИО"
            ></text-edit>
          </div>
          <div class="col-lg-4 m-3 m-lg-0 col-md-4 phone justify-content-center">
            <text-edit
              type="number"
              v-model="order.phone"
              placeholder="Телефон"
            ></text-edit>
          </div>
          <div class="col-lg-4 col-md-4 m-3 m-lg-0 contact-button">
            <btn :disabled="!isAgree" type="submit">Заказать</btn>
          </div>
        </form>
      </div>
    </div>
  </div>`
});
