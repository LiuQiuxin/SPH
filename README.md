# 关于不同版本的Vue的说明：
##   1、关于不同版本的Vue:
1. Vue.js与Vue.runtime.xxx.js的区别：
2. Vue.js是完整版本的Vue,包含：核心功能和模板解析器
3. Vue.runtime.xxx.js是运行版的Vue,只包含核心功能，没有模板解析器
##    2、因为Vue.runtime.xxx.js没有模板解析器，所以不能使用template配置项，需要使用render函数接收到的createElement函数去指定具体内容。即完成模板解析，即render函数的作用是代替模板解析器完成模板解析

# Vue.config.js配置文件
## 1、使用vue inspect > output.js可以查看到Vue脚手架的默认配置
## 2、使用vue.config.js可以对脚手架进行个性化定制,修改默认配置，详情可以查看Vue官网的脚手架：https://cli.vuejs.org/zh/config/

# ref属性
## 1、ref属性被用于给元素或者子组件注册引用信息(id的替代者),便于使用vue获取DOM元素或子组件;
## 2、应用在html标签上获取的是真实的DOM元素，应用在组件标签上获取的是组件实例对象(vc)
## 3、使用方式：
1. 打标识：<h1 ref="xxx">...</h1>
2. 获取：this.$refs.xxx

# 配置项props
## 1、功能：让组件接收外部传过来的数据
1. 传递数据：
        <studenT name="张三" sex="男" :age="18">
2. 接收数据：
    (1)第一种方式(只接收数据)
        props:["name"]

    (2)第二种方式(限制接收数据的类型)
        props:{
            name:String,
        }
    (3)第三种方式(限制接收数据的类型、传入的必要性、指定默认值)
        props:{
            name:{
                type:String,//类型
                required:false,//必要性
                default:"hahah",//默认值
            },
        }

## 2、备注：props是接收到的外部数据是只读的，Vue底层会监测对props接收到的数据的修改，如果进行了修改，就会发出警告。若业务需求需要修改接收到的值，请复制一份props接收到的内容到data中，然后去修改data中复制过来的数据

# mixin(混入)
## 1、功能：混入可以把多个组件共用的配置提取成一个混入对象，从而实现复用
## 2、使用方式：
    (1)第一步：定义混合，如：
        {
            data(){
                return{
                    x:100,
                    y:300,
                };
            },
            methods:{
                showName(){

                        },
            }
        }
    (2)第二步：使用混合，例如：
        (1)全局混入(采用该种方式，所有的组件都会复用混入文件中的数据和函数)：Vue.mixin  (xxx)
        (2)局部混入(采用该种方式，只有配置和导入了混合文件的相关组件才能使用混入文件中的数据和函数)：mixins:[xxx],


# 插件
## 1、功能：用于增强Vue
## 2、本质：包含install方法的一个对象，install的第一个参数是Vue,第二个以后的参数是插件使用者传递的数据
## 3、定义插件：
        {
            install(Vue,options){
                //添加全局过滤器
                Vue.filter(....),

                //添加全局指令
                Vue.directive(...),
            }
        }
## 4、使用插件：
        Vue.use(插件名);

# scoped样式
## 1、作用：让样式在局部生效，防止不同组件间样式冲突
## 2、写法：`<style scoped>`

# 组件化编码流程(通用)
## 1、实现静态组件：抽取组件，使用组件实现静态页面效果
## 2、展示动态数据
    (1)数据的类型、名称是什么？
    (2)数据保存在那个文件中
    (3)交互——从绑定事件监听开始

# 总结TodoList案例
##  1、组件化编码流程：
    (1)拆分静态组件：组件要按照功能点拆分，组件名不要与html元素冲突
    (2)实现动态组件:考虑好数据的存放位置，数据是一个组件在用还是一些组件在用：
    (1)一个组件在用：放在组件自身即可。
    (2)一些组件在用：放在他们共同的父组件上(状态提升)
    (3)实现交互：从绑定事件开始
## 2、props适用于：
    (1)父组件 ===》子组件通信
    (2)子组件 ===》父组件通信(要求父组件先传递给子组件一个函数)
## 3、使用v-model时要切记：v-model绑定的值不能是props传递过来的值，因为props是不可以修改的
## 4、props传递过来的值若是对象类型的值，则修改对象中的属性时Vue不会报错，但是不推荐这样做

