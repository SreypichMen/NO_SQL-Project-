<template>
  <div>
    <v-row>
      <v-col>
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
       <v-row>
              <v-col align="start" class="ml-6">
                <v-select v-model="selectedGenre" :items="genres" label="Genre"></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col align="start" class="ml-6">
                <v-select v-model="selectedYear" :items="years" label="Year"></v-select>
              </v-col>
            </v-row>
     </div>
     
    
   </v-navigation-drawer>
      </v-col>
      <v-col cols="12">
        <v-container>
          <v-row v-show="!$auth.loggedIn">
            <v-col align="end">
              <v-btn plain to="/login" color="blue">Login</v-btn> | <v-btn to="/register" color="green" plain>Register</v-btn>
            </v-col>
          </v-row>
          <v-row v-show="$auth.loggedIn">
          <v-col align="end">
            <p style="font-size: 16px;">Welcome <span v-if="$auth.user && $auth.user.data && $auth.user.data.firstname" style="font-weight: bold; color: blue">{{$auth.user.data.firstname}}</span>!</p>
          </v-col>
        </v-row>
          <v-row >
            <v-col align="start">
              <!-- <h2><i>A Place You Can Find Good Movies to Watch</i></h2> -->
            </v-col>
            <v-col align="end" cols="6">
              <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details dense filled outlined solo></v-text-field>
            </v-col>
          </v-row>
          <v-card v-if="slicedMovies.length > 0" class="mt-2 mb-2" outlined>
            <v-row class="pa-4">
              <v-col cols="6" v-for="movie in slicedMovies" :key="movie._id">
                <v-card class="mx-auto" max-width="800" outlined>
                  <nuxt-link :to="`/${movie._id}`" style="text-decoration: none; color: #0d324d;">
                    <div class="border">
                      <v-row>
                        <v-col cols="4">
                          <v-img :src="movie.movie_thumbnail" max-width="180" height="190" rounded-lg></v-img>
                        </v-col>
                        <v-col cols="8" align="start">
                          <v-row>
                            <v-col align="start">
                              <h3>{{ movie.title }}</h3>
                            </v-col>
                            <v-col align="end">
                              <v-btn :to="`/${movie._id}`" rounded small color="primary" dark>View</v-btn>
                            </v-col>
                          </v-row>
                          <h5>Rate: {{ movie.averageRate }} <span class="mdi mdi-star"></span></h5>
                          <v-row class="mt-1">
                            <v-chip v-for="(kind, index) in movie.kind" :key="index" class="ma-2" color="primary" outlined small>{{ kind }}</v-chip>
                            <v-chip class="ma-2" color="deep-orange darken-2" outlined small>{{ movie.year }}</v-chip>
                            <v-chip class="ma-2" color="teal darken-3" outlined small>{{ movie.duration }} mn</v-chip>
                          </v-row>
                          <v-row>
                            <v-col>
                              <h4>Director:</h4>
                            </v-col>
                            <v-col align="start"><p>{{ movie.director.firstname }} {{ movie.director.lastname }}</p></v-col>
                          </v-row>
                          <v-row style="margin-top: -45px;">
                            <v-col>
                              <h4>Actors:</h4>
                            </v-col>
                            <v-col align="start"><p>{{ getActors(movie.Act) }}</p></v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </div>
                  </nuxt-link>
                </v-card>
              </v-col>
            </v-row>
           
            <v-divider></v-divider>
            <v-row class="mx-2">
              <v-col align="center">
                <v-pagination
                  v-model="page"
                  :length="totalPages"
                  circle
                ></v-pagination>
              </v-col>
             
               
          
            </v-row>
          </v-card>
          <v-card v-else class="mt-2 mb-2" outlined>
            <v-row class="pa-4">
              <v-col align="center">
                <h2>No movies found.</h2>
                <v-img height="220" width="220" src="https://cdn-icons-png.flaticon.com/512/6195/6195680.png"></v-img>
              </v-col>
            </v-row>
          </v-card>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import FilterComponent from '~/components/filterMovie.vue';
export default {
  name: 'IndexPage',
  components: {
    FilterComponent
  },
  data() {
    return {
      movies: [],
      search: '',
      page: 1, 
      // Add itemsPerPage property to define the number of movies per page
      itemsPerPage: 10, 
      selectedGenre: '',
      selectedYear: '',
      genres: ['Action', 'Comedy', 'Drama', 'Horror', 'Science Fiction'],
      years: [2022, 2021, 2020, 2019, 2018] // Assuming available years for filtering
    };
  },
  computed: {
    // Calculate total pages based on the number of movies and items per page
    totalPages() {
      return Math.ceil(this.filteredMovies.length / this.itemsPerPage);
    },
    // Slice movies array to get movies for the current page
    slicedMovies() {
      const startIndex = (this.page - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredMovies.slice(startIndex, endIndex);
    },
    // Apply search filter to movies array
    filteredMovies() {
  let filtered = this.movies;

  // Apply search filter
  if (this.search.trim() !== '') {
    const searchTerm = this.search.toLowerCase().trim();
    filtered = filtered.filter(movie => {
      return movie.title.toLowerCase().includes(searchTerm) ||
        movie.director.firstname.toLowerCase().includes(searchTerm) ||
        movie.director.lastname.toLowerCase().includes(searchTerm) ||
        movie.Act.some(actor => actor.firstname.toLowerCase().includes(searchTerm) ||
          actor.lastname.toLowerCase().includes(searchTerm));
    });
  }

  // Apply genre filter
  if (this.selectedGenre) {
    filtered = filtered.filter(movie => movie.genre === this.selectedGenre);
  }

  // Apply year filter
  if (this.selectedYear) {
    filtered = filtered.filter(movie => movie.year === this.selectedYear);
  }

  return filtered;
}


  },
  created() {
    this.fetchMovies();
  },
  methods: {
    async fetchMovies() {
      try {
        const response = await fetch('http://localhost:3001/api/movie');
        const data = await response.json();
        this.movies = data;
        
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    },
    getActors(actors) {
      return actors.map(actor => `${actor.firstname} ${actor.lastname}`).join(', ');
    }
  },
  watch: {
    search() {
      this.page = 1; // Reset page to 1 when search changes
    }
  }
}
</script>

<style scoped>
h2 {
  color: rgb(105, 157, 203);
}
.border {
  padding: 10px;
  background-color: aliceblue;
  height: 210px;
}
p {
  font-size: 11px;
  margin-top: 2px;
}
h4 {
  font-size: 12px;
}
h5 {
  color: orange;
}
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
</style>

