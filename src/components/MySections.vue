<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-toolbar>
          <v-toolbar-title>
            <v-icon>format_list_bulleted</v-icon>
            {{ authUser.sections.length === 0 ? 'You Have No' : 'Your'}} Saved Sections
          </v-toolbar-title>
          <v-btn
            icon
            class="red--text"
            style="cursor: pointer"
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
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import UserChips from './HelperComponents/UserChips'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    components: {
      'userChips': UserChips
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
</style>
