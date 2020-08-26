<template>
    <div>
        <page-header>
            <template #name>个人信息</template>
            <template #right><search /></template>
        </page-header>
        <div class="main-con">
            <div class="main">
                <div class="fixed-col">
                    <set-up-menu />
                </div>
                <div class="flexible-col">
                    <div class="box-0">
                        <el-tabs v-model="activeName">
                            <el-tab-pane label="基本信息" name="first">
                                <div class="info-item">
                                    <span class="label">用户名：</span>
                                    <strong class="username">chyxjr</strong>
                                </div>
                                <div class="info-item">
                                    <span class="label">昵称：</span>
                                    <el-input v-model="nickName" maxlength="20">陈华毅小萝莉</el-input>
                                </div>
                                <div class="info-item">
                                    <span class="label">性别：</span>
                                    <el-radio-group v-model="setSex">
                                        <el-radio :label="1">男</el-radio>
                                        <el-radio :label="0">女</el-radio>
                                        <el-radio :label="2">保密</el-radio>
                                    </el-radio-group>
                                </div>
                                <div class="info-item">
                                    <span class="label">生日：</span>
                                    <el-date-picker
                                            v-model="birthday"
                                            type="date"
                                            placeholder="选择日期"
                                            format="yyyy 年 MM 月 dd 日"
                                            value-format="yyyy-MM-dd"
                                    />
                                </div>
                                <el-button class="info-submit-btn" type="warning" size="medium">提交</el-button>
                            </el-tab-pane>
                            <el-tab-pane label="头像照片" name="second">
                                <div class="side left-side">
                                    <h3>设置我的新头像</h3>
                                    <p class="tips">仅支持JPG,JPEG,PNG,GIF,BMP格式，文件小于2M</p>
                                    <el-upload
                                            class="avatar-uploader"
                                            action=""
                                            :show-file-list="false"
                                            :on-success="handleAvatarSuccess"
                                            :before-upload="beforeAvatarUpload"
                                    >
                                        <img v-if="imageUrl" class="avatar" :src="imageUrl" alt="" />
                                        <i v-else class="el-icon-plus avatar-uploader-icon" />
                                    </el-upload>
                                    <el-button class="avatar-save-btn" type="warning" size="medium">保存</el-button>
                                </div>
                                <div class="side right-side">
                                    <h3>效果预览</h3>
                                    <p class="tips">您上传的图片会自动生成2种尺寸，请注意小尺寸的头像是否清晰</p>
                                    <div class="previews">
                                        <div class="group">
                                            <div class="g-item"><el-avatar :size="100" :src="imageUrl" shape="square" />100px * 100px</div>
                                            <div class="g-item"><el-avatar :size="50" :src="imageUrl" shape="square" />50px * 50px</div>
                                        </div>
                                        <div class="group">
                                            <div class="g-item"><el-avatar :size="100" :src="imageUrl" />100px * 100px</div>
                                            <div class="g-item"><el-avatar :size="50" :src="imageUrl" />50px * 50px</div>
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PageHeader from 'common/header/PageHeader'
    import Search from 'common/search/Search'
    import SetUpMenu from 'common/sidebar/SetUpMenu'
    export default {
        name: 'SetUp',
        components: {
            PageHeader,
            Search,
            SetUpMenu,
        },
        props: {

        },
        data() {
            return {
                activeName: 'first',
                setSex: 1, // 设置性别，0表示女，1表示男，2表示保密
                nickName: '毅哥小萝莉', // 用户昵称
                imageUrl: 'http://img1.imgtn.bdimg.com/it/u=561326960,1564995287&fm=11&gp=0.jpg', // 选择的头像的路径
                birthday: ''
            }
        },
        mounted() {

        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw)
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg'
                const isLt2M = file.size / 1024 / 1024 < 2
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!')
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!')
                }
                return isJPG && isLt2M
            }
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
    .main-con
        background-color $bgc_1
        .main
            width 1170px
            margin 0 auto
            .fixed-col
                width 200px
                float left
                padding-top 20px
                padding-right 20px
                box-sizing border-box
            .flexible-col
                height 100%
                margin-left 200px
                padding 20px 0
                .box-0
                    height 100%
                    background-color #ffffff
                    padding 10px 20px
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
    @media screen and (min-width: 992px) and (max-width: 1200px)
        .main-con .main
            width 970px
            .fixed-col
                width 180px
            .flexible-col
                margin-left 180px
    @media screen and (min-width: 768px) and (max-width: 991px)
        .main-con
            padding 0 15px
            .main
                width 100%
                .fixed-col
                    width 180px
                .flexible-col
                    margin-left 180px
</style>