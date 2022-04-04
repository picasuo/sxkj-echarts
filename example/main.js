import App from './App'
import Vue from 'vue'
import router from './router'
import SxCharts from '../src/index'

import CodeSection from './components/code-section'

Vue.use(SxCharts)
Vue.component(CodeSection.name, CodeSection)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
