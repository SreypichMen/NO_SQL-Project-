<template>
    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ on, attrs }">
        <v-icon color="red" v-bind="attrs" v-on="on"> mdi-delete </v-icon>
      </template>
  
      <v-card>
        <v-card-title class="text-h5"
          >Are you sure you want to delete this item?</v-card-title
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
    props: ['id'],
  
    data() {
      return {
        dialog: false,
        isLoading: false,
      }
    },
  
    methods: {
      deleteConfirm() {
       this.isLoading = true
       this.$axios.delete(`https://no-sql-project.onrender.com/api/movie/${this.id}`).then(() => {
        this.$nuxt.$emit('getProduct')
        this.isLoading = false
        this.dialog = false
        location.replace('/')
      })
      },
    },
  }
  </script>
  
  <style lang="scss" scoped></style>