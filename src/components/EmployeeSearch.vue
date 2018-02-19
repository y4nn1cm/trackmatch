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
        name="position"
        label="Please give the position a unique name"
        id="position"
        type="position"
        v-model="position"
        style="margin-top:0; border:0; font-size:10%"
        required>
      </v-text-field>
   <div class="line"></div>
  <h4>What experience level(s) are you looking for?</h4>
      <v-checkbox  label="entry level" value=1 v-model='experiencelevel' style="margin-top:3%; margin-bottom:0%; margin-left:-0%; margin-right:-0%; padding:0; font-size:10%"></v-checkbox>
      <v-checkbox style="margin:0%; padding:0" label="> 2 years" value=2 v-model='experiencelevel'></v-checkbox>
      <v-checkbox style="margin:0%; padding:0" label="> 5 years" value=3 v-model='experiencelevel'></v-checkbox>
      <v-checkbox style="margin:0%; padding:0; font-size:4px" label="> 10 years" value=4 v-model='experiencelevel'></v-checkbox>
        <div class="line"></div>
        <h4>What areas are you looking for?</h4>
        <p class="body-2">Product</p>
        <v-checkbox style="margin:0%; padding:0" label="Product Management" v-model="activities" value="Product Management"></v-checkbox>
        <v-checkbox style="margin:0%; padding:0" label="Product Design" v-model="activities" value="Product Design"></v-checkbox>
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
    <v-text-field
      name="jobad"
      label="Paste link to job ad (if existing)"
      id="jobas"
      type="jobad"
      v-model="jobad">
    </v-text-field>
    <div class="text-xs-center">
    <v-btn v-if="toselect" primary @click="continuePress">Select Role Models</v-btn>
    <div v-else>
    <p style="margin-top:5vw; text-align:justify">We select potential applicants based on their fit to your company culture and their strengths. We account for Adaptability, Goal-Orientation, Perseverence, Customer-Orientation, Collaboration and Detail-Orientation. Please choose from your current employees which ones are most suitable for the job based on these strengths.</p>
    <v-layout row wrap>
      <v-flex xs4 v-for="employee in employees" :key="employee.lastname">
      <v-checkbox style="margin-top:7vw; margin-bottom:0; padding:0" :label="employee.firstname" :value="employee.ID" v-model="employeeselection">
      </v-checkbox>
      <img class="employee-picture" :src="employee.image">
      </v-flex>
    </v-layout>
    <v-btn style="margin-top:10vw" primary type="submit">Create Employee Search</v-btn>
    </div>
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
    forcompany: null,
    position: null,
    experiencelevel: [],
    area1: null,
    area2: null,
    logourl: null,
    website: null,
    jobad: null,
    toselect: true,
    select: false,
    employeeselection:[],
    disciplines: ['Healthcare', 'Art', 'Music', 'Food', 'Engineering', 'Transportation'],
    activities:[],
    employees:[]
    }
  },  
  created () {
    window.scrollTo(0, 0)
    firestore.collection('Users').where('ID', '==', firebase.auth().currentUser.uid).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        if (doc.data().pointsleft < 19)
        {
        this.forcompany = doc.data().company
        this.nocompany = false
        }
      })
    }).then(() => firestore.collection('Companies').where('companyname', '==', this.forcompany).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.website = doc.data().website
        this.area1 = doc.data().area1
        this.area2 = doc.data().area2
        this.logourl = doc.data().logo
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
    
    createEmployeeSearch: function (event) {
      this.$store.dispatch('createEmployeeSearch', {rolemodels: this.employeeselection, experiencelevels: this.experiencelevel, activities: this.activities, company: this.forcompany, logo: this.logourl, website: this.website, jobad: this.jobad, area1: this.area1, area2: this.area2, uniquename: this.position
      })
      this.$store.dispatch('createCompanyDetails', {company: this.forcompany, logo: this.logourl, website: this.website, area1: this.area1, area2: this.area2
      })
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

.employee-picture {
  width:22vw;
  height:22vw;
  border-radius: 10%;
  object-fit:cover;
  margin-top:0;
}
</style>

