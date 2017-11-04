<template>
  <v-app toolbar>
    <my-navbar></my-navbar>
    <main>
      <v-content>
        <router-view></router-view>
      </v-content>
    </main>
    <v-footer class="pa-2">
      <div>© {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
  export default { }
</script>

<style scoped>

</style>