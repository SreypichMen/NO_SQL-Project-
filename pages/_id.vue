<template>
  <div>
    <v-container>
      <v-row v-if="movieData">
      <v-col cols="12">
        <div class="border"> 
          <v-row class="mb-2">
            <v-col cols="5" align="end" >
              <v-img class="mx-auto" max-width="220" height="290" :src="movieData.movie_thumbnail"></v-img>
            </v-col>
            <v-col cols="7" align="start">
              <v-row>
                <v-col>
                  <h3>{{ movieData.title }}</h3>
                </v-col>
              </v-row>
              <h5>Rate: {{ movieData.averageRate.toFixed(2) }} <span class="mdi mdi-star"></span></h5>
              <v-row class="mt-1">
                <v-chip v-for="(kind, index) in movieData.kind" :key="index" class="ma-2" color="primary" small outlined>{{ kind }}</v-chip>
                <v-chip class="ma-2" color="deep-orange darken-2" outlined  small >{{ movieData.year }} </v-chip> 
                <v-chip class="ma-2" color="teal darken-3" outlined  small >{{ movieData.duration }} mn </v-chip> 
              </v-row>
              <v-row >
                <v-col v-if="movieData.director"><div style="display:flex; gap: 20px"><h4>Director:</h4><p>{{ movieData.director.firstname }} {{ movieData.director.lastname }}</p></div></v-col>
               
              </v-row>
              <v-row style="margin-top: -20px;">
               
                <v-col><div style="display:flex;  gap: 20px"><h4>Actor:</h4> <p>{{ getActorsName(movieData.Act) }}</p></div></v-col>
              </v-row>
              <p>{{ movieData.description }}</p>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-container>
           
            <Rate :movieData="movieData.id"/>
        
          </v-container>
         
        </div>
      </v-col>
    </v-row>
    <v-divider v-else-if="error">{{ error }}</v-divider>
    <v-divider v-else>Loading...</v-divider>
  
    </v-container>
    
  </div>
</template>

<script>
import Rate from "~/components/rateComment.vue"
export default {
  components:{
     Rate
  },
  data() {
    return {
      movieData: null,
      error: null
    };
  },
  mounted() {
    this.fetchMovieData();
  },
  methods: {
    fetchMovieData() {
      // Make an HTTP request to fetch movie data from your API endpoint
      fetch(`https://no-sql-project.onrender.com/api/movie/${this.$route.params.id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          this.movieData = data;
          
        })
        .catch(error => {
          console.error("Error fetching movie data:", error);
          this.error = "Failed to fetch movie data";
        });
    },
    getActorsName(actors) {
      return actors ? actors.map(actor => `${actor.firstname} ${actor.lastname}`).join(", ") : '';
    }
  }
};
</script>

<style scoped>
h2 {
  color: Blue;
}
.border {
  padding: 10px;
}
p {
  font-size: 15px;
  margin-top: 1px;
}
h5 {
  color: orange;
}
</style>
