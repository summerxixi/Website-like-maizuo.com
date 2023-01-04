import Vue from 'vue'
import Vuex from 'vuex'
import request from '@/utils/request'
Vue.use(Vuex)

export default new Vuex.Store({
  //公共状态，将公共用的东西保存，其余地方都可以用
  state: {
    cityId: '110100',
    cityName: '北京',
    cinemaList: []
  },
  //mutations用来对状态进行修改，到时候可以知道修改的地方  /共同管理和呗devtools监控
  mutations: {
    changeCityName(state, cityName) {
      console.log(cityName)
      state.cityName = cityName
    },
    changeCityId(state, cityId) {
      state.cityId = cityId
    },
    changeCinemaData(state, data) {
      state.cinemaList = data

    },
    clearCinemaList(state){
      state.cinemaList = []
    }

  },
  //异步结构
  actions: {
    getCinemaData(store, cityId) {
      return request({
        url: `/gateway?cityId=${cityId}&ticketFlag=1&k=545491`,
        headers: {
          'X-Host': 'mall.film-ticket.cinema.list'
        },
        method: 'get'
      }).then(res => {
        console.log(res.data.data.cinemas)
        // store.state.cinemaList = res.data.data.cinemas
        // new BetterScroll('.box') //不能初始化过早
        store.commit('changeCinemaData', res.data.data.cinemas)
      })
  }
    }

})

//vuex 默认管理在内存，一刷新页面，公共状态消失  使用每次更新后恢复默认原来的  vuex如何持久化 
// vuex项目应用
// 1. 非父子之间通信 2.后端数据的缓存快照，较少数据重复请求，减轻服务器压力