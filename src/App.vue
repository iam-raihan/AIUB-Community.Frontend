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
      <code>>> Website under development stage. More features coming up! <a target="_blank" href="https://google.com"><img class="footer-pic" height="20px" src="/static/GitHub-Mark-32px.png" alt="Github"></a></code>
    </v-footer>
  </v-app>
</template>

<script>
  import navbar from '@/components/helpers/NavBar'
  import download from '@/components/helpers/Download'
  import signIn from '@/components/helpers/SignIn'
  import signUp from '@/components/helpers/SignUp'
  export default {
    components: {
      navbar,
      download,
      signIn,
      signUp
    }
  }
</script>

<style scoped>
  .footer{
    display: block;
    text-align: center;
  }
  .footer-pic{
    display: inline-block;
    vertical-align: middle;
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
