<template>
<div>
    <v-app-bar>

      <v-toolbar-title>FindMovieToWatch</v-toolbar-title>
      <div id="tf">
      <v-text-field
      label="Search"
      v-model.trim="name"
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
    </div>
</template>

<script scoped>
export default {
  data: () => ({
    name: '',
    searchblank: true
  }),
  methods: {
    checkSearch () {
      if (this.name !== '') {
        this.searchblank = false
      } else {
        this.searchblank = true
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
