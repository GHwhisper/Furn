<template>
    <el-tabs v-model="activeName">
        <el-tab-pane label="商品简介" name="first">
            <ul class="brand-lis">
                <li>品牌：悦家</li>
            </ul>
            <pre class="summary">{{summary}}</pre>
<!--            <ul class="params-lis">-->
<!--                <li>商品名称：布艺单人椅</li>-->
<!--                <li>商品编号：100010566508</li>-->
<!--                <li>商品毛重：6kg</li>-->
<!--                <li>商品产地：中国大陆</li>-->
<!--                <li>适用场景：家庭/咖啡厅/...</li>-->
<!--            </ul>-->
        </el-tab-pane>
<!--        <el-tab-pane label="规格与包装" name="second">-->
<!--            <table cellpadding="10">-->
<!--                <tr>-->
<!--                    <td>试用人数</td>-->
<!--                    <td>单人</td>-->
<!--                </tr>-->
<!--                <tr>-->
<!--                    <td>面料</td>-->
<!--                    <td>帆布</td>-->
<!--                </tr>-->
<!--                <tr>-->
<!--                    <td>档位</td>-->
<!--                    <td>5档以上</td>-->
<!--                </tr>-->
<!--                <tr>-->
<!--                    <td>产品规格(长×宽×高cm)</td>-->
<!--                    <td>90*90*90</td>-->
<!--                </tr>-->
<!--            </table>-->
<!--        </el-tab-pane>-->
<!--        <el-tab-pane label="售后保障" name="third">-->
<!--            售后保障-->
<!--        </el-tab-pane>-->
        <el-tab-pane label="商品评价" name="fourth">
            <detail-comments :comment="comment" />
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import DetailComments from './Comment'
    export default {
        name: 'DetailTab',
        components: {
            DetailComments
        },
        props: {
            summary: String,
            comment: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                activeName: 'first'
            }
        },
        methods: {
            viewComment() {
                this.activeName = 'fourth'
            }
        },
        created() {
            this.bus.$on('viewComment', this.viewComment)
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .el-tabs >>> .is-active
    .el-tabs >>> .el-tabs__item:hover
        color $activeColor
    .el-tabs >>> .el-tabs__active-bar
        background-color $activeColor
    .el-tabs >>> .el-tabs__header .is-top
        font-size .35rem
    .el-tabs
        width 1170px
        min-height 600px
        margin 1.6rem auto 1.6rem
        font-size .3rem
        .el-tab-pane
            padding .4rem 0
            .brand-lis
                margin 0 0 .6rem
            pre.summary
                line-height 30px
                font-size .32rem
            /*.summary-lis*/
            /*    list-style unset*/
            /*    li*/
            /*        font-size .28rem*/
            /*        margin-bottom 30px*/
            /*        line-height 25px*/
            /*.params-lis*/
            /*    &:before*/
            /*    &:after*/
            /*        content ''*/
            /*        display table*/
            /*        clear both*/
            /*        zoom 1*/
            /*    li*/
            /*        width 25%*/
            /*        float left*/
            /*        margin 0 0 10px*/
            /*table*/
            /*    tr*/
            /*        td:first-child*/
            /*            text-align right*/
            /*            padding 10px 10px 10px 0*/
    @media screen and (min-width: 992px) and (max-width: 1200px)
        .el-tabs
            width 970px
    @media screen and (min-width: 768px) and (max-width: 991px)
        .el-tabs
            width 100%
            padding 0 .3rem
            box-sizing border-box
    @media screen and (max-width: 767px)
        .el-tabs
            width 100%
            padding 0 .3rem
            box-sizing border-box
</style>