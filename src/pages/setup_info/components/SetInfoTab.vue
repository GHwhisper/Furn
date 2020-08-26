<template>
    <el-tabs v-model="activeName" v-loading.fullscreen.lock="fullscreenLoading">
        <el-tab-pane class="info-pane" label="基本信息" name="first">
            <div class="info-item">
                <span class="label">用户名：</span>
                <strong class="username">{{userInfo.username}}</strong>
            </div>
            <div class="info-item">
                <span class="label">邮箱：</span>
                <strong class="username">{{hideEmailInfo(userInfo.email)}}</strong>
            </div>
            <div class="info-item">
                <span class="label">昵称：</span>
                <el-input v-model="userInfo.nickName" maxlength="20">{{userInfo.nickName}}</el-input>
            </div>
            <div class="info-item">
                <span class="label">性别：</span>
                <el-radio-group v-model="userInfo.sex">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="0">女</el-radio>
                    <el-radio :label="2">保密</el-radio>
                </el-radio-group>
            </div>
            <div class="info-item">
                <span class="label">生日：</span>
                <el-date-picker
                        v-model="userInfo.birthday"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions"
                />
            </div>
            <el-button class="info-submit-btn" type="warning" size="medium" @click="submitUserInfo">提交</el-button>
        </el-tab-pane>
        <el-tab-pane class="ava-pane" label="头像照片" name="second">
            <div class="side left-side">
                <h3>设置我的新头像</h3>
                <p class="tips">仅支持JPG,JPEG,PNG格式，文件小于2M</p>
                <el-upload
                        class="avatar-uploader"
                        accept="image/jpg,image/jpeg,image/png"
                        action="/api/imgUpload"
                        :headers="{ token: token }"
                        :limit="1"
                        :show-file-list="false"
                        :before-upload="beforeAvatarUpload"
                        :on-success="handleAvatarSuccess"
                        :data="userForm"
                        ref="avatarUpload"
                >
                    <img v-if="userInfo.avatarUrl || this.avatarUrl" class="avatar" :src="avatarUrl" alt="" />
                    <i v-else class="el-icon-plus avatar-uploader-icon" />
                </el-upload>
                <el-button class="avatar-save-btn" type="warning" size="medium" @click="saveAvatar">保存</el-button>
            </div>
            <div class="side right-side">
                <h3>效果预览</h3>
                <p class="tips">您上传的图片会自动生成2种尺寸，请注意小尺寸的头像是否清晰</p>
                <div class="previews">
                    <div class="group">
                        <div class="g-item"><el-avatar :size="102" :src="avatarUrl" shape="square" :key="avatarUrl" />100px * 100px</div>
                        <div class="g-item"><el-avatar :size="52" :src="avatarUrl" shape="square" :key="avatarUrl" />50px * 50px</div>
                    </div>
                    <div class="group">
                        <div class="g-item"><el-avatar :size="102" :src="avatarUrl" :key="avatarUrl" />100px * 100px</div>
                        <div class="g-item"><el-avatar :size="52" :src="avatarUrl" :key="avatarUrl" />50px * 50px</div>
                    </div>
                </div>
            </div>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import axios from 'axios'
    import { mapState } from 'vuex'
    import { hideEmailInfo } from 'js/utils'
    export default {
        name: 'SetInfoTab',
        props: {
            userInfo: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                activeName: 'first',
                avatarUrl: '',
                userForm: {
                    type: 'avatar'
                },
                pickerOptions: {    // 生日不可能超过当天
                    disabledDate(time) {
                        return time.getTime() > Date.now() - 8.64e6
                    }
                },
                fullscreenLoading: false
            }
        },
        methods: {
            hideEmailInfo,
            submitUserInfo() {  // 提交用户信息
                this.fullscreenLoading = true
                axios.post('/api/changeUser', {
                    userInfo: this.userInfo
                }).then(res => {
                    let data = res.data
                    if(data.updateStatus === 200) {
                        this.$message({showClose: true, message: '保存成功', type: 'success', duration: 1500})
                    } else if(data.updateStatus === 405) {
                        this.$message({showClose: true, message: '保存失败', type: 'error', duration: 1500})
                    }
                    this.fullscreenLoading = false
                }).catch(e => {
                    this.fullscreenLoading = false
                    console.log(e)
                })
            },
            handleAvatarSuccess(res) {
                if(res.status === 200) {
                    this.avatarUrl = res.imgUrl
                }
                this.$refs.avatarUpload.clearFiles()
            },
            saveAvatar() {  // 设置头像
                this.fullscreenLoading = true
                axios.post('/api/addUserPhoto', {
                    imageUrl: this.avatarUrl
                }).then(res => {
                    let data = res.data
                    if(data.addStatus === 200) {
                        this.$message({showClose: true, message: '保存成功', type: 'success', duration: 1500})
                    } else if(data.addStatus === 405) {
                        this.$message({showClose: true, message: '保存失败', type: 'error', duration: 1500})
                    }
                    this.fullscreenLoading = false
                }).catch(() => {this.fullscreenLoading = false})
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg'
                const isPNG = file.type === 'image/png'
                const isLt2M = file.size / 1024 / 1024 < 2
                if (!isJPG && !isPNG) {
                    this.$message.error('上传头像图片只能是 JPG/JPEG/PNG 格式!')
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!')
                }
                return (isJPG || isPNG) && isLt2M
            }
        },
        watch: {
            userInfo() {
                this.avatarUrl = this.userInfo.avatarUrl
            }
        },
        computed: {
            ...mapState(['token'])
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .el-tabs >>> .el-tabs__item.is-active
    .el-tabs >>> .el-tabs__item:hover
    .el-radio-group >>> .el-radio__input.is-checked+.el-radio__label
        color $activeColor
    .el-tabs >>> .el-tabs__nav-wrap::after
        background-color transparent
    .el-tabs >>> .el-tabs__active-bar
    .el-radio-group >>> .el-radio__input.is-checked .el-radio__inner
        background-color $activeColor
    .el-input >>> input:focus
    .el-radio-group >>> .el-radio__inner:hover
    .el-radio-group >>> .el-radio__input.is-checked .el-radio__inner
        border-color $activeColor
    .info-item
        padding 10px 0
        font-size .3rem
        .label
            width 100px
            display inline-block
            text-align right
            margin-right 10px
        .username
            font-weight 600
            font-size .32rem
        .el-input
            width 250px
    .info-submit-btn
        margin-top 10px
        margin-left 20px
    .side
        box-sizing border-box
        h3
            font-size .34rem
            font-weight 600
        .tips
            color $fontColor_intro
            margin-top 20px
    .left-side
        width 60%
        float left
        border-right 1px solid $border
        padding-right 20px
        .avatar-uploader
            height 300px
            margin-top 10px
            background-color $bgc_1
            position relative
            & >>> .el-upload
                border 1px dashed #d9d9d9
                border-radius 6px
                cursor pointer
                overflow hidden
                position absolute
                top 50%
                left 50%
                transform translate(-50%, -50%)
                &:hover
                    border-color $activeColor
                    .avatar-uploader-icon
                        color $activeColor
            .avatar
                width 200px
                height 200px
                display block
            .avatar-uploader-icon
                width 200px
                height 200px
                font-size .56rem
                color #8c939d
                line-height 200px
        .avatar-save-btn
            margin-top 20px
    .right-side
        width 40%
        float right
        padding-left 20px
        .previews
            margin-top 10px
            .group
                display flex
                align-items flex-end
                margin-bottom 20px
                .g-item
                    display flex
                    flex-direction column
                    color $fontColor_intro
                    font-size .24rem
                    &:first-child
                        margin-right 20px
                    .el-avatar
                        border 1px dotted $border
    @media screen and (max-width: 767px)
        .info-pane
            .info-item
                display flex
                flex-direction row
                align-items center
                .label
                    width 60px
                    margin-right 10px
                    font-size .26rem
                    flex-shrink 0
                .el-input
                    flex 1
            .info-submit-btn
                margin-left 0
                margin-top 20px
                width 100%
        .ava-pane
            display flex
            flex-direction column
            .side
                padding 0
                width 100%
                margin-bottom 50px
            .left-side
                border none
                .avatar-save-btn
                    width 100%
            .right-side
                .previews
                    .group
                        justify-content space-around
</style>