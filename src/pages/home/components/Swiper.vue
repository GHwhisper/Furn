<template>
    <div class="wrapper" v-loading.fullscreen.lock="fullscreenLoading">
        <swiper :options="swiperOption" class="swiper" v-if="swiperList.length">
            <swiper-slide class="swiper-item" v-for="item in swiperList" :key="item.id">
                <div class="item-con swiper-txt-con">
                    <div class="info-txt">
                        <h4 class="animated fadeInUp">{{item.praise}}</h4>
                        <h2 class="animated fadeInUp">{{item.name}}</h2>
                        <p class="intro animated fadeInUp">{{item.description}}</p>
                        <p class="price animated fadeInUp">￥{{item.price.toFixed(2)}}<del v-if="item.originalPrice">￥{{item.originalPrice.toFixed(2)}}</del></p>
                        <button class="btn add-to-cart animated fadeInDown" @click.prevent="addToCart(item)"><span class="iconfont add-icon">&#xe6f5;</span>加入购物车</button>
                        <button class="btn more-info animated fadeInDown" @click.prevent="viewProductDetail(item.productId, item.id)">了解更多</button>
                    </div>
                </div>
                <div class="item-con swiper-img-con">
                    <img :src="item.img" :alt="item.name">
                </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import axios from 'axios'
    import { mapState, mapMutations } from 'vuex'
    export default {
        name: 'HomeSwiper',
        components: {
            swiper,
            swiperSlide
        },
        props: {
            swiperList: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                swiperOption: {
                    pagination: '.swiper-pagination',
                    loop: true,
                    autoplay: 5000
                },
                fullscreenLoading: false
            }
        },
        methods: {
            addToCart(product) {   // 加入购物车
                if(!this.token) {
                    this.$message({showClose: true,message: '您当前未登录,请登录后继续操作',type: 'warning',duration: 1500})
                    setTimeout(() => {
                        this.$router.push('/login')
                    }, 500)
                } else {
                    this.fullscreenLoading = true
                    axios.post('/api/addShoppingCat', {
                        id: product.id,
                        num: 1
                    }).then(res => {
                        let data = res.data
                        if(data.addStatus === 200) {
                            this.bus.$emit('updateCart')    // 更新导航栏中购物车数据
                            this.changeCurrentProduct({product,num: 1})
                            this.$router.push('/addsucc')
                        }
                        if(data.addStatus === 405) {
                            this.$message({showClose: true, message: '添加购物车失败，请重试', type: 'warning', duration: 1500})
                        }
                        this.fullscreenLoading = false
                    }).catch(e => {
                        this.fullscreenLoading = false
                        console.log(e)
                    })
                }
            },
            viewProductDetail(spuid, skuid) {
                this.$router.push({path:`/product/detail/${spuid}`, query: {skuid: skuid}})
            },
            ...mapMutations(['changeCurrentProduct'])
        },
        computed: {
            ...mapState(['token'])
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~styles/varibles.styl'
    // 设置轮播分页的颜色
    .wrapper >>> .swiper-pagination-bullet-active
        background-color: $activeColor
    //  设置分页的位置
    .wrapper >>> .swiper-pagination-bullets
        position relative
        bottom 40px
    @media screen and (min-width: 768px)
        .wrapper >>> .swiper-pagination-bullets
            position relative
            bottom 60px
    // 容器.wrapper高度响应
    @media screen and (min-width: 768px)
        .wrapper
            height 820px
    @media screen and (max-width: 767px)
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
        @media screen and (min-width: 992px) and (max-width: 1200px)
            .swiper
                width 970px
        @media screen and (min-width: 768px) and (max-width: 991px)
            .swiper
                width 750px
        //轮播图内部元素布局响应
        @media (min-width: 768px)
            .swiper-txt-con
                width 58%
            .swiper-img-con
                width 42%
        @media (max-width: 767px)
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
                        background-color $fontColor
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