<template>
  <v-container fluid v-if="todos.data !== undefined">
    <h1>Netflix</h1>
    <v-col
    >
    <v-row
    justify="space-between"
    >
      <v-card
      v-for="res in todos.data.results"
      v-bind:key="res.index"
      max-width="209"
      min-width="209"
      id="card"
      elevation="12"
      >
          <v-img
          v-bind:src="res.poster"
          min-height="300"
          max-height="300"
          max-width="209"
          min-width="209"
          ></v-img>
          <v-card-title
          class="d-inline-block text-truncate"
          style="max-width: 209px;"
          >
            {{res.title}}
          </v-card-title>
      </v-card>
      </v-row>
      </v-col>
  </v-container>
</template>

<script>
import global from '../components/Global'
export default {
  data () {
    return {
      todos: [],
      show: false
    }
  },
  mounted () {
    // fetch('http://jsonplaceholder.typicode.com/todos').then(
    //   res => {
    //     return res.json()
    //   }
    // ).then(todos => {
    //   this.todos = todos
    // }
    // )
    // this.$axios.get('https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup?country=US&source_id=tt3398228&source=imdb').then(res => {
    //   this.todos = res.data
    // }
    // )
    this.$axios({
      method: 'GET',
      url: 'https://unogsng.p.rapidapi.com/search',
      headers: {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': 'unogsng.p.rapidapi.com',
        'x-rapidapi-key': '2f5ce1d19cmsha75f508c3ee97fcp17fa0ajsnbf8b01f76bda'
      },
      params: {
        query: global.searchName
      }
    })
      .then(todos => {
        console.log(todos)
        console.log(global.searchName)
        this.todos = todos
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>

<style scoped>
#card{
  margin-bottom: 5ch;
}
</style>
