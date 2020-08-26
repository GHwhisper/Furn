import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import Login from '@/pages/login/Login'
import Register from '@/pages/register/Register'
import ProductDetail from '@/pages/product_detail/ProductDetail'
import Cart from '@/pages/cart/Cart'
import Personal from '@/pages/personal/Personal'
import Category from '@/pages/category/Category'
import List from '@/pages/list/List'
import Order from '@/pages/order/Order'
import SetUpInfo from '@/pages/setup_info/SetUpInfo'
import Comment from '@/pages/comment/Comment'
import Collection from '@/pages/collection/Collection'
import History from '@/pages/history/History'
import OrderDetail from '@/pages/order_detail/OrderDetail'
import Address from '@/pages/address/Address'
import Security from '@/pages/security/Security'
import Shopping from '@/pages/shopping/Shopping'
import FindPwd from '@/pages/find_pwd/FindPwd'
import AfterService from '@/pages/after_service/AfterService'
import AddSucc from '@/pages/add_succ/AddSucc'
import Payment from '@/pages/payment/Payment'
import PaySucc from '@/pages/pay_succ/PaySucc'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

export default new Router({
    mode: 'history',
    // base: 'furn',
    linkActiveClass:'active',
    scrollBehavior(to,from,savePosition){ // 在点击浏览器的“前进/后退”，或者切换导航的时候触发。
        if(to.hash){ //先判断目标路由有没有hash值
            return {selector:to.hash}
        }
        if(savePosition) {
            return savePosition;
        }else{
            return {x:0,y:0}
        }
    },
    routes: [{
        path: '/',
        name: 'Home',
        component: Home
    },{
        path: '/login',
        name: 'Login',
        component: Login
    },{
        path: '/register',
        name: 'Register',
        component: Register
    },{
        path: '/product/detail/:id',
        name: 'ProductDetail',
        component: ProductDetail
    },{
        path: '/cart',
        name: 'Cart',
        component: Cart
    },{
        path: '/personal',
        name: 'Personal',
        component: Personal
    },{
        path: '/category',
        name: 'Category',
        component: Category
    },{
        path: '/list',
        name: 'List',
        component: List
    },{
        path: '/order/:type',
        name: 'Order',
        component: Order
    },{
        path: '/order/detail/:id',
        name: 'OrderDetail',
        component: OrderDetail
    },{
        path: '/setup/info',
        name: 'SetUpInfo',
        component: SetUpInfo
    },{
        path: '/comment',
        name: 'Comment',
        component: Comment
    },{
        path: '/collection',
        name: 'Collection',
        component: Collection
    },{
        path: '/history',
        name: 'History',
        component: History
    },{
        path: '/address',
        name: 'Address',
        component: Address
    },{
        path: '/security',
        name: 'Security',
        component: Security
    },{
        path: '/shopping',
        name: 'Shopping',
        component: Shopping
    },{
        path: '/findpwd',
        name: 'FindPwd',
        component: FindPwd
    },{
        path: '/service',
        name: 'AfterService',
        component: AfterService
    },{
        path: '/addsucc',
        name: 'AddSucc',
        component: AddSucc
    },{
        path: '/payment',
        name: 'Payment',
        component: Payment
    },{
        path: '/paysucc',
        name: 'PaySucc',
        component: PaySucc
    }],
})