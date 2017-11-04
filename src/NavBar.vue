<template>
  <div>
    <v-navigation-drawer temporary v-model="sideNav" dark class="secondary">
      <v-list>
        <v-list-tile
          v-if="loggedin"
          @click.stop="sideNav = false, loginDialog = true">
          <v-list-tile-action>
            <v-icon>person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>LOG IN</v-list-tile-content>
        </v-list-tile>
        <v-list-tile
                v-for="item in menuItems"
                :key="item.title"
                :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="primary">
      <v-toolbar-side-icon
              @click.stop="sideNav = !sideNav"
              class="hidden-sm-and-up "></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">AIUB Community</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn 
          flat
          v-if="loggedin"        
          @click.stop="loginDialog = true">
          <v-icon left dark>person</v-icon>
          LOG IN
        </v-btn>
        <v-btn
                flat
                v-for="item in menuItems"
                :key="item.title"
                :to="item.link">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <my-login
      :openDialog="loginDialog"
      @closed="loginClosed($event)"></my-login>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false,
        loginDialog: false,
        loggedin: true
      }
    },
    computed: {
      menuItems () {
        return [
          {icon: 'person_add', title: 'REGISTER', link: '/register'},
          {icon: 'format_list_bulleted', title: 'MY SECTIONS', link: '/sections'},
          {icon: 'exit_to_app', title: 'LOG OUT', link: '/logout'}
        ]
      }
    },
    methods: {
      loginClosed () {
        this.loginDialog = false
      }
    }
  }
</script>

<style>

</style>
