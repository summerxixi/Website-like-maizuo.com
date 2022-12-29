<template>
    <div>
        login
        <button @click="handleLogin">登陆</button>
    </div>
</template>
<script>
export default{
    methods:{
        handleLogin(){
            setTimeout(()=>{
                localStorage.setItem('token','后端返回的token字段')
               // this.$router.back('/nowplaying') //返回
               //console.log(this.$route.query.redirect)
               //在js里面的参数redirect: to.fullpath会存在数据里面，query里面获取的
               this.$router.push(this.$route.query.redirect)
            //    1.获取query字段
            //2.跳到当时想要跳转的页面
            },0)
        }
    }
}
</script>