<template>
    <div :class="top <=100 ? 'navigator' : 'navigator narrow-navigator'">
        <!--搜索框-->
        <transition name="search">
            <div class="search" v-show="showSearch">
                <div class="srh-container">
                    <span class="iconfont search-icon">&#xe718;</span>
                    <input class="search-input" type="search" placeholder="搜索" v-model="srchContent" @keyup.enter="handleSrch">
                    <span class="iconfont cancel-icon" @click="hideSearchBar">&#xe61a;</span>
                </div>
            </div>
        </transition>
        <!--导航栏-->
        <div :class="top <= 100 ? 'nav-bar' : 'nav-bar narrow-nav-bar'">
            <button class="iconfont nav-menu-btn" @click="toggleNav">&#xe60a;</button>
            <a href="/" class="brand">悦家</a>
            <ul class="nav" :style="showNav ? inlineBlockStyle : ''">
                <li @click="toggleNav" class="nav-item"><router-link to="/">主页</router-link></li>
                <li @click="toggleNav" class="nav-item"><router-link to="/#newarr">新品推荐</router-link></li>
                <li @click="toggleNav" class="nav-item"><router-link to="/#collection">珍品收藏</router-link></li>
                <li @click="toggleNav" class="nav-item"><router-link to="/#feature">独家特色</router-link></li>
                <li @click="toggleNav" class="nav-item"><router-link to="/category">更多家具</router-link></li>
            </ul>
            <ul class="icons">
                <!--搜索-->
                <li class="icon-item" @click="toggleSearchBar"><a href="#" class="iconfont">&#xe643;</a></li>
                <!--用户-->
                <li class="icon-item" v-if="!token">
                    <router-link to="/login" class="iconfont">&#xe658;</router-link>
                </li>
                <li class="icon-item" v-else>
                    <el-dropdown trigger="hover">
                        <el-avatar :src="userInfo.avatarUrl" icon="el-icon-user-solid" size="small" @click.native="goPage('/personal')"></el-avatar>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="goPage('/personal')">个人中心</el-dropdown-item>
                            <el-dropdown-item @click.native="goPage('/order/all')">订单中心</el-dropdown-item>
                            <el-dropdown-item @click.native="goPage('/setup/info')">账号设置</el-dropdown-item>
                            <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </li>
                <!--购物车-->
                <li class="icon-item cart-li" @mouseover="showCartBar" @mouseleave="hideCartBar">
                    <router-link to="/cart" class="iconfont cart-icon">&#xe607;
                        <span class="cart-num">{{qtyCount}}</span>
                    </router-link>
                    <transition name="cart">
                        <ul class="cart" v-show="showCart">
                            <router-link tag="li" :to="{path: `/product/detail/${item.productId}`, query: {skuid: item.id}}" @click="this.showCart = false" class="cart-item" v-for="(item, index) in cartList" :key="item.shoppingCartId">
                                <img :src="item.img" :alt="item.name">
                                <div class="info">
                                    <h6>{{item.name}}</h6>
                                    <p>{{item.num}}X - ￥{{singleCost(index).toFixed(2)}}</p>
                                </div>
                                <span class="iconfont delete" @click.prevent="deleteCommodity(item.shoppingCartId)">&#xe619;</span>
                            </router-link>
                            <li v-if="cartList.length === 0" class="none-tips">购物车空空如野~</li>
                            <li class="total">
                                <span>合计： ￥{{totalCost.toFixed(2)}}</span>
                                <button class="btn" @click="toMyCart">我的购物车</button>
                            </li>
                        </ul>
                    </transition>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import { mapState, mapMutations } from 'vuex'
    export default {
        name: 'Navigation',
        props: {

        },
        data() {
            return {
                srchContent: '',    //搜索内容
                showCart: false,    //购物车
                showSearch: false,  //搜索框
                showNav: false,     //下拉导航栏
                inlineBlockStyle: { //下拉导航栏内联inline-block
                    display: 'inline-block'
                },
                cartList: [],
                top: 0,  // 滚动距离
                userInfo: {}
            }
        },
        created() {
            this.bus.$on('updateCart', this.getCartInfo)
        },
        mounted() {
            if(this.token) {     // 登录状态才请求数据，非登录状态用户可先正常浏览
                this.getUserInfo()
                this.getCartInfo()
            }
        },
        methods: {
            async getUserInfo() {
                if(this.token) {
                    try {
                        let res = await axios.get('/api/userInfo')
                        this.userInfo = res.data
                    } catch (e) {
                        this.removeLoginInfo()
                        this.$router.replace('/')
                    }
                }
            },
            async getCartInfo() {   // 购物车信息
                if(this.token) {
                    try {
                        let res = await axios.get('/api/showShoppingCat')
                        this.cartList = res.data
                    } catch (e) {
                        this.removeLoginInfo()
                        this.$router.replace('/')
                    }
                }
            },
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
            deleteCommodity(id) { // 删除商品
                this.$confirm('确认删除该商品吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.post('/api/deleteShoppingCat', {
                        shoppingCatIds: [id]
                    }).then(res => {
                        let data = res.data
                        if(data.deleteStatus === true) {
                            this.getCartInfo()
                        } else {
                            this.$message({showClose: true, message: '删除失败', type: 'error', duration: 1500})
                        }
                    }).catch(() => {this.$message({showClose: true, message: '删除失败', type: 'error', duration: 1500})})
                }).catch(() => {})
            },
            toggleNav() {   // 显示/隐藏max-width: 991px时的导航
                this.showNav = !this.showNav
            },
            singleCost(index) { // 购物车单种商品合计
                return this.cartList[index].num * this.cartList[index].price
            },
            handleScroll() {
                this.top = document.documentElement.scrollTop  || document.body.scrollTop
            },
            toMyCart() {
                this.$router.push({path: '/cart'})
            },
            handleSrch() {  // 搜索
                if(this.srchContent !== '') {
                    this.$router.push({
                        path: '/list',
                        query: { srch: this.srchContent }
                    })
                    this.srchContent = ''
                }
            },
            goPage(url) {
                this.$router.push({path: url})
            },
            async logOut() {  // 退出登录
                let res = await axios.get('/api/loginOut')
                if(res.data.status === true) {
                    this.removeLoginInfo()
                    this.goPage('/login')
                }
            },
            ...mapMutations(['removeLoginInfo'])
        },
        computed: {
            ...mapState(['token']),
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
        },
        watch: {
            token() {   // 监听到token变化，说明是用户登录了或切换了用户
                this.getUserInfo()
                this.getCartInfo()
            }
        },
        activated() {
            window.addEventListener('scroll', this.handleScroll)
        },
        deactivated() {
            window.removeEventListener('scroll', this.handleScroll)
        },
    }
