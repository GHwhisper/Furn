<template>
    <footer>
        <div class="footer-links">
            <div class="footer-item">
                <h4 class="title">信息</h4>
                <ul class="list">
                    <li><router-link class="link" to="#">关于我们</router-link></li>
                    <li><router-link class="link" to="#">联系我们</router-link></li>
                    <li><router-link class="link" to="#"></router-link></li>
                    <li><router-link class="link" to="#"></router-link></li>
                </ul>
            </div>
            <div class="footer-item">
                <h4 class="title">商品</h4>
                <ul class="list">
                    <li><router-link class="link" to="#">木椅</router-link></li>
                    <li><router-link class="link" to="#">沙发</router-link></li>
                    <li><router-link class="link" to="#">床</router-link></li>
                    <li><router-link class="link" to="#">衣柜</router-link></li>
                </ul>
            </div>
            <div class="footer-item">
                <h4 class="title">作者</h4>
                <ul class="list">
                    <li><router-link class="link" to="#">梁爽</router-link></li>
                    <li><router-link class="link" to="#">陈华毅</router-link></li>
                    <li><router-link class="link" to="#"></router-link></li>
                    <li><router-link class="link" to="#"></router-link></li>
                </ul>
            </div>
            <div class="footer-item">
                <h4 class="title">通讯</h4>
                <ul class="list">
                    <li><router-link class="link" to="#">意见建议</router-link></li>
                    <li><router-link class="link" to="#"></router-link></li>
                    <li><router-link class="link" to="#"></router-link></li>
                    <li><router-link class="link" to="#"></router-link></li>
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
    @media screen and (min-width: 992px) and (max-width: 1200px)
        footer
            width 970px
        .footer-item
            width 25%
    @media screen and (min-width: 768px) and (max-width: 991px)
        footer
            width 750px
        .footer-item
            width 50%
            margin-bottom 50px
    @media screen and (max-width: 767px)
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
            display flex
            flex-wrap wrap
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
                    height 21px
                    line-height 21px
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