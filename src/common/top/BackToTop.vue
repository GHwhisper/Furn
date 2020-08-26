<template>
    <div class="back-to-top">
        <span class="iconfont arrow">&#xe604;</span>
    </div>
</template>

<script>
    export default {
        name: 'BackToTop'
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .back-to-top
        width 40px
        height 40px
        background-color: $activeColor
        box-sizing border-box
        border-radius 50%
        position fixed
        right 30px
        bottom 30px
        text-align center
        z-index 1000
        cursor pointer
        &:hover
            background-color: #ffffff
            border 1px solid $activeColor
            .arrow
                color $activeColor
        .arrow
            color #ffffff
            font-size 10px
            line-height 40px
            position relative
            bottom 0
            animation arrow 2.5s linear infinite alternate running
            -webkit-transform arrow 2.5s linear infinite alternate running
            -moz-animation arrow 2.5s linear infinite alternate running
            -o-animation arrow 2.5s linear infinite alternate running
    @keyframes arrow
    {
        0%{
            bottom -5px
        }
        25%{
            bottom 0
        }
        50%{
            bottom 5px
        }
        75%{
            bottom 0
        }
        100%{
            bottom -5px
        }
    }
    @-webkit-keyframes arrow    /* Safari and Chrome */
    {
        0%{
            bottom -5px
        }
        25%{
            bottom 0
        }
        50%{
            bottom 5px
        }
        75%{
            bottom 0
        }
        100%{
            bottom -5px
        }
    }
    @-moz-keyframes arrow    /* Firefox */
    {
        0%{
            bottom -5px
        }
        25%{
            bottom 0
        }
        50%{
            bottom 5px
        }
        75%{
            bottom 0
        }
        100%{
            bottom -5px
        }
    }
    @-o-keyframes arrow    /* Opera */
    {
        0%{
            bottom -5px
        }
        25%{
            bottom 0
        }
        50%{
            bottom 5px
        }
        75%{
            bottom 0
        }
        100%{
            bottom -5px
        }
    }
</style>