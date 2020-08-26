<template>
    <footer>
        <div class="footer-links">
            <div class="footer-item">
                <h4 class="title">Infomation</h4>
                <ul class="list">
                    <li><a class="link" href="">About Us</a></li>
                    <li><a class="link" href="">Contact Us</a></li>
                    <li><a class="link" href="">News</a></li>
                    <li><a class="link" href="">Store</a></li>
                </ul>
            </div>
            <div class="footer-item">
                <h4 class="title">Infomation</h4>
                <ul class="list">
                    <li><a class="link" href="">About Us</a></li>
                    <li><a class="link" href="">Contact Us</a></li>
                    <li><a class="link" href="">News</a></li>
                    <li><a class="link" href="">Store</a></li>
                </ul>
            </div>
            <div class="footer-item">
                <h4 class="title">Infomation</h4>
                <ul class="list">
                    <li><a class="link" href="">About Us</a></li>
                    <li><a class="link" href="">Contact Us</a></li>
                    <li><a class="link" href="">News</a></li>
                    <li><a class="link" href="">Store</a></li>
                </ul>
            </div>
            <div class="footer-item">
                <h4 class="title">Infomation</h4>
                <ul class="list">
                    <li><a class="link" href="">About Us</a></li>
                    <li><a class="link" href="">Contact Us</a></li>
                    <li><a class="link" href="">News</a></li>
                    <li><a class="link" href="">Store</a></li>
                </ul>
            </div>
        </div>
    </footer>
</template>

<script>
    export default {
        name: 'HomeFooter'
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    @media screen and (min-width: 1201px)
        footer
            width 1170px
        .footer-item
            width 25%
    @media screen and (min-width: 991px) and (max-width: 1200px)
        footer
            width 970px
        .footer-item
            width 25%
    @media screen and (min-width: 766px) and (max-width: 990px)
        footer
            width 750px
        .footer-item
            width 50%
            margin-bottom 50px
    @media screen and (max-width: 765px)
        footer
        .footer-item
            width 100%
        .footer-item
            margin-bottom 50px
    footer
        padding 2rem 0
        margin 0 auto
        .footer-links
            min-height 300px
            .footer-item
                display inline-block
                padding 0 .3rem
                box-sizing border-box
                .title
                    color $fontColor-name
                    font-size .36rem
                    font-weight 700
                    margin 0 0 45px
                .link
                    color $fontColor_intro
                    font-size .32rem
                    font-weight 500
                    margin 0 0 15px
                    display inline-block
                    position relative
                    left 0
                    transition left linear .3s
                    &:hover
                        color $activeColor
                        left 15px
</style>