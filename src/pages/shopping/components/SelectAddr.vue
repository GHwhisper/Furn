<template>
    <div class="con" v-loading.fullscreen.lock="fullscreenLoading">
        <div class="top"><span class="title">收货人信息</span><el-button type="text" @click="handleNewAddr">新增收货地址</el-button></div>
        <div v-if="addrList.length !== 0">
            <ul :class="{open: open}">
                <li v-for="(item, index) in addrList" :key="item.addressId">
                    <addr-item :fullscreen="fullscreen" :addr="item" :index="index" @chooseItem="handleChooseItem" @updateAddress="getAddrList" />
                </li>
            </ul>
            <div v-if="addrList.length > 1" class="arrow" @click="handleToggle">
                <i v-show="!open" class="el-icon-arrow-down" />
                <i v-show="open" class="el-icon-arrow-up" />
            </div>
        </div>
        <div v-else class="none-tips">暂无收货地址，请添加~</div>
        <area-dialog :fullscreen="fullscreen" title="新增收货地址" :visible="newAddrDialogVisible" @closeDialog="handleCloseNewAreaDialog" />
    </div>
</template>

<script>
    import AreaDialog from 'common/dialog/AreaDialog'
    import AddrItem from './AddrItem'
    import axios from 'axios'
    import {mapMutations} from "vuex";
    export default {
        name: 'SelectAddr',
        components: {
            AreaDialog,
            AddrItem
        },
        props: {
            fullscreen: {
                type: Boolean
            }
        },
        data() {
            return {
                addrList: [],       // 地址信息列表
                currentAddrInfo: {},    // 当前地址信息
                newAddrDialogVisible: false,
                open: false,    // 地址选项是否展开
                fullscreenLoading: false
            }
        },
        mounted() {
            this.getAddrList()
        },
        methods: {
            async getAddrList() {
                this.fullscreenLoading = true
                let res = await axios.get('/api/showShippingAddress')
                this.addrList = res.data
                if(this.addrList.length !== 0) {
                    this.changeShoppingCurrentAddr(this.addrList[0])
                }
                this.fullscreenLoading = false
            },
            handleNewAddr() {
                this.newAddrDialogVisible = true
            },
            handleCloseNewAreaDialog(data) {
                this.newAddrDialogVisible = data
            },
            handleChooseItem(data) {
                this.open = false
                let item = this.addrList[data]
                this.addrList.splice(data, 1)
                this.addrList.unshift(item)
            },
            handleToggle() {    // 控制地址选项展开或收起
                this.open = !this.open
            },
            ...mapMutations(['changeShoppingCurrentAddr'])
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .con
        padding 10px 0 20px
        .top
            padding 10px 0
            .title
                font-weight 600
            .el-button
                padding 0
                float right
                font-size .26rem
                color $activeColor
        ul
            li:not(:first-child)
                display none
        ul.open
            li
                display block
        .arrow
            display inline-block
            padding-left 10px
            i
                font-size .4rem
                margin-top 15px
                color $fontColor_intro
        .none-tips
            color $fontColor_intro
            font-size .26rem
            margin-top 10px
            padding 0 10px
</style>