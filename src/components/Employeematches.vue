<template>
  <div>
    
    <v-layout v-for="job in jobs" :key="job.description" row wrap>
      <v-flex class="body-2" xs12><p style="margin-top:5vw; margin-bottom:3vw; margin-left:0.5vw; padding:0">{{job.description}}</p></v-flex>  
      <v-flex xs4>
        <img class="employee-picture" :src="job.logo">
      </v-flex>
      <v-flex xs8>
        <p style="margin-top:0; margin-bottom:0.5vw; padding:0">{{job.company}}</p>  
        <a style="margin-top:0; margin-bottom:0.5vw; padding:0" :href="job.website">{{job.website}}</a><br>
        <a style="margin-top:0; margin-bottom:0.5vw; padding:0" :href="job.jobad">Click to see Jobad</a>
        <p style="margin-top:0; margin-bottom:0.5vw; padding:0">contact: {{job.phone}}</p> 
        <p style="margin-top:0; margin-bottom:0.5vw; padding:0">{{job.email}}</p> 
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import firebase from 'firebase'
import firestore from '../main'

export default {
    data (){
      return {
        activities: [],
        background1: null,
        background2: null,
        adaptability: null,
        perseverence: null,
        collaboration: null,
        goalorientation: null,
        detailorientation: null,
        customerorientation: null,
        product: null,
        design: null,
        business: null,
        operations: null,
        software: null,
        ai: null,
        vrar: null,
        blockchain: null,
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
methods:
{
    loadCandidates () {
    window.scrollTo(0, 0)
    firestore.collection('Users').where('ID', '==', firebase.auth().currentUser.uid).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        if (doc.data().pointsleft < 19)
        {
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
        phone: doc.data().phone
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
        description : doc.data().description,
        adaptability : doc.data().adaptability,
        perseverence : doc.data().perseverence,
        collaboration : doc.data().collaboration,
        goalorientation : doc.data().goalorientation,
        customerorientation : doc.data().customerorientation,
        detailorientation : doc.data().detailorientation
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
        description : doc.data().description,
        adaptability : doc.data().adaptability,
        perseverence : doc.data().perseverence,
        collaboration : doc.data().collaboration,
        goalorientation : doc.data().goalorientation,
        customerorientation : doc.data().customerorientation,
        detailorientation : doc.data().detailorientation
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
        description : doc.data().description,
        adaptability : doc.data().adaptability,
        perseverence : doc.data().perseverence,
        collaboration : doc.data().collaboration,
        goalorientation : doc.data().goalorientation,
        customerorientation : doc.data().customerorientation,
        detailorientation : doc.data().detailorientation
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
        description : doc.data().description,
        adaptability : doc.data().adaptability,
        perseverence : doc.data().perseverence,
        collaboration : doc.data().collaboration,
        goalorientation : doc.data().goalorientation,
        customerorientation : doc.data().customerorientation,
        detailorientation : doc.data().detailorientation
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
        description : doc.data().description,
        adaptability : doc.data().adaptability,
        perseverence : doc.data().perseverence,
        collaboration : doc.data().collaboration,
        goalorientation : doc.data().goalorientation,
        customerorientation : doc.data().customerorientation,
        detailorientation : doc.data().detailorientation
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
        description : doc.data().description,
        adaptability : doc.data().adaptability,
        perseverence : doc.data().perseverence,
        collaboration : doc.data().collaboration,
        goalorientation : doc.data().goalorientation,
        customerorientation : doc.data().customerorientation,
        detailorientation : doc.data().detailorientation
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
        description : doc.data().description,
        adaptability : doc.data().adaptability,
        perseverence : doc.data().perseverence,
        collaboration : doc.data().collaboration,
        goalorientation : doc.data().goalorientation,
        customerorientation : doc.data().customerorientation,
        detailorientation : doc.data().detailorientation
        }
        this.jobs.push(data)
        })
    }))
  },
}
    
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Merriweather');

.employee-picture {
  width:22vw;
  height:22vw;
  border-radius: 10%;
  object-fit:cover;
  margin-top:0;
}
</style>
