module.exports = {
    //关闭eslint
    lintOnSave:false,
    //配置代理服务器
    devServer:{
        proxy:{
            //配置第一个代理服务器
            '/api':{//控制请求是否经过代理服务器转发的前缀
                target:"http://39.98.123.211",//代理目标的基础路径
                ws: true,//用于支持websocket
                changeOrigin: true,//用于控制请求头中的host值
            },
        }
    },
}