<template>
    <el-container direction="vertical">
        <page-header>
            <template #right><search /></template>
        </page-header>
        <div class="main-con">
            <div class="succ-text"><i class="el-icon-shopping-cart-full"></i>已成功加至购物车</div>
            <div class="product">
                <div class="img-con"><img :src="currentProduct.product.img" alt=""></div>
                <div class="info">
                    <router-link :to="{name: 'ProductDetail', params: {id: currentProduct.product.productId}, query: {skuid: currentProduct.product.id}}">{{currentProduct.product.name}}</router-link>
                    <div class="attr">
                        <span>{{currentProduct.product.color}}</span>
                        <span>{{currentProduct.product.size}}</span>
                        <span>{{currentProduct.num}}件</span>
                    </div>
                </div>
            </div>
            <div class="btns">
                <el-button type="warning" plain icon="el-icon-arrow-left" class="back-btn" @click="goBack"></el-button>
                <el-button type="warning" plain @click="toDetail(currentProduct.product.productId, currentProduct.product.id)">查看详情</el-button>
                <el-button type="warning" @click="toCart">去购物车结算</el-button>
            </div>
        </div>
    </el-container>
</template>

<script>
    import PageHeader from 'common/header/PageHeader'
    import Search from 'common/search/Search'
    import { mapState } from 'vuex'
    export default {
        name: "AddSucc",
        components: {
            PageHeader,
            Search
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            },
            toDetail(spuid, skuid) {
                this.$router.push({ name: 'ProductDetail', params: { id: spuid }, query: { skuid: skuid } })
            },
            toCart() {
                this.$router.push('/cart')
            }
        },
        computed: {
            ...mapState(['currentProduct'])
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .main-con
        width 1170px
        margin 0 auto
        padding-top 30px
        .succ-text
            color $success
            font-size .5rem
            display flex
            align-items center
            i
                font-size 1rem
                margin-right 15px
        .product
            display flex
            padding-top 50px
            .img-con
                width 100px
                height 100px
                margin-right 10px
                flex-shrink 0
                img
                    width 100%
                    height 100%
            .info
                a
                    color #333333
                    display block
                    margin-bottom 20px
                    font-size .36rem
                    &:hover
                        color $activeColor
                .attr
                    color $fontColor_intro
                    span
                        margin-right 10px
        .btns
            margin-top 20px
            float right
            .back-btn
                padding-left 15px
                padding-right 15px
    @media screen and (min-width: 992px) and (max-width: 1200px)
        .main-con
            width 970px
    @media screen and (min-width: 768px) and (max-width: 991px)
        .main-con
            width 100%
            padding 0 15px
            box-sizing border-box
    @media screen and (max-width: 767px)
        .main-con
            width 100%
            padding 0 15px
            box-sizing border-box
            .succ-text
                font-size .3rem
                i
                    font-size .6rem
            .product
                flex-direction column
                align-items center
                .img-con
                    margin 0
                    margin-bottom 10px
            .btns
                width 100%
                display flex
                justify-content center
                margin-top 50px
</style>