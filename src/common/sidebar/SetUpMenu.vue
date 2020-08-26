<template>
    <el-menu :default-openeds="openeds" router :default-active="$route.path">
        <el-submenu index="1">
            <template slot="title">设置</template>
            <el-menu-item index="/setup/info">个人信息</el-menu-item>
            <el-menu-item index="/security">账户安全</el-menu-item>
            <el-menu-item index="/address">收货地址</el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
    export default {
        name: 'SetUpMenu',
        data() {
            return {
                openeds: ['1'],
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