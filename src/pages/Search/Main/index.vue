<template>
  <div class="main">
    <div class="py-container">
      <!--bread-->
      <div class="bread">
        <ul class="fl sui-breadcrumb">
          <li>
            <a href="#">全部结果</a>
          </li>
        </ul>
        <ul class="fl sui-tag">
          <li class="with-x" v-show="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">×</i></li>
        </ul>
      </div>
      <!--selector-->
      <div class="clearfix selector">
        <div class="type-wrap logo">
          <div class="fl key brand">品牌</div>
          <div class="value logos">
            <ul class="logo-list">
              <li v-for="trademark in trademarkList" :key="trademark.tmId">{{trademark.tmName}}</li>
            </ul>
          </div>
          <div class="ext">
            <a href="javascript:void(0);" class="sui-btn">多选</a>
            <a href="javascript:void(0);">更多</a>
          </div>
        </div>
        <div class="type-wrap" v-for="attrs in attrsList" :key="attrs.attrId">
          <div class="fl key">{{attrs.attrName}}</div>
          <div class="fl value">
            <ul class="type-list">
              <li v-for="(attr,index) in attrs.attrValueList" :key="index">
                <a>{{attr}}</a>
              </li>
            </ul>
          </div>
          <div class="fl ext"></div>
        </div>
      </div>searchParams.categoryName
      <div class="details clearfix">
        <div class="sui-navbar">
          <div class="navbar-inner filter">
            <ul class="sui-nav">
              <li class="active">
                <a href="#">综合</a>
              </li>
              <li>
                <a href="#">销量</a>
              </li>
              <li>
                <a href="#">新品</a>
              </li>
              <li>
                <a href="#">评价</a>
              </li>
              <li>
                <a href="#">价格⬆</a>
              </li>
              <li>
                <a href="#">价格⬇</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="goods-list">
          <ul class="yui3-g">
            <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
              <div class="list-wrap">
                <div class="p-img">
                  <a href="item.html" target="_blank"
                    ><img :src="good.defaultImg"
                  /></a>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>&nbsp;
                    <i> {{good.price}}.00</i>
                  </strong>
                </div>
                <div class="attr">
                  <a
                    target="_blank"
                    href="item.html"
                    title="good.title"
                    >{{good.title}}</a
                  >
                </div>
                <div class="commit">
                  <i class="command">已有<span>2000</span>人评价</i>
                </div>
                <div class="operate">
                  <a
                    href="success-cart.html"
                    target="_blank"
                    class="sui-btn btn-bordered btn-danger"
                    >加入购物车</a
                  >
                  <a href="javascript:void(0);" class="sui-btn btn-bordered"
                    >收藏</a
                  >
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="fr page">
          <div class="sui-pagination clearfix">
            <ul>
              <li class="prev disabled">
                <a href="#">«上一页</a>
              </li>
              <li class="active">
                <a href="#">1</a>
              </li>
              <li>
                <a href="#">2</a>
              </li>
              <li>
                <a href="#">3</a>
              </li>
              <li>
                <a href="#">4</a>
              </li>
              <li>
                <a href="#">5</a>
              </li>
              <li class="dotted"><span>...</span></li>
              <li class="next">
                <a href="#">下一页»</a>
              </li>
            </ul>
            <div><span>共10页&nbsp;</span></div>
          </div>
        </div>
      </div>
      <!--hotsale-->
      <div class="clearfix hot-sale">
        <h4 class="title">热卖商品</h4>
        <div class="hot-list">
          <ul class="yui3-g">
            <li class="yui3-u-1-4">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="./images/like_01.png" />
                </div>
                <div class="attr">
                  <em>Apple苹果iPhone 6s (A1699)</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>4088.00</i>
                  </strong>
                </div>
                <div class="commit">
                  <i class="command">已有700人评价</i>
                </div>
              </div>
            </li>
            <li class="yui3-u-1-4">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="./images/like_03.png" />
                </div>
                <div class="attr">
                  <em>金属A面，360°翻转，APP下单省300！</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>4088.00</i>
                  </strong>
                </div>
                <div class="commit">
                  <i class="command">已有700人评价</i>
                </div>
              </div>
            </li>
            <li class="yui3-u-1-4">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="./images/like_04.png" />
                </div>
                <div class="attr">
                  <em>256SSD商务大咖，完爆职场，APP下单立减200</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>4068.00</i>
                  </strong>
                </div>
                <div class="commit">
                  <i class="command">已有20人评价</i>
                </div>
              </div>
            </li>
            <li class="yui3-u-1-4">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="./images/like_02.png" />
                </div>
                <div class="attr">
                  <em>Apple苹果iPhone 6s (A1699)</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>4088.00</i>
                  </strong>
                </div>
                <div class="commit">
                  <i class="command">已有700人评价</i>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex"; 
