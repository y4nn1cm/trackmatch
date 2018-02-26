<template>
<v-app>
  <p v-if="nocompany">Before creating a position, please fill out your profile and provide which company you are working for.</p>
  <div v-else>
  <h3 style="text-align:center">It's time to find new team members for {{forcompany}}</h3>
  <div class="line" style="margin-top:5%"></div>
  <h4 style="font-weight:500">About {{forcompany}}</h4>
  <form @submit.prevent="createEmployeeSearch">
        <v-text-field 
          name="imageurl"
          label="Paste link to company logo here"
          id="imageurl"
          type="imageurl"
          v-model="logourl"
          style= "margin-bottom:0; padding-bottom:0"
          required>
        </v-text-field>
        <v-text-field
              name="website"
              label="Paste link to company website here"
              id="website"
              type="website"
              v-model="website"
              required>
        </v-text-field>
        <v-text-field
              name="vision"
              label="Company vision in two sentences"
              id="vision"
              type="vision"
              v-model="vision"
              required>
        </v-text-field> 
        <v-select id=discipline1
          label="Company industry / market"
          :items="disciplines1"
          v-model="area1"
          class="input-group--focused"
          required>
        </v-select>
        <v-select id=discipline2
          label="Second industry / market"
          :items="disciplines2"
          v-model="area2"
          class="input-group--focused"
          required>
        </v-select>
        <h4 style="font-weight:500">Job contact</h4>
        <v-text-field
        name="name"
        label="Contact name for applications"
        id="name"
        type="name"
        v-model="name"
        style="margin-top:0; border:0; font-size:10%"
        required>
      </v-text-field>
      <v-text-field
        name="email"
        label="Contact mail for applications"
        id="email"
        type="email"
        v-model="email"
        style="margin-top:0; border:0; font-size:10%"
        required>
      </v-text-field>
      <v-text-field
        name="phone"
        label="Contact number for applications"
        id="phone"
        type="phone"
        v-model="phone"
        style="margin-top:0; border:0; font-size:10%"
        required>
      </v-text-field>
    <h4 style="font-weight:500">Let's describe your Job search</h4>
      <v-text-field
        name="description"
        label="Define a unique and descriptive name"
        id="description"
        type="description"
        v-model="description"
        style="margin-top:0; border:0; font-size:10%"
        required>
      </v-text-field>
      <v-text-field
        name="purpose"
        label="Describe this jobs purpose for the company"
        id="purpose"
        type="purpose"
        v-model="purpose"
        style="margin-top:0; border:0; font-size:10%"
        required>
      </v-text-field>
      <v-text-field
      name="jobad"
      label="Paste link to job ad or carreer page"
      id="jobas"
      type="jobad"
      v-model="jobad">
    </v-text-field>
    <h4 style="font-weight:500">Who are you looking for?</h4>
        <p class="body-2">Business and Product Experts</p>
        <v-checkbox style="margin:0%; padding:0" label="Product Management and Conceptualization" v-model="product" value=true></v-checkbox>
        <v-checkbox style="margin:0%; padding:0" label="Design and User Experience" v-model="design" value=true></v-checkbox>
        <v-checkbox style="margin:0%; padding:0" label="Operations / Finance" v-model="operations" value=true></v-checkbox>
        <v-checkbox style="margin:0%; padding:0" label="Business Development / Marketing" v-model="business" value=true></v-checkbox>
        <p class="body-2">Technology Heroes</p>
        <v-checkbox style="margin:0%; padding:0" label="Software / Web Development" v-model="software" value=true></v-checkbox>
        <v-checkbox style="margin:0%; padding:0" label="Virtual / Augmented Reality" v-model="vrar" value=true></v-checkbox>
        <v-checkbox style="margin:0%; padding:0" label="Artificial Intelligence" v-model="ai" value=true></v-checkbox>
        <v-checkbox style="margin:0%; padding:0" label="Blockchain" v-model="blockchain" value=true></v-checkbox>
        <v-text-field
        name="experience"
        label="Experience in years"
        id="experience"
        type="experience"
        v-model="experience"
        style="margin-top:0; border:0; font-size:10%"
        required>
      </v-text-field>
    <div class="text-xs-center">
    <!--  
    <p v-if="selectemployees" style="margin-top:5vw; text-align:justify">We select potential applicants based on their fit to your company culture and their strengths. We account for Adaptability, Goal-Orientation, Perseverence, Customer-Orientation, Collaboration and Detail-Orientation. Please choose from your current employees which ones are most suitable for the job based on these strengths.</p>
    -->
    <p v-if="describestrengths" style="margin-top:5vw; text-align:justify">We recommend applicants based on their strengths and fit with your company culture. Please describe with the following template which profile is most suitable for the job.</p>
    <!--
    <p v-if="selectemployees" @click="selectemployees=false; describestrengths=true" style='text-align:left; margin-bottom:0px; font-size:2.5vw'>Alternatively, click to choose employees to serve as role models</p>
    <p v-if="describestrengths" @click="selectemployees=true; describestrengths=false" style='text-align:left; margin-bottom:0px; font-size:2.5vw'>Define attributes manually instead</p>
    <v-layout v-if="selectemployees" row wrap>
      <v-flex xs4 v-for="employee in employees" :key="employee.lastname">
      <v-checkbox style="margin-top:7vw; margin-bottom:0; padding:0" :label="employee.firstname" :value="employee.ID" v-model="employeeselection">
      </v-checkbox>
      <img class="employee-picture" :src="employee.image">
      </v-flex>
    </v-layout>
    -->
    <div style="text-align:left" v-if="describestrengths">
      <p style="margin-top:5vw">Distribute 18 points on the following 6 strengths according to your own priorities: <span style="font-weight:500">required!</span></p>
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
    </div>
    <div style="text-align:left" v-if="describeculture">
      <p style="margin-top:7vw; text-align:justify">Please outline your companies work environment. You can do so by using the following seven categories: <span style="font-weight:500">required!</span></p>
        <v-layout row wrap align-center>
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
    </div>
    <v-btn style="margin-top:10vw" primary type="submit">Create Employee Search</v-btn>
    </div>
    </form>
    </div>
  </v-app>
