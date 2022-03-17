# 项目中的错误总结
## 1、各种包的版本不兼容，容易造成问题，使得项目报错
    解决办法：2022年2月7日以后，vue-router的默认版本为4版本，而vue-router4只能在vue3中使用，所以如果默认安装不选择v-router的版本就会报错，所以在vue2中安装vue-router要指定版本3：npm i vue-router @3；才能实现兼容。在本项目中使用的vue-router版本是3.5.2
## 2、vue2中要使用vuex的3版本，vue3中要使用vuex的4版本

## 3、编程式路由跳转到当前路由(参数不变)，多次执行时会抛出NavigationDuplicated警告错误？而声明式导航不会出现这样的错误
    解决办法：声明式导航不会出现这样的问题是因为其已经在vue-router的底层处理了，而编程式导航的push和replace方法会返回一个promise对象，promise对象有一个成功和失败的回调函数，用来捕获异步事件的执行结果，而在调用push和replace的时候，我们并没有传递这两个回调函数。所以要想解决这个问题，需要在调用这两个函数的时候传入异步执行操作成功还是失败的回调函数，用来捕获和处理异常。
        this.$router.push(
            {
                name:"search",
                params:{keyword:this.keyword},

            },
            (response)=>{},
            (error)=>{},
        );
    但是该方式指标不治本，只能对本次路由跳转有用。
    this.$router是类VueRouter的一个实例，this.$router.push()方法是VueRouter原型对象上的一个函数，所以this.$router.push()方法的上下文是类VueRouter的一个实例对象。通过对this.$router.push()方法进行重写，后面不管是那个组件调用push方法实现路由挑转都不会出现这个错误了。replace同理。
        //把VueRouter的原型对象的push方法先保存一份
        let originPush = VueRouter.prototype.push;
        let OriginReplace = VueRouter.prototype.replace;

        //重写push|replace方法,location路由跳转的地址,resolve成功的回调函数,reject失败的回调函数
        VueRouter.prototype.push = function(location,resolve,reject){
            if(resolve && reject){
                originPush.call(this,location,resolve,reject);
            }else{
                originPush.call(this,location,()=>{},()=>{});
            }
        }

        VueRouter.prototype.replace = function(location,resolve,reject){
            if(resolve && reject){
                OriginReplace.call(this,location,resolve,reject);
            }else{
                OriginReplace.call(this,location,()=>{},()=>{});
            }
        }





## 4、用户登录以后，多个组件展示用户信息需要在每一个组件的mounted函数中发出获取用户信息的请求，不能只登录一次就直接获取完毕
## 5、 用户已经登录了网站，却还能回到登录页面

## 6、登陆成功后，页面会跳转到home页面，当home页面组件挂载完成后需要通过请求头的形式添加用户的token,并发送请求信息向服务器获取用户信息，此时控制台会报错，显示获取用户信息失败，且home页面显示用户信息的地方并未成功显示。但是刷新后发现页面获取用户信息正常，且控制台报错消失
    解决方案：通过百度查找相关的案例，和实际调试发现在登陆成功后页面服务器下发用户的唯一标识到客户端，此时需要将token存储到浏览器本地存储localStorage中，后通过vuex获取到token存入vuex的sate库中存在时延导致错误。因为我在action中获取到了token后，只是将其存入了localStorage中，并没有在通过mutations的形式在初始化的时候存入state中，只是在state中直接读取了localStorage中的token,而实际情况是，localStorage中数据的读取需要在存入以后再刷新页面才能获取，这样就相当于我只存入了token并没有读取token，那么第一次请求时没有token必然请求会发送失败。
## 7、在home页面发送请求还存在的问题有如果用户没有登录，只是通过游客的方式去浏览网页，控制台也会报错，表示请求失败，虽然不影响功能，但是影响用户体验
    解决方案：在前置路由守卫中发送请求，当判断用户的token是否存在，如果存在且用户进行页面跳转前再判断用户信息是否存在，如果不存在在调用请求获取用户信息，如果用户信息存在，则直接进行跳转。如果token不存在，则跳转到登陆页面进行登陆


## 8、每次进行页面登陆时都需要去localStorage将token清除以后才能进入页面，不然就会一直发送请求失败，获取不了数据，导致页面进不去