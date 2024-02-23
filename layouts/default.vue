<template>
  <v-app dark fluid fill-height class="background">
    <v-main>
      <v-container >
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>

<style scoped>
.background {
  background-image: url("~@/assets/background.jpg");
  /* Add other background properties for styling */
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
