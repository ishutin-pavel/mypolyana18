const InfrastructureSlide = Vue.component('infrastructure', {
  data: function() {
    return {
      cards: [
        {
          image: 'площадка.png',
          title: 'Детские площадки'
        },
        {
          image: 'школа.png',
          title: 'Школа'
        },
        {
          image: 'магазин.png',
          title: 'Магазины'
        },
        {
          image: 'сад.png',
          title: 'Детский сад'
        },
        {
          image: 'больница.png',
          title: 'Больница'
        },
        {
          image: 'кафе.png',
          title: 'Кафе'
        },
        {
          image: 'почта.png',
          title: 'Почта'
        }
      ]
    }
  },
  template: `
  <div class="my-xl-5">
    <div class="row my-3">
      <div class="col-12">
        <h2><a name="infostr">Инфраструктура*</a></h2>
        <p>Находятся в с. Завьялово в 5 минутах от микрорайона*</p>
      </div>
    </div>
    <div class="row mb-xl-5 pb-xl-5">
      <div class="col-6 col-sm-3 col-xl-4 mx-auto"
        v-for="card in cards" :key="card.title">
        <card-bn class="bg-transparent scale">
          <div class="col-8 col-md-4 mx-auto mb-0 pb-0 mb-xl-1">
            <img class="d-block w-100" :src="'/img/i_icon/'+card.image">
          </div>
          <div class="col-12">
            <p class="card-text text-center">{{ card.title }}</p>
          </div>
        </card-bn>
      </div>
    </div>
  </div>`
});