# webStorage(浏览器本地储存)
## 1、储存内容大小一般支持5MB左右(不同浏览器可能还不一样)
## 2、浏览器端通过Window.sessionStorage和window.localStorage属性来实现本地存储机制
## 3、相关API：
    (1)xxxxStorage.setItem("key","value");
        该方法接收一个键和值作为参数，会把键值对添加到储存中，如果键名存在，则更新其对应的值
    (2)xxxxStorage.getItem("key");
        该方法接收一个键名作为参数，返回键名对应的值
    (3)xxxxStorage.removeItem("key");
        该方法接收一个键名作为参数，并把该键名对应的数据从储存中移出
    (4)xxxxStorage.clear();
        该方法会清空存储中的所有数据
## 4、备注：
    (1) sessionStorage中存储的内容会随着浏览器窗口关闭而消失
    (2)LocalStorage中存储的数据，需要手动清除才会消失(借助API清除或者清除浏览器缓存)
    (3)xxxxxStorage.getItem(xxx)如果对应的value值获取不到，那么会返回null
    (4)JSON.parse()可以将一个JSON格式的数据转化成对象，而ISON.parse(null)的结果依然是null

# 组件的自定义事件
## 1、一种组件间的通信方式，适用于 子组件===》父组件传递数据
## 2、使用场景：A是父组件，B是子组件，B想给A传递数据，那么就要在A中给B组件标签中绑定自定义事件，事件的回调在A组件中
## 3、绑定自定义事件：
    (1)第一种方式，在父组件中给子组件标签绑定：
        <B @atguigu="test"/>或<v-on:atguigu="test"/>
    (2)第二种方式，在父组件中绑定(Vue3中已经丢弃$on,$off,$once方法)：
        mounted(){this.$refs.xxx.$on("atguigu",this.test)}
## 4、触发自定义事件(在子组件B中执行)：this.$emit("atguigu",要传递给A组件的数据)
## 5、解绑自定义事件：this.$off("atguigu");
## 6、组件上也可以绑定原生DOM事件，但是需要使用native(Vue3已经弃用)修饰符，不然会被当做自定义事件处理
## 7、注意：通过this.$refs.xxx.$on("atguigu",回调)绑定自定义事件时，回调要么设置在methods中，要么使用箭头函数，否则this指向会出现问题

# 全局事件总线
## 1、一种组件间的通信方式，适用于任意间的组件进行通信
## 2、安装全局事件总线
        new Vue({
            ...
            beforeCreate(){
                Vue.prototype.$bus = this;//安装全局事件总线，$bus就是当前应用的vm
            },
            ...
        });
## 3、使用事件总线
    (1)接收数据：A组件想要接收数据，则在A组件中给$bus绑定自定义事件，事件的回调留在A中
        methods(){
            //定义自定义事件的回调函数
            demo(data){
                console.log("接收到的数据为："+data);
            }
        }

        mounted(){
            //绑定自定义事件
            this.$bus.$on("demo",this.demo);
        }
    (2)提供数据：在提供数据的组件内触发自定义事件并传入数据
            this.$bus.$emit("demo",data);
## 4、备注：在接收数据的beforeDestory钩子中，用$off去解绑当前组件所用到的事件

# 消息的订阅与发布
## 1、一种组件间的通信方式：适合任意的组件间通信
## 2、使用步骤：
    （1）安装pubsub:npm i pubsub-js
    （2）在消息的订阅组件和发布组件引入模块pubsub-js
        import pubsub from "pubsub-js"
    （3）接收数据：A组件想要接收数据，则在A中订阅消息，订阅的回调函数留在A组件自身：
        pubsub.subscribe("消息名",callback);
    （4）提供数据：B组件想要发送数据，则在B中发布消息：
        pubsub.publish("消息名",data);

    （5）结束后在beforeDestroy钩子中，用pubsub.unsubscribe(pid)去取消订阅，pid是消息的id，执行完函数pubsub.subscribe("消息名",callback);以后会自动返回
## 3、备注：pubsub-js库在其他前端框架中也适用于消息的订阅和发布；消息订阅与发布和全局事件总线实现的功能一致，复杂度也一致，但是消息的订阅与发布还需要依赖第三方库，所以使用率没有全局事件总线高

