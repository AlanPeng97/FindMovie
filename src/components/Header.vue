<template>
<div>
    <v-app-bar
    fixed
    hide-on-scroll
    >
    <v-btn @click="drawer = true" icon color="primary">
        <v-icon>$vuetify.icons.Bar</v-icon>
      </v-btn>
      <v-toolbar-title>FindMovieToWatch</v-toolbar-title>
      <div id="tf">
      <v-text-field
      label="Search"
      v-model.trim="searchName"
      outlined
      ></v-text-field>
      </div>
      <v-btn icon @click="checkSearch">
        <v-icon>fa-search</v-icon>
      </v-btn>
      <v-spacer></v-spacer>

      <v-btn to='/about' icon color="primary">
        <v-icon>$vuetify.icons.Account</v-icon>
      </v-btn>

      <v-btn to='/' icon color="primary">
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
import global from '../components/Global'
export default {
  inject: ['reload'],
  data: () => ({
    searchName: global.searchName,
    searchBlank: true,
    drawer: false
  }),
  methods: {
    checkSearch () {
      if (this.searchName !== '') {
        this.searchBlank = false
        global.searchName = this.searchName
        this.$router.push({ path: '/about' })
        this.reload()
      } else {
        this.searchBlank = true
        alert('Please enter your search')
      }
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
