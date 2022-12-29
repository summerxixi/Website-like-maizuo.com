<template>
    <div>
        <ul :key="datalist.length">
            <li v-for="data in datalist" :key="data.filmId" @click="handleChangePage(data.filmId)">
                <img :src="data.poster" alt="" />
                <div>
                    <div class="title">{{ data.name }} <span style="font-size: 9px;
    color: #fff;
    background-color: #d2d6dc;
    height: 14px;
    line-height: 14px;
    padding: 0 2px;
    border-radius: 2px;">{{ data.filmType.name }}</span></div>
                    <div class="content">
                        <div>观众评分：<span style="color:red; font-size:.13rem;">{{ data.grade }}</span></div>
                        <div>{{ data.nation }} | {{ data.runtime }}分钟</div>
                        <div class="actors">主演：{{ data.actors | actorsFilter }}</div>
                    </div>
                </div>

            </li>
        </ul>
    </div>

</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import request from '@/utils/request'
//actorsFilter的过滤方法名字
Vue.filter('actorsFilter', (data) => {
    //把原始数组进行映射，将复杂对象映射另一个名字
    if(data==undefined) return '暂无主演'
    return (data.map(iter => iter.name).join(' '))

})
export default {
    data() {
        return {
            datalist: []
        }
    },
    mounted() {
        request({
            url: '/gateway?cityId=511500&pageNum=1&pageSize=18&type=1&k=6091557',
            headers: {
            'X-Host': 'mall.film-ticket.film.list'
            },
            method: 'get'
        }).then(res => {
            this.datalist = res.data.data.films
        })
    },
    methods: {
        handleChangePage(myid) {
            console.log(myid)
            //声明式导航router-link  不是写死的，：to就可以跳转到不同的
            //编程式导航  两种写法
            // location.href = '#/detail'  不推荐，一旦a链接不带#会报错
            // console.log(this)
            //通过路径跳转
            // this.$router.push(`/detail/${data}`) // 进行页面跳转， 会自动判断加不加# 当new Router的时候，就可以访问到this.$router了
            // 2-通过命名路由跳转
            this.$router.push({
                name: 'evaDetail',
                params: {
                    myid
                }
            })

        }
    }
}
</script>
<style lang="scss" scoped>
ul {
    li {
        padding: .15rem;
        overflow: hidden;

        img {
            float: left;
            width: .66rem;
            margin-right: .1rem;
        }

        .title {
            font-size: .16rem;
        }

        .content {
            font-size: .13rem;
            color: grey;
        }

        .actors {
            overflow: hidden;
            -o-text-overflow: ellipsis;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
</style>