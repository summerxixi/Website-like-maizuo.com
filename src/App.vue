<template>
  <div>
    <tab-bar ref="mytabber" v-show="$store.state.isTabbarShow"></tab-bar>
    <router-view></router-view>
    <section></section>
  </div>
</template>

<script>
import axios from 'axios'
import request from '@/utils/request'
import tabBar from './components/TabBar'
import Vue from 'vue';
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
//@符号=》src的绝对路径
export default{
  data(){
    return {

    }
  },
  mounted(){
    console.log(this.$refs.mytabber.$el.offsetHeight)
  },
  methods:{

  },
  components:{
    tabBar
  }
}

</script>

<style>
body {
  font-size: 16px;
}

*{
  padding: 0;
  margin: 0;
}

ul{
  list-style: none;
}
.router-link-exact-active {
  color: red;
}
section{
  margin-bottom: .49rem;
}
/* .evaactive{
  font-size: 54px;
} */
</style>