import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import(/* webpackChunkName: "home" */ '@/pages/home/Home')
const Login = () => import(/* webpackChunkName: "login" */ '@/pages/login/Login')
const Register = () => import(/* webpackChunkName: "register" */ '@/pages/register/Register')
const ProductDetail = () => import(/* webpackChunkName: "product_detail" */ '@/pages/product_detail/ProductDetail')
const Cart = () => import(/* webpackChunkName: "cart" */ '@/pages/cart/Cart')
const Personal = () => import(/* webpackChunkName: "personal" */ '@/pages/personal/Personal')
const Category = () => import(/* webpackChunkName: "category" */ '@/pages/category/Category')
const List = () => import(/* webpackChunkName: "list" */ '@/pages/list/List')
const Order = () => import(/* webpackChunkName: "order" */ '@/pages/order/Order')
const SetUpInfo = () => import(/* webpackChunkName: "setup_info" */ '@/pages/setup_info/SetUpInfo')
const Comment = () => import(/* webpackChunkName: "comment" */ '@/pages/comment/Comment')
const Collection = () => import(/* webpackChunkName: "collection" */ '@/pages/collection/Collection')
const History = () => import(/* webpackChunkName: "history" */ '@/pages/history/History')
const OrderDetail = () => import(/* webpackChunkName: "order_detail" */ '@/pages/order_detail/OrderDetail')
const Address = () => import(/* webpackChunkName: "address" */ '@/pages/address/Address')
const Security = () => import(/* webpackChunkName: "security" */ '@/pages/security/Security')
const Shopping = () => import(/* webpackChunkName: "shopping" */ '@/pages/shopping/Shopping')
const FindPwd = () => import(/* webpackChunkName: "find_pwd" */ '@/pages/find_pwd/FindPwd')
const AfterService = () => import(/* webpackChunkName: "after_service" */ '@/pages/after_service/AfterService')
const AddSucc = () => import(/* webpackChunkName: "add_succ" */ '@/pages/add_succ/AddSucc')
const Payment = () => import(/* webpackChunkName: "payment" */ '@/pages/payment/Payment')
const PaySucc = () => import(/* webpackChunkName: "pay_succ" */ '@/pages/pay_succ/PaySucc')

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
