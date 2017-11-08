<template>
  <v-container>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" max-width="300px">
        <v-card>
          <v-card-title>
            <div>
              <div class="headline">Log In</div>
              <span class="grey--text">Enter your AIUBCommunity credentials</span>
            </div>
          </v-card-title>
          <v-form v-model="form.valid" ref="form" @submit.prevent="onSignin">
            <v-card-text>
              <v-container>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field
                      label="Enter ID"
                      hint="xx-xxxxx-x"
                      v-model="form.id"
                      :rules="rules.id"
                      lazy-validation="true"
                      required>
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      label="Enter Password" 
                      hint="do not enter VUES password"
                      v-model="form.pass"
                      :rules="rules.pass"
                      lazy-validation="true"
                      type="password"
                      required>
                    </v-text-field>
                  </v-flex>              
                </v-layout>
              </v-container>
              <small>*indicates required field</small>
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
                color="blue darken-1"
                flat
                :disabled="!form.valid"
                type="submit"
                :loading="loading">
                Log In
              </v-btn>  
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        form: {
          id: '',
          pass: '',
          valid: false
        },
        rules: {
          id: [
            (v) => !!v || 'ID is required',
            (v) => (v.length === 10 && v[2] === '-' && v[8] === '-') || 'Invalid ID',
            () => this.wrongCredentials.id
          ],
          pass: [
            (v) => !!v || 'Password is required',
            (v) => v.length >= 8 || 'Password must be atleast 8 characters',
            () => this.wrongCredentials.pass
          ]
        }
      }
    },
    computed: {
      dialog: {
        get: function () {
          return this.$store.getters.getOpenDialogs.logIn
        },
        set: function (value) {
          if (!value) {
            this.$store.dispatch('openDialogs', {'dialog': 'logIn', 'open': false})
          }
        }
      },
      loading () {
        return this.$store.getters.getAxiosWorking
      },
      wrongCredentials () {
        return this.$store.getters.getWrongCredentials
      }
    },
    watch: {
      'form.id' () {
        if (this.wrongCredentials.id !== true) {
          this.$store.dispatch('changeWrongCredentials', 'id')
        }
      },
      'form.pass' () {
        if (this.wrongCredentials.pass !== true) {
          this.$store.dispatch('changeWrongCredentials', 'pass')
        }
      },
      loading () {
        this.$refs.form.validate()
      }
    },
    methods: {
      onSignin () {
        this.$store.dispatch('signIn', {
          'id': this.form.id,
          'pass': this.form.pass
        })
      }
    }
  }
</script>