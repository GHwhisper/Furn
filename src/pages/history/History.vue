<template>
    <el-container direction="vertical">
        <page-header>
            <template #name>浏览记录</template>
            <template #right><search /></template>
        </page-header>
        <double-row-layout>
            <template #left>
                <personal-menu />
            </template>
            <template #right>
                <div class="boxes">

                </div>
            </template>
        </double-row-layout>
    </el-container>
</template>

<script>
    import PageHeader from 'common/header/PageHeader'
    import Search from 'common/search/Search'
    import DoubleRowLayout from 'common/layout/DoubleRowLayout'
    import PersonalMenu from 'common/sidebar/PersonalMenu'
    export default {
        name: 'History',
        components: {
            PageHeader,
            Search,
            DoubleRowLayout,
            PersonalMenu
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .boxes
        padding 20px 0
</style>