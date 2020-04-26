<template>
 <v-container
  class="mt-12 pl-0 px-0 pb-0"
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
     <v-subheader class="h1">{{cars.title}}</v-subheader>
     <div class="genre d-flex">
     <template v-for="gen in cars.genre_ids">
       <div v-if="genre.data !== undefined" :key="gen.index">
        <template v-for="match in genre.data.genres">
          <v-btn class="ma-2" rounded elevation="24" v-if="gen==match.id" :color=setColor(match.name) :key="match.index">{{match.name}}</v-btn>
        </template>
        </div>
     </template>
     <v-btn large class="ma-2" icon @click=addMovie(cars.id,cars.title,cars.popularity,cars.overview,cars.release_date,cars.vote_average,cars.vote_count,cars.genre_ids,cars.backdrop_path,cars.poster_path,cars.video)>
     <v-icon>mdi-heart</v-icon>
     </v-btn>
     <v-btn large class="ma-2" icon>
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
<v-container v-if="now.data !== undefined">
  <h1 class="classify">Now Playing</h1>
  <hr class="divider">
  <v-row>
  <template v-for="now in now.data.results.slice(0,6)">
    <v-col :key="now.index" cols="md-4">
      <template>
    <v-hover v-slot:default="{ hover }">
  <v-card class="movieCard ml-2 mr-2" max-width="500">
    <v-img class="hover" :src=getSmallImgUrl(now.backdrop_path)>
  <v-expand-transition>
          <div
            v-if="hover"
            class="transition-slow-in-slow-out grey darken-2 v-card--reveal display-3 white--text"
            style="height: 100%;"
          >
           <h6 class="cardtitle">{{now.title}}</h6>
           <div class="genrechip d-flex">
              <template v-for="gen in now.genre_ids">
                <div v-if="genre.data !== undefined" :key="gen.index">
                  <template v-for="match in genre.data.genres">
                    <v-btn class="gen type pl-1" v-if="gen==match.id" :color=setColor(match.name) :key="match.index">{{match.name}}</v-btn>
                  </template>
                  </div>
              </template>
           </div>
           <div class="rate d-flex">
           <template>
           <v-btn x-large color="red" icon><v-icon>mdi-heart</v-icon></v-btn>
           <h6>{{now.vote_average}}</h6>
         </template>
          </div>
            <div class="information ma-1">
              <v-btn @click="toggle(now)" color="primary">More information</v-btn>
            </div>
          </div>
  </v-expand-transition>
  </v-img>
  </v-card>
    </v-hover>
    <div>
    <v-overlay
          opacity="0.7"
          v-if="now.video"
          z-index="5"
        >
        <v-card class="d-flex" color="white" height="750" max-width="1500">
          <v-img :src=getSmallImgUrl(now.poster_path) max-width="500" max-height="750"></v-img>
          <div>
            <v-card-title class="overlaytitle display-4 font-weight-bold">{{now.title}}</v-card-title>
            <div class="d-flex">
                <template v-for="gen in now.genre_ids">
                  <div v-if="genre.data !== undefined" :key="gen.index">
                    <template v-for="match in genre.data.genres">
                      <v-chip class="ma-2" elevation="24" v-if="gen==match.id" :color=setColor(match.name) :key="match.index">{{match.name}}</v-chip>
                    </template>
                  </div>
                </template>
            </div>
              <v-sheet
              class="ma-4 white d-flex justify-space-around"  height="100" max-width="1000" elevation="24"
              >
                <div class="point ma-6 d-flex">
                  <template>
                    <v-btn x-large color="red" icon><v-icon>mdi-heart</v-icon></v-btn>
                    <h1 class="orange--text">{{now.vote_average}}</h1>
                    <h2 class="pt-1 black--text">({{now.vote_count}} votes)</h2>
                  </template>
                </div>
                <div class="ma-6 d-flex">
                  <template>
                    <v-btn x-large color="red" icon><v-icon>{{mdiFire}}</v-icon></v-btn>
                    <h1 class="amber--text">{{now.popularity}}</h1>
                  </template>
                </div>
                <div class="date ma-6 d-flex">
                  <template>
                    <v-btn x-large color="blue" icon><v-icon>{{mdiDate}}</v-icon></v-btn>
                    <h1 class="teal--text">{{now.release_date}}</h1>
                  </template>
                </div>
              </v-sheet>
           <template>
            <p class="overview headline pa-2">{{now.overview}}</p>
          </template>
          <div class="addbtn ma-2">
            <v-btn
              icon
              x-large
              color="grey"
            >
              <v-icon>{{mdiAdd}}</v-icon>
            </v-btn>
          </div>
          <div class="hidebtn ma-2">
            <v-btn
              color="primary"
              icon
              x-large
              @click="now.video = false"
            >
              <v-icon>{{mdiClose}}</v-icon>
            </v-btn>
          </div>
          </div>
          </v-card>
        </v-overlay>
        </div>
    </template>
    </v-col>
  </template>
  </v-row>
