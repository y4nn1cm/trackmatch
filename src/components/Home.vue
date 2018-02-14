<template>
  <div>
    <v-container id="box">
      <div class="center">
        <h1 style="margin-bottom:5%; margin-top:5%; font-family:merriweather; font-size:10vw">trackmatch</h1>
        <div class="line"></div>
        <form @submit.prevent="pictureUpload">
          <v-flex class="text-xs-center" mt-5>
            <v-text-field
              name="imageurl"
              label="Please paste a link to your profilepicture"
              id="imageurl"
              type="imageurl"
              v-model="imageurl">
              </v-text-field>
            <v-btn primary type="submit">upload</v-btn>
          </v-flex>
        </form>
        <img :src="profilepicture" class="profile-picture"> 
        <h1 style="font-size:7vw;">Hello {{ user }}</h1>

        <strong style="font-size:5vmin">Why are you here?</strong>
    
        <v-layout style=margin-top:2vw row wrap> 
          <v-flex xs4>
            <v-btn @click="togglejobsearch" v-bind:class="{primary: searchjob}" class="select" id=jobsearch>Find a job</v-btn>
          </v-flex>
          <v-flex xs4>
          <v-btn @click="togglehelphiring" v-bind:class="{primary: helphiring}" class="select" id=hiring>Help my<br>company hiring</v-btn>
          </v-flex>
          <v-flex xs4>
          <v-btn @click="togglefeedback" v-bind:class="{primary: givefeedback}" class="select" id=feedback>Give anonymous<br>Feedback</v-btn>
          </v-flex>
          <v-flex class="text-xs-center" mt-5>
            <v-btn primary type="submit">Continue</v-btn>
          </v-flex>
        </v-layout>
      </div>
    </v-container>
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
      user:''
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
      this.$store.dispatch('pictureUpload', {imageurl: this.imageurl})
      firestore.collection('Users').where('ID', '==', firebase.auth().currentUser.uid).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.profilepicture = doc.data().profilepicture
      })
    })
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
  margin:4vw;
  margin-bottom:6vw;
}

.center {
  position: relative;
  text-align: center;
  box-sizing: border-box;
  padding:2%;
  width: 100%;
  height:100%;
}

#box {
  position: relative;
  text-align: center;
  width: 94%;
  margin-top:5%;
  margin-bottom:5%;
  background: rgb(245, 245, 245);
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}

.select {
  margin-top:7.5%;
  margin-bottom:5%;
  width:90%;
  font-size: 2vw;
  padding:0;
  height:40px;
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
