<template>
    <div class="con">
        <div class="top"><span class="title">配送清单</span><router-link to="/cart">返回购物车</router-link></div>
        <div class="main">
            <div class="lr lr-ship">
                <div class="title">配送方式</div>
                <div>
                    <div class="ship-item">快递运输</div>
                    <div class="ship-tip">配送时间：<span>工作日、双休日与节假日均可送货</span></div>
                </div>
            </div>
            <div class="lr lr-product">
                <div class="title">商品</div>
                <table>
                    <tbody class="pdt-item" v-for="item in products" :key="item.id">
                        <tr>
                            <td class="pdt">
                                <div class="img-con"><img :src="item.img" alt=""></div>
                                <div class="info">
                                    <router-link :to="{name: 'ProductDetail', params: {id: item.productId}, query: {skuid: item.id} }">{{item.name}}</router-link>
                                    <div class="props">
                                        <div class="prop-item"><strong>颜色：</strong><span>{{item.color}}</span></div>
                                        <div class="prop-item"><strong>尺寸：</strong><span>{{item.size}}</span></div>
                                    </div>
                                </div>
                            </td>
                            <td class="price">￥{{item.price.toFixed(2)}}</td>
                            <td class="num">×{{item.num}}</td>
                        </tr>
                        <tr><td class="split" colspan="3" /></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ShipSkuInfo.vue',
        props: {
            products: {
                type: Array,
                required: true
            }
        },
        data() {
            return {

            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .con
        padding 10px 0 20px
        .top
            padding 10px 0
            .title
                font-weight 600
            a
                font-size .26rem
                float right
                color $activeColor
        .main
            display flex
            .lr
                box-sizing border-box
                padding 10px 15px
                .title
                    font-size .24rem
                    font-weight 600
                    padding 2px 0
                    margin-bottom 20px
            .lr-ship
                width 30%
                background-color $bgc_1
                .ship-item
                    width 100px
                    height 35px
                    line-height 31px
                    text-align center
                    font-size .26rem
                    box-sizing border-box
                    border 2px solid $activeColor
                    background-color $bgc_1
                    cursor default
                .ship-tip
                    color $fontColor_intro
                    font-size .24rem
                    margin-top 30px
                    span
                        color $fontColor
            .lr-product
                width 70%
                background-color #f6ffff
                table
                    width 100%
                    tbody.pdt-item
                        tr
                            vertical-align top
                            td.pdt
                                display flex
                                flex-direction row
                                .img-con
                                    width 80px
                                    height 80px
                                    margin-right 15px
                                    background-color $bgc_1
                                    display inline-block
                                    flex-shrink 0
                                    img
                                        width 100%
                                        height 100%
                                .info
                                    width 100%
                                    a
                                        color $fontColor
                                        display -webkit-box
                                        -webkit-box-orient vertical
                                        -webkit-line-clamp 2
                                        overflow hidden
                                        word-break break-all
                                    .props
                                        display flex
                                        margin-top 10px
                                        .prop-item
                                            width 50%
                                            font-size .24rem
                                            strong
                                                font-weight 600
                                            span
                                                color $fontColor
                            td.price
                                width 20%
                                color $activeColor
                                font-weight 600
                            td.num
                                width 20%
                            td.price, td.num
                                text-align center
                            td.split
                                height 20px
    @media screen and (max-width: 767px)
        .con
            .main
                display flex
                flex-direction column
                .lr
                    width 100%
                    table tbody.pdt-item tr
                        td.pdt
                            display flex
                            flex-direction column
                        .img-con
                            width 60px
                            height 60px
                        .info
                            a
                                margin-top 10px
                            div.props
                                display flex
                                flex-direction column
                                margin-top 0
</style>