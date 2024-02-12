<template>
  <div class="dashboard">
    <div>
      <v-container>
        <v-row>
          <h2 style="color: white">
            Dashboard
          </h2>
        </v-row>
        <v-row class="box_list">
         
            <v-col class="dashboard_list" md="3">
              <div class="list_1">
                <img class="icon" src="~/assets/img/film.png">
              </div>
              <div class="text">
                <h5>Movie & Drama</h5>
                <h2 class="mt-2">42</h2>
              </div>
          </v-col>
        
      
             <v-col class="dashboard_list" md="3">
              <div class="list_2">
                <img class="icon" src="~/assets/img/eye.png">
              </div>
              <div class="text">
                <h5>Web Visitors</h5>
                <h2 class="mt-2">30</h2>
              </div>
          </v-col>
        
          
    
           <v-col class="dashboard_list" md="3">
            <div class="list_3">
              <img class="icon" src="~/assets/img/subscription-model.png">
            </div>
            <div class="text">
              <h5> Purchased Number</h5>
              <h2 class="mt-2">10</h2>
            </div>
          </v-col>
    
         
        </v-row>
        <v-row class="box_list">
          <v-col class="card " md="7">
            <h3> Purchase Plan Statistic</h3>
            <p style="font-weight: bold">Total Earned</p>
            <h2 style="color: #736f6f;font-weight: 800">200$</h2>
          </v-col>
          <v-col class="card" md="4">
            <h3 style="text-align: center"> Most Viewed Movies & Dramas</h3>
            <v-container>
              <div class="most_viwed">
                  <div class="mt-2"> 

                    <v-icon color="#008000" style="width: 30px; height: 30px">mdi-decagram</v-icon>
                    <h5 style="position:relative; bottom: 25px; left: 12px;color: white; font-weight:bold">1</h5>
                  </div>
                  <div> 
                    <img  class="movie_poster" src="https://i.mydramalist.com/vXjLPq_4c.jpg?v=1">
                  </div>
                  <div class="pa-1">
                    <h4 style="color: black">The Glory</h4>
                    <p style="font-weight: bold; font-size: 12px">Revenge</p>
                  </div>
              </div>
              <div class="most_viwed">
                <div class="mt-2"> 

                  <v-icon color="#008000" style="width: 30px; height: 30px">mdi-decagram</v-icon>
                  <h5 style="position:relative; bottom: 25px; left: 12px;color: white; font-weight:bold">2</h5>
                </div>
                <div> 
                  <img  class="movie_poster" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw1tB7TcW00-MF6-Llma-6HZPe6QeU36mPrM98nkT7&usqp=CAE&s">
                </div>
                <div class="pa-1">
                  <h4 style="color: black">The Heavenly Idol</h4>
                  <p style="font-weight: bold; font-size: 12px">Fantasy</p>
                </div>
            </div>
           
            <div class="most_viwed">
              <div class="mt-2"> 

                <v-icon color="#008000" style="width: 30px; height: 30px">mdi-decagram</v-icon>
                <h5 style="position:relative; bottom: 25px; left: 12px;color: white; font-weight:bold">3</h5>
              </div>
              <div> 
                <img  class="movie_poster" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbPv8vauYDSLVEdkzDkc220GXGQ7g4_9jHIoVMhWwmfT9jNrT8">
              </div>
              <div class="pa-1">
                <h4 style="color: black">The Point Man</h4>
                <p style="font-weight: bold; font-size: 12px">Action</p>
              </div>
          </div>
          <div class="most_viwed">
            <div class="mt-2"> 
              <v-icon color="#008000" style="width: 30px; height: 30px">mdi-decagram</v-icon>
              <h5 style="position:relative; bottom: 25px; left: 12px;color: white; font-weight:bold">4</h5>
            </div>
            <div> 
              <img  class="movie_poster" src="https://upload.wikimedia.org/wikipedia/en/thumb/f/ff/Gangnam-Zombie.jpg/220px-Gangnam-Zombie.jpg">
            </div>
            <div class="pa-1">
              <h4 style="color: black">Gangnam Zombie</h4>
              <p style="font-weight: bold; font-size: 12px">Drama</p>
            </div>
        </div>
        <div class="most_viwed">
          <div class="mt-2"> 

            <v-icon color="#008000" style="width: 30px; height: 30px">mdi-decagram</v-icon>
            <h5 style="position:relative; bottom: 25px; left: 12px;color: white; font-weight:bold">5</h5>
          </div>
          <div> 
            <img  class="movie_poster" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTyMIe5O1xK-V0voNuTJR7S9IMzmnG8LZi0k0KmptVdPb0fAew0">
          </div>
          <div class="pa-1">
            <h4 style="color: black">Pandora</h4>
            <p style="font-weight: bold; font-size: 12px">Mystery</p>
          </div>
      </div>
            </v-container>
          </v-col>
        </v-row>
      </v-container>

    </div>

  </div>

</template>
<script>
import axios from 'axios'

 export default {
   
    
    

    middleware: [
    'auth'
  ],
    methods: {
       
    
      }
    }

    

</script>
<style scoped>
.dashboard{
  color: white;
  margin-left: 50px;
  margin-right: 50px;
}
.dashboard_list{
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.89);
  height: 80px;
  margin-top: 20px;
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  gap: 40px;
  
}
.box_list{
  display: flex;
  justify-content: space-between;
}
.list_1{
  border-radius: 10px;
  width: 60px;
  height:60px;
  background-color: #0267ff;
  padding: 10px;

}
.list_2{
  border-radius: 10px;
  width: 60px;
  height:60px;
  background-color: #9f02ff;
  padding: 10px;
}
.list_3{
  border-radius: 10px;
  width: 60px;
  height:60px;
  background-color: #ff02b8;
  padding: 10px;
}
.icon{
  height: 40px;
  width: 40px;
}
.text{
  text-align: end;
 
}
p,h5{
  color: #736f6f;
}
h2 ,h3{
  color:#034c7c;
}
.card{
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.89);
  margin-top: 50px;
  padding: 20px;
}
.most_viwed{
  display: flex;
  gap: 20px;
}
.movie_poster{
  border-radius: 10px;
  height:50px;
  width: 50px;
}
</style>
