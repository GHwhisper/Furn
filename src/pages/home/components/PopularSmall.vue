<template>
    <div class="container">
        <div class="pop-product">
            <div class="product-img">
                <img :src="require(`../../../assets/images/${product.img}`)" alt="">
            </div>
            <h2 class="product-name"><a href="">{{product.name}}</a></h2>
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
        .container
            width 25%
            height 280px
    @media screen and (min-width: 991px) and (max-width: 1200px)
        .container
            width 25%
            height 320px
    @media screen and (max-width: 990px)
        .container
            width 350px
            height 324px
            margin .6rem auto
    .container
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
                    max-width: 100%
                    height auto
                    position absolute
                    bottom 0
            .product-name
                font-size .36rem
                a
                    color $fontColor-name
                    font-weight bold
                    display inline-block
                    margin .5rem 0 .44rem
                    transition .4s;
                    -webkit-transition .4s; /* Safari */
            .product-intro
                color $fontColor_intro
                font-size .28rem
                padding 0 .4rem
                line-height 1.8
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            @media screen and (min-width: 991px) and (max-width: 1200px)
                .product-intro
                    -webkit-line-clamp: 3;
        .pop-product:hover a
            color $activeColor
</style>