<template>
  <v-app style="text-align:center">
    <h3>It's great that you are here!</h3>
    <p class="body-2">First, we have to ask you to fill out your profile...</p>
    <p class="blocktext" v-if="this.searchjob">...to help you <span class="body-2">finding a new job</span>. Afterwards you can navigate to the "Find Jobs" section and check out your matching job offers.</p>
    <p class="blocktext" v-if="this.helphiring">...to help you <span class="body-2">hiring new employees</span>. Afterwards you can navigate to the "Create Employee Search" section to create a Job offer or to the "Find Employees" section and check out jobseekers directly.</p>
    <p class="blocktext" v-if="this.givefeedback">...to help you <span class="body-2">creating better company culture</span>. You can give insights about your desired work environment and feedback about the actual work environment you are working in. Your input is only visible as an aggregated and anonymized feedback for the whole company, so that all employees can improve on the company culture together</p>
    <v-btn class="teal" @click="this.$store.dispatch('openSite', {target: '/start'})">Edit Profile now</v-btn>
  </v-app>
</template>

<script>
import firebase from 'firebase'
import firestore from '../main'
export default {

  data () {
    return {
      profilepicture: '',
      searchjob: false,
      givefeedback: false,
      helphiring: false,
      findevents: false,
      findcoach: false,
      user: '',
      experience: null,
    }
  },
  created () {
    window.scrollTo(0, 0)
    firestore.collection('Users').where('ID', '==', firebase.auth().currentUser.uid).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.user = doc.data().firstname
        this.profilepicture = doc.data().profilepicture
        this.searchjob = doc.data().searchjob
        this.helphiring = doc.data().helphiring
        this.givefeedback = doc.data().givefeedback
        this.findevents = doc.data().findevents
        this.findcoach = doc.data().findcoach
        this.experience = doc.data().experience
      })
    })
  },
  methods:

  {
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

.blocktext {
    text-align:justify;
    margin-bottom:5vw;
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
