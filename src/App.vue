<template>
  <v-app>
    <Header/>
  <div id="v-content" v-bind:style="{minHeight: Height+'px'}"><router-view /></div>
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
  data () {
    return {
      Height: 0
    }
  },
  mounted () {
    this.Height = document.documentElement.clientHeight - 100
    window.onresize = () => { this.Height = document.documentElement.clientHeight - 100 }
  }
}
</script>

<style scoped>
html, body, #app {
  height: 100%;
  background-color: #434A54;
}
</style>
