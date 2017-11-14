<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-toolbar>
          <v-toolbar-title>
            <v-icon>format_list_bulleted</v-icon>
            Compiler Design {{classid}}
          </v-toolbar-title>
          <v-btn
            icon
            class="red--text"
            style="cursor: pointer"
            :loading="loadings.loadUserSections"
            @click.native = "loadSectionData('00123')">
            <v-icon>refresh</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card>
          <v-card-text>
            <center v-if="false">No one else saved this section yet</center>
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
                        @click.native="loadSectionUser('15-29913-2')">
                        <v-icon>{{sectionUsers['15-29913-2'] !== undefined ? 'refresh' : 'format_list_bulleted'}}</v-icon>
                      </v-btn>
                    </v-card-actions>
                  </v-list-tile>
                </v-list>
                <v-divider></v-divider>
                <v-list dense>
                  <v-subheader v-if="sectionUsers['15-29913-2'] !== undefined">
                    {{ sectionUsers['15-29913-2'].length === 0 ? 'No ' : '' }}Saved Sections
                  </v-subheader>
                  <v-list-tile v-for="(section, i) in sectionUsers['15-29913-2']" :key="i">
                    <v-list-tile-title>{{ section.name }}</v-list-tile-title>
                  </v-list-tile>
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
      classid () {
        return this.$route.params.classid
      },
      loadings () {
        return this.$store.getters.getLoadings
      },
      sectionUsers () {
        return this.$store.getters.getSectionUsers || false
      }
    },
    methods: {
      loadSectionUser (id) {
        this.$store.dispatch('loadSectionUser', id)
      }
    }
  }
</script>
