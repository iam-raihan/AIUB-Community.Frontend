<template>
  <v-container>
    <v-layout row justify-center>
      <v-dialog v-model="dialog" max-width="300px">
        <v-card>
          <v-card-title>
            <div>
              <div class="headline">Sign In</div>
              <span class="grey--text">Enter your AIUB Community credentials</span>
            </div>
          </v-card-title>
          <v-form v-model="form.valid" ref="form" @submit.prevent="onSignin">
            <v-card-text>
              <v-container>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field
                      label="Enter ID"
                      hint="XX-XXXXX-X"
                      v-model="form.id"
                      :rules="rules.id"
                      required>
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      label="Enter Password"
                      hint="Enter password of your AIUB Community account"
                      v-model="form.pass"
                      :rules="rules.pass"
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
                Sign In
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
          id: '15-29913-2',
          pass: '16911691',
          valid: false
        },
        rules: {
          id: [
            (v) => !!v || 'ID is required',
            (v) => (v.length === 10 && v[2] === '-' && v[8] === '-') || v.length === 0 || 'Invalid VUES ID',
            () => this.logInErrorMsgs.id
          ],
          pass: [
            (v) => !!v || 'Password is required',
            (v) => v.length >= 8 || v.length === 0 || 'Password must be atleast 8 characters',
            () => this.logInErrorMsgs.pass
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
        return this.$store.getters.getLoadings.axios
      },
      logInErrorMsgs () {
        return this.$store.getters.getLogInErrorMsgs
      },
      loggedIn () {
        return this.$store.getters.getLoggedIn
      }
    },
    watch: {
      'form.id' () {
        if (this.logInErrorMsgs.id !== true) {
          this.$store.dispatch('changeLogInErrorMsgs', 'id')
        }
      },
      'form.pass' () {
        if (this.logInErrorMsgs.pass !== true) {
          this.$store.dispatch('changeLogInErrorMsgs', 'pass')
        }
      },
      'loading' () {
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