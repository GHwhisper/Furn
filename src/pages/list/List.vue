<template>
    <el-container direction="vertical" v-loading.fullscreen.lock="fullscreenLoading">
        <page-header class="page-header">
            <template #name>商城</template>
            <template #right><search /></template>
        </page-header>
        <div class="main-con">
            <multi-filter :categoryList="categoryList" @keyWordsChange="handleKWChange" @sortChange="handleSortChange" />
            <div class="list-con" v-if="srchResult.length !== 0">
                <template v-for="item in srchResult">
                    <list-product-item :product="item" :key="item.productId"/>
                </template>
            </div>
            <div v-else class="none-tips">暂无搜索结果~</div>
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="total"
                    :page-size="pageSize"
                    :current-page="currentPage"
                    @current-change="handleCurrentChange"
                    :pager-count="5"
            ></el-pagination>
        </div>
    </el-container>
</template>

<script>
    import PageHeader from 'common/header/PageHeader'
    import Search from 'common/search/Search'
    import MultiFilter from './components/MultiFilter'
    import ListProductItem from 'common/productitem/ProductItem'
    import axios from 'axios'
    export default {
        name: 'List',
        components: {
            PageHeader,
            Search,
            MultiFilter,
            ListProductItem
        },
        data() {
            return {
                keywords: [],
                srchResult: [], // 搜索到的商品
                currentPage: 1, // 当前第几页
                pageSize: 20,   // 分页大小
                total: 0,   // 商品总数
                categoryList: [],   // 筛选列表
                sort: '0',  // 排序方式
                fullscreenLoading: false
            }
        },
        mounted() {
            this.keywords = this.$route.query.srch ? [this.$route.query.srch] : []
            this.search(this.keywords)
        },
        methods: {
            async search(array) {
                this.fullscreenLoading = true
                let res = await axios.post('/api/config', {
                    keywords: array,
                    page: this.currentPage,
                    pageSize: this.pageSize,
                    sort: this.sort
                })
                let data = res.data
                this.srchResult = data.srcResult.srchList
                this.total = data.srcResult.totalCount
                this.categoryList = data.category
                this.fullscreenLoading = false
            },
            handleCurrentChange(value) {    // 点击多少页
                this.currentPage = value
                this.search(this.keywords)
                window.scrollTo(0,0)
            },
            handleKWChange(value) {
                this.keywords = value
                this.currentPage = 1    // 筛选改变时，先请求第一页数据
                this.search(this.keywords)
            },
            handleSortChange(value) {
                this.sort = value
                this.currentPage = 1
                this.search(this.keywords)
            }
        },
        watch: {
            '$route'() {
                if(this.$route.query.srch) {
                    this.keywords = this.$route.query.srch ? [this.$route.query.srch] : []
                    this.currentPage = 1
                    this.search(this.keywords)
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .el-pagination >>> .el-pager li:not(.disabled).active
        background-color $activeColor
    .el-pagination >>> .el-pager li:not(.active):hover
    .el-pagination >>> .el-pager li.active
        color $activeColor
    .page-header
        box-shadow none
    .main-con
        width 1170px
        margin 0 auto
        padding-top 20px
        padding-bottom 80px
        .list-con
            width 100%
        .none-tips
            height 200px
            line-height 200px
            text-align center
            margin-bottom 100px
            color $fontColor_intro
            background-color $bgc_1
        .el-pagination
            float right
    @media screen and (min-width: 992px) and (max-width: 1200px)
        .main-con
            width 970px
    @media screen and (max-width: 991px)
        .main-con
            width 100%
</style>