<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-toolbar>
          <v-toolbar-title>
            <v-icon>format_list_bulleted</v-icon>
            {{ section.name }}
          </v-toolbar-title>
          <v-btn
            icon
            class="red--text"
            style="cursor: pointer"
            :loading="loadings.loadUserSections"
            @click.native = "loadSection(section.classid)">
            <v-icon>refresh</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card>
          <v-card-text>
            <center v-if="false">No one saved this section yet</center>
            <!-- @@@@@@@@@@@@@@@@ Loop for USERS _of_ Section @@@@@@@@@@@@@@@@ -->
            <v-menu
              v-else
              offset-x
              :close-on-content-click="false"
              v-for="(user, i) in 5" :key="i"
              lazy
            >
              <v-chip
                slot="activator"
                style="cursor: pointer">
                <v-avatar class="teal">
                  <v-icon>account_circle</v-icon>
                </v-avatar>
                Raihan
              </v-chip>
              <v-card>
                <v-list>
                  <v-list-tile avatar>
                    <v-list-tile-avatar>
                      <v-icon class="teal--text">account_circle</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title>Raihan</v-list-tile-title>
                      <v-list-tile-sub-title>15-29913-2 [BScSE]</v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-card-actions>
                      <v-btn
                        icon
                        class="red--text"
                        style="cursor: pointer"
                        @click.native="loadUser('15-29913-2')">
                        <v-icon>{{users['15-29913-2'] !== undefined ? 'refresh' : 'format_list_bulleted'}}</v-icon>
                      </v-btn>
                    </v-card-actions>
                  </v-list-tile>
                </v-list>
                <v-divider></v-divider>
                <v-list dense>
                  <v-subheader v-if="users['15-29913-2'] !== undefined">
                    {{ users['15-29913-2'].length === 0 ? 'No ' : '' }}Saved Sections
                  </v-subheader>
                  <!-- @@@@@@@@@@@@@@@@ Loop for SECTIONS _of_ Section => User @@@@@@@@@@@@@@@@ -->
                  <template v-for="section in users['15-29913-2']">
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
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      section () {
        return this.$store.getters.getSections.find((section) => {
          return section.classid === this.$route.params.classid
        })
      },
      loadings () {
        return this.$store.getters.getLoadings
      },
      users () {
        return this.$store.getters.getUsers || false
      }
    },
    watch: {
      section () {
        if (this.section.users === undefined) {
          this.loadSection(this.section.classid)
        }
      }
    },
    methods: {
      loadSection (classid) {
        // this.$store.dispatch('loadSection', classid)
        console.log('load section ' + classid)
      },
      loadUser (portalid) {
        this.$store.dispatch('loadUser', portalid)
      }
    }
  }
</script>
