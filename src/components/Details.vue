<template>
  <v-app>
    <div class="center">  
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
        </div>
      <p class="body-2" style="text-align:center; color:#42b983">On this page we will ask you for some information. Based on your answers we are able to help reaching the goals you told us about.</p>
      <v-text-field
        name="vision"
        label="What is your personal vision at work"
        id="vision"
        type="vision"
        v-model="vision"
        style="margin-top:0; border:0; font-size:10%"
        required>
      </v-text-field>
      <div v-if="searchjob">
      <v-text-field
        name="goal"
        label="What do you want to achieve at your next job?"
        id="goal"
        type="goal"
        v-model="goal"
        style="margin-top:0; border:0; font-size:10%"
        required="">
      </v-text-field>
      <v-text-field
        name="company"
        label="Do you work at a company at the moment?"
        id="company"
        type="company"
        v-model="company"
        style="margin-top:0; border:0; font-size:10%"
        required>
      </v-text-field>
      <v-text-field
        name="linkedin"
        label="Please share your linkedIN or Xing profile"
        id="linkedin"
        type="linkedin"
        v-model="linkedin"
        style="margin-top:0; border:0; font-size:10%"
        required>
      </v-text-field>
      </div>
      <div v-else>
      <h4 style="margin-bottom:0">Which company do you work at?</h4>
      <v-text-field
        name="company"
        label="Type in the company"
        id="company"
        type="company"
        v-model="company"
        style="margin-top:0; border:0; font-size:10%"
        required>
      </v-text-field>
      </div>
      <v-text-field
        name="mail"
        label="Please provide your contact mail"
        id="mail"
        type="mail"
        v-model="email"
        style="margin-top:0; border:0; font-size:10%"
        required>
      </v-text-field>
      <v-text-field
        name="phone"
        label="Please provide your contact number"
        id="phone"
        type="phone"
        v-model="phone"
        style="margin-top:0; border:0; font-size:10%">
      </v-text-field>
    
      <h4>Your workexperience</h4>
      <v-text-field
        name="experience"
        label="Experience in years (number only)"
        id="experience"
        type="experience"
        v-model="experience"
        style="margin-top:0; border:0; font-size:10%">
      </v-text-field>
      <h4>What are your areas of expertise?</h4> 
        <v-select id=discipline1
          label="Discipline or Industry"
          :items="disciplineitems"
          v-model="background1"
          class="input-group--focused"
          required>
        </v-select>
        <v-select id=discipline2
          label="Discipline or Industry"
          :items="disciplineitems"
          v-model="background2"
          class="input-group--focused"
          required>
        </v-select>
    <div class="line" style="margin-top:5%"></div>
    <h4>What do you do?</h4>
    <p class="body-2">Business and Product</p>
        <v-checkbox style="margin:0%; padding:0" label="Product Management and Conceptualization" v-model="product" value=true></v-checkbox>
        <v-checkbox style="margin:0%; padding:0" label="Design and User Experience" v-model="design" value=true></v-checkbox>
        <v-checkbox style="margin:0%; padding:0" label="Operations / Finance" v-model="operations" value=true></v-checkbox>
        <v-checkbox style="margin:0%; padding:0" label="Business Development / Marketing" v-model="business" value=true></v-checkbox>
        <p class="body-2">Technology</p>
        <v-checkbox style="margin:0%; padding:0" label="Software / Web Development" v-model="software" value=true></v-checkbox>
        <v-checkbox style="margin:0%; padding:0" label="Virtual / Augmented Reality" v-model="vrar" value=true></v-checkbox>
        <v-checkbox style="margin:0%; padding:0" label="Artificial Intelligence" v-model="ai" value=true></v-checkbox>
        <v-checkbox style="margin:0%; padding:0" label="Blockchain" v-model="blockchain" value=true></v-checkbox>
        <div class="line" style="margin-top:5%"></div>
        <h4>Please tell us about yourself</h4>
        <p style="margin-bottom:0px; text-align:justify"> For our recommendations, please provide some information about yourself. Please answer truthfully, our matching is not based on certain requirements but on how compatible job searchers are with companies, and without your manager ever knowing any scores.
        </p>
        <p class="caption">(We promise and are legally bind to never share the information with any third party!)
        </p>
        <p class="title">Strenghts</p>
        <p>Please distribute 18 points on the following 6 categories according to your own priorities: <span style="font-weight:500">required!</span></p>
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
          <v-btn @click='minusperseverence' style="min-width:0">-</v-btn>
        </v-flex>
        <v-flex xs8>
          <p class=strengths>Perseverence: {{perseverence}}</p>
        </v-flex>
        <v-flex xs2>
          <v-btn @click='plusperseverence' style="min-width:0">+</v-btn>
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
          <p style="margin:0">Freedom - your ideal state: {{this.freedom}} from left</p>
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
          <p style="margin:0">Athmosphere - your ideal state: {{this.athmosphere}} from left</p>
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
          <p style="margin:0">Work style - your ideal state: {{this.teamwork}} from left</p>
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
          <p style="margin:0">Roles - your ideal state: {{this.roles}} from left</p>
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
          <p style="margin:0">Processes - your ideal state: {{this.pragmatism}} from left</p>
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
              v-model="factor2">
            </v-text-field>
            </v-flex>
            <v-flex xs4>
            <v-text-field
              name="factor3"
              label="Factor 3"
              id="factor1"
              v-model="factor3">
            </v-text-field>
          </v-flex>
      </v-layout>
      <div class=text-xs-center>
      <v-btn @click="transferData" primary type="submit">save</v-btn>
      </div>
  </v-app>
