<template>
  <v-container ref="container" style="min-height:80vh">
    <v-layout row>
      <v-flex xs12>
        <template v-if="!section">
          <v-toolbar>
            <v-toolbar-title>
              Section Data Not Found...!
            </v-toolbar-title>
          </v-toolbar>
          <v-container fill-height>
            <v-layout align-center>
              <v-flex text-xs-center>
                <img v-lazy="notFoundPicSrc">
              </v-flex>
            </v-layout>
          </v-container>
        </template>

        <template v-else>
          <vueDataLoading
            @pull-down="loadSectionData()"
            :loading="section.loading"
            :listens="['pull-down']"
            :distance="100"
            container="container">
            <div slot="pull-down-before"><v-icon class="primary--text">arrow_downward</v-icon>&nbsp;&nbsp;pull to refresh</div>
            <div slot="pull-down-ready"><v-icon class="primary--text">thumb_up</v-icon>&nbsp;&nbsp;ok ok..enough..!</div>
            <div slot="pull-down-loading"><v-icon class="spinner"></v-icon></div>
            <v-toolbar>
              <v-toolbar-title>
                <v-icon v-if="!mediumScreen">format_list_bulleted</v-icon>
                {{ section.name }}
              </v-toolbar-title>
              <v-btn
                icon
                class="red--text"
                style="cursor: pointer"
                v-if="!mediumScreen"
                :loading="section.loading"
                @click.native = "loadSectionData()">
                <v-icon>refresh</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card>
              <v-card-text>
                <center v-if="section.users.length === 0">No one saved this section yet</center>
                <!-- @@@@@@@@@@@@@@@@ Loop for USERS _of_ Section @@@@@@@@@@@@@@@@ -->
                <userChips
                  v-else
                  :sectionUsers="section.users"
                  :authUserPortalId="false">
                </userChips>
              </v-card-text>
            </v-card>
          </vueDataLoading>
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import vueDataLoading from 'vue-data-loading'
  import userChips from './helpers/UserChips'
  export default {
    components: {
      userChips,
      vueDataLoading
    },
    data () {
      return {
        mediumScreen: window.innerWidth < 960,
        notFoundPicSrc: '/static/not-found.gif'
      }
    },
    computed: {
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
      }
    }
  }
</script>

<style scoped>
  @keyframes spinner {
    to {transform: rotate(360deg);}
  }
  .spinner:before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin-top: -10px;
    margin-left: -10px;
    border-radius: 50%;
    border: 2px solid #ccc;
    border-top-color: rgb(19, 107, 205);
    animation: spinner .6s linear infinite;
  }
</style>
