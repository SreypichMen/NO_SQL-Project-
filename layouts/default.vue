<template>
  <v-app style="background-color: #034C7C">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app 
      style="background: rgba(255, 255, 255, 0.89);"
      v-show="$auth.loggedIn" 
     zoom="80%"
    >
      <div class="mt-10" v-show="$auth.loggedIn">
        <v-row>
          <v-col align="center">
              <img class="img_logo" src="~/assets/img/sabay_entertainment.png">
          </v-col>
        </v-row>
        <v-row  >
          <v-col  class="profile">
              <div >
                <img class="img_profile" src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2021%2F09%2F15%2FNUP_194534_02590.jpg">
              </div>
              <div class="pa-1" >
               
                   <h5>Ariana Grande</h5>
                   <h6 class="mt-1">Admin</h6> 
                </div>
              
              <div  class="pa-2">
                <v-icon>mdi-dots-vertical</v-icon>
              </div>
            
          </v-col>
        </v-row>
        <v-row>
          <v-col align="start" class="ml-6">  <div><h4>Navigation</h4> </div>
          </v-col>

        </v-row>
      </div>
      <v-list >
        <v-list-item
          router
          exact to="/"
        >
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title />Dashboard
          </v-list-item-content>
        </v-list-item>
       
     
        <v-list-item
          router
          exact to="/manage_movie"
        >
          <v-list-item-action>
            <v-icon>mdi-play-box-edit-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title />Manage Movie
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          router
          exact to="/manage_user"
        >
          <v-list-item-action>
            <v-icon>mdi-account-box</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title />User
          </v-list-item-content>
        </v-list-item>
        
      </v-list>
     
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app v-show="$auth.loggedIn">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <!-- <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn> -->
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
   
     
      <v-spacer />
    
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  
   
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-view-dashboard',
          title: 'Dashboard',
          to: '/',
        },
        // {
        //   icon: 'mdi-chart-bubble',
        //   title: 'Inspire',
        //   to: '/inspire',
        // },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      // title: 'Vuetify.js',
    }
  },
}
</script>
<style scoped>
.img_logo{
  height: 40px;
  width: 180px;
}
.profile{
  display: flex;
  justify-content: center;
  gap: 8px;
  
}
.img_profile{
  width: 50px;
  height: 50px;
  border-radius: 100%;
 
}
h4{
  color: #4F4F4F;
}
h6{
  color: #736F6F;
}
 .v-list-item--active{
   background-color: transparent;
  color: #034C7C;
  border-left: 10px solid #034C7C;
 
  font-weight: bold;
  z-index: 10000;
  position:relative;
}
/* .theme--light{
  color: white;
} */
</style>