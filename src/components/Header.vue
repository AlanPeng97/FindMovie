<template>
<div>
    <v-app-bar
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
    </v-app-bar>
    </div>
</template>

<script scoped>
export default {
  data: () => ({
  })
}
</script>
