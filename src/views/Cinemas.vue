<template>
    <div>
        <div class="box" :style="{height:height}">
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
import request from '@/utils/request'
import BetterScroll from 'better-scroll'
export default {
    data() {
        return {
            cinemaList: [],
            height:'0px'

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
        //动态计算高度
        console.log(document.querySelector('div.footer'))
        this.height = document.documentElement.clientHeight - document.querySelector('div.footer').offsetHeight+'px'
        request({
            url: '/gateway?cityId=110100&ticketFlag=1&k=545491',
            headers: {
                'X-Host': 'mall.film-ticket.cinema.list'
            },
            method: 'get'
        }).then(res => {
            // console.log(res.data.data.cinemas)
            this.cinemaList = res.data.data.cinemas
            // new BetterScroll('.box') //不能初始化过早
            this.$nextTick(() => {
                new BetterScroll('.box', {
                    scrollbar: {
                        fade: true  //滚动条不滑动时消失
                    }
                })
            })
        })
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