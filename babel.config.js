/*
 * @Author: ibd129 1536479720@qq.com
 * @Date: 2022-06-10 20:27:00
 * @LastEditors: ibd129 1536479720@qq.com
 * @LastEditTime: 2022-06-10 21:23:51
 * @FilePath: \vue-news-system\babel.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    ["@babel/preset-env", {
      "modules": false
    }],
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}