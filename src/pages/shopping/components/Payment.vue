<template>
    <div class="con">
        <div class="top"><span class="title">支付方式</span></div>
        <div class="main">
            <div class="payment-item is-checked">在线支付</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Payment',
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
        .main
            padding 0 10px
            .payment-item
                width 100px
                height 35px
                line-height 31px
                font-size .26rem
                text-align center
                box-sizing border-box
                background-color #ffffff
                margin-right 20px
                border 2px solid $bgc_1
                cursor default
            .is-checked
                border-color $activeColor
</style>