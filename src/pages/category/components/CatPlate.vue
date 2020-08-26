<template>
    <div class="container">
        <h2 class="title">{{title}}</h2>
        <div class="main">
            <el-row class="row box-1">
                <el-col class="col-l" :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <!--北欧-->
                    <cat-item v-if="categories[0]" :cate-item="categories[0]" />
                </el-col>
                <el-col class="col-r" :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-row class="col-r-row-top">
                        <!--简约-->
                        <cat-item v-if="categories[1]" :cate-item="categories[1]" />
                    </el-row>
                    <el-row class="col-r-row-bottom">
                        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                            <!--现代-->
                            <cat-item v-if="categories[2]" :cate-item="categories[2]" />
                        </el-col>
                        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                            <!--古典-->
                            <cat-item v-if="categories[3]" :cate-item="categories[3]" />
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row class="row box-2">
                <el-col class="col-l" :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-row>
                        <el-col class="left" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                            <cat-item v-if="categories[4]" :cate-item="categories[4]" />
                        </el-col>
                        <el-col class="right" :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
                            <cat-item v-if="categories[5]" :cate-item="categories[5]" />
                        </el-col>
                    </el-row>
                </el-col>
                <el-col class="col-r" :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-row class="top">
                        <cat-item v-if="categories[6]" :cate-item="categories[6]" />
                    </el-row>
                    <el-row class="bottom">
                        <cat-item v-if="categories[7]" :cate-item="categories[7]" />
                    </el-row>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import CatItem from './CatItem'
    export default {
        name: 'CatPlate',
        components: {
            CatItem
        },
        props: {
            title: {
                type: String,
                default() {
                    return '分类'
                }
            },
            categories: {
                type: Array,
                required: true
            }
        },
        data() {
            return {

            }
        },
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .container
        width 1170px
        margin 0 auto
        padding-top 100px
        padding-bottom 100px
        .title
            font-size .6rem
            font-weight bold
            color $fontColor-name
            text-align center
        .main
            margin-top 80px
            .el-row.row
                .col-l,.col-r
                    padding 0 15px
            .el-row.box-1
                .col-r
                    .col-r-row-top
                        padding 0 15px
                        margin-right -15px
                        margin-left -15px
                        margin-bottom 30px
                        .img-con
                            padding-top calc((100% - 30px) / 2)
                    .col-r-row-bottom
                        margin-right -15px
                        margin-left -15px
                        .el-col
                            padding 0 15px
            .el-row.box-2
                margin-top 30px
                .el-col.col-l
                    .el-row
                        margin-right -15px
                        margin-left -15px
                        .el-col
                            padding 0 15px
                            .img-con
                                padding-top 200%
                .el-col.col-r
                    .top
                    .bottom
                        padding 0 15px
                        margin-right -15px
                        margin-left -15px
                        .img-con
                            padding-top calc((100% - 30px - 30px) / 2)
                    .top
                        margin-bottom 30px
    @media screen and (min-width: 992px) and (max-width: 1200px)
        .container
            width 970px
    @media screen and (min-width: 768px) and (max-width: 991px)
        .container
            width 100%
            padding-top 50px
            padding-bottom 50px
            .main
                margin-top 50px
    @media screen and (max-width: 767px)
        .container
            width 100%
            padding-top 50px
            padding-bottom 50px
            .main
                margin-top 50px
            .el-row.row
                .col-r
                    margin-top 30px
</style>