<template>
  <!--放大镜效果-->
  <div class="preview">
    <!--放大的效果图-->
    <div class="maxbox" ref="maxbox">
      <img :src="img.imgUrl" ref="maxboxImg"/>
    </div>
    <!--放大镜操作区域-->
    <div class="jqzoom"  @mousemove="handler" @mouseleave="handlerLeave">
      <img :src="img.imgUrl"/>
       <!--遮罩层-->
      <div class="mask" ref="mask"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  data() {
    return {
      index: 0,
    };
  },
  props: ["skuImageList"],
  computed: {
    img() {
      if (this.skuImageList) {
        return this.skuImageList[this.index];
      } else {
        return {};
      }
    },
  },

  methods: {
    //接收ImageList传递过来的选择的图片的索引值回调
    getIndex(index) {
      this.index = index;
    },

    //放大镜效果回调函数
    handler(event) {
      //获取遮罩层
      const mask = this.$refs.mask;
      //获取放大层
      const maxbox = this.$refs.maxbox;
      //获取放大的图片
      const maxboxImg = this.$refs.maxboxImg;
      
      //让遮罩层显示
      mask.style.display = "block";
      //让放大层显示
      maxbox.style.display = "block";
      //event.offsetX----鼠标距离鼠标移入事件对象的padding边框的x距离
      //event.offsetY----鼠标距离鼠标移入事件对象的padding边框的y距离
      //top------定位元素的上外边距离其包含块上边界之间的距离
      //left------定位元素的左外边距离其包含块左边界之间的距离
      //offsetWidth ----- 返回一个元素的布局宽度，包括元素的边框、padding、width、scrollbar
      //offsetHeight ----- 返回一个元素的布局高度，包括元素的边框、padding、height、scrollbar
      let left = event.offsetX - mask.offsetWidth/2;
      let top = event.offsetY - mask.offsetHeight/2;
      //约束遮罩层的范围
      if(left<0) left=0;
      if(left>=mask.offsetWidth) left=mask.offsetWidth;//mask.offsetWidth正好是边框宽度的一半
      if(top<0) top = 0;
      if(top>=mask.offsetHeight) top=mask.offsetHeight;//mask.offsetHeight正好是边框高度的一半
      //修改元素的left和top属性值
      mask.style.left = left + "px";
      mask.style.top = top + "px";

      //改变右边放大的图片的偏移量
      maxboxImg.style.left = -left*2+"px";
      maxboxImg.style.top = -top*2 + "px";
    },

    handlerLeave(){
      //获取遮罩层
      const mask = this.$refs.mask;
      //获取放大层
      const maxbox = this.$refs.maxbox;
      
      //让放大层消失
      maxbox.style.display = "none";
      //让遮罩层消失
      mask.style.display = "none";
    }
  },

  mounted() {
    //通过全局事件总线获取ImageList传递过来的索引值
    this.$bus.$on("getIndex", this.getIndex);
  },
};
</script>

<style lang="less" scoped>
.preview {
  .jqzoom {
    cursor: pointer;
    width: 400px;
    height: 400px;
    position: relative;
    border: 1px solid #dfdfdf;
    img {
      width: 100%;
    }
    .mask {
      width: 200px;
      height: 200px;
      background: rgba(72, 62, 62, 0.5);
      position: absolute;
      border: 1px solid #ddd;
      /*遮罩的pointer-events:none;避免后面由于鼠标移动onmousemove事件，offsetx和offsetY值受影响而产生抖动*/
      pointer-events: none;
    }
  }
  
  .maxbox {
    display: none;
    width: 400px;
    height: 400px;
    position: absolute;
    left: 420px;
    top: 0px;
    overflow: hidden;
    z-index: 20;
    border: 1px solid #ddd;
    img {
      width: 800px;
      height: 800px;
      display: block;
      position:absolute;
    }
  }
}
</style>