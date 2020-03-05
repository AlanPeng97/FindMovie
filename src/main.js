import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import vuetify from './plugins/vuetify'
import axios from '../node_modules/axios'

Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  el: '#app',
  vuetify,
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
