<template>
    <v-toolbar :elevation="10" v-bind:style="{ width: wid }" dense>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>FindMovieToWatch</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn to='/about' icon>
        <v-icon>$vuetify.icons.Account</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
</template>

<script>
export default {
  data: () => ({
    wid: '100%'
  })
}
</script>

<style scoped>
</style>
