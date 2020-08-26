<template>
    <div>
        <div class="all-selected">
            <span class="select-text">已选中：</span>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item v-for="(item, index) in srchKeyWords" :key="index" @click.native="cutArray(srchKeyWords, index)">{{item}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="cate-con">
            <div class="cate-item" v-for="(cateItem, index) in categoryList" :key="index">
                <div class="cate-name">{{cateItem.Name}}</div>
                <div class="cate-list">
                    <span
                            class="btn-item"
                            v-for="item in cateItem.list"
                            :key="item"
                            @click="handleBtnClick(item)">
                        {{item}}
                    </span>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="sort-con">
                <span class="sort-text">排序：</span>
                <el-select v-model="sortSelected" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'MultiFilter',
        props: {
            categoryList: {
                type: Array
            }
        },
        data() {
            return {
                options: [
                    {
                        value: '0',
                        label: '默认'
                    }, {
                        value: '1',
                        label: '评分'
                    }, {
                        value: '2',
                        label: '价格降序'
                    }, {
                        value: '3',
                        label: '价格升序'
                    }
                ],
                sortSelected: '0',   // 选中的排序方式
                srchKeyWords: [],   // 搜索的关键字
            }
        },
        methods: {
            handleBtnClick(value) {
                this.srchKeyWords.push(value)
            },
            cutArray(array, index) {
                this.srchKeyWords = array.slice(0, index + 1)
            }
        },
        watch: {
            srchKeyWords(value) {
                if(this.srchKeyWords.length === 1) {
                    return
                } else {
                    this.$emit('keyWordsChange', value)
                    this.sortSelected = '0'
                }
            },
            $route() {
                if(this.$route.query.srch) {
                    this.srchKeyWords = this.$route.query.srch ? [this.$route.query.srch] : []
                    this.sortSelected = '0'
                }
            },
            sortSelected(value) {
                this.$emit('sortChange', value)
            }
        },
        created() {
            this.sortSelected = this.options[0].value   // 初始为默认排序
            let urlSrch = this.$route.query.srch    //路径上的搜索内容
            this.srchKeyWords.push(urlSrch)
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .el-select >>> .el-input.is-focus .el-input__inner
    .el-select >>> .el-input__inner:focus
        border-color $activeColor
    .el-select-dropdown__item.selected
        color $activeColor
    .el-breadcrumb >>> .el-breadcrumb__inner
        color $fontColor_intro
        cursor pointer
    .all-selected
        display flex
        flex-direction row
        align-items flex-start
        font-size .28rem
        padding 0 10px
        line-height 30px
        margin-bottom 10px
        color $fontColor_intro
        overflow hidden
        .select-text
            flex-shrink 0
            margin-right 10px
        .el-breadcrumb
            line-height 30px
    .cate-con
        width 100%
        .cate-item
            display flex
            flex-direction row
            padding 10px 10px 0 10px
            border-bottom 1px solid $border
            .cate-name
                width 120px
                font-size .3rem
                font-weight 600
            .cate-list
                width 100%
                .btn-item
                    display inline-block
                    padding 5px 10px
                    border 1px solid $border
                    margin-right 10px
                    margin-bottom 10px
                    border-radius 5px
                    cursor pointer
                    transition all .3s linear
                .selected
                    background-color $activeColor
                    color #ffffff
    .row
        width 100%
        margin-top 20px
        margin-bottom 20px
        padding 10px 15px
        box-sizing border-box
        display flex
        flex-direction row
        justify-content flex-end
        .sort-con
            .sort-text
                margin-right 20px
            .el-select
                width 150px
</style>