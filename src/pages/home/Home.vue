<template>
    <div>
        <navigation-bar></navigation-bar>
        <home-swiper></home-swiper>
    </div>
</template>

<script>
    import NavigationBar from 'common/navigation/NavigationBar'
    import HomeSwiper from './components/Swiper'
    export default {
        name: 'Home',
        components: {
            NavigationBar,
            HomeSwiper
        },
        data() {
            return {

            }
        },
        methods: {

        }
    }
</script>

<style lang="stylus" scoped>

</style>