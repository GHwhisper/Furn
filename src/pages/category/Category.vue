<template>
    <el-container direction="vertical" v-loading.fullscreen.lock="fullscreenLoading">
        <page-header class="page-header">
            <template #name>家具分类</template>
            <template #right><search /></template>
        </page-header>
<!--        <category-menu />-->
        <cat-plate title="家具类别" :categories="styleCategory" />
        <cat-plate title="空间设计" :categories="spaceCategory"/>
        <nav-tab-bar v-if="show" />
    </el-container>
</template>

<script>
    import PageHeader from 'common/header/PageHeader'
    import Search from 'common/search/Search'
    // import CategoryMenu from './components/Menu'
    import NavTabBar from 'common/navtab/NavTabBar'
    import CatPlate from './components/CatPlate'
    import axios from 'axios'
    export default {
        name: 'Category',
        components: {
            PageHeader,
            Search,
            // CategoryMenu,
            NavTabBar,
            CatPlate
        },
        data() {
            return {
                show: false,    // 控制NavTabBar显隐
                screenWidth: window.innerWidth, //浏览器宽度
                styleCategory: [],   // 风格分类
                spaceCategory: [],  // 空间分类
                fullscreenLoading: false
            }
        },
        mounted() {
            window.onresize = ()=> {
                return (()=> {
                    this.screenWidth = window.innerWidth
                })()
            }
            this.initScreen()
            this.getCategoryInfo()
        },
        methods: {
            async getCategoryInfo() {
                this.fullscreenLoading = true
                let res = await axios.get('/api/category')
                let data = res.data
                this.styleCategory = data.styles
                this.spaceCategory = data.spaces
                this.fullscreenLoading = false
            },
            initScreen() {
                this.show = this.screenWidth < 768
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
    @import "~styles/varibles.styl"
    .page-header
        box-shadow none
    @media screen and (max-width: 767px)
        .el-container
            padding-bottom 50px
</style>