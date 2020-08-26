<template>
    <el-container direction="vertical">
        <page-header class="page-header">
            <template #name>找回密码</template>
        </page-header>
        <div class="main-con">
            <pwd-step findOrReset="find" />
        </div>
    </el-container>
</template>

<script>
    import PageHeader from 'common/header/PageHeader'
    import PwdStep from 'common/step/PwdStep'
    export default {
        name: 'FindPwd',
        components: {
            PageHeader,
            PwdStep
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
    .page-header
        box-shadow $shadow_1
        z-index 1
    .main-con
        margin 0 auto
</style>

