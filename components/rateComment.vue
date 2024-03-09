<template>
  <div>
    <v-container v-if="allRates && allRates.user_rate">
      <v-row v-show="!$auth.loggedIn">
        <v-col align="start">Rate and Comments <span style="color: gray">{{ allRates.user_rate.length }}</span></v-col>
      </v-row>
      <!-- Display login prompt if user is not logged in -->
      <v-row v-show="!$auth.loggedIn">
        <v-col>
          <v-text-field
            placeholder="Please LOGIN to rate and comment!"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row v-show="$auth.loggedIn" class="mb-2">
        <!-- Display total number of rates and comments -->
        <v-col align="start" cols="9">Rate and Comments <span style="color: gray">{{ allRates.user_rate.length }}</span></v-col>
        <v-col align="end">
          <!-- Button to open dialog for posting comment -->
          <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                small
                dark
                v-bind="attrs"
                v-on="on"
              >
                Post Comment
              </v-btn>
            </template>
            <!-- Dialog for posting comment -->
            <v-card>
              <v-card-title>
                <span class="text-h6">Rate and Comment Movie</span>
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
                      {{ rating }}
                    </span>
                  </v-row>
                  <v-row class="mt-2">
                    <p class="black--text">
                      Write your comment :
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
                <v-btn
                  color="blue darken-1"
                  text
                  @click="dialog = false"
                >
                  Close
                </v-btn>
                <!-- Button to post comment -->
                <v-btn
                  color="blue darken-1"
                  text
                  @click="postComment"
                >
                  Post
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    
    <v-divider></v-divider>
      <!-- Display comments -->
      <v-row class="mt-2" v-for="(rate, index) in sortedRates" :key="index">
        <v-col cols="10">
          <!-- Display user's first name -->
          <h4>{{ rate.user.firstname }}</h4>
          <!-- Display star rating -->
          <h5>
            <!-- Render star icons based on the rate value -->
            <v-icon small v-for="i in 5" :key="i" :color="i <= rate.rate ? 'yellow' : 'grey'">mdi-star</v-icon>
          </h5>
          <!-- Display user's comment -->
          <p>{{ rate.comment }}</p>
          <!-- Display comment creation date and time -->
          <p style="color: gray; font-size: 11px;">{{ formatDateTime(rate.updatedAt) }}</p>
          <v-divider cols="12"></v-divider>
        </v-col>  
        <v-col v-if="$auth.loggedIn && rate.user._id === $auth.user.data._id" cols="2" align="end">
          <v-row class="pa-2"> <editRate :id="rate._id"  :movieId="rate.movie_id" />| <deleteRate :id="rate._id"  :movieId="rate.movie_id" /></v-row>
        </v-col>
     </v-row>    
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import deleteRate from '~/components/rateModify/deleteRate.vue'
import editRate from '~/components/rateModify/editRate.vue'

export default {
  props: ['movieId'],
  components: {
    deleteRate,
    editRate
  },
  data() {
    return {
      dialog: false,
      rate: 0,
      allRates: null,
      updatedAt: '',
      comment: '',
      movie_id: '',
      user_id: ''
    };
  },
  mounted() {
    // Fetch data from the API when the component is mounted
    this.fetchRates();
  },
  computed: {
    // Computed property to sort rates in descending order based on updatedAt timestamp
    sortedRates() {
    
      return this.allRates ? this.allRates.user_rate.slice().sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)) : [];
    }
  },
  methods: {
    async fetchRates() {
      try {
        const response = await axios.get(`https://no-sql-project.onrender.com/api/movie/${this.$route.params.id}`);
        this.allRates = response.data;
      } catch (error) {
        console.error('Error fetching rates:', error);
      }
    },
    async postComment() {
      try {
        const postData = {
          rate: this.rate,
          comment: this.comment,
          user_id: this.$auth.user.data._id,
          movie_id: this.$route.params.id
        };

        // Send POST request to add a new comment
        const response = await axios.post(`https://no-sql-project.onrender.com/rate/add`, postData);
        console.log('Comment posted successfully');
        this.dialog = false;

        // After successfully updating the comments, refresh the rates by fetching them again
        this.fetchRates();
      } catch (error) {
        console.error('Error posting comment:', error);
      }
    },
    formatDateTime(dateTime) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
      return new Date(dateTime).toLocaleDateString(undefined, options);
    }
  }
};
</script>

<style scoped>
h5 {
  color: orange;
}
</style>
