<template>
  <div class="dashboard">
      <div>
          <v-container>
              <v-row>
                  <h2 class="ml-3" style="color: white">
                      Manage Movie 
                  </h2>
              </v-row>
              <v-row>
                  <v-col align="start">
                      <v-text-field
                          v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                        dense
                        filled
                        outlined
                        solo
                      ></v-text-field>
                  </v-col>
                  <v-col align="end" style="margin-top: 18px; margin-right: 12px">
                      <v-row justify="end">
                          <v-dialog v-model="dialog" persistent max-width="800px">
                              <template v-slot:activator="{ on, attrs }">
                                  <v-btn
                                      v-bind="attrs"
                                      v-on="on"
                                      style="
                                          background-image: linear-gradient(  to top,#48c6ef 0%,   #6f86d6 100%  );
                                          color: whitesmoke !important;
                                          margin-left: 40px;
                                      "
                                  >
                                      <h3>ADD</h3>
                                  </v-btn>
                              </template>
                              <form @submit.prevent="save">
                              <v-card>
                                <v-card-title class="green green-darken-1 white--text">
                                  <span class="text-h5 white--text">Add Movie</span>
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
                                      <!-- Loop through each kind -->
                                      <v-col v-for="(kind, index) in movie.kind" :key="index">
                                          <!-- Input field -->
                                          <v-row align="center">
                                              <v-col cols="10">
                                                  <v-text-field v-model="movie.kind[index]" label="Type" required></v-text-field>
                                              </v-col>
                                              <!-- Delete button for each input field -->
                                              <v-col align="start">
                                                  <v-icon @click="deleteKindRow(index)" color="error" v-if="movie.kind.length > 1">mdi-delete</v-icon>
                                              </v-col>
                                          </v-row>
                                      </v-col>
                                      <!-- Add button if the number of input fields is less than 4 -->
                                      <v-col v-if="movie.kind.length < 4" class="mt-5">
                                          <v-icon @click="addKindRow(movie.kind.length)" color="green">mdi-plus-circle</v-icon>
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
                                        <v-row>
                                          <v-col >
                                                <v-icon v-if="index === movie.Act.length - 1" @click="addActorRow(index)" color="green">mdi-plus-circle</v-icon>
                                          </v-col>
                                          <v-col>
                                          <v-icon color="error" @click="deleteActorRow(index)" v-if="movie.Act.length > 1">mdi-delete</v-icon>
                                        </v-col>
                                        </v-row>
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
                                        <div v-if="file">
                                          <img width="200" :src="createImageUrl(file)" />
                                        </div>
                                      </v-col>
                                    </v-row>
                                  </v-container>
                                </v-card-text>
                                <v-card-actions>
                                  <v-spacer></v-spacer>
                                  <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
                                  <v-btn :loading="isLoading" :disabled="isLoading" type="submit" color="blue darken-1" text>ADD</v-btn>
                                </v-card-actions>
                                <div align="center" class="red--text font-weight-bold" v-if="status == 'ERROR'">{{ message }}</div>
                                <div align="center" class="green--text font-weight-bold" v-else>{{ message }}</div>
                              </v-card>
                            </form>
                          </v-dialog>
                      </v-row>
                  </v-col>
              </v-row>
              <v-row>
              </v-row>
          </v-container>
      </div>
      <div style="padding:12px">
          <v-data-table
              :headers="headers"
              :items="products"
              :items-per-page="5"
              :search="search"
              class="elevation-1"
          >
          
              <template #[`item.movie_thumbnail`]="{ item }">
                  <img class="py-1" :src="item.movie_thumbnail" height="80px" width="70px" style="border-radius: 10px; "  />
              </template>
              <template v-slot:item.action="{ item }" >
                  <div class="p-2" >
                      <v-row class="pl-2">
                        <editComponent :id="item._id" :subcates="subcates"/>
                        <deleteComponent  :id="item._id"/>
                          
                      </v-row>
                  </div>
              </template>
              <template v-slot:item.director="{ item }">
                  {{ item.director.firstname }} {{ item.director.lastname }}
              </template>
             

              <v-row>
                  <v-col align="end">  
                      <template v-slot:item.status="{ item }">
                          <v-chip :color="getColor(item.status)" dark>
                              {{ item.status }}
                          </v-chip>
                      </template>
                  </v-col>
                  
              </v-row>
          </v-data-table>
      </div>
  </div>
</template>

<script>
import EditComponent from '~/components/editComponent.vue'
import deleteComponent from '~/components/deleteComponent.vue';
export default {
  components:{
      EditComponent, deleteComponent
  },
  data() {
      return {
          components:{
              EditComponent, deleteComponent
          },
          headers: [
              { text: 'Title ', value: 'title', class: "green green-darken-1 white--text" },
              { text: 'Year', value: 'year', class: "green green-darken-1 white--text" },
              { text: 'Duration (mn)', value: 'duration', class: "green green-darken-1 white--text" },
              { text: 'Nationality', value: 'natio', class: "green green-darken-1 white--text" },
              { text: 'Type', value: 'kind', class: "green green-darken-1 white--text" },
              { text: 'Image', value: 'movie_thumbnail', class: "green green-darken-1 white--text" },
              { text: 'Director', value: 'director', class: "green green-darken-1 white--text text-xs" },
             
              { text: 'Action', value: 'action', class: "green green-darken-1 white--text" },
          ],
          products: [],
          kindInput: '',
          search: '',
          movie: {
        title: '',
        kind: [''],
        duration: '',
        natio: '',
        year: '',
        director: {
          firstname: '',
          lastname: ''
        },
        Act: [{
          firstname: '',
          lastname: ''
        }],
        description: ''
      },
          isLoading: false,
          status: '',
          message: '',
          file:null,
          image_url:'',
          dialog: false,
          rules: [
              (value) =>
              !value ||
              value.size < 2000000 ||
              'Image size should be less than 2 MB!',
          ],
      }
  },
  created() {
      this.getMovieData();
  },
  methods: {
    addActorRow(index) {
      // Add a new row for actor
      this.movie.Act.push({ firstname: '', lastname: '' });
    },
    deleteActorRow(index) {
      // Delete the actor row at the specified index
      this.movie.Act.splice(index, 1);
    },
    // Function to add a new kind row
    addKindRow(index) {
        this.movie.kind.splice(index + 1, 0, '');
    },
    // Function to delete a kind row
    deleteKindRow(index) {
        if (this.movie.kind.length > 1) {
            this.movie.kind.splice(index, 1);
        }
    },
    getMovieData(){
    const axios = require('axios');
    axios
        .get(`http://localhost:3001/api/movie`)
        .then((res) => {
            console.log(res.data); // Log the response data
            this.products = res.data;
        })
        .catch((error) => {
            console.log(error.response);
        });
}, 
async save() {
  this.isLoading = true;

  try {
    let imageData = '';
    if (this.file) {
      let formData = new FormData();
      formData.append('file', this.file);
      const res = await this.$axios.post('http://localhost:3001/upload-image', formData);
      imageData = res.data;
    }

    const data = {
      title: this.movie.title,
      duration: this.movie.duration,
      description: this.movie.description,
      kind: this.movie.kind,
      year: this.movie.year,
      natio: this.movie.natio,
      director: this.movie.director,
      Act: this.movie.Act,
      movie_thumbnail: imageData.data
    };

    await this.$axios.post('http://localhost:3001/api/movie/add', data);

    this.status = 'OK';
    this.message = 'Success';
    this.dialog = false;
    location.replace('/manage_movie');
  } catch (error) {
    this.status = 'ERROR';
    this.message = 'Something went wrong';
  } finally {
    this.isLoading = false;
  }
},


createImageUrl(file) {
return URL.createObjectURL(file)
},

  }
}
</script>

<style scoped>
.dashboard{
  color: white;
}