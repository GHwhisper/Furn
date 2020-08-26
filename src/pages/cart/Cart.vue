<template>
    <el-container>
        <el-header height="100px">
            <el-row type="flex" justify="center">
                <el-col :xs="24" :sm="20" :md="18" :lg="16" :xl="16">
                    <div>
                        <span class="brand"><router-link to="/">Furn.</router-link></span>
                        <span class="login-welcome">购物车</span>
                    </div>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <el-row type="flex" justify="center">
                <el-col :xs="24" :sm="20" :md="18" :lg="16" :xl="16">
                    <em class="all-products">全部商品 3</em>
                    <div class="cart-thead">
                        <el-checkbox v-model="checkAll">全选</el-checkbox>
                        <span>商品</span>
                        <span>单价</span>
                        <span>数量</span>
                        <span>小计</span>
                        <span>操作</span>
                    </div>
                    <el-checkbox-group>
                        <el-checkbox class="product-item">

                        </el-checkbox>
                    </el-checkbox-group>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: '',
        props: {

        },
        data() {
            return {
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
                checkAll: false
            }
        },
        methods: {

        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .el-header
        padding 0
        .el-row
            height 100%
            position relative
            div
                position absolute
                bottom 10px
            .brand
                a
                    color $activeColor
                    font-size .8rem
            .login-welcome
                color $fontColor
                font-size .5rem
                margin-left 10px
    .el-main
        padding 0
        .all-products
            font-size .36rem
            color $activeColor
            border-bottom 1px solid $activeColor
        .cart-thead
            height .8rem
            display flex
            flex-direction row
            justify-content space-between
            align-items center
            background-color $bgc_1
            padding 0 .2rem
</style>