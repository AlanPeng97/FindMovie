<template>
    <v-container
    class="mt-12 pl-0 px-0 pb-0"
    ><h1 class="headtitle display-4 font-weight-bold">Hi!</h1>
    <div class="headtitle display-3 font-weight-bold">{{name}}</div>
    <v-snackbar
  v-model="showHint"
  :color="color"
  top
  :timeout="timeout"
  >
  {{ hint }}
  <v-btn
  text
  @click="showHint = false"
  >Close</v-btn>
  </v-snackbar>
    <v-container>
  <h1 class="classify">Your favorite</h1>
  <hr class="divider">
  <div class="text-center">
  <v-btn v-if="favorite === undefined" to="/" class="ma-2 white--text" color="light-blue" x-large>Choose your favorite</v-btn>
  </div>
  <v-row  v-if="favorite !== undefined">
  <template v-for="fav in favorite">
    <v-col :key="fav.index" cols="md-4">
      <template>
    <v-hover v-slot:default="{ hover }">
  <v-card class="movieCard ml-2 mr-2" max-width="500">
    <v-img class="hover" :src=fav.backdrop>
  <v-expand-transition>
          <div
            v-if="hover"
            class="transition-slow-in-slow-out grey darken-2 v-card--reveal display-3 white--text"
            style="height: 100%;"
          >
           <h6 class="cardtitle">{{fav.title}}</h6>
           <div class="genrechip d-flex">
              <template v-for="gen in fav.genreids">
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
           <h6>{{fav.vote}}</h6>
         </template>
          </div>
            <div class="information ma-1">
              <v-btn @click="toggle(fav)" color="primary">More information</v-btn>
            </div>
          </div>
  </v-expand-transition>
  </v-img>
  </v-card>
    </v-hover>
    <div>
    <v-overlay
          opacity="0.7"
          v-if="fav.video"
          z-index="5"
        >
        <v-card class="d-flex" color="white" height="750" max-width="1500">
          <v-img :src=fav.poster max-width="500" max-height="750"></v-img>
          <div>
            <v-card-title class="overlaytitle display-4 font-weight-bold">{{fav.title}}</v-card-title>
            <div class="d-flex">
                <template v-for="gen in fav.genreids">
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
                    <h1 class="orange--text">{{fav.vote}}</h1>
                    <h2 class="pt-1 black--text">({{fav.votecount}} votes)</h2>
                  </template>
                </div>
                <div class="ma-6 d-flex">
                  <template>
                    <v-btn x-large color="red" icon><v-icon>{{mdiFire}}</v-icon></v-btn>
                    <h1 class="amber--text">{{fav.popularity}}</h1>
                  </template>
                </div>
                <div class="date ma-6 d-flex">
                  <template>
                    <v-btn x-large color="blue" icon><v-icon>{{mdiDate}}</v-icon></v-btn>
                    <h1 class="teal--text">{{fav.date}}</h1>
                  </template>
                </div>
              </v-sheet>
           <template>
            <p class="overview headline pa-2">{{fav.overview}}</p>
          </template>
          <div class="addbtn ma-2">
            <v-btn
              icon
              x-large
              @click=operateFav(fav,fav.id)
              v-bind:class="[fav.collect? col:notcol]"
            >
              <v-icon>{{mdiAdd}}</v-icon>
            </v-btn>
          </div>
          <div class="hidebtn ma-2">
            <v-btn
              color="primary"
              icon
              x-large
              @click="fav.video = false"
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
import { mdiFire, mdiCalendarRange, mdiAccountHeart, mdiCloseOctagon } from '@mdi/js'
import { getCookie, delCookie } from '../assets/js/cookie'
export default {
  data () {
    return {
      favorite: [],
      likeList: [],
      genre: [],
      name: '',
      col: 'red',
      notcol: 'grey',
      color: '',
      hint: '',
      showHint: false,
      timeout: 6000,
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
    this.$axios.post('api/likelist', { username: this.name })
      .then(like => {
        this.likeList = like
        console.log(this.likeList)
        if (like.data === 0) {
          console.log('likeList is empty')
        }
      })
      .catch(err => {
        console.error(err)
      })
    this.$axios.post('api/showlike', { username: this.name })
      .then(fav => {
        // console.log('before add' + JSON.stringify(jsonObj))
        if (this.name !== '' && fav.data !== 0 && this.likeList.data !== 0) {
          var jsonObj = JSON.parse(JSON.stringify(fav.data))
          var likeObj = JSON.parse(JSON.stringify(this.likeList.data))
          console.log(JSON.stringify(likeObj))
          for (var i = 0; i < jsonObj.length; i++) {
            for (var j = 0; j < likeObj.length; j++) {
              if (jsonObj[i].id === likeObj[j].movieid) {
                jsonObj[i].collect = true
              }
            }
            if (jsonObj[i].collect === undefined) {
              jsonObj[i].collect = false
            }
            jsonObj[i].genreids = JSON.parse(jsonObj[i].genreids)
          }
        }
        this.favorite = jsonObj
        console.log('after added：' + JSON.stringify(this.favorite))
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
  },
  methods: {
    quit () {
      delCookie('username')
    },
    toggleColoect (item) {
      item.collect = !item.collect
    },
    toggle (item) {
      item.video = !item.video
    },
    // addMovie (id, title, pop, overview, date, vote, votecount, genreids, backdrop, poster, video) {
    //   this.$axios.post('api/addmov', { id: id, title: title, popularity: pop, overview: overview, date: date, vote: vote, votecount: votecount, genreids: genreids, backdrop: backdrop, poster: poster, video: video })
    //     .then(resMov => {
    //       console.log(resMov)
    //       if (resMov.data === 0) {
    //         console.log('The information of movie is already in the database')
    //       } else if (resMov.status === 200) {
    //         console.log('The information of movie has added into DB')
    //       }
    //     })
    //     .catch(err => {
    //       console.error(err)
    //     })
    // },
    operateFav (item, id) {
      var idM = id
      var checkname = getCookie('username')
      this.name = checkname
      var uname = this.name
      if (uname === '') {
        this.showHint = true
        this.hint = 'Please login'
        this.color = 'amber'
        setTimeout(function () {
          this.$router.push({ path: '/login' })
          this.showHint = false
        }.bind(this), 1000)
      } else {
        if (item.collect === false) {
          this.$axios.post('api/addfav', { movieid: idM, username: this.name })
            .then(resfav => {
              console.log(resfav)
              if (resfav.data === -1) {
                console.log('The information of like is already in the database')
                this.toggleColoect(item)
                this.showHint = true
                this.hint = ' Collected Successfully'
                this.color = 'success'
              } else if (resfav.status === 200) {
                this.toggleColoect(item)
                this.showHint = true
                this.hint = ' Collected Successfully'
                this.color = 'success'
              }
            })
            .catch(err => {
              console.error(err)
            })
        } else if (item.collect === true) {
          this.$axios.post('api/delLike', { movieid: idM, username: this.name })
            .then(delres => {
              console.log(delres)
              if (delres.data === 0) {
                console.log('object does not in the DB')
                this.toggleColoect(item)
              } else {
                this.showHint = true
                this.hint = 'Deleted Successfully'
                this.color = 'orange'
                this.toggleColoect(item)
              }
            })
            .catch(err => {
              console.error(err)
            })
        }
      }
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
  }
}
</script>

<style scoped>
.headtitle{
  color: #FAFAFA;
}
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
