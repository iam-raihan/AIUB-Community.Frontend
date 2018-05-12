<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs12 md5>
        <v-card>
          <v-card-title>
            <div>
              <div class="headline">Sign Up</div>
              <span class="grey--text">Create account in AIUB Community</span>
            </div>
          </v-card-title>          
          <v-card-text>
            It's awesome that you want to join us but sorry to say that registration form is not available here!<br/>
            To create account, all you have to do is:<br/>
            # Download "Make My Schedule" software<br/>
            # Log In with your VUES account credentials*<br/>
            # And then you will get Sign Up form there.<br/>
            <small>*Please understand that you have to verify you are AIUBian and be sure that your VUES account password will be stored in no where on the planet.</small>
          </v-card-text>
          <v-card-actions>
            <v-container class="text-xs-right">
              <v-btn
                color="info"
                target="_blank"
                href="https://s3.ap-south-1.amazonaws.com/aiubcommunity/MMS-Installer.exe">
                Download
              </v-btn>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
