import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);


//导入各个模块的仓库
import search from "./search";
import home from "./home";
import detail from "./detail";
import shopcart from "./shopcart";
import user from "./user";
import trade from "./trade";
//对外暴露store类的一个实例
export default new Vuex.Store({
    //实现vuex仓库模块化开发存储数据
    modules:{
        home,
        search,
        detail,
        shopcart,
        user,
        trade,
    },

   
});