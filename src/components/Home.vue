<template>
  <v-container>    
    <v-layout row wrap text-xs-center>
      <v-flex xs12 md6>
        <img class="header-pic" v-lazy="headerPicSrc">
      </v-flex>      
      <v-flex xs12 md6>
        <v-layout row>
          <v-flex xs12>
            <h4>Tired of scheduling sections??</h4>
            <h4>try, <b>Make My Schedule-AIUB</b></h4>
            <h5>your best schedule is just a few clicks away..!</b></h5>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs12 sm6 text-sm-right>
            <v-btn outline round color="info" large>
              <v-icon left>file_download</v-icon>
              Download v1.0&nbsp;
            </v-btn>
          </v-flex>

          <v-flex xs12 sm6 text-sm-left>
            <v-btn outline round color="info" large
              @click.native="openGallery()">
              <v-icon left>photo_library</v-icon>
              Screenshots&nbsp;&nbsp;&nbsp;
            </v-btn>
          </v-flex>

          <v-flex xs12 sm6 text-sm-right>
            <v-btn outline round color="accent" dark large
               href="https://www.youtube.com">
              <v-icon left>video_library</v-icon>
              short Tutorial
            </v-btn>
          </v-flex>

          <v-flex xs12 sm6 text-sm-left>
            <v-btn outline round color="accent" dark large
               href="https://www.youtube.com">
              <v-icon left>video_library</v-icon>
              full Tutorial&nbsp;&nbsp;
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <lightbox
      :images="images"
      ref="lightbox"
      :show-caption="true"
      :showLightBox="false"
      :nThumbs="5"
    ></lightbox>
  </v-container>
</template>

<script>
  require('vue-image-lightbox/dist/vue-image-lightbox.min.css')
  import Lightbox from 'vue-image-lightbox'

  let images = [
    {
      thumb: '/static/step1.png',
      src: '/static/step1.png',
      caption: ''
    },
    {
      thumb: '/static/step2.png',
      src: '/static/step2.png',
      caption: 'caption to display. receive <html> <b>tag</b>'
    },
    {
      thumb: '/static/step3.png',
      src: '/static/step3.png',
      caption: 'caption to display. receive <html> <b>tag</b>'
    },
    {
      thumb: '/static/step4.png',
      src: '/static/step4.png',
      caption: 'caption to display. receive <html> <b>tag</b>'
    },
    {
      thumb: '/static/step5.png',
      src: '/static/step5.png',
      caption: 'caption to display. receive <html> <b>tag</b>'
    },
    {
      thumb: '/static/step6.png',
      src: '/static/step6.png',
      caption: 'caption to display. receive <html> <b>tag</b>'
    },
    {
      thumb: '/static/step7.png',
      src: '/static/step7.png',
      caption: 'caption to display. receive <html> <b>tag</b>'
    },
    {
      thumb: '/static/step8.png',
      src: '/static/step8.png',
      caption: 'caption to display. receive <html> <b>tag</b>'
    }
  ]

  export default {
    data () {
      return {
        images,
        headerPicSrc: '/static/header-pic.png'
      }
    },
    components: {
      Lightbox
    },
    methods: {
      openGallery () {
        this.$refs.lightbox.showImage(0)
      }
    }
  }
</script>

<style scoped>
  .header-pic {
    display: inline-block;
    max-width: 100%;
    vertical-align: middle;
  }

  h4, h5 {
    font-family: "Open Sans", sans-serif;
  }
</style>
