<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs12 md5>
        <v-card>
          <v-card-title>
            <div>
              <div class="headline">Change Password</div>
              <span class="grey--text">Enter and confirm your new password</span>
            </div>
          </v-card-title>
          <v-form v-model="form.valid" ref="form" @submit.prevent="submit()">
            <v-card-text>
              <v-container>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field
                      label="Password reset token"
                      disabled
                      v-model="token"
                      :rules="rules.token"
                      required>
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      label="Enter New Password"
                      hint="Enter your new password"
                      :append-icon="form.passVisible ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (form.passVisible = !form.passVisible)"
                      v-model="form.pass"
                      :rules="rules.pass"
                      :type="form.passVisible ? 'text' : 'password'"
                      required>
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      label="Confirm New Password"
                      hint="Confirm your new password"
                      :append-icon="form.conPassVisible ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (form.conPassVisible = !form.conPassVisible)"
                      v-model="form.conPass"
                      :rules="rules.conPass"
                      :type="form.conPassVisible ? 'text' : 'password'"
                      required>
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-container text-xs-right>
                <transition name="button-fade" mode="out-in">
                  <v-btn
                    v-if="!passChanged"
                    color="info"
                    :disabled="!form.valid"
                    type="submit"
                    :loading="loading">
                    CHANGE PASSWORD
                  </v-btn>
                  <v-subheader
                    style="height:36px"
                    v-else
                    class="green--text">
                    Password Changed ! You may sign in now
                  </v-subheader>
                </transition>
              </v-container>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import axios from 'axios'
  export default {
    created () {
      if (this.token === undefined) {
        this.$router.push({name: 'forgot-password'})
      }
    },
    props: [
      'token'
    ],
    data () {
      return {
        form: {
          pass: '',
          conPass: '',
          passVisible: false,
          conPassVisible: false,
          valid: false
        },
        rules: {
          pass: [
            (v) => !!v || 'Password is required',
            (v) => v.length >= 8 || v.length === 0 || 'Password must be at least 8 characters',
            () => this.errorMsgs.pass
          ],
          conPass: [
            (v) => !!v || 'Confirm Password is required',
            (v) => v === this.form.pass || v.length === 0 || 'Password doesn\'t match'
          ],
          token: [
            () => this.errorMsgs.token
          ]
        },
        loading: false,
        errorMsgs: {
          pass: true,
          token: true
        },
        passChanged: false
      }
    },
    watch: {
      'form.pass' () {
        this.errorMsgs.pass = true
      }
    },
    methods: {
      submit () {
        if (this.form.valid) {
          this.loading = true
          axios.post('user/change-password', {
            pass: this.form.pass,
            token: this.token
          })
          .then((response) => {
            this.passChanged = true
            this.loading = false
          })
          .catch((error) => {
            if (error.response.status === 422) {
              var data = error.response.data
              this.errorMsgs[data.field] = data.msg
              this.$refs.form.validate()
            }
            this.loading = false
          })
        }
      }
    }
  }
</script>

<style scoped>
  .button-fade-enter-active {
    transition: all .3s ease;
  }
  .button-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .button-fade-enter {
    transform: translateX(10px);
    opacity: 0;
  }
  .button-fade-leave-to {
    transform: translateX(-10px);
    opacity: 0;
  }
</style>
