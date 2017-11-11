<template>
  <v-app toolbar>
    <my-navbar></my-navbar>
    <main>
      <v-content>
        <transition name="fade">
          <router-view></router-view>
        </transition>
        <my-login></my-login>
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
  .fade-enter-active, .fade-leave-active {
    transition-property: opacity;
    transition-duration: .25s;
  }
  .fade-enter-active {
    transition-delay: .25s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
