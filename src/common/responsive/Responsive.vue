<template>
    <div v-if="show">
        <slot name="pc"></slot>
    </div>
    <div v-else>
        <slot name="phone"></slot>
    </div>
</template>

<script>
    export default {
        name: 'Responsive',
        data() {
            return {
                show: true,
                screenWidth: window.innerWidth, //浏览器宽度
            }
        },
        methods: {
            initScreen() {
                this.show = this.screenWidth >= 768
            }
        },
        mounted() {
            window.onresize = ()=> {
                return (()=> {
                    this.screenWidth = window.innerWidth
                })()
            }
            this.initScreen()
        },
        watch: {
            screenWidth(val) {
                this.screenWidth = val
                this.initScreen()
            }
        }
    }
</script>

<style lang="stylus" scoped>
    @import "~styles/varibles.styl"
</style>