<template>
    <div v-if="show" v-loading.fullscreen.lock="fullscreenLoading">
        <page-header>
            <template #name>个人信息</template>
            <template #middle><head-drop-downs /></template>
            <template #right><search /></template>
        </page-header>
        <double-row-layout>
            <template #left><set-up-menu /></template>
            <template #right>
                <div class="boxes">
                    <div class="box-0"><set-info-tab :userInfo="userInfo" /></div>
                </div>
            </template>
        </double-row-layout>
    </div>
    <div v-else class="p-con" v-loading.fullscreen.lock="fullscreenLoading">
        <p-header content="信息设置" />
        <div class="box">
            <set-info-tab :userInfo="userInfo" />
        </div>
    </div>
</template>

<script>
    import PageHeader from 'common/header/PageHeader'
    import HeadDropDowns from 'common/dropdown/HeadDropDowns'
    import Search from 'common/search/Search'
    import SetUpMenu from 'common/sidebar/SetUpMenu'
    import DoubleRowLayout from 'common/layout/DoubleRowLayout'
    import SetInfoTab from './components/SetInfoTab'
    import PHeader from 'common/header/PHeader'
    import axios from 'axios'
    export default {
        name: 'SetUpInfo',
        components: {
            PageHeader,
            HeadDropDowns,
            Search,
            SetUpMenu,
            DoubleRowLayout,
            SetInfoTab,
            PHeader
        },
        data() {
            return {
                show: true,    // true电脑,false手机
                screenWidth: window.innerWidth, //浏览器宽度
                userInfo: {},
                fullscreenLoading: false
            }
        },
        mounted() {
            this.getUserInfo()
        },
        methods: {
            async getUserInfo() {
                try {
                    this.fullscreenLoading = true
                    let res = await axios.get('/api/userInfo')
                    this.userInfo = res.data
                    this.fullscreenLoading = false
                } catch {
                    this.fullscreenLoading = false
                    this.$message({showClose: true, message: '获取个人信息失败', type: 'error', duration: 1500})
                }
            },
            initScreen() {
                this.show = this.screenWidth >= 768
            }
        },
        watch: {
            screenWidth(val) {
                this.screenWidth = val
                this.initScreen()
            }
        },
        created() {
            window.onresize = ()=> {
                return (()=> {
                    this.screenWidth = window.innerWidth
                })()
            }
            this.initScreen()
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .double-row-layout >>> .fixed-col
        padding-top 20px
    .boxes
        padding 20px 0
        .box-0
            min-height 510px
            background-color #ffffff
            padding 10px 20px
    @media screen and (max-width: 767px)
        .p-con
            .box
                padding 15px
</style>