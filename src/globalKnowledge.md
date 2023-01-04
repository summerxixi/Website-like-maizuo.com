# 路由

# 吸顶功能

# 过滤器

# 过滤查询


# 获取数据三种不同的情况
## 跨域的情况
## 请求头header
## action-origin *

# 多余数据小数点表示
 ` overflow: hidden; text-overflow: ellipsis; white-space: nowrap; `


# betterScroll 
  一个插件 下载` cnpm i --save better-scroll` 

# vuex 
## 1.注意事项
vuex 默认管理在内存，一刷新页面，公共状态消失  使用每次更新后恢复默认原来的  vuex如何持久化 


## 2.vuex项目的应用
1. 非父子之间通信 
2. 后端数据的缓存快照，较少数据重复请求，减轻服务器压力

## vuex的使用
### 同步使用
    ```js
    export default new Vuex.Store({
        //公共状态，将公共用的东西保存，其余地方都可以用
        state:{   
        cityId:'110100',
        cityName:'北京'
        },
        //mutations用来对状态进行修改，到时候可以知道修改的地方  /共同管理和呗devtools监控
        mutations:{
        changeCityName(state,cityName){
            console.log(cityName)
            state.cityName = cityName
        },
        changeCityId(state,cityId){
            state.cityId = cityId
        }

        }
        }) 
     ```
    和 
    ```js
        this.$store.commit('changeCityName',item.name)  //触发事件，并把参数传过去
        this.$store.commit('changeCityId',item.cityId)
        this.$router.back()
        ```
### 异步使用

