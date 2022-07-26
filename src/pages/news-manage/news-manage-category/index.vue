<!--
 * @Author: ibd129 1536479720@qq.com
 * @Date: 2022-06-11 17:50:52
 * @LastEditors: ibd129 1536479720@qq.com
 * @LastEditTime: 2022-06-18 22:40:57
 * @FilePath: \vue-news-system\src\pages\RoleList\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="news-manage-category">
    <el-table
      fit="true"
      :data="tableData"
      style="width: 100%"
      :highlight-current-row="true"
    >
      <el-table-column prop="id" label="ID" width="300"> </el-table-column>
      <el-table-column prop="title" label="栏目名称" width="300">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import { Table, TableColumn, Button } from "element-ui";

Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Button);

const newsManageCategory = {
  name: "newsManageCategory",
  data() {
    return {
      tableData: [],
    };
  },
  methods: {},

  mounted() {
    axios.get("http://localhost:3000/categories").then((res) => {
      this.tableData = res.data;
    });
  },
};
export default newsManageCategory;
</script>

<style>
</style>