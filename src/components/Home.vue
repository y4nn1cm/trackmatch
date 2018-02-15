<template>
  <div>
      <div class="center">
        <h1 style="margin-bottom:5%; margin-top:5%; font-family:merriweather; font-size:10vw">trackmatch</h1>
        <div class="line"></div>
        <p @click="editpicture=true" v-if="editpicture === false" style='text-align:left; margin-bottom:0px'>press to edit profile picture</p>
        <div v-if="editpicture === true">
        <a @click="editpicture=false"><p style='text-align:left; margin-bottom:0px'>press to close</p></a>
        <form @submit.prevent="pictureUpload">
          <v-text-field 
              name="imageurl"
              label="Paste link to image here"
              id="imageurl"
              type="imageurl"
              v-model="imageurl"
              style= "input-size:1vw"
              mb-0>
          </v-text-field>
          <v-btn primary class="button" type="submit" mt-0>upload</v-btn>
        </form>
        </div>
        <img :src="profilepicture" class="profile-picture"> 
        <h1 style="font-size:7vw;">Hello {{ user }}</h1>

        <strong style="font-size:5vmin">What can we help you with?</strong>
    
        <v-layout style=margin-top:5vw row wrap> 
          <v-flex xs12>
            <v-btn @click="togglejobsearch" v-bind:class="{primary: searchjob}" class="select" id=jobsearch>Find a job</v-btn>
          </v-flex>
          <v-flex xs12>
          <v-btn @click="togglehelphiring" v-bind:class="{primary: helphiring}" class="select" id=hiring>Help my company hiring</v-btn>
          </v-flex>
          <v-flex xs12>
          <v-btn @click="togglefeedback" v-bind:class="{primary: givefeedback}" class="select" id=feedback>Create my ideal work environment</v-btn>
          </v-flex>
          <v-flex class="text-xs-center" mt-4>
            <v-btn primary type="submit">Continue</v-btn>
          </v-flex>
        </v-layout>
      </div>
  </div>
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
      imageurl: '',
      user:'',
      editpicture: false
    }
  },
  created () {
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
      if (this.imageurl.length>10){
      this.editpicture=false
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
      this.$store.dispatch('editSearchJob', {searchjob: this.searchjob})
    },

    togglehelphiring: function (event) {
      this.helphiring = !this.helphiring
      this.$store.dispatch('editHelpHiring', {helphiring: this.helphiring})
    },

    togglefeedback: function (event) {
      this.givefeedback = !this.givefeedback
      this.$store.dispatch('editGiveFeedback', {givefeedback: this.givefeedback})
    },

    userSetObjective () {
      this.$store.dispatch('userSetObjective', {
        user: this.user, haswork: this.givefeedback, jobsearch: this.searchjob
      })
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
  font-size:2.5vw;
}

.select {
  margin-top:2.5%;
  margin-bottom:2.5%;
  width:90%;
  font-size: 3vw;
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
