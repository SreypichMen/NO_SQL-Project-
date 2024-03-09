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
          <div class="mt-10">
            <v-row>
              <v-col align="center">
                <img class="img_logo" src="~/assets/logo-transparent-png.png">
              </v-col>
            </v-row>

            <v-row>
              <v-col align="start" class="ml-6">
                <div><h4>Movie Filter</h4></div>
              </v-col>
            </v-row>
            <v-row  class="d-md-none">
              <v-col align="start" class="mx-4">
                <v-select v-model="selectedGenre" :items="genres" label="Genre" >
                  <!-- Clear Genre Filter Button -->
                  <template v-slot:append>
                    <v-btn v-if="selectedGenre" @click="clearGenreFilter" icon>
                      <v-icon color="grey">mdi-close-circle</v-icon>
                    </v-btn>
                  </template>
                </v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col align="start" class="mx-7">
                <v-select v-model="selectedYear" :items="years" label="Year">
                  <!-- Clear Year Filter Button -->
                  <template v-slot:append>
                    <v-btn v-if="selectedYear" @click="clearYearFilter" icon>
                      <v-icon color="grey">mdi-close-circle</v-icon>
                    </v-btn>
                  </template>
                </v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col align="start" class="mx-7">
                <v-select v-model="selectedRateRange" :items="rateRanges" label="Average Rate">
                  <!-- Clear Rate Filter Button -->
                  <template v-slot:append>
                    <v-btn v-if="selectedRateRange" @click="clearRateFilter" icon>
                      <v-icon color="grey">mdi-close-circle</v-icon>
                    </v-btn>
                  </template>
                </v-select>
              </v-col>
            </v-row>
            <!-- Clear Filter Button -->
            <v-row>
              <v-col align="center" class="mx-7">
                <v-btn @click="clearFilters" color="error"  plain dark><v-icon>mdi mdi-filter-remove-outline</v-icon>Clear Filters</v-btn>
              </v-col>
            </v-row>
            <div ></div> 
            <v-row v-show="$auth.loggedIn" >
            <v-col align="center" class="mx-4 mt-15">
              <v-btn @click="logout" outlined color="blue" dark>Logout</v-btn>
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
          <v-row>
            <v-col align="start">
              <!-- <h2><i>A Place You Can Find Good Movies to Watch</i></h2> -->
            </v-col>
            <v-col align="end" cols="6">
              <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details dense filled outlined solo></v-text-field>
            </v-col>
          </v-row>
          <v-row class=" d-lg-none">
            <v-col cols="1">
            
          </v-col>
            <v-col cols="3">
              <v-select v-model="selectedGenre" :items="genres" label="Genre" >
                  <!-- Clear Genre Filter Button -->
                  <template v-slot:append>
                    <v-btn v-if="selectedGenre" @click="clearGenreFilter" icon>
                      <v-icon color="grey">mdi-close-circle</v-icon>
                    </v-btn>
                  </template>
                </v-select>
            </v-col>
            <v-col cols="3">
              <v-select v-model="selectedYear" :items="years" label="Year">
                  <!-- Clear Year Filter Button -->
                  <template v-slot:append>
                    <v-btn v-if="selectedYear" @click="clearYearFilter" icon>
                      <v-icon color="grey">mdi-close-circle</v-icon>
                    </v-btn>
                  </template>
                </v-select>
            </v-col>
            <v-col cols="3">
              <v-select v-model="selectedRateRange" :items="rateRanges" label="Average Rate">
                  <!-- Clear Rate Filter Button -->
                  <template v-slot:append>
                    <v-btn v-if="selectedRateRange" @click="clearRateFilter" icon>
                      <v-icon color="grey">mdi-close-circle</v-icon>
                    </v-btn>
                  </template>
                </v-select>
            </v-col>
            <v-col cols="2" align="start">
              <v-btn @click="clearFilters" fab color="error" icon ><v-icon>mdi mdi-backspace-outline</v-icon></v-btn>
          </v-col>
          </v-row>
         <v-card v-if="slicedMovies.length > 0" class="mt-2 mb-2" outlined>
        <v-row class="pa-4">
          <v-col v-for="movie in slicedMovies" :key="movie._id" cols="12" sm="12" md="6" lg="6">
        <v-card class="mx-auto" hight="auto" outlined style="text-overflow: hidden;">
          
            <div class="border">
              <v-row>
                <v-col cols="5" sm="5">
                  <v-img :src="movie.movie_thumbnail" max-width="180" height="190" rounded-lg></v-img>
                </v-col>
                <v-col cols="7" sm="7">
                  <v-row>
                            <v-col align="start">
                              <h3>{{ movie.title }}</h3>
                            </v-col>
                            <v-col align="end">
                              <v-btn :to="`/${movie._id}`" rounded small color="primary" dark>View</v-btn>
                            </v-col>
                          </v-row>
                  <h5>Rate: {{ movie.averageRate.toFixed(2) }} <span class="mdi mdi-star"></span></h5>
                  <v-row class="mt-1">
                    <v-chip v-for="(kind, index) in movie.kind" :key="index" class="ma-2" color="primary" outlined small>{{ kind }}</v-chip>
                    <v-chip class="ma-2" color="deep-orange darken-2" outlined small>{{ movie.year }}</v-chip>
                    <v-chip class="ma-2" color="teal darken-3" outlined small>{{ movie.duration }} mn</v-chip>
                  </v-row>
                  <v-row style="margin-top: -10px;">
                    <v-col >
                      <h4>Director:</h4>
                    </v-col>
                    <v-col align="start">
                      <p>{{ movie.director.firstname }} {{ movie.director.lastname }}</p>
                    </v-col>
                  </v-row>
                  <v-row style="margin-top: -35px;">
                    <v-col >
                      <h4>Actors:</h4>
                    </v-col>
                    <v-col align="start" style="overflow: hidden; height:50px">
                      <p style=" overflow: hidden;">{{ getActors(movie.Act) }}</p>
                    </v-col>
                  </v-row>

                </v-col>

              </v-row>
            </div>
        
        </v-card>
    </v-col>

  </v-row>
  <v-divider></v-divider>
  <v-row class="mx-2">
    <v-col align="center">
      <v-pagination v-model="page" :length="totalPages" circle></v-pagination>
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

