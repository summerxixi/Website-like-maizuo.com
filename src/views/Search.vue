<template>
    <div>
        <form action="/">
            <van-search v-model="value" 
            placeholder="请输入搜索关键词" 
            show-action 
            @search="onSearch" 
            @cancel="onCancel" />
        </form>
        <ul v-if="value">
                <li v-for="data in computedList" :key="data.cinemaId">
                    <div class="left">
                        <div class="cinema_name">{{ data.name }}</div>
                        <div class="cinema_text">{{ data.address }}</div>

                    </div>
                    <div class="right cinema_name">
                        <div style="color:red;">￥{{ data.lowPrice / 100 }}起</div>

                    </div>
                </li>
            </ul>

    </div>
</template>

<script>
export default {
    data(){
        return{
            value:''
        }
    },
    computed:{
    computedList(){
        return this.$store.state.cinemaList.filter(item=> item.name.
        toUpperCase().includes(this.value.toUpperCase())||item.address.
        toUpperCase().includes(this.value.toUpperCase()))
    }},
    methods:{
    onSearch(){

    },
    onCancel(){
        this.$router.back()

    }
    },
    mounted() {
        if (this.$store.state.cinemaList.length === 0) {
            this.$store.dispatch('getCinemaData', this.$store.state.cityId)

        } else {
            console.log("缓存")
        }
    }
}
</script>

<style scoped lang="scss">
li {
    padding: .15rem;
    display: flex;
    justify-content: space-between;

    .left {
        width: 2.8rem;
    }

    .search-icon {
        padding-right: 12px;

    }

    .cinema_name {
        color: #191a1b;
        font-size: 15px;
    }

    .cinema_text {
        color: #797d82;
        font-size: 12px;
        margin-top: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        // float: left;
        width: 2.12rem;
    }
}
</style>