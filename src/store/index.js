import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  //公共状态，将公共用的东西保存，其余地方都可以用
  state:{   
    cityId:'310100',
    cityName:'北京'


  }

})
