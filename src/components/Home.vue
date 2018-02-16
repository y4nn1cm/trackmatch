<template>
  <v-app>
    <div class="center">
      <h2 style="margin-bottom:5%; margin-top:5%; font-family:merriweather">trackmatch</h2>
      <div class="line"></div>
      <p @click="editpicture=true" v-if="editpicture === false" style='text-align:left; margin-bottom:0px; font-size:2.5vw'>press to edit profile picture</p>
      <div v-if="editpicture === true">
      <a @click="editpicture=false"><p style='text-align:left; margin-bottom:0px; font-size:2.5vw;'>press to close</p></a>
      <form @submit.prevent="pictureUpload">
        <v-text-field 
          name="imageurl"
          label="Paste link to image here"
          id="imageurl"
          type="imageurl"
          v-model="imageurl"
          style= "margin-bottom:0; padding-bottom:0">
        </v-text-field>
          <v-btn primary class="button" type="submit" style="margin-top:0; padding-top:0">upload</v-btn>
        </form>
        </div>
        <img :src="profilepicture" class="profile-picture"> 
        <h2>Hello {{ user }}</h2>

        <h3>What can we help you with?</h3>
    
        <v-layout style=margin-top:5vw row wrap> 
          <v-flex xs12>
            <v-btn @click="togglejobsearch" v-bind:class="{primary: searchjob}" class="select" id=jobsearch>Find a (new) job</v-btn>
          </v-flex>
          <v-flex xs12>
          <v-btn @click="togglehelphiring" v-bind:class="{primary: helphiring}" class="select" id=hiring>Help our company hiring</v-btn>
          </v-flex>
          <v-flex xs12>
          <v-btn @click="togglefeedback" v-bind:class="{primary: givefeedback}" class="select" id=feedback>Create my ideal work environment</v-btn>
          </v-flex>
          <v-flex xs12>
          <v-btn @click="toggleevent" v-bind:class="{primary: findevents}" class="select" id=feedback>Find events with like-minded people</v-btn>
          </v-flex>
          <v-flex xs12>
          <v-btn @click="togglecoach" v-bind:class="{primary: findcoach}" class="select" id=feedback>Find a Coach / Mentor that fits me</v-btn>
          </v-flex>
          <v-flex class="text-xs-center" style="margin-top:4%">
            <v-btn primary @click="continuePress" type="submit">Continue</v-btn>
          </v-flex>
        </v-layout>
      </div>
  </v-app>
</template>

<script>
import firebase from 'firebase'
import firestore from '../main'
export default {

  data () {
    return {
      profilepicture: null,
      searchjob: false,
      givefeedback: false,
      helphiring: false,
      findevents: false,
      findcoach: false,
      imageurl: '',
      user: '',
      editpicture: false
    }
  },
  created () {
    window.scrollTo(0, 0)
    firestore.collection('Users').where('ID', '==', firebase.auth().currentUser.uid).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.user = doc.data().firstname
        this.profilepicture = doc.data().profilepicture
        this.searchjob = doc.data().searchjob
        this.givefeedback = doc.data().givefeedback
      })
    })
  },
  methods:

  {
    pictureUpload () {
      if (this.imageurl.length > 10) {
        this.editpicture = false
        this.$store.dispatch('pictureUpload', {imageurl: this.imageurl})
        firestore.collection('Users').where('ID', '==', firebase.auth().currentUser.uid).get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.profilepicture = doc.data().profilepicture
          })
        })
      }
    },

    togglejobsearch: function (event) {
      this.searchjob = !this.searchjob
    },

    togglehelphiring: function (event) {
      this.helphiring = !this.helphiring
    },

    togglefeedback: function (event) {
      this.givefeedback = !this.givefeedback
    },

    toggleevent: function (event) {
      this.findevents = !this.findevents
    },

    togglecoach: function (event) {
      this.findcoach = !this.findcoach
    },

    continuePress: function (event) {
      this.$store.dispatch('editGiveFeedback', {givefeedback: this.givefeedback})
      this.$store.dispatch('editHelpHiring', {helphiring: this.helphiring})
      this.$store.dispatch('editSearchJob', {searchjob: this.searchjob})
      this.$store.dispatch('editFindEvents', {findevents: this.findevents})
      this.$store.dispatch('editFindCoach', {findcoach: this.findcoach})
      this.$store.dispatch('openSite', {target: '/details'})
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Merriweather');

.profile-picture {
  width:30vw;
  height:30vw;
  border-radius: 50%;
  object-fit:cover;
  margin:6vw;
}

#imageurl {
  margin-bottom: 0;
  font-size: 2vw;
}

.center {
  position: relative;
  text-align: center;
  box-sizing: border-box;
  width: 100%;
  height:100%;
}

.select {
  margin-top:2.5%;
  margin-bottom:2.5%;
  width:90%;
  padding:0;
  height:10vw;
  text-align:center;
}

.line {
  position: relative;
  width: 100%;
  margin-top:5%;
  margin-bottom:5%;
  height: 1px;
  background: #DDD;
  border-radius: 10%;
  line-height: 0px;
}

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
