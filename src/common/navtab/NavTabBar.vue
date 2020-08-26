<template>
    <ul class="nav-con">
        <router-link tag="li" to="/" class="nav-item">
            <svg class="icon" aria-hidden="true"><use xlink:href="#icon-zhuye"></use></svg>
            <span class="name">首页</span>
        </router-link>
        <router-link tag="li" to="/category" class="nav-item">
            <svg class="icon" aria-hidden="true"><use xlink:href="#icon-fenlei4"></use></svg>
            <span class="name">分类</span>
        </router-link>
<!--        <router-link tag="li" to="" class="nav-item">-->
<!--            <svg class="icon" aria-hidden="true"><use xlink:href="#icon-jingxuan"></use></svg>-->
<!--            <span class="name">精选</span>-->
<!--        </router-link>-->
        <router-link tag="li" to="/cart" class="nav-item">
            <svg class="icon" aria-hidden="true"><use xlink:href="#icon-gouwuche"></use></svg>
            <span class="name">购物车</span>
        </router-link>
        <router-link tag="li" to="/personal" class="nav-item">
            <svg class="icon" aria-hidden="true"><use xlink:href="#icon-gerenzhongxin"></use></svg>
            <span class="name">我的</span>
        </router-link>
    </ul>
</template>

<script>
    export default {
        name: 'NavTabBar'
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .icon
        width 20px
        height 20px
        fill currentColor
        overflow hidden
    .nav-con
        width 100%
        height 50px
        padding 5px 15px
        box-sizing border-box
        background-color #ffffff
        box-shadow $shadow_1
        position fixed
        bottom 0
        display flex
        flex-direction row
        justify-content space-between
        align-items center
        z-index 10000
        .nav-item
            display flex
            flex-direction column
            justify-content center
            align-items center
            span
                font-size .22rem
                margin-top 2px
</style>