<template>
  <v-container>
    <v-layout row justify-center>
      <v-dialog v-model="dialog">
        <v-card>
          <v-card-title class="headline">Use Google's location service?</v-card-title>
          <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Disagree</v-btn>
            <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Agree</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: ['openDialog'],
    data () {
      return {
        dialog: this.openDialog
      }
    },
    watch: {
      openDialog () {
        if (this.openDialog === true) {
          this.dialog = true
        }
      },
      dialog () {
        if (this.dialog === false) {
          this.$emit('closed')
        }
      }
    }
  }
</script>