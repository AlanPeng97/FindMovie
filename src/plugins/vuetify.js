import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi' || 'mdiSvg',
    values: {
      Account: 'fas fa-user-circle',
      Home: 'fas fa-home',
      Bar: 'fas fa-bars'
    }
  }
})
