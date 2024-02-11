<template>
    <div>
       <v-row >
      <v-col cols="12"  >
         <div class="border"> 
          <v-row>
            <v-col cols="5">
                   <v-img  class="mx-auto" max-width="180" height="auto" src="https://img2.annthegran.com/printart/xlarge/great_notions/pg96271.webp"></v-img>
            </v-col>
            <v-col cols="7" align="start">
              <v-row >
                <v-col>
                     <h3>Movie Night</h3>
                </v-col>
              </v-row>
                  <h5>Rate: 3.5 <span class="mdi mdi-star"></span></h5>
                  <v-row class="mt-1">
                     <v-chip class="ma-2" color="primary"  outlined>Romantic</v-chip> 
                     <v-chip class="ma-2" color="deep-orange darken-2" outlined>2014</v-chip> 
                     <v-chip class="ma-2" color="teal darken-3" outlined>1h30mn</v-chip> 
                  </v-row>
                  <v-row >
                   <v-col><div style="display:flex"><h4>Director:</h4><p>Jonh</p></div></v-col>
                   <v-col><div style="display:flex"><h4>Actor:</h4> <p>Jack, Rose</p></div></v-col>
           
                  </v-row>
                  <p>For the past year, Sandra, her husband Samuel, and their eleven-year-old son Daniel have lived a secluded life in a remote town in the French Alps. </p>
  
            </v-col>
           
          </v-row>
         </div>
      </v-col>
      
    </v-row>
    <v-divider></v-divider>

    </div>
   
  </template>
  
  <script>
  export default {
    
  }
  </script>
  <style scoped>
  h2{
    color:Blue;
  }
  .border{
    padding:10px;
    
  }
  p{
    font-size: 1em;
    margin-top: 1px;
  }
  h5{
    color:orange;
  }
  </style>
  