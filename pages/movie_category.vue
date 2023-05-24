<template>
    <div class="dashboard">
        <div>
            <v-container>
                <v-row>
                  <h2 style="color: white; margin-left: 12px">
                    Manage Movie Category
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
                              <span class="text-h5">Add category</span>
                            </v-card-title>
                            <v-card-text>
                              <v-container>
                                <v-row>
                                  <v-col>
                                    <v-text-field
                                      label="Category Name" 
                                      required
                                    ></v-text-field>
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
          :items="category"
          :items-per-page="10"
   
          class="elevation-1"
       
        >

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
        </div>
    </div>
</template>
<script>
import editComponent from '~/components/editComponent.vue'
 export default {
  components: { editComponent 
  },

    data() {
      return {
        category:[],
         headers: [
          {
            text: 'ID',
            align: 'start',
            sortable: false,
            value: '_id',
            class: "green green-darken-1 white--text",
           
          },
          // { text: 'Vendor Shop', value: 'vendor_shop', class: "green green-darken-1 white--text", },
          // { text: 'Address', value: 'address', class: "green green-darken-1 white--text" },
          // { text: 'Email Address', value: 'email', class: "green green-darken-1 white--text" },
          // { text: 'Movie Category Name ', value: 'movie', class: "green green-darken-1 white--text" },
          { text: 'Category Name', value: 'Category_name', class: "green green-darken-1 white--text " ,  },
          { text: 'Action', value: 'action', class: "green green-darken-1 white--text" },],
        dialog: false,
        rules: [
          (value) =>
            !value ||
            value.size < 2000000 ||
            'Image size should be less than 2 MB!',
        ],
      }
    },  created() {
      this.getCategoryData();
  },
   
    methods: {
    getCategoryData(){
      const axios = require('axios');
      let category=[]
            axios
                .get(`http://localhost:3001/api/movie/category/`)
                .then((res) => {
               
                  this.category= res.data
                  console.log(this.category.Category_name)
            
                })
                .catch((error) => {
                console.log(error.response)
              
                })
          
            },

        
     }
     }
      

  
</script>
<style scoped>
.dashboard{
    color: white;
    margin-left: 50px;
    margin-right: 50px;
}
</style>
