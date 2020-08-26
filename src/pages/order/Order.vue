<template>
    <el-container direction="vertical" v-if="show" v-loading.fullscreen.lock="fullscreenLoading">
        <page-header>
            <template #name>订单管理</template>
            <template #middle><head-drop-downs /></template>
            <template #right><search /></template>
        </page-header>
        <double-row-layout>
            <template #left><personal-menu /></template>
            <template #right>
                <div class="boxes">
                    <el-tabs v-model="activeName" class="pc-tab">
                        <el-tab-pane label="所有订单" name="all" lazy>
                            <order-table :orderList="orderList" noListText="亲，您没有下过单哦~" />
                        </el-tab-pane>
                        <el-tab-pane label="待付款" name="unpaid" lazy>
                            <order-table :orderList="unPaidList" noListText="亲，您没有待付款的订单哦~" />
                        </el-tab-pane>
                        <el-tab-pane label="待发货" name="tobeshipped" lazy>
                            <order-table :orderList="toBeShippedList" noListText="亲，您没有待发货的订单哦~" />
                        </el-tab-pane>
                        <el-tab-pane label="待收货" name="tobereceived" lazy>
                            <order-table :orderList="toBeReceivedList" noListText="亲，您没有待收货的订单哦~" />
                        </el-tab-pane>
                        <el-tab-pane label="待评价" name="tobeevaluated" lazy>
                            <order-table :orderList="toBeEvaluatedList" noListText="亲，您没有待评价的订单哦~" />
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </template>
        </double-row-layout>
    </el-container>
    <div v-else class="p-con" v-loading.fullscreen.lock="fullscreenLoading">
        <p-header content="订单列表"></p-header>
        <el-tabs v-model="activeName" stretch class="p-tab">
            <el-tab-pane label="所有订单" name="all" lazy>
                <p-order :orderList="orderList" noListText="亲，您没有下过单哦~"  />
            </el-tab-pane>
            <el-tab-pane label="待付款" name="unpaid" lazy>
                <p-order :orderList="unPaidList" noListText="亲，您没有待付款的订单哦~" />
            </el-tab-pane>
            <el-tab-pane label="待发货" name="tobeshipped" lazy>
                <p-order :orderList="toBeShippedList" noListText="亲，您没有待发货的订单哦~" />
            </el-tab-pane>
            <el-tab-pane label="待收货" name="tobereceived" lazy>
                <p-order :orderList="toBeReceivedList" noListText="亲，您没有待收货的订单哦~" />
            </el-tab-pane>
            <el-tab-pane label="待评价" name="tobeevaluated" lazy>
                <p-order :orderList="toBeEvaluatedList" noListText="亲，您没有待评价的订单哦~" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import PageHeader from 'common/header/PageHeader'
    import HeadDropDowns from 'common/dropdown/HeadDropDowns'
    import Search from 'common/search/Search'
    import DoubleRowLayout from 'common/layout/DoubleRowLayout'
    import PersonalMenu from 'common/sidebar/PersonalMenu'
    import OrderTable from './components/OrderTable'
    import POrder from './components/POrder'
    import PHeader from 'common/header/PHeader'
    import axios from 'axios'
    export default {
        name: 'Order',
        components: {
            PageHeader,
            HeadDropDowns,
            Search,
            DoubleRowLayout,
            PersonalMenu,
            OrderTable,
            POrder,
            PHeader
        },
        data() {
            return {
                activeName: 'all',
                orderList: [],  // 所有订单
                show: true,    // true电脑,false手机
                screenWidth: window.innerWidth, //浏览器宽度
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
            this.getOrderInfo()
        },
        methods: {
            async getOrderInfo() {
                try {
                    this.fullscreenLoading = true
                    let res = await axios.get('/api/allOrders')
                    this.orderList = res.data
                    this.fullscreenLoading = false
                } catch (e) {
                    this.fullscreenLoading = false
                }
            },
            initScreen() {
                this.show = this.screenWidth >= 768
            }
        },
        computed: {
            unPaidList() {  // 代付款
                return this.orderList.filter((item)=> {
                    return item.orderStatus === 1
                })
            },
            toBeShippedList() { // 待发货
                return this.orderList.filter((item)=> {
                    return item.orderStatus === 2
                })
            },
            toBeReceivedList() {    // 待收货
                return this.orderList.filter((item)=> {
                    return item.orderStatus === 3
                })
            },
            toBeEvaluatedList() {   // 待评价      // 已完成的订单才可评论，如果订单中的所有商品都已评论，也将被过滤
                return this.orderList.filter((order)=> {
                    if(order.orderStatus !== 4) {
                        return false
                    } else {
                        return order.products.some(pdt => {     // 订单中若存在未评论的商品，则返回true
                            return pdt.orderDetailStatus === 0
                        })
                    }
                })
            }
        },
        watch: {
            '$route'() {
                this.activeName = this.$route.params.type ? this.$route.params.type : 'all'
            },
            screenWidth(val) {
                this.screenWidth = val
                this.initScreen()
            }
        },
        created() {
            this.bus.$on('updateOrder', this.getOrderInfo)
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .el-tabs >>> .el-tabs__item.is-active
    .el-tabs >>> .el-tabs__item:hover
        color $activeColor
    .el-tabs >>> .el-tabs__nav-wrap::after
        background-color transparent
    .el-tabs.pc-tab >>> .el-tabs__active-bar
        background-color $activeColor
    .boxes
        padding 20px 0
        .el-tabs.pc-tab
            background-color #ffffff
            padding 5px 10px 20px
    @media screen and (max-width: 767px)
        .el-tabs.p-tab >>> .el-tabs__active-bar
            background-color transparent
        .el-tabs.p-tab >>> .el-tabs__header
            margin 5px 0
            padding 0 15px
</style>