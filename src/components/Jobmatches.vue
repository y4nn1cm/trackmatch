<template>
  <div>
    <h3 style="text-align:center">Job offerings in Munich for you</h3>
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
      <div class="line" style="margin-top:4vw"></div>
    </v-layout>
  </div>
</template>

<script>
import firebase from 'firebase'
import firestore from '../main'
import uniq from 'lodash/uniq'
import uniqWith from 'lodash/uniqWith'
import uniqBy from 'lodash/uniqBy'

export default {
    data (){
      return {
        activities: [],
        background1: null,
        experience: null,
        background2: null,
        adaptability: null,
        perseverence: null,
        collaboration: null,
        goalorientation: null,
        detailorientation: null,
        customerorientation: null,
        product: false,
        design: false,
        business: false,
        operations: false,
        software: false,
        ai: false,
        vrar: false,
        blockchain: false,
        leadership: this.leadership,
        athmosphere: this.athmosphere,
        roles: this.roles,
        moneysatisfaction: this.moneysatisfaction,
        freedom: this.freedom,
        teamwork: this.teamwork,
        pragmatism: this.pragmatism,
        jobs: [],
        email: null,
        phone: null,
      }
    },

    created () {
    window.scrollTo(0, 0)
    firestore.collection('Users').where('ID', '==', firebase.auth().currentUser.uid).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        if (doc.data().pointsleft < 19)
        {
        this.experience = doc.data().experience,
        this.background1 = doc.data().background1,
        this.background2 = doc.data().background2,
        this.adaptability = doc.data().adaptability,
        this.goalorientation = doc.data().goalorientation,
        this.detailorientation = doc.data().detailorientation,
        this.customerorientation = doc.data().customerorientation,
        this.perseverence = doc.data().perseverence,
        this.collaboration = doc.data().collaboration,
        this.leadership = doc.data().leadership,
        this.athmosphere = doc.data().athmosphere,
        this.roles = doc.data().roles,
        this.moneysatisfaction = doc.data().moneysatisfaction,
        this.freedom = doc.data().freedom,
        this.teamwork = doc.data().teamwork,
        this.pragmatism = doc.data().pragmatism,
        this.product = doc.data().product,
        this.design = doc.data().design,
        this.business = doc.data().business,
        this.operations = doc.data().operations,
        this.software = doc.data().software,
        this.ai = doc.data().ai,
        this.vrar = doc.data().vrar,
        this.blockchain = doc.data().blockchain
        }
      })
    }).then(() => firestore.collection('EmployeeSearches').where('product', '==', this.product).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let data = {
        company : doc.data().company,
        website : doc.data().website,
        background1 : doc.data().area1,
        background2 : doc.data().area2,
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
    })).then(() => firestore.collection('EmployeeSearches').where('design', '==', this.design).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let data = {
        company : doc.data().company,
        website : doc.data().website,
        logo: doc.data().logo,
        jobad: doc.data().jobad,
        background1 : doc.data().area1,
        background2 : doc.data().area2,
        description : doc.data().description,
        adaptability : doc.data().adaptability,
        perseverence : doc.data().perseverence,
        collaboration : doc.data().collaboration,
        goalorientation : doc.data().goalorientation,
        customerorientation : doc.data().customerorientation,
        detailorientation : doc.data().detailorientation,
        email: doc.data().email,
        phone: doc.data().phone,
        vision: doc.data().vision,
        experience: doc.data().experiencelevels
        }
        this.jobs.push(data)
        })
    })).then(() => firestore.collection('EmployeeSearches').where('business', '==', this.business).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let data = {
        company : doc.data().company,
        website : doc.data().website,
        logo: doc.data().logo,
        jobad: doc.data().jobad,
        background1 : doc.data().area1,
        background2 : doc.data().area2,
        description : doc.data().description,
        adaptability : doc.data().adaptability,
        perseverence : doc.data().perseverence,
        collaboration : doc.data().collaboration,
        goalorientation : doc.data().goalorientation,
        customerorientation : doc.data().customerorientation,
        detailorientation : doc.data().detailorientation,
        email: doc.data().email,
        phone: doc.data().phone,
        vision: doc.data().vision,
        experience: doc.data().experiencelevels
        }
        this.jobs.push(data)
        })
    })).then(() => firestore.collection('EmployeeSearches').where('operations', '==', this.operations).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let data = {
        company : doc.data().company,
        website : doc.data().website,
        logo: doc.data().logo,
        jobad: doc.data().jobad,
        background1 : doc.data().area1,
        background2 : doc.data().area2,
        description : doc.data().description,
        adaptability : doc.data().adaptability,
        perseverence : doc.data().perseverence,
        collaboration : doc.data().collaboration,
        goalorientation : doc.data().goalorientation,
        customerorientation : doc.data().customerorientation,
        detailorientation : doc.data().detailorientation,
        email: doc.data().email,
        phone: doc.data().phone,
        vision: doc.data().vision,
        experience: doc.data().experiencelevels
        }
        this.jobs.push(data)
        })
    })).then(() => firestore.collection('EmployeeSearches').where('software', '==', this.software).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let data = {
        company : doc.data().company,
        website : doc.data().website,
        logo: doc.data().logo,
        jobad: doc.data().jobad,
        background1 : doc.data().area1,
        background2 : doc.data().area2,
        description : doc.data().description,
        adaptability : doc.data().adaptability,
        perseverence : doc.data().perseverence,
        collaboration : doc.data().collaboration,
        goalorientation : doc.data().goalorientation,
        customerorientation : doc.data().customerorientation,
        detailorientation : doc.data().detailorientation,
        email: doc.data().email,
        phone: doc.data().phone,
        vision: doc.data().vision,
        experience: doc.data().experiencelevels
        }
        this.jobs.push(data)
        })
    })).then(() => firestore.collection('EmployeeSearches').where('ai', '==', this.ai).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let data = {
        company : doc.data().company,
        website : doc.data().website,
        logo: doc.data().logo,
        jobad: doc.data().jobad,
        background1 : doc.data().area1,
        background2 : doc.data().area2,
        description : doc.data().description,
        adaptability : doc.data().adaptability,
        perseverence : doc.data().perseverence,
        collaboration : doc.data().collaboration,
        goalorientation : doc.data().goalorientation,
        customerorientation : doc.data().customerorientation,
        detailorientation : doc.data().detailorientation,
        email: doc.data().email,
        phone: doc.data().phone,
        vision: doc.data().vision,
        experience: doc.data().experiencelevels
        }
        this.jobs.push(data)
        })
    })).then(() => firestore.collection('EmployeeSearches').where('vrar', '==', this.vrar).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let data = {
        company : doc.data().company,
        website : doc.data().website,
        logo: doc.data().logo,
        jobad: doc.data().jobad,
        background1 : doc.data().area1,
        background2 : doc.data().area2,
        description : doc.data().description,
        adaptability : doc.data().adaptability,
        perseverence : doc.data().perseverence,
        collaboration : doc.data().collaboration,
        goalorientation : doc.data().goalorientation,
        customerorientation : doc.data().customerorientation,
        detailorientation : doc.data().detailorientation,
        email: doc.data().email,
        phone: doc.data().phone,
        vision: doc.data().vision,
        experience: doc.data().experiencelevels
        }
        this.jobs.push(data)
        })
    })).then(() => firestore.collection('EmployeeSearches').where('blockchain', '==', this.blockchain).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let data = {
        company : doc.data().company,
        website : doc.data().website,
        logo: doc.data().logo,
        jobad: doc.data().jobad,
        background1 : doc.data().area1,
        background2 : doc.data().area2,
        description : doc.data().description,
        adaptability : doc.data().adaptability,
        perseverence : doc.data().perseverence,
        collaboration : doc.data().collaboration,
        goalorientation : doc.data().goalorientation,
        customerorientation : doc.data().customerorientation,
        detailorientation : doc.data().detailorientation,
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
