import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 默认索引，文件夹下 index.js, index.vue  index.json会默认加载这些文件,按照这个顺序加载
// 使用vue-cli的时候，会有@符号在路径中作为前缀使用的时候，代表src目录
import router from './router'
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
// 职责：导入项目依赖的资源（包， css ...）
// 职责2：初始化根实例
