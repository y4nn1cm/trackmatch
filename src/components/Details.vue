<template>
  <v-app>
    <div style="margin-bottom:0; margin-top:0">
      <h4 style="margin-bottom:0">Which company do you work at?</h4>
      <v-text-field
        name="company"
        label="Type in the company"
        id="company"
        type="company"
        v-model="company"
        style="margin-top:0; border:0; font-size:10%">
      </v-text-field>
    </div>
      <h4>How experienced are you?</h4>
      <v-radio  label="entry level" value=1 name="experience" v-model='experience' style="margin-top:3%; margin-bottom:0%; margin-left:-0%; margin-right:-0%; padding:0; font-size:10%"></v-radio>
      <v-radio style="margin:0%; padding:0" label="> 2 years" value=2 name="experience" v-model='experience'></v-radio>
      <v-radio style="margin:0%; padding:0" label="> 5 years" value=3 name="experience" v-model='experience'></v-radio>
      <v-radio style="margin:0%; padding:0; font-size:4px" label="> 10 years" value=4 name="experience" v-model='experience'></v-radio>
      <h4>What are your areas of expertise?</h4> 
        <v-select id=discipline1
          label="Discipline or Industry"
          :items="disciplineitems"
          v-bind="selection1"
          class="input-group--focused">
        </v-select>
        <v-select id=discipline1
          label="Discipline or Industry"
          :items="disciplineitems"
          v-bind="selection2"
          class="input-group--focused">
        </v-select>
    <div class="line" style="margin-top:5%"></div>
    <h4>What do you do?</h4>
    <p class="body-2">Product</p>
        <v-checkbox style="margin:0%; padding:0" label="Product Management" v-model="activities" value="Product Management"></v-checkbox>
        <v-checkbox style="margin:0%; padding:0" label="Product Design" v-model="activities" value="Product Management"></v-checkbox>
        <v-checkbox style="margin:0%; padding:0" label="Customer Success" v-model="activities" value="Customer Success"></v-checkbox>
        <v-checkbox style="margin:0%; padding:0" label="UX/UI Design" v-model="activities" value="UX/UI Design"></v-checkbox>
        <v-checkbox style="margin:0%; padding:0" label="Graphic Design" v-model="activities" value="Graphic Design"></v-checkbox>
    <p class="body-2">Business</p>
    <v-checkbox style="margin:0%; padding:0" label="Operations" v-model="activities" value="Operations"></v-checkbox>
        <v-checkbox style="margin:0%; padding:0" label="Finance" v-model="activities" value="Finance"></v-checkbox>
        <v-checkbox style="margin:0%; padding:0" label="Marketing" v-model="activities" value="Marketing"></v-checkbox>
        <v-checkbox style="margin:0%; padding:0" label="Sales" v-model="activities" value="Sales"></v-checkbox>
        <v-checkbox style="margin:0%; padding:0" label="Business Development" v-model="activities" value="Business Development"></v-checkbox>
    <p class="body-2">Technology</p>
        <v-checkbox style="margin:0%; padding:0" label="Software Development" v-model="activities" value="Software Development"></v-checkbox>
        <v-checkbox style="margin:0%; padding:0" label="Web Development" v-model="activities" value="Web Development"></v-checkbox>
        <v-checkbox style="margin:0%; padding:0" label="Mobile Development" v-model="activities" value="Mobile Development"></v-checkbox>
        <v-checkbox style="margin:0%; padding:0" label="Virtual / Augmented Reality" v-model="activities" value="VR/AR"></v-checkbox>
        <v-checkbox style="margin:0%; padding:0" label="Artificial Intelligence" v-model="activities" value="AI"></v-checkbox>
        <v-checkbox style="margin:0%; padding:0" label="Natural Language Processing" v-model="activities" value="NLP"></v-checkbox>
        <v-checkbox style="margin:0%; padding:0" label="Blockchain" v-model="activities" value="Blockchain"></v-checkbox>
        <div class="line" style="margin-top:5%"></div>
        <h4>Please tell us about yourself</h4>
        <p style="margin-bottom:0px; text-align:justify"> For our recommendations, please provide some information about yourself. Please answer truthfully, our matching is not based on certain requirements but on how compatible job searchers are with employees, and without your manager ever knowing any scores.
        </p>
        <p class="caption">(We promise and are legally bind to never share the information with any third party!)
        </p>
        <p>Please distribute 18 points on the following 6 categories according to your own priorities:</p>
        <p>Points left: {{pointsleft}}</p>
        <v-flex xs-2>
          <v-btn @click="minusAdaptability" style="min-width:0">-</v-btn>
        </v-flex>
        <v-flex xs-8>
          <p>Adaptability: {{adaptability}}</p>
        </v-flex>
        <v-flex xs-2>
          <v-btn @click='plusAdaptability' style="min-width:0">+</v-btn>
        </v-flex>

        <v-flex xs-2>
          <v-btn @click='minusDetailorientation' style="min-width:0">-</v-btn>
        </v-flex>
        <v-flex xs-8>
          <p>Detail-Orientation: {{detailorientation}}</p>
        </v-flex>
        <v-flex xs-2>
          <v-btn @click='plusDetailorientation' style="min-width:0">+</v-btn>
        </v-flex>

        <v-flex xs-2>
          <v-btn @click='minusGoalorientation' style="min-width:0">-</v-btn>
        </v-flex>
        <v-flex xs-8>
          <p>Goal-Orientation: {{goalorientation}}</p>
        </v-flex>
        <v-flex xs-2>
          <v-btn @click='plusGoalorientation' style="min-width:0">+</v-btn>
        </v-flex>

        <v-flex xs-2>
          <v-btn @click='minusCustomerorientation' style="min-width:0">-</v-btn>
        </v-flex>
        <v-flex xs-8>
          <p>Customer-Orientation: {{customerorientation}}</p>
        </v-flex>
        <v-flex xs-2>
          <v-btn @click='plusCustomerorientation' style="min-width:0">+</v-btn>
        </v-flex>

        <v-flex xs-2>
          <v-btn @click='minusPrincipled' style="min-width:0">-</v-btn>
        </v-flex>
        <v-flex xs-8>
          <p>Principled: {{principled}}</p>
        </v-flex>
        <v-flex xs-2>
          <v-btn @click='plusPrincipled' style="min-width:0">+</v-btn>
        </v-flex>

        <v-flex xs-2>
          <v-btn @click='minusCollaboration' style="min-width:0">-</v-btn>
        </v-flex>
        <v-flex xs-8>
          <p>Collaboration: {{collaboration}}</p>
        </v-flex>
        <v-flex xs-2>
          <v-btn @click='plusCollaboration' style="min-width:0">+</v-btn>
        </v-flex>


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
      findevents: false,
      findcoach: false,
      experience: 1,
      selection1: null,
      selection2: null,
      pointsleft: 18,
      adaptability: 0,
      goalorientation: 0,
      detailorientation: 0,
      customerorientation: 0,
      principled: 0,
      collaboration: 0,
      disciplineitems: ['Healthcare', 'Art', 'Music', 'Food', 'Engineering', 'Transportation'],
      activities:[]
    }
  },
  created () {
    window.scrollTo(0, 0)
    firestore.collection('Users').where('ID', '==', firebase.auth().currentUser.uid).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.searchjob = doc.data().searchjob
        this.helphiring = doc.data().helphiring
        this.givefeedback = doc.data().givefeedback
        this.findevents = doc.data().findevents
        this.findcoach = doc.data().findcoach
      })
    })
  },
  methods:
  {
    plusCollaboration () {
      if (this.pointsleft > 0, this.collaboration < 6){
        this.pointsleft-=1
        this.collaboration+=1
      }
    },

    minusCollaboration () {
      if (this.collaboration > 0){
        this.pointsleft+=1
        this.collaboration-=1
      }
    },

    plusDetailorientation () {
      if (this.detailorientation > 0, this.detailorientation < 6){
        this.pointsleft-=1
        this.detailorientation+=1
      }
    },

    minusDetailorientation () {
      if (this.detailorientation > 0){
        this.detailorientation+=1
        this.detailorientation-=1
      }
    },

    plusCustomerorientation () {
      if (this.customerorientation > 0, this.customerorientation < 6){
        this.pointsleft-=1
        this.customerorientation+=1
      }
    },

    minusCustomerorientation () {
      if (this.customerorientation > 0){
        this.pointsleft+=1
        this.customerorientation-=1
      }
    },

    plusPrincipled () {
      if (this.principled > 0, this.principled < 6){
        this.pointsleft-=1
        this.principled+=1
      }
    },

    minusPrincipled () {
      if (this.principled > 0){
        this.pointsleft+=1
        this.principled-=1
      }
    },

    plusAdaptability () {
      if (this.adaptability > 0, this.adaptability < 6){
        this.pointsleft-=1
        this.adaptability+=1
      }
    },

    minusAdaptability () {
      if (this.adaptability > 0){
        this.pointsleft+=1
        this.adaptability-=1
      }
    },

    plusGoalorientation () {
      if (this.goalorientation > 0, this.goalorientation < 6){
        this.pointsleft-=1
        this.goalorientation+=1
      }
    },

    minusGoalorientation () {
      if (this.goalorientation > 0){
        this.pointsleft+=1
        this.goalorientation-=1
      }
    },
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
