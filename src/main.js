import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import vuetify from './plugins/vuetify'
import axios from '../node_modules/axios'
import VueResource from 'vue-resource'
import md5 from 'js-md5'

Vue.use(Vuetify)
Vue.use(VueResource)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$md5 = md5

new Vue({
  el: '#app',
  vuetify,
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
