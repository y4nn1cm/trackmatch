<template>
  <div>
    <h3 style="text-align:center">Job offerings by {{this.company}}</h3>
    <div class="line" style="margin-top:4vw"></div>
    <v-layout align-top style="margin-top:6vw" v-for="job in getJobs" :key="job.description" row wrap>
      <v-flex xs2>
        <img class="employee-picture" :src="job.logo">
      </v-flex>
      <v-flex xs10><p class="title" style="margin-top:1.5vw; margin-bottom:1vw; margin-left:0; padding:0">{{job.description}}</p>
      <p style="margin-top:0; margin-bottom:0; margin-left:0; padding:0"><a target="_blank" :href="job.jobad">See job ad</a>
      </p>
      </v-flex>
      <v-flex xs12>
        <p style="margin-top:2vw; margin-bottom:0; padding:0; font-weight:600">Job purpose:</p>
        <p style="text-align:justify; margin-bottom:0; padding:0">{{job.purpose}}</p>
      </v-flex>
      <v-flex xs6>
        <p style="font-weight:500; margin-top:1.5vw; margin-bottom:0; padding:0">Contact:</p>
        <p style="margin-top:0; margin-bottom:0; padding:0">{{job.phone}}</p>  
        <p style="margin-top:0; margin-bottom:0; padding:0">{{job.email}}</p>
        <div v-if="neutral" style="text-align:left">
        <v-btn primary v-if="checkAdvocacy(job.advocates)" class="button" @click="removeAdvocacy(job)" style="margin:0; margin-top:5vw; padding:0">Remove advocacy</v-btn>
        <v-btn primary v-else class="button" @click="becomeAdvocate(job)" style="margin:0; margin-top:5vw; padding:0">Become advocate</v-btn>
        <v-btn class="teal" style="margin:0; margin-top:5vw; padding:0; color:white" @click="neutral = !neutral">Delete Jobsearch</v-btn>
        </div>
        <div v-else style="text-align:left"> 
        <v-btn class="teal" @click="deleteJobsearch(job.description)" style="margin:0; padding:0; margin-top:5vw; width:12vw; color:white">Confirm</v-btn><br>
        <v-btn class="teal" @click="neutral = !neutral" style="margin:0; margin-top:5vw; padding:0; width:12vw; color:white">Cancel</v-btn>
        </div>
      </v-flex>
      <v-flex xs6>
        <p style="font-weight:500; margin-top:1.5vw; margin-bottom:1vw; padding:0; text-align:right">Ideal Candidate Profile:</p>
        <p style="margin-top:0; margin-bottom:1vw; padding:0; text-align:right">Experience: {{job.experience}} years</p>
        <p style="margin-top:0; margin-bottom:0; padding:0; text-align:right">Adaptability: {{job.adaptability}}</p>
        <p style="margin-top:0; margin-bottom:0; padding:0; text-align:right">Detailorientation: {{job.detailorientation}}</p>
        <p style="margin-top:0; margin-bottom:0; padding:0; text-align:right">Perseverence: {{job.perseverence}}</p>
        <p style="margin-top:0; margin-bottom:0; padding:0; text-align:right">Customerorientation: {{job.customerorientation}}</p>
        <p style="margin-top:0; margin-bottom:0; padding:0; text-align:right">Collaboration: {{job.collaboration}}</p>
        <p style="margin-top:0; margin-bottom:0; padding:0; text-align:right">Goalorientation: {{job.goalorientation}}</p>  
      </v-flex>
      
      <div class="line" style="margin-top:4vw"></div>
    </v-layout>
  </div>
</template>

<script>
import firebase from 'firebase'
import firestore from '../main'
import uniqBy from 'lodash/uniqBy'

