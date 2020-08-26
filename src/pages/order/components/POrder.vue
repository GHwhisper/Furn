<template>
    <div class="order-con" v-loading.fullscreen.loading="fullscreenLoading">
        <div class="item-con"  v-for="(order, index) in orderList" :key="order.orderId">
            <div class="top">
                <span>{{order.orderStatusName}}</span><i class="el-icon-delete" @click="handleOrderDel(order.orderId)" />
            </div>
            <router-link :to="'/order/detail/' + order.orderId" tag="div" class="item">
                <div class="left">
                    <div class="img-con"><img :src="order.products[0].img" alt=""></div>
                </div>
                <div class="right">
                    <div class="name">{{order.products[0].name}}</div>
                    <div class="order-info">
                        <div class="num">共 {{quantity(index)}} 件商品</div>
                        <div class="total">实付金额:<span>￥{{order.orderTotal.toFixed(2)}}</span></div>
                    </div>
                </div>
            </router-link>
            <div class="opts">
                <el-button class="detail-btn" round size="mini" @click="goPage( '/order/detail/' + order.orderId)">订单详情</el-button>
                <el-button class="shouhuo-btn" v-if="order.orderStatus === 3" round size="mini" type="warning" @click="shouhuo(order.orderId)">确认收货</el-button>
                <el-button class="pay-btn" v-if="order.orderStatus === 1" round size="mini" type="warning" @click="pay(order.orderId)">去付款</el-button>
            </div>
        </div>
        <div class="none-tips" v-if="orderList.length === 0">{{noListText}}</div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'POrder',
        props: {
            orderList: {
                type: Array,
                required: true,
                default() {
                    return []
                }
            },
            noListText: String
        },
        data() {
            return {
                fullscreenLoading: false
            }
        },
        methods: {
            handleOrderDel(orderId) {    // 删除订单
                this.$confirm('此操作将永久删除该订单，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.fullscreenLoading = true
                    axios.post('/api/deleteOrder', {
                        orderId: orderId
                    }).then((res) => {
                        this.fullscreenLoading = false
                        let data = res.data
                        if(data.deleteStatus === 200) {
                            this.$message({showClose: true,message: '删除成功',type: 'success',duration: 1500})
                            this.bus.$emit('updateOrder')
                        } else if(data.deleteStatus === 405) {
                            this.$message({showClose: true,message: '删除失败',type: 'error',duration: 1500})
                        }
                    }).catch(() =>{
                        this.fullscreenLoading = false
                        this.$message({showClose: true,message: '删除失败',type: 'error',duration: 1500})
                    })
                }).catch(() => {})
            },
            shouhuo(ordeId) {   // 确认收货
                this.$confirm('确认收货吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.fullscreenLoading = true
                    axios.post('/api/confirm', {
                        orderId: ordeId
                    }).then((res) => {
                        this.fullscreenLoading = false
                        let data = res.data
                        if(data.updateStatus === 200) {
                            this.$message({showClose: true,message: '确认收货成功',type: 'success',duration: 1500})
                            this.bus.$emit('updateOrder')
                        } else if(data.updateStatus === 405) {
                            this.$message({showClose: true,message: '确认收货失败',type: 'error',duration: 1500})
                        }
                    }).catch(() => {
                        this.fullscreenLoading = false
                        this.$message({showClose: true,message: '确认收货失败',type: 'error',duration: 1500})
                    })
                }).catch(() => {})
            },
            pay(orderId) {
                this.$router.push({ path: '/payment', query: { orderid: orderId } })
            },
            goPage(path) {
                this.$router.push(path)
            },
            quantity(index) {
                let num = 0
                this.orderList[index].products.forEach(item => {
                    num += item.count
                })
                return num
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .order-con
        width 100%
        background-color $bgc_1
        padding 15px
        box-sizing border-box
        .item-con
            margin-bottom 15px
            border-radius 10px
            background-color #ffffff
            box-shadow $shadow_3
            .top
                width 100%
                display flex
                justify-content space-between
                align-items center
                padding 10px
                box-sizing border-box
                color $fontColor_intro
                font-size .26rem
                height 40px
            .item
                width 100%
                display flex
                padding 10px
                box-sizing border-box
                border-bottom 1px solid $border
                .left
                    flex-shrink 0
                    background-color lightblue
                    .img-con
                        width 80px
                        height 80px
                        img
                            width 100%
                            height 100%
                .right
                    width 100%
                    padding-left 10px
                    position relative
                    .name
                        display -webkit-box
                        text-overflow ellipsis
                        overflow hidden
                        -webkit-line-clamp 2
                        -webkit-box-orient vertical
                        font-size .26rem
                        line-height 20px
                    .order-info
                        font-size .24rem
                        color $fontColor_intro
                        display flex
                        position absolute
                        right 0
                        bottom 0
                        padding-left 10px
                        .total
                            margin-left 5px
                            span
                                color #333333
            .opts
                padding 10px
                display flex
                justify-content flex-end
        .none-tips
            height 100px
            line-height 100px
            text-align center
            font-size .24rem
            color $fontColor_intro
</style>