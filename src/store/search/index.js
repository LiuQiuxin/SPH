//search模块的小仓库

//导入请求函数
import {reqGetSearchInfo} from "@/api/index";
const actions = {
    //获取搜索栏的数据
    async getSearchList(context,params={}){
        let result = await reqGetSearchInfo(params);
        if(result.code === 200){
            context.commit("GETSEARCHLIST",result.data);
        }
    },
};
const mutations = {
    //将搜索栏获取的数据存入sate中
    GETSEARCHLIST(state,data){
        state.searchList = data;
    },
};
const state = {
    searchList:{},
};
const getters = {
    //getters的作用是为了简化仓库中的数据而生
    goodsList(state){
        return state.searchList.goodsList;
    },

    attrsList(state){
        return state.searchList.attrsList;
    },
    trademarkList(state){
        return state.searchList.trademarkList;
    },

};

export default {
    actions,
    mutations,
    state,
    getters, 
};