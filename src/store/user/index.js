
//登陆与注册仓库模块
import {reqgetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout} from "@/api/index";
const actions = {
    //获取验证码
    async getCode({commit},phone){
        //本接口会把验证码返回，但是正常情况下该验证码应该返回用户的手机号，但是为了省钱所以发回前台
        let result = await reqgetCode(phone);
        if(result.code == 200){
            commit("GETCODE",result.data);
            return "ok";
        }else{
            return Promise.reject(new Error("fail"));
        }
    },

    //完成用户注册
    async userRegister({commit},data){
        let result = await reqUserRegister(data);
        if(result.code == 200){
            return "ok";
        }else{
            return Promise.reject(new Error("fail"));
        }
    },

    //用户登陆
    async userLogin({commit},data){
        let result = await reqUserLogin(data);
        //服务器下发的token是某一个用户的唯一标识符(uuid)，类似前面的前端自己创建游客身份
        //token用于找服务器找用户信息进行展示
        if(result.code==200){
            //本地持久化存储token
            localStorage.setItem("TOKEN",result.data.token);
            commit("USERLOGIN",result.data.token);
            return "ok";
        }else{
            return Promise.reject(new Error("fail"));
        }

    },

    //用户登录成功后获取用户信息
    async getUserInfo({commit}){
        let result = await reqUserInfo();
        if(result.code==200){
            //将用户信息传入mutations
            commit("GETUSERINFO",result.data);
            return "ok";
        }else{
            console.log("获取用户信息失败");
            return Promise.reject(new Error("fail"));
        }
    },

    //用户退出登录
    async Logout({commit}){
        console.log("退出登录");
        //向服务器发送请求，退出登录，要求其清空相关数据
        let result = await reqLogout();
        if(result.code==200){
            //告诉仓库清空本地数据
            commit("CLEAR");
            return "ok";
        }else{
            return Promise.reject(new Error("fail"));
        }
    },
};
const mutations = {
    //存入后端返回的验证码
    GETCODE(state,data){
        state.code = data;
    },

    //存入用户信息
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo;
    },

    //存入用户的token,该步骤必不可少，不然刚刚进入home页面，home页面完成组件挂载时的请求会失败，因为此时还没有将token存入vuex中，必须要刷新一次才能在vuex中获取到用户的token,而请求头中的token是vuex中获取的
    USERLOGIN(state,data){
        state.token = data;
    },

    //退出登录，清除数据
    CLEAR(state){
        state.token = "";
        state.userInfo = {};
        //清除本地缓存中的TOKEN
        localStorage.removeItem("TOKEN");
    },

};
const state = {
    //注册用验证码
    code:"",
    //用户的身份标识token
    token:localStorage.getItem("TOKEN"),
    //用户的身份信息
    userInfo : {},
};
const getters = {};

export default {
    actions,
    mutations,
    state,
    getters,
};