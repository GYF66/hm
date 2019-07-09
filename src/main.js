import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 职责：导入项目依赖的资源（包， css ...）
// 职责2：初始化根实例
new Vue({
  render: h => h(App)
}).$mount('#app')
