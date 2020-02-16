<template>
  <v-app>
    <Header/>
  <router-view></router-view>
  <Footer/>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  theme: {
    dark: true
  },
  components: {
    Header,
    Footer
  },
  data: () => ({
  })
}
</script>

<style scoped>
html, body, #app {
  height: 100%;
  background-color: #434A54;
}
</style>
