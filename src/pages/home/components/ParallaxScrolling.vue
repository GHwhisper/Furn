<template>
    <section class="parallax-background">
        <div class="parallax-content">
            <div class="parallax-text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'HomeParallaxScrolling',
        props: {

        },
        data() {
            return {

            }
        }
    }
</script>

<style lang="stylus" scoped>
    @media screen and (min-width: 1201px)
        .parallax-content
            width 1170px
            .parallax-text
                width 630px
    @media screen and (min-width: 991px) and (max-width: 1200px)
        .parallax-content
            width 970px
            .parallax-text
                width 630px
    @media screen and (min-width: 766px) and (max-width: 990px)
        .parallax-content
            width 750px
            .parallax-text
                width 630px
    @media screen and (max-width: 765px)
        .parallax-content
            width 100%
            .parallax-text
                width 100%
    .parallax-background
        margin 0 auto 1000px
        background-color: #c1c7e6
        .parallax-content
            height 600px
            margin 0 auto
            box-sizing border-box
            padding 0 .3rem
            background-color: lightblue
</style>