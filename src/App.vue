<template>
  <div id="app" class="outer">
    <Header/>
    <router-view> </router-view>
    <!--Footer组件在页面是home和search时是显示的，在登录和注册时是隐藏的-->
    <Footer v-show="$route.meta.isShow"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer"
export default {
  name: 'App',
  components: {
    Header,Footer,
  },
  mounted(){
    /*派发一个action，通知Vuex获取商品分类三级列表的数据，并将数据存储在仓库中，
      将请求绑定在APP组件，而APP组件只执行一次挂载，就可以只发送一次，不会重复发送请求，
      可以实现性能优化。虽然main文件也执行一次，但是只有组件实例对象vc上才绑定了$store属性，
      所以该请求只能放在APP组件中
      */
    this.$store.dispatch("categoryList");
  },
}
</script>

<style>

</style>
