<template>
  <v-app toolbar>
    <navbar></navbar>
    <main>
      <v-content>
        <transition name="fade">
          <router-view></router-view>
        </transition>
        <download class="pa-0"></download>
        <signIn class="pa-0"></signIn>
        <signUp class="pa-0"></signUp>
      </v-content>
    </main>    
    <v-footer class="footer pa-2">
      <code>>> Website under development stage. More features coming up!</code>
    </v-footer>
  </v-app>
</template>

<script>
  import NavBar from '@/components/helpers/NavBar'
  import Download from '@/components/helpers/Download'
  import SignIn from '@/components/helpers/SignIn'
  import SignUp from '@/components/helpers/SignUp'
  export default {
    components: {
      'navbar': NavBar,
      'download': Download,
      'signIn': SignIn,
      'signUp': SignUp
    }
  }
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
