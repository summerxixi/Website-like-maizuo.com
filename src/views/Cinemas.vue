<template>
    <div>
        <van-nav-bar title="影院" ref="navbar" :fixed="true">
            <template #left>
                {{ $store.state.cityName }} <van-icon name="arrow-down" size="18" @click="handleLeft" />
            </template>
            <template #right>
                <van-icon name="search" class="search-icon" size="18" color="black" @click="handleRight" />
            </template>
        </van-nav-bar>
        <div class="box" :style="{ height: height }">
            <ul>
                <li v-for="data in $store.state.cinemaList" :key="data.cinemaId">
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
export default {
    data() {
        return {
            // cinemaList: [],
            height: '0px'

        }

    },
    methods: {
        handleLeft() {
            this.$router.push('/city')

        },
        handleRight() {
            this.$router.push('/cinemas/search')
        }

    },

    mounted() {
        // request({
        //     url: '/gateway?cityId=511500&pageNum=1&pageSize=18&type=1&k=6091557',
        //     headers: {
        //         'X-Host': 'mall.film-ticket.film.list'
        //     },l
        //     method:'get'

        // }).then(res => {
        //     console.log(res)
        // })
        // console.log("navbar")
        // //navbar的高度
        // console.log(this.$refs.navbar.$el.offsetHeight)
        //动态计算高度
        console.log(document.querySelector('div.footer'))
        this.height = document.documentElement.clientHeight - this.$refs.navbar.$el.offsetHeight - document.querySelector('div.footer').offsetHeight + 'px'
        console.log(this.$store.state.cityId)
        if (this.$store.state.cinemaList.length === 0) {
            //只要数据已经请求了就不再请求，所以if...
             //但是由于时异步请求，better-scroll可能在数据没请求回来就开始了，所以要等异步请求结束了再进行nextTIck
            //解决办法，改成promise对象，等resolve后再进行行动
            this.$store.dispatch('getCinemaData', this.$store.state.cityId).then(res=>{
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