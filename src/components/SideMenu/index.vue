<!--
 * @Author: ibd129 1536479720@qq.com
 * @Date: 2022-06-10 21:44:19
 * @LastEditors: ibd129 1536479720@qq.com
 * @LastEditTime: 2022-06-18 00:18:56
 * @FilePath: \vue-news-system\src\components\sideMenu\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="sideMenu">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu>
        <el-submenu
          v-for="(item, index) in sideMenuData"
          :index="item.id + ''"
          :key="index"
        >
          <template slot="title"
            ><router-link :to="item.key" class=""
              >{{ item.title }}
            </router-link>
          </template>

          <el-menu-item-group
            v-for="(item, index) in item.children"
            v-show="item.pagepermisson === 1"
            :index="item.id + ''"
            :key="index"
            ><router-link :to="item.key" class="">
              <el-menu-item index="1-1">{{ item.title }}</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
import axios from "axios";

const SideMenu = {
  name: "sideMenu",
  data() {
    return {
      sideMenuData: [],
    };
  },
  mounted() {
    axios.get("http://localhost:3000/rights?_embed=children").then((res) => {
      this.sideMenuData = res.data;
    });
  },
};
export default SideMenu;
</script>

<style>
</style>