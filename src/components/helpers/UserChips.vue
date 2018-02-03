<template>
  <div>
    <v-menu
      offset-x
      ref="menu"
      :close-on-content-click="false"
      v-for="(user, menuKey) in sectionUsers"
      :key="menuKey"
      lazy>
      <v-chip
        slot="activator"
        style="cursor: pointer"
        v-if="authUserPortalId !== user.portalid">
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
            <transition-slide>
              <v-list-tile
                ripple
                v-for="section in users[user.portalid].sections"
                :key="section.classid"
                @click="closeMenu(menuKey)"
                :to="{name: 'section', params: {classid: section.classid}}"
                slot="section-list">
                <v-list-tile-content>
                  {{ section.name }}
                </v-list-tile-content>
              </v-list-tile>
            </transition-slide>
          </v-list>
        </template>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
  import transitionSlide from './TransitionSlide'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    components: {
      'transition-slide': transitionSlide
    },
    props: ['sectionUsers', 'authUserPortalId'],
    computed: {
      ...mapGetters({
        users: 'getUsers'
      })
    },
    methods: {
      ...mapActions([
        'loadUserData'
      ]),
      closeMenu (item) {
        this.$refs.menu[item].isActive = false
      }
    }
  }
</script>
