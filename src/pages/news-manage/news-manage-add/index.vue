<!--
 * @Author: ibd129 1536479720@qq.com
 * @Date: 2022-06-13 21:11:38
 * @LastEditors: ibd129 1536479720@qq.com
 * @LastEditTime: 2022-06-18 22:01:13
 * @FilePath: \vue-news-system\src\pages\news-manage\news-manage-add\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="news-manage-add">
    <el-steps :active="active">
      <el-step title="基本信息" description="新闻标题，新闻分类"></el-step>
      <el-step title="新闻内容" description="新闻的主体内容"></el-step>
      <el-step title="新闻提交" description="保存草稿或提交审核"></el-step>
    </el-steps>
    <div v-show="active === 1">
      <el-input placeholder="请输入内容" v-model="title">
        <template slot="prepend">* 新闻标题：</template>
      </el-input>
      <el-select v-model="value">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.value"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <br />
      <el-button type="primary" @click="next">下一步</el-button>
    </div>
    <div v-show="active === 2">
      <el-input
        type="textarea"
        :autosize="{ minRows: 4, maxRows: 8 }"
        placeholder="请输入内容"
        v-model="content"
      >
      </el-input>
      <el-button type="primary" @click="next">下一步</el-button>
      <el-button @click="backStep">上一步</el-button>
    </div>
    <div v-show="active === 3">
      <el-button type="primary" @click="next2">保存草稿</el-button>
      <el-button type="danger" @click="backStep">提交审核</el-button>
      <el-button @click="backStep">上一步</el-button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import { Step, Steps, Input, Select, Option, Button } from "element-ui";

Vue.use(Step);
Vue.use(Steps);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Button);
const newsManageAdd = {
  name: "newsManageAdd",
  data() {
    return {
      active: 1,
      options: [],
      title: this.$route.query.title,
      value: this.$route.query.value,
      content: this.$route.query.content,
      addNewsData: [],
    };
  },

  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    next2() {
      const newData = {
        title: this.title,
        content: this.content,
        categoryId: this.options.id,
      };
      this.addNewsData.push(newData);
      console.log(this.addNewsData);
      this.options.forEach((element) => {
        if (element.value === this.value) {
          this.categoryId = element.id;
          console.log(this.categoryId);
        }
      });
      this.$router.push({
        path: `/news-manage/draft`,
        query: {
          title: this.title,
          content: this.content,
          categoryId: this.categoryId,
        },
      });
    },
    backStep() {
      if (this.active-- < 0) this.active = 3;
    },
  },

  mounted() {
    axios.get("http://localhost:3000/categories").then((res) => {
      this.options = res.data;
    });
  },
};
export default newsManageAdd;
</script>

<style>
.news-manage-add {
  width: 100%;
}
.el-input-group {
  width: 85%;
  padding: 15px;
}
.el-select {
  padding: 15px;
}
.el-steps--horizontal {
  margin: 80px;
}

.el-button--primary {
  margin-left: 15px;
}
.el-textarea {
  padding: 10px;
}
</style>