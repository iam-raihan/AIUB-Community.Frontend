<template>
  <div>
    <!-- @@@@@@@@@@@@@@@@ toolbar @@@@@@@@@@@@@@@@ -->
    <v-toolbar dark class="primary" app fixed clipped-left>
      <v-toolbar-side-icon
        @click.stop="sideBar = !sideBar">
      </v-toolbar-side-icon>
      <!-- <v-toolbar-title> -->
        <v-list class="primary" dark subheader>
          <router-link :to="{name: 'home'}" tag="span" style="cursor: pointer">
            <v-list-tile >
              <v-list-tile-content>
                <v-list-tile-title class="headline">AIUB COMMUNITY</v-list-tile-title>
                <v-list-tile-sub-title>by AIUBians for AIUBians</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </router-link>
        </v-list>
      <!-- </v-toolbar-title> -->
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn 
          flat
          v-if="!loggedIn"        
          @click.stop="openDialogs('logIn')">
          <v-icon left dark>person</v-icon>
          SIGN IN
        </v-btn>

        <v-btn 
          flat
          v-if="loggedIn"        
          :to="{name: 'userSections'}">
          <v-icon left dark>format_list_bulleted</v-icon>
          MY SECTIONS
        </v-btn>
        
        <v-btn 
          flat
          v-if="loggedIn"
          @click.stop="logOut()">
          <v-icon left dark>exit_to_app</v-icon>
          SIGN OUT
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <!-- @@@@@@@@@@@@@@@@ side bar @@@@@@@@@@@@@@@@ -->
    <v-navigation-drawer
      :temporary="!largeScreen"
      app
      clipped
      disable-route-watcher
      :mobile-break-point="1200"
      dark class="secondary"
      v-model="sideBar">
      <v-toolbar class="transparent">
        <v-text-field
          class="pt-4"
          label="Search Section"
          single-line
          dark
          prepend-icon="search"
          v-model="search">
        </v-text-field>
        <v-btn
          dark
          icon
          :loading="loading"
          @click.stop="loadAllSections()">
          <v-icon class="red--text">refresh</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list class="pt-0" dense style="cursor: pointer">
        <template v-for="(section, i) in sections">
          <v-list-tile :to="'/section/'+section.classid" @click.stop="onSideBarListClick()">
            <v-list-tile-content>
              <v-list-tile-title>{{ section.name }}</v-list-tile-title>
            </v-list-tile-content>
            <v-divider></v-divider>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <!-- @@@@@@@@@@@@@@@@ bottom sheet @@@@@@@@@@@@@@@@ -->
    <v-btn
      dark color="info"
      fixed fab
      bottom right
      @click.stop="bottomSheet = !bottomSheet, sideBar = false"
      class="hidden-sm-and-up">
      <v-icon>person</v-icon>
    </v-btn>
    <v-bottom-sheet v-model="bottomSheet">
      <v-list dark class="secondary">
        <v-list-tile avatar v-if="loggedIn">
          <v-list-tile-avatar>
            <v-icon large class="teal--text">account_circle</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ authUser.name }}</v-list-tile-title>
            <v-list-tile-sub-title>
              {{ authUser.portalid }} [{{ authUser.dept }}]
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile v-else>
          <v-list-tile-title>You are not signed in</v-list-tile-title>
        </v-list-tile>
        
        <v-list-tile
          v-if="!loggedIn"
          @click.stop="bottomSheet = false, openDialogs('logIn')">
          <v-list-tile-action>
            <v-icon dark>person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>SIGN IN</v-list-tile-content>
        </v-list-tile>
        
        <v-list-tile
          v-if="loggedIn"
          @click.stop="bottomSheet = false"
          :to="{name: 'userSections'}">
          <v-list-tile-action>
            <v-icon dark>format_list_bulleted</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>MY SECTIONS</v-list-tile-content>
        </v-list-tile>

        <v-list-tile
          v-if="loggedIn"
          @click.stop="bottomSheet = false, logOut()">
          <v-list-tile-action>
            <v-icon dark>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>SIGN OUT</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-bottom-sheet>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        search: '',
        bottomSheet: false,
        sideBar: this.largeScreen,
        largeScreen: window.innerWidth > 1200
      }
    },
    computed: {
      authUser () {
        return this.$store.getters.getAuthUser.user
      },
      loggedIn () {
        return this.$store.getters.getLoggedIn
      },
      loading () {
        return this.$store.getters.getLoadings.loadAllSections
      },
      sections () {
        return this.$store.getters.getSections.filter((section) => {
          return section.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        })
      }
    },
    watch: {
      loggedIn () {
        if (this.loggedIn) {
          this.$router.push({name: 'userSections'})
        } else {
          this.$router.push({name: 'home'})
        }
      }
    },
    methods: {
      openDialogs (value) {
        this.$store.dispatch('openDialogs', {'dialog': value, 'open': true})
      },
      logOut () {
        this.$store.dispatch('signOut')
      },
      loadAllSections () {
        this.$store.dispatch('loadAllSections')
      },
      onSideBarListClick () {
        if (!this.largeScreen) {
          this.sideBar = false
        }
      }
    }
  }
</script>

<style>

</style>
