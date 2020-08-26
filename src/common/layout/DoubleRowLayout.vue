<template>
    <div class="main-con double-row-layout">
        <div class="main">
            <div class="fixed-col">
                <slot name="left">#left</slot>
            </div>
            <div class="flexible-col">
                <slot name="right">#right</slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DoubleRowLayout'
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .main-con
        background-color $bgc_1
        .main
            width 1170px
            margin 0 auto
            .fixed-col
                width 200px
                float left
                padding-right 20px
                box-sizing border-box
            .flexible-col
                margin-left 200px
    @media screen and (min-width: 992px) and (max-width: 1200px)
        .main-con .main
            width 970px
            .fixed-col
                width 180px
            .flexible-col
                margin-left 180px
    @media screen and (min-width: 768px) and (max-width: 991px)
        .main-con .main
            width 100%
            padding 0 15px
            box-sizing border-box
            .fixed-col
                width 150px
            .flexible-col
                margin-left 150px
</style>