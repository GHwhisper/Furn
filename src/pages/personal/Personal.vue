<template>
    <el-container v-if="show" direction="vertical" v-loading.fullscreen.lock="fullscreenLoading">
        <page-header>
            <template #name>个人中心</template>
            <template #middle><head-drop-downs /></template>
            <template #right><search /></template>
        </page-header>
        <double-row-layout>
            <template #left><personal-menu /></template>
            <template #right>
                <div class="boxes">
                    <div class="box-0">
                        <div class="box-0-left">
                            <router-link to="/setup/info" class="avatar"><img :src="userInfo.avatarUrl ? userInfo.avatarUrl : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"></router-link>
                            <router-link to="/setup/info" class="username">{{userInfo.nickName ? userInfo.nickName : userInfo.username}}</router-link>
                        </div>
                        <div class="box-0-right">
                            <div class="box-name">我的资产</div>
                            <ul>
                                <li>
                                    <div class="num">{{orderNumber}}</div>
                                    <div class="name">订单</div>
                                    <div class="operate"><router-link to="/order/all">查看</router-link></div>
                                </li>
                                <li>
                                    <div class="num">{{orderList.length}}</div>
                                    <div class="name">待收</div>
                                    <div class="operate"><router-link to="/order/tobereceived">查看</router-link></div>
                                </li>
                                <li>
                                    <div class="num">{{favoriteNumber}}</div>
                                    <div class="name">收藏</div>
                                    <div class="operate"><router-link to="/collection">查看</router-link></div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="box-1">
                        <div class="box-name">我的订单<router-link to="/order/all">全部订单<i class="el-icon-d-arrow-right" /></router-link></div>
                        <div class="order-nav">
                            <router-link to="/order/unpaid"><i class="el-icon-wallet" /><span>待付款</span></router-link>
                            <router-link to="/order/tobeshipped"><i class="el-icon-box" /><span>待发货</span></router-link>
                            <router-link to="/order/tobereceived"><i class="el-icon-truck" /><span>待收货</span></router-link>
                            <router-link to="/order/tobeevaluated"><i class="el-icon-chat-line-square" /><span>待评价</span></router-link>
<!--                            <router-link to=""><i class="el-icon-service" /><span>退换/售后</span></router-link>-->
                        </div>
                        <div v-if="orderList.length === 0" class="empty">
                            <i class="el-icon-shopping-cart-1" />
                            购物车空空如野，快去挑选心仪的商品吧~
                        </div>
                        <div v-else class="order-con">
                            <div class="order-item" v-for="item in orderList" :key="item.orderId">
                                <div class="img-con"><img :src="item.products[0].img" alt=""></div>
                                <div class="right-con">
                                    <div class="info">
                                        <router-link :to="'/order/detail/' + item.orderId">订单编号：{{item.orderId}}</router-link>
                                        <div class="status"><span>{{item.time}}</span><span>{{item.orderStatusName}}</span></div>
                                    </div>
                                    <el-button type="warning" plain @click="shouhuo(item.orderId)">确认收货</el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="box-2">
                        <div class="box-name">买什么<span>为您推荐</span></div>
                        <div class="recommend" v-if="recommendList.length !== 0">
                            <template v-for="item in recommendList">
                                <product-item class="product-item" :product="item" :key="item.id" />
                            </template>
                        </div>
                        <div v-else class="none-tips">暂无推荐商品~</div>
                    </div>
                    <div v-if="showBox3" class="box-3">
                        <div class="box-name">我的收藏</div>
                        <div v-if="collectionList.length === 0" class="empty">暂无收藏的商品~</div>
                        <div v-else class="collection-con">
                            <div class="item-con" v-for="item in collectionList" :key="item.id">
                                <div class="colletion-item">
                                    <router-link :to="{path: `/product/detail/${item.productId}`, query: {skuid: item.id}}">
                                        <img :src="item.img" alt="">
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </double-row-layout>
    </el-container>
    <!--移动端start-->
    <el-container v-else direction="vertical">
        <div class="p-header">
            <div class="p-user-info">
                <el-avatar :size="60" :src="userInfo.avatarUrl" :key="userInfo.avatarUrl" icon="el-icon-user-solid" />
                <div class="p-nick-name">{{userInfo.nickName ? userInfo.nickName : userInfo.username}}</div>
            </div>
        </div>
        <div class="p-main-con">
            <section class="p-box p-box-0">
                <h2 class="p-box-name">我的订单<router-link to="/order/all">查看全部<i class="el-icon-arrow-right" /></router-link></h2>
                <div class="p-nav">
                    <router-link to="/order/unpaid"><i class="el-icon-wallet" /><span>待付款</span></router-link>
                    <router-link to="/order/tobeshipped"><i class="el-icon-box" /><span>待发货</span></router-link>
                    <router-link to="/order/tobereceived"><i class="el-icon-truck" /><span>待收货</span></router-link>
                    <router-link to="/order/tobeevaluated"><i class="el-icon-chat-line-square" /><span>待评价</span></router-link>
