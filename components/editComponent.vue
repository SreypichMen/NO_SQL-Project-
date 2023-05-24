<template>
    <div>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on" icon
              >
              <v-icon color="green">
                mdi-pencil
              </v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">Edit Category</span>
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
                  Edit
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
    </div>
</template>
<script>
export default {
    data() {
      return {
        dialog: false,

      }
    },
   
    methods: {
    
    
      }
    }
</script>