<template>
  <v-container>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" max-width="350px">
        <v-card>
          <v-card-title>
            <div>
              <div class="headline">Sign Up</div>
              <span class="grey--text">Create account in AIUB Community</span>
            </div>
          </v-card-title>          
          <v-card-text>
            It's awesome that you want to join us but sorry to say that registration form is not available here!<br/>
            To create account, all you have to do is:<br/>
            # Download "Make My Schedule" software<br/>
            # Log In with your VUES account credentials*<br/>
            # And then you will get Sign Up form there.<br/>
            <small>*Please understand that you have to verify you are AIUBian and be sure that your VUES account password will be stored in no where on the planet.</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="accent"
              flat
              @click="dialog = false">
              Close
            </v-btn>          
            <v-btn
              color="info"
              flat
              @click="openDialog()">
              Download
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      dialog: {
        get: function () {
          return this.$store.getters.getOpenDialogs.signUp
        },
        set: function (value) {
          if (!value) {
            this.$store.dispatch('openDialogs', {'dialog': 'signUp', 'open': false})
          }
        }
      }
    },
    methods: {
      openDialog () {
        this.$store.dispatch('openDialogs', {'dialog': 'signUp', 'open': false})
        this.$store.dispatch('openDialogs', {'dialog': 'download', 'open': true})
      }
    }
  }
</script>
