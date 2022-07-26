/*
 * @Author: ibd129 1536479720@qq.com
 * @Date: 2022-06-10 20:27:00
 * @LastEditors: ibd129 1536479720@qq.com
 * @LastEditTime: 2022-06-14 15:08:04
 * @FilePath: \vue-news-system\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router/index'
Vue.use(VueRouter)
new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')