<template>
<v-app>
  <p v-if="nocompany">Before creating an Employee Search, please fill out your profile and provide which company you are working for.</p>
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
    <h4>What areas is your company active in?</h4> 
        <v-select id=discipline1
          label="Discipline or Industry"
          :items="disciplines"
          v-model="area1"
          class="input-group--focused"
          required>
        </v-select>
        <v-select id=discipline2
          label="Discipline or Industry"
          :items="disciplines"
          v-model="area2"
          class="input-group--focused"
          required>
        </v-select>
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
        name="email"
        label="Contact mail for this job"
        id="email"
        type="email"
        v-model="email"
        style="margin-top:0; border:0; font-size:10%"
        required>
      </v-text-field>
      <v-text-field
        name="phone"
        label="Contact number for this job"
        id="phone"
        type="phone"
        v-model="phone"
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
    <h4>What experience level(s) are you looking for?</h4>
      <v-checkbox  label="entry level" value=1 v-model='experiencelevel' style="margin-top:3%; margin-bottom:0%; margin-left:-0%; margin-right:-0%; padding:0; font-size:10%"></v-checkbox>
      <v-checkbox style="margin:0%; padding:0" label="> 2 years" value=2 v-model='experiencelevel'></v-checkbox>
      <v-checkbox style="margin:0%; padding:0" label="> 5 years" value=3 v-model='experiencelevel'></v-checkbox>
      <v-checkbox style="margin:0%; padding:0; font-size:4px" label="> 10 years" value=4 v-model='experiencelevel'></v-checkbox>
        <div class="line"></div>
        <h4>What areas are you looking for?</h4>
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
    <div class="text-xs-center">
    <!--  
    <p v-if="selectemployees" style="margin-top:5vw; text-align:justify">We select potential applicants based on their fit to your company culture and their strengths. We account for Adaptability, Goal-Orientation, Perseverence, Customer-Orientation, Collaboration and Detail-Orientation. Please choose from your current employees which ones are most suitable for the job based on these strengths.</p>
    -->
    <p v-if="describestrengths" style="margin-top:5vw; text-align:justify">We select potential applicants based on their fit to your company culture and their strengths. We account for Adaptability, Goal-Orientation, Perseverence, Customer-Orientation, Collaboration and Detail-Orientation. Please describe with the following template which profile is most suitable for the job.</p>
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
      <p style="margin-top:5vw">Please distribute 18 points on the following 6 categories according to your own priorities:</p>
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
    vision: '',
    describestrengths: true,
    selectemployees: false, 
    forcompany: null,
    description: '',
    experiencelevel: [],
    phone: null,
    email: null,
    area1: null,
    area2: null,
    logourl: null,
    website: null,
    jobad: null,
    toselect: true,
    select: false,
    employeeselection:[],
    disciplines: ['Healthcare', 'Art', 'Music', 'Food', 'Engineering', 'Transportation'],
    employees:[],
    pointsleft: 18,
    adaptability: 0,
    goalorientation: 0,
    detailorientation: 0,
    customerorientation: 0,
    perseverence: 0,
    collaboration: 0,
    product: false,
    design: false,
    business: false,
    operations: false,
    software: false,
    ai: false,
    vrar: false,
    blockchain: false,
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
        this.nocompany = false
        }
      })
    }).then(() => firestore.collection('Companies').where('companyname', '==', this.forcompany).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.website = doc.data().website
        this.area1 = doc.data().area1
        this.area2 = doc.data().area2
        this.logourl = doc.data().logo
        this.vision = doc.data().vision
        })
    }))
  },

methods:
 {
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
      if (pointsleft < 1){
      this.$store.dispatch('createEmployeeSearch', {selectemployees: this.selectemployees,rolemodels: this.employeeselection, adaptability: this.adaptability, perseverence: this.perseverence, detailorientation: this.detailorientation, customerorientation: this.customerorientation, goalorientation: this.goalorientation, collaboration: this.collaboration, experiencelevels: this.experiencelevel, product: this.product,
      design: this.design, business: this.business, operations:  this.operations,
      software: this.software, ai: this.ai, vrar: this.vrar, blockchain: this.blockchain, company: this.forcompany, logo: this.logourl, website: this.website, jobad: this.jobad, area1: this.area1, area2: this.area2, description: this.description, phone: this.phone, email: this.email, vision: this.vision
      })
      this.$store.dispatch('createCompanyDetails', {company: this.forcompany, logo: this.logourl, website: this.website, area1: this.area1, area2: this.area2, vision: this.vision
      })
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

