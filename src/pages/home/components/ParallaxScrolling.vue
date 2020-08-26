<template>
    <section class="parallax-container">
        <div class="parallax-background" v-for="item in list" :key="item.id" :style="{backgroundImage: 'url(' + item.img + ')'}">
            <div class="parallax-content">
                <div class="parallax-text">
                    <h2>{{item.name}}</h2>
                    <p>{{item.intro}}</p>
                </div>
                <p class="price">售价 <span>￥{{item.price.toFixed(2)}}</span></p>
                <router-link tag="button" :to="{path: `/product/detail/${item.productId}`, query: {skuid: item.id}}">查看详情</router-link>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'HomeParallaxScrolling',
        props: {
            list: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    @media screen and (min-width: 1201px)
        .parallax-content
            width 1170px
            .parallax-text
                width 630px
    @media screen and (min-width: 992px) and (max-width: 1200px)
        .parallax-content
            width 970px
            .parallax-text
                width 630px
    @media screen and (min-width: 768px) and (max-width: 991px)
        .parallax-content
            width 750px
            .parallax-text
                width 630px
    @media screen and (max-width: 767px)
        .parallax-content
            width 100%
            .parallax-text
                width 100%
    .parallax-background
        width 100%
        height 1000px
        margin 0 auto
        background-attachment fixed
        background-repeat no-repeat
        background-position center center
        background-size cover
        position relative
        &:before
            position absolute
            content ''
            top 0
            left 0
            width 100%
            height 100%
            background rgba(51 , 59, 62, .3)
            z-index 1
        .parallax-content
                height 1000px
                margin 0 auto
                box-sizing border-box
                padding 0 .3rem
                display flex
                flex-direction column
                justify-content center
                position relative
                z-index 10
                .parallax-text
                    h2
                        color #ffffff
                        font-size .6rem
                        font-weight bold
                        /*position relative*/
                        /*animation zoomIn linear 1s*/
                    p
                        color #ffffff
                        font-size .32rem
                        line-height 1.8
                        font-weight bold
                        margin 25px 0 10px
                        /*position relative*/
                        /*animation zoomIn linear 1s*/
                .price
                    color #ffffff
                    font-size .32rem
                    font-weight bold
                    span
                        color $activeColor
                button
                    width 3.4rem
                    height 1rem
                    margin 35px 0 0
                    color #ffffff
                    font-size .32rem
                    font-weight bold
                    background-color $activeColor
                    cursor pointer
                    transition all ease .3s
                    &:hover
                        background-color $activeColor_2
    //@keyframes zoomIn
    //{
    //    0%{
    //        opacity 0.5
    //        top 50px
    //    }
    //    100%{
    //        opacity 1
    //        top 0
    //    }
    //}
</style>