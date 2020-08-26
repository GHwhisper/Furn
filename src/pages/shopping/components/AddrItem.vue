<template>
    <div class="addr-item-con" v-loading.fullscreen.lock="fullscreenLoading">
        <div :class="['receiver-tag', index === 0 ? 'is-checked' : '']" @click="handleChooseItem">{{addr.receiver}}</div>
        <div class="right">
            <div class="addr-detail">
                <span class="name">{{addr.receiver}}</span>
                <span class="phone">{{hidePhone(addr.phone)}}</span>
                <span class="addr-info">{{addr.area.province + ' ' + addr.area.city + ' ' + addr.area.area + ' ' + addr.addr}}</span>
                <el-tag v-if="addr.addressDefault" type="warning" size="mini">默认地址</el-tag>
            </div>
            <div class="opts">
                <el-button v-show="!addr.addressDefault" type="text" @click="handleSetDefault(addr.addressId)">设为默认</el-button>
                <el-button type="text" @click="handleEditAddr">编辑</el-button>
                <el-button v-show="index !== 0" type="text" @click="handleDelete(addr.addressId)">删除</el-button>
            </div>
        </div>
        <area-dialog :fullscreen="fullscreen" :addr="addr" :visible="editAddrDialogVisible" @closeDialog="handleCloseEditAreaDialog" />
    </div>
</template>

<script>
    import AreaDialog from 'common/dialog/AreaDialog'
    import { hidePhone } from 'js/utils'
    import { mapMutations } from 'vuex'
    import axios from "axios";
    export default {
        name: 'AddrItem',
        components: {
            AreaDialog
        },
        props: {
            addr: Object,
            index: Number,
            fullscreen: Boolean
        },
        data() {
            return {
                editAddrDialogVisible: false,
                fullscreenLoading: false
            }
        },
        methods: {
            hidePhone,
            handleEditAddr() {
                this.editAddrDialogVisible = true
            },
            handleCloseEditAreaDialog(data) {
                this.editAddrDialogVisible = data
            },
            handleSetDefault(addressId) {    // 设为默认
                this.fullscreenLoading = true
                axios.post('/api/setIsDefault', {
                    addressId: addressId
                }).then(res => {
                    let data = res.data
                    if(data.updateStatus === 200) {
                        this.$message({showClose: true,message: '设为默认成功',type: 'success',duration: 1500})
                        this.$emit('updateAddress')
                    } else if(data.updateStatus === 405) {
                        this.$message({showClose: true,message: '设置默认失败',type: 'success',duration: 1500})
                    }
                    this.fullscreenLoading = false
                }).catch(() => {
                    this.fullscreenLoading = false
                    this.$message({showClose: true,message: '设置默认失败',type: 'success',duration: 1500})
                })
            },
            handleDelete(addressId) {   // 删除地址
                this.$confirm('此操作将永久删除该地址，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    customClass: 'delete-confirm'
                }).then(() => {
                    this.fullscreenLoading = true
                    axios.post('/api/deleteAddress', {
                        addressId: addressId
                    }).then((res) => {
                        let data = res.data
                        if(data.deleteStatus === 200) {
                            this.$message({showClose: true,message: '删除成功',type: 'success',duration: 1500})
                            this.$emit('updateAddress')
                        } else if(data.deleteStatus === 405) {
                            this.$message({showClose: true,message: '删除失败',type: 'error',duration: 1500})
                        }
                        this.fullscreenLoading = false
                    }).catch(() =>{
                        this.fullscreenLoading = false
                        this.$message({showClose: true,message: '删除失败',type: 'error',duration: 1500})
                    })
                }).catch(() => {})
            },
            handleChooseItem() {    // 选择地址
                this.$emit('chooseItem', this.index)
                this.changeShoppingCurrentAddr(this.addr)
            },
            ...mapMutations(['changeShoppingCurrentAddr'])
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .addr-item-con
        margin 10px 0
        display flex
        flex-direction row
        .receiver-tag
            width 150px
            height 35px
            line-height 31px
            text-align center
            display inline-block
            border 2px solid $border
            box-sizing border-box
            font-size .26rem
            cursor pointer
            background-color #ffffff
            flex-shrink 0
            &:hover
                border-color $activeColor
        .is-checked
            border-color $activeColor
        .right
            width 100%
            display flex
            flex-direction row
            justify-content space-between
            margin-left 20px
            .addr-detail
                line-height 35px
                display inline-block
                color $fontColor
                span
                    margin-right 20px
                    font-size .26rem
            .opts
                height 35px
                display none
                flex-shrink 0
                .el-button
                    font-size .24rem
                    color $activeColor
            &:hover
                background-color #fffdea
                .addr-detail
                    background-color #fffdea
                .opts
                    display inline-block
    @media screen and (max-width: 767px)
        .addr-item-con
            flex-direction column
            margin-bottom 20px
            .right
                margin 0
                .opts
                    display inline-block
                    margin-left 10px
</style>

