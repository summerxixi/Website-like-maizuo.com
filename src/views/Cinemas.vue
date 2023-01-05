<template>
    <div>
        <van-nav-bar title="影院" ref="navbar" :fixed="true">
            <template #left>
                {{cityName }} <van-icon name="arrow-down" size="18" @click="handleLeft" />
            </template>
            <template #right>
                <van-icon name="search" class="search-icon" size="18" color="black" @click="handleRight" />
            </template>
        </van-nav-bar>
        <div class="box" :style="{ height: height }">
            <ul>
                <li v-for="data in cinemaList" :key="data.cinemaId">
                    <div class="left">
                        <div class="cinema_name">{{ data.name }}</div>
                        <div class="cinema_text">{{ data.address }}</div>

                    </div>
                    <div class="right cinema_name">
                        <div style="color:red;">￥{{ data.lowPrice / 100 }}起</div>

                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

import BetterScroll from 'better-scroll'
import { mapState,mapActions,mapMutations} from 'vuex'
export default {
    data() {
        return {
            // cinemaList: [],
            height: '0px'

        }

    },
    computed:{
        ...mapState(['cinemaList','cityId','cityName']) //函数调用，返回一个对象 等于 cinemaList：function(){return this.$store.state.cine..}
//这里还可以实现其余对象和...mapState的解析合并，拓展为更大的对象 state有什么状态就指能映射什么状态
    },
    methods: {
        ...mapActions(['getCinemaData']),
        ...mapMutations(['clearCinemaList']),

        handleLeft() {
            this.$router.push('/city')
            this.clearCinemaList() //每次切换城市要记得将原来的电影列表清空

        },
        handleRight() {
            this.$router.push('/cinemas/search')
        },
    },

    mounted() {
        // //navbar的高度
        // console.log(this.$refs.navbar.$el.offsetHeight)
        //动态计算高度
        console.log(document.querySelector('div.footer'))
        this.height = document.documentElement.clientHeight - this.$refs.navbar.$el.offsetHeight - document.querySelector('div.footer').offsetHeight + 'px'
        // console.log(this.$store.state.cityId)
        if (this.cinemaList.length === 0) {
            //只要数据已经请求了就不再请求，所以if...
             //但是由于时异步请求，better-scroll可能在数据没请求回来就开始了，所以要等异步请求结束了再进行nextTIck
            //解决办法，改成promise对象，等resolve后再进行行动   this.$store.dispatch('getCinemaData', this.cityId).then
            this.getCinemaData(this.cityId).then(res=>{
                console.log("数据完事了")
                this.$nextTick(() => {
                new BetterScroll('.box', {
                    scrollbar: {
                        fade: true  //滚动条不滑动时消失
                    }
                })
            })
            })
        } else {
            console.log("缓存")
            this.$nextTick(() => {
                new BetterScroll('.box', {
                    scrollbar: {
                        fade: true  //滚动条不滑动时消失
                    }
                })
            })

        }
        // request({
        //     url: `/gateway?cityId=${this.$store.state.cityId}&ticketFlag=1&k=545491`,
        //     headers: {
        //         'X-Host': 'mall.film-ticket.cinema.list'
        //     },
        //     method: 'get'
        // }).then(res => {
        //     // console.log(res.data.data.cinemas)
        //     this.cinemaList = res.data.data.cinemas
        //     // new BetterScroll('.box') //不能初始化过早
        //     this.$nextTick(() => {
        //         new BetterScroll('.box', {
        //             scrollbar: {
        //                 fade: true  //滚动条不滑动时消失
        //             }
        //         })
        //     })
        // })
    }
}
</script>

<style lang="scss" scoped>
.box {
    overflow: hidden;
    position: relative; //防止滚动条超过box的height,修正滚动条位置
    // height: 6.18rem;
}

li {
    padding: .15rem;
    display: flex;
    justify-content: space-between;

    .left {
        width: 2.8rem;
    }

    .search-icon {
        padding-right: 12px;

    }

    .cinema_name {
        color: #191a1b;
        font-size: 15px;
    }

    .cinema_text {
        color: #797d82;
        font-size: 12px;
        margin-top: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        // float: left;
        width: 2.12rem;
    }
}
</style>