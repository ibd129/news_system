<!--
 * @Author: ibd129 1536479720@qq.com
 * @Date: 2022-06-11 17:50:52
 * @LastEditors: ibd129 1536479720@qq.com
 * @LastEditTime: 2022-06-13 23:52:30
 * @FilePath: \vue-news-system\src\pages\RoleList\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="audit-manage-list">
    <el-table
      fit="true"
      :data="tableData"
      style="width: 100%"
      :highlight-current-row="true"
    >
      <el-table-column prop="title" label="新闻标题" width="200">
      </el-table-column>
      <el-table-column prop="author" label="作者" width="200">
      </el-table-column>
      <el-table-column prop="category.title" label="新闻分类" width="200">
      </el-table-column>
      <el-table-column prop="default" label="审核状态" width="200">
        <el-button type="primary" plain>已通过</el-button>
      </el-table-column>
      <el-table-column prop="default" label="操作" width="200">
        <el-button type="primary">发布</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import { Table, TableColumn, Button, ButtonGroup } from "element-ui";

Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Button);
Vue.use(ButtonGroup);

const AuditManageList = {
  name: "AuditManageList",
  data() {
    return {
      tableData: [],
    };
  },
  methods: {},
  mounted() {
    axios.get("http://localhost:3000/news?_expand=category").then((res) => {
      this.tableData = res.data;
    });
  },
};
export default AuditManageList;
</script>

<style>
</style>