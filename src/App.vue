<template>
  <v-app>
    <Header/>
  <div id="v-content" v-bind:style="{minHeight: Height+'px'}"><router-view v-if='isRouterAlive'/></div>
  <Footer/>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  theme: {
    dark: true
  },
  components: {
    Header,
    Footer
  },
  data () {
    return {
      Height: 0,
      isRouterAlive: true
    }
  },
  methods: {
    reload: function () {
      this.isRouterAlive = false
      this.$nextTick(function () { this.isRouterAlive = true })
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
  background-color: #616161;
}
</style>
