<template>
    <div class="container">
        <div class="title"><slot name="title" /></div>
        <el-steps :active="active" finish-status="success" align-center>
            <el-step title="身份认证" />
            <el-step title="重置密码" />
            <el-step title="完成" />
        </el-steps>
        <!--身份确认-->
        <el-form v-show="active === 0" :model="codeForm" :rules="codeRules" ref="codeForm" class="box box-0" @submit.native.prevent>
            <div class="tip">为确认是您本人操作，请验证邮箱完成身份认证</div>
            <div class="crt-mail" v-if="findOrReset === 'reset'">当前邮箱：{{hideEmailInfo(codeForm.email)}}</div>
            <el-form-item ref="email-form-item" v-if="findOrReset === 'find'" prop="email">
                <el-input class="email" v-model.trim="codeForm.email" placeholder="请输入邮箱"><template slot="prepend">邮箱</template></el-input>
            </el-form-item>
            <el-form-item prop="code" class="code-form-item">
                <el-input class="code" v-model.trim="codeForm.code" placeholder="请输入验证码"/>
                <el-button class="get-code" type="warning" plain @click="handleGetCode" :disabled="disabled">{{disabled ? `${scnds}s 后重新获取` : '获取验证码'}}</el-button>
            </el-form-item>
            <div><el-button class="submit-code" type="warning" @click="submitCode('codeForm')">提交</el-button></div>
        </el-form>
        <!--重置密码-->
        <el-form v-show="active === 1" :model="pwdForm" :rules="pwdRules" ref="pwdForm" class="box box-1" @submit.native.prevent>
            <el-form-item prop="newPwd">
                <el-input class="new-pwd" v-model.trim="pwdForm.newPwd" clearable show-password><template slot="prepend">新密码</template></el-input>
            </el-form-item>
            <el-form-item prop="confirmPwd">
                <el-input class="confirm-pwd" v-model.trim="pwdForm.confirmPwd" clearable show-password><template slot="prepend">确认密码</template></el-input>
            </el-form-item>
            <div><el-button class="submit-pwd" type="warning" @click="submitPwd('pwdForm')">提交</el-button></div>
        </el-form>
        <!--等待成功-->
        <div v-show="active === 2" class="box waiting">
            <i class="el-icon-loading" />
        </div>
        <!--已成功-->
        <div v-show="active === 3" class="box success">
            <strong>修改成功</strong>
            <div v-if="findOrReset === 'reset'" class="tips">您当前的登录验证已失效，即将为您跳转 <router-link to="/login">登录</router-link> 页面</div>
            <div v-else class="tips">即将为您跳转 <router-link to="/login">登录</router-link> 页面</div>
        </div>
    </div>
</template>

