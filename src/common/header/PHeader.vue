<template>
    <el-page-header @back="goBack" title="" :content="content"></el-page-header>
</template>

<script>
    export default {
        name: 'PHeader',
        props: {
            content: {
                type: String,
                required: true
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .el-page-header
        padding 15px
        position relative
        border-bottom 1px solid $border
    .el-page-header >>> .el-page-header__left
        color $fontColor_intro
    .el-page-header >>> .el-page-header__left::after
        width 0
        height 0
    .el-page-header >>> .el-page-header__content
        font-size .3rem
        position absolute
        left 50%
        transform translateX(-50%)
</style>