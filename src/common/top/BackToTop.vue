<template>
    <div class="back-to-top" @click="toTop" v-show="showTheTop">
        <span class="iconfont arrow">&#xe604;</span>
    </div>
</template>

<script>
    export default {
        name: 'BackToTop',
        props: {

        },
        data() {
            return {
                showTheTop: false // 是否显示“回到顶部”按钮
            }
        },
        methods: {
            toTop() {   // 回到顶部
                let top = document.documentElement.scrollTop  || document.body.scrollTop
                const timeTop = setInterval(()=> {
                    document.body.scrollTop = document.documentElement.scrollTop = top -= 50
                    if (top <= 0){
                        clearInterval(timeTop)
                    }
                }, 10)
            },
            handleScroll() {
                const top = document.documentElement.scrollTop  || document.body.scrollTop
                if (top > 700){
                    this.showTheTop = true
                } else {
                    this.showTheTop = false
                }
            }
        },
        activated() {
            window.addEventListener('scroll', this.handleScroll)
        },
        deactivated() {
            window.removeEventListener('scroll', this.handleScroll)
        }
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
    @media screen and (max-width: 767px)
        .back-to-top
            right 15px
            bottom 70px
</style>