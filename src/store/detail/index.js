import {reqGoodsInfo,reqAddOrUpdateShopCart} from "@/api";
//引入封装游客身份的模块uuid——用于生成一个随机字符串(同一游客生成以后不能再改变)
import {getUUID} from "@/utils/uuid_token";

const actions = {
    //获取产品详情信息
    async getGoodInfo(context,skuId){
        let result = await reqGoodsInfo(skuId);
        if(result.code === 200){
            context.commit("GETGOODINFO",result.data);
        }
    },

    //将产品添加到购物车中
    async addOrUpdateShopCart(context,{skuId,skuNum}){
        //商品加入购物车返回的结果
        let result = await reqAddOrUpdateShopCart(skuId,skuNum);
        //reqAddOrUpdateShopCart函数是一个异步函数，最终会返回一个promise对象
        if(result.code===200){
            //如果请求成功，跳转到路由到购物车详情页面
            return "Ok";//promise中返回一个非空字符串就代表成功

        }else{
            //如果请求失败，提示用户重新加入购物车
            return Promise.reject(new Error('faile'));// promise中返回Promise.reject(new Error('faile'));代表失败
        }
       
        //服务器没有返回别的需要存储到atate中的数据，所以不需要commit
    },
};
const mutations = {
    //获取产品详情信息
    GETGOODINFO(state,data){
        state.goodInfo = data;
    }
};
const state = {
    //产品的详情信息
    goodInfo:{},
    //游客的临时身份
    uuid_token:getUUID(),
};
const getters = {
    categoryView(state){
        //初始化时，goodInfo是一个空对象，空对象的categoryView属性是undefined,则访问undefined的属性会报错
        //当前计算出来的属性值至少是一个空对象，不是undefined
        return state.goodInfo.categoryView || {};
    },

    skuInfo(state){
        return state.goodInfo.skuInfo || {};
    },

    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || [];
    },


};

export default {
    actions,
    mutations,
    state,
    getters,
}