</v-container>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { getCookie } from '../assets/js/cookie'
import { mdiFire, mdiCalendarRange, mdiAccountHeart, mdiCloseOctagon } from '@mdi/js'
export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      carousel: [],
      genre: [],
      now: [],
      title: [],
      name: '',
      mdiFire: mdiFire,
      mdiDate: mdiCalendarRange,
      mdiAdd: mdiAccountHeart,
      mdiClose: mdiCloseOctagon
    }
  },
  methods: {
    toggle (item) {
      item.video = !item.video
    },
    addMovie (id, title, pop, overview, date, vote, votecount, genreids, backdrop, poster, video) {
      var titleM = title
      var idM = id
      var popM = pop
      var overviewM = overview
      var dateM = date
      var voteM = this.stringToNum(vote)
      var genreidsM = genreids
      var votecountM = votecount
      var backdropM = this.getSmallImgUrl(backdrop)
      var posterM = this.getSmallImgUrl(poster)
      var videoM = video
      console.log(titleM, idM, popM, overviewM, dateM, voteM, votecountM, JSON.stringify(genreidsM), backdropM, posterM, videoM)
      return titleM
    },
    getImgUrl (end) {
      var url = 'https://image.tmdb.org/t/p/original' + end
      return url
    },
    getSmallImgUrl (end) {
      var url = 'https://image.tmdb.org/t/p/w500' + end
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
    var uname = getCookie('username')
    this.name = uname
    console.log(this.name)
    this.$axios.post('api/likelist', { username: uname })
      .then(res => {
        console.log(res)
        if (res.data === 0) {
          console.log('operation failed')
        }
      })
      .catch(err => {
        console.error(err)
      })
    this.$axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=429233d493668f762d684c920d9ceafc')
      .then(carousel => {
        this.carousel = carousel
      })
      .catch(err => {
        console.error(err)
      })
    this.$axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=429233d493668f762d684c920d9ceafc')
      .then(genre => {
        this.genre = genre
      })
      .catch(err => {
        console.error(err)
      })
    this.$axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=429233d493668f762d684c920d9ceafc')
      .then(now => {
        this.now = now
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
.overlay .h1{
    font-size: 60px;
    margin-bottom: -80px;
    opacity: 100%;
    padding-top: 8em;
    font-weight: normal;
    color: rgb(255, 255, 255);
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
.classify{
  color: white;
}
.movieCard{
  -webkit-transform: scale(1);
  transform: scale(1);
  -webkit-transition: .3s ease-in-out;
  transition: .3s ease-in-out;
  width: 100vw;
  height: 100%;
}
.movieCard:hover {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.v-card--reveal {
  bottom: 0;
  align-items: top;
  justify-content: start;
  opacity: .8;
  position: absolute;
  width: 100%;
}
.cardtitle{
  color: rgb(255, 255, 255);
  padding-top: 0%;
}
.type{
  font-size: 20px;
  color: rgb(255, 145, 0);
  font-weight: bolder;
  overflow: hidden;
}
.rate{
  position: absolute;left: 0;bottom: 0;
}
.information{
  position: absolute;right: 0;bottom: 0;
}
.clobtn{
  padding-left: 0;
}
p{
  white-space: normal;
  word-wrap: break-all;
}
.overview{
  color: #546E7A;
}
.hidebtn{
  position: absolute;right: 0;bottom: 0;
}
.addbtn{
  position: absolute;left: 500;bottom: 0;
}
.overlaytitle{
  color: #424242;
}
</style>
