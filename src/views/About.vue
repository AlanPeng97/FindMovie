<template>
  <v-container class="search" fluid v-if="todos.data !== undefined">
    <h1>Netflix</h1>
    <v-row
    >
    <template
    v-for="res in todos.data.results"
    >
    <template
    v-for="deepres in res.locations"
    >
    <v-col
    cols="auto"
     :key="deepres.index"
     v-if="deepres.display_name == 'Netflix'"
    >
       <v-hover
    v-slot:default="{ hover }"
    >
      <v-card
      :elevation="hover ? 24 : 0"
      max-width="209"
      min-width="209"
      max-height="400"
      min-height="400"
      id="card"
      >
      <figure>
          <v-img
          class="hover"
          v-bind:src="res.picture"
          >
          </v-img>
          </figure>
          <v-card-text
          class="pt-6"
          style="max-width: 209px; position: relative;"
          >
          <v-btn
          absolute
          color="red"
          class="btn white--text"
          right
          fab
          top
          large
          elevation="24"
          v-bind:href="deepres.url"
          target="_blank"
          >
          Netflix
          </v-btn>
          <br>
          <div
          class="font-weight-black subtitle-1 d-inline-block text--primary"
          >
            {{res.name}}
            </div>
          </v-card-text>
      </v-card>
    </v-hover>
      </v-col>
      </template>
    </template>
    </v-row>
    <!-- Amazom -->
    <h1>Amazon</h1>
    <v-row
    >
    <template
    v-for="res in todos.data.results"
    >
    <template
    v-for="deepres in res.locations"
    >
    <v-col
    cols="auto"
     :key="deepres.index"
     v-if="deepres.display_name == 'Amazon Instant Video' || deepres.display_name == 'Amazon Prime Video'"
    >
    <v-hover
    v-slot:default="{ hover }"
    >
      <v-card
      :elevation="hover ? 24 : 0"
      max-width="209"
      min-width="209"
      max-height="400"
      min-height="400"
      id="card"
      >
      <figure>
          <v-img
          class="hover"
          v-bind:src="res.picture"
          >
          </v-img>
      </figure>
          <v-card-text
          class="pt-6"
          style="max-width: 209px; position: relative;"
          >
          <v-btn
          absolute
          color="blue"
          class="btn white--text"
          right
          fab
          top
          large
          elevation="24"
          v-bind:href="deepres.url"
          target="_blank"
          >
          Amazon
          </v-btn>
          <br>
          <div
          class="font-weight-black subtitle-1 d-inline-block text--primary"
          >
            {{res.name}}
            </div>
          </v-card-text>
      </v-card>
    </v-hover>
      </v-col>
      </template>
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
      url: 'https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup',
      headers: {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': 'utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com',
        'x-rapidapi-key': '2f5ce1d19cmsha75f508c3ee97fcp17fa0ajsnbf8b01f76bda'
      },
      params: {
        term: global.searchName
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
.v-card--reveal {
  bottom: 0;
  justify-content: center;
  opacity: 0.7;
  position: absolute;
  width: 100%;
}
figure {
  width: 209px;
  height: 300px;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.hover{
  -webkit-transform: scale(1);
  transform: scale(1);
  -webkit-transition: .3s ease-in-out;
  transition: .3s ease-in-out;
  width: 100vw;
  height: 100%;
}
.hover:hover {
  -webkit-transform: scale(1.3);
  transform: scale(1.3);
}
.btn {
  border: 1px solid;
  overflow: hidden;
}
.btn:after {
  background: #fff;
  content: "";
  height: 155px;
  left: -75px;
  opacity: .2;
  position: absolute;
  top: -50px;
  -webkit-transform: rotate(35deg);
          transform: rotate(35deg);
  -webkit-transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
  transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
  width: 50px;
  z-index: -10;
}

.btn:hover:after {
  left: 120%;
  -webkit-transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
  transition: all 550ms cubic-bezier(0.19, 1, 0.22, 1);
}
.search{
  margin-top:4em;
}

</style>
