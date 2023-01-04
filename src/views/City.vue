<template>

    <div class="city">
        <van-index-bar :index-list="computedList" @select="handleChange">
            <div v-for="data in cityList" :key="data.type">
                <van-index-anchor :index="data.type" />
                <van-cell :title="item.name" v-for="item in data.list" :key="item.cityId" @click="handleClick(item)" />

            </div>
        </van-index-bar>
    </div>
</template>

<script>
import request from '@/utils/request'
import { Toast } from 'vant'
export default {
    data() {
        return {
            cityList: [],
            indexList: []


        }
    },
    mounted() {
        request({
            url: '/gateway?k=6377500',
            headers: {
                'X-Host': 'mall.film-ticket.city.list'
            }
        }).then(res => {
            this.cityList = this.renderCity(res.data.data.cities)
            console.log(res.data.data)
            //a,b进行分组， 利用转换后的数据结合组件库进行渲染页面
        })
    },
    computed: {
        computedList() {
            return this.cityList.map(item => item.type) //data数据改变,computed因改变而改变

        }

    },
    methods: {
        renderCity(list) {
            console.log(list)
            var letterlist = []
            var cityList = []
            for (let i = 65; i < 91; i++) {
                letterlist.push(String.fromCharCode(i))
            }
            letterlist.forEach(letter => {
                var newlist = list.filter((item) => item.pinyin.substring(0, 1).toUpperCase() === letter)
                if (newlist.length > 0) {
                    cityList.push({
                        type: letter,
                        list: newlist
                    })
                    //this.indexList.push(letter)

                }
            })
            return cityList
        },
        handleChange(e) {
            console.log(e)
            Toast({
                message: e,
                duration: 0

            })
        },
        handleClick(item) {
    
            // 传统的多页面方案
            //  1. location.href = '#/cinemas?cityname=' + item.name
            //  2. cookie , localStorage

            // 单页面方案,
            //  1. 中间人模式
            //  2. bus事件总线 $on ,$emit

            // vuex- 状态管理模式，会被拦截，如果数据更改，也会同步更新？

            //   console.log()
            //   this.$store.state.cityName = item.name //
            // this.$router.push({
            //     name: 'nowPlaying',
            //     params: {
            //     id
            //     }
            // })
            this.$store.state.cityName = item.name 
            this.$router.back()
        }
    }
}
</script>

<style lang="scss" >
.van-toast--html,
.van-toast--text {
    min-width: 20px;
}

// .city{  //错的，必须全局设置
//     .van-toast--html, .van-toast--text{
//     min-width: 20px ;
// }
// }
</style>