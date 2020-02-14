import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import vuetify from './plugins/vuetify'

Vue.use(Vuetify)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
