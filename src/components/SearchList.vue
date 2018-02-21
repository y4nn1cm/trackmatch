<template>
  <div>
    <h3 style="text-align:center">Job offerings by {{this.company}}</h3>
    <div class="line" style="margin-top:4vw"></div>
    <v-layout align-top style="margin-top:6vw" v-for="job in getJobs" :key="job.description" row wrap>
      <v-flex xs2>
        <img class="employee-picture" :src="job.logo">
      </v-flex>
      <v-flex class="body-2" xs10><p style="margin-top:0; margin-bottom:0.5vw; margin-left:0; padding:0">{{job.description}}</p>
      <p style="margin-top:0; margin-bottom:0; margin-left:0; padding:0">In: {{job.background1}} / {{job.background2}}
      </p>
      </v-flex>
      <v-flex>
        <p style="font-weight:500; margin-top:1.5vw; margin-bottom:1vw; padding:0">{{job.company}}</p>  
        <a :href="job.website">{{job.website}}</a><br>
        <a :href="job.jobad">See job ad</a>
        <p style="font-weight:500; margin-top:1.5vw; margin-bottom:0; padding:0">Contact:</p>
        <p style="margin-top:0; margin-bottom:0; padding:0">{{job.phone}}</p>  
        <p style="margin-top:0; margin-bottom:0; padding:0">{{job.email}}</p>
        <p style="margin-top:1.5vw; margin-bottom:0; padding:0" class="body-2">Culture fit: coming soon</p>
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
      <v-flex xs12>
        <p style="margin-top:0.5vw; margin-bottom:0; padding:0" class="body-2">Company vision</p>
        <p style="text-align:justify; margin-bottom:0; padding:0">{{job.vision}}</p>
      </v-flex>
      <v-flex xs12 v-if="neutral">
      <div style="text-align:center">
      <v-btn primary class="button" @click="neutral = !neutral" style="margin:4vw; padding-top:0">Delete Jobsearch</v-btn>
      </div>
      </v-flex>
      <v-flex xs12 v-else>
      <div style="text-align:center"> 
      <v-btn primary @click="deleteJobsearch(job.description)" style="margin:4vw; padding-top:0; width:12vw">Confirm</v-btn>
      <v-btn primary @click="neutral = !neutral" style="margin:4vw; padding-top:0; width:12vw">Cancel</v-btn>
      </div>
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
        }
    },

    created (){
    window.scrollTo(0, 0)
    firestore.collection('Users').where('ID', '==', firebase.auth().currentUser.uid).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
          this.company = doc.data().company
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
        experience: doc.data().experiencelevels
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
        experience: doc.data().experiencelevels
        }
        this.jobs.push(data)
        })
    }));

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