# $nextTick(callback) 生命周期函数
    该API需要接收一个回调函数，函数里面的内容会在DOM更新完成后再执行

# Vue封装的过渡和动画
## 1、作用：在插入、更新或者移除DOM元素时，在合适的时候给元素添加或删除样式类名
## 2、写法：
    (1)准备好样式(自己写或者引入第三方动画库animate.css等)：
        元素进入的样式：
            1、v-enter:元素进入的起点类名
            2、v-enter-active:元素进入的过程中类名
            3、v-enter-to:元素进入的终点类名
        元素离开的样式：
            1、v-leave:元素离开的起点类名
            2、v-leave-active:元素离开的过程中类名
            3、v-leave-to:元素离开的终点类名
    (2)使用<transition></transition>标签包裹要过渡的元素，并配置name属性：
        <transition>
            <h1 v-show="isShow">你好啊</h1>
        </transition>
    （3）备注：若有多个元素需要过渡，则需要使用:<transition-group>标签将元素们包裹，
    且每个元素都要指定key值

# AJAX请求
## 1、在浏览器的地址栏输入url地址并回车发送的是get请求
## 2、常用的发送AJAX请求的方式有4种<br>
    (1)xhr ===>JS中内置的AJAX请求书写方式，AJAX请求的鼻祖，但是在实际编程中使用很少，因为其发送一个AJAX请求调用的API较多，很麻烦<br>

    (2)jQuery ===>第三方库封装xhr实现的发送AJAX请求方式，在Vue和React框架编写的项目中很少使用jQuery封装的AJAX请求，因为jQuery的核心是封装DOM操作，而react和Vue的目的在于减少操作DOM，所以如果在react和Vue的项目中引入了一个专门操作DOM的jQuery库不太合适，而且jQuery库中大概有80%的内容都在封装DOM操作，只有20%的内容进行了一些其他类似于AJAX请求封装的工作，所以一般在react和Vue项目中使用axios方式发送AJAX请求较多<br>

    (3)axios  ===>第三方库封装xhr实现的发送AJAX请求方式，它是promise风格的封装，且支持请求拦截器和响应拦截器，体积小，大约只有jQuery体积的四分之一，<br>
    (4)fetch  ===>类似xhr方式，是JS中内置的发送AJAX请求方式，是promise风格的方式。但是其存在两个缺点：一是fetch会将AJAX请求返回的数据包裹两层promise，所以需要两次调用then方法才能拿到返回的数据；二是fetch的兼容性较差，在IE浏览器上无法使用。所以实际过程中使用率低于axios<br>
    (5)vue-resource ===>vue的第三方插件库，是对xhr的封装，在vue 1.0版本使用较多，现在使用较少，vue官方已经不维护了。该库的使用跟axios类型，通过Vue的use方法引入vue-resource库后，只要将axios.换成this.$http.即可。<br>
## 3、解决跨域问题的三个方法：<br>
    (1)CORS(Cross Origin Resource Sharing),完全在服务器端进行设置，后端人员在服务中配置一些响应头即可;<br>
    (2)jsonp,利用了script的天然跨域属性，使用其src属性引入服务器的资源即可，但是其只支持get请求，在实际编程中用到的不多，但是在面试问的较多<br>
    (3)代理服务器，在实际编程中用的最多。只有前端和服务器之间交互才需要发送AJAX请求，服务器和服务器之间交互发送的是普通的http请求。所有可以使用一台与当前网页同源（协议名，域名，端口号都一致）的代理服务器来作为代理服务器，接收网页发送的请求，然后再将网页的请求转发给装有资源的服务器，从而解决跨域问题。<br>
        (1)开启代理服务器有两种方法：nginx(学习成本高，且需要对后端技术有一定的了解，否则难以掌握)和vue-cli配置代理(简单易懂)<br>

