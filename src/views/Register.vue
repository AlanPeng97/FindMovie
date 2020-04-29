
<template>
<v-container fluid class="mt-12">
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
       <h1>Sign up for an account</h1>
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
      type="text"
      required
    ></v-text-field>

    <!-- <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      clearable
      required
    ></v-text-field> -->

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

    <v-text-field
    v-model="confirmPassword"
    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
    :rules="[passwordConfirmationRule]"
    :type="show2 ? 'text' : 'password'"
    name="input-10-2"
    label="Type the password again"
    hint="At least 8 characters"
    @click:append="show2 = !show2"
    required
    ></v-text-field>

    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Do you agree our policy?"
      required
    ></v-checkbox>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4 ma-2"
      @click=register
    >
      confirm
    </v-btn>

    <v-btn
      color="error"
      class="mr-4 ma-2"
      @click="reset"
    >
      Reset
    </v-btn>
    <h2>Our Member? Sign in</h2>
    <v-btn
      color="primary"
      to="/login"
      class="ma-2"
    >
     Login
    </v-btn>
  </v-form>
    </v-sheet>
    </div>
</v-container>
</template>

<script>
export default {
  data: () => ({
    timeout: 6000,
    show1: false,
    show2: false,
    valid: true,
    showHint: false,
    color: '',
    name: '',
    password: '',
    confirmPassword: '',
    hint: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    passwordrules: [
      value => !!value || 'Required.',
      v => v.length >= 8 || 'Min 8 characters'
    ],
    checkbox: false,
    lazy: false
  }),
  computed: {
    passwordConfirmationRule () {
      return () => (this.password === this.confirmPassword) || 'Password must match'
    }
  },
  methods: {
    register () {
      var name = this.name
      var pass = this.password
      this.$axios.post('api/register', { username: name, password: pass })
        .then(res => {
          console.log(res)
          if (res.data === -1) {
            this.hint = 'The account already exists'
            this.showHint = true
            this.color = 'error'
            this.name = ''
            this.password = ''
            this.confirmPassword = ''
            this.checkbox = false
          } else if (res.status === 200) {
            this.hint = 'Registered successfully'
            this.color = 'success'
            this.showHint = true
            this.name = ''
            this.password = ''
            this.confirmPassword = ''
            this.checkbox = false
            setTimeout(function () {
              this.$router.push({ path: '/login' })
              this.showHint = false
            }.bind(this), 6000)
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
      this.confirmPassword = ''
      this.checkbox = false
    },
    resetValidation () {
      this.$refs.form.resetValidation()
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
