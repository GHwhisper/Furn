export default {
    getStorageToken(state){   // 获取本地存储的登录信息
        if(!state.token){
            state.token = JSON.parse(localStorage.getItem('token'))
        }
        return state.token
    },
    shoppingList(state) {   // 购物列表--商品id,数量
        let list = []
        state.cartCheckedList.forEach(item => {
            list.push({
                shoppingCartId: item.shoppingCartId,
                num: item.num
            })
        })
        return list
    }
}