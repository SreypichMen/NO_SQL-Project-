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
                    <v-col  align="start ">
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
                        <v-dialog v-model="dialog" persistent max-width="600px">
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
                          <v-card>
                            <v-card-title>
                              <span class="text-h5">Add Movie</span>
                            </v-card-title>
                            <v-card-text>
                              <v-container>
                                <v-row>
                                  <v-col>
                                    
                                    <v-select
                                      :items="cates" 
                                      v-model="cate"
                                      item-text="name"
                                      item-value="id"
                                      label="Movie Title"
                                      required
                                    ></v-select>
                                  </v-col>
                                  <v-col>
                                      <v-text-field
                                        label="Type"
                                        required
                                      ></v-text-field>
                                    </v-col>

                                  </v-row>
                                  <v-row>
                                  <v-col>
                                    <v-select
                                      :items="cates" 
                                      v-model="cate"
                                      item-text="Banner_Cate"
                                      item-value="id"
                                      label="Banner Subcategory"
                                      required
                                    ></v-select>
                                  </v-col>
                                  <v-col>
                               
                                      <v-text-field
                                        label="Year"
                                        required
                                      ></v-text-field>
                                    
                                  </v-col>
                                 
                                  </v-row>
                                  <v-row>
                                    <v-col>
                                      <v-text-field
                                        label="Description"
                                        required
                                      ></v-text-field>
                                    </v-col>
                                    <v-col>
                               
                               <v-text-field
                                 label="Episoide"
                                 required
                               ></v-text-field>
                             
                           </v-col>
                                  </v-row>
                                  <v-row>
                                    <v-col>
                                    <!-- <v-text-field
                                        label="Description"
                                        required
                                      ></v-text-field> -->
                                      <v-file-input
                                          accept="image/png, image/jpeg, image/bmp"
                                          placeholder="Pick an image"
                                          prepend-icon="mdi-camera"
                                          label="Image" 
                                          v-model="image"
                                        ></v-file-input>
                                  </v-col>
                                
                                  </v-row>
                                
                              </v-container>
                              <!-- <small>*indicates required field</small> -->
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="blue darken-1" text @click="dialog = false">
                                Cancel
                              </v-btn>
                              <v-btn  color="blue darken-1" text >
                                ADD
                              </v-btn>
                            </v-card-actions>
                          </v-card>
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
              <editComponent/>
            
                <v-btn icon
                    v-bind="attrs"
                    v-on="on">
                  <v-icon color="red">
                    mdi-delete
                  </v-icon>
                </v-btn>
            </v-row>
          </div>
        </template>
        <v-row>
          <!-- <v-col align="center" >
            <template v-slot:header.id="{ header }">
         {{ header.text }}
         </template>
         </v-col> -->

       
         <v-col align="end">  
           <template v-slot:item.status="{ item }">
           <v-chip
             :color="getColor(item.status)"
             dark
           >
             {{ item.status }}
           </v-chip>
         </template>
       </v-col>
       
        </v-row>
       
      </v-data-table>
             </v-container>
        </div>
    </div>
</template>
<script>
import EditComponent from '~/components/editComponent.vue'
export default {
  components:{
         EditComponent 
       },
       
    data() {
      return {
       components:{
         EditComponent 
       },
       
         headers: [
          // {
          //   text: 'ID',
          //   align: 'start',
          //   sortable: false,
          //   value: '_id',
          //   class: "green green-darken-1 white--text",
           
          // },
          // { text: 'Vendor Shop', value: 'vendor_shop', class: "green green-darken-1 white--text", },
          // { text: 'Address', value: 'address', class: "green green-darken-1 white--text" },
          // { text: 'Email Address', value: 'email', class: "green green-darken-1 white--text" },
          // { text: 'Phone Number', value: 'phone_number', class: "green green-darken-1 white--text" },
          { text: 'Title ', value: 'title', class: "green green-darken-1 white--text" },
          { text: 'Subcate ', value: 'subcategory.Subcategory_name', class: "green green-darken-1 white--text" },
          { text: 'Type', value: 'type', class: "green green-darken-1 white--text" },
        
          { text: 'Year', value: 'year', class: "green green-darken-1 white--text" },
           { text: 'Image', value: 'movie_thumbnail', class: "green green-darken-1 white--text" },
           { text: 'Episoide', value: 'episode', class: "green green-darken-1 white--text" },
           { text: 'Description', value: 'description', class: "green green-darken-1 white--text text-xs" },
          { text: 'Action', value: 'action', class: "green green-darken-1 white--text" },],
          
          products: [],
    
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
      getMovieData(){
        const axios = require('axios');
      // let products=[]
            axios
                .get(`http://localhost:3001/api/movie`)
                .then((res) => {
               
                  this.products= res.data
                  console.log(this.products)
            
                })
                .catch((error) => {
                console.log(error.response)
              
                })
      }
    
      }
    }
</script>

<style scoped>
.dashboard{
    color: white;
    margin-left:30px;
    margin-right: 30px;
  }
</style>