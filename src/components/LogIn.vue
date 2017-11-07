<template>
  <v-container>
    <v-layout row justify-center>
      <v-dialog v-model="dialog"  max-width="300px">
        <v-card>
          <v-card-title>
            <span class="headline">Log In</span>
          </v-card-title>
          <v-form v-model="valid"  @submit.prevent="onSignin">
            <v-card-text>
              <v-container>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field
                      label="ID"
                      hint="xx-xxxxx-x"
                      v-model="id"
                      :rules="idRules"
                      required>
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      label="Password" 
                      hint="do not enter VUES password"
                      v-model="password"
                      :rules="passwordRules"
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
                :disabled="!valid"
                type="submit"
                :loading="loading"
                flat>
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
    props: ['openDialog'],
    data () {
      return {
        loading: false,
        valid: false,
        id: '',
        idRules: [
          (v) => !!v || 'ID is required',
          (v) => (v.length === 10 && v[2] === '-' && v[8] === '-') || 'Invalid ID'
        ],
        password: '',
        passwordRules: [
          (v) => !!v || 'Password is required',
          (v) => v.length >= 8 || 'Password must be atleast 8 characters'
        ]
      }
    },
    computed: {
      dialog: {
        get: function () {
          return this.openDialog
        },
        set: function (value) {
          if (!value) {
            this.$emit('closed', 'login')
          }
        }
      }
    },
    methods: {
      onSignin () {
        console.log({'id': this.id, 'password': this.password})
        this.loading = true
      }
    }
  }
</script>