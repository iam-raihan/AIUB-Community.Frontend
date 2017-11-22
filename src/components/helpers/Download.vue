<template>
  <v-container>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" max-width="350px" @keydown.esc="dialog = false">
        <v-card>
          <v-card-title>
            <div>
              <div class="headline">Download <small>v1.0(beta)</small></div>
              <span class="grey--text">Download instruction for Make My Schedule-AIUB</span>
            </div>
          </v-card-title>
          <v-card-text>
            <div>
              <div class="headline primary--text">Installer</div>
              <div>If you want to use Make My Scheduling-AIUB on your personal computer then click on INSTALLER.</div>
            </div>
            <v-divider  class="mt-3"></v-divider>
            <div class="mt-3">
              <div class="headline success--text">Portable</div>
              <div>
                Just in case, you are reading this text on a monitor which has a peculiar name like 'ODDUU'
                and right now you don't care about your lab task because you have your pre/final registration
                within next 10-15 minutes then download PORTABLE version.
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="success"
              flat
              target="_blank"
              href="https://google.com">
              Portable
            </v-btn>          
            <v-btn
              color="info"
              flat
              target="_blank"
              href="https://google.com">
              Installer
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
          return this.$store.getters.getOpenDialogs.download
        },
        set: function (value) {
          if (!value) {
            this.$store.dispatch('openDialogs', {'dialog': 'download', 'open': false})
          }
        }
      }
    }
  }
</script>
