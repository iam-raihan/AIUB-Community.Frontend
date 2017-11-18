<template>
  <v-container ref="container" style="min-height:100vh">
    <v-layout row>
      <v-flex xs12>
        <vueDataLoading
          @pull-down="loadAuthUserSections()"
          :loading="loadings.loadAuthUserSections"
          :listens="['pull-down']"
          :distance="100"
          container="container">
          <div slot="pull-down-before"><v-icon class="primary--text">arrow_downward</v-icon>&nbsp;&nbsp;pull to refresh</div>
          <div slot="pull-down-ready"><v-icon class="primary--text">thumb_up</v-icon>&nbsp;&nbsp;ok ok..enough..!</div>
          <div slot="pull-down-loading"><v-icon class="spinner"></v-icon></div>
          <v-toolbar>
            <v-toolbar-title>
              <v-icon>format_list_bulleted</v-icon>
              {{ authUser.sections.length === 0 ? 'You Have No' : 'Your'}} Saved Sections
            </v-toolbar-title>
            <v-btn
              icon
              class="red--text"
              style="cursor: pointer"
              v-if="!mobileScreen"
              :loading="loadings.loadAuthUserSections"
              @click.native = "loadAuthUserSections()">
              <v-icon>refresh</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card>
            <v-expansion-panel popout focusable>
              <!-- @@@@@@@@@@@@@@@@ Loop for SECTIONS _of_ AuthUser @@@@@@@@@@@@@@@@ -->
              <v-expansion-panel-content v-for="(authUserSection, i) in authUser.sections" :key="i" lazy>
                <div slot="header">
                  <v-badge>
                    <span slot="badge">{{ authUserSection.users.length }}</span>
                    <span class="headline"><h5>{{ authUserSection.name }}</h5></span>
                  </v-badge>
                </div>
                <v-card>
                  <v-card-text class="grey lighten-3">
                    <center v-if="authUserSection.users.length === 1">No one else saved this section yet</center>
                    <!-- @@@@@@@@@@@@@@@@ Loop for USERS _of_ AuthUser => Section @@@@@@@@@@@@@@@@ -->
                    <userChips
                      v-else
                      :sectionUsers="authUserSection.users"
                      :authUserPortalId="authUser.portalid">
                    </userChips>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-card>
        </vueDataLoading>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import vueDataLoading from 'vue-data-loading'
  import userChips from './helpers/UserChips'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    components: {
      userChips,
      vueDataLoading
    },
    data () {
      return {
        mobileScreen: window.innerWidth < 500
      }
    },
    computed: {
      ...mapGetters({
        loadings: 'getLoadings',
        authUser: 'getAuthUser'
      })
    },
    methods: {
      ...mapActions([
        'loadAuthUserSections'
      ])
    }
  }
</script>

<style scoped>
  .headline {
    font-family: "Open Sans", sans-serif;
  }
  @keyframes spinner {
    to {transform: rotate(360deg);}
  }
  .spinner:before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin-top: -10px;
    margin-left: -10px;
    border-radius: 50%;
    border: 2px solid #ccc;
    border-top-color: rgb(19, 107, 205);
    animation: spinner .6s linear infinite;
  }
</style>
