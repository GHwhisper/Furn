<template>
    <el-header height="100px">
        <el-row type="flex" justify="center">
            <el-col>
                <div class="brand-con">
                    <router-link class="brand" to="/">悦家</router-link>
                    <span class="name"><slot name="name">欢迎光临</slot></span>
                </div>
                <div class="middle"><slot name="middle" /></div>
                <div class="right-con"><slot name="right" /></div>
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
            .el-col
                width 1170px
                display flex
                flex-direction row
                justify-content space-between
                align-items flex-end
                padding-bottom 15px
                .brand-con
                    .brand
                        font-size .7rem
                        color $activeColor
                        margin-right 10px
                    .name
                        color $fontColor
                        font-size .45rem
    @media screen and (min-width: 992px) and (max-width: 1200px)
        .el-header .el-row .el-col
            width 970px
    @media screen and (min-width: 768px) and (max-width: 991px)
        .el-header
            padding 0 .3rem
            .el-row .el-col
                width 100%
    @media screen and (max-width: 767px)
        .el-header
            padding 0 .3rem
            .el-row .el-col
                width 100%
                .brand-con
                    .brand
                        font-size .6rem
                    .name
                        font-size .4rem
                .right-con
                    display none
</style>