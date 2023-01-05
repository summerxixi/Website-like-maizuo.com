const  obj = {
    created(){
        this.$store.commit('hidden')
    },
    destroyed(){
        //底部选项卡的存在与消失
        this.$store.commit('show')
    },
}

export default obj