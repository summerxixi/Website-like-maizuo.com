<template>
    <div class="footer">

        <!-- 声明式链接 -->
        <!-- <li><a href="/#/films">电影</a></li>
        <li><a href="/#/cinemas">影院</a></li>
        <li><a href="/#/center">我的</a></li> -->
        <!-- 声明式导航 -->
        <ul>
            <!-- 不加tag默认a链接 不过在在vue4中不能写tag了，取消了 -->
            <router-link to="/films" custom v-slot="{ navigate, isActive }">
                <li @click="navigate" :class="isActive ? 'router-link-exact-active' : ''"><i
                        class="iconfont icon-dianying"></i><span>电影</span></li>
            </router-link>
            <router-link to="/cinemas" custom v-slot="{ navigate, isActive }">
                <li @click="navigate" :class="isActive ? 'router-link-exact-active' : ''"><i
                        class="iconfont icon-yingyuan"></i><span>影院</span></li>
            </router-link>
            <router-link to="/center" custom v-slot="{ navigate, isActive }">
                <li @click="navigate" :class="isActive ? 'router-link-exact-active' : ''"><i
                        class="iconfont icon-wode-wodefensi"></i><span>我的</span></li>
            </router-link>
        </ul>
    </div>
</template>

<script>
import '../assets/iconfont/iconfont.css'  //如果只有一句import没有export default 会报错
export default {

}
</script>
<style lang="scss" scoped>
.footer {
    position: fixed;
    bottom: 0rem;
    left: 0rem;
    width: 100%;
    height: .49rem;
    background: rgb(32, 156, 32);
    z-index: 100;

    ul {
        display: flex;

        li {
            flex: 1;
            line-height: .25rem;
            text-align: center;
            display: flex;   
            flex-direction: column;
            i{
                font-size: .2rem;
            }
            span{
                font-size: 16px;
            }
        }
    }
}

.router-link-exact-active {
    color: red;
}
</style>