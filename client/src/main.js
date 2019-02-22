import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
// import './registerAWSAmplifyAuth'
import UpdatedContentModal from '@/components/UpdatedContentModal'

Vue.config.productionTip = false
Vue.component('UpdatedContentModal', UpdatedContentModal)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
