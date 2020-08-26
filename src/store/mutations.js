export default {
    setToken(state, value) {    // 存入token
        state.token = value
        localStorage.setItem('token', value)
    },
    removeLoginInfo(state) {     // 删除token
        state.token = ''
        localStorage.removeItem('token')
        // localStorage.removeItem('userId')
    },
    // setUserId(state, value) {     // 存入用户id
    //     state.userId = value
    //     localStorage.setItem('userId', value)
    // },
    changeCartCheckedList(state, list) {
        state.cartCheckedList = list
        try {
            localStorage.cartCheckedList = JSON.stringify(list)
        } catch(e) {
            console.log(e)
        }
    },
    changeShoppingCurrentAddr(state, addr) {
        state.shoppingAddrInfo = addr
    },
    changeCurrentProduct(state, obj) {  // 当前加入购物车的商品，及数量
        state.currentProduct = obj
        localStorage.setItem('addToCart', JSON.stringify(obj))
    }
}