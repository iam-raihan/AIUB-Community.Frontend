<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-toolbar v-if="!section">
          <v-toolbar-title>
            Section Data Not Found...!
          </v-toolbar-title>
        </v-toolbar>
        <template v-else>
          <v-toolbar>
            <v-toolbar-title>
              <v-icon v-if="mediumScreen">format_list_bulleted</v-icon>
              {{ section.name }}
            </v-toolbar-title>
            <v-btn
              icon
              class="red--text"
              style="cursor: pointer"
              :loading="section.loading"
              @click.native = "loadSectionData()">
              <v-icon>refresh</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card>
            <v-card-text>
              <center v-if="section.users.length === 0">No one saved this section yet</center>
              <!-- @@@@@@@@@@@@@@@@ Loop for USERS _of_ Section @@@@@@@@@@@@@@@@ -->
              <userChips
                v-else
                :sectionUsers="section.users"
                :authUserPortalId="false">
              </userChips>
            </v-card-text>
          </v-card>
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import UserChips from './helpers/UserChips'
  export default {
    components: {
      'userChips': UserChips
    },
    data () {
      return {
        mediumScreen: window.innerWidth > 800
      }
    },
    computed: {
      section () {
        let found = Object.entries(this.$store.getters.getSections).find(section => {
          return section[0] === this.$route.params.classid
        })
        return found ? found.reduce((classid, data) => {
          if (data.users === false) {
            this.loadSectionData()
          }
          return data
        }) : false
      }
    },
    methods: {
      loadSectionData () {
        this.$store.dispatch('loadSectionData', this.$route.params.classid)
      }
    }
  }
</script>
