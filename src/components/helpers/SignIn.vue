<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs12 md5>
        <v-card>
          <v-card-title>
            <div>
              <div class="headline">Sign In</div>
              <span class="grey--text">Enter your AIUB Community credentials</span>
            </div>
          </v-card-title>
          <v-form v-model="form.valid" ref="form" @submit.prevent="signIn()">
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
                      :append-icon="form.visible ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (form.visible = !form.visible)"
                      v-model="form.pass"
                      :rules="rules.pass"
                      :type="form.visible ? 'text' : 'password'"
                      required>
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-checkbox
                      label="Remember Me"
                      v-model="form.remember"
                      color="#4CAF50"
                      hide-details>
                    </v-checkbox>
                  </v-flex>
                </v-layout>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-container class="text-xs-right">
              <v-btn
                color="info"
                :disabled="!form.valid"
                type="submit"
                :loading="loadings.axios">
                Sign In
              </v-btn>
              </v-container>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        form: {
          id: '',
          pass: '',
          remember: true,
          valid: false,
          visible: false
        },
        rules: {
          id: [
            (v) => !!v || 'ID is required',
            (v) => (v.length === 10 && v[2] === '-' && v[8] === '-') || v.length === 0 || 'Invalid VUES ID',
            () => this.signInErrorMsgs.id
          ],
          pass: [
            (v) => !!v || 'Password is required',
            (v) => v.length >= 8 || v.length === 0 || 'Password must be atleast 8 characters',
            () => this.signInErrorMsgs.pass
          ]
        }
      }
    },
    computed: {
      ...mapGetters({
        loadings: 'getLoadings',
        signInErrorMsgs: 'getSignInErrorMsgs',
        loggedIn: 'getLoggedIn'
      })
    },
    watch: {
      'form.id' () {
        if (this.signInErrorMsgs.id !== true) {
          this.$store.dispatch('changeSignInErrorMsgs', 'id')
        }
      },
      'form.pass' () {
        if (this.signInErrorMsgs.pass !== true) {
          this.$store.dispatch('changeSignInErrorMsgs', 'pass')
        }
      },
      'loadings.axios' () {
        this.$refs.form.validate()
      },
      loggedIn (isLoggedIn) {
        if (isLoggedIn) {
          this.$router.push(this.$route.query.redirect || {name: 'mySections'})
        }
      }
    },
    methods: {
      signIn () {
        if (this.form.valid) {
          this.$store.dispatch('signIn', {
            'id': this.form.id,
            'pass': this.form.pass,
            'remember': this.form.remember
          })
        }
      }
    }
  }
</script>
