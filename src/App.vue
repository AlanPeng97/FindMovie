<template>
<div id="app" v-bind:style="{ backgroundColor: color}">
  <Header/>
  <router-view></router-view>
  <v-app>
  </v-app>
</div>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
import Header from './components/Header'

export default {
  name: 'App',
  theme: {
    dark: true
  },
  components: {
    Header
  },
  data: () => ({
    color: '#fffff'
  })
}
</script>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

</style>
