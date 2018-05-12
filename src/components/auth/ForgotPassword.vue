<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs12 md5>
        <v-card>
          <v-card-title>
            <div>
              <div class="headline">Find Your Account</div>
              <span class="grey--text">Enter your ID and Email to verify your identity</span>
            </div>
          </v-card-title>
          <v-form v-model="form.valid" ref="form" @submit.prevent="submit()">
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
                      label="Enter Email"
                      hint="Enter email of your AIUB Community account"
                      v-model="form.email"
                      :rules="rules.email"
                      type="email"
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
                    v-if="!emailSent"
                    color="info"
                    :disabled="!form.valid"
                    type="submit"
                    :loading="loading">
                    VERIFY
                  </v-btn>
                  <v-subheader
                    style="height:36px"
                    v-else
                    class="green--text">
                    An email has been sent with password reset link
                  </v-subheader>
                </transition>
              </v-container>
            </v-card-actions>
          </v-form>
        </v-card>
        <p align="center" class="support-email grey--text">
          <small>
            Didn't receive any email? contact at <a href="mailto:accounts@aiubcommunity.com">accounts@aiubcommunity.com</a>
          </small>
        </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        form: {
          id: '',
          email: '',
          valid: false
        },
        rules: {
          id: [
            (v) => !!v || 'ID is required',
            (v) => (v.length === 10 && v[2] === '-' && v[8] === '-') || v.length === 0 || 'Invalid VUES ID',
            () => this.errorMsgs.id
          ],
          email: [
            (v) => !!v || 'Email is required',
            (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || v.length === 0 || 'Not a valid email address',
            () => this.errorMsgs.email
          ]
        },
        loading: false,
        errorMsgs: {
          id: true,
          email: true
        },
        emailSent: false
      }
    },
    watch: {
      'form.id' () {
        this.errorMsgs.id = true
      },
      'form.email' () {
        this.errorMsgs.email = true
      }
    },
    methods: {
      submit () {
        if (this.form.valid) {
          this.loading = true
          axios.post('user/forgot-password', {
            id: this.form.id,
            email: this.form.email
          })
          .then((response) => {
            this.emailSent = true
            this.loading = false
          })
          .catch((error) => {
            if (error.response.status === 422) {
              var data = error.response.data
              this.errorMsgs[data.field] = data.msg
            } else {
              this.errorMsgs.email = 'Failed to send email!'
            }
            this.$refs.form.validate()
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
  .support-email {
    font-size: medium;
    margin-top: 5px;
  }
</style>
