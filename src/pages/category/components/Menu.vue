<template>
    <div class="menu-con">
        <div class="fixed-col">
            <h1 class="col-name">家具分类</h1>
            <div class="menu">
                <div class="menu-item" v-for="item in typeList" :key="item.title">
                    <div class="item-content">
                        <h2 class="item-title">{{item.title}}</h2>
                        <ul class="item-list">
                            <router-link to="" tag="li" v-for="(li, index) in item.items" :key="index">
                                <template v-for="name in li">{{name}}</template>
                            </router-link>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="styles">
                <router-link to="" v-for="(item, index) in styleList" :key="index">{{item}}</router-link>
            </div>
        </div>
        <div class="flexible-col">
            <el-carousel height="390px" trigger="click">
                <el-carouselItem v-for="item in 4" :key="item">
                    <router-link to=""><img src="" alt=""></router-link>
                </el-carouselItem>
            </el-carousel>
            <div class="recommend">
                <router-link to=""><img src="" alt=""></router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ClassifyMenu',
        props: {

        },
        data() {
            return {
                typeList: [
                    {
                        title: '客厅',
                        items: ['沙发', '茶几', '电视柜', '鞋柜']
                    }, {
                        title: '卧室',
                        items: ['床', '床垫', '衣柜', '床头柜']
                    }, {
                        title: '餐厅',
                        items: ['餐桌', '餐边柜', '酒柜', '餐椅']
                    }, {
                        title: '书房',
                        items: ['书桌', '书椅', '书柜', '书架']
                    }, {
                        title: '储物',
                        items: ['鞋架', '衣帽架', '置物架']
                    }, {
                        title: '办公',
                        items: ['桌子', '柜子', '麻将机', '货架']
                    }, {
                        title: '儿童',
                        items: ['床', '床垫', '桌椅', '衣柜']
                    }],
                styleList: ['简约', '美式', '中式', '欧式', '地中海', '北欧', '韩式', '日式'],
                swiperList: [
                    {
                        id: '0001',
                        img: ''
                    }
                ]
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .menu-con
        width 1170px
        height 600px
        margin 10px auto 0
        .fixed-col
            width 250px
            height 100%
            float left
            background-color $activeColor
            color #ffffff
            .col-name
                padding 0 10px
                height 40px
                line-height 40px
                background-color $activeColor_2
            .menu
                .menu-item
                    padding 0 20px
                    .item-content
                        height 50px
                        line-height 50px
                        display flex
                        flex-direction row
                        align-items center
                        border-bottom 1px dotted $border
                        box-sizing border-box
                        .item-title
                            font-size .30rem
                            font-weight 600
                            margin-right 20px
                        ul.item-list
                            font-size .26rem
                            li
                                float left
                                padding-right 8px
                                cursor pointer
                                &:last-child
                                    padding 0
                    &:hover
                        background-color $activeColor_2
            .styles
                padding 20px
                a
                    width calc((250px - 20px * 2 - 10px * 3) / 4)
                    height @width
                    display inline-block
                    color #ffffff
                    margin-right 10px
                    margin-bottom 10px
                    background-color $activeColor_2
                    border-radius 50%
                    text-align center
                    line-height @height
                    font-weight 600
                    &:nth-child(4n)
                        margin-right 0
                    &:nth-child(n+5)
                        margin-bottom 0
        .flexible-col
            height 100%
            padding-left 250px
            .el-carousel
                .el-carousel__item:nth-child(2n)
                    background-color #d3dce6
                .el-carousel__item:nth-child(2n+1)
                    background-color #99a9bf
            .recommend
                height 210px
                background-color lightblue
</style>