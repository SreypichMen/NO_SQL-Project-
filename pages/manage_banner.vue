<template>
    <div class="dashboard">
        <div>
            <v-container>
                <v-row>
                  <h2 class="ml-3" style="color: white">
                    Manage Banner 
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
                              <span class="text-h5">Add Banner </span>
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
                                      label="Banner Category"
                                      required
                                    ></v-select>
                                  </v-col>
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
                                  <v-row>
                                    <v-col>
                                      <v-text-field
                                        label="Description"
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
          :items="products"
          :items-per-page="5"
          :search="search"
          class="elevation-1"
       
        >
        <template v-slot:item.image="{ item }">
          <div class="pa-1">
            <v-img :src="item.image" :alt="item.name" height="70px" width="70px" style="border-radius: 10px; "></v-img>
          </div>
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
import editComponent from '~/components/editComponent.vue';
export default {
  components:{
    editComponent
  },
    data() {
      return {
       
         headers: [
          {
            text: 'ID',
            align: 'start',
            sortable: false,
            value: 'id',
            class: "green green-darken-1 white--text",
           
          },
          // { text: 'Vendor Shop', value: 'vendor_shop', class: "green green-darken-1 white--text", },
          // { text: 'Address', value: 'address', class: "green green-darken-1 white--text" },
          // { text: 'Email Address', value: 'email', class: "green green-darken-1 white--text" },
          // { text: 'Phone Number', value: 'phone_number', class: "green green-darken-1 white--text" },
          { text: 'Title ', value: 'title', class: "green green-darken-1 white--text" },
          { text: 'Type', value: 'type', class: "green green-darken-1 white--text" },
          { text: 'Description', value: 'des', class: "green green-darken-1 white--text" },
          { text: 'Banner Image', value: 'image', class: "green green-darken-1 white--text" },
          { text: 'Banner Category', value: 'category', class: "green green-darken-1 white--text " ,  },
          { text: 'Action', value: 'action', class: "green green-darken-1 white--text" },],
        // icons: [
        //   {
        //     icons: 'mdi-card',
        //   },
        // ],
        products: [
          {
            id: 'ban-001',
            title: 'The Glory',
            type: 'Revange',
            des:'After becoming a primary school teacher, she takes in the son of the man who tormented her the most to enact her vengeance.',
            image:'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRNF8dnUiY8ad1Z9-QRGPoRpqYjvwiVbLHkMcS5SO5h9Wm5SEy3',
            category: 'Home Page',
            movie:'K-Drama'
          },
          // {
          //   id: 'ban-002',
          //   title: 'The Glory',
          //   type: 'Revange',
          //   des:'After becoming a primary school teacher, she takes in the son of the man who tormented her the most to enact her vengeance.',
          //   image:'https://th.bing.com/th/id/OIP.Mir4HQdguOeNR8uuBm3jmQHaFo?pid=ImgDet&rs=1',
          //   category: 'Home Page',
          //   movie:'K-Drama'
          // },
        ],
  
        dialog: false,
        rules: [
          (value) =>
            !value ||
            value.size < 2000000 ||
            'Image size should be less than 2 MB!',
        ],
      }
    },
   
    methods: {
    
    
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