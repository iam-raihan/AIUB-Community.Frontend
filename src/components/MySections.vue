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
            @click.native = "onLoadAuthUserSections()">
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
                  <v-menu
                    v-else
                    offset-x
                    :close-on-content-click="false"
                    v-for="(user, j) in authUserSection.users" :key="j"
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
                              :loading="loadings.axios"
                              @click.native="onLoadUser(user.portalid)">
                              <v-icon>{{users[user.portalid] !== undefined ? 'refresh' : 'format_list_bulleted'}}</v-icon>
                            </v-btn>
                          </v-card-actions>
                        </v-list-tile>
                      </v-list>
                      <v-divider></v-divider>
                      <v-list dense>
                        <v-subheader v-if="users[user.portalid] !== undefined">
                          {{ users[user.portalid].length === 0 ? 'No ' : '' }}Saved Sections
                        </v-subheader>
                        <!-- @@@@@@@@@@@@@@@@ Loop for SECTIONS _of_ AuthUser => Section => User @@@@@@@@@@@@@@@@ -->
                        <template v-for="section in users[user.portalid]">
                          <v-list-tile
                            :to="{name: 'section', params: {classid: section.classid}}">
                            <v-list-tile-title>{{ section.name }}</v-list-tile-title>
                          </v-list-tile>
                        </template>
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
      authUser () {
        return this.$store.getters.getAuthUser.user
      },
      users () {
        return this.$store.getters.getUsers || false
      }
    },
    methods: {
      onLoadAuthUserSections () {
        this.$store.dispatch('loadAuthUserSections')
      },
      onLoadUser (id) {
        this.$store.dispatch('loadUser', id)
      }
    }
  }
</script>

<style scoped>
  .headline {
    font-family: "Open Sans", sans-serif;
  }
</style>