export default {
  name: "Main",
  data(){
      return{
          //带给服务器的参数
          searchParams:{
              category1Id:"",//一级分类的id
              category2Id:"",//二级分类的id
              category3Id:"",//三级分类的id
              categoryName:"",//分类名字
              keyword:"",//关键字
              order:"",//排序
              pageNo:1,//分页器用的
              pageSize:10,//代表的是每一个展示的数据个数
              props:[],//平台售卖属性操作带的参数
              trademark:"",//品牌
                 
          },
      };
  },
  computed:{
      ...mapGetters(["goodsList","attrsList","trademarkList"]),
  },

  beforeMount(){
      //再发请求获取数据之前，把接口需要的查询参数进行整理，服务器就会返回查询到的数据
      Object.assign(this.searchParams,this.$route.params,this.$route.query);
  },
  mounted(){
      this.getData();
  },
  methods:{
      //向服务器发送请求获取search模块的数据(根据参数的不同返回不同的数据进行展示)
      getData(){
        this.$store.dispatch("getSearchList",this.searchParams);
      },

      //点击面包屑的小×，移出搜索项,并重新按照现有条件向服务器发送请求搜索数据
      removeCategoryName(){
        this.searchParams.categoryName=undefined;
        this.searchParams.category1Id = undefined;
        this.searchParams.category2Id = undefined;
        this.searchParams.category3Id = undefined;
        this.getData();
      },


  },
  watch:{
      //监听路由属性的变化，发送请求
      $route:{
          handler(newValue,oldValue){
            Object.assign(this.searchParams,this.$route.query,this.$route.params);
            this.getData();
            //每一次请求，应该把相应的1、2、3级分类的id置空，让他接收下一次相应的1\2\3id
           this.searchParams.category1Id = undefined;
           this.searchParams.category2Id = undefined;
           this.searchParams.category3Id = undefined;
           this.searchParams.keyword = undefined;
          },
      },
  }

};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;
  .py-container {
    width: 1200px;
    margin: 0 auto;
    .bread {
      margin-bottom: 5px;
      overflow: hidden;
      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;
        li {
          display: inline-block;
          line-height: 18px;
          a {
            color: #666;
            text-decoration: none;
            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }
      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;
        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;
          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }
          &:hover {
            color: #28a3ef;
          }
        }
      }
    }
    .selector {
      border: 1px solid #ddd;
      margin-bottom: 5px;
      overflow: hidden;
      .logo {
        border-top: 0;
        margin: 0;
        position: relative;
        overflow: hidden;
        .key {
          padding-bottom: 87px !important;
        }
      }
      .type-wrap {
        margin: 0;
        position: relative;
        border-top: 1px solid #ddd;
        overflow: hidden;
        .key {
          width: 100px;
          background: #f1f1f1;
          line-height: 26px;
          text-align: right;
          padding: 10px 10px 0 15px;
          float: left;
        }
        .value {
          overflow: hidden;
          padding: 10px 0 0 15px;
          color: #333;
          margin-left: 120px;
          padding-right: 90px;
          .logo-list {
            li {
              float: left;
              border: 1px solid #e4e4e4;
              margin: -1px -1px 0 0;
              width: 105px;
              height: 52px;
              text-align: center;
              line-height: 52px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-weight: 700;
              color: #e1251b;
              font-style: italic;
              font-size: 14px;
              img {
                max-width: 100%;
                vertical-align: middle;
              }
            }
          }
          .type-list {
            li {
              float: left;
              display: block;
              margin-right: 30px;
              line-height: 26px;
              a {
                text-decoration: none;
                color: #666;
              }
            }
          }
        }
        .ext {
          position: absolute;
          top: 10px;
          right: 10px;
          .sui-btn {
            display: inline-block;
            padding: 2px 14px;
            box-sizing: border-box;
            margin-bottom: 0;
            font-size: 12px;
            line-height: 18px;
            text-align: center;
            vertical-align: middle;
            cursor: pointer;
            padding: 0 10px;
            background: #fff;
            border: 1px solid #d5d5d5;
          }
          a {
            color: #666;
          }
        }
      }
    }
    .details {
      margin-bottom: 5px;
      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;
        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;
            li {
              float: left;
              line-height: 18px;
              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }
              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }
      .goods-list {
        margin: 20px 0;
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;
            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;
                a {
                  color: #666;
                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }
              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;
                strong {
                  font-weight: 700;
                  i {
                    margin-left: -5px;
                  }
                }
              }
              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                a {
                  color: #333;
                  text-decoration: none;
                }
              }
              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }
              .operate {
                padding: 12px 15px;
                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }
                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;
                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }
                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;
                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;
        .sui-pagination {
          margin: 18px 0;
          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;
            li {
              line-height: 18px;
              display: inline-block;
              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }
              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }
              &.prev {
                a {
                  background-color: #fafafa;
                }
              }
              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }
              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }
              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }
          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
    .hot-sale {
      margin-bottom: 5px;
      border: 1px solid #ddd;
      .title {
        font-weight: 700;
        font-size: 14px;
        line-height: 21px;
        border-bottom: 1px solid #ddd;
        background: #f1f1f1;
        color: #333;
        margin: 0;
        padding: 5px 0 5px 15px;
      }
      .hot-list {
        padding: 15px;
        ul {
          display: flex;
          li {
            width: 25%;
            height: 100%;
            .list-wrap {
              .p-img,
              .price,
              .attr,
              .commit {
                padding-left: 15px;
              }
              .p-img {
                img {
                  max-width: 100%;
                  vertical-align: middle;
                  border: 0;
                }
              }
              .attr {
                width: 85%;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
              }
              .price {
                font-size: 18px;
                color: #c81623;
                strong {
                  font-weight: 700;
                  i {
                    margin-left: -5px;
                  }
                }
              }
              .commit {
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
              }
            }
          }
        }
      }
    }
  }
}
</style>