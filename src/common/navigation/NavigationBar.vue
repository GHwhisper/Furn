<template>
    <div class="navigator">
        <!--搜索框-->
        <transition name="search">
            <div class="search" v-show="showSearch">
                <div class="srh-container">
                    <span class="iconfont search-icon">&#xe718;</span>
                    <input class="search-input" type="text" placeholder="Search">
                    <span class="iconfont cancel-icon" @click="hideSearchBar">&#xe61a;</span>
                </div>
            </div>
        </transition>
        <!--导航栏-->
        <div class="nav-bar">
            <button class="iconfont nav-menu-btn" @click="toggleNav">&#xe60a;</button>
            <a href="" class="brand">Furn.</a>
<!--            <transition name="nav">-->
                <ul class="nav" :style="showNav ? inlineBlockStyle : ''">
                    <li class="nav-item"><a href="" class="active">Home</a></li>
                    <li class="nav-item"><a href="">New Arrival</a></li>
                    <li class="nav-item"><a href="">Features</a></li>
                    <li class="nav-item"><a href="">Blogs</a></li>
                    <li class="nav-item"><a href="">Contact</a></li>
                </ul>
<!--            </transition>-->
            <ul class="icons">
                <!--搜索-->
                <li class="icon-item" @click="toggleSearchBar"><a href="#" class="iconfont">&#xe643;</a></li>
                <!--设置-->
                <li class="icon-item"><a href="#" class="iconfont">&#xe624;</a></li>
                <!--购物车-->
                <li class="icon-item cart-li" @mouseover="showCartBar" @mouseleave="hideCartBar">
                    <a href="#" class="iconfont cart-icon">&#xe607;
                        <span class="cart-num">{{qtyCount}}</span>
                    </a>
                    <transition name="cart">
                        <ul class="cart" v-show="showCart">
                            <router-link tag="li" to="#" class="cart-item" v-for="(item, index) in cartList" :key="item.id">
                                <img :src="require(`../../assets/images/${item.img}`)" :alt="item.name">
                                <div class="info">
                                    <h6>{{item.name}}<br>{{item.type}}</h6>
                                    <p>{{item.num}}X - ￥{{singleCost(index)}}</p>
                                </div>
                                <span class="iconfont delete" @click="deleteCommodity(index)">&#xe619;</span>
                            </router-link>
                            <li class="total">
                                <span>Total: ￥{{totalCost}}</span>
                                <button class="btn">View Cart</button>
                            </li>
                        </ul>
                    </transition>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Navigation',
        props: {

        },
        data() {
            return {
                showCart: false,    //购物车
                showSearch: false,  //搜索框
                showNav: false, //下拉导航栏
                inlineBlockStyle: { //下拉导航栏内联inline-block
                    display: 'inline-block'
                },
                cartList: [
                    {
                        id: '0001',
                        name: 'Arm',
                        type: 'Chair',
                        img: 'a-chair.png',
                        num: 1,
                        price: 1800
                    },
                    {
                        id: '0002',
                        name: 'Single',
                        type: 'ArmChair',
                        img: 'b-chair.png',
                        num: 2,
                        price: 1800
                    },
                    {
                        id: '0003',
                        name: 'Wooden',
                        type: 'Chair',
                        img: 'c-chair.png',
                        num: 3,
                        price: 1800
                    }
                ],
            }
        },
        mounted() {

        },
        methods: {
            toggleSearchBar() { // 显示/隐藏搜索栏
                this.showSearch = !this.showSearch
            },
            hideSearchBar() {   // 隐藏搜索栏
                this.showSearch = false
            },
            showCartBar() {     // 显示购物车
                this.showCart = true
            },
            hideCartBar() {     // 隐藏购物车
                this.showCart = false
            },
            deleteCommodity(index) { // 删除商品
                this.cartList.splice(index, 1)
            },
            toggleNav() {   // 显示/隐藏max-width: 990px时的导航
                this.showNav = !this.showNav
            },
            singleCost(index) { // 购物车单种商品合计
                return this.cartList[index].num * this.cartList[index].price
            },
        },
        computed: {
            qtyCount() {   // 购物车商品数
                let count = 0
                this.cartList.forEach(item => {
                    count += item.num
                })
                return count
            },
            totalCost() {   // 购物车合计
                let total = 0
                this.cartList.forEach(item => {
                    total += item.num * item.price
                })
                return total
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import '~styles/varibles.styl'
    a
        color $fontColor
        font-size .5rem
        font-weight bolder
        text-transform capitalize
        transition .3s;
        -webkit-transition .3s; /* Safari */
    a.active
        color $activeColor
    li:hover a
        color $activeColor

    // 导航及搜索的宽度响应
    @media screen and (min-width: 1201px)
        .nav-bar
        .srh-container
            width 1170px
    @media screen and (min-width: 991px) and (max-width: 1200px)
        .nav-bar
        .srh-container
            width 970px
    @media screen and (min-width: 766px) and (max-width: 990px)
        .nav-bar
        .srh-container
            width 750px
    @media screen and (max-width: 765px)
        .nav-bar
            width 90%
        .srh-container
            width 95%
        .nav-menu-btn
        .nav
            position relative
            left -.2rem

    .navigator
        width 100%
        background-color $bgc_1
        position fixed
        top 0
        z-index: 1000
        .search
            height 1.2rem
            background-color: #333
            overflow hidden
            .srh-container
                height 100%
                color #ffffff
                box-sizing border-box
                padding-left .1rem
                padding-right .1rem
                margin 0 auto
                display flex
                flex-direction row
                justify-content space-between
                align-items center
                .search-icon
                    font-size .28rem
                    cursor default
                input
                    width 100%
                    height .8rem
                    color #ffffff
                    background-color: #333
                    padding-left .3rem
                    padding-right .3rem
                .cancel-icon
                    font-size .2rem
                    font-weight bold
                    cursor pointer
        .nav-bar
            height 2rem
            margin 0 auto
            text-align center
            vertical-align center
            position relative
            @media screen and (min-width: 991px)
                .nav-menu-btn
                    display none
                .brand
                    float left
            @media screen and (max-width: 990px)
                .nav-menu-btn
                    display inline-block
                    font-size .48rem
                    float left
                .brand
                    display inline-block
                    position absolute
                    left 50%
                    transform translateX(-50%)
            .nav-menu-btn
                color $activeColor
                background-color: transparent
                border .02rem solid $activeColor
                border-radius .08rem
                padding .25rem .15rem
                font-size .4rem
                position absolute
                top 50%
                transform translateY(-50%)
            .brand
                font-size .48rem
                font-family Roboto, sans-serif
                padding .76rem 0
            @media screen and (min-width: 1201px)
                .nav
                    display inline-block
                    li.nav-item
                        float left
                        padding .84rem .6rem
                        a
                            font-size .32rem
            @media screen and (min-width: 991px) and (max-width: 1200px)
                .nav
                    display inline-block
                    li.nav-item
                        float left
                        padding .84rem .2rem
                        a
                            font-size .32rem
            @media screen and (max-width: 990px)
                &
                    text-align left
                    box-sizing border-box
                    .nav
                        width 100%
                        display none
                        position absolute
                        top 2rem
                        background-color: #ffffff
                        padding 0 .2rem
                        li.nav-item
                            padding .3rem 0
                            a
                                font-size .3rem
            .icons
                float right
                display inline-block
                position relative
                right -.3rem
                li.icon-item
                    float left
                    padding .82rem .3rem
                    a
                        font-size .36rem
                        font-weight normal
                    a.cart-icon
                        position relative
                        span.cart-num
                            width .36rem
                            height .36rem
                            position absolute
                            top -50%
                            left 50%
                            line-height .36rem
                            font-size .24rem
                            text-align center
                            color #ffffff
                            background-color: $activeColor
                            border-radius 50%
                @media screen and (max-width: 765px)
                    li.icon-item
                        padding .82rem .15rem
                li.cart-li
                    position relative
                    ul.cart
                        width 5rem
                        max-height 5rem
                        border .01rem solid $border
                        background-color: #ffffff
                        position absolute
                        top 2rem
                        right 0
                        z-index 10
                        overflow-y auto
                        li.cart-item
                            padding .3rem
                            border-bottom .01rem solid $border
                            position relative
                            display flex
                            flex-direction row
                            align-items center
                            img
                                width 1rem
                                height 1rem
                            .info
                                margin-left .3rem
                                display inline-block
                                text-transform capitalize
                                line-height .4rem
                                text-align left
                                h6
                                    font-weight 600
                                    font-size .2rem
                                p
                                    font-size .24rem
                                    color #a09e9c
                            .delete
                                font-size .25rem
                                line-height 1
                                position absolute
                                top .3rem
                                right .3rem
                                cursor pointer
                        .total
                            padding .3rem
                            font-size .26rem
                            font-weight bold
                            border-bottom .01rem solid $border
                            display flex
                            flex-direction row
                            justify-content space-between
                            align-items center
                            .btn
                                width 1.5rem
                                height .6rem
                                color #ffffff
                                background-color: $activeColor
                                border-radius .06rem
                    // 设置滚动条样式
                    .cart::-webkit-scrollbar    /*滚动条整体样式*/
                        width 5px               /*高宽分别对应横竖滚动条的尺寸*/
                    .cart::-webkit-scrollbar-thumb  /*滚动条里面小方块*/
                        border-radius 5px
                        -webkit-box-shadow inset 0 0 5px rgba(0, 0, 0, 0.2)
                        background-color: $activeColor
                    .cart::-webkit-scrollbar-track  /*滚动条里面轨道*/
                        -webkit-box-shadow inset 0 0 5px rgba(0, 0, 0, 0.2)
                        border-radius 0
                        background rgba(0, 0, 0, .6)
    //// 下拉导航栏入场动画
    //@keyframes nav-in
    //{
    //    0% {
    //        height 0
    //    }
    //    100% {
    //        height 4.5rem
    //    }
    //}
    //.nav-enter-active
    //    animation nav-in linear .1s
    //.nav-leave-to
    //    animation nav-in linear .1s reverse
    // 搜索栏入场动画
    @keyframes search-in
    {
        0% {
            height 0
        }
        100% {
            height 1.2rem
        }
    }
    .search-enter-active
        animation search-in linear .3s
    .search-leave-to
        animation search-in linear .3s reverse
    // 购物车入场动画
    @keyframes cart-in
    {
        0% {
            opacity 0
            top 1.5rem
        }
        100% {
            opacity: 1
            top 2rem
        }
    }
    .cart-enter-active
        animation cart-in linear .5s
    .cart-leave-to
        animation cart-in linear .5s reverse
</style>