<template>
    <div class="product-item" >
        <router-link tag="div" :to="{path: `/product/detail/${product.productId}`, query: {skuid: product.id}}" class="img-con">
            <img :src="product.img" alt="">
        </router-link>
        <div class="info-con">
            <div class="price">￥<strong>{{product.price.toFixed(2)}}</strong></div>
            <router-link :to="{path: `/product/detail/${product.productId}`, query: {skuid: product.id}}" class="name">{{product.name}}</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ListProductItem',
        props: {
            product: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .product-item
        width 25%
        padding 0 15px
        box-sizing border-box
        display inline-block
        margin-bottom 30px
        .img-con
            width 100%
            height 0
            padding-top @width
            position relative
            overflow hidden
            cursor pointer
            img
                width 100%
                height 100%
                position absolute
                top 0
                left 0
                background-color $bgc_1
            &::after
                width 100%
                height 100%
                content ""
                position absolute
                top 0
                right 0
                bottom 0
                left 0
                background-color rgba(0, 0, 0, .2)
                z-index 10
                visibility hidden
                opacity 0
                transition all ease-in-out .3s
            &:hover
                img
                    transform scale(1.1)
                    transition transform ease .3s
                &::after
                    visibility visible
                    opacity 1
        .info-con
            width 100%
            height 80px
            padding 10px 0
            .price
                font-size .32rem
                margin-bottom 5px
                color $activeColor
                strong
                    font-size .4rem
            .name
                height 40px
                line-height 20px
                font-size .3rem
                color $fontColor-name
                display -webkit-box
                -webkit-box-orient vertical
                -webkit-line-clamp 2
                overflow hidden
                &:hover
                    color $activeColor
    @media screen and (min-width: 768px) and (max-width: 991px)
        .product-item
            width 33.33%
    @media screen and (max-width: 767px)
        .product-item
            width 50%
</style>