## 4、vue-cli配置代理服务器<br>
    (1)方法1：在vue.config.js配置文件中添加如下配置：<br>
        devServer:{
            proxy:"http://localhost:8000",
        }
        说明：
            (1)优点：配置简单，请求资源时直接发送给代理服务器的url即可(网页的当前url)
            (2)缺点：不能配置多个代理，不能灵活控制请求是否要经过代理服务器的转发
            (3)工作方式：若按照上述配置代理，当请求了前端public文件夹下(代理服务器)不存在的资源时，那么请求会转发给服务器，若存在，则请求不会转发给服务器，即会优先匹配前端存在的资源
    (2)方式2：编写vue.config.js配置具体代理规则<br>
        devServer:{
            proxy:{
                //配置第一个代理服务器
                'api1':{//控制请求是否经过代理服务器转发的前缀
                    target:"http://localhost:5000",//代理目标的基础路径
                    pathRewrite:{'^/api1/':''},
                    ws: true,//用于支持websocket
                    changeOrigin: true,//用于控制请求头中的host值
                },

                //配置第二个代理服务器
                'api2':{//控制请求是否经过代理服务器转发的前缀
                    target:"http://localhost:8000",//代理目标的基础路径
                    pathRewrite:{'^/api2/':''},
                    ws: true,//用于支持websocket
                    changeOrigin: true,//用于控制请求头中的host值
                },
            },
        },

        说明：
            (1)优点：可以配置多个代理，其可以灵活的控制请求是否通过代理服务器转发，若想通过代理服务器转发，则设置请求时在端口号后面紧跟着写前缀，反之，若不想通过代理服务器转发，则设置请求时不要写前缀
            (2)缺点：配置繁琐，要想通过代理服务器转发请求必须加前缀

# 插槽
## 1、作用：让父组件可以向子组件指定位置插入html结构，也是一种组件间的通信方式，适用于父组件===》子组件
## 2、插槽的分类：默认插槽、具名插槽、作用域插槽
## 3、适用方式：
    (1)默认插槽：
        父组件中：
            <Category>
                <div>html结构</div>
            </Category>
        子组件：
            <template>
                <div>
                    <!--定义插槽-->
                    <slot></slot>
                </div>
            </template>
    (2)具名插槽：
        父组件中：
            <Category>
                <template slot="center">
                    <div>html结构</div>
                </template>

                <template v-slot:footer>
                    <div>html结构</div>
                </template>
            </Category>
        子组件中：
            <template>
                <div>
                    <!--定义插槽-->
                    <slot name="center"></slot>
                        <slot name="footer"></slot>
                </div>
            </template>
    (3)作用域插槽
        1、理解:数据在组件的自身，但是根据数据生成的结构需要组件的使用者来决定(games数据在Category组件中，但使用数据遍历出来的结构由App组件决定)。通过作用域插槽中的属性可以将组件中的数据传递给其使用者，在使用者要传递的html结构中，通过scope属性或slot-scope属性可以接收到组件传递过来的数据。
        2、具体编码：
            父组件：

            子组件：
            <CategoryList title="游戏">
                <template scope="atguigu">
                    <ul>
                    <li v-for="(item,index) in atguigu.games" :key="index">{{item}}</li>
                    </ul>
                </template>
            </CategoryList>

            <CategoryList title="游戏">
                <template scope="{games}">
                    <ol>
                    <li v-for="(item,index) in games" :key="index">{{item}}</li>
                    </ol>
                </template>
            </CategoryList>
            <CategoryList title="游戏">
                <template slot-scope="h">
                        <h4 v-for="(item,index) in h.games" :key="index">{{item}}</h4>
                </template>
            </CategoryList>
            子组件：
            <template>
                <div class="category">
                    <h3>{{title}}的分类</h3>
                    <slot :games="games">插槽的默认值1</slot>
                </div>
            </template>
            <script>
            export default {
                name:"CategoryList",
                props:["title"],
                data(){
                    return{
                        games:["红色警戒","创越火线","劲舞团","超级玛丽"],
                    }
                },
            }
            </script>
        3、作用域插槽也可以使用name属性

# vuex
## 1、定义：vuex是专门在Vue中实现集中状态(数据)管理的一个Vue插件，用于对vue应用中的多个组件的共享状态(数据)进行集中式的管理(读/写)，也是一种组件间的通信方式，且其适用于任意组件间通信
## 2、对于多组件间管理同一个数据来说，全局事件总线和事件的订阅与发布太过繁琐，所以一般在大型项目中都使用vuex
## 3、什么时候使用Vuex
    (1)多个组件依赖于同一状态(数据)
    (2)来自不同组件的行为需要变更同一状态(数据)
