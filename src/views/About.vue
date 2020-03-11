<template>
  <div class="about">
    <h1>This is an about page</h1>
    <ul v-if="todos.data !== undefined">
      <li v-for="res in todos.data.results" v-bind:key="res.index">
          <h1>{{ res.title }}</h1>
          <p> {{ res.img }} </p>
      </li>
    </ul>

  </div>
</template>

<script>
import global from '../components/Global'
export default {
  data () {
    return {
      todos: []
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
