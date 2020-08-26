<template>
    <section class="pop-con">
        <home-popular-small :product="popularList[0]" />
        <home-popular-big :product="popularList[1]" />
        <home-popular-small :product="popularList[2]" />
    </section>
</template>

<script>
    import HomePopularSmall from './PopularSmall'
    import HomePopularBig from './PopularBig'
    export default {
        name: 'HomePopular',
        components: {
            HomePopularSmall,
            HomePopularBig
        },
        props: {
            popularList: {
                type: Array,
                required: true
            }
        },
        data() {
            return{

            }
        },
        methods: {

        }
    }
</script>

<style lang="stylus" scoped>
    @media screen and (min-width: 1201px)
        .pop-con
            width 1170px
            flex-direction row
    @media screen and (min-width: 992px) and (max-width: 1200px)
        .pop-con
            width 970px
            flex-direction row
    @media screen and (min-width: 768px) and (max-width: 991px)
        .pop-con
            width 750px
            flex-direction column
            align-items center
    @media screen and (max-width: 767px)
        .pop-con
            width 90%
            flex-direction column
            align-items center
    .pop-con
        padding-top 2rem
        margin 0 auto
        display flex
</style>