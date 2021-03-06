# 一个路由模块的开发过程
## 1、先构建子静态组件
## 2、集中管理api请求
## 3、发请求将数据存储到vuex中
## 4、组件获取vuex仓库中的数据，动态展示数据
# object.assign()是ES6新增加的函数，用于合并对象去重
## 1、例如：object.assign(obj1,obj2);

## 前端当中很一些需要重点掌握的功能
## 1、轮播图
## 2、数据分页
## 3、日历

# 网站为什么要使用分页功能?
## 1、如果不使用分页功能，如果一下子查询出几千条数据对于服务器压力很大，而且一下子传输几千条数据对于通信资源的占用也很大。如果采用分页功能，将需要查询的几千条数据分多次查询，就可以更加经济
## 2、element-ui等组件中有相应的分页功能，但是自己应该掌握自定义分页功能
## 3、分页的原理：<br>
    (1)完成分页器需要的参数有：当前显示的是第几页：pageNo,每一页需要展示多少条数据：pageSize，整个分页器一共有多少数据:total,总共分了多少页total/pageSize向上取整，分页连续的页码数：continue:5/7，因为奇数是对称了，美观<br>
    (2)自定义分页器开发时先传递假的数据去调试，调试成功后再调用接口从服务器中获取数据
    (3)算出连续页码的开始数字和结束的数字(很重要)

# 开发产品的详情页面
## 1、当点击商品的图片的时候，跳转到详情页面，在路由跳转的时候需要带上商品的id给详情页面，由于传递的参数是params参数，所以在配置detail时，需要占位

# 滚动行为
## 1、使用前端路由，当切换到新路由时，想要页面滚动到顶部，或者保持原先的滚动位置，就像重新加载页面那样，需要使用vue-router的滚动行为
        //添加路由的滚动行为，实现到路由跳转到详情页的时候，滚动条在最上方
        scrollBehavior(to,from,savedPosition){
            //to和from可以控制路由信息
            return{x:0,y:0};//x:0代表滚动条在最左边，y:0代表滚动条在最上方
        },


# 实现添加购物车提示功能
## 1、选择好购买的商品的相关数据后，点击加入购物车按钮，路由跳转到购物车详情页面，并向服务器发送请求，将用户购买的商品信息以参数的形式传递给服务器
1. 点击加入购物车按钮，给服务器发送请求，将购买的产品的信息加入到服务器的数据库
2. 若服务器中将购买商品的信息成功存入数据库，进行路由跳转到购物车详情页面
3. 若服务器中将购买的商品信息存入数据库失败，给用户提示，重新添加

# 浏览器存储
## 到浏览器存储中，浏览器存储是HTM5中新增加的，分为本地存储和会话存储
1. 本地存储(LocalStorage)-----5M,持久存储
2. 会话存储(SessionStorage)---非持久化，会话结束(网页关闭)数据就消失
## 本地存储和会话存储不能存对象，一般存储的是字符串，所以对象需要转化为JSON字符串才能存储，如果自己存储对象的话再次读出来无法识别


# 实现购物车页面
## 向服务器发送请求，获取购物车数据，操作vuex，组件获取数据，展示数据
1. 在向服务器发送请求获取购物车数据的时候，会发现无法获取到购物车的数据，因为服务器不知道是谁需要这些数据，它不知道发送谁的数据回来,所以需要使用uuid创建字符串来代表游客身份才行

## 实现删除选中的全部商品功能
1. 没有删除全部商品的接口，但是有通过id可以删除一个产品的接口，一次删除一个产品，多调用几次，就可以删除全部商品

# 登陆和注册页面
## 登陆和注册是必须掌握的技能、git也是必须掌握的技能，是公司工作必备基础
## 配置了@符代表src别名以后，在样式中也可以使用@符号代表src文件夹的别名，但是切记在前面加上~。
## 注册页面功能实现
1. 点击获取验证码功能向服务器发送请求，将手机号发送给服务器，后端向手机发送验证码，注册用户将验证码输入验证码输入框中
2. 输入用户密码和确认密码，比较二者是否相等
3. 点击注册按钮，完成注册后跳转路由到登陆页面
4. 表单验证手机号等是否符合规范

## 登陆页面功能实现
1. token(令牌)
    (1)一般登录成功后，服务器会下发一个token到客户端，作为用户唯一的标识符，客户端需要持久化储存token，以便下次访问网站时带着token找服务器请求用户信息进行展示
    (2)token的本质是一个唯一的字符串，主要作用就是区分用户身份
2. 用户携带token获取数据


## 生命周期函数中不能加async 
# 微信支付功能实现
## 1、安装一些可以生成二维码的插件，如qrcode
## 2、

# 全局守卫
## 若用户未登录，则不能访问交易相关(trade)、支付相关、用户中心
# 路由独享守卫
## 即使用户已经登录了，但是若用户还未付款成功，不能跳转到交易成功的页面，若用户想要跳转到交易页面，必须从加入购物车成功页面才能进入

# 图片懒加载
## 使用插件实现：vue-lazyload,使用2版本，简单

# 表单验证
## 使用插件实现：vee-validate

# 路由懒加载
## 把不同的路由对应的组件分割成不同的代码块，只有当路由被访问的时候才加载对应的组件，这样就更加高效了。

# 打包上线
## npm run build项目打包
1. 项目打包以后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错，有了map文件以后就可以像未加密的代码一样，准确的输出是哪一行那一列有错，所以map文件如果项目不需要是可以去掉的，只需要在vue.config.js文件中配置：productionSourceMap:false，即可
## 购买服务器
## 设置安全组件:让服务器的一些端口打开
## 利用xshell工具登录服务器，上线网站应用

# 统一登录账号
13700000000
111111