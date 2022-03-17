<template>
  <div class="fr page">
      <ul>
        <li class="prev" v-show="pageNo!==1" @click="getPageNo(pageNo-1)">
          <a href="#">«上一页</a>
        </li>
        <li :class="pageNo===1?'active':''">
          <a href="#" v-show="startAndEndNum.start >= 1" @click="getPageNo(1)">1</a>
        </li>
        <li class="dotted" v-show="startAndEndNum.start !== 1"><span>...</span></li>


        <li @click="getPageNo(startAndEndNum.start+num)" v-for="(num,index) in (startAndEndNum.end-startAndEndNum.start)" :key="index" :class="pageNo===num+startAndEndNum.start?'active':''">
          <a href="#">{{startAndEndNum.start+num}}</a>
        </li>


        <li class="dotted" v-show="startAndEndNum.end!==totalPage"><span>...</span></li>
        <li :class="pageNo===totalPage?'active':''" @click="getPageNo(totalPage)">
          <a href="#" v-show="startAndEndNum.end!==totalPage">{{totalPage}}</a>
        </li>
        <li class="next" v-show="pageNo!==totalPage" @click="getPageNo(pageNo+1)">
          <a href="#">下一页»</a>
        </li>
      </ul>
    <div class="total">共{{totalPage}}页</div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props:["pageSize","pageNo","total","continues"],
  computed:{
      //总的页数
      totalPage(){
          return Math.ceil(this.total/this.pageSize);
      },
      //连续页码的开始数字和结束数字
      startAndEndNum(){
          let {pageSize,pageNo,totalPage,continues} = this;
          let start = pageNo-parseInt(continues/2);
          let end = pageNo+parseInt(continues/2);
          if(totalPage<continues){
              start = 1;
              end = totalPage;
          }else{
            if(start<1){
               start = 1;
               end = continues;
            }

            if(end>totalPage){
                start = totalPage-continues;
                end = totalPage;
            }
          }
         

          return {start,end};
          

      },
  },

  methods:{
      getPageNo(pageNo){
          //提醒父组件search获取页码重新发送请求，获取新的数据
          this.$bus.$emit("changePageNo",pageNo);
      },
  },
};
</script>

<style lang="less" scoped>
.page {
    width:1200px;
    margin:0px auto;
    height:42px;
    padding:0px;
    box-sizing: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    ul {
      width: 680px;
      padding:0px;
      li {
        display: inline-block;
        padding:0px;
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
            background-color: #e1251b;
            color: #fff;
            border-color: #fff;
            cursor: default;
          }
        }
        &.prev {
          a {
            background-color: #fafafa;
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
    .total{
      color: #333;
      font-size: 18px;
      line-height:66px;
      margin:0px;
    }
}
</style>