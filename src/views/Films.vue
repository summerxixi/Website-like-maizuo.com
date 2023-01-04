<template>
  <div class="about">
    <!-- <film-swiper :key="datalist.length"> 防止初始话过早，datalist还是空数组，只有数据请求回来再渲染 -->
    <film-swiper :key="datalist.length"> 
      <film-swiper-item v-for="data in datalist" :key="data.id" class="film-swiper-item">
      <img :src="data.imgUrl" alt="">
      </film-swiper-item>
    </film-swiper>
    <film-header class="sticky"></film-header>
    <router-view></router-view>
  </div>
</template>
<script>
import filmSwiper from '@/components/film/FilmSwiper'
import filmSwiperItem from '@/components/film/FilmSwiperItem'
import FilmSwiper from '../components/film/FilmSwiper.vue'
import filmHeader from '@/components/film/FilmHeader'
import axios from 'axios'
export default {
  data(){
    return{
      datalist:[]
    }
  },

  mounted(){
    //同地址域名，前缀可以省去
   axios.get('/banner.json').then((res)=>{
    console.log(res.data)
    this.datalist = res.data.banner
   })
},
components: {
    filmSwiper,
    filmSwiperItem,
    filmHeader

  }
}
</script>

<style lang="scss" scoped>
.film-swiper-item{
img{
  width: 100%;
}
}
.sticky{
  position: sticky;
  top: 0px;
  background: white;

  z-index: 2;
}


</style>