<template>
    <el-container direction="vertical" v-if="show" v-loading.fullscreen.lock="fullscreenLoading">
        <page-header>
            <template #name>商品收藏</template>
            <template #middle><head-drop-downs /></template>
            <template #right><search /></template>
        </page-header>
        <double-row-layout>
            <template #left><personal-menu /></template>
            <template #right>
                <div class="boxes">
                    <div class="box-0">
                        <div v-if="collectionList.length !== 0">
                            <template v-for="item in collectionList">
                                <collection-item :product="item" :key="item.favoriteId" />
                            </template>
                        </div>
                        <div v-else class="none-tips">您没有收藏的商品哟~</div>
                        <el-pagination
                                background
                                layout="prev, pager, next"
                                :total="total"
                                :page-size="pageSize"
                                :current-page="currentPage"
                                @current-change="handleCurrentChange"
                        ></el-pagination>
                    </div>
                </div>
            </template>
        </double-row-layout>
    </el-container>
    <div v-else class="p-con"  v-loading.fullscreen.lock="fullscreenLoading">
        <p-header content="我的收藏" />
        <div class="list" v-if="collectionList.length !== 0">
            <template v-for="item in collectionList">
                <collection-item :product="item" :key="item.favoriteId" />
            </template>
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
        <div v-else class="none-tips">您没有收藏的商品哟~</div>
    </div>
</template>

<script>
    import PageHeader from 'common/header/PageHeader'
    import HeadDropDowns from 'common/dropdown/HeadDropDowns'
    import Search from 'common/search/Search'
    import DoubleRowLayout from 'common/layout/DoubleRowLayout'
    import PersonalMenu from 'common/sidebar/PersonalMenu'
    import PHeader from 'common/header/PHeader'
    import CollectionItem from './components/CollectionItem'
    import axios from 'axios'
    export default {
        name: 'Collection',
        components: {
            PageHeader,
            HeadDropDowns,
            Search,
            DoubleRowLayout,
            PersonalMenu,
            PHeader,
            CollectionItem
        },
        data() {
            return {
                show: true,
                screenWidth: window.innerWidth, //浏览器宽度
                collectionList: [],
                currentPage: 1, // 当前第几页
                pageSize: 20,   // 分页大小
                total: 0,   // 商品总数
                fullscreenLoading: false
            }
        },
        methods: {
            async getCollections() {
                try {
                    this.fullscreenLoading = true
                    let res = await axios.get('/api/showFavorites', {
                        params: {
                            page: this.currentPage,
                            pageSize: this.pageSize
                        }
                    })
                    let data = res.data
                    this.collectionList = data.favoriteList ? data.favoriteList : []
                    this.total = data.Total
                    this.fullscreenLoading = false
                } catch (e) {
                    this.fullscreenLoading = false
                }
            },
            handleCurrentChange(value) {
                this.currentPage = value
                this.getCollections()
            },
            initScreen() {
                this.show = this.screenWidth >= 768
            }
        },
        watch: {
            screenWidth(val) {
                this.screenWidth = val
                this.initScreen()
            }
        },
        mounted() {
            window.onresize = ()=> {
                return (()=> {
                    this.screenWidth = window.innerWidth
                })()
            }
            this.initScreen()
            this.getCollections()
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
    .boxes
        padding 20px 0
        .box-0
            min-height 500px
            background-color #ffffff
            padding 15px 0 50px
            position relative
            .el-pagination
                position absolute
                right 0
                bottom 10px
    .none-tips
        height 200px
        line-height 200px
        color $fontColor_intro
        text-align center
    @media screen and (max-width: 767px)
        .p-con
            .list
                padding-top 20px
                padding-bottom 100px
                position relative
                .el-pagination
                    position absolute
                    right 0
</style>