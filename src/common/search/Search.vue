<template>
    <div class="search">
        <el-input v-model="srchContent" placeholder="搜索家具" clearable @keyup.enter.native="handleSrch" />
        <el-button type="warning" @click="handleSrch">搜索</el-button>
    </div>
</template>

<script>
    export default {
        name: 'Search',
        data() {
            return {
                srchContent: '',     // 搜索内容
            }
        },
        methods: {
            handleSrch() {
                if(this.srchContent !== '') {
                    this.$router.push({path: '/list',query: {srch: this.srchContent}})
                }
            },
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .el-input >>> .el-input__inner:focus
        border-color $activeColor
    .search
        display flex
        flex-direction row
        .el-input
            width 250px
            margin-right 10px
    @media screen and (max-width: 991px)
        .search
            .el-input
                width 180px
</style>