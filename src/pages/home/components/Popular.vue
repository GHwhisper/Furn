<template>
    <section class="pop-con">
        <home-popular-small :product="popularList[0]"></home-popular-small>
        <home-popular-big :product="popularList[1]"></home-popular-big>
        <home-popular-small :product="popularList[2]"></home-popular-small>
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

        },
        data() {
            return{
                popularList: [
                    {
                        id: '0001',
                        name: 'Arm Chair',
                        description: 'Nemo enim ipsam voluptatem quia volu ptas sit asperna aut odit aut fugit.',
                        img: 'p1.png',
                        price: 2000
                    },
                    {
                        id: '0002',
                        name: 'Latest Designed Stool and Chair',
                        description: 'Edi Ut Perspiciatis Unde Omnis Iste Natusina Error Sit Voluptatem Accusantium Doloret Mque Laudantium, Totam Rem Aperiam.',
                        img: 'p2.png',
                        price: 400
                    },
                    {
                        id: '0003',
                        name: 'Hanging Lamp',
                        description: 'Nemo enim ipsam voluptatem quia volu ptas sit asperna aut odit aut fugit.',
                        img: 'p3.png',
                        price: 200
                    }
                ]
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
    @media screen and (min-width: 991px) and (max-width: 1200px)
        .pop-con
            width 970px
            flex-direction row
    @media screen and (min-width: 766px) and (max-width: 990px)
        .pop-con
            width 750px
            flex-direction column
            align-items center
    @media screen and (max-width: 765px)
        .pop-con
            width 90%
            flex-direction column
            align-items center
    .pop-con
        padding-top 2rem
        margin 0 auto
        display flex
</style>