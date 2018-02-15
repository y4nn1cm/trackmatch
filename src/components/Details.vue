<template>
  <v-app>
    <div style="margin-bottom:0; margin-top:0" class="containerwork">
      <strong style="font-size:4.5vmin">Which company do you work at?</strong>
      <v-text-field
        name="company"
        label="Type in the company"
        id="company"
        type="company"
        v-model="company"
        style="margin-bottom:0; padding-bottom:0; border:0; font-size:10%">
      </v-text-field>
    </div>
    <v-container class="containersearch containerwork" style="margin-bottom:5%; margin-top:0">
      <strong style="font-size:4vmin; margin-top:0">How experienced are you?</strong>
      <v-radio  label="entry level" value=1 name="experience" v-model='experience' style="margin-top:3%; margin-bottom:-0%; margin-left:-0%; margin-right:-0%; padding:0; font-size:10%"></v-radio>
      <v-radio style="margin:-0%; padding:0" label="> 2 years" value=2 name="experience" v-model='experience'></v-radio>
      <v-radio style="margin:-0%; padding:0" label="> 5 years" value=3 name="experience" v-model='experience'></v-radio>
      <v-radio style="margin:-0%; padding:0; font-size:4px" label="> 10 years" value=4 name="experience" v-model='experience'></v-radio>
      <strong style="font-size:4vmin">What disciplines do you come from?</strong>
      <div>   
        <select id=discipline1 class="backgroundselect">
          <option>Select</option>
          <option>Healthcare</option>
          <option>Art</option>
          <option>Music</option>
          <option>Engineering</option>
          <option>Business</option>
          <option>Design</option>
          <option>Politics</option>
          <option>Law</option>
          <option>Social Science</option>
          <option>Media</option>
          <option>Natural Science</option>
          <option>Culture Science</option>
          <option>Historical Science</option>
          <option>Communication</option>
        </select>
           
<select id=discipline2 class="backgroundselect">
  <option>Select</option>
  <option>Healthcare</option>
  <option>Art</option>
  <option>Music</option>
  <option>Engineering</option>
  <option>Business</option>
  <option>Design</option>
  <option>Politics</option>
  <option>Law</option>
  <option>Social Science</option>
  <option>Media</option>
  <option>Natural Science</option>
  <option>Culture Science</option>
  <option>Historical Science</option>
  <option>Communication</option>
</select>
    </div>
    
    <div class="line" style="margin-top:5%"></div>
    

  </v-container>
  </v-app>
</template>

<script>
import firebase from 'firebase'
import firestore from '../main'
export default {

  data () {
    return {
      company: null,
      searchjob: false,
      givefeedback: false,
      helphiring: false,
      imageurl: '',
      user: '',
      editpicture: false,
      experience: 1,
      experiencechoices: [' entry level', ' > 2 years', ' > 5 years', ' > 10 years']
    }
  },
  created () {
    firestore.collection('Users').where('ID', '==', firebase.auth().currentUser.uid).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.user = doc.data().firstname
        this.profilepicture = doc.data().profilepicture
        this.searchjob = doc.data().searchjob
        this.helphiring = doc.data().helphiring
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
<style lang="stylus" scoped>
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
