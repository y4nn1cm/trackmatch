<template>
  <v-app>
      <p class="body-2" style="text-align:center; color:#42b983">On this page we will ask you for some information. Based on your answers we are able to help reaching the goals you told us about.</p>
      <h4 style="margin-bottom:0">Which company do you work at?</h4>
      <v-text-field
        name="company"
        label="Type in the company"
        id="company"
        type="company"
        v-model="company"
        style="margin-top:0; border:0; font-size:10%">
      </v-text-field>
    
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
        <p class="title">Strenghts</p>
        <p>Please distribute 18 points on the following 6 categories according to your own priorities:</p>
        <p>Points left: {{pointsleft}}</p>
        <v-layout row wrap align-baseline> 
        <v-flex xs2>
          <v-btn @click="minusAdaptability" style="min-width:0">-</v-btn>
        </v-flex>
        <v-flex xs8>
          <p class=strengths>Adaptability: {{adaptability}}</p>
        </v-flex>
        <v-flex xs2>
          <v-btn @click='plusAdaptability' style="min-width:0">+</v-btn>
        </v-flex>

        <v-flex xs2>
          <v-btn @click='minusDetailorientation' style="min-width:0">-</v-btn>
        </v-flex>
        <v-flex xs8>
          <p class=strengths>Detail-Orientation: {{detailorientation}}</p>
        </v-flex>
        <v-flex xs2>
          <v-btn @click='plusDetailorientation' style="min-width:0">+</v-btn>
        </v-flex>

        <v-flex xs2>
          <v-btn @click='minusGoalorientation' style="min-width:0">-</v-btn>
        </v-flex>
        <v-flex xs8>
          <p class=strengths>Goal-Orientation: {{goalorientation}}</p>
        </v-flex>
        <v-flex xs2>
          <v-btn @click='plusGoalorientation' style="min-width:0">+</v-btn>
        </v-flex>

        <v-flex xs2>
          <v-btn @click='minusCustomerorientation' style="min-width:0">-</v-btn>
        </v-flex>
        <v-flex xs8>
          <p class=strengths>Customer-Orientation: {{customerorientation}}</p>
        </v-flex>
        <v-flex xs2>
          <v-btn @click='plusCustomerorientation' style="min-width:0">+</v-btn>
        </v-flex>

        <v-flex xs2>
          <v-btn @click='minusPrincipled' style="min-width:0">-</v-btn>
        </v-flex>
        <v-flex xs8>
          <p class=strengths>Principled: {{principled}}</p>
        </v-flex>
        <v-flex xs2>
          <v-btn @click='plusPrincipled' style="min-width:0">+</v-btn>
        </v-flex>

        <v-flex xs2>
          <v-btn @click='minusCollaboration' style="min-width:0">-</v-btn>
        </v-flex>
        <v-flex xs8>
          <p class=strengths>Collaboration: {{collaboration}}</p>
        </v-flex>
        <v-flex xs2>
          <v-btn @click='plusCollaboration' style="min-width:0">+</v-btn>
        </v-flex>
      </v-layout>
      <div class="line" style="margin-top:5%"></div>
      <p class="title">Your ideal work environment</p>  
      <p style="text-align:justify">Please outline your personal preferences when it comes to your job and workplace environment. You can do so by using the following seven categories and the free text possibility.</p>
      <v-layout row wrap align-center v-if="feedback===false">
        <v-flex xs3>
          <p style="text-align:right">Strong Leadership</p>
        </v-flex>
        <v-flex xs1><v-radio value="1" v-model="leadership"></v-radio></v-flex>
        <v-flex xs1><v-radio value="2" v-model="leadership"></v-radio></v-flex>
        <v-flex xs1><v-radio value="3" v-model="leadership"></v-radio></v-flex>
        <v-flex xs1><v-radio value="4" v-model="leadership"></v-radio></v-flex>
        <v-flex xs1><v-radio value="5" v-model="leadership"></v-radio></v-flex>
        <v-flex xs1><v-radio value="6" v-model="leadership"></v-radio></v-flex>      
        <v-flex xs3>
          <p>Loose Leadership</p>
        </v-flex>

        <v-flex xs3>
          <p style="text-align:right">Monetary Benefits</p>
        </v-flex>
        <v-flex xs1><v-radio value="1" v-model="moneysatisfaction"></v-radio></v-flex>
        <v-flex xs1><v-radio value="2" v-model="moneysatisfaction"></v-radio></v-flex>
        <v-flex xs1><v-radio value="3" v-model="moneysatisfaction"></v-radio></v-flex>
        <v-flex xs1><v-radio value="4" v-model="moneysatisfaction"></v-radio></v-flex>
        <v-flex xs1><v-radio value="5" v-model="moneysatisfaction"></v-radio></v-flex>
        <v-flex xs1><v-radio value="6" v-model="moneysatisfaction"></v-radio></v-flex>      
        <v-flex xs3>
          <p>Job Satisfaction</p>
        </v-flex>

        <v-flex xs3>
          <p style="text-align:right">Freedom</p>
        </v-flex>
        <v-flex xs1><v-radio value="1" v-model="freedom"></v-radio></v-flex>
        <v-flex xs1><v-radio value="2" v-model="freedom"></v-radio></v-flex>
        <v-flex xs1><v-radio value="3" v-model="freedom"></v-radio></v-flex>
        <v-flex xs1><v-radio value="4" v-model="freedom"></v-radio></v-flex>
        <v-flex xs1><v-radio value="5" v-model="freedom"></v-radio></v-flex>
        <v-flex xs1><v-radio value="6" v-model="freedom"></v-radio></v-flex>      
        <v-flex xs3>
          <p>Guidelines</p>
        </v-flex>

        <v-flex xs3>
          <p style="text-align:right">Relaxed Athmosphere</p>
        </v-flex>
        <v-flex xs1><v-radio value="1" v-model="athmosphere"></v-radio></v-flex>
        <v-flex xs1><v-radio value="2" v-model="athmosphere"></v-radio></v-flex>
        <v-flex xs1><v-radio value="3" v-model="athmosphere"></v-radio></v-flex>
        <v-flex xs1><v-radio value="4" v-model="athmosphere"></v-radio></v-flex>
        <v-flex xs1><v-radio value="5" v-model="athmosphere"></v-radio></v-flex>
        <v-flex xs1><v-radio value="6" v-model="athmosphere"></v-radio></v-flex>      
        <v-flex xs3>
          <p>Professional Athmosphere</p>
        </v-flex>
        
        <v-flex xs3>
          <p style="text-align:right">Sole Work</p>
        </v-flex>
        <v-flex xs1><v-radio value="1" v-model="teamwork"></v-radio></v-flex>
        <v-flex xs1><v-radio value="2" v-model="teamwork"></v-radio></v-flex>
        <v-flex xs1><v-radio value="3" v-model="teamwork"></v-radio></v-flex>
        <v-flex xs1><v-radio value="4" v-model="teamwork"></v-radio></v-flex>
        <v-flex xs1><v-radio value="5" v-model="teamwork"></v-radio></v-flex>
        <v-flex xs1><v-radio value="6" v-model="teamwork"></v-radio></v-flex>      
        <v-flex xs3>
          <p>Team Work</p>
        </v-flex>

        <v-flex xs3>
          <p style="text-align:right">Fluid Roles</p>
        </v-flex>
        <v-flex xs1><v-radio value="1" v-model="roles"></v-radio></v-flex>
        <v-flex xs1><v-radio value="2" v-model="roles"></v-radio></v-flex>
        <v-flex xs1><v-radio value="3" v-model="roles"></v-radio></v-flex>
        <v-flex xs1><v-radio value="4" v-model="roles"></v-radio></v-flex>
        <v-flex xs1><v-radio value="5" v-model="roles"></v-radio></v-flex>
        <v-flex xs1><v-radio value="6" v-model="roles"></v-radio></v-flex>      
        <v-flex xs3>
          <p>Fixed Roles</p>
        </v-flex>
        
        <v-flex xs3>
          <p style="text-align:right">Processes</p>
        </v-flex>
        <v-flex xs1><v-radio value="1" v-model="pragmatism"></v-radio></v-flex>
        <v-flex xs1><v-radio value="2" v-model="pragmatism"></v-radio></v-flex>
        <v-flex xs1><v-radio value="3" v-model="pragmatism"></v-radio></v-flex>
        <v-flex xs1><v-radio value="4" v-model="pragmatism"></v-radio></v-flex>
        <v-flex xs1><v-radio value="5" v-model="pragmatism"></v-radio></v-flex>
        <v-flex xs1><v-radio value="6" v-model="pragmatism"></v-radio></v-flex>      
        <v-flex xs3>
          <p>Pragmatism</p>
        </v-flex>
      </v-layout>
      <v-btn style="margin-bottom:6vw; min-width:0" @click='feedback=!feedback' v-bind:class="{primary: feedback}"> Feedback Mode</v-btn>
      
      <v-layout row wrap align-center v-if="feedback===true">
        <v-flex xs12>
          <p class=body-2>Please outline how you actually see your work environment in comparison to your selected ideal state.</p>
        </v-flex>
        <v-flex xs12 align-top>
          <p style="margin:0">Leadership - your ideal state: {{this.leadership}} from left</p>
        </v-flex>
        <v-flex xs3>
          <p style="text-align:right">Strong Leadership</p>
        </v-flex>
        <v-flex xs1><v-radio value="1" v-model="feedbackleadership"></v-radio></v-flex>
        <v-flex xs1><v-radio value="2" v-model="feedbackleadership"></v-radio></v-flex>
        <v-flex xs1><v-radio value="3" v-model="feedbackleadership"></v-radio></v-flex>
        <v-flex xs1><v-radio value="4" v-model="feedbackleadership"></v-radio></v-flex>
        <v-flex xs1><v-radio value="5" v-model="feedbackleadership"></v-radio></v-flex>
        <v-flex xs1><v-radio value="6" v-model="feedbackleadership"></v-radio></v-flex>      
        <v-flex xs3>
          <p>Loose Leadership</p>
        </v-flex>
        <v-flex xs12 align-top>
          <p style="margin:0">Monetary Benefits - your ideal state: {{this.moneysatisfaction}} from left</p>
        </v-flex>

        <v-flex xs3>
          <p style="text-align:right">Monetary Benefits</p>
        </v-flex>
        <v-flex xs1><v-radio value="1" v-model="feedbackmoneysatisfaction"></v-radio></v-flex>
        <v-flex xs1><v-radio value="2" v-model="feedbackmoneysatisfaction"></v-radio></v-flex>
        <v-flex xs1><v-radio value="3" v-model="feedbackmoneysatisfaction"></v-radio></v-flex>
        <v-flex xs1><v-radio value="4" v-model="feedbackmoneysatisfaction"></v-radio></v-flex>
        <v-flex xs1><v-radio value="5" v-model="feedbackmoneysatisfaction"></v-radio></v-flex>
        <v-flex xs1><v-radio value="6" v-model="feedbackmoneysatisfaction"></v-radio></v-flex>      
        <v-flex xs3>
          <p>Job Satisfaction</p>
        </v-flex>
        <v-flex xs12 align-top>
          <p style="margin:0">Freedom - your ideal state: {{this.moneysatisfaction}} from left</p>
        </v-flex>
        <v-flex xs3>
          <p style="text-align:right">Freedom</p>
        </v-flex>
        <v-flex xs1><v-radio value="1" v-model="feedbackfreedom"></v-radio></v-flex>
        <v-flex xs1><v-radio value="2" v-model="feedbackfreedom"></v-radio></v-flex>
        <v-flex xs1><v-radio value="3" v-model="feedbackfreedom"></v-radio></v-flex>
        <v-flex xs1><v-radio value="4" v-model="feedbackfreedom"></v-radio></v-flex>
        <v-flex xs1><v-radio value="5" v-model="feedbackfreedom"></v-radio></v-flex>
        <v-flex xs1><v-radio value="6" v-model="feedbackfreedom"></v-radio></v-flex>      
        <v-flex xs3>
          <p>Guidelines</p>
        </v-flex>
        <v-flex xs12 align-top>
          <p style="margin:0">Athmosphere - your ideal state: {{this.moneysatisfaction}} from left</p>
        </v-flex>
        <v-flex xs3>
          <p style="text-align:right">Relaxed Athmosphere</p>
        </v-flex>
        <v-flex xs1><v-radio value="1" v-model="feedbackathmosphere"></v-radio></v-flex>
        <v-flex xs1><v-radio value="2" v-model="feedbackathmosphere"></v-radio></v-flex>
        <v-flex xs1><v-radio value="3" v-model="feedbackathmosphere"></v-radio></v-flex>
        <v-flex xs1><v-radio value="4" v-model="feedbackathmosphere"></v-radio></v-flex>
        <v-flex xs1><v-radio value="5" v-model="feedbackathmosphere"></v-radio></v-flex>
        <v-flex xs1><v-radio value="6" v-model="feedbackathmosphere"></v-radio></v-flex>      
        <v-flex xs3>
          <p>Professional Athmosphere</p>
        </v-flex>
        
        <v-flex xs12 align-top>
          <p style="margin:0">Work style - your ideal state: {{this.moneysatisfaction}} from left</p>
        </v-flex>
        <v-flex xs3>
          <p style="text-align:right">Sole Work</p>
        </v-flex>
        <v-flex xs1><v-radio value="1" v-model="feedbackteamwork"></v-radio></v-flex>
        <v-flex xs1><v-radio value="2" v-model="feedbackteamwork"></v-radio></v-flex>
        <v-flex xs1><v-radio value="3" v-model="feedbackteamwork"></v-radio></v-flex>
        <v-flex xs1><v-radio value="4" v-model="feedbackteamwork"></v-radio></v-flex>
        <v-flex xs1><v-radio value="5" v-model="feedbackteamwork"></v-radio></v-flex>
        <v-flex xs1><v-radio value="6" v-model="feedbackteamwork"></v-radio></v-flex>      
        <v-flex xs3>
          <p>Team Work</p>
        </v-flex>
        <v-flex xs12 align-top>
          <p style="margin:0">Roles - your ideal state: {{this.moneysatisfaction}} from left</p>
        </v-flex>
        <v-flex xs3>
          <p style="text-align:right">Fluid Roles</p>
        </v-flex>
        <v-flex xs1><v-radio value="1" v-model="feedbackroles"></v-radio></v-flex>
        <v-flex xs1><v-radio value="2" v-model="feedbackroles"></v-radio></v-flex>
        <v-flex xs1><v-radio value="3" v-model="feedbackroles"></v-radio></v-flex>
        <v-flex xs1><v-radio value="4" v-model="feedbackroles"></v-radio></v-flex>
        <v-flex xs1><v-radio value="5" v-model="feedbackroles"></v-radio></v-flex>
        <v-flex xs1><v-radio value="6" v-model="feedbackroles"></v-radio></v-flex>      
        <v-flex xs3>
          <p>Fixed Roles</p>
        </v-flex>
        <v-flex xs12 align-top>
          <p style="margin:0">Processes - your ideal state: {{this.moneysatisfaction}} from left</p>
        </v-flex>
        <v-flex xs3>
          <p style="text-align:right">Processes</p>
        </v-flex>
        <v-flex xs1><v-radio value="1" v-model="feedbackpragmatism"></v-radio></v-flex>
        <v-flex xs1><v-radio value="2" v-model="feedbackpragmatism"></v-radio></v-flex>
        <v-flex xs1><v-radio value="3" v-model="feedbackpragmatism"></v-radio></v-flex>
        <v-flex xs1><v-radio value="4" v-model="feedbackpragmatism"></v-radio></v-flex>
        <v-flex xs1><v-radio value="5" v-model="feedbackpragmatism"></v-radio></v-flex>
        <v-flex xs1><v-radio value="6" v-model="feedbackpragmatism"></v-radio></v-flex>      
        <v-flex xs3>
          <p>Pragmatism</p>
        </v-flex>
        <v-flex xs12>
          <p class=body-2>Please outline how you actually see your work environment in comparison to your selected ideal state. (scroll up)</p>
        </v-flex>
      </v-layout>

      <p style="text-align:justify; margin-top:5vw">Please provide up to three additional preferences that are important for you in the workplace. This will help to make your workplace better and also supports us to further improve our product.</p>
      <v-layout>
        <v-flex xs4>
            <v-text-field
              name="factor1"
              label="Factor 1"
              id="factor1"
              v-model="factor1">
            </v-text-field>
            </v-flex>
            <v-flex xs4>
            <v-text-field
              name="factor2"
              label="Factor 2"
              id="factor1"
              v-model="factor1">
            </v-text-field>
            </v-flex>
            <v-flex xs4>
            <v-text-field
              name="factor3"
              label="Factor 3"
              id="factor1"
              v-model="factor1">
            </v-text-field>
          </v-flex>
      </v-layout>
      <div class=text-xs-center>
      <v-btn primary type="submit">Reach my goals</v-btn>
      </div>
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
      feedback: false,
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
      leadership: null,
      athmosphere: null,
      roles: null,
      moneysatisfaction: null,
      freedom: null,
      teamwork: null,
      pragmatism: null,
      feedbackleadership: null,
      feedbackathmosphere: null,
      feedbackroles: null,
      feedbackmoneysatisfaction: null,
      feedbackfreedom: null,
      feedbackteamwork: null,
      feedbackpragmatism: null,
      factor1: null,
      factor2: null,
      factor3: null,
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

.selected{
  border-color:red;
}

.strengths {
  padding-left:20%;
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
