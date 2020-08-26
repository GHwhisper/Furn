<template>
    <div class="img-con">
        <router-link :to="{ path: '/list', query: { srch: cateItem.name } }">
            <img :src="cateItem.imgUrl" alt="">
        </router-link>
        <router-link :to="{ path: '/list', query: { srch: cateItem.name } }" class="name">{{cateItem.name}}</router-link>
    </div>
</template>

<script>
    export default {
        name: 'CatItem',
        props: {
            cateItem: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .img-con
        width 100%
        height 0
        padding-top 100%
        overflow hidden
        background-color $bgc_1
        position relative
        img
            width 100%
            height @width
            position absolute
            top 0
        .name
            color #333333
            position absolute
            bottom 30px
            left 30px
            font-size .5rem
            font-weight 600
            cursor pointer
            transition color .4s linear
            -webkit-transition color .4s linear
        &:hover
            .name
                color $activeColor
</style>