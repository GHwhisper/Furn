<template>
    <section class="feature-con">
        <h2 class="title">Featured Products</h2>
        <div class="feature-list">
            <div class="feature-item" v-for="item in featureList" :key="item.id">
                <div class="feature">
                    <img :src="require(`../../../assets/images/${item.img}`)" :alt="item.name">
                    <div class="info">
                        <p class="grade">
                            <span class="stars"></span>
                            <span class="comment">({{item.comments}} Review)</span>
                        </p>
                        <router-link to="" class="name">{{item.name}}</router-link>
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

        },
        data() {
            return {
                featureList: [
                    {
                        id: '0001',
                        name: 'Designed Sofa',
                        price: 160,
                        img: 'f1.jpg',
                        comments: 20
                    },
                    {
                        id: '0002',
                        name: 'Dinning Table',
                        price: 200,
                        img: 'f2.jpg',
                        comments: 45
                    },
                    {
                        id: '0003',
                        name: 'Chair And Table',
                        price: 100,
                        img: 'f3.jpg',
                        comments: 60
                    },
                    {
                        id: '0004',
                        name: 'Modern Arm Chair',
                        price: 299,
                        img: 'f4.jpg',
                        comments: 1000
                    }
                ]
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
    @media screen and (min-width: 991px) and (max-width: 1200px)
        .feature-con
            width 970px
        .feature-item
            width 25%
            height 385px
            display inline-block
        .info
            margin .5rem 0
    @media screen and (min-width: 766px) and (max-width: 990px)
        .feature-con
            width 750px
        .feature-item
            width 25%
            height 380px
            display inline-block
        .info
            margin .5rem 0
    @media screen and (max-width: 765px)
        .feature-con
            width 100%
        .feature-item
            width 300px
            height 420px
            margin .6rem auto
        .info
            margin .5rem 0 0
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
                    img
                        width 100%
                        height auto
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
                        .price
                            color $fontColor-name
                            font-size .36rem
</style>