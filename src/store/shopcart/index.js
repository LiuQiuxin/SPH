import {reqCarList,reqDeleteCartById,reqUpdateCheckedById} from "@/api";
const actions = {
    //获取购物车列表数据
    async getCarList(context){
        let result = await reqCarList();
        if(result.code === 200){
            context.commit("GETCARLIST",result.data);
        }
    },

    //删除购物车数据
    async deleteCartListById(context,skuId){
        let result = await reqDeleteCartById(skuId);
        if(result.code ==200){
            return "ok";
        }else{
            return  Promise(new Error("fail"));
        }
    },

    //修改购物车某一个产品的选中状态
    async upadteCheckedById(context,{skuId,isChecked}){
        let result = await reqUpdateCheckedById(skuId,isChecked);
        if(result.code == 200){
            return "ok";
        }else{
            return Promise.reject(new Error("fail"));
        }
    },

    //删除全部勾选的产品
    async deleteAllCheckedCart(context){
        let PromiseAll = [];
        //获取购物车中全部的产品,并遍历检测商品是否被选中，如果选中则调用删除action将其删除
        context.getters.cartList.forEach((item)=>{
           if(item.isChecked==1){
                //调用本仓库的删除商品action
               let Promise = context.dispatch("deleteCartListById",item.skuId);
               //将每一次返回的promise添加到数组中
               PromiseAll.push(Promise);
           }
        });
        return Promise.all(PromiseAll);//如果PromiseAll数组中有一个Promise的状态是失败，
                                    //则Promise.all的状态是失败，只有数组中所有的Promise状态都是
                                    //成功，才会返回成功,即只有所有选中的商品都删除了才会代表删除成功
    },

    //修改全选按钮的状态
   async updateAllCartChecked(context,isChecked){
       let PromiseAll = [];
        //全选按钮选中,则将所有没有被选中的商品都选中,全选按钮不选中，则将所有选中的商品都不选中
        context.state.shopCarList[0].cartInfoList.forEach((item)=>{
            let Promise = context.dispatch("upadteCheckedByIdss",{skuid:item.skuId,isChecked});
            PromiseAll.push(Promise);
        });
        return Promise.all(PromiseAll);
    },

    

};
const mutations = {
    //写入购物车列表数据入state
    GETCARLIST(state,data){
        state.shopCarList = data;
    },
};
const state = {
    shopCarList :[],
};
const getters = {
    cartList(state){
        if(state.shopCarList[0]){
            return state.shopCarList[0].cartInfoList;
        }else{
            return [];
        }
    },
};

export default {
    actions,
    mutations,
    state,
    getters,
};