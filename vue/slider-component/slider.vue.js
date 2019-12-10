const Slider = Vue.component('slider', {
    data: () => {
        return {
            slides: [],
            uploadedPath: "../../uploads/slider/"
        }
    },
    methods: {
        getSlidesFromStore() {
            const initSlider = this.initSlider;
            axios.get("../../uploads/slider/slider-config.json")
            .then(res => {
                this.slides.push(...res.data.slider);
                initSlider();
            })
            .catch(err => console.log("getSlidesFromStoreError = ", err))
        },
        initSlider() {
            $(document).ready(function(){
            $('.slider').slick({
                dots: true,
                infinite: true,
                autoplaySpeed: 4000,
                autoplay: true,
                speed: 1000,
                prevArrow: false,
                nextArrow: false
            });
            
          });
        }
    },
    
    mounted() {
        this.getSlidesFromStore();
    },
    template: `
    <div class="slider">
        <div class="slide" v-for="slide in slides">
            <div class="source-wrapper">
                <video v-if="slide.type === 'video'" autoplay="autoplay" muted="muted" preload="metadata" loop="loop">
                    <source :src="uploadedPath + slide.src" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'>
                </video>
                <img v-else-if="slide.type === 'image'" :src="uploadedPath + slide.src"></img>
            </div>
        </div>
    </div>`
});