<script>
    import { hideEmailInfo } from 'js/utils'
    import axios from 'axios'
    import { mapState, mapMutations } from 'vuex'
    export default {
        name: 'PwdStep',
        props: {
            findOrReset: {
                type: String,   // 'find'代表找回密码，'reset'代表修改密码
                required: true
            }
        },
        data() {
            let validConfirmPwd  = (rule, value, callback) => {
                if(!value) {
                    callback(new Error('请再次输入密码'))
                } else if(value !== this.pwdForm.newPwd) {
                    callback(new Error('两次输入的密码不同'))
                } else {
                    callback()
                }
            }
            return {
                active: 0,
                codeValidSucc: true,    // 验证码验证是否成功
                codeForm: {
                    email: '',   // 当前邮箱账号
                    code: '',   // 验证码
                },
                disabled: false,     // 验证码按钮是否可用
                scnds: 0,    // 倒计时
                codeRules: {
                    email: [
                        { required: true, message: '请输入邮箱账号', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
                    ],
                    code: [ { required: true, message: '请输入验证码', trigger: 'blur' } ]
                },
                pwdForm: {
                    email: '',  // 邮箱账号
                    newPwd: '', // 新密码
                    confirmPwd: '', // 确认密码
                },
                pwdRules: {
                    newPwd: [
                        { required: true, message: '请设置新密码', trigger: 'blur' },
                        { min: 8, max: 20, message: '密码长度为8~20位字符', trigger: 'blur' }
                    ],
                    confirmPwd: [
                        { required: true, validator: validConfirmPwd, trigger: ['blur'] }
                    ]
                },
            }
        },
        mounted() {
            this.initPage()
        },
        methods: {
            hideEmailInfo,
            handleGetCode() {   // 发起请求，让服务器将验证码发送到邮箱
                if(this.$refs['email-form-item']) { // 存在这部分dom说明是找回密码，未登录，则页面存在输入邮箱的input，获取验证码时需要先验证输入的邮箱是否正确和邮箱是否是注册的邮箱
                    if(this.vProp('codeForm', 'email')) {
                        axios.post('/api/checkEmail', { // 检测邮箱是否存在，即是否是注册了的账号
                            email: this.codeForm.email
                        }).then(res => {
                            switch (res.data.status) {  // 200表示邮箱未注册（非注册邮箱不可找回密码），404表示邮箱已注册（可找回密码）
                                case 200:
                                    this.$message({showClose: true, message: '当前邮箱未注册，请确认后重新输入', type: 'warning', duration: 1500})
                                    break;
                                case 404:
                                    this.disabled = true
                                    this.interval(60)
                                    this.sendEmailCode()
                                    break
                            }
                        })
                    }
                } else {    // 反之，则页面为修改密码页，用户已登录，直接取得邮箱账号，故不需要验证邮箱账号是否正确
                    if(this.codeForm.email) {
                        this.disabled = true
                        this.interval(60)
                        this.sendEmailCode()
                    }
                }
            },
            sendEmailCode() {   // 发送邮箱验证码
                axios.post('/api/sendEmail', {
                    email: this.codeForm.email,
                    type: 'changePassword'
                }).then(res => {
                    let data = res.data
                    if(data.codeStatus === 200) {
                        this.$message({showClose: true, message: '验证码已发至您的邮箱，请注意查收', type: 'success'})
                    } else if(data.status === 404) {
                        this.$message({showClose: true, message: '邮箱格式不符，请确认后重新输入', type: 'warning'})
                    } else if(data.status === 405) {
                        this.$message({showClose: true, message: '验证码发送失败', type: 'error'})
                    }
                }).catch()
            },
            submitCode(form) {  // 提交验证码
                if(this.vForm(form)) {
                    // 提交验证码的请求......// 验证成功后再this.active ++
                    axios.post('/api/verificationCode', {
                        email: this.codeForm.email,
                        code: this.codeForm.code,
                        type: 'changePassword'
                    }).then(res => {
                        switch (res.data.codeStatus) {
                            case 200:
                                this.pwdForm.email = this.codeForm.email
                                this.active ++
                                break
                            case 404:
                                this.$message({showClose: true, message: '验证码已失效', type: 'error', duration: 1500})
                                break
                            case 405:
                                this.$message({showClose: true, message: '验证码错误', type: 'error', duration: 1500})
                                break
                        }
                    }).catch()
                }
            },
            submitPwd(form) {  // 提交新密码
                if(this.vForm(form)) {
                    // 提交修改密码的请求......// 验证成功后再this.active ++
                    this.active ++  // 进入密码修改步骤
                    if(this.findOrReset === 'reset') {  // 修改密码
                        this.resetPwd()
                    } else if(this.findOrReset === 'find') {    // 找回密码
                        this.findPwd()
                    }
                }
            },
            resetPwd() {   // 登录状态修改密码
                axios.post('/api/updatePassWord', {
                    email: this.pwdForm.email,
                    password: this.pwdForm.newPwd
                }).then(res => {
                    switch (res.data.updateStatus) {
                        case 200:
                            this.active ++
                            this.removeLoginInfo()
                            setTimeout(() => {
                                this.$router.push('/login')
                            }, 2000)
                            break
                        case 405:
                            this.active --
                            this.$message({showClose: true, message: '密码修改失败', type: 'error', duration: 1500})
                            break
                    }
                }).catch()
            },
            findPwd() {    // 找回密码
                axios.post('/api/resetPassword', {
                    email: this.pwdForm.email,
                    password: this.pwdForm.newPwd
                }).then(res => {
                    switch (res.data.updateStatus) {
                        case 200:
                            this.active ++
                            this.removeLoginInfo()
                            setTimeout(() => {
                                this.$router.replace('/login')
                            }, 2000)
                            break
                        case 405:
                            this.active --
                            this.$message({showClose: true, message: '密码修改失败', type: 'error', duration: 1500})
                            break
                    }
                }).catch()
            },
            vForm(formName) {
                let flag
                this.$refs[formName].validate((valid) => {
                    flag = valid
                })
                return flag
            },
            vProp(formName, propName) {    // 验证表单中某个属性
                let flag
                this.$refs[formName].validateField(propName, errorMessage => {
                    flag = errorMessage === ''
                })
                return flag
            },
            interval(seconds) {
                const TIME_OUT = seconds
                if(!this.timer) {
                     this.scnds = TIME_OUT
                    this.timer = setInterval(() => {
                        if(this.scnds > 0 && this.scnds <= TIME_OUT) {
                            this.scnds --
                        } else {
                            clearInterval(this.timer)
                            this.timer = null
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
            },
            initPage() {
                if(this.findOrReset === 'reset' || this.token) {
                    this.getUserInfo()
                }
            },
            async getUserInfo() {
                try {
                    let res = await axios.get('/api/userInfo')
                    this.codeForm.email = res.data.email
                } catch (e) {
                    this.$message({showClose: true, message: '获取邮箱信息失败', type: 'error', duration: 1500})
                }
            },
            ...mapMutations(['removeLoginInfo'])
        },
        watch: {
            'pwdForm.newPwd'() {     // 监听修改密码的表单中新密码是否改变，触发确认密码的验证(主动验证)
                if(this.pwdForm.confirmPwd) {
                    this.$refs['pwdForm'].validateField('confirmPwd')
                }
            }
        },
        computed: {
            ...mapState(['token'])
        },
        destroyed() {
            this.clearIn(this.timer)
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .el-input >>> input:hover
    .el-input >>> input:focus
        border-color $activeColor
    .el-input >>> input
        height 60px
    .el-input >>> input::-webkit-input-placeholder
        font-weight normal
    .el-form >>> .el-form-item__error
        left unset
        right 0
    .el-form .el-form-item.code-form-item >>> .el-form-item__error
        left 0
        right unset
    .el-form-item
        margin-bottom 50px
    .el-input >>> .el-input-group__prepend
        width 100px
        box-sizing border-box
        text-align center
    .el-form >>> .is-success input
         border-color $success
    .container
        width 400px
        background-color #ffffff
        padding 10px 20px
        margin 0 auto
        .title
            font-size .3rem
            padding 10px 0 50px
            font-weight 600
        .el-form.box
        div.box
            padding 50px 0
        .el-form.box-0
            text-align center
            .tip
                font-size .32rem
                margin-bottom 30px
                color $fontColor_intro
            .crt-mail
                font-weight 600
                margin-bottom 30px
            .el-input.code
                font-size .4rem
                width 230px
                margin-right 20px
                & >>> input
                    font-weight 600
            .el-button.get-code
                width 150px
                height 60px
            .el-button.submit-code
                width 100%
                height 60px
                font-size .36rem
        .el-form.box-1
            text-align center
            .el-input
                width 100%
            .el-button.submit-pwd
                width 100%
                height 60px
                font-size .36rem
        .waiting
            text-align center
            height 200px
            i
                font-size 40px
                position relative
                top 40px
                color $activeColor
        .success
            height 200px
            text-align center
            strong
                color $success
                font-weight 800
                font-size .46rem
            .tips
                color $fontColor
                margin-top 50px
                a
                    color $activeColor
                    margin-left 3px
                    &:hover
                        text-decoration underline
    @media screen and (max-width: 767px)
        .container
            width 100%
            box-sizing border-box
            .el-form.box-0
                width 100%
                .code-form-item
                    width 100%
                    .el-input.code
                        width 60%
                        margin-right 5%
                    .el-button
                        width 35%
</style>