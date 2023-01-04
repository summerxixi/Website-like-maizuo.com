import Vue from 'vue'
import VueRouter from 'vue-router'
import Films from '@/views/Films'
import Cinemas from '@/views/Cinemas'
import NowPlaying from '@/views/films/NowPlaying'
import ComingSoon from '@/views/films/ComingSoon'
// import Center from '@/views/Center'
import Login from '@/views/Login'
import Search from '@/views/Search'
import Detail from '@/views/Detail'
import City from '@/views/City'
// import Order from '@/views/Order'

Vue.use(VueRouter) // 注册路由插件, 两个全局 router-view router-link

// 配置表
const routes = [
  {
    path: '/films',
    component: Films,
    children: [{
      name:'nowPlaying',
      path: '/films/nowplaying',
      component: NowPlaying
    },
    {
      path: '/films/comingsoon',
      component: ComingSoon
    }, {
      path: '/films', //重定向films的也买你，直接到nowplaying页面
      redirect: '/films/nowplaying'
    }
    ]
  },
  {
    path: '/cinemas',
    component: Cinemas
  },
  {
    path: '/cinemas/search', //虽然是二级路由，但不是嵌套关系
    component: Search
  },
  {
    name: 'evaDetail',  //命名路由，都可以获得
    path: '/detail/:myid', //当点击跳转到不同的id时，需要用到动态路由 :myid(随意名字)
    component: Detail  //好像去掉 /:myid不影响结果啊
  },
  {
    path: '/center',
   component: ()=>import('@/views/Center'), //路由懒加载，将路由对应的页面在刷新页面的时候临时加载，加快更新速度
    meta: {
      isEvaRequired: true
    }
  },
  {
    path: '/order',
    component: ()=>import('@/views/Order'),
    meta: {
      isEvaRequired: true
    }
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/city',
    component: City,
  },
  // 重定向
  {
    path: '*',
    redirect: '/films'
  }
]

const router = new VueRouter({
  routes,
  mode: 'history' //history模式没有#，hash模式有#的在网页链接时候
})
//全局拦截, 用于当需要用户登陆后才能进入的时候
router.beforeEach((to, from, next) => {
  console.log(to)
  //不需要拦截,调用next()
  // if(某几个需要授权的路由){
  //   if(授权通过){
  //     next()
  //   }else{
  //     next('/login')
  //   }
  // }
  // else{
  //   next() 
  // }
  // if(to.fullPath==='/center')
  if (to.meta.isEvaRequired) //判断本覅存储中是否有token字段， if(localStorage.getItem('token'))
  {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }  //为了login后冲定向到对应的页面，比如很多要登陆才能跳转,为了记住从哪里页面开始进行login的
      })
    }
  } else {
    next()
  }
})
export default router

