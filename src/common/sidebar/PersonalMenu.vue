<template>
    <el-menu :default-openeds="openeds" router :default-active="$route.path">
        <el-submenu index="0">
            <template slot="title">个人中心</template>
            <el-menu-item index="/personal">我的主页</el-menu-item>
        </el-submenu>
        <el-submenu index="1">
            <template slot="title">订单中心</template>
            <el-menu-item index='/order/all'>我的订单</el-menu-item>
            <el-menu-item index="/order/tobeevaluated">评价晒单</el-menu-item>
        </el-submenu>
<!--        <el-submenu index="2">-->
<!--            <template slot="title">我的钱包</template>-->
<!--            <el-menu-item index="2-1">余额</el-menu-item>-->
<!--            <el-menu-item index="2-2">红包</el-menu-item>-->
<!--            <el-menu-item index="2-3">优惠券</el-menu-item>-->
<!--            <el-menu-item index="2-4">账单明细</el-menu-item>-->
<!--        </el-submenu>-->
        <el-submenu index="3">
            <template slot="title">我的关注</template>
            <el-menu-item index="/collection">商品收藏</el-menu-item>
<!--            <el-menu-item index="/history">浏览记录</el-menu-item>-->
        </el-submenu>
<!--        <el-submenu index="4">-->
<!--            <template slot="title">客户服务</template>-->
<!--            <el-menu-item index="/service">售后服务</el-menu-item>-->
<!--&lt;!&ndash;            <el-menu-item index="4-1">意见建议</el-menu-item>&ndash;&gt;-->
<!--        </el-submenu>-->
    </el-menu>
</template>

<script>
    export default {
        name: 'PersonalMenu',
        data() {
            return {
                openeds: ['0', '1', '2', '3', '4'],  // 默认打开展开的submenu
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .el-menu >>> .el-submenu__title
        font-weight 600
    .el-menu >>> .el-menu-item.is-active
        color $activeColor
    .el-menu >>> .el-submenu .el-menu-item
        padding 0 20px !important
    .el-menu
        border 0
        overflow hidden
</style>