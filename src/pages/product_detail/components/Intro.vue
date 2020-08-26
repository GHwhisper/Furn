<template>
    <div class="intro-con" v-loading.fullscreen.lock="fullscreenLoading">
        <div class="preview-wrap">
            <div class="zoom-img"
                 ref="zoomImg"
                 @mouseover="handleZoomImgHover"
                 @mouseout="handleZoomImgOut"
                 @mousemove="handleZoomImgMove"
            >
                <img :src="curtImg ? curtImg : goodImgs[0]" alt="">
                <div class="magnifier" ref="magnifier" v-show="zoomImgHover"></div>
            </div>
            <div class="big-img" ref="bigImg" v-show="zoomImgHover">
                <img ref="enlargedView" :src="curtImg ? curtImg : goodImgs[0]" alt="">
            </div>
            <div class="thumbnail-con">
                <i class="el-icon-arrow-left arrow-prev" @click="handleLeftClick" />
                <i class="el-icon-arrow-right arrow-next" @click="handleRightClick" />
                <div class="list-con" ref="listCon">
                    <ul class="img-list" :style="{width: imgListWidth + 'px', left: imgListLeft + 'px', right: imgListRight + 'px'}" ref="imgList">
                        <li :class="index === curtIndex ? 'img-hover' : ''" v-for="(item, index) in goodImgs" :key="index" @mouseover="viewPic(index, item)">
                            <img :src="item" :alt="item">
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="info-wrap">
            <div class="product-rate">
                <el-rate disabled :value="productInfo.rate" show-score text-color="#ff9900" />
                <span class="comment" @click="viewComment">查看所有评论</span>
            </div>
            <h1 class="product-name">{{productInfo.name}}</h1>
            <div class="product-praise">{{productInfo.praise}}</div>
            <h3 class="product-price">￥{{price.toFixed(2)}}
