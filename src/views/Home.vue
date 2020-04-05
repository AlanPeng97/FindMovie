<template>
 <v-container
  class="mt-n3 pl-0 px-0 pb-0"
  fluid
  v-if="carousel.data !== undefined"
 >
<v-sheet
>
  <v-carousel
    cycle
    show-arrows-on-hoverh
    height="auto"
  >
    <v-carousel-item
     v-for="cars in carousel.data.results"
     :key="cars.index"
     >
     <v-card>
       <v-img
       :src=getImgUrl(cars.backdrop_path)
       height="1000"></v-img>
     </v-card>
    <v-overlay
    class="overlay"
    opacity="0.4"
    absolute
    >
    <div>
     <h1>{{cars.title}}</h1>
     <div class="genre d-flex">
     <template v-for="gen in cars.genre_ids">
       <div v-if="genre.data !== undefined" :key="gen.index">
        <template v-for="match in genre.data.genres">
          <v-btn class="ma-2" rounded elevation="24" v-if="gen==match.id" :color=setColor(match.name) :key="match.index">{{match.name}}</v-btn>
        </template>
        </div>
     </template>
     <v-btn class="ma-2" icon>
     <v-icon>mdi-heart</v-icon>
     </v-btn>
     <v-btn class="ma-2" icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
     </div>
     <v-rating
     class="rating"
     half-increments
     length="10"
     :value=stringToNum(cars.vote_average)
     background-color="orange lighten-3"
     color="orange"
     large
     readonly
     ></v-rating>
     <p>{{cars.overview}}</p>
    </div>
    </v-overlay>
    </v-carousel-item>
  </v-carousel>
 </v-sheet>

  </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      carousel: [],
      genre: []
    }
  },
  methods: {
    getImgUrl (end) {
      var url = 'https://image.tmdb.org/t/p/original' + end
      return url
    },
    stringToNum (string) {
      return parseFloat(string)
    },
    setColor (type) {
      if (type === 'Action') {
        return 'red'
      } else if (type === 'Action') {
        return 'red'
      } else if (type === 'Adventure') {
        return 'orange'
      } else if (type === 'Animation') {
        return '#0277BD'
      } else if (type === 'Comedy') {
        return '#FFD740'
      } else if (type === 'Crime') {
        return '#212121'
      } else if (type === 'Documentary') {
        return '#E0E0E0'
      } else if (type === 'Drama') {
        return '#388E3C'
      } else if (type === 'Family') {
        return '#00BCD4'
      } else if (type === 'Fantasy') {
        return '#9C27B0'
      } else if (type === 'History') {
        return '#795548'
      } else if (type === 'Horror') {
        return '#000000'
      } else if (type === 'Music') {
        return '#009688'
      } else if (type === 'Mystery') {
        return '#78909C'
      } else if (type === 'Romance') {
        return '#EC407A'
      } else if (type === 'Science Fiction') {
        return '#3F51B5'
      } else if (type === 'TV Movie') {
        return '#CDDC39'
      } else if (type === 'Thriller') {
        return '#424242'
      } else if (type === 'War') {
        return '#BF360C'
      } else if (type === 'Western') {
        return '#FFC107'
      }
    }
  },
  mounted () {
    this.$axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=429233d493668f762d684c920d9ceafc')
      .then(carousel => {
        console.log(carousel)
        this.carousel = carousel
      })
      .catch(err => {
        console.error(err)
      })
    this.$axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=429233d493668f762d684c920d9ceafc')
      .then(genre => {
        console.log(genre)
        this.genre = genre
      })
      .catch(err => {
        console.error(err)
      })
  }
}
</script>

<style scoped>
.overlay{
  background: linear-gradient(to top,black,30%,transparent);
}
.overlay h1{
    font-size: 60px;
    margin-bottom: -100px;
    opacity: 90%;
    padding-top: 8em;
    font-weight: normal;
}
.overlay p{
  font-size: 20px;
   padding-top: 1em;
    opacity: 70%;
    font-weight: normal;
    padding-right: 30em;
    padding-left: 10px;

}
.rating{
  padding-top: 2em;
}
.genre{
  padding-top: 7em;
  padding-left: 10px;
}
.likeButtom{
  padding-top: -1em;
}
</style>
