<template>
  <div>
    <v-row>
      <v-col align="center">
          <h2><i>A Place You Can Find the Movies to Watch </i></h2>
      </v-col>
    </v-row>
     <v-row >
    <v-col cols="12"  >
       <div class="border"> 
        <v-row>
          <v-col cols="4">
                 <v-img  class="mx-auto" max-width="180" height="auto" src="https://img2.annthegran.com/printart/xlarge/great_notions/pg96271.webp"></v-img>
          </v-col>
          <v-col cols="6" align="start">
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
                 <v-col><div style="display:flex"><h3>Director:</h3><p>Jonh</p></div></v-col>
                 <v-col><div style="display:flex"><h3>Actor:</h3> <p>Jack, Rose</p></div></v-col>
                </v-row>

          
          </v-col>
          <v-col cols="2" align="end">
            <v-btn rounded  color="primary" dark>
              View
            </v-btn>
           
          </v-col>
        </v-row>
       </div>
    </v-col>
    
  </v-row>
  </div>
 
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
<style scoped>
h2{
  color:Blue;
}
.border{
  padding:10px;
  border-radius: 15px;
  border: 1px solid grey;
}
p{
  font-size: 1em;
  margin-top: 2px;
}
h5{
  color:orange;
}
</style>
