// import axios from 'axios'
// const request = axios.create({
//   baseURL: 'http://124.222.76.55:3000/',
//   withCredentials: true,
//   timeout: 15000
// })

// //response interceptor
// request.interceptors.response.use(
//   response => {
//     if (response.status!==200){
//         console.log("服务器异常")
//     }
//     if (response.data.status!=="10000"){
//         console.log(response.data.message)
//     }
//     return response.data
//   }
// )

// export default request


import axios from 'axios'

// function httpfilmlist(params){
//   return  axios({
//     url: `https://m.maizuo.com/gateway?filmId=${this.$route.params.myid}&k=8328638`,
//     headers: {
//         ' X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16720644901216055565352961","bc":"110100"}',
//         'X-Host': 'mall.film-ticket.film.info'
//     }
// })
// }

// function httpfilm(){
//   axios({
//     url: 'https://m.maizuo.com/gateway?cityId=511500&pageNum=1&pageSize=18&type=1&k=6091557',
//     headers: {
//         ' X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16717649201034004786577409"}',
//         'X-Host': 'mall.film-ticket.film.list'
//     },
//     method: 'get'
// })
// }
// export default {
//   httpfilmlist,
//   httpfilm
// }
//到时候使用的时候 import  rquest  使用要request.httpfilmlist 和httpfilm


const request = axios.create({
  baseURL: 'https://m.maizuo.com',
  timeout: 10000  ,
  headers: { ' X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16720644901216055565352961","bc":"110100"}',
}
});

export default request