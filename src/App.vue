<template>
  <v-app>
    <Header/>
  <div id="v-content" v-bind:style="{minHeight: Height+'px'}"><router-view v-if='isRouterAlive'/></div>
  <BackToTop/>
  <Footer/>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
import Header from './components/Header'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
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
    Footer,
    BackToTop
  },
  data () {
    return {
      Height: 0,
      isRouterAlive: true
    }
  },
  methods: {
    // reload: function () {
    //   this.isRouterAlive = false
    //   this.$nextTick(function () { this.isRouterAlive = true })
    // },
    async reload () {
      this.isRouterAlive = false
      this.$nextTick(function () { this.isRouterAlive = true })
    }
  },
  mounted () {
    this.Height = document.documentElement.clientHeight - 64
    window.onresize = () => { this.Height = document.documentElement.clientHeight - 64 }
  }
}
</script>

<style scoped>
html, body, #app {
  height: 100%;
  background-color: #616161;
}
</style>
