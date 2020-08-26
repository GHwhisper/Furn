<template>
    <el-container>
        <el-header height="100px">
            <el-row type="flex" justify="center">
                <el-col>
                    <div class="brand-con">
                        <span class="brand"><router-link to="/">Furn.</router-link></span>
                        <span class="name">家具分类</span>
                    </div>
                    <search />
                </el-col>
            </el-row>
        </el-header>
        <classify-menu />
        <nav-tab-bar v-if="show" />
    </el-container>
</template>

<script>
    import Search from 'common/search/Search'
    import ClassifyMenu from './components/Menu'
    import NavTabBar from 'common/navtab/NavTabBar'
    export default {
        name: 'Classify',
        components: {
            Search,
            ClassifyMenu,
            NavTabBar
        },
        props: {

        },
        data() {
            return {
                show: false,    // 控制NavTabBar显隐
                screenWidth: window.innerWidth, //浏览器宽度
            }
        },
        mounted() {
            window.onresize = ()=> {
                return (()=> {
                    this.screenWidth = window.innerWidth
                })()
            }
            this.initScreen()
        },
        methods: {
            initScreen() {
                this.show = this.screenWidth <= 768
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
    .el-header
        padding 0
        .el-row
            height 100%
            .el-col
                width 1170px
                position relative
                .brand-con
                    position absolute
                    bottom 10px
                    .brand
                        a
                            color $activeColor
                            font-size .8rem
                    .name
                        color $fontColor
                        font-size .5rem
                        margin-left 10px
                .search
                    position absolute
                    right 0
                    bottom 10px
</style>