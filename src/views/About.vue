<template>
  <v-container fluid v-if="todos.data !== undefined">
    <h1>Netflix</h1>
    <v-row
    justify="space-between"
    >
    <template
    v-for="res in todos.data.results"
    >
    <v-col
    :key="res.index"
    >
    <v-hover v-slot:default="{ hover }">
      <v-card
      max-width="209"
      min-width="209"
      id="card"
      :elevation="hover ? 24 : 2"
      :class="{'on-hover': hover}"
      >
          <v-img
          v-bind:src="res.poster"
          min-height="300"
          max-height="300"
          max-width="209"
          min-width="209"
          >
           <v-expand-transition>
             <div
             v-if="hover"
             class="d-flex transition-slow-in-slow-out orange darken-2 v-card--reveal display-3 white--text"
             style="height: 100%"
             >
             {{res.synopsis}}
             </div>
           </v-expand-transition>
          </v-img>
          <v-card-title
          class="d-inline-block text-truncate"
          style="max-width: 209px;"
          >
            {{res.title}}
          </v-card-title>
      </v-card>
      </v-hover>
      </v-col>
    </template>
    </v-row>
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
