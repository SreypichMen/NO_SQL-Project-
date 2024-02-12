<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="800px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon>
          <v-icon color="green">mdi-pencil</v-icon>
        </v-btn>
      </template>
      <form @submit.prevent="save">
        <v-card>
          <v-card-title class="green green-darken-1 white--text">
            <span class="text-h5 white--text">Edit Movie</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <v-text-field label="Title" v-model="movie.title" required></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field label="Nationality" v-model="movie.natio" required></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field label="Duration" v-model="movie.duration" required></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field label="Year" v-model="movie.year" required></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col v-for="(kind, index) in movie.kind" :key="index">
                  <v-text-field v-model="movie.kind[index]" label="Type" required></v-text-field>
                  <v-icon @click="deleteKindRow(index)" color="error" v-if="movie.kind.length > 1">mdi-delete</v-icon>
                </v-col>
                <v-col v-if="movie.kind.length < 4" class="mt-5">
                  <v-icon @click="addKindRow()" color="green">mdi-plus-circle</v-icon>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field label="Director Firstname" v-model="movie.director.firstname" required outlined></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field label="Director Lastname" v-model="movie.director.lastname" required outlined></v-text-field>
                </v-col>
              </v-row>
              <v-row v-for="(Act, index) in movie.Act" :key="index">
                <v-col cols="5">
                  <v-text-field v-model="Act.firstname" label="Actor Firstname" required outlined></v-text-field>
                </v-col>
                <v-col cols="5">
                  <v-text-field v-model="Act.lastname" label="Actor Lastname" required outlined></v-text-field>
                </v-col>
                <v-col cols="2" align="center" class="mt-3">
                  <v-icon v-if="index === movie.Act.length - 1" @click="addActorRow(index)" color="green">mdi-plus-circle</v-icon>
                  <v-icon color="error" @click="deleteActorRow(index)" v-if="movie.Act.length > 1">mdi-delete</v-icon>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field label="Description" v-model="movie.description" outlined clearable required></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col align="center">
                  <v-file-input accept="image/png, image/jpeg, image/bmp" placeholder="Pick an image" prepend-icon="mdi-camera" label="Image" v-model="file"></v-file-input>
                  <div v-if="file || existingImageUrl">
                    <img width="200" :src="file ? createImageUrl(file) : existingImageUrl" />
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
            <v-btn :loading="isLoading" :disabled="isLoading" type="submit" color="blue darken-1" text>Update</v-btn>
          </v-card-actions>
          <div align="center" class="red--text font-weight-bold" v-if="status == 'ERROR'">{{ message }}</div>
          <div align="center" class="green--text font-weight-bold" v-else>{{ message }}</div>
        </v-card>
      </form>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ['id', 'subcates'],
  data() {
    return {
      dialog: false,
      movie: {
        title: '',
        natio: '',
        duration: '',
        year: '',
        director: {
          firstname: '',
          lastname: ''
        },
        kind: [''],
        Act: [{
          firstname: '',
          lastname: ''
        }],
        description: ''
      },
      isLoading: false,
      status: '',
      message: '',
      file: null, 
      existingImageUrl: null,
    };
  },
  created() {
      // this.getSubCategoryData();
      this.getMovieData();

  },

  methods: {
    getMovieData(){
        const axios = require('axios');
      // let products=[]
            axios
                .get(`http://localhost:3001/api/movie/${this.id}`)
                .then((res) => {

                  this.movie= res.data
                  this.existingImageUrl = this.movie.movie_thumbnail;
                  console.log(this.movie)
                  
                })
                .catch((error) => {
                console.log(error.response)

                })
      },
      async save() {
  this.isLoading = true;
  try {
    let image_url = '';
    if (this.file) {
      let formData = new FormData();
      formData.append('file', this.file);
      const res = await this.$axios.post('http://localhost:3001/upload-image', formData);
      image_url = res.data.data; // Extracting the URL string from the response data object
    }
    let data = {
      title: this.movie.title,
      description: this.movie.description,
      kind: this.movie.kind,
      year: this.movie.year,
      duration: this.movie.duration,
      movie_link: this.movie.movie_link, // Assuming this variable is defined elsewhere
      natio: this.movie.natio,
      director: this.movie.director,
      Act: this.movie.Act,
      movie_thumbnail: image_url // Set the movie thumbnail to the extracted URL string
    };
    await this.$axios.put(`http://localhost:3001/api/movie/${this.id}`, data);
    this.$nuxt.$emit('getProduct');
    this.status = 'OK';
    this.message = 'Success';
    this.dialog = false;
    location.replace('/manage_movie');
  } catch (error) {
    this.status = 'ERROR';
    this.message = 'Something went wrong';
  }
  setTimeout(() => {
    this.isLoading = false;
  }, 2000);
},


    createImageUrl(file) {
      return URL.createObjectURL(file);
    },
    addKindRow() {
      this.movie.kind.push('');
    },
    deleteKindRow(index) {
      this.movie.kind.splice(index, 1);
    },
    addActorRow(index) {
      this.movie.Act.splice(index + 1, 0, { firstname: '', lastname: ''
      });
    },
    deleteActorRow(index) {
      this.movie.Act.splice(index, 1);
    }, 
    onFileChange(event) {
      const file = event.target.files[0];
      this.file = file;
      this.existingImageUrl = this.createImageUrl(file); // Display the new image immediately
    }
  }
};
</script>
