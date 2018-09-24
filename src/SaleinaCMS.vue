<template>
    <loading v-if="$store.state.config.loading"></loading>
    <h1 v-else-if="$store.state.config.error">{{ $store.state.config.message }}</h1>
    <router-view v-else></router-view>
</template>

<script>

    export default {
        name: "SaleinaCMS"
    };

</script>

<style scoped>

    h1 {
        width: 100%;
        height: 100%;
        font-size: 2.5em;
        color: var(--red);
        justify-content: center;
        align-items: center;
        display: flex;
    }
        
</style>