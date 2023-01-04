<template>
    <div>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
            <van-cell v-for="data in datalist" :key="data.filmId" @click="handleChangePage(data.filmId)">
                <img :src="data.poster" alt="" />
                <div>
                    <div class="title">{{ data.name }} <span>{{ data.filmType.name }}</span></div>
                    <div class="content">
                        <div>观众评分：<span style="color:red; font-size:.13rem;">{{ data.grade }}</span></div>
                        <div>{{ data.nation }} | {{ data.runtime }}分钟</div>
                        <div class="actors">主演：{{ data.actors | actorsFilter }}</div>
                    </div>
                </div>
            </van-cell>
        </van-list>
    </div>

</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import request from '@/utils/request'
//actorsFilter的过滤方法名字
Vue.filter('actorsFilter', (data) => {
    //把原始数组进行映射，将复杂对象映射另一个名字
    if (data == undefined) return '暂无主演'
    return (data.map(iter => iter.name).join(' '))

})
export default {
    data() {
        return {
            datalist: [],
            list: [],
            loading: false,
            finished: false,
            current: 1,
            total: 0
        }
    },
    mounted() {
        request({
            url: `/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=103337`,
            headers: {
                'X-Host': 'mall.film-ticket.film.list'
            },
            method: 'get'
        }).then(res => {
            this.datalist = res.data.data.films
            // console.log("dddddd")
            // console.log(this.$store)
            // console.log(res.data.data.films)
            this.total = res.data.data.total
        })
    },
    methods: {
        onLoad() {
            console.log("到底了")
            //bug之一： 从其detail页面返回时，滚动条撑开会导致返回就是到底了，因为数据还没回来，this.total和length都是0，所以执行了
            if (this.datalist.length === this.total && this.total != 0) {
                this.finished = true
                return //表示后续代码都不再执行
            }

            this.current++
            request({
                url: `/gateway?cityId=110100pageNum=${this.current}&pageSize=10&type=1&k=103337`,
                headers: {
                    'X-Host': 'mall.film-ticket.film.list'
                },
                method: 'get'
            }).then(res => {
                // this.datalist = res.data.data.films  用this.current获取新的数据，pagenum的值不是1，每次获取一页，获取后新的要和原来的合并
                this.datalist = [...this.datalist, ...res.data.data.films]
                //将loading主动设置为false
                this.loading = false
            })

        },
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
.van-list {
    .van-cell {
        //为什么不是van-list 因为渲染时是class类名
        padding: .15rem;
        overflow: hidden;

        img {
            float: left;
            width: .66rem;
            margin-right: .1rem;
        }

        .title {
            font-size: .16rem;

            span {
                font-size: 9px;
                color: #fff;
                background-color: #d2d6dc;
                height: 14px;
                line-height: 14px;
                padding: 0 2px;
                border-radius: 2px;
            }
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