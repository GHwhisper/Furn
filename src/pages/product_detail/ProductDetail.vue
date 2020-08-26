<template>
    <div v-loading.fullscreen.lock="fullscreenLoading">
        <navigation-bar />
        <product-intro :product-info="productInfo" @scrollToComment="scrollToComment" />
        <product-detail-tab :summary="summary" :comment="comment" ref="pdtDetailTab" />
    </div>
</template>

<script>
    import NavigationBar from 'common/navigation/NavigationBar'
    import ProductIntro from './components/Intro'
    import ProductDetailTab from './components/DetailTab'
    import axios from 'axios'
    export default {
        name: 'ProductDetail',
        components: {
            NavigationBar,
            ProductIntro,
            ProductDetailTab,
        },
        data() {
            return {
                productInfo: {},
                summary: '',
                comment: {},
                fullscreenLoading: false
            }
        },
        methods: {
            async getProductDetailInfo() {
                this.fullscreenLoading = true
                let res = await axios.get('/api/productDetail', {
                    params: {
                        productId: this.$route.params.id
                    }
                })
                let data = res.data
                this.productInfo = data.product
                this.summary = data.product.summary
                this.comment = data.comment
                this.fullscreenLoading = false
            },
            scrollToComment() {
                let tabOffsetTop = this.$refs.pdtDetailTab.$el.offsetTop    // 获取组件位置
                document.body.scrollTop = document.documentElement.scrollTop = tabOffsetTop
            }
        },
        mounted() {
            this.getProductDetailInfo()
        }
    }
</script>

<style lang="stylus" scoped>

</style>