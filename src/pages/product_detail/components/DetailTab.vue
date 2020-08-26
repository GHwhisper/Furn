<template>
    <el-tabs v-model="activeName">
        <el-tab-pane label="商品简介" name="first">
            <ul class="brand-lis">
                <li>品牌：Furn.</li>
            </ul>
            <ul class="params-lis">
                <li>商品名称：布艺单人椅</li>
                <li>商品编号：100010566508</li>
                <li>商品毛重：6kg</li>
                <li>商品产地：中国大陆</li>
                <li>适用场景：家庭/咖啡厅/...</li>
            </ul>
        </el-tab-pane>
        <el-tab-pane label="规格与包装" name="second">
            <table cellpadding="10">
                <tr>
                    <td>试用人数</td>
                    <td>单人</td>
                </tr>
                <tr>
                    <td>面料</td>
                    <td>帆布</td>
                </tr>
                <tr>
                    <td>档位</td>
                    <td>5档以上</td>
                </tr>
                <tr>
                    <td>产品规格(长×宽×高cm)</td>
                    <td>90*90*90</td>
                </tr>
            </table>
        </el-tab-pane>
        <el-tab-pane label="售后保障" name="third">售后保障ccc</el-tab-pane>
        <el-tab-pane label="商品评价(3.3万+)" name="fourth">
            <div class="high-opinion">
                <p class="opi-text">好评度</p>
                <p class="opi-rate">97%</p>
            </div>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        name: 'DetailTab',
        props: {

        },
        data() {
            return {
                activeName: 'first'
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .el-tabs >>> .is-active
    .el-tabs >>> .el-tabs__item:hover
        color $activeColor
    .el-tabs >>> .el-tabs__active-bar
        background-color: $activeColor
    .el-tabs >>> .el-tabs__header .is-top
        font-size .35rem
    .el-tabs
        width 1170px
        margin 1.6rem auto 0
        height 600px
        font-size .3rem
        .el-tab-pane
            padding .4rem .5rem
            .brand-lis
                margin 0 0 .6rem
            .params-lis
                &:before
                &:after
                    content ''
                    display table
                    clear both
                    zoom 1
                li
                    width 25%
                    float left
                    margin 0 0 10px
            table
                tr
                    td:first-child
                        text-align right
                        padding 10px 10px 10px 0
            .high-opinion
                margin 0 0 .5rem
                .opi-text
                    font-size .2rem
                    color $fontColor
                .opi-rate
                    font-size .8rem
                    color $activeColor
                    margin 5px 0 0
</style>