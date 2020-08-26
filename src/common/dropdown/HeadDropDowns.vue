<template>
    <div class="drop-down-con">
        <el-dropdown>
            <span class="el-dropdown-link">首页<i class="el-icon-arrow-down el-icon--right" /></span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="go('/personal')">个人中心</el-dropdown-item>
                <el-dropdown-item @click.native="go('/order/all')">订单中心</el-dropdown-item>
                <!--                            <el-dropdown-item>我的钱包</el-dropdown-item>-->
                <!--                            <el-dropdown-item>我的关注</el-dropdown-item>-->
                <!--                            <el-dropdown-item>客户服务</el-dropdown-item>-->
            </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown>
            <span class="el-dropdown-link">账户设置<i class="el-icon-arrow-down el-icon--right" /></span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="go('/setup/info')">个人信息</el-dropdown-item>
                <el-dropdown-item @click.native="go('/security')">账户安全</el-dropdown-item>
                <el-dropdown-item @click.native="go('/address')">收货地址</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
<!--        <el-dropdown>-->
<!--            <span class="el-dropdown-link">消息<i class="el-icon-arrow-down el-icon&#45;&#45;right" /></span>-->
<!--            <el-dropdown-menu slot="dropdown">-->
<!--                <el-dropdown-item>系统消息</el-dropdown-item>-->
<!--                <el-dropdown-item>聊天消息</el-dropdown-item>-->
<!--            </el-dropdown-menu>-->
<!--        </el-dropdown>-->
    </div>
</template>

<script>
    export default {
        name: 'HeadDropDowns',
        methods: {
            go(url) {   // 跳转页面
                this.$router.push({path: url})
            },
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
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
</style>