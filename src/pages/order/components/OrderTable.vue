<template>
    <table v-loading.fullscreen.lock="fullscreenLoading">
        <thead>
            <tr>
                <th class="th-product">商品</th>
                <th class="th-operation">商品操作</th>
                <th class="th-price">单价</th>
                <th class="th-count">数量</th>
                <th class="th-total">实付款</th>
                <th class="th-status">交易状态</th>
            </tr>
        </thead>
        <tbody class="order-item" v-for="order in orderList" :key="order.orderId">
            <tr class="split"><td colspan="6" /></tr>
            <tr class="title">
                <td colspan="5"><span class="order-time">{{order.time}}</span><span class="order-id">订单号：{{order.orderId}}</span></td>
                <td class="del-icon-con"><i class="el-icon-delete" @click="handleOrderDel(order.orderId)" /></td>
            </tr>
            <tr class="product-row" v-for="(product, index) in order.products" :key="product.id">
                <td class="product">
                    <img :src="product.img" alt="">
                    <div class="info-con">
                        <router-link :to="{path: `/product/detail/${product.productId}`, query: {skuid: product.id}}" class="name">{{product.name}}</router-link>
                        <p><span class="color">{{product.color}}</span><span class="size">{{product.size}}</span></p>
                    </div>
                </td>
                <td class="operation">
                    <router-link
                            :to="{ path: '/comment', query: { orderid: order.orderId, productid: product.productId, id: product.id } }"
                            class="op"
                            v-if="order.orderStatus === 4 && product.orderDetailStatus === 0"
                    >待评价</router-link>
<!--                    <router-link to="" class="op" v-if="order.orderStatus === 4">申请售后</router-link>-->
                </td>
                <td class="price">￥{{product.price.toFixed(2)}}</td>
                <td class="count">{{product.count}}</td>
                <td class="total" :rowspan="order.products.length" v-if="index === 0">￥{{order.orderTotal.toFixed(2)}}</td>
                <td class="status"  :rowspan="order.products.length" v-if="index === 0">
                    <div class="op order-status">{{order.orderStatusName}}</div>
                    <router-link :to="'/order/detail/' + order.orderId" class="op order-detail">订单详情</router-link>
<!--                    <router-link to="" class="op">查看物流</router-link>-->
                    <el-button class="shouhuo-btn" v-if="order.orderStatus === 3" size="mini" @click="shouhuo(order.orderId)">确认收货</el-button>
                    <el-button class="pay-btn" v-if="order.orderStatus === 1" size="mini" @click="pay(order.orderId)">去付款</el-button>
                </td>
            </tr>
        </tbody>
        <tbody class="none-tips" v-if="orderList.length === 0">
            <tr>
                <td colspan="6">{{noListText}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'OrderTable',
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
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    table
        width 100%
        tr
            th
                text-align center
                height 40px
                background-color $bgc_1
            .th-product
                width 45%
            .th-operation
                width 10%
            .th-price
                width 12%
            .th-count
                width 10%
            .th-total
                width 13%
            .th-status
                width 10%
        tbody.order-item
            vertical-align top
            tr.split td
                height 20px
            tr.title
                height 50px
                font-size .3rem
                line-height 50px
                background-color $bgc_1
                .order-time
                    color $fontColor_intro
                    margin-left 15px
                    margin-right 20px
                .del-icon-con
                    text-align right
                    i
                        font-size .36rem
                        margin-right 15px
                        cursor pointer
                        display none
                        &:hover
                            color $activeColor
            tr.product-row
                td
                    padding-top 15px
                td.product
                    display flex
                    flex-direction row
                    margin-left 15px
                    img
                        width 80px
                        height 80px
                        flex-shrink 0
                    .info-con
                        margin-left 10px
                        margin-right 20px
                        a.name
                            line-height .4rem
                            color #333333
                            display -webkit-box
                            -webkit-box-orient vertical
                            -webkit-line-clamp 2
                            overflow hidden
                            &:hover
                                color $activeColor
                        p
                            color $fontColor_intro
                            margin-top 5px
                            span.color
                                margin-right 15px
                td.operation, td.price, td.count, td.total, td.status
                    text-align center
                td.operation, td.status
                    font-size .26rem
                    .op
                        margin-bottom 5px
                        color #333333
                        display block
                        &:not(.order-status):hover
                            color $activeColor
                    .order-status
                        color $fontColor_intro
                td.count
                    color $fontColor_intro
                td.total
                    font-weight 600
            &:hover tr.title .del-icon-con i
                display inline-block
        tbody.none-tips
            tr
                td
                    height 300px
                    text-align center
                    color $fontColor_intro
</style>