## 4、注意：vue2中要使用vuex的3版本，vue3中要使用vuex的4版本
## 5、搭建Vuex环境
    (1)创建文件：src/store/index.js
        //该文件用于创建vuex中最核心的store
        //引入vuex
        import Vuex from "vuex";
        //引入Vue
        import Vue from "vue";

        //使用Vuex插件,使用后在Vue的配置项中就多了一个store配置项
        Vue.use(Vuex);

        //准备actions——用于响应组件中的动作
        const actions = {};

        //准备mutations——用于操作数据(state)
        const mutations = {};

        //准备state——用于存储数据
        const state = {};

        //创建store,并向外暴露store
        export default new Vuex.Store({
            actions,
            mutations,
            state,
        });
    （2）在main.js中创建vm时传入store配置项
## 6、vuex的基本使用
    (1)初始化数据，配置actions、配置mutations,操作store数据
    (2)组件中读取vuex中的数据：$store.state.数据名
    (3)组件中修改vuex中的数据：this.$store.dispatch("action中的方法名",数据);或
                                this.$store.commit("mutations中的方法名",数据);
    (4)备注：若没有网络请求或者其他业务逻辑，组件中也可以越过actions，即不写dispatch方法，
                直接编写commit方法
## 7、vuex中getters配置项的使用
    (1)概念：当state中的数据需要经过加工，且加工过程比较复杂时使用，可以使用getters加工
    (2)在stores文件中追加getters配置
    (3)在组件中读取数据：$stores.getters.加工后的数据名

## 8、Vuex中四个map方法的使用
    (1)mapState方法：用于帮助我们映射state中的数据为计算属性，减少组件中模板语法中的代码量
        computed:{
            //借助mapState生成计算属性，从state中读取数据的对象写法
            //...mapState({number:"number",school:"school",subject:"subject"}),

            //借助mapState生成计算属性，从state中读取数据的数组写法
            ...mapState(["number","school","subject"]),
        },

    (2)mapGetter方法:用于帮助我们映射getters中的数据为计算属性，减少组件模板语法中的代码量
        computed:{
            //借助mapGetters生成计算属性，从getters中读取数据的对象写法
            ...mapGetters({bigNumber:"bigNumber"}),
            //借助mapGetters生成计算属性，从getters中读取数据的数组写法
            //...mapGetters(["bigNumber"]),
        }
    (3)mapActios方法：用于帮助我们生成与actions对话的方法。即包含$store.dispatch()方法的函数
    methods:{
        //借助mapActions生成对应的方法，方法中会调用dispatch去联系actions(数组写法)
        //...mapActions(["oddAdd","waiteAdd"]),

        //借助mapActions生成对应的方法，方法中会调用dispatch去联系actions(对象写法)
        ...mapActions({oddAdd:"oddAdd",waiteAdd:"waiteAdd"}),
    },
    (4)mapMutations方法：用于帮助我们生成与mutations对话的方法，即包含$store.commit()方法的函数
    methods:{
        //借助mapMuatations生成对应的方法，方法中会调用commit去联系mutations(对象写法)
        ...mapMutations({add:"ADD",substraction:"SUBSTRACTION"}),
    }

    (5)备注：mapActions和mapMutations使用时，若需要传递参数，在模板中绑定事件时就需要将参数传递进去，否则参数是事件对象，无法完成业务逻辑
## 9、vuex模块化+命名空间
    (1)目的：让代码更好维护，让多种数据分类更加明确
    (2)修改store/index.js
        (1)将不同种类的数据放在不同的模块中，并使用namespaced:true;开启命名空间
        (2)开启命名空间后将各个模块引入index.js文件中，使用modules:{}配置将各个模块的配置引入stores对象中
    (3)开启命名空间后，组件中读取state中的数据
        (1)方式一：自己直接读取
            this.$store.state.模块名.数据名
        (2)方式二：借助mapState读取
            ...mapState("模块名",["数据名1","数据名2",....]);
    (4)开启命名空间后，组件中读取getters中的数据
        (1)方式一：自己直接读取
            this.$store.getters.["模块名/数据名"]
        (2)方式二：借助mapgetters读取
            ...mapgetters("模块名",["数据名1","数据名2",....]);
    (5)开启命名空间后，组件中调用dispatch
        (1)方式一：自己直接调用
            this.$store.dispatch("模块名/方法名",传入的数据);
        (2)方式二：借助mapActions读取
            ...mapActions("模块名",["方法名1","方法名2",....]);
    (5)开启命名空间后，组件中调用commit
        (1)方式一：自己直接调用
            this.$store.commit("模块名/方法名",传入的数据);
        (2)方式二：借助mapMutations读取
            ...mapMutations("模块名",["方法名1","方法名2",....]);


