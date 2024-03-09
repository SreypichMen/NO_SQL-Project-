<template>
    <v-dialog v-model="dialog" max-width="430px">
      <template v-slot:activator="{ on, attrs }">
      
        <v-btn small color="red"  v-bind="attrs" v-on="on" plain>Delete</v-btn>
      </template>
  
      <v-card>
        <v-card-title class="text-h7"
          >Are you sure you want to your comment?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="deleteConfirm">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    props: ['id', 'movie_id'],
  
    data() {
      return {
        dialog: false,
        isLoading: false,
      }
    },
  
    methods: {
      deleteConfirm() {
       this.isLoading = true
       this.$axios.delete(`https://no-sql-project.onrender.com/rate/${this.id}`).then(() => {
        this.$nuxt.$emit('getProduct')
        this.isLoading = false
        this.dialog = false
         // Fetch the updated data to reload
        window.location.reload();
      })
      },
    },
  }
  </script>
  
  <style lang="scss" scoped></style>