//该文件用来对所有的api接口进行统一管理

import requests from "./request";
import mockRequests from "./mockRequest";

//三级联动导航栏接口
// /api/product/getBaseCategoryList get 无参数
//发请求,axios发请求返回的结果是promise对象
export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' });

//访问mock接口，获取mock生成的虚拟数据
export const reqGetBannerList = () => mockRequests.get('/banner');

//访问mock接口，获取floor的数据
export const reqGetFloorList = () => mockRequests.get("/floor");

//获取搜索模块的数据 /api/list  post请求 参数：10个参数
//当前这个接口/api/list传递的参数params至少是一个空对象
export const reqGetSearchInfo = (params) => requests({
     url: "/list",
     method: "post",
     data: params,//传递的参数
});


//获取产品详情信息的接口   /api/item/{skuId} get
export const reqGoodsInfo = (skuId) => requests({
     url: `/item/${skuId}`,
     method: "get",
});


//添加产品到购物车(对已有商品数量进行改动)  /api/cart/addToCart/{ skuId }/{ skuNum }   post
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests.post(`/cart/addToCart/${skuId}/${skuNum}`);



//获取购物车列表   /api/cart/cartList   get  无参数
export const reqCarList = () => requests.get("/cart/cartList");

//删除购物车数据  /api/cart/deleteCart/{skuId}  DELETE
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: "DELETE" });


//修改商品的选中状态   /api/cart/checkCart/{skuID}/{isChecked}  GET
export const reqUpdateCheckedById = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: "get" });

//获取验证码   /api/user/passport/sendCode/{phone}   get  参数 phone
export const reqgetCode = (phone) => requests({ url: `user/passport/sendCode/${phone}`, method: "get" });

//完成用户注册接口  /api/user/passport/register  post 参数：password phone code
export const reqUserRegister = (data) => requests({ url: "/user/passport/register", method: "post", data});

//完成用户登录接口  /api/user/passport/login   post 参数：phone password
export const reqUserLogin = (params) => requests({ url: "/user/passport/login", method: "post", data:params });

//获取登陆成功后的用户信息(用请求头带用户的token)  /api/user/passport/auth/getUserInfo   get  无参数
export const reqUserInfo = ()=>requests.get("/user/passport/auth/getUserInfo");

//退出登录  /api/user/passport/logout   get   无参数
export const reqLogout = ()=>requests.get("/user/passport/logout");

//获取用户地址信息的接口  /api/user/userAddress/auth/findUserAddressList  method:get
export const reqAddressInfo = ()=>mockRequests.get("/addressInfo");


//获取用户交易页的信息 /api/order/auth/trade   get
export const reqOrderInfo = ()=>requests.get("/order/auth/trade");

//提交订单请求  /api/order/auth/submitOrder?tradeNo={tradeNo}  post  有参数
export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:"post"});

//获取订单支付信息  /api/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId)=>requests.get(`/payment/weixin/createNative/${orderId}`);

//获取支付订单状态  /api/payment/weixin/queryPayStatus/{orderId}  get
export const reqPayStatus = (orderId)=>requests.get(`/payment/weixin/queryPayStatus/${orderId}`);


//获取订单列表   /api/order/auth/{page}/{limit}   get

export const reqMyOrderList = (page,limit)=>requests.get(`/order/auth/${page}/${limit}`);
