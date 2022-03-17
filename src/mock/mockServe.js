//该文件用于利用mockjs插件生成虚拟数据

import Mock from "mockjs";

//引入json数据格式(json格式的的文件模块是默认对外暴露的)
import banner from "./banner.json";
import floor from "./floor.json";
import addressInfo from "./addressInfo.json";

//模拟数据,Mock是一个对象，里面有一个mock方法，该方法需要两个参数，第一个参数是请求发送的接口地址，第二个参数是请求数据
Mock.mock("/mock/banner",{code:200,data:banner});//模拟首页轮播图的数据，访问接口/mock/banner可以获取
Mock.mock("/mock/floor",{code:200,data:floor});//
Mock.mock("/mock/addressInfo",{code:200,data: addressInfo});//

