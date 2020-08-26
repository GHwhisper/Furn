<template>
    <el-container direction="vertical" v-if="show">
        <page-header>
            <template #name>订单详情</template>
            <template #right><search /></template>
        </page-header>
        <div class="main-con">
            <div class="main">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item to="/personal">个人中心</el-breadcrumb-item>
                    <el-breadcrumb-item to="/order/all">订单管理</el-breadcrumb-item>
                    <el-breadcrumb-item>订单号：{{orderDetail.orderId}}</el-breadcrumb-item>
                </el-breadcrumb>
                <div class="box box-0">
                    <div class="l-col">
                        <div class="order-id">订单号：{{orderDetail.orderId}}</div>
                        <div class="status">{{orderDetail.orderStatusName}}</div>
                    </div>
                    <div class="r-col">
                        <!--取消情况-->
                        <el-steps v-if="orderDetail.orderStatus === 0" align-center :active="2">
                            <el-step title="提交订单" icon="el-icon-tickets" :description="orderDetail.time" />
                            <el-step title="已取消" icon="el-icon-tickets" :description="orderDetail.cancelTime" />
                        </el-steps>
                        <!--正常情况-->
                        <el-steps v-else-if="orderDetail.orderStatus >= 1 && orderDetail.orderStatus <= 4"
                                  :active="setActive(orderDetail.orderStatus)"
                                  align-center>
                            <el-step title="提交订单" icon="el-icon-tickets" :description="orderDetail.time" />
                            <el-step v-if="orderDetail.orderStatus === 1" title="待付款" icon="el-icon-bank-card" description="" />
                            <el-step v-else-if="orderDetail.orderStatus > 1" title="付款成功" icon="el-icon-bank-card" :description="orderDetail.payTime" />
                            <el-step v-if="orderDetail.orderStatus <= 2" title="待出库" icon="el-icon-box" description="" />
                            <el-step v-else-if="orderDetail.orderStatus > 2" title="商品出库" icon="el-icon-box" :description="orderDetail.sendTime" />
                            <el-step v-if="orderDetail.orderStatus <= 3" title="等待收货" icon="el-icon-truck" description="" />
                            <el-step v-else title="已签收" icon="el-icon-truck" :description="orderDetail.finishTime" />
                            <el-step title="完成" icon="el-icon-finished" :description="orderDetail.finishTime" />
                        </el-steps>
                    </div>
                </div>
                <div class="box box-1">
                    <div class="l-col">
                        <div class="left">
                            <div class="img-con" v-if="orderDetail.products !== undefined">
                                <router-link :to="'/product/detail/' + orderDetail.products[0].productId">
                                    <img :src="orderDetail.products[0].img" alt="">
                                </router-link>
                            </div>
                        </div>
                        <div class="right" v-if="orderDetail.receiver !== undefined">送货方式：{{orderDetail.delivery.company}}</div>
                    </div>
                    <div class="r-col">
                        <div class="tips">暂不支持快递信息</div>
                    </div>
                </div>
                <div class="box box-2">
                    <div class="info info-l">
                        <table v-if="orderDetail.receiver !== undefined">
                            <tr><th colspan="2">收货人信息</th></tr>
                            <tr><td class="label">收货人:</td><td>{{orderDetail.receiver.name}}</td></tr>
                            <tr><td class="label">地址:</td><td>{{orderDetail.receiver.addr}}</td></tr>
                            <tr><td class="label">手机号：</td><td>{{orderDetail.receiver.phone}}</td></tr>
                            <tr><td class="label">邮箱：</td><td>{{orderDetail.receiver.email}}</td></tr>
                        </table>
                    </div>
                    <div class="info info-m">
                        <table v-if="orderDetail.delivery !== undefined">
                            <tr><th colspan="2">配送信息</th></tr>
                            <tr><td class="label">配送方式:</td><td>{{orderDetail.delivery.company}}</td></tr>
                            <tr><td class="label">运费:</td><td>￥{{orderDetail.delivery.fee.toFixed(2)}}</td></tr>
                            <tr><td class="label">发货人:</td><td>{{orderDetail.sender.name}}</td></tr>
                            <tr><td class="label">地址:</td><td>{{orderDetail.sender.addr}}</td></tr>
                            <tr><td class="label">手机号:</td><td>{{orderDetail.sender.phone}}</td></tr>
                            <tr><td class="label">邮箱:</td><td>{{orderDetail.sender.email}}</td></tr>
                        </table>
                    </div>
                    <div class="info info-r">
                        <table v-if="orderDetail.delivery !== undefined">
                            <tr><th colspan="2">付款信息</th></tr>
                            <tr><td class="label">付款方式:</td><td>在线支付</td></tr>
                            <tr><td class="label">付款时间:</td><td>{{orderDetail.payTime}}</td></tr>
                            <tr><td class="label">商品总额:</td><td>￥{{orderDetail.orderTotal.toFixed(2)}}</td></tr>
                            <tr><td class="label">应支付总额:</td><td>￥{{orderDetail.orderTotal.toFixed(2)}}</td></tr>
                            <tr><td class="label">运费金额:</td><td>￥{{orderDetail.delivery.fee.toFixed(2)}}</td></tr>
                        </table>
                    </div>
                </div>
                <div class="box-3">
                    <order-product-table :list="orderDetail.products" :orderStatusName="orderDetail.orderStatusName" />
                    <div class="p-total">
                        <ul v-if="orderDetail.delivery !== undefined">
                            <li><span class="label">商品总额</span>：<span class="num">￥{{orderDetail.orderTotal.toFixed(2)}}</span></li>
                            <li><span class="label">运费</span>：<span class="num">￥{{orderDetail.delivery.fee.toFixed(2)}}</span></li>
                            <li><span class="label">应付金额</span>：<span class="num total">￥{{orderDetail.orderTotal.toFixed(2)}}</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </el-container>
    <div v-else class="p-con">
        <p-header content="订单详情" />
        <div class="state">{{orderDetail.orderStatusName}}</div>
        <div class="products">
            <div class="pro-head">悦家<span class="num">共计 {{quantity}} 件商品</span></div>
            <div class="pro-item-con"  v-for="item in orderDetail.products" :key="item.productId">
                <router-link tag="div" :to="{path: `/product/detail/${item.productId}`, query: {skuid: item.id}}" class="pro-item">
                    <div class="left">
                        <div class="img-con"><img :src="item.img" alt=""></div>
                    </div>
                    <div class="right">
                        <div class="name">{{item.name}}</div>
                        <div class="attr"><span>颜色：{{item.color}}</span><span>尺寸：{{item.size}}</span></div>
                        <div class="pn"><span class="price">￥{{item.price}}</span><span class="num">×{{item.count}}</span></div>
                    </div>
                </router-link>
                <div class="opts">
