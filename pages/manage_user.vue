<template>
    <div class="dashboard">
        <div>
            <v-container>
                <v-row>
                  <h2 class="ml-3" style="color: white">
                    Manage User
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
        <template v-slot:item.image="{ item }">
          <div class="pa-1">
            <v-img :src="item.image" :alt="item.name" height="70px" width="70px" style="border-radius: 100%; "></v-img>
          </div>
        </template>
        <template v-slot:item.action="{ item }" >
                  <div class="p-2" >
                      <v-row class="pl-2">
                        <deleteComponent  :id="item._id"/>   
                      </v-row>
                  </div>
        </template>
        <v-row>
          <v-col align="center" >
            <template v-slot:header.id="{ header }">
         {{ header.text }}
         </template>
         </v-col>
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
import axios from 'axios'; // Import Axios library
import deleteComponent from '~/components/rate/deleteComponent.vue';
export default {
  components:{
       deleteComponent
  },
    middleware: ['auth'],
    data() {
        return {
            headers: [
                { text: 'Username', value: 'user_id.firstname', class: "green green-darken-1 white--text", },
                { text: 'Movie Name', value: 'movie_id.title', class: "green green-darken-1 white--text" },
                { text: 'Rate', value: 'rate', class: "green green-darken-1 white--text" },
                { text: 'Comment', value: 'comment', class: "green green-darken-1 white--text" },
                { text: 'Action', value: 'action', class: "green green-darken-1 white--text" },
            ],
            products: [],
            search: '', // Initialize search data
            dialog: false,
            rules: [
                (value) =>
                    !value ||
                    value.size < 2000000 ||
                    'Image size should be less than 2 MB!',
            ],
        }
    },
    mounted() {
        // Fetch data from the API when the component is mounted
        this.fetchData();
    },
    methods: {
        fetchData() {
            // Make a GET request to your API endpoint
            axios.get('http://localhost:3001/rate/')
                .then(response => {
                    // Update products with the received data
                    this.products = response.data.allRates;
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        
    }
}
</script>

<style scoped>
.dashboard {
    color: white;
    margin-left: 50px;
    margin-right: 50px;
}
</style>

<style scoped>
.dashboard{
    color: white;
    margin-left: 50px;
    margin-right: 50px;
  }
</style>