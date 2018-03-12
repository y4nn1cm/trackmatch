<template>
  <v-app>
    <div class="center">
      <img :src="profilepicture" class="profile-picture">
      <a @click="editpicture=true" v-if="editpicture === false">
        <p style='text-align:center; font-size:2.5vw'>press to edit profile picture</p>
      </a>
      <div v-if="editpicture === true">
        <a @click="editpicture=false">
          <p style='text-align:center; margin-bottom:0px; font-size:2.5vw;'>press to close</p>
        </a>
  
        <form @submit.prevent="pictureUpload">
          <v-text-field name="imageurl" label="PASTE LINK TO IMAGE HERE" id="imageurl" type="imageurl" v-model="imageurl" style="margin-bottom:0; padding-bottom:0">
          </v-text-field>
          <v-btn primary class="button" type="submit" style="margin-top:0; margin-bottom:5vw; padding-top:0">submit</v-btn>
        </form>
      </div>
    </div>
    <form @submit.prevent="transferData">
      <p v-if="helphiring" class="body-2" style="text-align:jutify; color:rgb(21,149,135)">On this page we will ask you for some information. With your answers you help job seekers to better understand your company.</p>
      <p v-if="searchjob" class="body-2" style="text-align:jutify; color:rgb(21,149,135)">On this page we will ask you for some information. With your answers you help companies to better understand yourself.</p>
      <v-switch style="padding:0; margin-top:5vw" :label="`I am open for a new Job`" v-model="searchjob"></v-switch>
      <v-switch style="padding:0; margin-bottom:2vw" :label="`Our company is hiring`" v-model="helphiring"></v-switch>
      <v-text-field name="linkedin" label="LINK to linkedIn or Xing profile" id="linkedin" type="linkedin" v-model="linkedin" style="margin-top:0; border:0" required>
      </v-text-field>
      <v-text-field v-if="searchjob" name="company" label="Current employer (block visibility)" id="company" type="company" v-model="company" style="margin-top:0; border:0">
      </v-text-field>
      <v-text-field v-else required name="company" label="Current employer" id="company" type="company" v-model="company" style="margin-top:0; border:0">
      </v-text-field>
      <v-text-field v-if="helphiring" name="worklove" label="Why should I join your company?" id="worklove" type="worklove" v-model="worklove" style="margin-top:0; border:0">
      </v-text-field>
      <v-text-field v-if="searchjob" name="whyme" label="Why should I hire you?" id="whyme" type="whyme" v-model="whyme" style="margin-top:0; border:0">
      </v-text-field>
      <v-text-field name="goal" label="Your summary (motivation, goals)" id="goal" type="goal" v-model="goal" style="margin-top:0; border:0">
      </v-text-field>
      <v-text-field name="mail" label="Change contact mail" id="mail" type="mail" v-model="email" style="margin-top:0; border:0">
      </v-text-field>
      <v-text-field name="phone" label="Your contact number" id="phone" type="phone" v-model="phone" style="margin-top:0; border:0">
      </v-text-field>
      <h4>Your areas of expertise?</h4>
      <v-select id=discipline1 label="Discipline or Industry" :items="disciplineitems1" v-model="background1" segmented class="input-group--focused" required>
      </v-select>
      <v-select id=discipline2 label="Optional second" :items="disciplineitems2" v-model="background2" class="input-group--focused" segmented>
      </v-select>
      <div v-if="this.searchjob">
      <h4>Your work experience</h4>
      <v-text-field name="experience" label="Experience in years (number only)" id="experience" type="experience" v-model="experience" required style="margin-top:0; border:0; font-size:10%">
      </v-text-field>
      <div class="line" style="margin-top:5%"></div>
      <h4>Which job roles do you do?</h4>
      <p class="body-2">Business and Product</p>
      <v-checkbox style="margin:0%; padding:0" label="Product Mgmt and Concept" v-model="product" value=true></v-checkbox>
      <v-checkbox style="margin:0%; padding:0" label="Design and User Experience" v-model="design" value=true></v-checkbox>
      <v-checkbox style="margin:0%; padding:0" label="Operations / Finance" v-model="operations" value=true></v-checkbox>
      <v-checkbox style="margin:0%; padding:0" label="Business Dev / Marketing" v-model="business" value=true></v-checkbox>
      <p class="body-2">Technology</p>
      <v-checkbox style="margin:0%; padding:0" label="Software / Web Development" v-model="software" value=true></v-checkbox>
      <v-checkbox style="margin:0%; padding:0" label="Virtual / Augmented Reality" v-model="vrar" value=true></v-checkbox>
      <v-checkbox style="margin:0%; padding:0" label="Artificial Intelligence" v-model="ai" value=true></v-checkbox>
      <v-checkbox style="margin:0%; padding:0" label="Blockchain" v-model="blockchain" value=true></v-checkbox>
      <!--
      <div class="line" style="margin-top:5%"></div>
      <h4>About yourself</h4>
      <p style="margin-bottom:4vw; text-align:justify"> Please provide some information about yourself. Our matching is not based on fixed requirements but on how compatible candidates are with employees.
      </p>
      <p class="title">Strenghts</p>
      <p>Please distribute 18 points on the following 6 strengths according to your own priorities: <span style="font-weight:500">required!</span></p>
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
          <p class=strengths>Detail orientation: {{detailorientation}}</p>
        </v-flex>
        <v-flex xs2>
          <v-btn @click='plusDetailorientation' style="min-width:0">+</v-btn>
        </v-flex>
        <v-flex xs2>
          <v-btn @click='minusGoalorientation' style="min-width:0">-</v-btn>
        </v-flex>
        <v-flex xs8>
          <p class=strengths>Goal orientation: {{goalorientation}}</p>
        </v-flex>
        <v-flex xs2>
          <v-btn @click='plusGoalorientation' style="min-width:0">+</v-btn>
        </v-flex>
        <v-flex xs2>
          <v-btn @click='minusCustomerorientation' style="min-width:0">-</v-btn>
        </v-flex>
        <v-flex xs8>
          <p class=strengths>Customer centricity: {{customerorientation}}</p>
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
      <p style="text-align:justify">Please outline your personal preferences when it comes to your workplace:</p>
      <v-layout row wrap align-center v-if="feedback===false">
        <v-flex xs12>
          <p class="body-2" style="text-align:center; margin-bottom:0">I want Leadership to be:</p>
        </v-flex>
        <v-flex xs3>
          <p style="text-align:right; margin-right:15%">Strong</p>
        </v-flex>
        <v-flex xs1>
          <v-radio value="1" v-model="leadership"></v-radio>
        </v-flex>
        <v-flex xs1>
          <v-radio value="2" v-model="leadership"></v-radio>
        </v-flex>
        <v-flex xs1>
          <v-radio value="3" v-model="leadership"></v-radio>
        </v-flex>
        <v-flex xs1>
          <v-radio value="4" v-model="leadership"></v-radio>
        </v-flex>
        <v-flex xs1>
          <v-radio value="5" v-model="leadership"></v-radio>
        </v-flex>
        <v-flex xs1>
          <v-radio value="6" v-model="leadership"></v-radio>
        </v-flex>
        <v-flex xs3>
          <p style="margin-left:10px">Loose</p>
        </v-flex>
        <v-flex xs12>
          <p class="body-2" style="text-align:center; margin-bottom:0">I gain Job Satisfaction from:</p>
        </v-flex>
        <v-flex xs3>
          <p style="text-align:right; margin-right:15%">Salary</p>
        </v-flex>
        <v-flex xs1>
          <v-radio value="1" v-model="moneysatisfaction"></v-radio>
        </v-flex>
        <v-flex xs1>
          <v-radio value="2" v-model="moneysatisfaction"></v-radio>
        </v-flex>
        <v-flex xs1>
          <v-radio value="3" v-model="moneysatisfaction"></v-radio>
        </v-flex>
        <v-flex xs1>
          <v-radio value="4" v-model="moneysatisfaction"></v-radio>
        </v-flex>
        <v-flex xs1>
          <v-radio value="5" v-model="moneysatisfaction"></v-radio>
        </v-flex>
        <v-flex xs1>
          <v-radio value="6" v-model="moneysatisfaction"></v-radio>
        </v-flex>
        <v-flex xs3>
          <p style="margin-left:10px">Impact / Fun</p>
        </v-flex>
        <v-flex xs12>
          <p class="body-2" style="text-align:center; margin-bottom:0">I prefer working with:</p>
        </v-flex>
        <v-flex xs3>
          <p style="text-align:right; margin-right:15%">Freestyle</p>
        </v-flex>
        <v-flex xs1>
          <v-radio value="1" v-model="freedom"></v-radio>
        </v-flex>
        <v-flex xs1>
          <v-radio value="2" v-model="freedom"></v-radio>
        </v-flex>
        <v-flex xs1>
          <v-radio value="3" v-model="freedom"></v-radio>
        </v-flex>
        <v-flex xs1>
          <v-radio value="4" v-model="freedom"></v-radio>
        </v-flex>
        <v-flex xs1>
          <v-radio value="5" v-model="freedom"></v-radio>
        </v-flex>
        <v-flex xs1>
          <v-radio value="6" v-model="freedom"></v-radio>
        </v-flex>
        <v-flex xs3>
          <p style="margin-left:10px">Guidelines</p>
        </v-flex>
        <v-flex xs12>
          <p class="body-2" style="text-align:center; margin-bottom:0">My ideal Athmosphere is:</p>
        </v-flex>
        <v-flex xs3>
          <p style="text-align:right; margin-right:15%">Relaxed</p>
        </v-flex>
        <v-flex xs1>
          <v-radio value="1" v-model="athmosphere"></v-radio>
        </v-flex>
        <v-flex xs1>
          <v-radio value="2" v-model="athmosphere"></v-radio>
        </v-flex>
        <v-flex xs1>
          <v-radio value="3" v-model="athmosphere"></v-radio>
        </v-flex>
        <v-flex xs1>
          <v-radio value="4" v-model="athmosphere"></v-radio>
        </v-flex>
        <v-flex xs1>
          <v-radio value="5" v-model="athmosphere"></v-radio>
        </v-flex>
        <v-flex xs1>
          <v-radio value="6" v-model="athmosphere"></v-radio>
        </v-flex>
        <v-flex xs3>
          <p style="margin-left:10px">Professional</p>
        </v-flex>
        <v-flex xs12>
          <p class="body-2" style="text-align:center; margin-bottom:0">I preferably work:</p>
        </v-flex>
        <v-flex xs3>
          <p style="text-align:right; margin-right:15%">Alone</p>
        </v-flex>
        <v-flex xs1>
          <v-radio value="1" v-model="teamwork"></v-radio>
        </v-flex>
        <v-flex xs1>
          <v-radio value="2" v-model="teamwork"></v-radio>
        </v-flex>
        <v-flex xs1>
          <v-radio value="3" v-model="teamwork"></v-radio>
        </v-flex>
        <v-flex xs1>
          <v-radio value="4" v-model="teamwork"></v-radio>
        </v-flex>
        <v-flex xs1>
          <v-radio value="5" v-model="teamwork"></v-radio>
        </v-flex>
        <v-flex xs1>
          <v-radio value="6" v-model="teamwork"></v-radio>
        </v-flex>
        <v-flex xs3>
          <p style="margin-left:10px">In Teams</p>
        </v-flex>
        <v-flex xs12>
          <p class="body-2" style="text-align:center; margin-bottom:0">I enjoy my Role to be:</p>
        </v-flex>
        <v-flex xs3>
          <p style="text-align:right; margin-right:15%">Fluid</p>
        </v-flex>
        <v-flex xs1>
          <v-radio value="1" v-model="roles"></v-radio>
        </v-flex>
        <v-flex xs1>
          <v-radio value="2" v-model="roles"></v-radio>
        </v-flex>
        <v-flex xs1>
          <v-radio value="3" v-model="roles"></v-radio>
        </v-flex>
        <v-flex xs1>
          <v-radio value="4" v-model="roles"></v-radio>
        </v-flex>
        <v-flex xs1>
          <v-radio value="5" v-model="roles"></v-radio>
        </v-flex>
        <v-flex xs1>
          <v-radio value="6" v-model="roles"></v-radio>
        </v-flex>
        <v-flex xs3>
          <p style="margin-left:10px">Fixed</p>
        </v-flex>
        <v-flex xs12>
          <p class="body-2" style="text-align:center; margin-bottom:0">I approach tasks with:</p>
        </v-flex>
        <v-flex xs3>
          <p style="text-align:right; margin-right:15%">Processes</p>
        </v-flex>
        <v-flex xs1>
          <v-radio value="1" v-model="pragmatism"></v-radio>
        </v-flex>
        <v-flex xs1>
          <v-radio value="2" v-model="pragmatism"></v-radio>
        </v-flex>
        <v-flex xs1>
          <v-radio value="3" v-model="pragmatism"></v-radio>
        </v-flex>
        <v-flex xs1>
          <v-radio value="4" v-model="pragmatism"></v-radio>
        </v-flex>
        <v-flex xs1>
          <v-radio value="5" v-model="pragmatism"></v-radio>
        </v-flex>
        <v-flex xs1>
          <v-radio value="6" v-model="pragmatism"></v-radio>
        </v-flex>
        <v-flex xs3>
          <p style="margin-left:10px">Pragmatism</p>
        </v-flex>
      </v-layout>
      
          <v-btn v-if="givefeedback" style="margin-bottom:6vw; min-width:0" @click='feedback=!feedback' v-bind:class="{primary: feedback}">Give Feedback now</v-btn>
          
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
            <v-flex xs1><v-radio value=1 v-model="feedbackleadership"></v-radio></v-flex>
            <v-flex xs1><v-radio value=2 v-model="feedbackleadership"></v-radio></v-flex>
            <v-flex xs1><v-radio value=3 v-model="feedbackleadership"></v-radio></v-flex>
            <v-flex xs1><v-radio value=4 v-model="feedbackleadership"></v-radio></v-flex>
            <v-flex xs1><v-radio value=5 v-model="feedbackleadership"></v-radio></v-flex>
            <v-flex xs1><v-radio value=6 v-model="feedbackleadership"></v-radio></v-flex>      
            <v-flex xs3>
              <p>Loose Leadership</p>
            </v-flex>
            <v-flex xs12 align-top>
              <p style="margin:0">Monetary Benefits - your ideal state: {{this.moneysatisfaction}} from left</p>
            </v-flex>
            <v-flex xs3>
              <p style="text-align:right">Monetary Benefits</p>
            </v-flex>
            <v-flex xs1><v-radio value=1 v-model="feedbackmoneysatisfaction"></v-radio></v-flex>
            <v-flex xs1><v-radio value=2 v-model="feedbackmoneysatisfaction"></v-radio></v-flex>
            <v-flex xs1><v-radio value=3 v-model="feedbackmoneysatisfaction"></v-radio></v-flex>
            <v-flex xs1><v-radio value=4 v-model="feedbackmoneysatisfaction"></v-radio></v-flex>
            <v-flex xs1><v-radio value=5 v-model="feedbackmoneysatisfaction"></v-radio></v-flex>
            <v-flex xs1><v-radio value=6 v-model="feedbackmoneysatisfaction"></v-radio></v-flex> 
            <v-flex xs3>
              <p>Job Satisfaction</p>
            </v-flex>
            <v-flex xs12 align-top>
              <p style="margin:0">Freedom - your ideal state: {{this.freedom}} from left</p>
            </v-flex>
            <v-flex xs3>
              <p style="text-align:right">Freedom</p>
            </v-flex>
            <v-flex xs1><v-radio value=1 v-model="feedbackfreedom"></v-radio></v-flex>
            <v-flex xs1><v-radio value=2 v-model="feedbackfreedom"></v-radio></v-flex>
            <v-flex xs1><v-radio value=3 v-model="feedbackfreedom"></v-radio></v-flex>
            <v-flex xs1><v-radio value=4 v-model="feedbackfreedom"></v-radio></v-flex>
            <v-flex xs1><v-radio value=5 v-model="feedbackfreedom"></v-radio></v-flex>
            <v-flex xs1><v-radio value=6 v-model="feedbackfreedom"></v-radio></v-flex>      
            <v-flex xs3>
              <p>Guidelines</p>
            </v-flex>
            <v-flex xs12 align-top>
              <p style="margin:0">Athmosphere - your ideal state: {{this.athmosphere}} from left</p>
            </v-flex>
            <v-flex xs3>
              <p style="text-align:right">Relaxed Athmosphere</p>
            </v-flex>
            <v-flex xs1><v-radio value=1 v-model="feedbackathmosphere"></v-radio></v-flex>
            <v-flex xs1><v-radio value=2 v-model="feedbackathmosphere"></v-radio></v-flex>
            <v-flex xs1><v-radio value=3 v-model="feedbackathmosphere"></v-radio></v-flex>
            <v-flex xs1><v-radio value=4 v-model="feedbackathmosphere"></v-radio></v-flex>
            <v-flex xs1><v-radio value=5 v-model="feedbackathmosphere"></v-radio></v-flex>
            <v-flex xs1><v-radio value=6 v-model="feedbackathmosphere"></v-radio></v-flex>      
            <v-flex xs3>
              <p>Professional Athmosphere</p>
            </v-flex>
            
            <v-flex xs12 align-top>
              <p style="margin:0">Work style - your ideal state: {{this.teamwork}} from left</p>
            </v-flex>
            <v-flex xs3>
              <p style="text-align:right">Sole Work</p>
            </v-flex>
            <v-flex xs1><v-radio value=1 v-model="feedbackteamwork"></v-radio></v-flex>
            <v-flex xs1><v-radio value=2 v-model="feedbackteamwork"></v-radio></v-flex>
            <v-flex xs1><v-radio value=3 v-model="feedbackteamwork"></v-radio></v-flex>
            <v-flex xs1><v-radio value=4 v-model="feedbackteamwork"></v-radio></v-flex>
            <v-flex xs1><v-radio value=5 v-model="feedbackteamwork"></v-radio></v-flex>
            <v-flex xs1><v-radio value=6 v-model="feedbackteamwork"></v-radio></v-flex>      
            <v-flex xs3>
              <p>Team Work</p>
            </v-flex>
            <v-flex xs12 align-top>
              <p style="margin:0">Roles - your ideal state: {{this.roles}} from left</p>
            </v-flex>
            <v-flex xs3>
              <p style="text-align:right">Fluid Roles</p>
            </v-flex>
            <v-flex xs1><v-radio value=1 v-model="feedbackroles"></v-radio></v-flex>
            <v-flex xs1><v-radio value=2 v-model="feedbackroles"></v-radio></v-flex>
            <v-flex xs1><v-radio value=3 v-model="feedbackroles"></v-radio></v-flex>
            <v-flex xs1><v-radio value=4 v-model="feedbackroles"></v-radio></v-flex>
            <v-flex xs1><v-radio value=5 v-model="feedbackroles"></v-radio></v-flex>
            <v-flex xs1><v-radio value=6 v-model="feedbackroles"></v-radio></v-flex>      
            <v-flex xs3>
              <p>Fixed Roles</p>
            </v-flex>
            <v-flex xs12 align-top>
              <p style="margin:0">Processes - your ideal state: {{this.pragmatism}} from left</p>
            </v-flex>
            <v-flex xs3>
              <p style="text-align:right">Processes</p>
            </v-flex>
            <v-flex xs1><v-radio value=1 v-model="feedbackpragmatism"></v-radio></v-flex>
            <v-flex xs1><v-radio value=2 v-model="feedbackpragmatism"></v-radio></v-flex>
            <v-flex xs1><v-radio value=3 v-model="feedbackpragmatism"></v-radio></v-flex>
            <v-flex xs1><v-radio value=4 v-model="feedbackpragmatism"></v-radio></v-flex>
            <v-flex xs1><v-radio value=5 v-model="feedbackpragmatism"></v-radio></v-flex>
            <v-flex xs1><v-radio value=6 v-model="feedbackpragmatism"></v-radio></v-flex>      
            <v-flex xs3>
              <p>Pragmatism</p>
            </v-flex>
            <v-flex xs12>
              <p class=body-2>Please outline how you actually see your work environment in comparison to your selected ideal state. (scroll up)</p>
            </v-flex>
          </v-layout>
          
      <p style="text-align:justify; margin-top:5vw">If you want, you can use this free text field to outline other factors that are important for you in your job.</p>
      <v-layout>
        <v-flex xs12>
          <v-text-field name="factor1" label="Additional factors at work" id="factor1" v-model="factor1">
          </v-text-field>
        </v-flex>
      </v-layout>
      -->
      </div>
      <div class=text-xs-center>
        <v-btn v-if="checkReady()" class="teal select" style="color:white" type="submit">save</v-btn>
        <v-btn v-else class="teal select" disabled>save</v-btn>
      </div>
    </form>
  </v-app>
