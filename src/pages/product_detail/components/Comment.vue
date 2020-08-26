<template>
    <div class="comment-con" id="#comment">
        <div class="high-opinion">
            <p class="opi-text">好评度</p>
            <p class="opi-rate">{{comment.favorRate}}</p>
        </div>
        <div v-if="comment.commentList && comment.commentList.length !== 0">
            <div class="comment-item" v-for="item in (currentPage === 1 ? comment.commentList : commentList)" :key="item.commentId">
                <div class="user left">
                    <img :src="item.profile" alt="">
                    <span class="nickname">{{item.nickname ? item.nickname : '匿名'}}</span>
                </div>
                <div class="right">
                    <div class="comment-content">
                        <el-rate disabled :value="item.rate" />
                        <p class="comment-text">{{item.comment}}</p>
                    </div>
                    <div class="imgs" v-if="item.imgList">
                        <el-image
                                v-for="(imgItem, imgIndex) in item.imgList"
                                :key="imgIndex"
                                :src="imgItem"
                                :preview-src-list="getImgList(imgIndex, item.imgList)"
                        >
                            <div slot="error" class="image-slot"><i class="el-icon-picture-outline" /></div>
                        </el-image>
                    </div>
                    <div class="props"><span>{{item.attr.color}}</span><span>{{item.attr.size}}</span></div>
                </div>
            </div>
        </div>
        <div class="none-tips" v-else>暂无评论，赶快购买写评论吧~</div>
        <el-pagination
                background
                layout="prev, pager, next"
                :total="comment.total"
                :page-size="pageSize"
                :current-page="currentPage"
                @current-change="handleCurrentChange"
                :pager-count="5"
        >
        </el-pagination>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'Comment',
        props: {
            comment: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                commentList: [],    // 第一页以外的评论
                currentPage: 1, // 当前第几页
                pageSize: 10,   // 分页大小
            }
        },
        methods: {
            getImgList(index, list) {
                let arr = []
                let i = 0
                for(i; i < list.length; i++){
                    arr.push(list[i + index])
                    if(i + index >= list.length - 1){
                        index = 0 - (i + 1)
                    }
                }
                return arr
            },
            async getComments() {
                let res = await axios('/api/checkCommentByProductId', {
                    params: {
                        productId: this.$route.params.id,
                        page: this.currentPage,
                        pageSize: this.pageSize
                    }
                })
                this.commentList = res.data.commentList
            },
            handleCurrentChange(value) {
                this.currentPage = value
                this.getComments()
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
    .comment-con
        &:before
        &:after
            content ''
            display table
            clear both
        .high-opinion
            margin 0 0 .5rem
            padding 0 .5rem
            .opi-text
                font-size .3rem
                color $fontColor
            .opi-rate
                font-size .8rem
                color $activeColor
                margin 5px 0 0
        .comment-item
            display flex
            border-bottom 1px solid $border
            padding .3rem 0
            .user
                width 15%
                padding-right 20px
                box-sizing border-box
                img
                    width 1rem
                    height 1rem
                    background-color lightblue
                    display inline-block
                    border-radius 50%
                    margin-right 15px
                .nickname
                    font-size .26rem
                    color $fontColor
                    display inline-block
            .right
                width 85%
                display flex
                flex-direction column
                .comment-content
                    .el-rate
                        margin 0 0 .1rem
                    .comment-text
                        line-height 1.5
                .imgs
                    margin-top 10px
                    .el-image
                        width 80px
                        height 80px
                        margin-right 10px
                        margin-bottom 10px
                .props
                    color $fontColor_intro
                    font-size .26rem
                    span:first-child
                        margin-right 10px
        .none-tips
            height 200px
            line-height 200px
            text-align center
            color $fontColor_intro
        .el-pagination
            margin .4rem 0 0
            float right
    @media screen and (max-width: 767px)
        .comment-con
            .comment-item
                flex-direction column
                .user
                    width 100%
                    margin-bottom 10px
                .right
                    width 100%
</style>