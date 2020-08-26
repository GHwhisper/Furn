<template>
    <div class="con" v-loading.fullscreen.lock="fullscreenLoading">
        <div class="head">
            <h3 class="title">{{addr.title ? addr.title : addr.receiver}}</h3>
            <el-tag v-if="addr.addressDefault" type="warning" effect="dark" size="small">默认地址</el-tag>
            <i class="el-icon-close del-icon" @click="handleDelete(addr.addressId)" />
        </div>
        <table class="info">
            <tr><td class="label">收货人：</td><td class="content">{{addr.receiver}}</td></tr>
            <tr><td class="label">所在地区：</td><td class="content">{{addr.area.province + addr.area.city + addr.area.area}}</td></tr>
            <tr><td class="label">地址：</td><td class="content">{{addr.addr}}</td></tr>
            <tr><td class="label">手机：</td><td class="content">{{addr.phone}}</td></tr>
            <tr><td class="label">电子邮箱：</td><td class="content">{{addr.email}}</td></tr>
        </table>
        <div class="foot">
            <el-button type="text" size="small" v-if="!addr.addressDefault" @click="handleSetDefault(addr.addressId)">设为默认</el-button>
            <el-button type="text" size="small" @click="handleEdit">编辑</el-button>
        </div>
        <area-dialog :visible="dialogVisible" :addr="addr" :fullscreen="fullscreen" @closeDialog="handleCloseDialog" />
    </div>
</template>

<script>
    import AreaDialog from 'common/dialog/AreaDialog'
    import axios from 'axios'
    export default {
        name: 'AddrItem',
        components: {
            AreaDialog
        },
        props: {
            addr: Object,
            fullscreen: {
                type: Boolean,
                default() {
                    return false
                }
            }
        },
        data() {
            return {
                dialogVisible: false,   // 对话框显隐
                fullscreenLoading: false
            }
        },
        methods: {
            handleEdit() {
                this.dialogVisible = true
            },
            handleCloseDialog(data) {
                this.dialogVisible = data
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
                        this.$message({showClose: true,message: '设置默认失败',type: 'error',duration: 1500})
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
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .con
        width 100%
        border 1px solid $border
        padding 15px 20px
        box-sizing border-box
        .head
            .title
                font-size .3rem
                font-weight 600
                display inline
                position relative
                top 2px
            .el-tag
                margin-left 20px
            i.del-icon
                font-size .28rem
                float right
                color $fontColor-del
                cursor pointer
                &:hover
                    color $activeColor
        table.info
            margin-top 20px
            tr
                line-height 1.5
                font-size .26rem
                td.label
                    color $fontColor_intro
                    width 70px
                    display inline-block
                    padding-right 5px
                    text-align right
        .foot
            display flex
            flex-direction row
            justify-content flex-end
            .el-button
                padding 0
                color $activeColor
</style>