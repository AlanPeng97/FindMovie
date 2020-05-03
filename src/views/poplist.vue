<template>
    <v-container
    class="mt-12 pl-0 px-0 pb-0"
    >
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
  <h1 class="classify">Popular</h1>
  <hr class="divider">
  <v-row  v-if="checkPop !== undefined">
  <template v-for="pop in checkPop">
    <v-col :key="pop.index" cols="md-4" v-if="pop.backdrop_path !== null">
      <template>
    <v-hover v-slot:default="{ hover }">
  <v-card class="movieCard ml-2 mr-2" max-width="500">
    <v-img class="hover" :src=getSmallImgUrl(pop.backdrop_path)>
  <v-expand-transition>
          <div
            v-if="hover"
            class="transition-slow-in-slow-out grey darken-2 v-card--reveal display-3 white--text"
            style="height: 100%;"
          >
           <h6 class="cardtitle">{{pop.title}}</h6>
           <div class="rate d-flex">
           <template>
           <v-btn x-large color="red" icon><v-icon>mdi-heart</v-icon></v-btn>
           <h6>{{pop.vote_average}}</h6>
         </template>
          </div>
            <div class="information ma-1">
              <v-btn @click="toggle(pop)" color="primary">More information</v-btn>
            </div>
          </div>
  </v-expand-transition>
  </v-img>
  </v-card>
    </v-hover>
    <div>
    <v-overlay
          opacity="0.7"
          v-if="pop.video"
          z-index="5"
        >
        <v-card class="d-flex" color="white" height="750" max-width="1500">
          <v-img :src=getSmallImgUrl(pop.poster_path) max-width="500" max-height="750"></v-img>
          <div>
            <v-card-title class="overlaytitle display-4 font-weight-bold">{{pop.title}}</v-card-title>
            <div class="d-flex">
                <template v-for="gen in pop.genre_ids">
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
                    <h1 class="orange--text">{{pop.vote_average}}</h1>
                    <h2 class="pt-1 black--text">({{pop.vote_count}} votes)</h2>
                  </template>
                </div>
                <div class="ma-6 d-flex">
                  <template>
                    <v-btn x-large color="red" icon><v-icon>{{mdiFire}}</v-icon></v-btn>
                    <h1 class="amber--text">{{pop.popularity}}</h1>
                  </template>
                </div>
                <div class="date ma-6 d-flex">
                  <template>
                    <v-btn x-large color="blue" icon><v-icon>{{mdiDate}}</v-icon></v-btn>
                    <h1 class="teal--text">{{pop.release_date}}</h1>
                  </template>
                </div>
              </v-sheet>
           <template>
            <p class="overview headline pa-2">{{pop.overview}}</p>
          </template>
          <div class="addbtn ma-2">
            <v-btn
              icon
              x-large
              @click=operateFav(pop,pop.id,pop.title,pop.popularity,pop.overview,pop.release_date,pop.vote_average,pop.vote_count,pop.genre_ids,pop.backdrop_path,pop.poster_path)
              v-bind:class="[pop.collect? col:notcol]"
            >
              <v-icon>{{mdiAdd}}</v-icon>
            </v-btn>
          </div>
          <div class="hidebtn ma-2">
            <v-btn
              color="primary"
              icon
              x-large
              @click="pop.video = false"
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
<div class="text-center">
    <v-pagination
      v-model= "page"
      :length= "500"
      :total-visible= 10
      value= 0
    ></v-pagination>
</div>
    </v-container>
</template>

