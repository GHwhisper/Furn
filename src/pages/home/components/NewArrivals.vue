<template>
    <section class="new-arrivals-con">
        <h2 class="title">New Arrivals</h2>
        <div class="new-arrival-item">
            <div class="arrival">
                <div class="single-new-arrival">
                    <span class="sale">Sale</span>
                    <div class="img-con">
                        <img src="../../../assets/images/arrivals1.png" alt="">
                        <div class="add-to-cart">

                        </div>
                    </div>
                    <a class="name" href="">Wooden Chair</a>
                    <p class="price">￥65.00</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'HomeNewArrivals',
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    @media screen and (min-width: 1201px)
        .new-arrivals-con
            width 1170px
    @media screen and (min-width: 991px) and (max-width: 1200px)
        .new-arrivals-con
            width 970px
    @media screen and (min-width: 766px) and (max-width: 990px)
        .new-arrivals-con
            width 750px
    @media screen and (max-width: 765px)
        .new-arrivals-con
            width 100%
    .new-arrivals-con
        padding-top 2rem
        margin 0 auto 200px
        .title
            font-size .6rem
            color $fontColor-name
            font-weight bold
            text-align center
        .new-arrival-item
            width 25%
            height 8.8rem
            margin-top 1.6rem
            padding 0 .3rem
            box-sizing border-box
            .arrival
                width 100%
                height 100%
                position relative
                .sale
                    width 1.2rem
                    height .6rem
                    line-height .6rem
                    text-align center
                    color #ffffff
                    font-weight bold
                    display block
                    background-color: #d8924c
                    position absolute
                    right 0
                    top .2rem
                .img-con
                    height 6.2rem
                    background-color: $bgc_1
                    display flex
                    flex-direction row
                    justify-content center
                    align-items center
                    position relative
                    img
                        max-width: 60%
                        height auto
                    .add-to-cart
                        width 100%
                        height .7rem
                        background-color: #33383c
                        position absolute
                        bottom 0
                .name
                    display block
                    text-align center
                    font-size .32rem
                    font-weight bold
                    color $fontColor-name
                    margin .52rem 0 .32rem
                .price
                    font-size .32rem
                    font-family Roboto, sans-serif
                    color $fontColor-name
                    text-align center
                    line-height 1.8
            .single-new-arrival:hover
                a
                    color $activeColor
</style>