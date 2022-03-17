import {reqAddressInfo,reqOrderInfo} from "@/api";
const actions = {
    //获取用户地址信息
    async getUserAddress({commit}){
        let result = await reqAddressInfo();
        if(result.code==200){
            //将地址信息提交到仓库
            commit("GETUSERADDRESS",result.data);
        }
    },

    //获取用户购买商品清单的数据
   async getOrderInfo({commit}){
        let result = await reqOrderInfo();
        if(result.code==200){
            commit("GETORDERINFO",result.data);
        }else{
            alert(result.message);
        }
    },
};
const mutations = {
    GETUSERADDRESS(state,data){
        //将用户地址信息存入仓库
        state.address = data;
    },

    GETORDERINFO(state,data){
        //将用户订单页的数据存入仓库
        state.orderInfo = data;
    },
};
const state = {
    address:[],
    orderInfo:{},
};
const getters = {};

export default {
    state,
    actions,
    mutations,
    getters,
};