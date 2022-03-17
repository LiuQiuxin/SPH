import Vue from 'vue'
import App from './App.vue'
import router from "./router";//导入路由配置文件
import TypeNav from "@/components/TypeNav";//导入三级联动导航栏组件
import Carousel from "@/components/Carousel";//引入轮播图组件
import Pagination from "@/components/Pagination";//引入分页组件
import ToolBar from "@/components/ToolBar";//引入工具栏组件
import VueLazyload from 'vue-lazyload';//引入实现图片懒加载的插件
//按需引入element组件
import { Button, MessageBox } from 'element-ui';
//注册element-ui中的button组件
Vue.component(Button.name, Button);
//注册element-ui中的弹出框组件
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
//引入vuex状态管理仓库
import store from "@/store";
//执行mockServe.js文件
import "@/mock/mockServe.js";
//引入swiper样式库，因为项目中有多个轮播图，所以使用全局引入的形式
import "swiper/css/swiper.css";
//引入表单校验插件
import "./utils/validate";

Vue.config.productionTip = false;
//注册插件
Vue.use(VueLazyload, {
  loading: '../public/images/banner.jpg',//懒加载的默认图片
})
//注册全局组件,第一个参数是全局组件的名字，第二个参数是需要注册的全局组件
Vue.component("TypeNav",TypeNav);
//注册全局轮播图组件
Vue.component("Carousel",Carousel);
//注册全局分页组件
Vue.component("Pagination",Pagination);
//全局注册工具栏组件
Vue.component("ToolBar",ToolBar);
/*统一接收接口api文件夹里面的全部请求函数，并统一放入到Vue原型中，这样在每个组件中
都能获取到这些请求函数，不适用vuex插件库的话就可以采用这种方式，在组件中发请求*/
import * as API from "@/api";//API对象中包含了所有的请求方法
new Vue({
  render: h => h(App),
  //注册路由,注册完毕后组件实例对象的身上会多一个$router和$route属性
  router,
  //注册仓库,注册完毕后组件实例对象的身上会 多一个$store属性
  store,

  beforeCreate(){
    Vue.prototype.$bus = this;//安装全局事件总线，$bus就是当前应用的vm
    Vue.prototype.$API = API;//将所有的请求函数都绑定在Vue的原型对象中
  },

}).$mount('#app')
