<template>
    <el-header height="100px">
        <el-row type="flex" justify="center">
            <el-col :xs="24" :sm="20" :md="18" :lg="16" :xl="16">
                <div>
                    <span class="brand"><router-link to="/">Furn.</router-link></span>
                    <span class="login-welcome">欢迎登录</span>
                </div>
            </el-col>
        </el-row>
    </el-header>
</template>

<script>
    export default {
        name: 'Header',
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
</style>