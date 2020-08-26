<template>
    <div v-loading.fullscreen.lock="fullscreenLoading">
        <navigation-bar />
        <home-swiper :swiperList="swiperList" />
        <home-popular :popularList="popularList" />
        <home-new-arrivals :newArrivalsList="newArrivalsList" id="newarr"/>
        <home-parallax-scrolling :list="parallaxList" id="collection" />
        <home-featured-products :featureList="featureList" id="feature" />
        <home-footer />
        <back-to-top />
        <nav-tab-bar v-if="show" />
    </div>
</template>

<script>
    import NavigationBar from 'common/navigation/NavigationBar'
    import HomeSwiper from './components/Swiper'
    import HomePopular from './components/Popular'
    import HomeNewArrivals from './components/NewArrivals'
    import HomeParallaxScrolling from './components/ParallaxScrolling'
    import HomeFeaturedProducts from './components/FeaturedProducts'
    import HomeFooter from './components/Footer'
    import BackToTop from 'common/top/BackToTop'
    import NavTabBar from 'common/navtab/NavTabBar'
    import axios from 'axios'
    export default {
        name: 'Home',
        components: {
            NavigationBar,
            HomeSwiper,
            HomePopular,
            HomeNewArrivals,
            HomeParallaxScrolling,
            HomeFeaturedProducts,
            HomeFooter,
            BackToTop,
            NavTabBar
        },
        data() {
            return {
                show: false, // 控制NavTabBar显隐
                screenWidth: window.innerWidth, //浏览器宽度
                swiperList: [],     // 轮播
                popularList: [],    // 热门
                newArrivalsList: [],    // 新品
                parallaxList: [],    // 视差滚动部分
                featureList: [],     // 特色商品
                fullscreenLoading: false      // loading
            }
        },
        mounted() {
            window.onresize = ()=> {
                return (()=> {
                    this.screenWidth = window.innerWidth
                })()
            }
            this.initScreen()
            this.getHomeInfo()  // 请求首页数据
        },
        methods: {
            initScreen() {
                this.show = this.screenWidth < 768
            },
            async getHomeInfo() {
                try {
                    this.fullscreenLoading = true
                    let res = await axios.get('/api/productIndex')
                    let data = res.data
                    this.swiperList = data.swiperList
                    this.popularList = data.popularList
                    this.newArrivalsList = data.newArrivals
                    this.parallaxList = data.parallaxList
                    this.featureList = data.featureList
                    this.fullscreenLoading = false
                } catch (e) {
                    this.fullscreenLoading = false
                }
            }
        },
        watch: {
            screenWidth(val) {
                this.screenWidth = val
                this.initScreen()
            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>