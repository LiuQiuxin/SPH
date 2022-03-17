//本文件用于对mock接口进行访问的axios进行二次封装
import axios from "axios";
//引入进度条控制插件,
import nprogress from "nprogress";
//引入进度条的样式
import "nprogress/nprogress.css";

//1、利用axios的create方法，创建一个axios实例,create方法需要传入一个配置对象
const requests = axios.create({
    //配置基础路径，当使用axios发送请求时，路径当中自动添加api
    baseURL:"/mock",
    //代表请求超时的时间5s,即若当前发送的请求在5s内没有收到响应，则代表此次请求失败
    timeout:5000,

});

//请求拦截器：在请求发送之前，请求拦截器可以监测到，所以可以在请求发出去之前做些事情
requests.interceptors.request.use((config)=>{
    //发送请求前，加载进度条开始动
    nprogress.start();
    //config是一个配置对象，里面有一个很重要的属性headers请求头
    return config;
});


//响应拦截器
requests.interceptors.response.use(
    (res)=>{
        //响应成功后，进度条结束
        nprogress.done();
        //响应成功的回调函数：服务器响应数据回来以后，响应拦截器可以监测到，可以做一些事情
        return res.data;
    },
    (err)=>{
        //响应失败的回调函数：响应失败后可以做做一些提示
        return Promise.reject(new Error(err));
    }
);

//向外暴露
export default requests;