<!--                    <router-link to=""><i class="el-icon-service" /><span>售后</span></router-link>-->
                </div>
            </section>
            <section class="p-box p-box-1">
                <h2 class="p-box-name">我的资产</h2>
                <div class="p-nav">
                    <router-link to="/order/all"><strong>{{orderNumber}}</strong><span>订单</span></router-link>
                    <router-link to="/order/tobereceived"><strong>{{orderList.length}}</strong><span>待收</span></router-link>
                    <router-link to="/collection"><strong>{{favoriteNumber}}</strong><span>收藏</span></router-link>
                </div>
            </section>
            <section class="p-box p-box-2">
                <h2 class="p-box-name">我的服务</h2>
                <div class="p-nav p-wrap-con">
                    <router-link to="/setup/info"><i class="el-icon-user" /><span>个人信息</span></router-link>
                    <router-link to="/security"><i class="el-icon-unlock" /><span>账户安全</span></router-link>
                    <router-link to="/collection"><i class="el-icon-collection" /><span>收藏商品</span></router-link>
                    <router-link to="/address"><i class="el-icon-map-location" /><span>地址管理</span></router-link>
<!--                    <router-link to=""><i class="el-icon-document" /><span>账单明细</span></router-link>-->
<!--                    <router-link to=""><i class="el-icon-notebook-2" /><span>浏览记录</span></router-link>-->
<!--                    <router-link to=""><i class="el-icon-goods" /><span>选购推荐</span></router-link>-->
<!--                    <router-link to=""><i class="el-icon-chat-line-round" /><span>意见建议</span></router-link>-->
                </div>
            </section>
            <section class="p-box p-box-3">
                <el-button type="warning" class="logout-btn" @click="logout">{{token ? '退出登录' : '登录'}}</el-button>
            </section>
        </div>
        <nav-tab-bar />
    </el-container>
    <!--移动端end-->
</template>

