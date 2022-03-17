<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex">
        <h2 class="all" @mouseenter="changeShow">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(item, index) in categoryList"
                :key="item.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="item.categoryName"
                    :data-category1Id="item.categoryId"
                    >{{ item.categoryName }}</a
                  >
                </h3>
                <div class="item-list clearfix">
                  <div
                    class="subitem"
                    v-for="itemChild in item.categoryChild"
                    :key="itemChild.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="itemChild.categoryName"
                          :data-category2Id="itemChild.categoryId"
                          >{{ itemChild.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="child in itemChild.categoryChild"
                          :key="child.categoryId"
                        >
                          <a
                            :data-categoryName="child.categoryName"
                            :data-category3Id="child.categoryId"
                            >{{ child.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//引入lodash模块下的节流函数
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      //储存用户鼠标移动到了哪一个一级分类
      currentIndex: -1,
      show: true,
    };
  },
  //当组件挂载完毕，就需要向服务器发送请求获取数据进行展示
  mounted() {
    //当路由从home跳转到search的时候，页面会重新解析，所以该组件也会重新挂载一次，可以利用这个时间修改show的数据
    if (this.$route.path === "/search") {
      this.show = false;
    }
  },

  computed: {
    ...mapState({
      /*mapState的对象写法的右侧是一个函数，函数内有一个参数可以
               接收vuex仓库的大仓库，当使用计算属性时，右侧的函数会立即执行*/
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },

  methods: {
    //鼠标进入修改响应式数据currentIndex属性,采用函数节流的方式
    changeIndex: throttle(function (index) {
      //index是当前鼠标移上的某一个一级分类的元素的索引值
      this.currentIndex = index;
    }, 50),

    //鼠标移除一级分类的事件回调
    leaveIndex() {
      this.currentIndex = -1;
      if (this.$route.path !== "/home") {
        /*当在search页面时，鼠标移出，让商品列表消失,此处不能用this.$route.path === "/home"当做条件，
        否则在点击搜索按钮添加了params参数时就会导致把params参数当成路径放在里面，条件不成立*/
        this.show = false;
      }
    },

    //当鼠标移入时，让商品列表展示
    changeShow() {
      if(this.$route.path.split("/")[1] === "detail"){
        this.show = false;
      }else{
         this.show = true;
      }
     
    },

    //三级联动导航实现路由跳转传递参数
    goSearch(event) {
      //获取当前触发事件的节点
      let element = event.target;
      //节点有一个属性dataset属性，可以获取节点的自定义属性和属性值
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      if (categoryname) {
        //如果标签上拥有categoryName属性那么它一定是a标签
        //准备路由跳转的参数对象
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else if (category3id) {
          query.category3Id = category3id;
        }

        //判断：如果路由跳转时带有params参数，需要一起带过去
        if(this.$route.params){
            location.params = this.$route.params;
        }
        location.query = query;
        this.$router.push(location);
      }
    }, 
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }

        .cur {
          background-color: skyblue;
        }
      }
    }

    //过渡动画的样式
    .sort-enter {
      //过渡动画进入的开始状态
      height: 0px;
    }

    .sort-enter-to {
      //过渡动画进入的结束状态
      height: 461px;
    }

    .sort-enter-active {
      //定义动画的时间和速率ss
      transition: all 0.5s linear;
    }
  }
}
</style>