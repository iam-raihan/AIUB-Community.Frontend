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
                  <template v-for="user in authUserSection.users">
                    <v-menu
                      offset-x
                      :close-on-content-click="false"
                      lazy
                    >
                      <v-chip
                        slot="activator"
                        style="cursor: pointer"
                        v-if="user.portalid !== authUser.portalid">
                        <v-avatar class="teal">
                          <v-icon>account_circle</v-icon>
                        </v-avatar>
                        {{ user.name }}
                      </v-chip>
                      <v-card>
                        <v-list>
                          <v-list-tile avatar>
                            <v-list-tile-avatar>
                              <v-icon class="teal--text">account_circle</v-icon>
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                              <v-list-tile-title>{{ user.name }}</v-list-tile-title>
                              <v-list-tile-sub-title>{{ user.portalid }} [{{ user.dept }}]</v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-card-actions>
                              <v-btn
                                icon
                                class="red--text"
                                style="cursor: pointer"
                                :loading="user.portalid in users ? users[user.portalid].loading : false"
                                @click.native="loadUserData(user.portalid)">
                                <v-icon>{{user.portalid in users ? 'refresh' : 'format_list_bulleted'}}</v-icon>
                              </v-btn>
                            </v-card-actions>
                          </v-list-tile>
                        </v-list>
                        <v-divider></v-divider>
                        <template v-if="user.portalid in users && users[user.portalid].sections !== false">
                          <v-list dense>
                            <v-subheader>
                              {{ users[user.portalid].sections.length === 0 ? 'No ' : '' }}Saved Sections
                            </v-subheader>
                            <!-- @@@@@@@@@@@@@@@@ Loop for SECTIONS _of_ AuthUser => Section => User @@@@@@@@@@@@@@@@ -->
                            <template v-for="section in users[user.portalid].sections">
                              <v-list-tile
                                :to="{name: 'section', params: {classid: section.classid}}">
                                <v-list-tile-title>{{ section.name }}</v-list-tile-title>
                              </v-list-tile>
                            </template>
                          </v-list>
                        </template>
                      </v-card>
                    </v-menu>
                  </template>
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
  import { mapGetters, mapActions } from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        loadings: 'getLoadings',
        authUser: 'getAuthUser',
        users: 'getUsers'
      })
    },
    methods: {
      ...mapActions([
        'loadAuthUserSections',
        'loadUserData'
      ])
    }
  }
</script>

<style scoped>
  .headline {
    font-family: "Open Sans", sans-serif;
  }
</style>
