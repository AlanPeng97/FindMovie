<template>
    <v-container
    class="mt-12 pl-0 px-0 pb-0"
    ><h1 class="headtitle display-4 font-weight-bold">Hi!</h1>
    <div class="headtitle display-3 font-weight-bold">{{name}}</div>
    </v-container>
</template>

<script>
import { mdiFire, mdiCalendarRange, mdiAccountHeart, mdiCloseOctagon } from '@mdi/js'
import { getCookie, delCookie } from '../assets/js/cookie'
export default {
  data () {
    return {
      name: '',
      mdiFire: mdiFire,
      mdiDate: mdiCalendarRange,
      mdiAdd: mdiAccountHeart,
      mdiClose: mdiCloseOctagon
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
.headtitle{
  color: #FAFAFA;
}
</style>
