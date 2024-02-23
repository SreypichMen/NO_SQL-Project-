<template>
  <div>
    <v-row v-if="movies.length > 0">
      <v-col align="center">
        <h2><i>A Place You Can Find Good Movies to Watch</i></h2>
      </v-col>
    </v-row>
    <v-row >
      <v-col cols="6" v-for="movie in movies" :key="movie._id">
        <nuxt-link :to="`/${movie._id}`" style="text-decoration: none;color: #0d324d">
        <div class="border">
          <v-row>
            <v-col cols="4">
              <v-img  max-width="180" height="190" rounded-lg :src="movie.movie_thumbnail"></v-img>
            </v-col>
            <v-col cols="6" align="start">
              <v-row>
                <v-col>
                  <h3>{{ movie.title }}</h3>
                </v-col>
              </v-row>
              <h5>Rate: {{ movie.averageRate }} <span class="mdi mdi-star"></span></h5>
              <v-row class="mt-1">
                <v-chip v-for="(kind, index) in movie.kind" :key="index" class="ma-2" color="primary" outlined>{{ kind }}</v-chip>
                <v-chip class="ma-2" color="deep-orange darken-2" outlined>{{ movie.year }}</v-chip>
                <v-chip class="ma-2" color="teal darken-3" outlined>{{ movie.duration }} mins</v-chip>
              </v-row>
              <v-row>
                <v-col>
                 <h3>Director:</h3>
                </v-col>
                <v-col align="start"><p>{{ movie.director.firstname }} {{ movie.director.lastname }}</p></v-col>
              </v-row>
              <v-row style="margin-top: -35px;">
                <v-col>
                 <h3>Actors:</h3>
                </v-col>
                <v-col align="start"><p>{{ getActors(movie.Act) }}</p></v-col>
                
              </v-row>
            </v-col>
            <v-col cols="2" align="end">
              <v-btn :to="`/${movie._id}`" rounded color="primary" dark @click="viewMovie(movie._id)">
                View
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </nuxt-link>
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
    };
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
    },
    viewMovie(movieId) {
      // Implement your logic to view the movie detail page
      console.log('View movie with ID:', movieId);
    }
  }
}
</script>

<style scoped>
h2 {
  color: aliceblue;
}
.border {
  padding: 10px;
  border-radius: 15px;
  border: 1px solid grey;
  background-color: aliceblue;
  height:210px
}
p {
  font-size: 1em;
  margin-top: 2px;
}
h5 {
  color: orange;
}
</style>
