<template>
  <v-container fill-height>
    <v-layout align-center>
      <v-flex text-xs-center>
        <h3>
          {{ working ? 'Signing' : 'Signed'}}  Out!
          <v-btn
            flat
            icon
            loading
            v-if="working"
            class="red--text">
          </v-btn>
        </h3>
        <img v-lazy="signOutPicSrc">
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    mounted () {
      console.log('sign out clicked : ' + this.$store.getters.getSignOutClicked)
      this.$store.dispatch('signOut')
    },
    data () {
      return {
        signOutPicSrc: '/static/sign-out.gif'
      }
    },
    computed: {
      working () {
        return this.$store.getters.getLoadings.signingOut
      }
    }
  }
</script>
