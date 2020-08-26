<template>
    <div class="intro-con">
        <div class="preview-wrap"></div>
        <div class="info-wrap"></div>
    </div>
</template>

<script>
    export default {
        name: 'ProductIntro',
        props: {

        },
        data() {
            return {

            }
        }
    }
</script>

<style lang="stylus" scoped>
    .intro-con
        height 600px
        margin 0 auto
        background-color: lightblue
        .preview-wrap
            width 40%
            height 100%
            background-color: #98b0ff
            float left
        .info-wrap
            width 60%
            height 100%
            background-color: #ffc860
            float right
    @media screen and (min-width: 1200px)
        .intro-con
            width 1170px
</style>