<template>
<div>
  <v-snackbar
  v-model="showHint"
  :color="color"
  top
  :timeout="timeout"
  >
  {{ hint }}
  <v-btn
  text
  @click="showHint = false"
  >Close</v-btn>
  </v-snackbar>
    <v-app-bar
    height="60"
    fixed
    hide-on-scroll
    >
    <v-btn @click="drawer = true" icon color="primary">
        <v-icon>$vuetify.icons.Bar</v-icon>
      </v-btn>
      <v-toolbar-title>FindMovieToWatch</v-toolbar-title>
      <div id="tf">
      <v-text-field
      dense
      label="Search"
      v-model.trim="searchName"
      outlined
      ></v-text-field>
      </div>
      <v-btn small icon @click="checkSearch">
        <v-icon>fa-search</v-icon>
      </v-btn>
      <v-spacer></v-spacer>

     <v-menu
     v-model="menu"
     offset-y
     >
     <template v-slot:activator = "{ on }">
      <v-btn icon color="primary" v-on="on" @click=reloadState>
        <v-icon>$vuetify.icons.Account</v-icon>
      </v-btn>
      </template>
      <v-card>
        <v-list>
          <v-list-item-group color="primary">
            <v-list-item v-if="!loginState" @click=reloadState to="/login">
              <v-list-item-icon>
                <v-icon>mdi-login</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Login</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="loginState" @click=reloadState to="/account">
              <v-list-item-icon>
                <v-icon>{{mdiAccount}}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Home</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="loginState" @click=quit>
              <v-list-item-icon>
                <v-icon>{{mdiLogout}}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Logout</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
     </v-menu>
      <v-btn to='/' @click=reloadState icon color="primary">
        <v-icon>$vuetify.icons.Home</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    </div>
</template>

<script scoped>
import { mdiAccountArrowRight, mdiLogoutVariant } from '@mdi/js'
import global from '../components/Global'
import { getCookie, delCookie } from '../assets/js/cookie'
export default {
  inject: ['reload'],
  data: () => ({
    searchName: global.searchName,
    mdiAccount: mdiAccountArrowRight,
    mdiLogout: mdiLogoutVariant,
    showHint: false,
    timeout: 0,
    color: '',
    hint: '',
    name: '',
    loginState: false,
    searchBlank: true,
    drawer: false,
    menu: false
  }),
  methods: {
    reloadState () {
      const uname = getCookie('username')
      this.name = uname
      if (uname !== '') {
        this.loginState = true
      } else if (uname === '') {
        this.loginState = false
      }
    },
    checkSearch () {
      if (this.searchName !== '') {
        this.searchBlank = false
        global.searchName = this.searchName
        this.$router.push({ path: '/about' })
        this.reloadState()
        this.reload()
      } else if (this.searchName === '') {
        this.searchBlank = true
        alert('Please enter your search')
      }
    },
    quit () {
      delCookie('username')
      this.hint = 'logout successfully'
      this.showHint = true
      this.color = 'success'
      this.reloadState()
      this.reload()
      setTimeout(function () {
        this.$router.push({ path: '/login' })
        this.showHint = false
      }.bind(this), 1000)
    }
  }
}
</script>

<style scoped>
#tf{
  margin-top: 33px;
  width: 1000px;
  margin-left: 250px
}
</style>
