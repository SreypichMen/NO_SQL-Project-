<!-- <template>
  <v-app dark fluid fill-height class="background">
    <v-main>
      <v-container >
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>

<style scoped>
.background {
  background-image: url("~@/assets/background.jpg");
  /* Add other background properties for styling */
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style> -->
<template>
  <v-app style="background-color: white">
    <!-- <v-navigation-drawer
      v-model="drawer"
     
      fixed
      app 
      style="background: rgba(255, 255, 255, 0.89);"
     
     zoom="80%"
    >
      <div class="mt-10" >
        <v-row>
          <v-col align="center">
              <img class="img_logo" src="~/assets/logo-transparent-png.png">
          </v-col>
        </v-row>
       
        <v-row>
          <v-col align="start" class="ml-6">  <div><h4>Movie Filter</h4> </div>
          </v-col>

        </v-row>
      </div>
      
     
    </v-navigation-drawer> -->
   
    <v-main>
      
        <Nuxt />
    
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