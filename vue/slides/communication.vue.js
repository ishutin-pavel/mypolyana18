const CommunicationSlide = Vue.component('communication', {
  data: function() {
    return {
      cards: [
        {
          name: 'Газ',
          description: 'До микрорайона доведена газовая труба и установлен распределительный пункт'
        },
        {
          name: 'Вода',
          description: 'Центральное водоснабжение каждого участка'
        },
        {
          name: 'Электричество',
          description: 'На улицах установлены линии электропередач'
        },
        {
          name: 'Дороги',
          description: 'Сделаны дороги первой очереди'
        }
      ]
    }
  },
  template: `
  <container v-slide="3">
    <div class="row">
      <div class="col-12">
        <h2 class="text-white my-3 my-lg-5"><a name="commu">Коммуникации</a></h2>
      </div>
    </div>  
    <div class="row mb-3 mb-xl-5 pb-xl-5">
      <div class="col-12 col-sm-6 col-xl-3 mb-3" v-for="(card, index) in cards">
        <card class="mx-0 mx-lg-2 scale-sm">
          <div class="col-6 col-xl-6 mx-auto mb-3">
            <img class="d-block w-100" :src="'/img/icon/icon'+(index+1)+'.png'">
          </div>
          <div class="col-12">
            <h5 class="card-title text-center font-weight-bold">{{ card.name }}</h5>
            <div style="height:100px">
              <p class="card-text text-center">{{ card.description }}</p>
            </div>
          </div>
        </card>
      </div>
    </div>
    <div class="d-none d-xl-block" style="height:200px">
    </div>
  </container>`
});