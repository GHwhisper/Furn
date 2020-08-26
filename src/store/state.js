let crtShoppingList = []
try {
    if(localStorage.getItem('cartCheckedList')) {
        crtShoppingList = JSON.parse(localStorage.getItem('cartCheckedList'))
    }
} catch(e) {
    console.log(e)
}

let token = ''
try {
    if(localStorage.getItem('token')) {
        token = localStorage.getItem('token')
    }
} catch(e) {
    console.log(e)
}

// let userId = ''
// try {
//     if(localStorage.getItem('userId')) {
//         userId = localStorage.getItem('userId')
//         window.console.log(userId)
//     }
// } catch(e) {
//     window.console.log(e)
// }

let currentProduct = {}
try {
    if(localStorage.getItem('addToCart')) {
        currentProduct = JSON.parse(localStorage.getItem('addToCart'))
    }
} catch (e) {
    window.console.log(e)
}

export default {
    token: token,
    // userId: userId,
    cartCheckedList: crtShoppingList,    // 选中的购物车列表
    shoppingAddrInfo: {},    // 结算页用户所选地址
    currentProduct: currentProduct,     // 加入购物车的商品信息
}