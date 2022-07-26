<!--
 * @Author: ibd129 1536479720@qq.com
 * @Date: 2022-06-10 20:27:00
 * @LastEditors: ibd129 1536479720@qq.com
 * @LastEditTime: 2022-06-18 19:45:43
 * @FilePath: \vue-news-system\src\App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="app">
    <el-container style="height: 500px; border: 1px solid #eee">
      <!-- <Top></Top> -->
      <SideMenu> </SideMenu>
      <el-container>
        <router-view v-if="isRouterAlive"> </router-view>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Vue from "vue";
// import Top from "./pages/Top";
import SideMenu from "./components/SideMenu";
// import CenterContent from "./pages/CenterContent";

import {
  Container,
  Aside,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Header,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Main,
  Table,
  TableColumn,
} from "element-ui";
Vue.use(Menu);
Vue.use(Aside);
Vue.use(Submenu);
Vue.use(Container);
Vue.use(MenuItemGroup);
Vue.use(MenuItem);
Vue.use(Header);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Main);
Vue.use(Table);
Vue.use(TableColumn);
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
  components: { SideMenu },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
a {
  text-decoration: none;
}
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  position: absolute;
}
::-webkit-scrollbar-thumb {
  background-color: skyblue;
}
::-webkit-scrollbar-track {
  background-color: rgb(238, 234, 234);
}
</style>
