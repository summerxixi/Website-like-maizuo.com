<template>
    <div class="swiper-container " :class="name">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
    </div>
</template>
正在热映
<script>
import Swiper from 'swiper/bundle';
// import styles bundle
import 'swiper/css/bundle';

export default {
    props: {
        // loop: {
        //     type: Boolean,
        //     deafault: true
        // },
        preview:{
            type:Number,
            default:1
        },
        name:{
            type:String,
            default:'swiper'
        }

    },
    mounted() {
        new Swiper('.'+this.name, {
            slidesPerView: this.preview,
            spaceBetween: 30,
            freeMode: true,
        })
    }
}

</script>