<script>
import { mdiFire, mdiCalendarRange, mdiAccountHeart, mdiCloseOctagon } from '@mdi/js'
import { getCookie, delCookie } from '../assets/js/cookie'
import global from '../components/Global'
export default {
  data () {
    return {
      checkPop: [],
      likeList: [],
      genre: [],
      name: '',
      col: 'red',
      notcol: 'grey',
      color: '',
      hint: '',
      showHint: false,
      timeout: 1000,
      reqPage: '',
      page: 1,
      mdiFire: mdiFire,
      mdiDate: mdiCalendarRange,
      mdiAdd: mdiAccountHeart,
      mdiClose: mdiCloseOctagon
    }
  },
  watch: {
    page (newVal, oldVal) {
      global.popPage = newVal
      this.newPage(global.popPage)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      console.log(newVal, oldVal, global.popPage)
    }
  },
  mounted () {
    if (global.popPage === '') {
      this.page = global.popPage
      this.reqPage = 'https://api.themoviedb.org/3/movie/popular?api_key=429233d493668f762d684c920d9ceafc&page=1'
    } else {
      this.page = global.popPage
      this.reqPage = 'https://api.themoviedb.org/3/movie/popular?api_key=429233d493668f762d684c920d9ceafc&page=' + global.popPage
    }
    console.log(global.popPage)
    const uname = getCookie('username')
    this.name = uname
    console.log(uname)
    this.$axios.post('api/likelist', { username: this.name })
      .then(like => {
        this.likeList = like
        console.log(this.likeList)
        this.likeObj = JSON.parse(JSON.stringify(this.likeList.data))
        if (like.data === 0) {
          console.log('likeList is empty')
        }
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
    this.$axios.get(this.reqPage)
      .then(pop => {
        var jsonObj = JSON.parse(JSON.stringify(pop.data.results))
        console.log('before add' + JSON.stringify(jsonObj))
        for (var i = 0; i < jsonObj.length; i++) {
          for (var j = 0; j < this.likeObj.length; j++) {
            if (jsonObj[i].id === this.likeObj[j].movieid) {
              jsonObj[i].collect = true
            }
          }
          if (jsonObj[i].collect === undefined) {
            jsonObj[i].collect = false
          }
        }
        this.checkPop = jsonObj
        console.log('after added：' + JSON.stringify(this.checkPop))
      })
      .catch(err => {
        console.error(err)
      })
  },
  methods: {
    newPage (num) {
      this.$axios.post('api/likelist', { username: this.name })
        .then(like => {
          this.likeList = like
          console.log(this.likeList)
          this.likeObj = JSON.parse(JSON.stringify(this.likeList.data))
          if (like.data === 0) {
            console.log('likeList is empty')
          }
        })
        .catch(err => {
          console.error(err)
        })
      this.reqPage = 'https://api.themoviedb.org/3/movie/popular?api_key=429233d493668f762d684c920d9ceafc&page=' + num
      this.$axios.get(this.reqPage)
        .then(pop => {
          var jsonObj = JSON.parse(JSON.stringify(pop.data.results))
          console.log('before add' + JSON.stringify(jsonObj))
          if (this.name !== '') {
            for (var i = 0; i < jsonObj.length; i++) {
              for (var j = 0; j < this.likeObj.length; j++) {
                if (jsonObj[i].id === this.likeObj[j].movieid) {
                  jsonObj[i].collect = true
                }
              }
              if (jsonObj[i].collect === undefined) {
                jsonObj[i].collect = false
              }
            }
          }
          this.checkPop = jsonObj
          console.log('after added：' + JSON.stringify(this.checkPop))
        })
        .catch(err => {
          console.error(err)
        })
    },
    quit () {
      delCookie('username')
    },
    toggleColoect (item) {
      item.collect = !item.collect
    },
    toggle (item) {
      item.video = !item.video
    },
    addMovie (id, title, pop, overview, date, vote, votecount, genreids, backdrop, poster, video) {
      this.$axios.post('api/addmov', { id: id, title: title, popularity: pop, overview: overview, date: date, vote: vote, votecount: votecount, genreids: genreids, backdrop: backdrop, poster: poster, video: video })
        .then(resMov => {
          console.log(resMov)
          if (resMov.data === 0) {
            console.log('The information of movie is already in the database')
          } else if (resMov.status === 200) {
            console.log('The information of movie has added into DB')
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    operateFav (item, id, title, pop, overview, date, vote, votecount, genreids, backdrop, poster) {
      var checkname = getCookie('username')
      this.name = checkname
      var titleM = title
      var idM = id
      var popM = pop
      var overviewM = overview
      var dateM = date
      var voteM = this.stringToNum(vote)
      var genreidsM = JSON.stringify(genreids)
      var votecountM = votecount
      var backdropM = this.getSmallImgUrl(backdrop)
      var posterM = this.getSmallImgUrl(poster)
      var videoM = false
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
                this.addMovie(idM, titleM, popM, overviewM, dateM, voteM, votecountM, genreidsM, backdropM, posterM, videoM)
                this.toggleColoect(item)
                this.showHint = true
                this.hint = ' Collected Successfully'
                this.color = 'success'
              } else if (resfav.status === 200) {
                this.toggleColoect(item)
                this.addMovie(idM, titleM, popM, overviewM, dateM, voteM, votecountM, genreidsM, backdropM, posterM, videoM)
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
