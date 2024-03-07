<template>
    <div>
        <v-navigation-drawer
     
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
      
     
        </v-navigation-drawer>
    </div>
</template>

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