<!--
 * @Author: ibd129 1536479720@qq.com
 * @Date: 2022-06-11 17:50:52
 * @LastEditors: ibd129 1536479720@qq.com
 * @LastEditTime: 2022-06-16 22:35:59
 * @FilePath: \vue-news-system\src\pages\RoleList\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <router-link to="/role/list">
    <div class="roleList">
      <el-table
        :data="tableData"
        style="width: 100%"
        :highlight-current-row="true"
      >
        <el-table-column prop="id" label="id" width="300"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="300">
        </el-table-column>
      </el-table>
    </div>
  </router-link>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import { Table, TableColumn, Button, Switch } from "element-ui";

Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Button);
Vue.use(Switch);

const RoleList = {
  name: "RoleList",
  data() {
    return {
      tableData: [],
    };
  },
  methods: {},
  mounted() {
    axios.get("http://localhost:3000/roles").then((res) => {
      this.tableData = res.data;
    });
  },
};
export default RoleList;
</script>

<style>
</style>