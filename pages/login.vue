<template >
    <div>
         <div class="box" v-show="!$auth.loggedIn">
            <v-card class=" mb-7">
                <v-row>
                    <v-col class="pa-6 pr-5 d-none d-md-block" md="6">
                        <img style="height:450px; width:350px;margin-left: 10px;" src="~/assets/Sign in-rafiki.png"></img>
                    </v-col>
                    <v-col  md="6" style="padding: 40px">
                        <center>
                    <h2>Login</h2> 
                    <br>
                    </center>   
                    <div>
                        <label for="Phone"><b>Email</b></label>
                        <div style="position: relative">
                            <v-icon style="position: absolute; top: 6px; left: 15px">mdi-mail</v-icon>
                            
                            <input class="input" placeholder="Enter your email"  v-model="email" required>
                        </div>
                    </div>
                        <br>
                        <label for="psw"><b>Password</b></label>
                        <div style="position: relative">
                                <v-icon style="position: absolute; top: 10px; left: 15px;" >mdi-lock</v-icon>
                                <input v-model="password" type="password" class="input" placeholder="Enter Password" name="psw" required></input>
             
                            </div>
                            <div><button @click="userLogin()"  type="submit" style="background-color:green; color: white;font-weight: bold; border-radius: 20px ; height: 40px; width: 100% ; margin-top: 30px;">LOGIN</button></div>
                       
                     
                         <div>
                            <center>
                                <nuxt-link to="/register"><h5 class="register">Create your account -></h5></nuxt-link>
                               
                            </center>
                           </div>
                    </v-col>
                </v-row>
               
              </v-card>
         </div>
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
    export default {
      data () {
        return {
          email: '',
          password: '',
          show: 'login',
          drawer: false, 
          dialog: false,
          login_response: '',
          justify: [
          'start',
        ],
        }
        
      },
            methods: {
        refresh(){
        setTimeout(() => {
        document.location.reload();
      }, 100
      ); 
      },
        async userLogin() {
          
            let response = await this.$auth.loginWith('local', {
                data: {
                    email: this.email,
                    password: this.password
                },
            })
            location.replace('/') 

          
    }
}
     }
  </script>
    <style scoped>
    
    .box{
        display:flex;
        justify-content: center;
     
    }
    @media screen and (max-width: 1100px) {
      
    h2{
        font-size:1rem;
    }
    h5{
        font-size: 0.8rem;
    }
    label{
       
        font-size:0.8rem;
    }
    .input{
        padding-left: 50px ;
        background-color:#D3D3D3; 
        border-radius: 20px ; 
        height: 40px; 
     
        width: 100%;
    }
    input::placeholder{
        font-size: 0.7rem;
    }
 
    .note{
        margin-top: 10px;
        display: flex;
        justify-content: center;
        gap: 10px;
    }
    .forgot{
        color: black;
    }
    .forgot:hover{
        color: green;
        text-decoration: underline;
    }
    .register{
        margin-top: 20px;
         color: #808080;
    }
    .register:hover{
        color: green;
        text-decoration: underline;
    }
    }
    @media screen and (max-width: 865px) {
            h2{
                font-size:12px;
            }
            h5{
                font-size: 9px;
            }
            label{
            
                font-size:11px;
            }
            .input{
                padding-left: 50px ;
                background-color:#D3D3D3; 
                border-radius: 20px ; 
                height: 40px; 
            
                width: 100%;
            }
            input::placeholder{
                font-size: 0.5rem;
            }
            .infor{
                
                height: 300px;
                width: 100%;
                padding: 40px;
                color: black;
            }
            .note{
                margin-top: 5px;
                display: flex;
                justify-content: center;
                gap: 5px;
            }
            .forgot{
                color: black;
            }
            .forgot:hover{
                color: green;
                text-decoration: underline;
            }
            .register{
                margin-top: 10px;
                color: #808080;
            }
            .register:hover{
                color: green;
                text-decoration: underline;
            }
    }
    @media screen and (max-width: 781px) {
      
           
            h2{
                font-size:16px;
            }
            h5{
                font-size: 7px;
            }
            label{
            
                font-size:9px;
            }
            .input{
                padding-left: 50px ;
                background-color:#D3D3D3; 
                border-radius: 20px ; 
                height: 40px; 
            
                width: 100%;
            }
            input::placeholder{
                font-size: 9px;
            }
            .infor{
                
                height: 200px;
                width: 100%;
                padding:20px;
                color: black;
            }
            .note{
                margin-top: 5px;
                display: flex;
                justify-content: center;
                gap: 5px;
            }
            .forgot{
                color: black;
            }
            .forgot:hover{
                color: green;
                text-decoration: underline;
            }
            .register{
                margin-top: px;
                color: #808080;
            }
            .register:hover{
                color: green;
                text-decoration: underline;
            }
    }
    @media screen and (min-width: 1100px) {
         .box{
       
        margin-top: 70px;
        margin-right: auto;
        margin-left: auto;
        width: 60%;
        height: 580px;
        padding: 20px;
    }
    input{
        padding-left: 50px ;
        background-color:#D3D3D3; 
        border-radius: 20px ; 
        height: 40px; 
        width: 100%; 
    }
    input::placeholder{
        font-size: 0.7rem;
    }
    .note{
        margin-top: 10px;
        display: flex;
        justify-content: center;
        gap: 10px;
    }
    .forgot{
        color: black;
    }
    .forgot:hover{
        color: green;
        text-decoration: underline;
    }
    .register{
        margin-top: 60px;
         color: #808080;
    }
    .register:hover{
        color: green;
        text-decoration: underline;
    }
    }
    </style>