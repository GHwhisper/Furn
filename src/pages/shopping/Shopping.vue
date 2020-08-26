<template>
    <el-container direction="vertical" v-loading.fullscreen.lock="fullscreenLoading">
        <page-header>
            <template #name>结算页</template>
        </page-header>
        <div class="main-con">
            <div class="title">填写并核对订单信息</div>
            <div class="checkout-box">
                <select-addr class="box-item" :fullscreen="fullscreen" />
                <payment class="box-item" />
                <ship-sku-info class="box-item" :products="cartCheckedList" />
            </div>
            <div class="order-summary">
                <div class="summary">
                    <div class="su-item"><span><em class="num">{{count}}</em> 件商品，商品总金额：</span><em class="cost">￥{{total.toFixed(2)}}</em></div>
                    <div class="su-item"><span>优惠：</span><em class="cost">-￥0.00</em></div>
                    <div class="su-item"><span>运费：</span><em class="cost">+￥0.00</em></div>
                </div>
            </div>
            <div class="trade-foot">
                <div class="trade-item">应付总额：<em class="total">￥{{total.toFixed(2)}}</em></div>
                <div class="trade-item re-info">
                    <span class="addr">寄送至：{{currentAddrInfo}}</span>
                    <span class="receiver">收货人：{{shoppingAddrInfo.receiver}} {{hidePhone(shoppingAddrInfo.phone)}}</span>
                </div>
            </div>
            <div class="submit-con"><el-button type="warning" @click="submitOrder">提交订单</el-button></div>
        </div>
    </el-container>
</template>

<script>
    import PageHeader from 'common/header/PageHeader'
    import SelectAddr from './components/SelectAddr'
    import Payment from './components/Payment'
    import ShipSkuInfo from './components/ShipSkuInfo'
    import { mapState, mapGetters } from 'vuex'
    import { hidePhone } from 'js/utils'
    import axios from 'axios'
    export default {
        name: 'Shopping',
        components: {
            PageHeader,
            SelectAddr,
            Payment,
            ShipSkuInfo
        },
        data() {
            return {
                fullscreen: false,      // dialog是否全屏
                screenWidth: window.innerWidth, //浏览器宽度
                fullscreenLoading: false
            }
        },
        methods: {
            hidePhone,
            async submitOrder() {   // 提交订单
                if(JSON.stringify(this.shoppingAddrInfo) === '{}') {
                    this.$alert('您暂未填写收货信息，请在“收货人信息”栏右上角添加', '提示', {confirmButtonText: '确定'})
                    return
                }
                let addressId = this.shoppingAddrInfo.addressId
                this.fullscreenLoading = true
                let res = await axios.post('/api/addOrder', {
                    shoppingList: this.shoppingList,
                    addressId: addressId
                })
                let data = res.data
                if(data.addStatus === 200) {
                    this.bus.$emit('updateCart')    // 更新导航栏中购物车数据
                    this.bus.$emit('updateOrder')   // 跟新订单列表
                    this.$router.push({path: '/payment', query: {orderid: data.orderId}})     // 跳转支付页面
                } else if(data.addStatus === 405) {
                    this.$message({showClose: true, message: '订单生成失败，请重试', type: 'warning', duration: 1500})
                }
                this.fullscreenLoading = false
            },
            initScreen() {
                this.fullscreen = this.screenWidth < 768
            }
        },
        computed: {
            ...mapState(['cartCheckedList', 'shoppingAddrInfo']),
            ...mapGetters(['shoppingList']),
            count() {   // 商品数量
                let count = 0
                this.cartCheckedList.forEach(item => {
                    count += item.num
                })
                return count
            },
            total() {
                let total = 0
                this.cartCheckedList.forEach(item => {
                    total += item.price * item.num
                })
                return total
            },
            currentAddrInfo() {
                let a = this.shoppingAddrInfo
                if(a.area) {
                    return a.area.province + ' ' + a.area.city + ' ' + a.area.area + a.addr
                }
                return '请添加收货地址'
            }
        },
        watch: {
            screenWidth(val) {
                this.screenWidth = val
                this.initScreen()
            }
        },
        mounted() {
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
    .main-con
        width 1170px
        margin 0 auto
        padding-bottom 50px
        .title
            font-size .34rem
            margin-bottom 15px
            color $fontColor
        .checkout-box
            padding 0 20px
            border 1px solid $border
            .box-item
                border-bottom 1px solid $border
        .order-summary
            &::before, &::after
                content ""
                display table
                clear both
                zoom 1
            .summary
                display inline-block
                float right
                font-size .26rem
                padding 20px
                .su-item
                    text-align right
                    padding 10px
                    span
                        margin-right 10px
                        .num
                            color $activeColor
                            font-weight 600
                    em.cost
                        width 100px
                        display inline-block
                        font-weight 600
        .trade-foot
            padding 20px
            background-color $bgc_1
            border 1px solid $border
            .trade-item
                text-align right
                font-size .26rem
                padding 5px 10px
                .total
                    color $activeColor
                    font-size .5rem
                    font-weight 600
                    margin-left 20px
            .re-info
                color $fontColor_intro
                .addr
                    margin-right 20px
        .submit-con
            padding 20px 0
            text-align right
            .el-button
                width 200px
    @media screen and (min-width: 992px) and (max-width: 1200px)
        .main-con
            width 970px
    @media screen and (min-width: 768px) and (max-width: 991px)
        .main-con
            width 100%
            padding 0 15px 50px
            box-sizing border-box
    @media screen and (max-width: 767px)
        .main-con
            width 100%
            .title
                padding 0 15px
            .checkout-box
                padding 0 15px
            .trade-foot
                .re-info
                    display flex
                    flex-direction column
                    .addr
                        margin-right 0
            .submit-con
                padding 20px 15px
                .el-button
                    width 100%
</style>