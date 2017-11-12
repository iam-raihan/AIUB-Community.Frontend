<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-toolbar>
          <v-toolbar-title>
            <v-icon>format_list_bulleted</v-icon>
            {{ userData.sections.length === 0 ? 'You Have No' : 'Your'}} Saved Sections
          </v-toolbar-title>
          <v-btn
            icon
            class="red--text"
            style="cursor: pointer"
            :loading="loadings.refreshUserSections"
            @click.native = "onRefreshUserSections()">
            <v-icon>refresh</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card>
          <v-expansion-panel popout focusable>
            <v-expansion-panel-content v-for="(userSection, i) in userData.sections" :key="i" lazy>
              <div slot="header">
                <v-badge>
                  <span slot="badge">{{ userSection.users.length }}</span>
                  <span class="headline"><h5>{{ userSection.name }}</h5></span>
                </v-badge>
              </div>
              <v-card>
                <v-card-text class="grey lighten-3">
                  <center v-if="userSection.users.length === 1">No one else saved this section yet</center>
                  <v-menu
                    v-else
                    offset-x
                    :close-on-content-click="false"
                    v-for="(sectionUser, j) in userSection.users" :key="j"
                    lazy
                  >
                    <v-chip
                      slot="activator"
                      style="cursor: pointer"
                      v-if="sectionUser.portalid !== userData.portalid">
                      <v-avatar class="teal">
                        <v-icon>account_circle</v-icon>
                      </v-avatar>
                      {{ sectionUser.name }}
                    </v-chip>
                    <v-card>
                      <v-list>
                        <v-list-tile avatar>
                          <v-list-tile-avatar>
                            <v-icon class="teal--text">account_circle</v-icon>
                          </v-list-tile-avatar>
                          <v-list-tile-content>
                            <v-list-tile-title>{{ sectionUser.name }}</v-list-tile-title>
                            <v-list-tile-sub-title>{{ sectionUser.portalid }} [{{ sectionUser.dept }}]</v-list-tile-sub-title>
                          </v-list-tile-content>
                          <v-card-actions>
                            <v-btn
                              icon
                              class="red--text"
                              style="cursor: pointer"
                              :loading="loadings.axios"
                              @click.native="onLoadSectionUser(sectionUser.portalid)">
                              <v-icon>{{sectionUsers[sectionUser.portalid] !== undefined ? 'refresh' : 'format_list_bulleted'}}</v-icon>
                            </v-btn>
                          </v-card-actions>
                        </v-list-tile>
                      </v-list>
                      <v-divider></v-divider>
                      <v-list dense>
                        <v-subheader v-if="sectionUsers[sectionUser.portalid] !== undefined">
                          {{ sectionUsers[sectionUser.portalid].length === 0 ? 'No ' : '' }}Saved Sections
                        </v-subheader>
                        <v-list-tile v-for="(section, i) in sectionUsers[sectionUser.portalid]" :key="i">
                          <v-list-tile-title>{{ section.name }}</v-list-tile-title>
                        </v-list-tile>
                      </v-list>
                    </v-card>
                  </v-menu>
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
  export default {
    computed: {
      loadings () {
        return this.$store.getters.getLoadings
      },
      userData () {
        return this.$store.getters.getUserData.user
      },
      sectionUsers () {
        return this.$store.getters.getSectionUsers || false
      }
    },
    methods: {
      onRefreshUserSections () {
        this.$store.dispatch('refreshUserSections')
      },
      onLoadSectionUser (id) {
        this.$store.dispatch('loadSectionUser', id)
      }
    }
  }
</script>

<style scoped>
  .headline {
    font-family: "Open Sans", sans-serif;
  }
</style>
