<!--
 * @Author: ibd129 1536479720@qq.com
 * @Date: 2022-06-10 21:46:01
 * @LastEditors: ibd129 1536479720@qq.com
 * @LastEditTime: 2022-06-13 16:09:39
 * @FilePath: \vue-news-system\src\components\Header\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="home">
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="item in srcLunBo" :key="item">
        <h3 class="medium"></h3>
        <img :src="item" alt="" />
      </el-carousel-item>
    </el-carousel>
    <el-calendar v-model="value"> </el-calendar>
  </div>
</template>

<script>
import Vue from "vue";
import { Carousel, CarouselItem, Image, Calendar } from "element-ui";
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Image);
Vue.use(Calendar);
const Home = {
  name: "Home",
  data() {
    return {
      srcLunBo: [
        "http://localhost:8080/img/lb1.7971e9ac.jpeg",
        "http://localhost:8080/img/lb2.4767f379.jpeg",
        "http://localhost:8080/img/lb3.8a3362e5.jpeg",
        "http://localhost:8080/img/lb4.2ea4b996.jpeg",
        "http://localhost:8080/img/lb5.f9ff221c.jpeg",
      ],
    };
  },
  methods: {},
  mounted() {
    console.log(this.srcLunBo);
  },
};
export default Home;
</script>

<style>
.el-carousel--horizontal {
  width: 86vw;
}
.el-carousel--horizontal img {
  width: 33vw;
}
.el-calendar {
  width: 40vw;
}
</style>