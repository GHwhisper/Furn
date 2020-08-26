<template>
    <div class="product-item" v-loading.fullscreen.lock="fullscreenLoading">
        <router-link tag="div" :to="{path: `/product/detail/${product.productId}`, query: {skuid: product.id}}" class="img-con">
            <img :src="product.img" alt="">
        </router-link>
        <div class="info-con">
            <div class="price">
                ￥<strong>{{product.price.toFixed(2)}}</strong>
                <i class="iconfont icon-aixin-yixuanzhong sc-icon" @click="cancelCollect" />
            </div>
            <router-link :to="{path: `/product/detail/${product.productId}`, query: {skuid: product.id}}" class="name">{{product.name}}</router-link>
            <div class="props">
                <span class="color">{{product.color}}</span>
                <span class="size">{{product.size}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'CollectionItem',
        props: {
            product: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                fullscreenLoading: false
            }
        },
        methods: {
            cancelCollect() {
                this.$confirm('确定将该商品从您的收藏中移除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.fullscreenLoading = true
                    axios.post('/api/deleteFavorite', {
                        favoriteId: this.product.favoriteId
                    }).then(res => {
                        let data = res.data
                        if(data.deleteStatus === 200) {
                            this.$message({showClose: true, message: '已取消收藏', type: 'success', duration: 1500})
                            this.$router.go(0)
                        } else if(data.deleteStatus === 405) {
                            this.$message({showClose: true, message: '取消收藏失败，请重试', type: 'warning', duration: 1500})
                        }
                        this.fullscreenLoading = false
                    }).catch(e => {
                        console.log(e)
                        this.fullscreenLoading = false
                    })
                }).catch(() => {})
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .product-item
        width 25%
        padding 0 15px
        box-sizing border-box
        display inline-block
        margin-bottom 30px
        .img-con
            width 100%
            height 0
            padding-top @width
            position relative
            overflow hidden
            cursor pointer
            img
                width 100%
                height 100%
                position absolute
                top 0
                left 0
                background-color $bgc_1
            &::after
                width 100%
                height 100%
                content ""
                position absolute
                top 0
                right 0
                bottom 0
                left 0
                background-color rgba(0, 0, 0, .2)
                z-index 10
                visibility hidden
                opacity 0
                transition all ease-in-out .3s
            &:hover
                img
                    transform scale(1.1)
                    transition transform ease .3s
                &::after
                    visibility visible
                    opacity 1
        .info-con
            width 100%
            height 80px
            padding 10px 0
            .price
                font-size .32rem
                margin-bottom 5px
                color $activeColor
                strong
                    font-size .4rem
                .sc-icon
                    float right
                    color red
                    font-size .36rem
                    cursor pointer
            .name
                font-size .3rem
                color $fontColor-name
                display -webkit-box
                -webkit-box-orient vertical
                -webkit-line-clamp 1
                overflow hidden
                &:hover
                    color $activeColor
            .props
                margin-top 5px
                color $fontColor_intro
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
                .color
                    margin-right 8px
    @media screen and (min-width: 768px) and (max-width: 991px)
        .product-item
            width 33.33%
    @media screen and (max-width: 767px)
        .product-item
            width 50%
</style>