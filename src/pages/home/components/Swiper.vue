<template>
    <div class="wrapper">
        <swiper :options="swiperOption" class="swiper">
            <swiper-slide class="swiper-item" v-for="item in swiperList" :key="item.id">
                <div class="item-con swiper-txt-con">
                    <div class="info-txt">
                        <h4 class="animated fadeInUp">{{item.praise}}</h4>
                        <h2 class="animated fadeInUp">{{item.name}}</h2>
                        <p class="intro animated fadeInUp">{{item.description}}</p>
                        <p class="price animated fadeInUp">￥{{item.currentPrice}}<del>￥{{item.originalPrice}}</del></p>
                        <button class="btn add-to-cart animated fadeInDown"><span class="iconfont add-icon">&#xe6f5;</span>Add to Cart</button>
                        <button class="btn more-info animated fadeInDown">More Info</button>
                    </div>
                </div>
                <div class="item-con swiper-img-con">
                    <img :src="require(`../../../assets/images/${item.img}`)" :alt="item.name">
                </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
    export default {
        name: 'HomeSwiper',
        props: {

        },
        data() {
            return {
                swiperOption: {
                    pagination: '.swiper-pagination',
                    loop: true,
                    autoplay: 5000
                },
                swiperList: [
                    {
                        id: '0001',
                        praise: 'Great Design Collection',
                        name: 'Cloth Covered Accent Chair',
                        description: 'Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit, Sed Do Eiuiana Smod Tempor Ut Labore Et Dolore Magna Aliqua.Ut Enim Ad Minim Veniam, Quis Nostrud Exercitation Ullamco Laboris Nisi Ut Aliquip.',
                        currentPrice: 399,
                        originalPrice: 499,
                        img: 'slider1.png'
                    },
                    {
                        id: '0002',
                        praise: 'Great Design Collection',
                        name: 'Mapple Wood Accent Chair',
                        description: 'Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit, Sed Do Eiuiana Smod Tempor Ut Labore Et Dolore Magna Aliqua. Ut Enim Ad Minim Veniam, Quis Nostrud Exercitation Ullamco Laboris Nisi Ut Aliquip.',
                        currentPrice: 199,
                        originalPrice: 299,
                        img: 'slider2.png'
                    },
                    {
                        id: '0003',
                        praise: 'Great Design Collection',
                        name: 'Valvet Accent Arm Chair',
                        description: 'Lorem Ipsum Dolor Sit Amet, Consectetur Adipisicing Elit, Sed Do Eiuiana Smod Tempor Ut Labore Et Dolore Magna Aliqua. Ut Enim Ad Minim Veniam, Quis Nostrud Exercitation Ullamco Laboris Nisi Ut Aliquip.',
                        currentPrice: 299,
                        originalPrice: 399,
                        img: 'slider3.png'
                    }
                ]
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~styles/varibles.styl'
    .wrapper >>> .swiper-pagination-bullet-active
        background-color: $activeColor
    .wrapper >>> .swiper-pagination-bullets
        position relative
        bottom 40px
    @media screen and (min-width: 766px)
        .wrapper >>> .swiper-pagination-bullets
            position relative
            bottom 60px
    // 容器.wrapper高度响应
    @media screen and (min-width: 766px)
        .wrapper
            height 820px
    @media screen and (max-width: 765px)
        .wrapper
            height auto
    .wrapper
        padding-top 2rem
        width 100%
        background-color: $bgc_1
        .swiper
            height 100%
        // 轮播图宽度响应
        @media screen and (min-width: 1201px)
            .swiper
                width 1170px
        @media screen and (min-width: 991px) and (max-width: 1200px)
            .swiper
                width 970px
        @media screen and (min-width: 766px) and (max-width: 990px)
            .swiper
                width 750px
        //轮播图内部元素布局响应
        @media (min-width: 766px)
            .swiper-txt-con
                width 58%
            .swiper-img-con
                width 42%
        @media (max-width: 765px)
            .swiper
                .item-con
                    width 100%
                    .info-txt
                        padding 1rem 0 1rem
                @media screen and (min-width 501px)
                    .swiper-img-con
                        padding 0 2rem 1.5rem
                @media screen and (max-width 500px)
                    .swiper-img-con
                        padding 0 .3rem 1.5rem
        .item-con
            height 100%
            box-sizing border-box
            padding 0 .3rem
            display flex
            flex-direction column
            justify-content center
        .swiper-txt-con
            float left
            .info-txt
                h4
                    font-size .56rem
                    color $fontColor_h4
                h2
                    font-size .8rem
                    color $fontColor
                    margin .4rem 0 .44rem
                .intro
                    font-size .32rem
                    color $fontColor_intro
                    margin .7rem 0 .4rem
                    line-height 1.8
                .price
                    font-family Roboto, sans-serif
                    font-size .32rem
                    font-weight bold
                    color $fontColor
                    padding-left .7rem
                    position relative
                    &::before
                        content ''
                        width 25px
                        height 1px
                        background-color: $fontColor
                        position absolute
                        left 0
                        top .15rem
                    del
                        color $fontColor-del
                        margin-left .2rem
                        text-decoration line-through
                .btn
                    width 3.4rem
                    height 1.2rem
                    margin-top .68rem
                    font-size .32rem
                    font-weight bold
                    &:hover
                        cursor pointer
                        border 1px $activeColor solid
                .add-to-cart
                    color #ffffff
                    background-color: $activeColor
                    transition background-color .4s
                    margin-right 5px
                    &:hover
                        color $activeColor
                        background-color transparent
                    .add-icon
                        font-size .38rem
                        margin-right .2rem
                .more-info
                    color $activeColor
                    background-color: transparent
        .swiper-img-con
            width 42%
            float right
            img
                width 100%
                height auto
</style>