</script>

<style lang="stylus" scoped>
    @import '~styles/varibles.styl'
    .el-dropdown
        padding 0 10px
        font-size .34rem
        cursor default
        &:hover
            color $activeColor
        .el-icon-arrow-down
            font-size .28rem
            color $fontColor_intro
    .el-dropdown-menu__item:hover
        color $activeColor
        background-color transparent
    // 导航及搜索的宽度响应
    @media screen and (min-width: 1201px)
        .nav-bar
        .srh-container
            width 1170px
    @media screen and (min-width: 992px) and (max-width: 1200px)
        .nav-bar
        .srh-container
            width 970px
    @media screen and (min-width: 768px) and (max-width: 991px)
        .nav-bar
        .srh-container
            width 750px
    @media screen and (max-width: 767px)
        .nav-bar
        .srh-container
            width 95%
    a
        color $fontColor
        font-size .5rem
        font-weight bolder
        text-transform capitalize
        transition .3s
        -webkit-transition .3s /* Safari */
    a.active
        color $activeColor
    li:hover a
        color $activeColor
    .navigator
        width 100%
        background-color $bgc_1
        position fixed
        top 0
        z-index 1000
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
            @media screen and (min-width: 992px)
                .nav-menu-btn
                    display none
                .brand
                    float left
            @media screen and (max-width: 991px)
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
                border 1px solid $activeColor
                border-radius 4px
                padding .25rem .15rem
                font-size .4rem
                position absolute
                top .4rem
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
                        transition padding linear .2s
                        a
                            font-size .32rem
            @media screen and (min-width: 992px) and (max-width: 1200px)
                .nav
                    display inline-block
                    li.nav-item
                        float left
                        padding .84rem .2rem
                        transition padding linear .2s
                        a
                            font-size .32rem
            @media screen and (max-width: 991px)
                &
                    text-align left
                    box-sizing border-box
                    .nav
                        width 100%
                        display none
                        position absolute
                        top 1.6rem
                        background-color: #ffffff
                        box-sizing border-box
                        padding 0 .2rem
                        box-shadow 0 2px 5px rgba(0, 0, 0, .2)
                        li.nav-item
                            padding .3rem 0
                            transition padding linear .2s
                            a
                                font-size .3rem
            .icons
                float right
                display inline-block
                position relative
                left .3rem
                li.icon-item
                    float left
                    padding .82rem .3rem
                    a
                        font-size .36rem
                        font-weight normal
                    .el-dropdown
                        position relative
                        top -5px
                        .el-avatar
                            cursor pointer
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
                @media screen and (max-width: 767px)
                    &
                        left 0
                        li.icon-item
                            padding .82rem .15rem
                li.cart-li
                    position relative
                    ul.cart
                        width 5rem
                        max-height 5rem
                        border 1px solid $border
                        background-color: #ffffff
                        position absolute
                        top 1.6rem
                        right 0
                        z-index 10
                        overflow-y auto
                        li.cart-item
                            padding .3rem
                            border-bottom 1px solid $border
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
                                    width 100px
                                    font-weight 600
                                    font-size .2rem
                                    display -webkit-box
                                    -webkit-box-orient vertical
                                    -webkit-line-clamp 2
                                    overflow hidden
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
                        li.none-tips
                            height 100px
                            line-height 100px
                            color $fontColor_intro
                            font-size .26rem
                            text-align center
                        .total
                            padding .3rem
                            font-size .26rem
                            font-weight bold
                            border-bottom 1px solid $border
                            display flex
                            flex-direction row
                            justify-content space-between
                            align-items center
                            .btn
                                width 1.5rem
                                height .6rem
                                color #ffffff
                                background-color: $activeColor
                                border-radius 3px
                                cursor pointer
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
    // 页面滚动后的导航栏
    .narrow-navigator
        background: #ffffff
        box-shadow 0 2px 5px rgba(0, 0, 0, .2)
        // 页面滚动后的导航栏中各选项
        .narrow-nav-bar
            height 1.6rem !important
            .brand
                padding .76rem 0 .36rem !important
            @media screen and (max-width: 991px)
                .nav
                    padding .5rem .2rem
            li.nav-item
                padding .64rem .6rem !important
            @media screen and (min-width: 768px)
                li.icon-item
                    padding .82rem .3rem .42rem !important
            @media screen and (max-width: 767px)
                li.icon-item
                    padding .82rem .15rem .42rem !important
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
            top 1.2rem
        }
        100% {
            opacity: 1
            top 1.6rem
        }
    }
    .cart-enter-active
        animation cart-in linear .5s
    .cart-leave-to
        animation cart-in linear .5s reverse
</style>