# 路由
## 1、生活中的路由概念----实现多台设备上网
    (1)路由(route)就是一组key-value的对应关系
    (2)路由器(router)是管理多个路由的设备
## 2、编程中的路由概念----实现SPA(single page web application)应用
    (1)一个路由就是一组映射关系(key-value)
    (2)key为路径，value可能是function或component
## 3、编程中路由的分类
    (1)后端路由：
        (1)理解：value是function,用于处理客户端提交的请求
        (2)工作过程：服务器接收到客户端发送的一个请求时，根据请求路径key找到匹配的函数function来处理请求，返回响应数据
    (2)前端路由
        (1)理解：value是component,用于展示页面内容
        (2)工作过程：当浏览器的路径改变时，对应的组件就会显示
## 3、vue-router的理解
    (1)vue-router是vue的一个插件库，专门用来实现SPA应用
## 4、对SPA应用的理解
    (1)SPA即为单页Web应用(single page web application,SPA)
    (2)整个应用只有一个完整的页面(index.html)
    (3)点击页面中的导航链接不会刷新页面，只会做页面的局部更新
    (4)数据需要通过ajax请求获取
## 5、vue-router插件的基本使用
    (1)安装vue-router，命令：npm i vue-router
    (2)应用插件：Vue.use(VueRouter);
    (3)编写router配置项:
        //引入vueRouter插件库
        import VueRouter from "vue-router";
        //引入路由组件
        import AbouT from "./components/AbouT.vue";
        import HomE from "./components/HomE.vue";

        //创建router实例对象，去管理一组一组的路由规则
        const router = new VueRouter({
            routes:[
                {
                    path:"/about",
                    component:AbouT,
                },
                {
                    path:"/home",
                    component:HomE,
                },
            
            ],
        });
        //向模块外暴露router 
        export default router;
    (4)实现切换(active-class是样式库自带的类，可配置高亮样式)
        <router-link active-class="active" to="/about">About</router-link>

    (5)指定展示位置：
        <router-view><router-view>
## 6、几个注意点：
    (1)路由组件通常放在pages文件夹，一般组件通常放在components文件夹
    (2)通过切换，“隐藏”了的路由组件，默认是被销毁了的，需要的时候再去挂载
    (3)每个组件都有自己的$route属性，里面储存着自己的路由信息
    (4)整个应用只有一个router,即整个应用的组件都拥有同一个router，可以通过组件的$router属性获取到
    (5)2022年2月7日以后，vue-router的默认版本为4版本，而vue-router4只能在vue3中使用，所以如果默认安装不选择v-router的版本就会报错，所以在vue2中安装vue-router要指定版本3：npm i vue-router @3
## 7、嵌套路由
    (1)配置路由规则，使用children配置项
            routes:[
            {
                path:"/about",
                component:AbouT,
            },
            {
                path:"/home",
                component:HomE,
                children:[
                    {
                        path:"news",//此处一定不要写/
                        component:NewS,
                    },
                    {
                        path:"messages",//此处一定不要写/
                        component:MessageS,
                    },
                ],
            },
        ],
    (2)跳转(要写完整路径)
            <router-link to="/home/news">news</router-link>
## 8、路由的query参数传递
    (1)传递参数
        <!--跳转并携带query参数，to的字符串写法-->
        <router-link :to="`/home/message/detail?id=${message.id}&title=${message.title}`"></router-link>
        <!--跳转并携带query参数，to的对象写法-->
        <router-link 
            :to="{
                path="/home/message/detail",
                query:{
                    id:message.id,
                    title:message.title,
                }"
        ></router-link>
    (2)接收参数
        $route.query.id
        $route.query.title