export default {
  name: 'IndexPage',

  data() {
    return {
      movies: [],
      search: '',
      page: 1, 
      itemsPerPage: 9, 
      selectedGenre: '',
      selectedYear: '',
      genres: [], // Initialize genres property
      years: [],   // Initialize years property
      rateRanges: ['0-1', '1-2', '2-3', '3-4', '4-5'],
      selectedRateRange: ''
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
        filtered = filtered.filter(movie => movie.kind.includes(this.selectedGenre));
      }

      // Apply year filter
      if (this.selectedYear) {
        filtered = filtered.filter(movie => movie.year === this.selectedYear);
      }
      // Apply rate filter
      if (this.selectedRateRange) {
        const [minRate, maxRate] = this.selectedRateRange.split('-').map(Number);
        filtered = filtered.filter(movie => {
          return movie.averageRate >= minRate && movie.averageRate <= maxRate;
        });
      }

      return filtered;
    }
  },
  created() {
    this.fetchMovies();
  },
  methods: {
    // Inside the fetchMovies method
async fetchMovies() {
  try {
    const response = await fetch('https://no-sql-project.onrender.com/api/movie');
    const data = await response.json();
    this.movies = data;

    // Extract unique genres from movies
    const genresSet = new Set();
   
    data.forEach(movie => {
      movie.kind.forEach(genre => {
        const lowercaseGenre = genre.toLowerCase().trim(); // Convert to lowercase
        // Check if a genre with the same lowercase spelling already exists in the set
        if (!Array.from(genresSet).some(existingGenre => existingGenre.toLowerCase() === lowercaseGenre)) {
          genresSet.add(genre);
        }
      });
    });
    this.genres = Array.from(genresSet);

    // Extract unique years from movies
    const yearsSet = new Set();
    data.forEach(movie => yearsSet.add(movie.year));
    this.years = Array.from(yearsSet);

  } catch (error) {
    console.error('Error fetching movies:', error);
  }
},

    getActors(actors) {
      return actors.map(actor => `${actor.firstname} ${actor.lastname}`).join(', ');
    },
    clearFilters() {
      this.selectedGenre = '';
      this.selectedYear = '';
      this.selectedRateRange= '';
      this.search = '';
      this.page = 1;
    },
    clearGenreFilter() {
      this.selectedGenre = '';
    },
    clearYearFilter() {
      this.selectedYear = '';
    }, 
    clearRateFilter() {
      this.selectedRateRange = '';
    }, 
    async logout() {
      try {
        await this.$auth.logout();
        // Redirect the user to the login page or any other page
        this.$router.push('/login');
      } catch (error) {
        // Handle logout error, if any
        console.error('Error logging out:', error);
      }
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