<!--                    <el-button round size="mini" v-if="orderDetail.orderStatus === 4">申请售后</el-button>-->
                    <el-button round size="mini"
                               v-if="orderDetail.orderStatus === 4 && item.orderDetailStatus === 0"
                               @click="toComment(orderDetail.orderId, item.productId, item.id)"
                    >评价商品</el-button>
                    <span v-else-if="orderDetail.orderStatus === 4 && item.orderDetailStatus === 1" class="text">已评价</span>
                </div>
            </div>
        </div>
        <ul class="order-info" v-if="orderDetail.receiver">
            <li><span class="item-name">订单编号</span>：<span>{{orderDetail.orderId}}</span></li>
            <li><span class="item-name">下单时间</span>：<span>{{orderDetail.time}}</span></li>
            <li><span class="item-name">支付方式</span>：<span>在线支付</span></li>
            <li><span class="item-name">配送方式</span>：<span>普通快递</span></li>
            <li><span class="item-name">收货人</span>：<span>{{orderDetail.receiver.name}}</span></li>
            <li><span class="item-name">收货人手机</span>：<span>{{orderDetail.receiver.phone}}</span></li>
            <li><span class="item-name">收货地址</span>：<span>{{orderDetail.receiver.addr}}</span></li>
            <li><span class="item-name">发货人</span>：<span>{{orderDetail.sender.name}}</span></li>
            <li><span class="item-name">发货人手机</span>：<span>{{orderDetail.sender.phone}}</span></li>
            <li><span class="item-name">发货地址</span>：<span>{{orderDetail.sender.addr}}</span></li>
        </ul>
        <ul class="total-con" v-if="orderDetail.orderTotal">
            <li><span class="item-name">商品金额</span><span>￥{{orderDetail.orderTotal.toFixed(2)}}</span></li>
            <li><span class="item-name">运费</span><span>+￥0.00</span></li>
            <li class="real-pay"><span class="item-name text">实际支付</span><span class="num">￥{{orderDetail.orderTotal.toFixed(2)}}</span></li>
        </ul>
    </div>
