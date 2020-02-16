<template>
    <v-toolbar
    :elevation="10"
    v-bind:style="{ width: wid }"
    absolute
    dense
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>FindMovieToWatch</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn to='/about' icon>
        <v-icon>$vuetify.icons.Account</v-icon>
      </v-btn>

      <v-btn to='/' icon>
        <v-icon>$vuetify.icons.Home</v-icon>
      </v-btn>
    </v-toolbar>
</template>

<script scoped>
export default {
  data: () => ({
    wid: '100%'
  })
}
</script>
