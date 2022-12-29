<template>
    <div class="swiper-container swiper">
        <div class="swiper-wrapper">
            <slot></slot>
    </div>
        <div class="swiper-pagination"></div>
    </div>
</template>
正在热映
<script>
 import Swiper from 'swiper/bundle';
// import styles bundle
import 'swiper/css/bundle';

export default{
props:{
  loop:{
    type:Boolean,
    deafault:true
  }
},
mounted(){
    new Swiper ('.swiper', {
    loop: true, // 循环模式选项
    autoplay: true,

    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
    },
    
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    
    // 如果需要滚动条
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  })        
}
}

</script>