<template>
    <section class="new-arrivals-con" v-loading.fullscreen.lock="fullscreenLoading">
        <h2 class="title">新品推荐</h2>
        <div class="arrivals-list">
            <div class="new-arrival-item" v-for="item in newArrivalsList" :key="item.id">
                <div class="arrival">
                    <div class="single-new-arrival">
                        <router-link tag="div" :to="{path: `/product/detail/${item.productId}`, query: {skuid: item.id}}" class="img-con">
<!--                            <span class="sale">Sale</span>-->
                            <img :src="item.img" alt="">
                            <div class="img-con-hover-bg"></div>
                            <div class="new-arrival-cart" @click.stop>
                                <p><span class="iconfont icons">&#xe607;</span><button class="cart-btn" @click="addToCart(item)">加入购物车</button></p>
                                <p>
                                    <span class="iconfont icons love-icon" @click="addToCollection(item)">&#xe74b;</span>
<!--                                    <span class="iconfont icons full-screen-icon">&#xe626;</span>-->
                                </p>
                            </div>
                        </router-link>
                        <router-link :to="{path: `/product/detail/${item.productId}`, query: {skuid: item.id}}" class="name">{{item.name}}</router-link>
                        <p class="price">￥{{item.price.toFixed(2)}}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import axios from "axios";
    import { mapState, mapMutations } from 'vuex'
    export default {
        name: 'HomeNewArrivals',
        props: {
            newArrivalsList: {
                type: Array,
                required: true
            }
        },
        data() {
            return {
                fullscreenLoading: false
            }
        },
        methods: {
            addToCart(product) {
                if(!this.token) {
                    this.$message({showClose: true,message: '您当前未登录,请登录后继续操作',type: 'warning',duration: 1500})
                    setTimeout(() => {this.$router.push('/login')}, 500)
                } else {
                    this.fullscreenLoading = true
                    axios.post('/api/addShoppingCat', {
                        productId: product.productId,
                        id: product.id,
                        num: 1
                    }).then(res => {
                        let data = res.data
                        if(data.addStatus === 200) {
                            this.bus.$emit('updateCart')    // 更新导航栏中购物车数据
                            this.changeCurrentProduct({product, num: 1})
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
            addToCollection(product) {  // 添加收藏
                if(!this.token) {
                    this.$message({showClose: true,message: '您当前未登录,请登录后继续操作',type: 'warning',duration: 1500})
                    setTimeout(() => {
                        this.$router.push('/login')
                    }, 500)
                } else {
                    this.fullscreenLoading = true
                    axios.post('/api/addFavorite', {
                        productId: product.productId,
                        id: product.id
                    }).then(res => {
                        let data = res.data
                        if(data.addStatus === 200) {
                            this.$message({showClose: true,message: '收藏成功',type: 'success',duration: 1500})
                        } else if(data.addStatus === 404) {
                            this.$message({showClose: true,message: '已在收藏夹',type: 'success',duration: 1500})
                        } else if(data.addStatus === 405) {
                            this.$message({showClose: true, message: '添加收藏失败，请重试', type: 'warning', duration: 1500})
                        }
                        this.fullscreenLoading = false
                    }).catch(e => {
                        this.fullscreenLoading = false
                        console.log(e)
                    })
                }
            },
            ...mapMutations(['changeCurrentProduct'])
        },
        computed: {
            ...mapState(['token'])
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    @media screen and (min-width: 1201px)
        .new-arrivals-con
            width 1170px
        .new-arrival-item
            width 25%
    @media screen and (min-width: 992px) and (max-width: 1200px)
        .new-arrivals-con
            width 970px
        .new-arrival-item
            width 25%
    @media screen and (min-width: 768px) and (max-width: 991px)
        .new-arrivals-con
            width 750px
        .new-arrival-item
            width 33.3%
    @media screen and (max-width: 767px)
        .new-arrivals-con
            width 100%
            .arrivals-list
                display flex
                flex-direction column
                align-items center
                .single-new-arrival
                    width 270px
    .new-arrivals-con
        padding 2rem 0
        margin 0 auto
        .title
            font-size .6rem
            color $fontColor-name
            font-weight bold
            text-align center
        .arrivals-list
            margin-top 1.6rem
            .new-arrival-item
                height 8.8rem
                padding 0 .3rem
                box-sizing border-box
                display inline-block
                .arrival
                    width 100%
                    height 100%
                    .img-con
                        height 6.2rem
                        background-color $bgc_1
                        display flex
                        flex-direction row
                        justify-content center
                        align-items center
                        position relative
                        overflow hidden
                        .sale
                            width 1.2rem
                            height .6rem
                            line-height .6rem
                            text-align center
                            color #ffffff
                            font-weight bold
                            display block
                            background-color #d8924c
                            position absolute
                            top .2rem
                            right 0
                            z-index 20
                        img
                            max-width 60%
                            height auto
                            z-index 10
                            transition transform linear .3s
                        .img-con-hover-bg
                            width 0
                            height 0
                            background-color rgba(106,119,129,.1)
                            position absolute
                            z-index 5
                            transition width linear .3s, height linear .3s
                        .new-arrival-cart
                            width 100%
                            height .7rem
                            background-color #33383c
                            position absolute
                            bottom -10px
                            display flex
                            flex-direction row
                            justify-content space-between
                            align-items center
                            box-sizing border-box
                            padding 0 .4rem
                            opacity 0
                            z-index 20
                            transition opacity linear .3s, bottom linear .3s
                            cursor default
                            p
                                color #ffffff
                                line-height .7rem
                                .cart-btn
                                    line-height inherit
                                    background-color transparent
                                    color #ffffff
                                    cursor pointer
                                    margin-left .2rem
                                    font-size .2rem
                                .icons
                                    font-size .25rem
                                .love-icon
                                    cursor pointer
                                .full-screen-icon
                                    cursor pointer
                                    font-size .2rem
                                    margin-left .4rem
                        &:hover
                            img
                                transform scale(1.2, 1.2)
                                -ms-transform scale(1.2, 1.2); /* IE 9 */
                                -webkit-transform scale(1.2, 1.2); /* Safari and Chrome */
                            .img-con-hover-bg
                                width 100%
                                height 100%
                            .new-arrival-cart
                                opacity 1
                                bottom 0
                    .name
                        display block
                        text-align center
                        font-size .32rem
                        font-weight bold
                        color $fontColor-name
                        margin .52rem 0 .32rem
                        padding 0 20px
                        overflow hidden
                        white-space nowrap
                        text-overflow ellipsis
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