</template>

<script>
    import PageHeader from 'common/header/PageHeader'
    import Search from 'common/search/Search'
    import OrderProductTable from './components/OrderProductTable'
    import PHeader from 'common/header/PHeader'
    import axios from 'axios'
    export default {
        name: 'OrderDetail',
        components: {
            PageHeader,
            Search,
            OrderProductTable,
            PHeader
        },
        data() {
            return {
                orderDetail: {},
                quantity: 0,
                show: true,  // 显示pc端
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
            this.getOrderDetailInfo()
        },
        methods: {
            async getOrderDetailInfo() {
                let res = await axios.get('/api/orderDetail', {
                    params: {
                        orderId: this.$route.params.id
                    }
                })
                this.orderDetail = res.data
            },
            toComment(orderId, productId, id) {
                this.$router.push({
                    path: '/comment',
                    query: {
                        orderid: orderId,
                        productid: productId,
                        id: id
                    }
                })
            },
            setActive(status) { // 设置正常情况下，订单状态的展示
                switch (status) {
                    case 1: return 1
                    case 2: return 2
                    case 3: return 3
                    case 4: return 5
                }
                /* 订单状态orderStatus，orderStatusName
                   数字：0已取消，1待付款，1（待发货）已付款，3待收货（已发货），4已完成（已收货）
                   商品是否评价orderDetailStatus，orderDetailStatusName
                   数字：0待评价，1已评价 */
            },
            initScreen() {
                this.show = this.screenWidth >= 768
            }
        },
        watch: {
            screenWidth(val) {
                this.screenWidth = val
                this.initScreen()
            },
            orderDetail(val) {
                val.products.forEach(item => {
                    this.quantity += item.count
                })
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .el-breadcrumb >>> span:hover
        color $activeColor
    .el-steps >>> .is-finish
        color $success
        border-color $success
    .main-con
        background-color $bgc_1
        padding-bottom 100px
        .main
            width 1170px
            margin 0 auto
            .el-breadcrumb
                height 50px
                line-height 50px
            .box
                width 100%
                box-sizing border-box
                border 1px solid $border
                &:not(:last-child)
                    margin-bottom 30px
                &::before, &::after
                    content ""
                    display table
                    clear both
                    zoom 1
                .l-col
                    width 30%
                    height 300px
                    float left
                    background-color #ffffff
                    border-right 1px solid $border
                    box-sizing border-box
                    padding 20px 0
                .r-col
                    width 70%
                    height 300px
                    display inline-block
                    float right
                    background-color #ffffff
                    box-sizing border-box
                    padding 20px 0
            .box-0
                .l-col
                    display flex
                    flex-direction column
                    justify-content center
                    align-items center
                    .order-id
                        color $fontColor_intro
                        margin-bottom 40px
                    .status
                        font-size .5rem
                        font-weight 600
                        color $success
                .r-col
                    display flex
                    flex-direction column
                    justify-content center
            .box-1
                .l-col
                    padding-left 30px
                    .left
                        display inline-block
                        margin-right 20px
                        margin-bottom 20px
                        .img-con
                            width 100px
                            height 100px
                            &:not(:last-child)
                                margin-bottom 10px
                            a
                                display inline-block
                                img
                                    width 100%
                                    height 100%
                    .right
                        display inline-block
                        vertical-align top
                        font-size .26rem
                .r-col
                    .tips
                        width 100%
                        height 100%
                        color $fontColor_intro
                        display flex
                        justify-content center
                        align-items center
            .box-2
                display flex
                background-color #ffffff
                padding 20px 0
                height 300px
                .info
                    width 33.33%
                    height 100%
                    box-sizing border-box
                    padding 0 30px
                    &:not(:last-child)
                        border-right 1px solid $border
                    table
                        border-collapse separate
                        border-spacing 0 10px
                        tr
                            vertical-align top
                            td.label
                                width 80px
                            td
                                font-size .26rem
            .box-3
                border 1px solid $border
                .p-total
                    padding 20px
                    background-color #ffffff
                    &::before, &::after
                        display table
                        content ""
                        clear both
                        zoom 1
                    ul
                        float right
                        li
                            line-height 30px
                            font-size .26rem
                            &:last-child
                                color $activeColor
                                .total
                                    font-size .4rem
                                    font-weight 600
                            .label
                                text-align justify
                                text-justify distribute-all-lines
                                text-align-last justify
                                width 80px
                                display inline-block
                            .num
                                text-align right
                                display inline-block
                                width 150px
    @media screen and (min-width: 992px) and (max-width: 1200px)
        .main-con .main
            width 970px
    @media screen and (min-width: 768px) and (max-width: 991px)
        .main-con .main
            width 100%
            padding 0 15px
            box-sizing border-box
            .box
                .l-col
                    max-width 25%
                .r-col
                    min-width 75%
    @media screen and (max-width: 767px)
        .p-con
            width 100%
            background-color $bgc_1
            padding-bottom 50px
            .state
                padding 15px
                background-color $activeColor_3
                color #ffffff
                font-weight 600
            .products
                background-color #ffffff
                border 1px solid $border
                .pro-head
                    height 40px
                    line-height 40px
                    font-size .28rem
                    padding 0 15px
                    border-bottom 1px solid $border
                    .num
                        float right
                        font-size .24rem
                        color $fontColor_intro
                .pro-item-con
                    padding 15px 10px
                    .pro-item
                        width 100%
                        display flex
                        box-sizing border-box
                        .left
                            .img-con
                                width 80px
                                height 80px
                                img
                                    width 100%
                                    height 100%
                        .right
                            width 100%
                            padding-left 10px
                            .name
                                display -webkit-box
                                -webkit-box-orient vertical
                                -webkit-line-clamp 1
                                overflow hidden
                            .attr
                                color $fontColor_intro
                                font-size .24rem
                                margin-top 5px
                                span
                                    margin-right 10px
                                    display inline-block
                            .pn
                                margin-top 5px
                                line-height 30px
                                .price
                                    color $activeColor
                                .num
                                    color $fontColor_intro
                                    font-size .24rem
                                    float right
                    .opts
                        display flex
                        flex-direction row
                        justify-content flex-end
                        margin-top 10px
                        .text
                            font-size .26rem
                            color $fontColor_intro
            ul
                padding 15px
                background-color #ffffff
                margin-top 15px
            ul.order-info
                li
                    display flex
                    line-height 20px
                    font-size .26rem
                    .item-name
                        width 70px
                        flex-shrink 0
                        text-align justify
                        text-justify: distribute-all-lines
                        text-align-last: justify
                        color $fontColor_intro
            ul.total-con
                li
                    display flex
                    justify-content space-between
                    .item-name
                        font-size .26rem
                        line-height 20px
                .real-pay
                    line-height 40px
                    .text
                        line-height 40px
                        font-weight 600
                    .num
                        font-size .3rem
                        font-weight 600
                        color $activeColor
</style>