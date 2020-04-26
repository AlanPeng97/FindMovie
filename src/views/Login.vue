<template>
<v-container fluid>
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
    <div  class="form">
    <v-sheet width="500">
       <h1>Login</h1>
     <v-form
     class="ma-2"
    ref="form"
    v-model="valid"
    :lazy-validation="lazy"
  >
    <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="Name"
      clearable
      required
    ></v-text-field>

    <v-text-field
      v-model="password"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="passwordrules"
      :type="show1 ? 'text' : 'password'"
       name="input-10-1"
       label="Password"
       hint="At least 8 characters"
       counter
       @click:append="show1 = !show1"
       required
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4 ma-2"
      @click=login
    >
      Login
    </v-btn>

    <v-btn
      color="error"
      class="mr-4 ma-2"
      @click="reset"
    >
      Reset
    </v-btn>

  </v-form>
  <h2>Want To Be Our Member? Creat your account</h2>
  <v-btn color="primary" class="ma-2" to="/register">Register</v-btn>
    </v-sheet>
    </div>
</v-container>
</template>

<script>
import { setCookie } from '../assets/js/cookie'
export default {
  data: () => ({
    show1: false,
    valid: true,
    showHint: false,
    timeout: 0,
    color: '',
    hint: '',
    name: '',
    password: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    passwordrules: [
      value => !!value || 'Required.',
      v => v.length >= 8 || 'Min 8 characters'
    ],
    lazy: false
  }),
  methods: {
    login () {
      var name = this.name
      var pass = this.password
      this.$axios.post('api/login', { username: name, password: pass })
        .then(res => {
          console.log(res)
          if (res.data === -1) {
            this.hint = 'The account is not exists'
            this.showHint = true
            this.name = ''
            this.password = ''
            this.color = 'error'
          } else if (res.data === 0) {
            this.hint = 'password is incorrect'
            this.showHint = true
            this.name = ''
            this.password = ''
            this.color = 'amber'
          } else {
            this.hint = 'login successfully'
            this.showHint = true
            this.color = 'success'
            setCookie('username', this.name, 1000 * 60)
            setTimeout(function () {
              this.$router.push({ path: '/account' })
              this.showHint = false
            }.bind(this), 1000)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.name = ''
      this.password = ''
    }
  }
}
</script>

<style scoped>
.form{
    text-align: center; /*让div内部文字居中*/
    background-color: #fff;
    width: 500px;
    height: 350px;
    margin: auto;
    position: absolute;
    left: 0;
    right: 0;
    top: 20%;
}
</style>
