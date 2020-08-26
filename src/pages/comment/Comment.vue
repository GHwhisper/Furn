<template>
    <el-container direction="vertical" v-loading.fullscreen.lock="fullscreenLoading">
        <page-header>
            <template #name>评价晒单</template>
            <template #right><search /></template>
        </page-header>
        <div class="main-con">
            <div class="main">
                <div class="head">
                    <h3 class="title">商品评价</h3>
                    <p class="des">快乐分享完美的使用心得~</p>
                </div>
                <div class="product">
                    <div class="l-col">
                        <div class="img-con">
                            <router-link :to="{path: `/product/detail/${product.productId}`, query: {skuid: product.id}}">
                                <img :src="product.img" alt="">
                            </router-link>
                        </div>
                        <router-link :to="{path: `/product/detail/${product.productId}`, query: {skuid: product.id}}" class="name">{{product.name}}</router-link>
                        <strong class="price" v-if="product.price !== undefined">￥{{product.price.toFixed(2)}}</strong>
                        <div class="attr"><p>{{product.color}}</p><p>{{product.size}}</p></div>
                    </div>
                    <div class="r-col">
                        <div class="op">
                            <el-rate v-model="commentForm.rate" :colors="colors" show-text />
                            <el-input
                                    type="textarea"
                                    :rows="5"
                                    placeholder="写写你的感受吧"
                                    v-model="commentForm.comment"
                                    minlength="10"
                                    maxlength="300"
                                    show-word-limit
                                    resize="none"
                            />
                            <el-upload
                                    :class="['imgs-uploader', {'hide-upload': hideUpload}]"
                                    action="/api/imgUpload"
                                    :headers="{ token: token }"
                                    list-type="picture-card"
                                    :on-change="handlePictureChange"
                                    :on-preview="handlePictureCardPreview"
                                    :on-remove="handleRemove"
                                    :on-exceed="countExceed"
                                    :on-success="uploadSucc"
                                    :limit="limitCount"
                                    :data="{ type: 'comment' }"
                                    multiple
                                    show-file-list
                            >
                                <i class="el-icon-plus" />
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible" class="img-dialog">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                            <div class="tips" v-show="tipsVisible"><i class="el-icon-warning-outline" />{{tipText}}</div>
                        </div>
                    </div>
                </div>
                <div class="sub">
                    <el-button type="warning" @click="handleSubmitComment">发表</el-button>
                </div>
            </div>
        </div>
    </el-container>
</template>

