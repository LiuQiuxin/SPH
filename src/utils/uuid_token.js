//用于创建临时游客身份
import { nanoid } from "nanoid";

//该函数会生成一个随机字符串，并且持久存储，每次执行时不能发生变化，用于代表游客身份
export const getUUID = ()=>{
    //先从本地存储中获取uuid，看看本地存储中是否有，如果有，就不做处理，读出返回，如果没有就添加
    let uuid_token = localStorage.getItem("UUIDTOKEN");
    if(!uuid_token){
        uuid_token = nanoid();
        localStorage.setItem("UUIDTOKEN",uuid_token);
    }

    return uuid_token;
};