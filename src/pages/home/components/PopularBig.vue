<template>
    <div class="container">
        <div class="pop-product">
            <div class="product-img">
                <img :src="require(`../../../assets/images/${product.img}`)" alt="">
            </div>
            <div class="product-info">
                <h2 class="product-name"><a href="">{{product.name}}</a></h2>
                <p class="product-intro">{{product.description}}</p>
                <p class="product-sale">Sales Start from <span class="sale-price">￥{{product.price.toFixed(2)}}</span></p>
                <button class="more-info-btn">Discover More</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HomePopularBig',
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
            width 50%
            height 280px
            .pop-product
                display flex
                flex-direction row
                align-items center
    @media screen and (min-width: 991px) and (max-width: 1200px)
        .container
            width 50%
            height 320px
            .pop-product
                display flex
                flex-direction row
                align-items center
    @media screen and (max-width: 990px)
        .container
            width 350px
            .pop-product
                display flex
                flex-direction column
                justify-content center
                align-items center
                padding .6rem 0
                .product-info
                    text-align center
    .container
        box-sizing border-box
        padding 0 .3rem
        .pop-product
            width 100%
            height 100%
            background-color: $bgc_1
            overflow hidden
            .product-img
                padding 0 .3rem
            .product-info
                padding 0 .3rem
                .product-name
                    font-size .36rem
                    a
                        color $fontColor-name
                        font-weight bold
                        display inline-block
                        transition .4s;
                        -webkit-transition .4s; /* Safari */
                .product-intro
                    color $fontColor_intro
                    font-size .28rem
                    line-height 1.8
                    margin .36rem 0 .26rem
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 3;
                    overflow: hidden;
                .product-sale
                    font-size .28rem
                    font-weight bold
                    .sale-price
                        color $activeColor
                .more-info-btn
                    width 2.4rem
                    height .8rem
                    margin-top .46rem
                    box-sizing border-box
                    border 1px black solid
                    background-color: transparent
                    font-size .28rem
                    color $fontColor-name
                    font-weight bold
                    transition .4s
                    -webkit-transition .4s;
                    &:hover
                        cursor pointer
        .pop-product:hover
            .product-name a
                color $activeColor
            .more-info-btn
                color #ffffff
                background-color: $fontColor-name
</style>

