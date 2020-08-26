<template>
    <table>
        <thead>
            <tr>
                <th class="th-pdc">商品</th>
                <th class="th-id">商品编号</th>
                <th class="th-prc">单价</th>
                <th class="th-num">数量</th>
                <th class="th-sta">状态</th>
            </tr>
        </thead>
        <tbody v-for="item in list" :key="item.id">
            <tr><td class="td-split" colspan="5" /></tr>
            <tr>
                <td class="td-p">
                    <div class="img-con">
                        <router-link :to="{path: `/product/detail/${item.productId}`, query: {skuid: item.id}}"><img :src="item.img" alt=""></router-link>
                    </div>
                    <div class="p-info">
                        <router-link :to="{path: `/product/detail/${item.productId}`, query: {skuid: item.id}}">{{item.name}}</router-link>
                    </div>
                </td>
                <td>{{item.productId}}</td>
                <td>￥{{item.price.toFixed(2)}}</td>
                <td>{{item.count}}</td>
                <td>{{orderStatusName}}</td>
            </tr>
        </tbody>
        <tbody><tr><td class="td-split" colspan="5" /></tr></tbody>
    </table>
</template>

<script>
    export default {
        name: 'OrderProductTable',
        props: {
            list: Array, // 商品列表
            orderStatusName: String
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    table
        width 100%
        background-color #ffffff
        border-bottom 1px solid $border
        thead
            text-align center
            background-color $bgc_1
            tr
                th
                    height 40px
                th.th-product
                    width 45%
                th.th-id
                    width 15%
                th.th-prc
                    width 15%
                th.th-num
                    width 10%
                th.th-sta
                    width 15%
        tbody
            font-size .26rem
            tr
                td
                    vertical-align top
                td:not(:first-child)
                    text-align center
                td.td-split
                    padding-top 20px
                td.td-p
                    display flex
                    flex-direction row
                    padding 0 20px
                    .img-con
                        width 80px
                        height 80px
                        margin-right 10px
                        flex-shrink 0
                        a
                            display inline-block
                            img
                                width 100%
                                height 100%
                    .p-info
                        a
                            color #333333
                            &:hover
                                color $activeColor
</style>