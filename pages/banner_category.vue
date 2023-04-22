<template>
    <div class="dashboard">
        <div>
            <v-container>
                <v-row>
                  <h2 style="color: white; margin-left: 12px">
                    Manage Banner Category
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
        <div>
            <v-data-table
            :headers="headers"
            :items="products"
            :items-per-page="5"
            :search="search"
            class="elevation-1 py-3"
        >
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
    data() {
      return {
       
        headers: [
          {
            text: 'ID',
            align: 'start',
            sortable: false,
            value: 'id',
            class: 'light-green lighten-2',
          },
          {
            text: 'Category Name',
            value: 'shop_name',
            class: 'light-green lighten-2',
          },
          { text: 'category Slug', value: 'name', class: 'light-green lighten-2' },   
        ],
        icons: [
          {
            icons: 'mdi-card',
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