</template>

<script>
  import firebase from "firebase";
  import firestore from "../main";
  export default {
    data() {
      return {
        editpicture: false,
        hide: false,
        //vision: null,
        goal: null,
        whyme: null,
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
        company: "",
        pointsleft: 18,
        experience: null,
        background1: null,
        background2: "",
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
        worklove: null,
        disciplineitems1: [
          "Accounting and Finance",
          "Architecture",
          "Art",
          "Chemistry",
          "Company Building",
          "Consulting",
          "Culture Science",
          "e-commerce",
          "Education",
          "Food",
          "Governmental Institutions",
          "Hardware Technology",
          "Healthcare",
          "History",
          "International Relationships",
          "Languages",
          "Literature",
          "Logistics",
          "Marketing",
          "Math",
          "Media",
          "Medicine",
          "Music",
          "Philosophy",
          "Physics",
          "Politics",
          "Production",
          "Psychology",
          "Recruiting",
          "Sales Tools",
          "Social Media",
          "Social Networks",
          "Social Science",
          "Software Technology",
          "Sports",
          "Tourism",
          "Trade",
          "Transportation",
          "Venture Capital",
          "Writing"
        ],
        disciplineitems2: [
          "",
          "Accounting and Finance",
          "Architecture",
          "Art",
          "Chemistry",
          "Company Building",
          "Consulting",
          "Culture Science",
          "e-commerce",
          "Education",
          "Food",
          "Governmental Institutions",
          "Hardware Technology",
          "Healthcare",
          "History",
          "International Relationships",
          "Languages",
          "Literature",
          "Logistics",
          "Marketing",
          "Math",
          "Media",
          "Medicine",
          "Music",
          "Philosophy",
          "Physics",
          "Politics",
          "Production",
          "Psychology",
          "Recruiting",
          "Sales Tools",
          "Social Media",
          "Social Networks",
          "Social Science",
          "Software Technology",
          "Sports",
          "Tourism",
          "Trade",
          "Transportation",
          "Venture Capital",
          "Writing"
        ]
      };
    },
    created() {
      window.scrollTo(0, 0);
      firestore
        .collection("Users")
        .where("ID", "==", firebase.auth().currentUser.uid)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            if (doc.data().whyme != null) {
              this.whyme = doc.data().whyme;
            }
            if (doc.data().goal != null) {
              this.goal = doc.data().goal;
            }
            if (doc.data().company != null) {
              this.company = doc.data().company;
            }
            if (doc.data().worklove != null) {
              this.worklove = doc.data().worklove;
            }
            if (doc.data().background2 != null) {
              this.background2 = doc.data().background2;
            }
            if (doc.data().linkedin != null) {
              this.linkedin = doc.data().linkedin;
            }
            if (doc.data().phone != null) {
              this.phone = doc.data().phone;
            }
            if (doc.data().factor1 != null) {
              this.factor1 = doc.data().factor1;
            }
            if (doc.data().pointsleft != null) {
              this.pointsleft = doc.data().pointsleft;
            }
            if (doc.data().adaptability != null) {
              this.adaptability = doc.data().adaptability;
            }
            if (doc.data().goalorientation != null) {
              this.goalorientation = doc.data().goalorientation;
            }
            if (doc.data().detailorientation != null) {
              this.detailorientation = doc.data().detailorientation;
            }
            if (doc.data().customerorientation != null) {
              this.customerorientation = doc.data().customerorientation;
            }
            if (doc.data().perseverence != null) {
              this.perseverence = doc.data().perseverence;
            }
            if (doc.data().collaboration != null) {
              this.collaboration = doc.data().collaboration;
            }
            if (doc.data().leadership != null) {
              this.leadership = doc.data().leadership;
            }
            if (doc.data().athmosphere != null) {
              this.athmosphere = doc.data().athmosphere;
            }
            if (doc.data().roles != null) {
              this.roles = doc.data().roles;
            }
            if (doc.data().moneysatisfaction != null) {
              this.moneysatisfaction = doc.data().moneysatisfaction;
            }
            if (doc.data().freedom != null) {
              this.freedom = doc.data().freedom;
            }
            if (doc.data().teamwork != null) {
              this.teamwork = doc.data().teamwork;
            }
            if (doc.data().pragmatism != null) {
              this.pragmatism = doc.data().pragmatism;
            }
            (this.profilepicture = doc.data().profilepicture),
            //this.vision = doc.data().vision,
            (this.email = doc.data().email),
            (this.searchjob = doc.data().searchjob),
            (this.helphiring = doc.data().helphiring),
            (this.givefeedback = doc.data().givefeedback),
            (this.findevents = doc.data().findevents),
            (this.findcoach = doc.data().findcoach),
            (this.experience = doc.data().experience),
            (this.background1 = doc.data().background1),
            (this.product = doc.data().product),
            (this.design = doc.data().design),
            (this.business = doc.data().business),
            (this.operations = doc.data().operations),
            (this.software = doc.data().software),
            (this.ai = doc.data().ai),
            (this.vrar = doc.data().vrar),
            (this.blockchain = doc.data().blockchain),
            (this.firstname = doc.data().firstname),
            (this.lastname = doc.data().lastname);
          });
        });
    },
    methods: {
      checkReady() {
        /*if (
          this.searchjob == false ||
          this.pointsleft == 0 &&
          this.freedom != null &&
          this.pragmatism != null &&
          this.roles != null &&
          this.moneysatisfaction != null &&
          this.leadership != null &&
          this.teamwork != null &&
          this.athmosphere != null
        )*/
          return true;
      },
      pictureUpload() {
        if (this.imageurl.length > 10) {
          this.editpicture = false;
          this.$store.dispatch("pictureUpload", {
            imageurl: this.imageurl
          });
          firestore
            .collection("Users")
            .where("ID", "==", firebase.auth().currentUser.uid)
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                this.profilepicture = doc.data().profilepicture;
              });
            });
        }
      },
      transferData: function(event) {
        if (this.blockchain == null) {
          this.blockchain = false;
        }
        if (this.ai == null) {
          this.ai = false;
        }
        if (this.vrar == null) {
          this.vrar = false;
        }
        if (this.software == null) {
          this.software = false;
        }
        if (this.operations == null) {
          this.operations = false;
        }
        if (this.product == null) {
          this.product = false;
        }
        if (this.business == null) {
          this.business = false;
        }
        if (this.design == null) {
          this.design = false;
        }
        this.company = this.company.toUpperCase().trim();
        this.$store.dispatch("editDetails", {
          goal: this.goal,
          whyme: this.whyme,
          helphiring: this.helphiring,
          searchjob: this.searchjob,
          worklove: this.worklove,
          product: this.product,
          design: this.design,
          business: this.business,
          operations: this.operations,
          software: this.software,
          ai: this.ai,
          vrar: this.vrar,
          blockchain: this.blockchain,
          experience: this.experience,
          background1: this.background1,
          background2: this.background2,
          adaptability: this.adaptability,
          goalorientation: this.goalorientation,
          detailorientation: this.detailorientation,
          customerorientation: this.customerorientation,
          perseverence: this.perseverence,
          collaboration: this.collaboration,
          leadership: this.leadership,
          athmosphere: this.athmosphere,
          roles: this.roles,
          moneysatisfaction: this.moneysatisfaction,
          freedom: this.freedom,
          teamwork: this.teamwork,
          pragmatism: this.pragmatism,
          feedbackleadership: this.feedbackleadership,
          feedbackathmosphere: this.feedbackathmosphere,
          feedbackroles: this.feedbackroles,
          feedbackmoneysatisfaction: this.feedbackmoneysatisfaction,
          feedbackfreedom: this.feedbackfreedom,
          feedbackteamwork: this.feedbackteamwork,
          feedbackpragmatism: this.feedbackpragmatism,
          factor1: this.factor1,
          pointsleft: this.pointsleft,
          company: this.company,
          phone: this.phone,
          email: this.email,
          linkedin: this.linkedin
        });
        if (this.company.length > 1) {
          this.$store.dispatch("createCompany", {
            company: this.company
          });
        }
        this.$store.dispatch("openSite", {
          target: "/home"
        });
      },
  
      plusCollaboration() {
        if (this.pointsleft > 0 && this.collaboration < 6) {
          this.pointsleft -= 1;
          this.collaboration += 1;
        }
      },
  
      minusCollaboration() {
        if (this.collaboration > 0) {
          this.pointsleft += 1;
          this.collaboration -= 1;
        }
      },
  
      plusDetailorientation() {
        if (this.pointsleft > 0 && this.detailorientation < 6) {
          this.pointsleft -= 1;
          this.detailorientation += 1;
        }
      },
  
      minusDetailorientation() {
        if (this.detailorientation > 0) {
          this.pointsleft += 1;
          this.detailorientation -= 1;
        }
      },
  
      plusCustomerorientation() {
        if (this.pointsleft > 0 && this.customerorientation < 6) {
          this.pointsleft -= 1;
          this.customerorientation += 1;
        }
      },
  
      minusCustomerorientation() {
        if (this.customerorientation > 0) {
          this.pointsleft += 1;
          this.customerorientation -= 1;
        }
      },
  
      plusperseverence() {
        if (this.pointsleft > 0 && this.perseverence < 6) {
          this.pointsleft -= 1;
          this.perseverence += 1;
        }
      },
  
      minusperseverence() {
        if (this.perseverence > 0) {
          this.pointsleft += 1;
          this.perseverence -= 1;
        }
      },
  
      plusAdaptability() {
        if (this.pointsleft > 0 && this.adaptability < 6) {
          this.pointsleft -= 1;
          this.adaptability += 1;
        }
      },
  
      minusAdaptability() {
        if (this.adaptability > 0) {
          this.pointsleft += 1;
          this.adaptability -= 1;
        }
      },
  
      plusGoalorientation() {
        if (this.pointsleft > 0 && this.goalorientation < 6) {
          this.pointsleft -= 1;
          this.goalorientation += 1;
        }
      },
  
      minusGoalorientation() {
        if (this.goalorientation > 0) {
          this.pointsleft += 1;
          this.goalorientation -= 1;
        }
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
@import url('https://fonts.googleapis.com/css?family=Merriweather');

.profile-picture {
  width: 30vw;
  height: 30vw;
  border-radius: 50%;
  object-fit: cover;
  margin: 6vw;
}

.selected {
  border-color: red;
}

.strengths {
  padding-left: 20%;
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
  height: 100%;
  font-size: 2.5vw;
}

.select {
  font-size:4vw;
  margin-top: 2vw;
  margin-bottom: 2vw;
  width: 65vw;
  padding: 0;
  height: 10vw;
  text-align: center;
  color: white;
}

.line {
  position: relative;
  width: 100%;
  margin-top: 5%;
  margin-bottom: 5%;
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
