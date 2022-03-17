//路由配置文件

import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

import routes from "./routes";

Vue.use(VueRouter);//使用vue-router插件

//把VueRouter的原型对象的push方法先保存一份
let originPush = VueRouter.prototype.push;
let OriginReplace = VueRouter.prototype.replace;

//重写push|replace方法,location路由跳转的地址,resolve成功的回调函数,reject失败的回调函数
VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve && reject){
        originPush.call(this,location,resolve,reject);
    }else{
        originPush.call(this,location,()=>{},()=>{});
    }
}

VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve && reject){
        OriginReplace.call(this,location,resolve,reject);
    }else{
        OriginReplace.call(this,location,()=>{},()=>{});
    }
}


//创建一个路由器实例
const router = new VueRouter({
    routes,
    //添加路由的滚动行为，实现到路由跳转到详情页的时候，滚动条在最上方
    scrollBehavior(to,from,savedPosition){
        return{x:0,y:0};//x:0代表滚动条在最左边，y:0代表滚动条在最上方
    },
});

//添加全局前置守卫，在路由跳转之前进行判断路由跳转权限
router.beforeEach(async (to,from,next)=>{
  
    //next是放行函数，next()---放行所有的路由，next(path)--放行到指定路由，next(false)
    if(store.state.user.token){
        //如果用户已经登录了，则用户信息token就存在，不能跳转到登陆页面，只有用户信息token不存在才能跳转
        if(to.path=="/login"){
            //登陆了，去登陆页面不能跳转
            next("/home");
        }else{
            //登录了，去其他页面若存在用户信息就放行，不存在就发请求获取用户信息后放行
            if(store.state.user.userInfo.name){
                next();
            }else{
                //用户信息不存在，派发action，获取用户信息成功后在跳转
                try {
                    await store.dispatch("getUserInfo");
                    next();
                } catch (error) {
                    //原来的token失效了，获取不到用户信息，清除token,重新登录
                    await store.dispatch("Logout");
                    next("/login");
                }
            }
        }
    }else{
        //未登录，用户不能跳转到支付相关页面，不能去个人中心，不能去交易相关
        if(to.path.indexOf("/trade")!=-1 ||to.path.indexOf("/pay")!=-1||to.path.indexOf("/center")!=-1){
            alert("请登录后查看！");
            //把未登录的时候想去但是没有去成的路由信息以query的形式存入地址栏中
            next("/login?redirect="+to.path);
        }else{
            next();
        }
        
    } 
});
export default router;