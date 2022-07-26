<!--
 * @Author: ibd129 1536479720@qq.com
 * @Date: 2022-06-12 00:32:24
 * @LastEditors: ibd129 1536479720@qq.com
 * @LastEditTime: 2022-06-12 12:44:13
 * @FilePath: \vue-news-system\src\components\Login\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="login">
    <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="name">
        <el-input type="text" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Vue from "vue";
import { Form, FormItem, Input, Button } from "element-ui";
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
const Login = {
  name: "Login",
};
export default Login;
</script>

<style>
</style>