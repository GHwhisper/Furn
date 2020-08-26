<template>
    <el-container direction="vertical">
        <page-header>
            <template #name>售后服务</template>
            <template #right><search /></template>
        </page-header>
        <div class="main-con">
            <service-list />
        </div>
    </el-container>
</template>

<script>
    import PageHeader from 'common/header/PageHeader'
    import Search from 'common/search/Search'
    import ServiceList from "./components/ServiceList"
    export default {
        name: 'PaySucc',
        props: {

        },
        components: {
            PageHeader,
            Search,
            ServiceList
        },
        data() {
            return {

            }
        },
        methods: {

        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .main-con
        width 1170px
        height 600px
        margin 0 auto
    @media screen and (min-width: 992px) and (max-width: 1200px)
        .main-con
            width 970px
    @media screen and (max-width: 991px)
        .main-con
            width 100%
            padding 0 15px
            box-sizing border-box
</style>