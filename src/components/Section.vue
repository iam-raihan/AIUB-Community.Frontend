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
              <v-icon>format_list_bulleted</v-icon>
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
              <template v-for="user in section.users">
                <v-menu
                  offset-x
                  :close-on-content-click="false"
                  lazy>
                  <v-chip
                    slot="activator"
                    style="cursor: pointer">
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
                        <!-- @@@@@@@@@@@@@@@@ Loop for SECTIONS _of_ Section => User @@@@@@@@@@@@@@@@ -->
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
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        users: 'getUsers'
      }),
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
      },
      ...mapActions([
        'loadUserData'
      ])
    }
  }
</script>
