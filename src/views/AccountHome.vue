<template>
    <v-container><div>h</div></v-container>
</template>

<script>
import { getCookie, delCookie } from '../assets/js/cookie'
export default {
  data () {
    return {
      name: ''
    }
  },
  mounted () {
    const uname = getCookie('username')
    this.name = uname
    console.log(uname)
    if (uname === '') {
      this.$router.push({ path: '/login' })
    }
  },
  methods: {
    quit () {
      delCookie('username')
    }
  }
}
</script>

<style scoped>

</style>
