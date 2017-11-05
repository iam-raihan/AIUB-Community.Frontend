<template>
  <v-app toolbar>
    <my-navbar></my-navbar>
    <main>
      <v-content>
        <router-view></router-view>
      </v-content>
    </main>
    <v-footer class="footer pa-2">
      <code>>> Website under development stage. More features coming up!</code>
    </v-footer>
  </v-app>
</template>

<script>
  export default { }
</script>

<style scoped>
  .footer{
    display: block;
    text-align: center;
  }
</style>