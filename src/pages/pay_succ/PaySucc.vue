<template>
    <el-container direction="vertical">
        <page-header><template #name>支付成功</template></page-header>
        <div class="main">
            <i class="iconfont icon-chenggong succ-icon"></i>
            <div class="succ-text">支付成功!</div>
            <div class="order-text">我们将会尽快为您安排发货。<br/>您可以返回 <router-link :to="'/order/all'">我的订单</router-link> 查看订单信息</div>
        </div>
    </el-container>
</template>

<script>
    import PageHeader from 'common/header/PageHeader'
    export default {
        name: 'PaySucc',
        components: {
            PageHeader
        },
        data() {
            return {

            }
        },
        methods: {

        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .main
        width 1170px
        height 300px
        margin 0 auto
        padding-top 30px
        display flex
        flex-direction column
        justify-content center
        align-items center
        .succ-icon
            font-size 1.5rem
            color $success
        .succ-text
            margin-top 20px
            font-size .4rem
        .order-text
            margin-top 20px
            line-height 25px
            a
                font-size .3rem
                color $activeColor
    @media screen and (min-width: 992px) and (max-width: 1200px)
        .main
            width 970px
    @media screen and (max-width: 991px)
        .main
            width 100%
            padding 0 15px
            box-sizing border-box
</style>