<script>
    import PageHeader from 'common/header/PageHeader'
    import HeadDropDowns from 'common/dropdown/HeadDropDowns'
    import Search from 'common/search/Search'
    import NavTabBar from 'common/navtab/NavTabBar'
    import PersonalMenu from 'common/sidebar/PersonalMenu'
    import DoubleRowLayout from 'common/layout/DoubleRowLayout'
    import ProductItem from 'common/productitem/ProductItem'
    import axios from 'axios'
    import { mapState, mapMutations } from 'vuex'
    export default {
        name: 'Personal',
        components: {
            PageHeader,
            HeadDropDowns,
            Search,
            NavTabBar,
            PersonalMenu,
            DoubleRowLayout,
            ProductItem
        },
        data() {
            return {
                userInfo: {},   // 用户信息
                orderNumber: 0,
                favoriteNumber: 0,
                orderList: [],  // 订单列表
                collectionList: [], // 商品收藏
                recommendList: [],  // 推荐商品
                show: true,     // 控制电脑端/手机端页面显隐
                showBox3: true,
                screenWidth: window.innerWidth, //浏览器宽度
                fullscreenLoading: false
            }
        },
        mounted() {
            window.onresize = ()=> {
                return (()=> {
                    this.screenWidth = window.innerWidth
                })()
            }
            this.initScreen()
            this.getPersonalInfo()
        },
        methods: {
            async getPersonalInfo() {
                try {
                    this.fullscreenLoading = true
                    let res = await axios.get('/api/showUser')
                    let data = res.data
                    this.userInfo = data.userInfo
                    this.orderNumber = data.orderNumber
                    this.favoriteNumber = data.favoriteNumber
                    this.orderList = data.orderList
                    this.collectionList = data.collection
                    this.recommendList = data.recommend
                    this.fullscreenLoading = false
                } catch (e) {
                    this.fullscreenLoading = false
                }
            },
            shouhuo(ordeId) {   // 确认收货
                this.$confirm('确认收货吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.fullscreenLoading = true
                    axios.post('/api/confirm', {
                        orderId: ordeId
                    }).then((res) => {
                        this.fullscreenLoading = false
                        let data = res.data
                        if(data.updateStatus === 200) {
                            this.$message({showClose: true, message: '确认收货成功', type: 'success', duration: 1500})
                            this.getPersonalInfo()
                        } else if(data.updateStatus === 405) {
                            this.$message({showClose: true, message: '确认收货失败', type: 'error', duration: 1500})
                        }
                    }).catch(() => {
                        this.fullscreenLoading = false
                        this.$message({showClose: true, message: '确认收货失败', type: 'error', duration: 1500})
                    })
                }).catch(() => {})
            },
            initScreen() {
                let sw = this.screenWidth
                this.show = sw >= 768
                this.showBox3 = sw >= 992
            },
            async logout() {  // 退出登录
                try {
                    let res = await axios.get('/api/loginOut')
                    if(res.data.status === true) {
                        this.removeLoginInfo()
                        this.$router.push('/login')
                    }
                } catch (e) { console.log(e) }
            },
            notOpen() {
                this.$message({showClose: true,message: '暂未开放',duration: 1500})
            },
            ...mapMutations(['removeLoginInfo'])
        },
        watch: {
            screenWidth(val) {
                this.screenWidth = val
                this.initScreen()
            }
        },
        computed: {
            ...mapState(['token'])
        },
        activated() {
            if(this.token) {
                this.getPersonalInfo()
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .boxes
        position relative
        margin-bottom 100px
        .box-name
            height 60px
            font-size .3rem
            line-height 60px
            padding 0 30px
            border-bottom 1px solid $border
            box-sizing border-box
        .box-0
            width 100%
            height 250px
            padding 20px 0
            .box-0-left
                width 250px
                height @width
                background-color $activeColor
                display flex
                flex-direction column
                justify-content center
                align-items center
                float left
                box-shadow $shadow_1
                .avatar
                    width 100px
                    height @width
                    display inline-block
                    border-radius 50%
                    overflow hidden
                    border 5px solid #ffffff
                    box-shadow $shadow_2
                    img
                        width 100px
                        height @width
                .username
                    color #ffffff
                    font-size .36rem
                    font-weight 600
                    margin-top 20px
            .box-0-right
                height 100%
                margin-left 250px
                background-color #ffffff
                padding 10px 0
                box-sizing border-box
                background-clip content-box
                .box-name
                    height 60px
                    font-size .3rem
                    line-height 60px
                    padding 0 30px
                    border-bottom 1px solid $border
                    box-sizing border-box
                ul
                    height 170px
                    padding 30px 30px
                    box-sizing border-box
                    display flex
                    flex-direction row
                    justify-content space-between
                    li
                        display flex
                        flex-direction column
                        justify-content space-between
                        .num
                            font-size .5rem
                            font-weight 600
                        .name
                            font-size .26rem
                        .operate
                            margin-top 25px
                            a
                                font-size .26rem
                                color $activeColor
                                &:hover
                                    color $activeColor_2
        .box-1
            width 70%
            background-color #ffffff
            .box-name a
                float right
                cursor pointer
                color $fontColor_intro
            .order-nav
                padding 15px 30px
                display flex
                flex-direction row
                justify-content space-between
                a
                    width 80px
                    height @width
                    display flex
                    flex-direction column
                    justify-content center
                    align-items center
                    color #333333
                    transition all .3s ease
                    i
                        font-size .8rem
                        transition all .3s ease
                    span
                        font-size .24rem
                        margin-top 5px
                    &:hover
                        box-shadow $shadow_1
                    &:hover i
                        color $activeColor
            .empty
                font-size .26rem
                color $fontColor-del
                display flex
                justify-content center
                align-items center
                padding 60px 0 90px
                i
                    font-size 1.5rem
                    margin-right 10px
            .order-con
                padding-bottom 20px
                .order-item
                    padding 10px 30px
                    display flex
                    flex-direction row
                    .img-con
                        width 80px
                        height @width
                        flex-shrink 0
                        margin-right 20px
                        img
                            width 100%
                            height 100%
                    .right-con
                        width 100%
                        display flex
                        flex-direction row
                        justify-content space-between
                        .info
                            height 100%
                            display flex
                            flex-direction column
                            justify-content center
                            a
                                color #333333
                            .status
                                line-height 40px
                                color $fontColor_intro
                                span
                                    margin-right 10px
                        .el-button
                            padding 10px
                            height 40px
        .box-2
            width 70%
            background-color #ffffff
            margin 20px 0
            .box-name span
                font-size .24rem
                color $fontColor_intro
                margin-left 10px
            .recommend
                width 100%
                padding-top 20px
                .product-item
                    margin 0
            .none-tips
                height 150px
                line-height 150px
                font-size .26rem
                text-align center
                color $fontColor_intro
        .box-3
            width calc(30% - 20px)
            min-height 500px
            position absolute
            top 290px
            right 0
            background-color #ffffff
            .empty
                padding 150px 0
                text-align center
                color $fontColor-del
                font-size .26rem
            .collection-con
                padding 20px 10px
                .item-con
                    width 50%
                    padding 0 10px
                    box-sizing border-box
                    display inline-block
                    margin-bottom 20px
                    .colletion-item
                        width 100%
                        height 0
                        padding-top @width
                        overflow hidden
                        position relative
                        img
                            width 100%
                            height 100%
                            position absolute
                            top 0
                            transition transform .3s ease
                            &:hover
                                transform scale(1.2)
    @media screen and (min-width: 768px) and (max-width: 991px)
        .boxes
            .box-1
            .box-2
                width 100%
    @media screen and (max-width: 767px)
        .el-container
            padding-bottom 50px
        .p-header
            width 100%
            background-color $activeColor
            padding 15px 0 30px
            box-sizing border-box
            box-shadow $shadow_1
            z-index 100
            .p-user-info
                padding 15px
                display flex
                flex-direction row
                align-items center
                .el-avatar
                    margin-right 15px
                    box-shadow $shadow_2
                .p-nick-name
                    display inline-block
                    font-size .34rem
                    color #ffffff
                    text-shadow 2px 2px 5px #333333
        .p-main-con
            padding 15px
            background-color $bgc_1
            .p-box
                background-color #ffffff
                border-radius 5px
                box-shadow $shadow_3
                &:not(:last-child)
                    margin-bottom 15px
                .p-box-name
                    padding 15px 15px 5px
                    font-size .3rem
                    font-weight 600
                    a
                        float right
                        font-size .26rem
                        font-weight normal
                        color $fontColor_intro
                        i
                            margin-left 3px
                .p-nav
                    display flex
                    justify-content space-between
                    padding 15px
                    a
                        display flex
                        flex-direction column
                        align-items center
                        span
                            font-size .26rem
                            margin-top 5px
                            color #666666
            .p-box-0 .p-nav a
                i
                    font-size .54rem
                    color $activeColor
            .p-box-1 .p-nav a
                strong
                    font-size .4rem
                    font-weight 600
                    color #333333
            .p-box-2 .p-nav.p-wrap-con
                /*flex-wrap wrap*/
                /*justify-content flex-start*/
                a
                    /*width 25%*/
                    /*margin-bottom 15px*/
                    i
                        font-size .54rem
                        color $activeColor
            .p-box-3
                margin-top 30px
                margin-bottom 30px
                .logout-btn
                    width 100%
</style>