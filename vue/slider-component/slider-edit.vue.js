const SliderEdit = Vue.component('slider-edit', {
    data: () => {
        return {
            slides: [],
            file: null,
            uploadedPath: "../../uploads/slider/",
            disabled: true,
        }
    },
    mounted() {
        this.getSlidesFromStore();
    },
    methods: {
        getSlidesFromStore() {
            axios.get("../../uploads/slider/slider-config.json")
            .then(res => {
                this.slides.push(...res.data.slider);
            })
            .catch(err => console.log("getSlidesFromStoreError = ", err))
        },
        upploadFile() {
            // Когда пользователь добавил файл мы инициализируем состояния
            this.disabled = !this.disabled;
            this.file = this.$refs['upload-file'].files[0];
            
        },
        deleteFile(id) {
            // Инициализация объекта для работы с формами (конструктор форм)
            const slideId = id;
            const slides = this.slides;
            let formData = new FormData();
            formData.append('type', "delete");
            formData.append('delete_id', slideId);

            axios.post( '/admin/edit-galery.php',
                formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              }
            )
            .then(function(res){
                for(let item in slides) {
                    if(slides[item]["id"] === slideId) {
                        slides.splice(item, 1);
                    }
                }
            })
            .catch(function(err){
                console.log('FAILURE!!', err);
            });
        },
        saveFile() {
            // Инициализация объекта для работы с формами (конструктор форм)
            let formData = new FormData();
            const slides = this.slides;
            this.disabled = !this.disabled;
            formData.append('file', this.file);
            formData.append('type', "create");

            axios.post( '/admin/edit-galery.php',
                formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              }
            )
            .then(function(res){
                const item = JSON.parse(res.data.data);
                slides.push(item);
            })
            .catch(function(err){
                console.log('FAILURE!!', err);
            });
        }
    },
    template: `
        <div class="container slider-edit">
        <h2>Галерея</h2>
        <button class="slider-edit btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
         Редактировать галерею
         <i class="fas fa-bars"></i>
        </button>
            <div class="collapse" id="collapseExample">
                <div class="row uploads-wrapper">
                    <div v-if="slides.length" v-for="(slide, index) in slides" class="col-sm-12 col-md-3 md-form">
                        <div class="file-field">
                        <button type="button" class="btn btn-danger remove-slide" @click="deleteFile(slide.id)">X</button>
                        <div class="z-depth-1-half mb-4">
                                <img v-if="slide.type === 'image'" :src="uploadedPath + slide.src" class="img-fluid"
                                alt="example placeholder">
                                <video v-else controls="controls">
                                    <source :src="uploadedPath + slide.src" type='video/ogg; codecs="theora, vorbis"'>
                                </video>
                            </div>
                            </div>
                    </div>
                </div>
            

                <div class="add-new btn btn-mdb-color btn-rounded float-left">
                    <span>Добавить новый слайд</span>
                    <input type="file" ref="upload-file" multiple value="Добавить файл" class="upload-file" @change="upploadFile">
                </div>
                <button :disabled="disabled" type="button" class="w-100 btn btn-success" @click="saveFile">Сохранить</button>
            </div>
        </div>
    `
});