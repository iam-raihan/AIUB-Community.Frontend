<template>
  <v-container>    
    <v-layout row wrap text-xs-center>
      <v-flex xs12 md6>
        <img class="header-pic" v-lazy="headerPicSrc">
      </v-flex>      
      <v-flex xs12 md6>
        <v-layout row>
          <v-spacer></v-spacer>
          <h4>
            <VueTyper            
              :text="['Tired of scheduling sections??', 'Tired of pre/final registration??']"
              initial-action="erasing"
              :erase-delay="50"
              erase-style="select-back"
            ></VueTyper>
          </h4>
          <v-spacer></v-spacer>
        </v-layout>
        
        <v-layout row>
          <v-flex xs12>
            <h4>try, <b>Make My Schedule-AIUB</b></h4>
            <h5>your best schedule is just a few clicks away..!</b></h5>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs12 sm6 text-sm-right>
            <v-btn
              outline round large
              color="info"
              target="_blank"
              href="https://www.google.com">
              <v-icon left>file_download</v-icon>
              Download v1.0&nbsp;
            </v-btn>
            <!-- @click="openDialog()" -->
          </v-flex>

          <v-flex xs12 sm6 text-sm-left>
            <v-btn
              outline round large
              color="info"
              @click="openGallery()">
              <v-icon left>photo_library</v-icon>
              Screenshots&nbsp;&nbsp;&nbsp;
            </v-btn>
          </v-flex>

          <v-flex xs12 sm6 text-sm-right>
            <v-btn
              outline round large
              color="accent"
              target="_blank"
              href="https://www.youtube.com">
              <v-icon left>video_library</v-icon>
              short Tutorial
            </v-btn>
          </v-flex>

          <v-flex xs12 sm6 text-sm-left>
            <v-btn              
              outline round large
              color="accent"
              target="_blank"
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
      show-caption
      @lightBoxOn="lightBoxOn($event)"
      :showLightBox="false"
      :nThumbs="lightBoxThumbs"
    ></lightbox>
  </v-container>
</template>

<script>
  require('../assets/vue-image-lightbox.min.css')
  import Lightbox from 'vue-image-lightbox'
  import { VueTyper } from 'vue-typer'

  const images = [
    {
      thumb: '/static/step1.png',
      src: '/static/step1.png',
      caption: 'step1: Download > Install > Open "Make My Schedule Software" on your machine.'
    },
    {
      thumb: '/static/step2.png',
      src: '/static/step2.png',
      caption: 'step2: here you have to enter your <b>VUES Account</b> credentials. Don\'t miss the Note on top'
    },
    {
      thumb: '/static/step3.png',
      src: '/static/step3.png',
      caption: 'step3: after successful login, signup / signin <br> to your <b>AIUB Community Account</b>'
    },
    {
      thumb: '/static/step4.png',
      src: '/static/step4.png',
      caption: 'step4: after that click next and you will get all of your unlocked subjects for next semester like this'
    },
    {
      thumb: '/static/step5.png',
      src: '/static/step5.png',
      caption: 'step5: from here select sections for each of your selected subjects'
    },
    {
      thumb: '/static/step6.png',
      src: '/static/step6.png',
      caption: 'step6: I think everything here makes sense. Do some configuration and click on Generate Schedule.<br>It\'s not like setting up an Enigma machine, right? Take it easy'
    },
    {
      thumb: '/static/step7.png',
      src: '/static/step7.png',
      caption: 'step7: Finally, here\'s your best possible schedule among your selected sections. I hope that graphical presentation makes your schedule easy to understand.'
    },
    {
      thumb: '/static/step8.png',
      src: '/static/step8.png',
      caption: 'step8: click on "Pop Up" and you will get a mini window like these. You can pop up multiple schedule. These windows stay always on top, may be helpful when you browse to registration page in your VUES account.'
    }
  ]

  export default {
    data () {
      return {
        images,
        headerPicSrc: '/static/header-pic.png',
        lightBoxThumbs: window.innerWidth < 350 ? 2 : window.innerWidth < 750 ? 3 : 5
      }
    },
    components: {
      Lightbox,
      VueTyper
    },
    methods: {
      openDialog () {
        this.$store.dispatch('openDialogs', {'dialog': 'download', 'open': true})
      },
      openGallery () {
        this.$refs.lightbox.showImage(0)
      },
      lightBoxOn (value) {
        this.$store.dispatch('openDialogs', {'dialog': 'lightBox', 'open': value})
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
  h4 {
    font-size: calc(0.75em + 2vmin);
  }
</style>