</template>

<script>
import firebase from 'firebase'
import firestore from '../main'

export default {
  data () {
    return {
    nocompany: true,
    name: null,
    describeculture: true,
    vision: '',
    describestrengths: true,
    selectemployees: false, 
    forcompany: null,
    description: '',
    experience: null,
    leadership: null,
    athmosphere: null,
    roles: null,
    moneysatisfaction: null,
    freedom: null,
    teamwork: null,
    pragmatism: null,
    phone: null,
    email: null,
    area1: null,
    area2: null,
    logourl: null,
    website: null,
    jobad: null,
    toselect: true,
    select: false,
    ID: null,
    employeeselection:[],
    disciplines1: ['Consulting','Company Building','Venture Capital','Hardware Technology','Software Technology','e-commerce','Healthcare','Medicine','Sports','Architecture','Food','Media','Transportation','Music','Art','Tourism','Education','Marketing','Recruiting','Social Media','Social Networks','Production','Logistics','Accounting and Finance','Sales Tools','Social Science','Math','Physics','Chemistry','Psychology','International Relationships','Governmental Institutions','Politics','Trade','Languages','Writing','Literature','Culture Science','Philosophy','History', 'write other here'],
    disciplines2: ['','Consulting','Company Building','Venture Capital','Hardware Technology','Software Technology','e-commerce','Healthcare','Medicine','Sports','Architecture','Food','Media','Transportation','Music','Art','Tourism','Education','Marketing','Recruiting','Social Media','Social Networks','Production','Logistics','Accounting and Finance','Sales Tools','Social Science','Math','Physics','Chemistry','Psychology','International Relationships','Governmental Institutions','Politics','Trade','Languages','Writing','Literature','Culture Science','Philosophy','History', 'write other here'],
    employees:[],
    pointsleft: 18,
    adaptability: 0,
    goalorientation: 0,
    detailorientation: 0,
    customerorientation: 0,
    perseverence: 0,
    collaboration: 0,
    product: null,
    design: null,
    business: null,
    operations: null,
    software: null,
    ai: null,
    vrar: null,
    blockchain: null,
    purpose: null,
    }
  },  
  created () {
    window.scrollTo(0, 0)
    firestore.collection('Users').where('ID', '==', firebase.auth().currentUser.uid).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        if (doc.data().pointsleft < 19)
        {
        this.forcompany = doc.data().company
        this.phone = doc.data().phone
        this.email = doc.data().email
        this.name = doc.data().firstname +" "+ doc.data().lastname,
        this.nocompany = false
        this.ID = doc.data().ID
        }
      })
    }).then(() => firestore.collection('Companies').where('companyname', '==', this.forcompany).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.website = doc.data().website
        this.area1 = doc.data().area1
        this.area2 = doc.data().area2
        this.logourl = doc.data().logo
        this.vision = doc.data().vision
        this.pragmatism = doc.data().pragmatism
        this.roles = doc.data().roles
        this.freedom = doc.data().freedom
        this.moneysatisfaction = doc.data().moneysatisfaction
        this.athmosphere = doc.data().athmosphere
        this.teamwork = doc.data().teamwork
        this.leadership = doc.data().leadership
        })
    }))
  },

