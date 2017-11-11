<template>
  <div>
    <v-navigation-drawer temporary v-model="sideNav" dark class="secondary">
      <v-list>
        <v-list-tile
          v-if="!loggedIn"
          @click.stop="sideNav = false, openDialogs('logIn')">
          <v-list-tile-action>
            <v-icon>person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>SIGN IN</v-list-tile-content>
        </v-list-tile>

        <v-list-tile
          v-if="loggedIn"
          @click.stop="sideNav = false"
          to="/sections">
          <v-list-tile-action>
            <v-icon>format_list_bulleted</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>MY SECTIONS</v-list-tile-content>
        </v-list-tile>

        <v-list-tile
          v-if="loggedIn"
          @click.stop="sideNav = false, logOut()">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>SIGN OUT</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="primary">
      <v-toolbar-side-icon
              @click.stop="sideNav = !sideNav"
              class="hidden-sm-and-up "></v-toolbar-side-icon>
      <v-toolbar-title>
        <v-list class="primary" dark subheader>
          <router-link to="/" tag="span" style="cursor: pointer">
            <v-list-tile >
              <v-list-tile-content>
                <v-list-tile-title class="headline">AIUB COMMUNITY</v-list-tile-title>
                <v-list-tile-sub-title>by AIUBians for AIUBians</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </router-link>
        </v-list>
      </v-toolbar-title>
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
          to="/sections">
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
  </div>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false
      }
    },
    computed: {
      loggedIn () {
        return this.$store.getters.getLoggedIn
      }
    },
    watch: {
      loggedIn () {
        if (this.loggedIn) {
          this.$router.push('/sections')
        } else {
          this.$router.push('/')
        }
      }
    },
    methods: {
      openDialogs (value) {
        this.$store.dispatch('openDialogs', {'dialog': value, 'open': true})
      },
      logOut () {
        this.$store.dispatch('signOut')
      }
    }
  }
</script>

<style>

</style>
