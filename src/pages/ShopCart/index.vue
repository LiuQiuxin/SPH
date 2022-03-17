<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartList" :key="cart.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked == 1"
              @change="updateChecked(cart.skuId, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              class="mins"
              @click="handler('minus', -1, cart)"
              :disable="cart.skuNum == 1"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @click="handler('change', $event.target.value, cart)"
            />
            <a class="plus" @click="handler('add', 1, cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.cartPrice * cart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCartById(cart.skuId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked && cartList.length!==0" @change="updateAllCartChecked"/>
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart" >删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：{{ totalPrice }}</em>
        </div>
        <div class="sumbtn">
          <router-link to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//引入lodash模块下的节流函数
import throttle from "lodash/throttle";
import { mapGetters } from "vuex";
export default {
  name: "ShopCart",
  mounted() {
    //发送请求获取购物车数据
    this.getData();
  },
  methods: {
    getData() {
      //发送请求获取个人购物车数据的函数
      this.$store.dispatch("getCarList");
    },

    //更新商品的数量
    handler: throttle(async function (type, disNum, car) {
      //type用于区分点击的是那个按钮；disNum代表商品数量的变化量或最终个数，skuId代表商品的id
      //判断用户选择的是那个修改产品个数的方式
      switch (type) {
        case "add":
          //带给服务器变化的量
          disNum = 1;
          break;
        case "minus":
          disNum = car.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          if (isNaN(disNum) || disNum < 1) {
            //若用户输入非法,则变化量是0，数据保持原来的不变
            disNum = 0;
          } else {
            //用户输入合法，则变化量是输入的数字取整数后减去原来的数字
            disNum = parseInt(disNum) - car.skuNum;
          }
        default:
          break;
      }
      //派发action,通知服务器修改购买商品的数量
      try {
        await this.$store.dispatch("addOrUpdateShopCart", {
          skuId: car.skuId,
          skuNum: disNum,
        });
        //获取修改数量成功后购物车的数据,进行展示
        this.getData();
      } catch (error) {}
    }, 1000),

    //删除指定商品
    async deleteCartById(skuId) {
      try {
        await this.$store.dispatch("deleteCartListById", skuId);
        //删除数据成功,再次发请求获取购物车的数据
        this.getData();
      } catch (error) {
        //删除数据失败
        alert(error.message);
      }
    },

    //更新商品的选中状态
    async updateChecked(skuId, $event) {
      //获取当前商品的勾选状态
      let isChecked = $event.target.checked ? 1 : 0;
      try {
        await this.$store.dispatch("upadteCheckedById", {
          skuId: skuId,
          isChecked,
        });
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },

    //删除全部选中的产品
    async deleteAllCheckedCart(){
      try {
        await this.$store.dispatch("deleteAllCheckedCart");
        //删除成功,重新获取购物车列表
        this.getData();
      } catch (error) {
        //删除失败
        alert(error.message);
        
      }
    },

    //修改全选按钮的状态
   updateAllCartChecked($event){
      this.cartList.forEach((item)=>{
        this.updateChecked(item.skuId,$event);
      });
      this.getData();
    },
  },

  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      //计算购买产品的总价
      let totalPrice = 0;
      this.cartList.forEach((item) => {
        if (item.isChecked == 1) {
          totalPrice += item.skuPrice * item.skuNum;
        }
      });
      return totalPrice;
    },
    //判断全选的复选框是否全都勾选
    isAllChecked() {
      return this.cartList.every((item) => item.isChecked == 1);
      //every函数会遍历数组中的每一个元素，如果其回调函数返回false，就会停止遍历，并且返回false
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>