## 9、命名路由
    (1)作用：路由路径过长时简化路由的跳转
    (2)如何使用：
        (1)给路由命名：在对应的路由配置里面加上name配置项：name:"hello"，
        (2)简化跳转：
            <!--简化前需要填写完整的路径-->
            <router-link to="/demo/test/welcome">跳转</router-link>
                <!--简化后直接通过名字跳转-->
            <router-link :to="{name:'hello'}}">跳转</router-link>
            <!--简化路由跳转配合传递参数-->
            <router-link :to="{
                name:'hello',
                query:{
                    id:666,
                    title:"你好",
                },
                }"
            >跳转</router-link>
## 10、路由的params参数
    (1)配置路由，声明接收params参数
        routes:[
            {
                path:"/home",
                component:HomE,
                children:[
                    {
                        path:"news",
                        component:NewS,
                    },
                    {

                        path:"messages",
                        component:MessageS,
                        children:[
                            {
                                name:"xiangqing",
                                /*使用占位符告诉路由detail后面的是params参数 */
                                path:"detail/:id/:title",
                                component:DetaiL,
                            },
                        ],
                    },
                ],
            },
        ],
    (2)传递参数
        <!--跳转并携带params参数，to的字符串写法-->
        <router-link :to="/home/message.detail/666/你好啊">跳转</router-link>

            <!--跳转并携带params参数，to的对象写法-->
        <router-link 
            :to="{
                name:"xiangqing",
                params:[
                    id:666,
                    title:"你好啊",
                ],
                }"
        >跳转</router-link>
    (3)特别注意：路由携带params参数时，若使用to的对象写法，则不能使用path配置项，必须使用name配置

    (4)接收参数
        $route.params.id
        $route.params.title
## 11、路由的props配置
    1、作用：让路由组件可以更方便的收到参数
    2、实际使用：
        (1)那个路由配置传递参数，就在那个路由配置里面添加props配置
        (2)实际例子：
            {
                name:"xiangqing",
                /*告诉路由detail后面的是params参数 */
                path:"detail/:id/:title",
                component:DetaiL,
                /*props的第一种写法，值为对象,该对象中的所有key-value都会以props的形式
                    传递给DetaiL组件，但是该方式应用很少，因为传递的数据是固定的*/
                //props:{a:1,b:"hello"},
                /*props的第二种写法，值为布尔值,若布尔值为真，则会把该路由收到的所有  params参数，以props的形式传递给DetaiL组件,但是该方式不支持接收query参数，只支持params参数*/
                //props:true,
                /*props的第三种写法，值为一个回调函数,该函数可以接收到组件的路由对象$route,通过读取$route的属性就可以读取到传递的参数*/
                props($route){
                    return {
                        id:$route.params.id,
                        title:$route.params.title,
                    };
                },
            },

## 12、router-link的replace属性
    (1)作用:控制路由跳转时操作浏览器历史记录的模板
    (2)浏览器的历史记录有两种写入方式：分别是push和replace，push是追加历史记录，replace是替换当前记录。即若在router-link标签上添加了replace属性，就会使得在router-link对应的页面地址下，无法后退回上一步历史地址。
    (4)路由跳转时默认为push写入模式
    (5)如何开启replace模式：
        <router-link replace>News</router-link>
## 13、编程式路由导航
    (1)作用：不借助<router-link>实现路由跳转，让路由更加灵活
    (2)具体编码：调用$router的几个API实现
        this.$router.push({
            //采用push模式跳转到指定路由
            name:"xiangqing",
            params:{
                id:xxx,
                title:xxx,
            },
        });

        //采用replace模式跳转到指定路由
        this.$router.replace({
            name:"xiangqing",
            params:{
                id:xxx,
                title:xxx,
            },
        });
        
        this.$router.back();//向前跳转一个历史记录
        this.$router.forward();//向后跳转一个历史记录
        this.$router.go(a);//向后或向前跳转a个历史记录，a为正向前跳转，a为负向后跳转
## 14、缓存路由组件
    (1)作用：让暂时不被展示的路由组件保持挂载，不被销毁
    (2)具体编码：
        <keep-live include="组件名">
            <router-view><router-view>
        </keep-live>
    (3)注意：可以在<keep-live>标签中添加include属性，指定需要缓存下来(挂载)的组件名，如果不指定，则会将<router-view>标签u内的组件全都缓存下来,且include属性有两种书写方式：
            --缓存多个组件:include="['NewS','MessageS']"
            --缓存一个组件include="NewS"
    (4)<keep-live>标签的位置就是原来<router-view>标签的位置
