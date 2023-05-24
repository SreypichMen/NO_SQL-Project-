
          <template>
            <div class="container">
              <div class="wrapper">
                <v-container>
                <v-row>
                  <h2 class="ml-3" style="color: white">
                    Manage Transaction
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
                <div class="p-2">
                  <v-img :src="item.image" :alt="item.name" height="100px" width="100px"></v-img>
                </div>
              </template>
              <template v-slot:item.action="{ item }" >
                <div class="p-2" >
                  <v-row class="pa-2">
                      <v-dialog v-model="dialog" persistent max-width="600px">
                          <template v-slot:activator="{ on, attrs }">
                             <v-btn icon
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon color="blue">
                          mdi-eye-outline
                        </v-icon>
                      </v-btn>
                          </template>
                          <v-card>
                            <v-card-title>
                              <v-row>
                                <v-col align="center">
                                    <span class="text-h5"><h3>User Subscription Payment Detail</h3></span>
                                </v-col>

                              </v-row>
                            
                            </v-card-title>
                            <v-card-text>
                              <v-container style="align-items: center;">
                                <v-row>
                                  <v-col align="start" md="6" class="ml-10">
                                    <h4>Username:  </h4>
                                    <h4>Subcription Package:</h4>
                                    <h4>Date:</h4>
                                    <h4>Amount :</h4>
                                    <h4>Payment Image: </h4>
                                    
                                  </v-col>
                                  <v-col class="ml-5">
                                    <h4 style="color: black">Ariana</h4>
                                    <h4 style="color: black">Basic Plan</h4>
                                    <h4 style="color: black">23 March 2023</h4>
                                    <h4 style="color: black">5<span>$</span></h4>
                                  
                                  </v-col>
                                  </v-row>
                                 <v-row>
                                  <v-col align= "center">
                                     <img class="size" src="https://i.pinimg.com/736x/3f/e2/13/3fe213c1421a7232c15fc72022d6dd9d.jpg">
                                  </v-col>
                                 
                                 </v-row>
                              </v-container>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="blue darken-1" text @click="dialog = false">
                                Cancel
                              </v-btn>
                              
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      <v-btn icon
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon color="green">
                          mdi-check-bold
                        </v-icon>
                      </v-btn>
                  
                      <v-btn icon
                          v-bind="attrs"
                          v-on="on">
                        <v-icon color="red">
                          mdi-cancel
                        </v-icon>
                      </v-btn>
                  </v-row>
                </div>
              </template>
              
              <template v-slot:item.status="{ item }">
                <v-chip
                  :color="getColor(item.status)"
                  dark
                >
                  {{ item.status }}
                </v-chip>
              </template>
              </v-data-table>
              </div>

              
            </div>
        </template>
        <script>
          export default {
            data () {
              return {
                search: '',
                dialog: false,
                headers: [
                  {
                    text: 'ID',
                    align: 'start',
                    sortable: false,
                    value: 'id',
                    class: "green green-darken-1 white--text",
                  },
                  { text: 'Username', value: 'name', class: "green green-darken-1 white--text" },
                  { text: 'Subscription Package', value: 'sub_package', class: "green green-darken-1 white--text" },
                  { text: 'Date', value: 'date', class: "green green-darken-1 white--text " ,  },
                
                  { text: 'Amount', value: 'amount', class: "green green-darken-1 white--text " ,  },
                  { text: 'Payment Image', value: 'img', class: "green green-darken-1 white--text" },
                  { text: 'Status', value: 'status', class: "green green-darken-1 white--text" },
                  { text: 'Action', value: 'action', class: "green green-darken-1 white--text" },],
              
                icons:[
                  { 
                    icons: 'mdi-card'
                  },
                ],
                products: [
                {
                  id: 'p-001',
                  name:'Ariana Grande',
                  sub_package: 'Basic Plan',
                  date:'23 January 2023',
                  detail: 'Best for Starter',
                  amount:'5', 
                  img: '',
                  status: 'Review'
                },
                {
                  id: 'p-002',
                  name:'Ariana Grande',
                  sub_package: 'Basic Plan',
                  date:'23 March 2023',
                  detail: 'Best for Starter',
                  img: '',
                  amount:'5',
                  status: 'Review'
                },
                ],
                dialog: false,
                rules: [
                  value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
                ],
              }
            },
            methods: {
              getColor (status) {
                if (status == 'Paid') return 'green'
                else return 'blue'
              },
            },
          }
        </script>
        <style>
        
        /* .container{
          margin-left: 50px;
          margin-right: 50px
        } */
        .size{
         width: 100%;
      
        }
        .theme--light.v-data-table tbody tr:nth-of-type(even) {
            background-color:  #f2f2f2;
        }
        </style>
        
          