<script>
    import PageHeader from 'common/header/PageHeader'
    import Search from 'common/search/Search'
    import axios from 'axios'
    import { mapState } from 'vuex'
    export default {
        name: 'Comment',
        components: {
            PageHeader,
            Search
        },
        data() {
            return {
                product: {},    // 商品信息
                colors: ['#99A9BF', '#F7BA2A', '#FF9900'],  // 评分颜色
                dialogImageUrl: '',
                dialogVisible: false,
                limitCount: 6,  // 图片数量限制
                hideUpload: false,   // 当达到数量限制时，隐藏图片上传按钮
                commentForm: {
                    orderId: '',
                    productId: '',
                    id: '',
                    rate: 0,
                    comment: '',
                    imgList: []
                },
                tipText: '',
                tipsVisible: false,
                fullscreenLoading: false
            }
        },
        mounted() {
            this.getProductInfo()
        },
        methods: {
            async getProductInfo() {  // 获取商品信息
                this.fullscreenLoading = true
                let res = await axios.get('/api/getProductById', {
                    params: {
                        id: this.commentForm.id
                    }
                })
                this.product = res.data
                this.fullscreenLoading = false
            },
            uploadSucc(res) {   // 图片上传成功
                if(res.status === 200) {
                    this.commentForm.imgList.push(res.imgUrl)
                }
            },
            handlePictureChange(file, fileList) {   // el-upload数据发生变化
                this.hideUpload = fileList.length >= this.limitCount
            },
            handleRemove(file, fileList) {  // 删除图片
                this.hideUpload = fileList.length >= this.limitCount
                let arr = []
                fileList.forEach(item => {
                    arr.push(item.response.imgUrl)
                })
                this.commentForm.imgList = arr
            },
            countExceed() {     // 超出数量限制
                this.$alert(`超出数量限制，最多上传${this.limitCount}张图片!`)
            },
            handlePictureCardPreview(file) {    // 预览图片
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleSubmitComment() { // 提交评论
                let a = this.commentForm
                if(a.rate === 0) {
                    this.tipText = '请为商品评分'
                    this.tipsVisible = true
                    return false
                } else {
                    this.fullscreenLoading = true
                    axios.post('/api/sendComment', {
                        commentForm: this.commentForm
                    }).then(res => {
                        this.fullscreenLoading = false
                        let data = res.data
                        if(data.addStatus === 200) {
                            this.$message({showClose: true,message: '评论成功',type: 'success',duration: 1500})
                            this.bus.$emit('updateOrder')
                            this.$router.replace('/order/all')
                        } else if(data.addStatus === 405) {
                            this.$message({showClose: true,message: '评论失败',type: 'error',duration: 1500})
                        }
                    }).catch(() => {
                        this.fullscreenLoading = false
                        this.$message({showClose: true,message: '评论失败',type: 'error',duration: 1500})
                    })
                }
            }
        },
        computed: {
            ...mapState(['token'])
        },
        created() {
            let query = this.$route.query
            this.commentForm.orderId = query.orderid
            this.commentForm.productId = query.productid
            this.commentForm.id = query.id
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .img-dialog >>> .el-dialog__close:hover
        color $activeColor
    .img-dialog::-webkit-scrollbar
        width 0 !important
        display none
    .el-textarea >>> .el-textarea__inner:focus
        border-color $activeColor
    .imgs-uploader >>> .el-upload--picture-card:hover
    .imgs-uploader >>> .el-upload:focus
        border-color $activeColor
        color $activeColor
    .imgs-uploader >>> .el-upload--picture-card
        width 80px
        height 80px
        line-height unset
        i
            position relative
            top 50%
            transform translateY(-50%)
    .imgs-uploader >>> .el-upload-list__item
        width 80px
        height 80px
    .imgs-uploader.hide-upload >>> .el-upload--picture-card
        display none
    .main-con
        height 100%
        background-color $bgc_1
        padding-bottom 40px
        .main
            width 1170px
            margin 0 auto
            .head
                text-align center
                padding 15px 0
                .title
                    font-size .32rem
                    font-weight 600
                .des
                    font-size .26rem
                    color $fontColor_intro
                    margin-top 5px
            .product
                width 100%
                background-color #ffffff
                &::before, &::after
                    content ""
                    display table
                &::after
                    clear both
                .l-col
                    width 320px
                    height 320px
                    float left
                    padding 50px
                    box-sizing border-box
                    display flex
                    flex-direction column
                    justify-content space-around
                    align-items center
                    .img-con
                        width 100px
                        height 100px
                        img
                            width 100%
                            height 100%
                    .name
                        width 100%
                        display inline-block
                        color #333333
                        font-size .24rem
                        text-overflow ellipsis
                        overflow hidden
                        white-space nowrap
                        text-align center
                        &:hover
                            color $activeColor
                    .price
                        font-size .28rem
                        font-weight 600
                    .attr
                        text-align center
                        font-size .24rem
                        color $fontColor_intro
                        p:first-child
                            margin-bottom 5px
                .r-col
                    width calc(100% - 320px)
                    min-height 320px
                    float right
                    border-left 1px solid $border
                    box-sizing border-box
                    .op
                        width 80%
                        min-height 320px
                        box-sizing border-box
                        margin 0 auto
                        padding 20px 0 30px
                        position relative
                        .el-textarea
                            margin-top 20px
                        .el-textarea >>> textarea
                            &::-webkit-scrollbar /*滚动条整体样式*/
                                width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
                            &::-webkit-scrollbar-thumb /*滚动条里面小方块*/
                               border-radius: 5px;
                               -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                               background-color: #e99c2e;
                            &::-webkit-scrollbar-track /*滚动条里面轨道*/
                                -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2)
                                border-radius: 0
                                background rgba(0, 0, 0, .6)
                        .imgs-uploader
                            margin-top 20px
                        .tips
                            color $activeColor
                            font-size .26rem
                            position absolute
                            bottom 10px
                            i
                                margin-right 10px
            .sub
                padding 20px 0
                margin-top 30px
                background-color #ffffff
                text-align center
                .el-button
                    width 25%
                    height 50px
                    font-size .36rem
    @media screen and (min-width: 992px) and (max-width: 1200px)
        .main-con .main
            width 970px
    @media screen and (min-width: 768px) and (max-width: 991px)
        .main-con .main
            width 100%
    @media screen and (max-width: 767px)
        .main-con .main
            width 100%
            .product
                display flex
                flex-direction column
                .l-col
                .r-col
                    width 100%
                .r-col
                    .op
                        width 100%
                        margin 0
                        padding-left 15px
                        padding-right 15px
            .sub
                padding 20px 15px
                .el-button
                    width 100%
</style>