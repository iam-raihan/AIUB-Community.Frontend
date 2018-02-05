<template>
  <v-container fill-height>
    <v-layout align-center>
      <v-flex text-xs-center>
        <h3>Oops..Page Not Found!</h3>
        <h5>Nothing to see here</h5>
        <img v-lazy="notFoundPicSrc">
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        notFoundPicSrc: '/static/not-found.gif'
      }
    }
  }
</script>

