<template>
  <v-container grid-list-xl>
    <v-layout row wrap text-xs-center>
      <v-flex xs12>
        <img class="notice-pic" src="/static/notice-pic.png">
        <div>
          <code>>> Website under development stage. More features coming up!</code>
        </div>
      </v-flex>      
    </v-layout>

    <v-layout row text-xs-center>
      <v-flex xs12 md8 offset-md2>
        <h3>Tired of scheduling sections??</h3>
        <h3>Make My Schedule-AIUB</h3>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style scoped>
  .notice-pic {
    display: inline-block;
    max-width: 100%;  
    vertical-align: middle;
  }
  @media(max-width:640px) {
    .headline h3 {
        font-size: 30px;
    }
  }
  h3{
    font-family: Roboto, sans-serif;
  }
</style>