export default {
    data(){
        return {
            jobs:[],
            company: null,
            neutral: true,
            ID: null,
            advocate:{
            ID: '',
            phone: '',
            email: '',
            linkedin: '',
            image: '',
            job:'',
            vision:'',
            firstname:'',
            lastname:''
            }
        }
    },

    created (){
    window.scrollTo(0, 0)
    firestore.collection('Users').where('ID', '==', firebase.auth().currentUser.uid).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
          this.company = doc.data().company
          this.ID = doc.data().ID
          /*
          this.phone = doc.data().phone
          this.email = doc.data().email
          this.linkedin = doc.data().linkedin
          this.image = doc.data().profilepicture
          this.job = doc.data().goal
          this.vision = doc.data().vision
          */
          this.advocate = {
          ID: doc.data().ID,
          phone: doc.data().phone,
          email: doc.data().email,
          linkedin: doc.data().linkedin,
          image: doc.data().profilepicture,
          job: doc.data().goal,
          vision: doc.data().vision,
          firstname: doc.data().firstname,
          lastname: doc.data().lastname
        } 
    })
    }).then(() => firestore.collection('EmployeeSearches').where('company', '==', this.company).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let data = {
        company: doc.data().company,
        website: doc.data().website,
        background1: doc.data().area1,
        background2: doc.data().area2,
        logo: doc.data().logo,
        jobad: doc.data().jobad,
        description: doc.data().description,
        adaptability: doc.data().adaptability,
        perseverence: doc.data().perseverence,
        collaboration: doc.data().collaboration,
        goalorientation: doc.data().goalorientation,
        customerorientation: doc.data().customerorientation,
        detailorientation: doc.data().detailorientation,
        email: doc.data().email,
        phone: doc.data().phone,
        vision: doc.data().vision,
        experience: doc.data().experiencelevels,
        purpose: doc.data().purpose,
        advocates: doc.data().advocates
        }
        this.jobs.push(data)
        })
    }))
    },
    computed:
  {
    getJobs (){
    return uniqBy(this.jobs, 'description');
    }
  },
    methods: {
        becomeAdvocate: function (job) {
          job.advocates.push(this.advocate)
          this.$store.dispatch('updateAdvocacy', {search: job.description, advocates: job.advocates}).then(function() {
            console.log("You successfully became an advocate!");
            }).catch(function(error) {
            console.error("Error adding advocacy: ", error); 
        }).then(() => firestore.collection('EmployeeSearches').where('company', '==', this.company).get().then(querySnapshot => {
        this.jobs = []    
        querySnapshot.forEach(doc => {
        let data = {
        company: doc.data().company,
        website: doc.data().website,
        background1: doc.data().area1,
        background2: doc.data().area2,
        logo: doc.data().logo,
        jobad: doc.data().jobad,
        description: doc.data().description,
        adaptability: doc.data().adaptability,
        perseverence: doc.data().perseverence,
        collaboration: doc.data().collaboration,
        goalorientation: doc.data().goalorientation,
        customerorientation: doc.data().customerorientation,
        detailorientation: doc.data().detailorientation,
        email: doc.data().email,
        phone: doc.data().phone,
        vision: doc.data().vision,
        experience: doc.data().experiencelevels,
        purpose: doc.data().purpose,
        advocates: doc.data().advocates
        }
        this.jobs.push(data)
        })
    }));
        this.neutral=true
        },

        removeAdvocacy: function (job) {
          job.advocates.splice(job.advocates.indexOf(this.ID), 1)
          this.$store.dispatch('updateAdvocacy', {search: job.description, advocates: job.advocates}).then(function() {
            console.log("Advocacy removed");
            }).catch(function(error) {
            console.error("Error removing advocacy: ", error); 
        }).then(() => firestore.collection('EmployeeSearches').where('company', '==', this.company).get().then(querySnapshot => {
        this.jobs = []    
        querySnapshot.forEach(doc => {
        let data = {
        company: doc.data().company,
        website: doc.data().website,
        background1: doc.data().area1,
        background2: doc.data().area2,
        logo: doc.data().logo,
        jobad: doc.data().jobad,
        description: doc.data().description,
        adaptability: doc.data().adaptability,
        perseverence: doc.data().perseverence,
        collaboration: doc.data().collaboration,
        goalorientation: doc.data().goalorientation,
        customerorientation: doc.data().customerorientation,
        detailorientation: doc.data().detailorientation,
        email: doc.data().email,
        phone: doc.data().phone,
        vision: doc.data().vision,
        experience: doc.data().experiencelevels,
        purpose: doc.data().purpose,
        advocates: doc.data().advocates
        }
        this.jobs.push(data)
        })
    }));
        this.neutral=true
        },
        
        checkAdvocacy (advocates) {
          return advocates.some(advocates => (advocates.ID === this.ID))
        },

        deleteJobsearch: function (desc){
            this.$store.dispatch('deleteDocument', {document: desc, collection: 'EmployeeSearches',
      }).then(function() {
            console.log("Document successfully deleted!");
            }).catch(function(error) {
            console.error("Error removing document: ", error); 
        }).then(() => firestore.collection('EmployeeSearches').where('company', '==', this.company).get().then(querySnapshot => {
        this.jobs = []    
        querySnapshot.forEach(doc => {
        let data = {
        company: doc.data().company,
        website: doc.data().website,
        background1: doc.data().area1,
        background2: doc.data().area2,
        logo: doc.data().logo,
        jobad: doc.data().jobad,
        description: doc.data().description,
        adaptability: doc.data().adaptability,
        perseverence: doc.data().perseverence,
        collaboration: doc.data().collaboration,
        goalorientation: doc.data().goalorientation,
        customerorientation: doc.data().customerorientation,
        detailorientation: doc.data().detailorientation,
        email: doc.data().email,
        phone: doc.data().phone,
        vision: doc.data().vision,
        experience: doc.data().experiencelevels,
        purpose: doc.data().purpose,
        advocates: doc.data().advocates
        }
        this.jobs.push(data)
        })
    }));
        this.neutral=true
        }
    }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Merriweather');

.employee-picture {
  width:10vw;
  height:10vw;
  border-radius: 10%;
  object-fit:cover;
  margin-top:1vw;
}
.line {
  position: relative;
  width: 100%;
  height: 1px;
  background: #DDD;
  border-radius: 10%;
  line-height: 0px;
}
</style>
