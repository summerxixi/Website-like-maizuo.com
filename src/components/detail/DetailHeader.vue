<template>
<div class="header">
    <i class="iconfont icon-fanhui" @click="handleBack"></i>
   <slot></slot>
</div>
</template>
<script>
export default{
    methods:{
        handleBack(){
            this.$router.back() //返回上一个页面
            //有history.back()和history.go(-1)
        }
    }
}
</script>
<style lang="scss" scoped>
.header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: .44rem;
    line-height: .44rem;
    background: white;
    text-align: center;

    i{
        font-size: .25rem;
        position: fixed;
        left: 10px;
        top: 0px;
        height: .44rem;
    line-height: .44rem;

    }
}
</style>