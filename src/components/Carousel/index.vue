<template>
   <div class="swiper-container" id="mySwiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="banner in list" :key="banner.id">
                <img :src="banner.imgUrl" />
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from "swiper";
export default {
    name:"Carousel",
    props:["list"],
    watch:{
        list:{
            immediate:true,
            handler(){
                this.$nextTick(()=>{
                    var mySwiper = new Swiper(".swiper-container",{
                        loop:true,//控制轮播图循环播放
                        autoplay:true,//控制轮播图是否自动播放
                        //配置分页器
                        pagination:{
                            el:".swiper-pagination",
                            clickable:"true",
                        },
                        //配置前进和后退按钮
                        navigation:{
                            nextEl:".swiper-button-next",
                            prevEl:".swiper-button-prev",
                        },
                    });
                });
            },
        },
    },

}
</script>

<style>

</style>