</template>

<script>
import firebase from 'firebase'
import firestore from '../main'
export default {

  data () {
    return {
      editpicture: false,
      hide: false,
      vision: null,
      goal: null,
      linkedin: null,
      phone: null,
      email: null,
      imageurl: null,
      profilepicture: null,
      searchjob: null,
      givefeedback: null,
      helphiring: null,
      findevents: null,
      findcoach: null,
      feedback: false,
      company: null,
      pointsleft: 18,
      experience: null,
      background1: null,
      background2: null,
      adaptability: 0,
      goalorientation: 0,
      detailorientation: 0,
      customerorientation: 0,
      perseverence: 0,
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
      product: null,
      design: null,
      business: null,
      operations: null,
      software: null,
      ai: null,
      vrar: null,
      blockchain: null,
      firstname: null,
      lastname: null,
      disciplineitems: ['Consulting','Company Building','Venture Capital','Hardware Technology','Software Technology','e-commerce','Healthcare','Medicine','Sports','Architecture','Food','Media','Transportation','Music','Art','Tourism','Education','Marketing','Recruiting','Social Media','Social Networks','Production','Logistics','Accounting and Finance','Sales Tools','Social Science','Math','Physics','Chemistry','Psychology','International Relationships','Governmental Institutions','Politics','Trade','Languages','Writing','Literature','Culture Science','Philosophy','History'],
    }
  },
  created () {
    window.scrollTo(0, 0)
    firestore.collection('Users').where('ID', '==', firebase.auth().currentUser.uid).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        if (doc.data().pointsleft < 19)
        {
        this.phone = doc.data().phone,
        this.vision = doc.data().vision,
        this.goal = doc.data().goal,
        this.linkedin = doc.data().linkedin,
        this.email = doc.data().email,
        this.profilepicture = doc.data().profilepicture
        this.searchjob = doc.data().searchjob
        this.helphiring = doc.data().helphiring
        this.givefeedback = doc.data().givefeedback
        this.findevents = doc.data().findevents
        this.findcoach = doc.data().findcoach
        this.experience = doc.data().experience
        this.background1 = doc.data().background1
        this.background2 = doc.data().background2
        this.adaptability = doc.data().adaptability
        this.goalorientation = doc.data().goalorientation
        this.detailorientation = doc.data().detailorientation
        this.customerorientation = doc.data().customerorientation
        this.perseverence = doc.data().perseverence
        this.collaboration = doc.data().collaboration
        this.leadership = doc.data().leadership
        this.athmosphere = doc.data().athmosphere
        this.roles = doc.data().roles
        this.moneysatisfaction = doc.data().moneysatisfaction
        this.freedom = doc.data().freedom
        this.teamwork = doc.data().teamwork
        this.pragmatism = doc.data().pragmatism
        this.feedbackleadership = doc.data().feedbackleadership
        this.feedbackathmosphere = doc.data().feedbackathmosphere
        this.feedbackroles = doc.data().feedbackroles
        this.feedbackmoneysatisfaction = doc.data().feedbackmoneysatisfaction
        this.feedbackfreedom = doc.data().feedbackfreedom
        this.feedbackteamwork = doc.data().feedbackteamwork
        this.feedbackpragmatism = doc.data().feedbackpragmatism
        this.factor1 = doc.data().factor1
        this.factor2 = doc.data().factor2
        this.factor3 = doc.data().factor3
        this.pointsleft = doc.data().pointsleft
        this.company = doc.data().company
        this.product = doc.data().product,
        this.design = doc.data().design,
        this.business = doc.data().business,
        this.operations = doc.data().operations,
        this.software = doc.data().software,
        this.ai = doc.data().ai,
        this.vrar = doc.data().vrar,
        this.blockchain = doc.data().blockchain,
        this.firstname = doc.data().firstname,
        this.lastname = doc.data().lastname
        }
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
    transferData: function (event) {
      if (this.blockchain === null){
        this.blockchain = false
      }
      if (this.ai === null){
        this.ai = false
      }
      if (this.vrar === null){
        this.vrar = false
      }
      if (this.software === null){
        this.software = false
      }
      if (this.operations === null){
        this.operations = false
      }
      if (this.product === null){
        this.product = false
      }
      if (this.business === null){
        this.business = false
      }
      if (this.design === null){
        this.design = false
      }
      this.company = this.company.toUpperCase().trim()
      if(pointsleft<1){
      this.$store.dispatch('editDetails', {
      vision: this.vision,
      goal: this.goal,  
      product : this.product,
      design : this.design,
      business : this.business,
      operations :  this.operations,
      software : this.software,
      ai : this.ai,
      vrar : this.vrar,
      blockchain : this.blockchain,
      experience : this.experience,
      background1 : this.background1,
      background2 : this.background2,
      adaptability : this.adaptability,
      goalorientation : this.goalorientation,
      detailorientation : this.detailorientation,
      customerorientation : this.customerorientation,
      perseverence : this.perseverence,
      collaboration : this.collaboration,
      leadership : this.leadership,
      athmosphere : this.athmosphere,
      roles : this.roles,
      moneysatisfaction : this.moneysatisfaction,
      freedom : this.freedom,
      teamwork : this.teamwork,
      pragmatism : this.pragmatism,
      feedbackleadership : this.feedbackleadership,
      feedbackathmosphere : this.feedbackathmosphere,
      feedbackroles : this.feedbackroles,
      feedbackmoneysatisfaction : this.feedbackmoneysatisfaction,
      feedbackfreedom : this.feedbackfreedom,
      feedbackteamwork : this.feedbackteamwork,
      feedbackpragmatism : this.feedbackpragmatism,
      factor1 : this.factor1,
      factor2 : this.factor2,
      factor3 : this.factor3,
      pointsleft : this.pointsleft,
      company : this.company,
      phone: this.phone,
      email: this.email,
      linkedin: this.linkedin
      })
      if (this.company.length > 1){
      this.$store.dispatch('createCompany', {company: this.company})
      }
      if (this.searchjob === true)
      {
      this.$store.dispatch('createCandidate',{
      vision: this.vision,
      goal: this.goal,  
      product : this.product,
      design : this.design,
      business : this.business,
      operations :  this.operations,
      software : this.software,
      ai : this.ai,
      vrar : this.vrar,
      blockchain : this.blockchain,
      experience : this.experience,
      background1 : this.background1,
      background2 : this.background2,
      adaptability : this.adaptability,
      goalorientation : this.goalorientation,
      detailorientation : this.detailorientation,
      customerorientation : this.customerorientation,
      perseverence : this.perseverence,
      collaboration : this.collaboration,
      leadership : this.leadership,
      athmosphere : this.athmosphere,
      roles : this.roles,
      moneysatisfaction : this.moneysatisfaction,
      freedom : this.freedom,
      teamwork : this.teamwork,
      pragmatism : this.pragmatism,
      factor1 : this.factor1,
      factor2 : this.factor2,
      factor3 : this.factor3,
      pointsleft : this.pointsleft,
      company : this.company,
      phone: this.phone,
      email: this.email,
      linkedin: this.linkedin,
      profilepicture: this.profilepicture,
      firstname: this.firstname,
      lastname: this.lastname
      })
      }
      this.$store.dispatch('openSite', {target: '/home'})
      }
    },

    plusCollaboration () {
      if (this.pointsleft > 0 && this.collaboration < 6){
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
      if (this.pointsleft > 0 && this.detailorientation < 6){
        this.pointsleft-=1
        this.detailorientation+=1
      }
    },

    minusDetailorientation () {
      if (this.detailorientation > 0){
        this.pointsleft+=1
        this.detailorientation-=1
      }
    },

    plusCustomerorientation () {
      if (this.pointsleft > 0 && this.customerorientation < 6){
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

    plusperseverence () {
      if (this.pointsleft > 0 && this.perseverence < 6){
        this.pointsleft-=1
        this.perseverence+=1
      }
    },

    minusperseverence () {
      if (this.perseverence > 0){
        this.pointsleft+=1
        this.perseverence-=1
      }
    },

    plusAdaptability () {
      if (this.pointsleft > 0 && this.adaptability < 6){
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
      if (this.pointsleft > 0 && this.goalorientation < 6){
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
