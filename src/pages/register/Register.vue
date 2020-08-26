<template>
    <el-container  direction="vertical">
        <page-header class="page-header">
            <template #name>欢迎注册</template>
            <template #right>
                <div class="head-r">
                    已有账号?&nbsp;<span @click="toLogin">请登录<i class="el-icon-arrow-right" /></span>
                </div>
            </template>
        </page-header>
        <div class="main-con">
            <el-steps :active="active" finish-status="success" align-center>
                <el-step title="验证邮箱" />
                <el-step title="填写账号信息" />
                <el-step title="注册成功" />
            </el-steps>
            <div class="reg-form">
                <el-form v-show="active === 0" class="step-item step-0" :model="codeForm" :rules="codeRules" ref="codeForm">
                    <el-form-item prop="email">
                        <el-input v-model.trim="codeForm.email" placeholder="建议使用常用邮箱">
                            <template slot="prepend">邮箱号</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="code" class="code-item">
                        <el-input class="scy-code" v-model.trim="codeForm.code" placeholder="请输入验证码"/>
                        <el-button class="get-code" type="warning" plain @click="handleGetCode" :disabled="disabled">{{disabled ? `${scnds}s 后重新获取` : '获取验证码'}}</el-button>
                    </el-form-item>
                    <el-button class="submit" type="warning" @click="handleNext">下一步</el-button>
                </el-form>
                <el-form v-show="active === 1" class="step-item step-1" :model="regForm" :rules="regRules" ref="regForm">
                    <el-form-item prop="username">
                        <el-input v-model.trim="regForm.username" placeholder="您的账户名和登录名">
                            <template slot="prepend">用户名</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model.trim="regForm.password" placeholder="建议使用两种或两种以上字符组合" show-password clearable>
                            <template slot="prepend">设置密码</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="confirmPwd">
                        <el-input v-model.trim="regForm.confirmPwd" placeholder="请再次输入密码" show-password clearable>
                            <template slot="prepend">确认密码</template>
                        </el-input>
                    </el-form-item>
                    <el-button class="submit" type="warning" @click="handleRegister">立即注册</el-button>
                </el-form>
                <div v-show="active === 2" class="step-item step-2">
                    <i class="el-icon-loading" />
                </div>
                <div v-show="active === 3" class="step-item step-3">
                    <div class="suc-con">
                        <svg class="icon" aria-hidden="true"><use xlink:href="#icon-chenggongcopy-" /></svg>
                        <em>恭喜您，注册成功</em>
                    </div>
                    <div class="account-text">您的用户名：<em>{{regForm.username}}</em></div>
                    <div class="account-text">您的邮箱：<em>{{regForm.email}}</em></div>
                    <div class="jump-text">系统将在将在&nbsp;{{seconds}}&nbsp;秒后自动跳转,如果没有请&nbsp;<span @click="handleJump">点击手动跳转</span></div>
                </div>
            </div>
        </div>
    </el-container>
</template>

