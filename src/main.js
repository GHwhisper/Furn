import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import 'styles/reset.css'
import 'styles/iconfont.css'
import 'styles/iconfont/iconfont.js'
import animate from 'animate.css'
import qs from 'qs'
import { Container, Header, Main, Footer, Row, Col, Input, Button, Rate, Select,
  Option, InputNumber, Tabs, TabPane, Pagination, Table, TableColumn, Checkbox, Tooltip, Menu,
  MenuItem, Submenu, Avatar, Steps, Step, Carousel, CarouselItem, RadioGroup, Radio, Upload,
  DatePicker, Dropdown, DropdownMenu, DropdownItem, Breadcrumb, BreadcrumbItem, Dialog, Tag,
  Form, FormItem, Image, Message, PageHeader, MessageBox, Loading } from "element-ui"

Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)
Vue.use(animate)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Button)
Vue.use(Rate)
Vue.use(Select)
Vue.use(Option)
Vue.use(InputNumber)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Checkbox)
Vue.use(Tooltip)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Avatar)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Upload)
Vue.use(DatePicker)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Image)
Vue.use(PageHeader)
Vue.use(Loading)

Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$alert = MessageBox.alert

Vue.prototype.bus = new Vue()

import axios from 'axios'

// 全局路由构造函数，判断是否登录和要跳转到页面
router.beforeEach((to, from, next) => {
  if(to.matched.some(m => m.meta.requireAuth)) {  // 需要登录
    if(window.localStorage.token !== '') {
      next()
    } else if(to.path !== '/login') {
      let token = window.localStorage.token
      if(token === 'null' || token === '' || token === undefined) {
        next({path: '/login'})
        this.$message({showClose: true,message: '检测到您还未登录，请登录后继续操作',duration: 1500})
      }
    } else {  // 不需要登录
      next()
    }
  } else {
    next()
  }
})

// 配置公共url
axios.default.baseURL = '/api/'
//添加请求拦截器
axios.interceptors.request.use(
    config =>{
      if (config.method === 'get') {
        config.paramsSerializer = function(params) {
           return qs.stringify(params, { arrayFormat: 'repeat' });
        };
      }
      // 请求头中加入token
      if(store.state.token){
        config.headers.common['token'] = store.state.token
      }
      return config;
    },
    error =>{
      //对请求错误做什么
      return Promise.reject(error);
    })

//http reponse响应拦截器
axios.interceptors.response.use(
    response =>{
      return response;
    },
    error=>{
      if(error.response){
        switch(error.response.status){
          case 401:
            localStorage.removeItem('token');
            router.replace({
              path: '/login',
              query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
            })
        }
      }
    }
  )


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