## 15、两个新的生命周期钩子
    (1)、作用：路由组件所独有的两个钩子，用于捕获路由组件的激活状态
    (2)、具体名字：
        (1)actived(){},路由组件被激活时调用
        (2)deactived(){},路由组件被失活时调用
## 16、路由守卫
    (1)作用：保护路由的安全(进行权限控制)
    (2)路由守卫的分类：全局守卫、独享守卫、组件内守卫
    (3)全局守卫：
        (1)全局守卫又分为全局前置守卫和全局后置守卫
        //给路由器router添加全局前置路由守卫——初始化的时候和每次路由切换之前调用beforeEach里面的回调函数
        router.beforeEach((to,from,next)=>{
            //判断LocalStorage里面的学校是否是atguigu，如果是就放行，如果不是就不放行，即动态决定路由是否能够跳转以及跳转到何处
            if(to.meta.isAuth){//控制是否需要鉴定权限
                if(localStorage.getItem("school") === "atguigu"){
                    next();
                }else{
                    alert("学校名不对，无权限查看");
                }
            }else{
                next();
            }
        });

        //给路由器添加全局后置路由守卫——初始化的时候和每次路由切换之后调用afterEach里面的回调函数
        router.afterEach((to,from)=>{
            document.title = to.meta.title || "硅谷系统";
        });
    (4)独享路由守卫
        (1)独享路由守卫只有一个beforeEnter
                beforeEnter(to,from,next){
                        //判断LocalStorage里面的学校是否是atguigu，如果是就放行，如果不是就不放行，即动态决定路由是否能够跳转以及跳转到何处
                    if(to.meta.isAuth){//控制是否需要鉴定权限
                        if(localStorage.getItem("school") === "atguigu"){
                            next();
                        }else{
                            alert("学校名不对，无权限查看");
                        }
                    }else{
                        next();
                    }
                },
    (5)组件路由守卫
        //通过路由规则进入该组件时函数会被调用
        beforeRouteEnter (to, from, next) {
            //判断LocalStorage里面的学校是否是atguigu，如果是就放行，如果不是就不放行，即动态决定路由是否能够跳转以及跳转到何处
            if(localStorage.getItem("school") === "atguigu"){
                next();
            }else{
                alert("学校名不对，无权限查看");
            }
        },
        //通过路由规则离开该组件时函数会被调用
        afterRouteLeave(to, from, next){
            next();
        },
## 17、路由器的两种工作模式：history和hash
    (1)对于一个url来说什么是hash值？——浏览器url地址中#及其后面的内容就是url地址的哈希值
    (2)hash值不会包含在HTTP请求中，即：hash值不会被发送给服务器
    (3)hash模式：
        (1)、url地址中永远带着#号，不美观
        (2)、若以后将url地址通过第三方手机app分享，若app校验严格，则地址会被标记为不合法
        (3)、兼容性较好
    (4)、history模式
        (1)地址干净、美观
        (2)兼容性和hash模式相比略差
        (3)应用部署上线时需要后端人员支持，解决刷新页面服务端404的问题
## 18、网站的部署和上线
    (1)前端编写好项目以后，需要将编写好的文件转化为html、js和css格式的文件，否则浏览器无法识别。
    (2)使用npm run build命令可以将编写好的项目文件转化到一个文件夹dist下，生成的文件就是一个网站的静态资源
    (3)通过将dist文件夹下的文件部署到服务器中，即可上线
    (4)若路由工作在在history模式下，则上线的时候刷新会找不到服务器中的文件，造成404错误，所以可以通过express的一个中间件connect-history-api-fallback解决该问题，但是该中间件的使用要在静态资源调用前
        //导入库connect-history-api-fallback
        const history = require("connect-history-api-fallback");
        //应用中间件connect-history-api-fallback来处理网页，使得其在history模式下能正常工作
        app.use(history());
        //静态资源调用
        app.use(express.static(__dirname+"/static"));

## Vue UI组件库
    1、移动端常用的UI组件库
        (1)Vant         https://youzan.github.io/vant
        (2)Cube UI      https://didi.github.io/cube-ui
        (3)Mint UI      http://mint-ui.github.io

    2、PC端常用的UI组件库
        (1)Element UI   https://element.eleme.cn
        (2)IView UI     https://www.iviewui.com

        




