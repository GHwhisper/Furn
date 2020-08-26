<template>
    <section class="feature-con">
        <h2 class="title">独家特色</h2>
        <div class="feature-list">
            <div class="feature-item" v-for="item in featureList" :key="item.id">
                <div class="feature">
                    <div class="img-con">
                        <img :src="item.img" :alt="item.name">
                    </div>
                    <div class="info">
                        <p class="grade">
                            <el-rate disabled :value="item.rate"></el-rate>
                            <span class="comment">({{item.comments}} 评论)</span>
                        </p>
                        <router-link :to="{path: `/product/detail/${item.productId}`, query: {skuid: item.id}}" class="name">{{item.name}}</router-link>
                        <p class="price">￥{{item.price.toFixed(2)}}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'HomeFeaturedProducts',
        props: {
            featureList: {
                type: Array,
                required: true
            }
        },
        data() {
            return {

            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    @media screen and (min-width: 1201px)
        .feature-con
            width 1170px
        .feature-item
            width 25%
            height 440px
            display inline-block
        .info
            margin .5rem 0
            .el-rate
                display inline-block
    @media screen and (min-width: 992px) and (max-width: 1200px)
        .feature-con
            width 970px
        .feature-item
            width 25%
            height 385px
            display inline-block
        .info
            margin .5rem 0
            .el-rate
                display block
                margin-bottom .1rem
    @media screen and (min-width: 768px) and (max-width: 991px)
        .feature-con
            width 750px
        .feature-item
            width 25%
            height 380px
            display inline-block
        .info
            margin .5rem 0
            .el-rate
                display inline-block
    @media screen and (max-width: 767px)
        .feature-con
            width 100%
        .feature-item
            width 300px
            height 420px
            margin .6rem auto
        .info
            margin .5rem 0 0
            .el-rate
                display inline-block
    .feature-con
        padding-top 2rem
        margin 0 auto
        .title
            font-size .6rem
            color $fontColor-name
            font-weight bold
            text-align center
        .feature-list
            margin-top 1.6rem
            .feature-item
                padding 0 .3rem
                box-sizing border-box
                .feature
                    width 100%
                    height 100%
                    text-align center
                    display flex
                    flex-direction column
                    .img-con
                        width 100%
                        height 0
                        padding-top 100%
                        overflow hidden
                        position relative
                        img
                            width 100%
                            height 100%
                            position absolute
                            top 0
                            left 0
                            right 0
                            bottom 0
                    .info
                        flex 1
                        display flex
                        flex-direction column
                        justify-content space-between
                        .grade
                            .comment
                                color $fontColor_intro
                                font-size .28rem
                        .name
                            color $fontColor-name
                            font-size .32rem
                            font-weight bold
                            padding 0 20px
                            overflow hidden
                            white-space nowrap
                            text-overflow ellipsis
                        .price
                            color $fontColor-name
                            font-size .36rem
</style>