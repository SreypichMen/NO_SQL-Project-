<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" plain small color="green" @click="fetchRates">
          Edit
        </v-btn>
      </template>
      <!-- Dialog for editing rate and comment -->
      <v-card>
        <v-card-title>
          <span class="text-h6">Edit Rate and Comment </span>
        </v-card-title>
        <v-card-text>
          <v-container>
                  <v-row>
                    <p class="black--text">
                      Rating :
                    </p>
                    <!-- Display rating stars -->
                    <v-rating
                      v-model="rate"
                      background-color="gray"
                      color="yellow accent-4"
                      dense
                      half-increments
                      hover
                      size="18"
                    ></v-rating>
                    <span class="black--text text-caption">
                      {{ rate }}
                    </span>
                  </v-row>
                  <v-row class="mt-2">
                    <p class="black--text">
                      Edit your comment :
                    </p>
                  </v-row>
                  <v-row class="mt-2">
                    <!-- Text field for entering comment -->
                    <v-text-field label="Your Comment" v-model="comment" outlined clearable required></v-text-field>
                  </v-row>
                </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- Button to close dialog -->
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <!-- Button to update rate and comment -->
          <v-btn color="blue darken-1" text @click="updateRateAndComment">
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['id'],
  data: () => ({
    dialog: false,
    rate: '',
    comment: '',
  }),
  created() {
    this.fetchRates();
  },
  methods: {
    async fetchRates() {
  try {
    const response = await axios.get(`http://localhost:3001/rate/${this.id}`);
    // Assuming that response.data contains the rate and comment
    this.rate = response.data.rate; // Assign rate from response
    this.comment = response.data.comment;
    console.log(this.rate); // Use 'this' to reference the rate variable
    console.log(this.comment); // Assign comment from response
  } catch (error) {
    console.error('Error fetching rates:', error);
  }
},

async updateRateAndComment() {
  try {
    // Make a PUT request to update the rate and comment
    const response = await axios.put(`http://localhost:3001/rate/${this.id}`, { rate: this.rate, comment: this.comment });
    // Close the dialog after successful update
    this.dialog = false;
    console.log('Rate and comment updated successfully');
    
    // Fetch the updated data to reload
    window.location.reload();
  } catch (error) {
    console.error('Error updating rate and comment:', error);
  }
},

  },
};
</script>
