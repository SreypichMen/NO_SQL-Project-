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
                                  <v-col>
                                      <v-text-field
                                        label="Category Slug"
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
            <v-img :src="item.image" :alt="item.name" height="70px" width="70px" style="border-radius: 100%; "></v-img>
          </div>
        </template>
        <template v-slot:item.action="{ item }" >
          <div class="p-2" >
            <v-row class="pl-2">
                <v-btn icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon color="green">
                    mdi-pencil
                  </v-icon>
                </v-btn>
            
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
export default {
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
          { text: 'Username', value: 'username', class: "green green-darken-1 white--text", },
        
          { text: 'Email Address', value: 'email', class: "green green-darken-1 white--text" },
          { text: 'Phone Number', value: 'phone', class: "green green-darken-1 white--text" },
        
           { text: 'Profile Image', value: 'image', class: "green green-darken-1 white--text" },
         
          { text: 'Action', value: 'action', class: "green green-darken-1 white--text" },],
        // icons: [
        //   {
        //     icons: 'mdi-card',
        //   },
        // ],
        products: [
          {
            id: 'u-001',
            username:'Ariana Grande',
            image:'data:image/jpeg;base64,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',
            email: 'ariana@gmail.com',
            phone: '012345678'
          },
          {
            id: 'u-002',
            username:'Bratt Pit',
            image:'data:image/jpeg;base64,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',
            email: 'brattpit@gmail.com',
            phone: '012347798'
          },
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