<!--
 * @Author: ibd129 1536479720@qq.com
 * @Date: 2022-06-10 21:46:32
 * @LastEditors: ibd129 1536479720@qq.com
 * @LastEditTime: 2022-06-10 21:47:05
 * @FilePath: \vue-news-system\src\components\centerContent\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="centerContent">
    <el-main>
      <el-table>
        <el-table-column prop="date" label="日期" width="140">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>

<script>
const CenterContent = {
  name: "centerContent",
};
export default CenterContent;
</script>

<style>
</style>