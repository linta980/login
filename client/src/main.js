import Vue from 'vue'
import App from './App.vue'
import router from './router'
import crono from 'vue-crono'

Vue.config.productionTip = false
Vue.use(crono)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
