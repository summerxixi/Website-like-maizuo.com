<template>
    <div v-if="filminfo">
        <!-- 和datalist.length异曲同工之妙 -->
        <detail-header v-scroll="50">
            {{ filminfo.name }}
        </detail-header>
        <div :style="{ backgroundImage: 'url(' + filminfo.poster + ')' }" class="poster"></div>
        <div class="content">
            <div>
                <div>{{ filminfo.name }}</div>
                <div class="film-detail">
                    <div>{{ filminfo.category }}</div>
                    <div>{{ filminfo.premiereAt | dateFilter }}上映</div>
                    <div>{{ filminfo.nation }} | {{ filminfo.runtime }}分钟</div>
                    <div :class="isHidden ? 'hidden' : ''">
                        {{ filminfo.synopsis }}
                    </div>
                    <div style="text-align:center;">
                        <i class="iconfont
                        " @click="isHidden = !isHidden" :class="isHidden ? 'icon-xiangxia' : 'icon-xiangshang'"></i>
                    </div>
                </div>
                <div class="actor">
                    <div>演职人员</div>
                    <detail-swiper :preview="4" name="actor">
                        <!-- 为什么这里的preview要: 但是nmae不需要也行 -->
                        <detail-swiper-item v-for="(actor, index) in filminfo.actors" :key="index">
                            <!-- <img :src="actor.avatarAddress" alt=""> -->
                            <div :style="{ backgroundImage: 'url(' + actor.avatarAddress + ')' }" class="avater"></div>
                            <div class="realname">{{ actor.name }}</div>
                            <div class="role">{{ actor.role }}</div>
                        </detail-swiper-item>
                    </detail-swiper>
                </div>

                <div class="actor">
                    <div>剧照</div>
                    <detail-swiper :preview="3.5" name="photos">
                        <detail-swiper-item v-for="(data, index) in filminfo.photos" :key="index">
                            <!-- <img :src="actor.avatarAddress" alt=""> -->
                            <div @click="handlePreview(index)" :style="{ backgroundImage: 'url(' + data + ')' }"
                                class="avater"></div>
                        </detail-swiper-item>
                    </detail-swiper>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import request from '@/utils/request'
import moment from 'moment'
import detailSwiper from '@/components/detail/DetailSwiper'
import detailSwiperItem from '@/components/detail/DetailSwiperItem'
import detailHeader from '@/components/detail/DetailHeader'
import '../assets/iconfont/iconfont.css'
import { ImagePreview, Toast } from 'vant';
import Vue from 'vue'
import obj from '@/utils/mixinObj'
moment.locale('zh-cn')
Vue.filter('dateFilter', (date) => {
    return moment(date * 1000).format('YYYY-MM-DD')

})

Vue.directive('scroll', {
    inserted(el, binding) {
        el.style.display = 'none'
        console.log(binding)
        //console.log(el)//拿到dom节点  封装成指令，然后对dom进行过是否显示操作 ,binding.value就是底部tabber的值
        window.onscroll = () => {
            if ((document.documentElement.scrollTop || document.body.scrollTop) > binding.value) {
                el.style.display = 'block'
            } else {
                el.style.display = 'none'
            }
        }
    },
    unbind() {
        window.scroll = null
    }
})
export default {
    mixins:[obj],
    data() {
        return {
            filminfo: null,//返回一个对象的,数据没回来啊之前就渲染会报错的
            isHidden: true
        }
    },
    components: {
        detailSwiper,
        detailSwiperItem,
        detailHeader
    },

    methods: {
        handlePreview(position) {
            ImagePreview({
                images: this.filminfo.photos,
                startPosition: position,
                closeable: true,
                closeIconPosition: 'top-right'
            });
        }
    },
    mounted() {

        console.log('created', this.$route.params.myid)
        console.log(this.$route) //拿到当前匹配的detail的路由，有params:myid:""
        //this.$route.params.myid  然后axios利用myid发请求到详细接口，获取详细数据，布局页面
        request({
            url: `/gateway?filmId=${this.$route.params.myid}&k=8328638`,
            headers: {
                'X-Host': 'mall.film-ticket.film.info'
            }
        }).then(res => {
            //
            this.filminfo = res.data.data.film
            this.filminfo.premiereAt = new Date(this.filminfo.premiereAt)
            // console.log(this.filminfo.premiereAt * 1000)
            // console.log(res.data.data.film)

        })
    },
    // mounted() {
    //     window.onscroll = () => {
    //         if (document.documentElement.scrollTop > 50) {
    //             console.log("显示")
    //         } else {
    //             console.log("Yincanf")
    //         }

    //     }
    //会影响到其他页面的
    // },
    // destoryed(){
    //         window.onscroll=null
    //     },
}

</script>

<style lang="scss" scoped>
body {
    background: pink;

}

.poster {
    width: 100%;
    height: 2.12rem;
    background-position: center;
    background-size: cover;
}

.content {
    padding: .15rem;

    .film-detail {
        font-size: .13rem;
        color: #797d82;
        margin-top: .04rem;
    }

    .hidden {
        height: .30rem;
        line-height: .15rem;
        overflow: hidden;
    }
}

.actor {
    margin-top: .20rem;

    .avater {
        height: .85rem;
        background-position: center;
        background-size: cover;
    }

    .realname {
        padding-top: 10px;
        font-size: 12px;
        color: #84194f;
        width: .85rem;
        height: .18rem;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
    }

    .role {
        text-align: center;
        font-size: .10rem;
        color: #797d82;
        height: .25rem;
        width: .85rem;
        overflow: hidden;
        // background: red;
    }

    .swiper-container {
        overflow: hidden;
    }
}
</style>