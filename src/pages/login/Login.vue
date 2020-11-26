<template>
    <el-container direction="vertical" v-loading.fullscreen.lock="fullscreenLoading">
        <page-header class="page-header">
            <template #name>欢迎登录</template>
        </page-header>
        <el-main>
            <div class="login-bg"></div>
            <el-row type="flex" justify="center">
                <el-col>
                    <div class="login-con">
                        <div class="login-text">账户登录</div>
                        <div class="login-form">
                            <el-input class="username" placeholder="用户名/邮箱" v-model.trim="loginForm.username" clearable>
                                <template slot="prepend"><i class="el-icon-user" /></template>
                            </el-input>
                            <el-input class="password" placeholder="密码" v-model.trim="loginForm.password" show-password clearable>
                                <template slot="prepend"><i class="el-icon-lock" /></template>
                            </el-input>
                            <div class="ver-row-con">
                                <el-input class="verification" placeholder="验证码" v-model.trim="loginForm.verification" />
                                <div class="ver-con">
                                    <img v-if="codeImg" :src="codeImg" alt="" @click="getCodeImg">
                                    <span v-else class="code-img-fail"><i class="el-icon-picture-outline" /></span>
                                    <span class="change-text" @click="getCodeImg">换一张</span>
                                </div>
                            </div>
                            <div :class="['tips', {'hide-tips': tipsVisible}]"><i class="el-icon-warning-outline" />{{tipText}}</div>
                            <el-button plain type="warning" @click="onLogin">登 录</el-button>
                        </div>
                        <div class="toRegister">
                            <router-link to="/findpwd" class="forget-link">忘记密码</router-link>
                            <router-link to="/register" class="register-link">立即注册<i class="el-icon-arrow-right" /></router-link>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    import PageHeader from 'common/header/PageHeader'
    import axios from 'axios'
    import { mapMutations } from 'vuex'
    export default {
        name: 'Login',
        components: {
            PageHeader
        },
        data() {
            return {
                loginForm: {
                    username: '',
                    password: '',
                    verification: ''
                },
                tipText: '',
                tipsVisible: true,
                codeImg: '',     // 验证码图片
                fullscreenLoading: false
            }
        },
        methods: {
            async getCodeImg() {    // 获取验证码
                try {
                    let timeStamp = new Date().getTime()
                    let res = await axios.get('/api/sendCode')
                    let data = res.data
                    switch (data.codeStatus) {
                        case 200:
                            this.codeImg = data.img + '?t=' + timeStamp // 因为后台返回的图片路径不变，所以需要添加一个随机数或者时间戳，防止浏览器取缓存数据
                            break
                        case 405:
                            this.$message({showClose: true, message: '验证码获取失败', type: 'error', duration: 1500})
                            break
                    }
                } catch(e) {
                    console.log(e)
                }
            },
            onLogin() {     // 登录
                if(this.validLogin()) {
                    this.fullscreenLoading = true
                    axios.post('/api/login', {
                        loginForm: this.loginForm
                    }).then(res => this.loginCallback(res))
                        .catch(error => {
                            this.fullscreenLoading = false
                            this.$message({showClose: true,message: '服务器异常，登录失败',type: 'error'})
                            console.log(error)
                    })
                }
            },
            loginCallback(res) {
                this.fullscreenLoading = false
                let data = res.data
                switch (data.status) {
                    case 200:
                        this.$message({showClose: true,message: '登录成功',type: 'success',duration: 1500})
                        this.setToken(data.token)   // 将token存入localstorage
                        this.$router.replace('/')
                        break
                    case 403: // 验证码错误
                        this.tipText = '验证码错误'
                        this.getCodeImg()
                        this.loginForm.verification = ''
                        this.tipsVisible = false
                        break
                    case 404: // 验证码失效
                        this.tipText = '验证码已失效'
                        this.getCodeImg()
                        this.loginForm.verification = ''
                        this.tipsVisible = false
                        break
                    case 405: // 没有该用户
                        this.tipText = '未找到该用户'
                        this.getCodeImg()
                        this.loginForm.verification = ''
                        this.tipsVisible = false
                        break
                    case 406: // 密码错误
                        this.tipText = '账号密码不匹配，请重新输入'
                        this.getCodeImg()
                        this.loginForm.password = ''
                        this.loginForm.verification = ''
                        this.tipsVisible = false
                        break
                    case 408: // 同一地点多次登录
                        this.tipText = '您已登录'
                        this.$message({showClose: true,message: '您已登录',type: 'success',duration: 1500})
                        this.$router.replace('/')
                        break
                    default:
                        this.$message({showClose: true,message: '登录失败',type: 'error'})
                }
            },
            validLogin() {  // 验证登录表单
                if(this.loginForm.username === '' && this.loginForm.password === '') {
                    this.tipText = '请输入用户名和密码'
                    this.tipsVisible = false
                    return false
                } else if(this.loginForm.username === '') {
                    this.tipText = '请输入用户名'
                    this.tipsVisible = false
                    return false
                } else if(this.loginForm.password === '') {
                    this.tipText = '请输入密码'
                    this.tipsVisible = false
                    return false
                } else if(this.loginForm.verification === '') {
                    this.tipText = '请输入验证码'
                    this.tipsVisible = false
                    return false
                } else {
                    return true
                }
            },
            ...mapMutations(['setToken'])
        },
        mounted() {
            this.getCodeImg()
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .el-input >>> .el-input__inner:focus
        border-color $activeColor
    .el-main
        height 500px
        padding 0
        background-color: lightblue
        position relative
        .login-bg
            width 100%
            height 100%
            background-image url(../../assets/images/sofa-collection-banner.jpg)
            background-repeat no-repeat
            background-size cover
            position absolute
            filter: blur(15px);
            -webkit-filter: blur(15px);
            -moz-filter: blur(15px);
            -o-filter: blur(15px);
            -ms-filter: blur(15px);
        .el-row
            height 100%
            .el-col
                width 1170px
                background-image url(../../assets/images/sofa-collection-banner.jpg)
                background-repeat no-repeat
                background-size cover
                position relative
                .login-con
                    width 345px
                    background-color: #ffffff
                    position absolute
                    right 0
                    top 50%
                    transform translateY(-50%)
                    padding-bottom 50px
                    .login-text
                        height 60px
                        color $activeColor
                        font-size .5rem
                        line-height 60px
                        padding 0 .3rem
                        box-sizing border-box
                        border-bottom 1px solid #f4f4f4
                    .login-form
                        width 100%
                        box-sizing border-box
                        padding .3rem
                        .username
                        .password
                        .verification
                        .ver-con
                            margin 15px 0 0
                        .verification
                            width 150px
                            margin-right 10px
                        .ver-row-con
                            display flex
                            .ver-con
                                height 40px
                                display flex
                                flex-direction row
                                align-items flex-end
                                img
                                .code-img-fail
                                    width 80px
                                    height 100%
                                    cursor pointer
                                .code-img-fail
                                    background-color $bgc_1
                                    display flex
                                    justify-content center
                                    align-items center
                                    i
                                        color $fontColor_intro
                                .change-text
                                    color #bbb9b9
                                    font-size .2rem
                                    margin-left 5px
                                    cursor pointer
                                    vertical-align bottom
                                    &:hover
                                        text-decoration underline
                        .tips
                            color $activeColor
                            font-size .26rem
                            line-height 20px
                            position relative
                            top 20px
                            i
                                margin-right 5px
                        .hide-tips
                            visibility hidden
                        .el-button
                            width 100%
                            margin-top 30px
                            font-size .3rem
                    .toRegister
                        width 100%
                        height 50px
                        padding 0 .3rem
                        background-color #fcfcfc
                        position absolute
                        bottom 0
                        box-sizing border-box
                        .forget-link
                        .register-link
                            color $activeColor
                            font-size .26rem
                            line-height 50px
                            &:hover
                                text-decoration underline
                        .register-link
                            float right
    @media screen and (min-width: 992px) and (max-width: 1200px)
        .el-main .el-row .el-col
            width 970px
    @media screen and (min-width: 768px) and (max-width: 991px)
        .page-header >>> .el-row .el-col
            width 750px
        .el-main .el-row .el-col
            width 750px
    @media screen and (max-width: 767px)
        .el-main .el-row .el-col
            width 100%
            .login-con
                width 100%
</style>
