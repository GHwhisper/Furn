<template>
    <el-container direction="vertical">
        <page-header>
            <template #name>购物车</template>
        </page-header>
        <el-main>
            <el-row type="flex" justify="center">
                <el-col>
                    <div class="all-con">
                        <em class="all-products">全部商品 {{goodsTypes}}</em>
                        <el-button v-if="!show" class="edit-text" type="text" @click="handleEditToggle">{{showEdit ? '完成' : '编辑'}}</el-button>
                    </div>
                    <!-- 平板、pc购物车列表start -->
                    <el-table
                            v-if="show"
                            ref="multipleTable"
                            :data="cartList"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange"
                            v-loading="loading"
                    >
                        <el-table-column type="selection" />
                        <el-table-column :width="productW" label="商品" header-align="center">
                            <template slot-scope="scope">
                                <div class="product">
                                    <img :src="scope.row.img" alt="">
                                    <div class="product-con-r">
                                        <div class="product-name">
                                            <router-link :to="{path: `/product/detail/${scope.row.productId}`, query: {skuid: scope.row.id}}">{{scope.row.name}}</router-link>
                                        </div>
                                        <div class="product-cs">
                                            <p>{{scope.row.color}}</p>
                                            <p>{{scope.row.size}}</p>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column :width="priceW" class-name="price"  label="单价" align="right">
                            <template slot-scope="scope">
                                <div>￥{{scope.row.price.toFixed(2)}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column :width="quantityW" label="数量" header-align="center">
                            <template slot-scope="scope">
                                <el-input-number
                                        v-model="scope.row.num"
                                        :min="1"
                                        :max="100"
                                        :step="1"
                                        step-strictly
                                        size="mini"
                                >
                                </el-input-number>
                            </template>
                        </el-table-column>
                        <el-table-column :width="subtotalW" class-name="subtotal" label="小计" align="right">
                            <template slot-scope="scope">
                                <strong>￥{{(scope.row.price*scope.row.num).toFixed(2)}}</strong>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <div class="operation">
                                    <el-button type="text" @click="handleItemDelete(scope.row.shoppingCartId)">删除</el-button>
                                    <el-button type="text" @click="handleItemAddToCollection(scope.row.shoppingCartId)">移至收藏</el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 平板、pc端购物车end -->
                    <!-- 手机端购物车列表start -->
                    <el-table
                            v-else
                            ref="multipleTable"
                            :data="cartList"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange"
                            v-loading="loading"
                    >
                        <el-table-column width="25" type="selection" />
                        <el-table-column>
                            <template slot-scope="scope">
                                <div class="phone-product">
                                    <img :src="scope.row.img" alt="">
                                    <div class="phone-product-con-r">
                                        <div class="phone-product-name"><router-link :to="{path: `/product/detail/${scope.row.productId}`, query: {skuid: scope.row.id}}">{{scope.row.name}}</router-link></div>
                                        <div class="phone-product-cs">{{scope.row.color}} {{scope.row.size}}</div>
                                        <div class="phone-product-pn">
                                            <span>￥{{scope.row.price.toFixed(2)}}</span>
                                            <el-input-number
                                                    v-model="scope.row.num"
                                                    :min="1"
                                                    :max="100"
                                                    :step="1"
                                                    step-strictly
                                                    size="mini"
                                            >
                                            </el-input-number>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 手机端购物车列表start -->
                    <!-- 购物车底部操作栏start -->
                    <div class="cart-toolbar">
                        <div class="toolbar-left">
                            <el-checkbox
                                    v-model="checkAll"
                                    @change="handleCheckAllChange(cartList)"
                                    :indeterminate="isIndeterminate"
                                    :disabled="cartList.length === 0"
                            >{{cartList.length > checkedList.length ? '全选' : '取消'}}</el-checkbox>
                            <div class="operations" v-if="show">
                                <el-button type="text" @click="handleBatchDelete" :disabled="checkedList.length === 0">删除选中商品</el-button>
                                <el-button type="text" @click="handleBatchCollect" :disabled="checkedList.length === 0">移到我的收藏</el-button>
                            </div>
                        </div>
                        <div v-if="!show && showEdit" class="edit-right">
                            <el-button round size="mini" @click="handleBatchCollect" :disabled="checkedList.length === 0">移至收藏</el-button>
                            <el-button type="warning" round size="mini" @click="handleBatchDelete" :disabled="checkedList.length === 0">删除</el-button>
                        </div>
                        <div v-else class="toolbar-right">
                            <div class="quantity" v-if="show">已选择&nbsp;<span>{{quantity}}</span>&nbsp;件商品</div>
                            <div class="total">
                                <div>
                                    <span class="total-text">合计：</span>
                                    <em>￥{{totalCost.toFixed(2)}}</em>
                                    <el-tooltip v-if="show" content="不含运费及送装服务费" placement="top" effect="light">
                                        <i class="el-icon-info" />
                                    </el-tooltip>
                                </div>
                                <div v-if="show">
                                    <span class="discount">优惠：-￥0.00</span>
                                </div>
                            </div>
                            <el-button type="warning" @click="toShopping" :disabled="checkedList.length === 0">去结算<span v-if="!show">({{quantity}}件)</span></el-button>
                        </div>
                    </div>
                    <!-- 购物车底部操作栏end -->
                </el-col>
            </el-row>
        </el-main>
        <nav-tab-bar v-if="!show" />
    </el-container>
</template>

<script>
    import PageHeader from 'common/header/PageHeader'
    import NavTabBar from 'common/navtab/NavTabBar'
    import axios from 'axios'
    import { mapMutations } from 'vuex'
    export default {
        name: 'Cart',
        components: {
            PageHeader,
            NavTabBar
        },
        props: {

        },
        data() {
            return {
                cartList: [],       // 购物车列表
                checkAll: false,    // 是否全选(toolbar-left中的el-checkbox)
                isIndeterminate: false, // 未全选时(toolbar-left中的el-checkbox)
                checkedList: [],    // 被选中的商品列表,即多选的数据
                idList: [],    // 需要收藏或删除的购物车项id
                productW: 460,  // 商品列宽
                priceW: 220,    // 单价列宽
                quantityW: 140, // 数量列宽
                subtotalW: 180, // 小计列宽
                screenWidth: window.innerWidth, //浏览器宽度
                show: true,     // 控制cartbar-left中的操作、cartbar-right中的数目/优惠/提示等是否显示,控制手机端购物车是否显示
                showEdit: false, // 控制超小屏是edit-right中的多项编辑
                loading: true
            }
        },
        mounted() {
            window.onresize = ()=> {
                return (()=> {
                    this.screenWidth = window.innerWidth
                })()
            }
            this.getCartData()
            this.setWidth()
        },
        methods: {
            async getCartData() { // 请求购物车数据
                try {
                    this.loading = true
                    let res = await axios.get('/api/showShoppingCat')
                    this.cartList = res.data
                    this.loading = false
                } catch (e) {
                    this.loading = false
                }
            },
            deleteData(list) {  // 请求删除购物车中物品
                this.$confirm('确认删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.post('/api/deleteShoppingCat', {
                        shoppingCatIds: list
                    }).then((res) => {
                        let data = res.data
                        if(data.deleteStatus === true) {
                            this.bus.$emit('updateCart')    // 更新导航栏中购物车数据
                            this.getCartData()
                        } else {
                            this.$message({showClose: true, message: '删除失败', type: 'error', duration: 1500})
                        }
                    }).catch(() => {})
                }).catch(() => {})
            },
            addToCollection(list) { // 移至收藏(从购物车移到收藏，还需要将商品从购物车移除,后端做两步)
                this.$confirm('确认移至收藏吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.post('/api/addToFavorites', {
                        shoppingCatIds: list
                    }).then((res) => {
                        if(res.data.addStatus === 200) {
                            this.$message({showClose: true, message: '移至收藏成功', type: 'success', duration: 1500})
                            this.bus.$emit('updateCart')    // 更新导航栏中购物车数据
                            this.getCartData()
                        } else {
                            this.$message({showClose: true, message: '移至收藏失败', type: 'error', duration: 1500})
                        }
                    }).catch(() => {})
                }).catch(() => {})
            },
            handleItemDelete(id) {  // 删除单个商品
                this.deleteData(this.getItemIdList(id))
            },
            handleItemAddToCollection(id) { // 收藏单个商品
                this.addToCollection(this.getItemIdList(id))
            },
            handleBatchDelete() {   // 批量删除
                this.deleteData(this.getCheckedIdList())
            },
            handleBatchCollect() {  // 批量收藏
                this.addToCollection(this.getCheckedIdList())
            },
            getItemIdList(id) {     // 获取购物车项id,收藏/删除单个商品时使用
                this.idList = []
                this.idList.push(id)
                return this.idList
            },
            getCheckedIdList() {    // 获取批量收藏/删除时商品的id
                this.idList = []
                this.checkedList.forEach(item => {
                    this.idList.push(item.shoppingCartId)
                })
                return this.idList
            },
            handleSelectionChange(value) {   // el-table选项变化时,checkedList跟着改变
                this.checkedList = value
                this.checkAll = value.length === this.cartList.length
                this.isIndeterminate = value.length > 0 && !this.checkAll
            },
            handleCheckAllChange(rows) {    // 全选框(toolbar-left中的el-checkbox)
                if(rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleAllSelection(row)
                    })
                } else {
                    this.$refs.multipleTable.clearSelection()
                }
            },
            handleEditToggle() {    // 切换编辑栏
                this.showEdit = !this.showEdit
            },
            setWidth() {
                let sw = this.screenWidth
                if(sw >= 1200) {
                    this.show = true
                    this.productW = 460
                    this.priceW = 220
                    this.quantityW = 140
                    this.subtotalW = 180
                }else if(sw >=992 && sw < 1200) {
                    this.show = true
                    this.productW = 420
                    this.priceW = 120
                    this.quantityW = 120
                    this.subtotalW = 130
                }else if(sw >=768 && sw < 992) {
                    this.show = true
                    let x = 992 - 768   // 响应区间
                    let swDValue = sw - 768 // 当前宽度与768的差值
                    this.productW = 270 + ((420 - 270) / x) * swDValue
                    this.priceW = 110 + ((120 - 110) / x) * swDValue
                    this.quantityW = 100 + ((120 - 100) / x) * swDValue
                    this.subtotalW = 120 + ((130 - 120) / x) * swDValue
                    this.showEdit = false
                }else{
                    this.show = false
                }
            },
            toShopping() {
                this.changeCartCheckedList(this.checkedList)
                this.$router.push({ path: '/shopping' })
            },
            ...mapMutations(['changeCartCheckedList'])
        },
        computed: {
            goodsTypes() {  // 商品项数
                let typeNum = this.cartList.length
                return typeNum
            },
            totalCost() {   // 购物车合计
                let total = 0
                this.checkedList.forEach(item => {
                    total += item.num * item.price
                })
                return total
            },
            // discount() {    // 折扣合计
            //     let discount = 0
            //     this.checkedList.forEach(item => {
            //         discount += item.num * item.discount
            //     })
            //     return discount
            // },
            quantity() {    // 商品总件数
                let num = 0
                this.checkedList.forEach(item => {
                    num += item.num
                })
                return num
            }
        },
        watch: {
            screenWidth(val) {
                this.screenWidth = val
                this.setWidth()
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .el-table >>> .el-checkbox__input.is-focus .el-checkbox__inner
    .el-table >>> .el-checkbox__inner:hover
    .el-input-number >>> .el-input-number__decrease:hover:not(.is-disabled)~.el-input .el-input__inner:not(.is-disabled)
    .el-input-number >>> .el-input-number__increase:hover:not(.is-disabled)~.el-input .el-input__inner:not(.is-disabled)
    .el-input-number >>> .el-input__inner:focus
    .el-checkbox >>> .el-checkbox__input.is-focus .el-checkbox__inner
    .el-checkbox >>> .el-checkbox__inner:hover
        border-color $activeColor
    .el-table >>> .el-checkbox__input.is-checked .el-checkbox__inner
    .el-table >>> .el-checkbox__input.is-indeterminate .el-checkbox__inner
    .el-checkbox >>> .el-checkbox__input.is-checked .el-checkbox__inner
    .el-checkbox >>> .el-checkbox__input.is-indeterminate .el-checkbox__inner
        background-color $activeColor
        border-color $activeColor
    .el-input-number >>> .el-input-number__decrease:hover   // 减号:hover
    .el-input-number >>> .el-input-number__increase:hover   // 加号:hover
        color $activeColor
    .el-main
        padding 0
        .el-col
            width 1170px
            .all-con
                .all-products
                    font-size .36rem
                    color $activeColor
                    border-bottom 1px solid $activeColor
                .edit-text
                    float right
                    font-size .26rem
                    color $fontColor
            .el-table
                /*& >>> .el-table__header .el-table-column--selection .cell .el-checkbox::after*/
                /*    content '全选'*/
                /*    color #909399*/
                /*    font-size .24rem*/
                /*    font-weight bold*/
                /*    padding-left 5px*/
                .product
                    display flex
                    flex-direction row
                    img
                        width 80px
                        height 80px
                        flex-shrink 0
                    .product-con-r
                        width calc(100% - 80px)
                        display flex
                        flex-direction row
                        box-sizing border-box
                        padding-left 20px
                        .product-name
                            width 180px
                            box-sizing border-box
                            padding-right 10px
                            flex-shrink 0
                            a
                                color unset
                                cursor pointer
                                font-size .28rem
                                display -webkit-box
                                -webkit-box-orient vertical
                                -webkit-line-clamp 3
                                overflow hidden
                                &:hover
                                    color $activeColor
                        .product-cs
                            color $fontColor_intro
                            font-size .26rem
                & >>> .price
                    padding-right 50px
                .el-input-number
                    width 100%
                & >>> .subtotal
                    padding-right 50px
                    strong
                        font-weight 600
                .operation
                    .el-button
                        font-size .26rem
                        cursor pointer
                        color $fontColor_intro
                        display block
                        margin 0
                        padding 5px 0
                        &:hover
                            color $activeColor
            // 购物车底部工具栏
            .cart-toolbar
                height 50px
                background-color: $bgc_1
                margin-top 30px
                position relative
                border 1px solid $border
                box-sizing border-box
                margin-bottom 80px
                .toolbar-left
                    height 100%
                    float left
                    display flex
                    flex-direction row
                    align-items center
                    .el-checkbox
                        margin-left 10px
                        & >>> .el-checkbox__label
                            font-size .26rem
                            color $fontColor_intro
                    .operations
                        .el-button
                            margin-left 10px
                            cursor pointer
                            color $fontColor_intro
                            font-size .26rem
                            &:hover
                                color $activeColor
                .toolbar-right
                    height 100%
                    float right
                    display flex
                    flex-direction row
                    align-items center
                    color $fontColor_intro
                    font-size .24rem
                    .quantity
                        margin-right 20px
                        position relative
                        top -7px
                        span
                            color $activeColor
                            font-family Verdana
                            font-size .28rem
                    .total
                        margin-right 20px
                        text-align right
                        div:first-child
                            em
                                color $activeColor
                                font-size .32rem
                                font-weight 700
                                font-family Verdana
                            i
                                margin-left 5px
                                font-size .32rem
                        div:last-child
                            span
                                color $fontColor-name
                    .el-button
                        height calc(100% + 2px)
                        font-weight 600
                        font-size .4rem
                        color #ffffff
                        cursor pointer
                        padding 0 15px
                        border 0
                        span
                            font-size .2rem
                            font-weight normal
    @media screen and (min-width: 992px) and (max-width: 1200px)
        .el-main .el-col
            width 970px
            .el-table
                & >>> .price
                & >>> .subtotal
                    padding-right 20px
                .product .product-con-r .product-name
                    width 170px
    @media screen and (min-width: 768px) and (max-width: 991px)
        .el-main .el-col
            width 100%
            padding 0 15px
            .el-table
                & >>> div.cell
                    padding 0
                .product
                    .product-con-r
                        flex-direction column
                        .product-name
                            width auto
                            padding 0
                & >>> .price
                & >>> .subtotal
                    padding-left 10px
                    padding-right 20px
    @media screen and (max-width: 767px)
        .el-main
            padding-bottom 110px
            .el-col
                width 100%
                padding 0 10px
                .all-con
                    display flex
                    flex-direction row
                    justify-content space-between
                    align-items center
                .el-table
                    & >>> div.cell
                        padding 0
                    .phone-product
                        display flex
                        flex-direction row
                        img
                            width 60px
                            height 60px
                        .phone-product-con-r
                            width calc(100% - 60px)
                            padding-left 10px
                            .phone-product-name
                                display -webkit-box
                                -webkit-box-orient vertical
                                -webkit-line-clamp 2
                                overflow hidden
                                font-size .24rem
                                line-height .3rem
                                a
                                    color unset
                            .phone-product-cs
                                font-size .2rem
                                color $fontColor_intro
                            .phone-product-pn
                                display flex
                                flex-direction row
                                justify-content space-between
                                span
                                    color $activeColor
                                    font-size .28rem
                                .el-input-number
                                    width 100px
                .cart-toolbar
                    width 100%
                    height 40px
                    position fixed
                    right 0
                    bottom 50px
                    left 0
                    margin-top 0
                    margin-bottom 0
                    z-index 10001
                    .toolbar-right
                        .total
                            margin-right 10px
                            div:first-child em
                                font-size .26rem
                        button
                            font-size .26rem
                            padding 0 10px
                    .edit-right
                        height 100%
                        float right
                        margin-right 10px
                        display flex
                        flex-direction row
                        align-items center
</style>