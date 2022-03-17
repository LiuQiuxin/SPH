//home模块的小仓库

//引入请求管理模块
import {reqCategoryList,reqGetBannerList,reqGetFloorList} from "@/api/index";

const actions = {
    //获取三级联动导航栏的数据
    async categoryList(context){
        //向服务器发送请求，获取数据
        let result = await reqCategoryList();
        if(result.code === 200){
            //如果接收响应数据成功，则将数据存入state
            context.commit("CATEGORYLIST",result.data);
        }

    },

    //获取首页轮播图的数据
    async getBannerList(context){
        let result = await reqGetBannerList();
        if(result.code === 200){
            context.commit("GETBANNERLIST",result.data);
        }

    },

    //获取floor的数据
    async getFloorList(context){
        let result = await reqGetFloorList();
        if(result.code === 200){
            context.commit("GETFLOORLIST",result.data);
        }
    },
};
const mutations = {
    //将商品分类栏的数据存入state
    CATEGORYLIST(state,data){
        state.categoryList = data;
    },

    //将轮播图的数据存入state
    GETBANNERLIST(state,data){
        state.bannerList = data;
    },

    //将floor的数据存入仓库
    GETFLOORLIST(state,data){
        state.floorList = data;
    },
};
const state = {
    //state中的数据默认初始值别瞎写，要根据接口返回值来初始化，若接口返回的是数组，则初始化为数组
    categoryList:[],
    //轮播图的数据
    bannerList:[],
    //floor中的数据
    floorList:[],

};
const getters = {};

export default {
    actions,
    mutations,
    state,
    getters, 
};