<script>
    import PageHeader from 'common/header/PageHeader'
    import axios from 'axios'
    export default {
        name: 'Register',
        components: {
            PageHeader
        },
        data() {
            let validUsername = (rule, value, callback) => {
                if(!value) {
                    callback(new Error('请输入用户名'))
                } else {
                    let reg = /^[0-9a-zA-Z]{6,20}$/g
                    if(!reg.test(value)) {
                        callback(new Error('用户名必须是由6~20位数字或字母的组合'))
                    } else {
                        callback()
                    }
                }
            }
            let validConfirmPwd  = (rule, value, callback) => {
                if(!value) {
                    callback(new Error('请再次输入密码'))
                } else if(value !== this.regForm.password) {
                    callback(new Error('两次输入的密码不同'))
                } else {
                    callback()
                }
            }
            return {
                active: 0,
                codeForm: {
                    email: '',      // 邮箱号
                    code: '',       // 验证码
                },
                regForm: {
                    email: '',      // 邮箱号
                    username: '',   // 用户名
                    password: '',   // 密码
                    confirmPwd: '', // 确认密码
                },
                disabled: false,    // 验证码按钮是否可用
                scnds: 0,    // 验证码按钮倒计时
                seconds: Number,    // 页面跳转倒计时
                codeRules: {    // 验证码表单验证
                    email: [
                        { required: true, message: '请输入邮箱，邮箱将作为登录和找回密码的依据', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
                        // { validator: validEmail, trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: '请输入验证码', trigger: 'blur' },
                        { min: 4, max: 4, message: '验证码长度为4位', trigger: 'blur' }
                        // { validator: validCode, trigger: 'blur' }
                    ]
                },
                regRules: {
                    username: [
                        { required: true, validator: validUsername, trigger: ['blur', 'change'] }
                    ],
                    password: [
                        { required: true, message: '请设置密码', trigger: 'blur' },
                        { min: 8, max: 20, message: '密码长度为8~20位字符', trigger: 'blur' }
                    ],
                    confirmPwd: [
                        { required: true, validator: validConfirmPwd, trigger: ['blur', 'change'] }
                    ]
                },
            }
        },
        methods: {
            handleGetCode() {   // 获取验证码按钮
                if(this.vProp('codeForm', 'email')) {
                    axios.post('/api/checkEmail', { // 邮箱是否已被注册
                        email: this.codeForm.email
                    }).then(res => {
                        switch (res.data.status) {  // 200表示未被注册，404表示已被注册
                            case 200:
                                this.disabled = true
                                this.btnInterval(60)
                                this.$message({showClose: true, message: '验证码已发至您的邮箱，请注意查收', type: 'success', duration: 1500})
                                this.sendEmailCode()
                                break
                            case 404:
                                this.$message({showClose: true, message: '邮箱已被注册', type: 'warning', duration: 1500})
                        }
                    }).catch(e => console.log(e))
                }
            },
            sendEmailCode() {
                axios.post('/api/sendEmail', {
                    email: this.codeForm.email,
                    type: 'register'
                }).then(res => {
                    let data = res.data
                    switch (data.codeStatus) {
                        case 200:
                            break
                        case 404:
                            this.$message({showClose: true, message: '邮箱格式不符，请确认后重新输入', type: 'warning', duration: 1500})
                            break
                        case 405:
                            this.$message({showClose: true, message: '验证码发送失败', type: 'error', duration: 1500})
                            break
                    }
                }).catch(e => console.log(e))
            },
            handleNext() {  // 下一步按钮（校验验证码）
                if(this.vForm('codeForm')) {    // 验证codeForm表单
                    axios.post('/api/verificationCode', {
                        email: this.codeForm.email,
                        code: this.codeForm.code,
                        type: 'register'
                    }).then(res => {
                        switch (res.data.codeStatus) {
                            case 200:
                                this.regForm.email = this.codeForm.email
                                this.active ++
                                break
                            case 404:
                                this.$message({showClose: true, message: '验证码已失效', type: 'error', duration: 1500})
                                break
                            case 405:
                                this.$message({showClose: true, message: '验证码已错误', type: 'error', duration: 1500})
                                break
                        }
                    })
                }
            },
            handleRegister() {  // 注册
                if(this.vForm('regForm')) {
                    this.active ++
                    axios.post('/api/registered', {
                        regForm: this.regForm
                    }).then(res => {
                        switch (res.data.status) {
                            case 200:
                                this.active ++
                                break
                            case 405:
                                this.$message({showClose: true, message: '注册失败，请重试', type: 'error', duration: 1500})
                                this.active --
                                break
                            case 406:
                                this.$message({showClose: true, message: '密码格式错误，密码长度为8~20位', type: 'error', duration: 1500})
                                this.active --
                                break
                            case 407:
                                this.$message({showClose: true, message: '该用户名已被注册', type: 'error', duration: 1500})
                                this.active --
                                break
                        }
                    }).catch(e => console.log(e))
                }
            },
            vForm(formName) {    // 验证整个表单
                let flag = false
                this.$refs[formName].validate((valid) => {
                    flag = valid
                })
                return flag
            },
            vProp(formName, propName) {    // 验证表单中某个属性
                let flag = false
                this.$refs[formName].validateField(propName, errorMessage => {
                    flag = errorMessage === ''
                })
                return flag
            },
            jumpAfterSecs() {   // 多少秒后跳转回上一页
                const TIME_OUT = 5
                if(!this.timer) {
                    this.seconds = TIME_OUT
                    this.timer = setInterval(() => {
                        if(this.seconds > 0 && this.seconds <= TIME_OUT){
                            this.seconds --
                        } else {
                            clearInterval(this.timer)
                            this.timer = null
                            this.$router.go(-1)
                        }
                    }, 1000)
                }
            },
            handleJump() {  // 手动返回上一页
                this.$router.go(-1)
            },
            toLogin() {     // 自动跳转到登录页面
                this.$router.push({ path: '/login' })
            },
            btnInterval(seconds) {
                const TIME_OUT = seconds
                if(!this.codeBtnTimer) {
                    this.scnds = TIME_OUT
                    this.codeBtnTimer = setInterval(() => {
                        if(this.scnds > 0 && this.scnds <= TIME_OUT) {
                            this.scnds --
                        } else {
                            clearInterval(this.codeBtnTimer)
                            this.codeBtnTimer = null
                            this.disabled = false
                        }
                    }, 1000)
                }
            },
            clearIn(interval) {
                if(interval) {
                    clearInterval(interval)
                    interval = null
                }
            }
        },
        watch: {
            active(val) {
                if(val === 3) {
                    this.jumpAfterSecs()
                }
            }
        },
        destroyed() {
            this.clearIn(this.timer)
            this.clearIn(this.codeBtnTimer)
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .el-input >>> input
        height 60px
    .el-input >>> .el-input-group__prepend
        width 80px
        padding 15px
        text-align center
    .el-input >>> .el-input__inner:focus
        border-color $activeColor
    .el-form >>> .el-form-item
        margin-bottom 40px
    .el-form >>> .el-form-item__error
        left unset
        right 0
    .el-form .el-form-item.code-item >>> .el-form-item__error
        left 0
        right unset
    .el-form >>> .is-success input
        border-color $success
    .page-header
        box-shadow $shadow_1
    .head-r
        color $fontColor_intro
        span
            color $activeColor
            cursor pointer
    .main-con
        width 400px
        height 500px
        margin 0 auto
        .el-steps
            margin 80px auto 0
        .reg-form
            margin-top 50px
            .step-0
                .el-input.scy-code
                    width 60%
                    margin-right 5%
                .el-button.get-code
                    width 35%
                    height 60px
                    margin 0
            .step-2
                height 200px
                text-align center
                i
                    font-size 40px
                    position relative
                    top 40px
                    color $activeColor
            .step-3
                .suc-con
                    display flex
                    flex-direction row
                    justify-content center
                    align-items center
                    svg.icon
                        width 100px
                        height 100px
                        fill currentColor
                        overflow hidden
                        margin-right 20px
                    em
                        font-size .42rem
                        font-weight 600
                .account-text
                    margin-top 30px
                    padding 0 20px
                    color $fontColor_intro
                    em
                        color $activeColor
                        font-size .4rem
                        font-weight 600
                .jump-text
                    margin-top 10px
                    padding 0 20px
                    color $fontColor_intro
                    span
                        color $activeColor
                        cursor pointer
        .el-button.submit
            width 100%
            height 50px
            margin 20px 0 50px
    @media screen and (min-width: 768px) and (max-width: 991px)
        .page-header >>> .el-row .el-col
            width 750px
    @media screen and (max-width: 767px)
        .main-con
            width 100%
            padding 0 15px
            box-sizing border-box
</style>