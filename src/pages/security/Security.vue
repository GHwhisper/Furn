<template>
    <el-container direction="vertical" v-if="show">
        <page-header>
            <template #name>账户安全</template>
            <template #middle><head-drop-downs /></template>
            <template #right><search /></template>
        </page-header>
        <double-row-layout>
            <template #left><set-up-menu /></template>
            <template #right>
                <div class="boxes">
                    <div class="box-0">
                        <pwd-step findOrReset="reset">
                            <template #title>修改登录密码</template>
                        </pwd-step>
                    </div>
                </div>
            </template>
        </double-row-layout>
    </el-container>
    <div v-else class="p-con">
        <p-header content="修改密码" />
        <pwd-step findOrReset="reset">
            <template #title>修改登录密码</template>
        </pwd-step>
    </div>
</template>

<script>
    import PageHeader from 'common/header/PageHeader'
    import HeadDropDowns from '../../common/dropdown/HeadDropDowns'
    import Search from 'common/search/Search'
    import DoubleRowLayout from 'common/layout/DoubleRowLayout'
    import SetUpMenu from 'common/sidebar/SetUpMenu'
    import PwdStep from 'common/step/PwdStep'
    import PHeader from 'common/header/PHeader'
    export default {
        name: 'Security',
        components: {
            PageHeader,
            HeadDropDowns,
            Search,
            DoubleRowLayout,
            SetUpMenu,
            PwdStep,
            PHeader
        },
        data() {
            return {
                show: true,    // true电脑,false手机
                screenWidth: window.innerWidth, //浏览器宽度
            }
        },
        methods: {
            initScreen() {
                this.show = this.screenWidth >= 768
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
    .double-row-layout >>> .fixed-col
        padding-top 20px
    .boxes
        padding 20px 0
        .box-0
            background-color #ffffff
</style>