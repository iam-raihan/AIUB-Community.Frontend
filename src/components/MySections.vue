<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-toolbar>
          <v-toolbar-title>
            <v-icon>format_list_bulleted</v-icon>
            Your Saved Sections
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            icon
            class="primary--text"
            @click.native = "refreshUserSections()">
            <v-icon>cached</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card>
          <v-expansion-panel popout focusable>
            <v-expansion-panel-content v-for="(userSection, i) in userData.user.sections" :key="i" lazy>
              <div slot="header">
                <v-badge>
                  <span slot="badge">{{ userSection.users.length }}</span>
                  <span class="headline"><h6>{{ userSection.name }}</h6></span>
                </v-badge>
              </div>
              <v-card>
                <v-card-text class="grey lighten-3">
                  <v-menu
                    offset-x
                    :close-on-content-click="false"
                    v-for="(sectionUser, j) in userSection.users" :key="j"
                    lazy
                  >
                    <v-chip slot="activator" style="cursor: pointer">
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
                        </v-list-tile>
                      </v-list>
                      <v-divider></v-divider>
                      <v-list dense>
                        <v-subheader>Saved Sections</v-subheader>
                        <v-list-tile v-for="i in 5" :key="i">
                          <v-list-tile-title>Physics 1 [A]</v-list-tile-title>
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
    data () {
      return {
        show: true
      }
    },
    computed: {
      userData () {
        return this.$store.getters.getUserData
      }
    },
    methods: {
      refreshUserSections () {
        this.$store.dispatch('refreshUserSections')
      }
    }
  }
</script>

<style scoped>
  .headline {
    font-family: "Open Sans", sans-serif;
  }
</style>