<!--                <del class="original-price">499.00</del>-->
            </h3>
            <div class="product-block description">
                <h4 class="title">商品简介</h4>
                <p class="des-content">{{productInfo.description}}</p>
            </div>
            <div class="product-block styles">
                <h4 class="title">选择颜色</h4>
                <div class="selections">
                    <ul class="style-list">
                        <li
                            :class="curtStyleIndex === index ? 'list-item selected' : 'list-item'"
                            v-for="(item, index) in colors"
                            :key="index"
                            @click="handleSelectProductStyle(index)"
                        >
                            <div class="img-con"><img :src="item" alt=""></div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="product-block size">
                <h4 class="title">选择尺寸</h4>
                <div class="selections">
                    <el-select value-key="id" v-model="sizeValue" placeholder="请选择尺寸" @change="selectChange">
                        <el-option
                            v-for="item in sizeOptions"
                            :key="item.id"
                            :label="item.value"
                            :value="item"
                        >
                            <span style="float: left">{{ item.value }}</span>
                            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
                        </el-option>
                    </el-select>
                    <el-input-number
                            v-model="quantity"
                            controls-position="right"
                            :min="1"
                            :max="100"
                            :step="1"
                            step-strictly
                    >
                    </el-input-number>
                </div>
            </div>
            <div class="add-to-cart">
                <el-button type="warning" round @click="handleAddToCollection(productInfo.productId)">添加收藏<i class="el-icon-arrow-right el-icon--right" /></el-button>
                <el-button type="warning" round @click="handleAddToCart(productInfo.productId)">加入购物车<i class="el-icon-arrow-right el-icon--right" /></el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import { mapState, mapMutations } from 'vuex'
    export default {
        name: 'ProductIntro',
        props: {
            productInfo: Object
        },
        data() {
            return {
                routeSkuId: '', // 路径上的skuid
                id: '',     // 要购买的商品的id
                styleOptions: [],   // 风格选项拷贝
                curtStyleIndex: 0,  // 当前风格下标
                curtIndex: 0, // 当前缩略图下标
                curtImg: '', // 当前查看的图片路径
                currentStyle:{},   // 当前所选颜色的所有数据对象,
                sizeValue: '', // 尺寸
                quantity: 1, // 商品数量
                price: 0,
                listConWidth: 0,
                imgListWidth: 0,  // 预览图片列表宽度
                imgListLeft: 0,  // 预览图片列表左侧相对距离
                imgListRight: Number,
                scale: 3, // 预览放大比例
                zoomImgW: 0,    // 原图width
                ZoomImgH: 0,
                magW: 0,    // 放大镜width
                magH: 0,
                largeViewW: 0,  // 大图width
                largeViewH: 0,
                zoomImgHover: false,
                rSpace: 0,
                screenWidth: window.innerWidth, //浏览器宽度
                fullscreenLoading: false
            }
        },
        methods: {
            handleAddToCart() {     // 加入购物车
                if(!this.token) {
                    this.$message({showClose: true,message: '您当前未登录,请登录后继续操作',type: 'warning',duration: 1500})
                    setTimeout(() => {this.$router.push('/login')}, 500)
                } else {
                    if (this.sizeValue){
                        this.fullscreenLoading = true
                        axios.post('/api/addShoppingCat', {
                            productId: this.productInfo.productId,
                            id: this.id,
                            num: this.quantity
                        }).then(res => {
                            let data = res.data
                            if(data.addStatus === 200) {
                                this.bus.$emit('updateCart')
                                this.changeCurrentProduct({
                                    product: {
                                        productId: this.productInfo.productId,
                                        id: this.id,
                                        name: this.productInfo.name,
                                        img: this.currentStyle.imgs[0],
                                        price: this.price,
                                        size: this.sizeValue,
                                        color: this.currentStyle.color
                                    },
                                    num: this.quantity
                                })
                                this.$router.push('/addsucc')
                            }
                            if(data.addStatus === 405) {
                                this.$message({showClose: true, message: '添加购物车失败，请重试', type: 'warning', duration: 1500})
                            }
                            this.fullscreenLoading = false
                        }).catch(e => {
                            this.fullscreenLoading = false
                            console.log(e)
                        })
                    } else {
                        this.$message({showClose: true, message: '请选择尺寸、数量', type: 'warning', duration: 1500})
                    }
                }
            },
            handleAddToCollection() {   // 加入收藏
                if(!this.token) {
                    this.$message({showClose: true,message: '您当前未登录,请登录后继续操作',type: 'warning',duration: 1500})
                    setTimeout(() => {this.$router.push('/login')}, 500)
                } else {
                    if (this.sizeValue){
                        this.fullscreenLoading = true
                        axios.post('/api/addFavorite', {
                            productId: this.productInfo.productId,
                            id: this.id
                        }).then(res => {
                            let data = res.data
                            if(data.addStatus === 200) {
                                this.$message({showClose: true, message: '收藏成功', type: 'success', duration: 1500})
                            } else if(data.addStatus === 404) {
                                this.$message({showClose: true, message: '已在收藏夹', type: 'success', duration: 1500})
                            } else if(data.addStatus === 405) {
                                this.$message({showClose: true, message: '添加收藏失败，请重试', type: 'warning', duration: 1500})
                            }
                            this.fullscreenLoading = false
                        }).catch(e => {
                            this.fullscreenLoading = false
                            console.log(e)
                        })
                    } else {
                        this.$message({showClose: true, message: '请选择尺寸、数量', type: 'warning', duration: 1500})
                    }
                }
            },
            viewPic(index, imgSrc) {    // 查看当前缩略图的大图
                this.curtIndex = index
                this.curtImg = imgSrc
            },
            handleLeftClick() {     // 点击左箭头，将ul右移，查看左侧被遮住的缩略图
                if(this.imgListLeft < 0) {
                    this.imgListLeft += 95
                    this.rSpace += 95
                }
            },
            handleRightClick() {      // 点击右箭头，将ul左移，查看右侧被遮住的缩略图
                if(this.rSpace > 0) {
                    this.imgListLeft -= 95
                    this.rSpace -= 95
                }
            },
            handleZoomImgHover() {
                this.zoomImgHover = true
            },
            handleZoomImgOut() {
                this.zoomImgHover = false
            },
            handleZoomImgMove(e) {
                // e = e || window.event;
                const zoomImg = this.$refs.zoomImg,
                    enlargedView = this.$refs.enlargedView,
                    magnifier = this.$refs.magnifier
                let scrollTop = document.documentElement.scrollTop  || document.body.scrollTop
                let x = e.clientX - magnifier.offsetWidth / 2 - this.getOffsetLeft(zoomImg)
                let y = e.clientY - magnifier.offsetHeight / 2 - this.getOffsetTop(zoomImg) + scrollTop
                if(x <= 0){            //左侧边界判断
                    x = 0;
                }
                if(y <= 0){            //顶部边界判断
                    y = 0;
                }
                if(x >= this.zoomImgW - magnifier.offsetWidth){
                    x = this.zoomImgW - magnifier.offsetWidth     //右侧边界判断
                }
                if(y >= this.zoomImgH - magnifier.offsetHeight ){
                    y = this.zoomImgH - magnifier.offsetHeight        //底部边界判断
                }
                magnifier.style.left = x + "px";
                magnifier.style.top = y + "px";
                enlargedView.style.left = -x * this.scale + "px";    //图片默认位置为0 0左上角位置 需要反向才能两者相对显示
                enlargedView.style.top = -y * this.scale + "px";
            },
            getOffsetTop(obj){  // 获取元素顶部距离浏览器视口上边框的距离
                let tmp = obj.offsetTop;
                let node= obj.offsetParent;
                while(node!= null){
                    tmp += node.offsetTop;
                    node= node.offsetParent;
                }
                return tmp;
            },
            getOffsetLeft(obj){ // 获取元素左侧距离浏览器视口左边框的距离
                let tmp = obj.offsetLeft;
                let node= obj.offsetParent;
                while(node!= null){
                    tmp += node.offsetLeft;
                    node= node.offsetParent;
                }
                return tmp;
            },
            handleSelectProductStyle(index) {
                this.currentStyle = this.styleOptions[index]
                this.curtStyleIndex = index
            },
            selectChange(value) {
                this.id = value.id
                this.price = value.price
            },
            initZoomPreview() {
                // 放大
                const zoomImg = this.$refs.zoomImg,
                    enlargedView = this.$refs.enlargedView,
                    magnifier = this.$refs.magnifier
                this.zoomImgW = zoomImg.offsetWidth
                this.zoomImgH = this.$refs.zoomImg.offsetHeight
                this.largeViewW = enlargedView.offsetWidth
                this.largeViewH = enlargedView.offsetHeight
                magnifier.style.width = this.zoomImgW / this.scale + 'px'
                magnifier.style.height = this.zoomImgH / this.scale + 'px'
                enlargedView.style.width = this.zoomImgW * this.scale + 'px'
                enlargedView.style.height = this.zoomImgH * this.scale + 'px'
            },
            viewComment() {
                this.$emit('scrollToComment')
                this.bus.$emit('viewComment')
            },
            ...mapMutations(['changeCurrentProduct'])
        },
        mounted() {
            this.listConWidth = this.$refs.listCon.offsetWidth
            this.initZoomPreview()
        },
        watch: {
            productInfo() {    // 监听接收的商品信息改变
                this.styleOptions = this.productInfo.styleOptions   // 拷贝风格(颜色尺寸)选项
                // console.log(this.styleOptions)
                for(let i = 0, iLen = this.styleOptions.length; i < iLen; i++) {
                    for(let j = 0, jLen = this.styleOptions[i].sizeOptions.length; j < jLen; j++) {
                        if(this.styleOptions[i].sizeOptions[j].id === this.routeSkuId) {
                            this.curtStyleIndex = i     // 设置用户当前点击的sku商品，是该页面中的哪一个，就切换到对应的商品
                        }
                    }
                }
                this.currentStyle = this.styleOptions[this.curtStyleIndex]   // 初始化当前选中风格（颜色）
            },
            sizeOptions() {
                this.id = this.sizeOptions[0].id
                this.price = this.sizeOptions[0].price
                this.sizeValue = this.sizeOptions[0].value
            },
            goodImgs() {
                this.curtIndex = 0
                this.curtImg = this.goodImgs[0]
                this.imgListLeft = 0
                this.imgListWidth = 95 * this.goodImgs.length
                this.rSpace = this.imgListWidth - this.listConWidth
            },
            screenWidth() { // 监听页面宽度变化
                this.imgListLeft = 0
                this.listConWidth = this.$refs.listCon.offsetWidth
                this.rSpace = this.imgListWidth - this.listConWidth
            }
        },
        computed: {
            colors() {  // 颜色选项封面
                let arr = []
                for(let i = 0, len = this.styleOptions.length; i < len; i ++) {
                    arr.push(this.styleOptions[i].imgs[0])
                }
                return arr
            },
            sizeOptions() {     // 尺寸价格
                return this.currentStyle.sizeOptions
            },
            goodImgs() {    // 当前颜色商品的图片
                return this.currentStyle.imgs ? this.currentStyle.imgs : []
            },
            ...mapState(['token'])
        },
        created() {
            window.onresize = ()=> {
                return (()=> {
                    this.screenWidth = window.innerWidth
                })()
            }
            this.routeSkuId = this.$route.query.skuid
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    // start--修改el-select,el-input-number组件样式
    .el-select >>> .el-input.is-focus .el-input__inner // el-select获得再失去焦点
    .el-select >>> .el-input__inner:focus   // el-select焦点
    .el-input-number >>> .el-input__inner:focus // el-input-number焦点
    .el-input-number >>> .el-input-number__increase:hover:not(.is-disabled)~.el-input .el-input__inner:not(.is-disabled)    // 可用的增加按钮:hover时，可用的.el-input__inner
    .el-input-number >>> .el-input-number__decrease:hover:not(.is-disabled)~.el-input .el-input__inner:not(.is-disabled)    // 可用的减少按钮:hover时
        border-color $activeColor
    .el-select-dropdown__item.selected  // el-select下拉选项选中时
    .el-input-number >>> span[role="button"]:not(.is-disabled):hover    // el-input-number加减按钮:hover时
        color $activeColor
    // end--修改el-select,el-input-number组件样式
    .intro-con
        width 1170px
        margin 3.5rem auto 0
        &:before
        &:after
            content ''
            display table
            clear both
        .preview-wrap   // 左侧商品预览
            width 470px
            height 100%
            float left
            position relative
            .zoom-img
                width 470px
                height 470px
                background-color $bgc_1
                overflow hidden
                position relative
                img
                    width 100%
                    height 100%
                .magnifier
                    position absolute
                    top 0
                    left 0
                    background-color: rgba(255, 242, 134, 0.76)
                    cursor move
            .big-img
                width 470px
                height 470px
                position absolute
                top 0
                left 480px
                background-color: $bgc_1
                overflow hidden
                z-index 100
                img
                    position absolute
                    top 0
                    left: 0
            .thumbnail-con
                width 100%
                margin .4rem 0 0
                display flex
                flex-direction row
                justify-content center
                align-items center
                position relative
                padding 0 36.5px
                box-sizing border-box
                .arrow-prev
                .arrow-next
                    font-size .5rem
                    cursor pointer
                    position absolute
                    font-weight bold
                    &:hover
                        color $activeColor
                .arrow-prev
                    left 0
                .arrow-next
                    right 0
                .list-con
                    width 380px
                    height 1.6rem
                    overflow hidden
                    position relative
                    .img-list
                        height 1.6rem
                        display flex
                        flex-direction row
                        position absolute
                        left 0
                        transition left ease-in-out .3s, right ease-in-out .3s
                        li
                            width 1.6rem
                            height 100%
                            margin 0 .15rem
                            box-sizing border-box
                            border 3px solid transparent
                            img
                                width 74px
                                height 100%
                        li.img-hover
                            border-color $activeColor
        .info-wrap  // 右侧商品信息
            width 700px
            float right
            padding 0 0 0 .6rem
            box-sizing border-box
            .product-rate // 评分
                font-size .3rem
                display flex
                flex-direction row
                justify-content space-between
                align-items center
                .el-rate
                    transform scale(1.2)
                    transform-origin 0 0
                .comment
                    color $fontColor_intro
                    transition color linear .2s
                    cursor pointer
                    &:hover
                        color $activeColor
            .product-name // 名称
                margin .4rem 0 0
                color $fontColor-name
                font-size .6rem
                font-weight bold
            .product-praise // 推荐语
                color $fontColor_intro
                font-size .3rem
                margin .2rem 0 0
            .product-price  // 价格
                color $activeColor
                font-family Roboto, sans-serif
                font-size .55rem
                margin .7rem 0 0
                .original-price
                    color $fontColor-del
                    margin-left .2rem
                    font-size .4rem
                    text-decoration line-through
            .product-block  // 简介、颜色、尺寸等
                margin .4rem 0 .6rem
                .title
                    font-size .35rem
                    color $fontColor
                    padding-bottom .2rem
                    border-bottom 1px solid $border
                    margin 0 0 .3rem
                .des-content
                    font-size .3rem
                    color $fontColor_intro
                    line-height 1.5
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                .selections
                    .style-list
                        &:before
                        &:after
                            content ''
                            display table
                            clear: both
                        .list-item
                            float left
                            margin 0 10px 10px 0
                            .img-con
                                width 60px
                                height 60px
                                display inline-block
                                border 3px solid $border
                                box-sizing border-box
                                transition border-color ease .2s
                                img
                                    width 100%
                                    height 100%
                            &:hover
                                .img-con
                                    border-color $activeColor
                        .selected
                            .img-con
                                border-color $activeColor
                    .el-input-number
                        width 120px
                        margin-left .4rem
            .add-to-cart    // 加入购物车
                margin .8rem 0 0
                .el-button
                    font-size .35rem
    @media screen and (min-width: 992px) and (max-width: 1200px)
        .intro-con
            width 970px
            .preview-wrap
                width 390px
                .zoom-img
                    width 390px
                    height 390px
                .big-img
                    width 390px
                    height 390px
                    left 400px
            .info-wrap
                width 580px
        .list-con
            width 285px !important
    @media screen and (min-width: 768px) and (max-width: 991px)
        .intro-con
            width 100%
            .preview-wrap
                width 100%
                margin-bottom .5rem
                padding 0
                .zoom-img
                    width 100%
                    height auto
                    img
                        width 400px
                        height 400px
                        display block
                        margin 0 auto
                    .magnifier
                        display none
                .big-img
                    display none
                .thumbnail-con
                    .arrow-prev
                        left .3rem
                    .arrow-next
                        right .3rem
            .info-wrap
                width 100%
                padding 0 .3rem
    @media screen and (max-width: 767px)
        .intro-con
            width 100%
            .preview-wrap
                width 100%
                padding 0
                margin-bottom .5rem
                .zoom-img
                    width 100%
                    height auto
                    img
                        width 100%
                    .magnifier
                        display none
                .big-img
                    display none
            .info-wrap
                width 100%
                padding 0 .3rem
                .size
                    .selections
                        .el-select
                            width 100%
                        .el-input-number
                            width 100%
                            margin .2rem 0 0
                .add-to-cart
                    display flex
                    .el-button
                        width 50%
</style>