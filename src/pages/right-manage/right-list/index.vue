<!--
 * @Author: ibd129 1536479720@qq.com
 * @Date: 2022-06-10 21:46:01
 * @LastEditors: ibd129 1536479720@qq.com
 * @LastEditTime: 2022-06-17 19:47:31
 * @FilePath: \vue-news-system\src\components\Header\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="right-list">
    <el-table
      :data="tableData"
      style="width: 100%"
      :stripe="true"
      :highlight-current-row="true"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      >

      <el-table-column prop="id" label="id" width="200"> </el-table-column>
      <el-table-column label="权限路径" width="200">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.key }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="权限名称" width="200">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium" type="warning">{{ scope.row.title }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="default" label="操作" width="200" type="index">
        <template slot-scope="scope">
          <el-button
            type="danger"
            icon="el-icon-delete"
            :disabled="scope.row.default"
            @click="rootDeleteBtn(scope.row, tableData)"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="为确保是本人操作，请输入密码后进行删除"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-input placeholder="请输入密码" v-model="surePwd" clearable>
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureDelete(row, arr)"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import {
  Table,
  TableColumn,
  Button,
  Tag,
  Message,
  Dialog,
  Input,
} from "element-ui";

Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Button);
Vue.use(Tag);
Vue.use(Dialog);
Vue.use(Input);

const RightList = {
  name: "RightList",
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      surePwd: "",
      index: "",
      adminInfo: {},
      row: "",
      children: [],
      arr: [],
    };
  },
  methods: {
    rootDeleteBtn(row, arr) {
      axios.get("http://localhost:3000/users/1").then((res) => {
        this.adminInfo = res.data;
      });
      //删除时的提示开关
      this.dialogVisible = true;
      this.row = row;
      this.arr = arr;
    },
    sureDelete(row, arr) {
      if (this.adminInfo.password == this.surePwd) {
        arr.forEach((element, i) => {
          if (element.id === row.id && element.grade === 1) {
            arr.splice(i, 1);
            axios.delete(`http://localhost:3000/rights/${row.id}`);
          }
          element.children.forEach((ele, index) => {
            if (ele.id === row.id && ele.grade === 2) {
              element.children.splice(index, 1);
              axios.delete(`http://localhost:3000/children/${this.row.id}`);
            }
          });
        });
        Message({
          message: "删除成功",
          type: "success",
        });
        this.dialogVisible = false;
      } else {
        Message({
          message: "删除失败",
          type: "error",
        });
        this.dialogVisible = false;
      }
    },
  },

  mounted() {
    axios.get("http://localhost:3000/rights?_embed=children").then((res) => {
      this.tableData = res.data;
    });
    axios.get("http://localhost:3000/children").then((res) => {
      this.children = res.data;
    });
  },
};
export default RightList;
</script>

<style>
.cell {
  font-weight: bold;
}
</style>