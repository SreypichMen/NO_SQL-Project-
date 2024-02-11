<template>
    <div>
        <v-dialog v-model="dialog" persistent max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on" icon
              >
              <v-icon color="blue">
                mdi-plus-circle
              </v-icon>
              </v-btn>
            </template>
            <form @submit.prevent="save" >
                 <v-card >
                      <v-card-title class="green green-darken-1 white--text">
                              <span class="text-h5 white--text">Add Movie Episode</span>
                      </v-card-title>
                       <v-card-text>
                             <v-container>
                              <v-row  v-for="(ep, index) in episodes" :key="index" >
                                    <v-col align="center" md="8">
                                        <!-- <h5>EP <span></span></h5> -->
                                        <v-text-field
                                          v-model="episodes[index]"
                                          :label="`EP ${index + 1}`"
                                          outlined
                                          clearable
                                        ></v-text-field>
                                 
                                    </v-col>
				    <v-col>
					<v-btn @click="episodes.splice(index, 1)" color="red">
						<v-icon>mdi-close</v-icon>
					</v-btn>
				    </v-col>
                                </v-row>

				<v-btn @click="episodes.push('')" color="primary"> Add new episode </v-btn>
                             </v-container>
                              
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="blue darken-1" text @click="dialog = false">
                                Cancel
                              </v-btn>
                              <v-btn :loading="isLoading"
                                :disabled="isLoading"
                                type="submit"  color="blue darken-1" text >
                               Add
                              </v-btn>
                            </v-card-actions>
                            <div align="center" class="red--text font-weight-bold" v-if="status == 'ERROR'">
                              {{ message }}
                            </div>
                            <div align="center" class="green--text font-weight-bold" v-else>
                              {{ message }}
                            </div>

                          </v-card>
                          
                         </form>
                       
          </v-dialog>
    </div>
</template>
<script>
import axios from 'axios'
export default {
  props: ['id','subcates'], 
    data() {
      return {
        dialog: false,
        episodes: [''],
        isLoading: false,
        status: '',
        message: '',
        file:null,
        image_url:'',
        products:''
      }
    },
   
    created() {
      // this.getSubCategoryData();
      this.getMovieData();

  },

    methods: {
      addInput() {
      this.episodes.push(''); // Add a new empty element to the array
    },
      getMovieData(){
        const axios = require('axios');
      // let products=[]
            axios
                .get(`https://sabay-entertainment-movie-api.onrender.com/api/movie/${this.id}`)
                .then((res) => {

                  this.products= res.data
                  console.log(this.products)
		  this.episodes = res.data.episodes
                  this.subcate = this.products.subcategory
                })
                .catch((error) => {
                console.log(error.response)

                })
      },
      
      async save() {
	console.log('episodes', this.episodes);	
	axios({
		method: 'PUT',
		url: `http://localhost:3001/api/movie/${this.id}`,
		data: {
		    episodes: this.episodes
		}
	}).then((res) => {
		this.getMovieData();
	})
      },
      //   getSubCategoryData(){
      // const axios = require('axios');

      //       axios
      //           .get(`https://sabay-entertainment-movie-api.onrender.com/api/movie/subcategory/${this.id}`)
      //           .then((res) => {

      //             this.subcates= res.data
      //             console.log(this.subcates)

      //           })
      //           .catch((error) => {
      //           console.log(error.response)

      // })

      // },
      
  },

    }
</script>