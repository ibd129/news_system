<!--
 * @Author: ibd129 1536479720@qq.com
 * @Date: 2022-06-11 17:50:52
 * @LastEditors: ibd129 1536479720@qq.com
 * @LastEditTime: 2022-06-18 22:45:16
 * @FilePath: \vue-news-system\src\pages\RoleList\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="news-manage-draft">
    <el-table
      :data="tableData"
      style="width: 100%"
      :highlight-current-row="true"
    >
      <el-table-column prop="id" label="ID" width="200"> </el-table-column>
      <el-table-column prop="title" label="新闻标题" width="200">
      </el-table-column>
      <el-table-column prop="author" label="作者" width="200">
      </el-table-column>
      <el-table-column prop="category.title" label="新闻分类" width="200">
      </el-table-column>
      <el-table-column prop="default" label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            :disabled="scope.row.default"
            circle
            @click="upNewsData(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            :disabled="scope.row.default"
            circle
            @click="deleteNewsBtn(scope.row, tableData)"
          ></el-button>
          <el-button type="primary" circle @click="upNewsInfo"
            ><i class="el-icon-upload el-icon--right"></i
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
        <el-button type="primary" @click="newsDelete(row, arr)"
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
  Switch,
  Dialog,
  Message,
} from "element-ui";

Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Button);
Vue.use(Switch);
Vue.use(Dialog);

const newsManageDraft = {
  name: "newsManageDraft",
  inject: ["reload"],
  data() {
    return {
      tableData: [],
      isTitle: 0,
      arr: [],
      dialogVisible: false,
      surePwd: "",
      adminInfo: {},
      row: "",

      newsInfo: {
        title: this.$route.query.title,
        content: this.$route.query.content,
        region: "",
        author: "admin",
        categoryId: this.$route.query.categoryId,
        auditState: 1,
        publishState: 1,
        star: 11,
        view: 33,
        roleId: 1,
        createTime: new Date(),
        publishTime: new Date(),
        category: {
          id: this.$route.query.categoryId,
        },
      },
    };
  },
  methods: {
    //点击跳转到编辑页面
    upNewsData(row) {
      this.$router.push({
        path: `/news-manage/add`,
        query: {
          title: row.title,
          content: row.content,
          value: row.category.value,
        },
      });
    },
    //删除功能
    deleteNewsBtn(row, arr) {
      axios.get("http://localhost:3000/users/1").then((res) => {
        this.adminInfo = res.data;
      });
      //删除时的提示开关
      this.dialogVisible = true;
      this.row = row;
      this.arr = arr;
    },
    newsDelete(row, arr) {
      if (this.adminInfo.password == this.surePwd) {
        arr.forEach((element, i) => {
          if (element.id === row.id) {
            arr.splice(i, 1);
            axios.delete(`http://localhost:3000/news/${row.id}`);
          }
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

    //上传功能
    upNewsInfo() {
      this.$router.push({
        path: `/audit-manage/audit`,
        query: {},
      });
    },
  },

  mounted() {
    //显示撰写新闻存进草稿箱的内容
    axios.get("http://localhost:3000/news?_expand=category").then((res) => {
      this.tableData = res.data;
      this.tableData.forEach((element) => {
        this.arr.push(element.title);
      });
      console.log(this.arr);
      this.isTitle = this.arr.indexOf(this.$route.query.title);
      console.log(this.isTitle);
      //存入草稿箱条件
      if (
        this.$route.query.title !== undefined &&
        this.$route.query.title !== "" &&
        this.isTitle < 0
      ) {
        //添加进后台数据
        axios.post("http://localhost:3000/news", this.newsInfo);
        this.reload();
      }
    });
  },
};
export default newsManageDraft;
</script>

<style>
.cell:nth-last-child(1) {
  text-align: center;
}
</style>