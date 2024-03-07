<template>
    <div>
      <v-container  v-show="!$auth.loggedIn">
        <div  class="d-flex justify-center mt-10 mb-5">
               <v-sheet max-width="1200"   color="transparent">
                <div class="box">
                   <v-card>
                    <v-row>
                          <v-col md="6" style="padding-left: 60px;padding-right: 60px; margin-top: 20px;margin-bottom: 20px;">
                              <center>
                                <h2 style="color: #0d324d">Register</h2> 
                              </center>    
                            <br></br>
                             <form @submit.prevent="register()">
                               <v-row  dense class="m-auto   " >
                                    <v-col md="12">
                                        <v-text-field   v-model="firstname"  @input="$v.firstname.$touch()" @blur="$v.firstname.$touch()" :error-messages="firstnameErrors"  label="Firstname" placeholder="Enter your firstname"  filled rounded dense required ></v-text-field>
                                    </v-col>
                                </v-row>
                                 <v-row  dense class="m-auto   ">
                                    <v-text-field v-model="email" @input="$v.email.$touch()" @blur="$v.email.$touch()" :error-messages="emailErrors"  label="Email " placeholder="Enter your email"  filled rounded dense  required ></v-text-field>
                                </v-row>
                               
                                <v-row  dense class="m-auto  ">
                                    <v-text-field     @input="$v.password.$touch()" @blur="$v.password.$touch()" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"  @click:append="show1 = !show1" :type="show1 ? 'text' : 'password'"
                                     outlined  v-model="password" :error-messages="passwordErrors" label="Password" placeholder="Enter password"  filled rounded dense required  ></v-text-field>
                                </v-row>     
                                <v-row  dense class="m-auto  ">
                                    <v-text-field  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"  @click:append="show1 = !show1" :type="show1 ? 'text' : 'password'"
                                    v-model="confirmPassword"  :error-messages="repeatPasswordErrors" label="Repeat Password" placeholder="Repeat your password"  filled rounded dense required  ></v-text-field>
                                </v-row>
                               <v-row>
                                <v-card class="text-center">
                                    <p class="typo__p pt-2 red--text" v-if="submitStatus === 'ERROR'">
                                        Please fill the form correctly.
                                    </p>
                                    <p class="typo__p pt-2" v-if="submitStatus === 'PENDING'">
                                        Sending...
                                    </p>

                                    <p
                                        v-if="register_response.code == 0"
                                        class="py-5 font-weight-bold green--text text-capitalize"
                                    >
                                        register is {{ register_response.message }}
                                    </p>
                                    <p
                                        v-if="register_response.code == -1"
                                        class="py-5 font-weight-bold red--text text-capitalize"
                                    >
                                        {{ register_response.message }} <br>
                                        <nuxt-link v-if="register_response.message === 'User has already registered' " to="/login">login your account now</nuxt-link>
                                    </p>
                                    
                               </v-card>
                               </v-row> 
                                <v-row  dense class="m-auto  ">
                                    <v-btn :disabled="confirmPassword != password" type="submit"   style="background-color:#034C7C; color: white;font-weight: bold; border-radius: 20px ; height: 40px; width: 100% ; margin-top: 10px;">
                                       <h3>Register</h3>
                                    </v-btn>
                                </v-row>
                              
                                  

                            </form>
                                
                                
                                </v-col>
                                <v-col md="5" class="d-none d-md-block">
                                    <v-img height="550px"  width="100%" class="pa-5 mt-5" src="https://www.arena-multimedia.com/uploads/course_templates/ui_ux_design/coursehighlights.png">
                                        
                            
                                    <v-col  >
                                   
                                    </v-col>
                                       
                                    </v-img>
                                </v-col>

                            </v-row>
                        </v-card>
                        </div>
                     </v-sheet>
            </div>
      </v-container>
      <v-container v-show="$auth.loggedIn" class="mx-auto">
        <v-row>
         <v-col align="center">
            <h3>You have successfully login!</h3>
         </v-col>
        </v-row>
        <v-row>
         <v-col align="center">
            <nuxt-link to="/">Back to homepage</nuxt-link>
         </v-col>
        </v-row>
        <v-row>
         <v-col align="center">
            <img src="~/assets/Capture.PNG">
         </v-col>
        </v-row>
           
      </v-container>
    </div>


</template>

<script>
import axios from 'axios'
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength,
  maxLength,
  sameAs,
  email
} from 'vuelidate/lib/validators'

export default {
    mixins: [validationMixin],

validations: {
  firstname: { required },
  
  email:{required, email },
  

  password: { required, minLength: minLength(8) },
  repeatPassword: {
    sameAsPassword: sameAs('password'),
  },
},

    data() {
        return {
            firstname: '',
          
            email:'',
          
            password: '',
            confirmPassword: '',
            register_response: '',
            show1: false,
            submitStatus: null,
        }
    }, computed: {
    firstnameErrors() {
      const errors = []
      if (!this.$v.firstname.$dirty) return errors
      !this.$v.firstname.required && errors.push('Firstame is required.')
      return errors
    
    },
  
     emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.required && errors.push('Email is required.')
      return errors
       if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Email is invalid.')
      return errors
      
    },
  
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength && errors.push('Password must be at least 8')
      !this.$v.password.required && errors.push('Password is required.')
      return errors
    },

    repeatPasswordErrors() {
      const errors = []
      if (!this.$v.repeatPassword.$dirty) return errors
      !this.$v.repeatPassword.sameAsPassword &&
        errors.push('Password must be the same.')
      return errors
    },
  },

    methods: {
      refresh(){
        setTimeout(() => {
        document.location.reload();
      }, 100
      ); 
      },
        submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
          this.register()
        }, 500)
      }
    },
        register(){
            axios({
                method: 'post',
                url: 'http://localhost:3001/auth/register',
                headers: { 
                     Authorization: `${this.$auth.strategy.token.get()}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    firstname: this.firstname,
                    email:this.email,
                    password: this.password
                }

            }).then((res) => {
                console.log('register', res.data)
                this.userLogin()
            })
        },

        async userLogin() {
        let response = await this.$auth.loginWith('local', {
          data: {
                   
                     firstname: this.firstname,
                    email:this.email,
                   
                    password: this.password
          },
        })

        console.log('response', response)
        this.$auth.setUser(response.data.user)
        this.$auth.setUserToken(response.data.access_token)
        location.replace('/login')  
      
      }
    },
}
</script>

<style scoped>
    @media screen and (max-width: 1181px) {
    .box{
        width: 100%;
        height:auto;
        padding: 40px;
    
    }
  
    .login{
        margin-top: 20px;
         color: #808080;
    }
    .login:hover{
        color: green;
        text-decoration: underline;
    }
    h2{
        font-size: 20px;
    }
    .v-input__slot{
        height: 20px
    }
}
</style>