methods:
 {
   /* Relevant for choosing employees instead of specifying job themself
  continuePress: function (event) {
      firestore.collection('Users').where('company', '==', this.forcompany).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let data = {
        firstname : doc.data().firstname,
        lastname : doc.data().lastname,
        image : doc.data().profilepicture,
        ID : doc.data().ID
        }
        this.employees.push(data)
      })
    })
    this.toselect = false
    },
    */
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

    createEmployeeSearch: function (event) {
      if (this.pointsleft < 1 && this.leadership > 0 && this.athmosphere > 0 && this.roles > 0 && this.moneysatisfaction > 0 && this.freedom > 0 && this.teamwork > 0 && this.pragmatism > 0){
      this.$store.dispatch('createEmployeeSearch', {selectemployees: this.selectemployees,rolemodels: this.employeeselection, adaptability: this.adaptability, perseverence: this.perseverence, detailorientation: this.detailorientation, customerorientation: this.customerorientation, goalorientation: this.goalorientation, collaboration: this.collaboration, experiencelevels: this.experience, product: this.product,
      design: this.design, business: this.business, operations:  this.operations,
      software: this.software, ai: this.ai, vrar: this.vrar, blockchain: this.blockchain, company: this.forcompany, logo: this.logourl, website: this.website, jobad: this.jobad, area1: this.area1, area2: this.area2, description: this.description, phone: this.phone, email: this.email, vision: this.vision, purpose: this.purpose, pragmatism: this.pragmatism, roles: this.roles, freedom: this.freedom, moneysatisfaction: this.moneysatisfaction, athmosphere: this.athmosphere, teamwork: this.teamwork, leadership: this.leadership, name: this.name
      })
      this.$store.dispatch('createCompanyDetails', {company: this.forcompany, logo: this.logourl, website: this.website, area1: this.area1, area2: this.area2, vision: this.vision, pragmatism: this.pragmatism, roles: this.roles, freedom: this.freedom, moneysatisfaction: this.moneysatisfaction, athmosphere: this.athmosphere, teamwork: this.teamwork, leadership: this.leadership
      })
      this.$store.dispatch('openSite', {target: '/searchlist'})
      } 
    } 
  }
}  

</script>

<style scoped>
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

.strengths {
  padding-left:20%;
}

.employee-picture {
  width:22vw;
  height:22vw;
  border-radius: 10%;
  object-fit:cover;
  margin-top:0;
}
</style>

