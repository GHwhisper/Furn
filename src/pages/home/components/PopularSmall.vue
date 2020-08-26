<template>
    <div class="pop-small-container">
        <div class="pop-product" v-if="product">
            <div class="product-img">
                <img :src="product.img" alt="">
            </div>
            <h2 class="product-name"><router-link :to="{path: `/product/detail/${product.productId}`, query: {skuid: product.id}}">{{product.name}}</router-link></h2>
            <p class="product-intro">{{product.description}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HomePopularSmall',
        props: {
            product: Object
        },
        data() {
            return{

            }
        },
        methods: {

        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    @media screen and (min-width: 1201px)
        .pop-small-container
            width 25%
            height 280px
    @media screen and (min-width: 992px) and (max-width: 1200px)
        .pop-small-container
            width 25%
            height 320px
    @media screen and (max-width: 991px)
        .pop-small-container
            width 350px
            height 324px
            margin .6rem 0
    .pop-small-container
        box-sizing border-box
        padding 0 .3rem
        text-align center
        .pop-product
            width 100%
            height 100%
            background-color: $bgc_1
            overflow hidden
            .product-img
                height 50%
                box-sizing border-box
                position relative
                text-align center
                display flex
                justify-content center
                img
                    height 100%
                    position absolute
                    bottom 0
            .product-name
                font-size .36rem
                padding 0 10px
                a
                    width 100%
                    color $fontColor-name
                    font-weight bold
                    display inline-block
                    margin .5rem 0 .44rem
                    transition .4s;
                    -webkit-transition .4s; /* Safari */
                    overflow hidden
                    white-space nowrap
                    text-overflow ellipsis
            .product-intro
                color $fontColor_intro
                font-size .28rem
                padding 0 .4rem
                line-height 1.8
                display -webkit-box
                -webkit-box-orient vertical
                -webkit-line-clamp 2
                overflow hidden
            @media screen and (min-width: 992px) and (max-width: 1200px)
                .product-intro
                    -webkit-line-clamp 3
        .pop-product:hover a
            color $activeColor
</style>