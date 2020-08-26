<template>
    <el-container direction="vertical" v-if="show" v-loading.fullscreen.lock="fullscreenLoading">
        <page-header>
            <template #name>地址管理</template>
            <template #middle><head-drop-downs /></template>
            <template #right><search /></template>
        </page-header>
        <double-row-layout>
            <template #left><set-up-menu /></template>
            <template #right>
                <div class="boxes">
                    <div class="addr-con">
                        <div><el-button type="warning" plain @click="handleAddAddr">新增收货地址</el-button></div>
                        <template v-for="item in addrList">
                            <addr-item class="addr-item" :addr="item" :key="item.addressId" @updateAddress="getAddrList" />
                        </template>
                        <div v-if="addrList.length === 0" class="none-tips">暂无收货地址，赶快添加吧~</div>
                        <div v-if="addrList.length >= 3"><el-button type="warning" plain @click="handleAddAddr">新增收货地址</el-button></div>
                    </div>
                </div>
                <!--用于添加新的地址信息-->
                <area-dialog title="新增收货地址" :visible="areaDialogVisible" @closeDialog="handleCloseAreaDialog" />
            </template>
        </double-row-layout>
    </el-container>
    <div v-else class="p-con" v-loading.fullscreen.lock="fullscreenLoading">
        <p-header content="收货地址" />
        <div class="boxes">
            <div class="addr-con">
<!--                <div><el-button type="warning" plain @click="handleAddAddr">新增收货地址</el-button></div>-->
                <template v-for="item in addrList">
                    <addr-item class="addr-item" :addr="item" :key="item.addressId" :fullscreen="fullscreen" @updateAddress="getAddrList" />
                </template>
                <div v-if="addrList.length === 0" class="none-tips">暂无收货地址，赶快添加吧~</div>
                <div><el-button type="warning" plain @click="handleAddAddr">新增收货地址</el-button></div>
            </div>
        </div>
        <!--用于添加新的地址信息-->
        <area-dialog title="新增收货地址" :visible="areaDialogVisible" :fullscreen="fullscreen" @closeDialog="handleCloseAreaDialog" />
    </div>
</template>

<script>
    import PageHeader from 'common/header/PageHeader'
    import HeadDropDowns from '../../common/dropdown/HeadDropDowns'
    import Search from 'common/search/Search'
    import SetUpMenu from 'common/sidebar/SetUpMenu'
    import DoubleRowLayout from 'common/layout/DoubleRowLayout'
    import AddrItem from './components/AddrItem'
    import AreaDialog from 'common/dialog/AreaDialog'
    import PHeader from '../../common/header/PHeader'
    import axios from 'axios'
    export default {
        name: 'Address',
        components: {
            PageHeader,
            HeadDropDowns,
            Search,
            SetUpMenu,
            DoubleRowLayout,
            AddrItem,
            AreaDialog,
            PHeader
        },
        data() {
            return {
                addrList: [],   // 用户的所有地址
                areaDialogVisible: false,   // 地区信息对话框显隐藏
                show: true,    // true电脑,false手机
                screenWidth: window.innerWidth, //浏览器宽度
                fullscreen: false,
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
            this.getAddrList()
        },
        methods: {
            async getAddrList() {   // 获取地址
                try {
                    this.fullscreenLoading = true
                    let res = await axios.get('/api/showShippingAddress')
                    this.addrList = res.data
                    this.fullscreenLoading = false
                } catch (e) {
                    this.fullscreenLoading = false
                }
            },
            handleAddAddr() {
                this.areaDialogVisible = true
            },
            handleCloseAreaDialog(data) {
                this.areaDialogVisible = data
            },
            initScreen() {
                this.show = this.screenWidth >= 768
                this.fullscreen = !this.show
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
    .double-row-layout >>> .fixed-col
        padding-top 20px
    .boxes
        padding 20px 0
        .addr-con
            padding 20px
            background-color #ffffff
            .addr-item
                margin 20px 0
    .none-tips
        height 200px
        line-height 200px
        color $fontColor_intro
        font-size .26rem
        text-align center
    @media screen and (max-width: 767px)
        .p-con
            .boxes
                padding 0
                .addr-con
                    padding 15px
                    padding-bottom 80px
                    .el-button
                        width calc(100% - 30px)
                        position fixed
                        bottom 30px
</style>