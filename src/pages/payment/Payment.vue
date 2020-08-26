<template>
    <el-container direction="vertical" v-loading.fullscreen.lock="fullscreenLoading">
        <page-header><template #name>支付方式</template></page-header>
        <div class="main">
            <div class="head">
                <div>订单提交成功，请尽快完成支付，订单编号：{{orderId}}</div>
                <div class="total">订单金额：<span class="price">{{total.toFixed(2)}}</span> 元</div>
            </div>
            <div class="pay-way-panel">
                <div class="title">使用以下平台支付</div>
                <div class="ways">
                    <div class="item">
                        <img src="@/assets/images/alipay.png" alt="">
                    </div>
                </div>
                <el-button class="pay-btn" type="warning" @click="payNow">立即支付</el-button>
            </div>
        </div>
    </el-container>
</template>

<script>
    import PageHeader from 'common/header/PageHeader'
    import axios from 'axios'
    export default {
        name: 'Payment',
        components: {
            PageHeader
        },
        data() {
            return {
                orderId: '',
                total: 0,
                orderDetail: {},
                fullscreenLoading: false
            }
        },
        methods: {
            async getOrderInfo() {  // 请求服务器端计算的订单信息（价格）
                this.fullscreenLoading = true
                let res = await axios.get('/api/orderDetail', {
                    params: {
                        orderId: this.orderId
                    }
                })
                this.orderDetail = res.data
                this.total = res.data.orderTotal
                this.fullscreenLoading = false
            },
            goAlipay() {  // 支付宝支付
                this.fullscreenLoading = true
                axios.post('/api/index', {
                    orderId: this.orderId
                }).then(res => {
                    this.fullscreenLoading = false
                    let data = res.data
                    if(data.status === 200) {
                        window.location.href = res.data.url
                        this.setTimer('/api/payAfter', {params: { orderId: this.orderId }})
                    } else if(data.status === 405) {
                        this.$message({showClose: true, message: '请重试', type: 'warning', duration: 1500})
                    } else if(data.status === 406) {
                        this.$message({showClose: true, message: '订单已支付', type: 'warning', duration: 1500})
                        this.bus.$emit('updateOrder')
                        this.$router.replace('/order/all')
                    } else if(data.status === 407) {
                        this.$message({showClose: true, message: '订单已超时取消', type: 'warning', duration: 1500})
                        this.bus.$emit('updateOrder')
                        this.$router.replace('/order/all')
                    }
                }).catch(() => {
                    this.fullscreenLoading = false
                    this.$message({showClose: true, message: '支付异常', type: 'error', duration: 1500})
                })
            },
            payNow() {
                this.goAlipay()
            },
            setTimer(url, params) {
                let timer
                axios.get(url, params)
                    .then(res => {
                        let data = res.data
                        if(data.status === 200) {
                            // this.$router.push({path: '/paysucc', query: {orderid: this.orderId}})
                            window.location.href = `http://192.168.101.100:8080/paysucc?orderid=${this.orderId}`
                            clearTimeout(timer)
                        } else {
                            timer = setTimeout(() => {this.setTimer()}, 1000)
                        }
                    }).catch(e => console.log(e))
            }
        },
        mounted() {
            this.getOrderInfo()
        },
        created() {
            this.orderId = this.$route.query.orderid
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .main
        width 1170px
        height 500px
        margin 0 auto
        .head
            padding 20px 0
            display flex
            flex-direction row
            justify-content space-between
            align-items center
            margin-bottom 20px
            div
                font-size .3rem
                .price
                    font-size .5rem
                    font-weight 600
                    color $activeColor
        .pay-way-panel
            padding 30px
            box-shadow $shadow_3
            border-radius 3px
            &::before, &::after
                display table
                content ""
            &::after
                clear both
            .title
                font-size .28rem
                color $fontColor_intro
                margin-bottom 30px
                padding-left 20px
                position relative
                &::before
                    content ""
                    width 5px
                    height 100%
                    border-radius 5px
                    background-color $activeColor
                    position absolute
                    left 0
            .ways
                .item
                    padding 20px
                    margin-bottom 20px
                    box-shadow $shadow_3
                    border-radius 3px
            .pay-btn
                float right
                margin-top 50px
    @media screen and (min-width: 992px) and (max-width: 1200px)
        .main
            width 970px
    @media screen and (max-width: 991px)
        .main
            width 100%
            padding 0 15px
            box-sizing border-box
    @media screen and (max-width: 767px)
        .main
            .head
                flex-direction column
                align-items flex-start
                div
                    margin-bottom 10px
            .pay-way-panel
                .pay-btn
                    width 100%
</style>