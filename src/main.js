import Vue from 'vue'  //es6导入方式
import App from './App.vue'//导入跟组件App
import router from './router'
import store from './store'
Vue.config.productionTip = false 
new Vue({
  router,
  store,
  render: h => h(App) //将实例化app渲染出来后，挂在到app这个节点上
}).$mount('#app')
