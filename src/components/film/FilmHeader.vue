<template>
    <div>
        <ul>
            <router-link to="/films/nowplaying" custom v-slot="{ navigate, isActive }">
                <li @click="navigate" ><span :class="isActive ? 'eva-active' : ''">正在热映</span></li>
            </router-link>
            <router-link to="/films/comingsoon" custom v-slot="{ navigate, isActive }">
                <li @click="navigate" ><span :class="isActive ? 'eva-active' : ''">即将上映</span></li>
            </router-link>
        </ul>
    </div>
</template>

<script>

</script>

<style lang="scss" scoped>
ul{
    display: flex;
    height: 0.49rem;
    line-height: .49rem;
    li{
        flex: 1;
        text-align: center;
    }
}

.eva-active{
 color: red;
 border-bottom: 2px solid red;
} 
</style>