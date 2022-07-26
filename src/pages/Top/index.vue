<!--
 * @Author: ibd129 1536479720@qq.com
 * @Date: 2022-06-10 21:46:01
 * @LastEditors: ibd129 1536479720@qq.com
 * @LastEditTime: 2022-06-11 10:18:49
 * @FilePath: \vue-news-system\src\components\Header\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="Top">
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>王小虎</span>
    </el-header>
  </div>
</template>

<script>
const Top = {
  name: "Top",
};
export default Top;
</script>

<style>
</style>