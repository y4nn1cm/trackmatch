<template>
  <div>
    <h3 style="text-align:center">Click on the job ad you want to find candidates for</h3>
    <div class="line" style="margin-top:4vw; margin-bottom:4vw"></div>
    <p style="text-align:center" v-if="searchentries">Please create an open position to find employees.</p>
    <v-layout row wrap v-for="item in searchitems" :key="item.description">
      <v-flex xs2 @click="getCandidates(item)">
        <img class="employee-picture" style="margin-top:3vw" :src="item.logo">
      </v-flex>
      <v-flex xs10 @click="getCandidates(item)">
      <p class="title" style="margin-top:5vw; margin-bottom:1.5vw; margin-left:0; padding:0">{{item.description}}</p>
      <p style="margin-top:0; margin-bottom:0; margin-left:0; padding:0">
        {{item.purpose}}
      </p>
      </v-flex>
    </v-layout>
    <v-layout align-top style="margin-top:6vw" v-for="candidate in getJobCandidates" :key="candidate.ID" row wrap>
      <div class="line" style="margin-bottom:4vw"></div>
      <v-flex xs2>
        <img class="employee-picture" :src="candidate.image">
      </v-flex>
      <v-flex class="body-2" xs10><p style="margin-top:0; margin-bottom:0.5vw; margin-left:0; padding:0">{{candidate.firstname}} {{candidate.lastname}} - matching score: <span style="font-weight:600; font-size:4vw">{{candidate.fit}}%</span></p>
      <p style="margin-top:0; margin-bottom:0; margin-left:0; padding:0">{{candidate.background1}} / {{candidate.background2}}
      </p>
      </v-flex>
      <v-flex xs12>
        <p style="margin-top:1vw; margin-bottom:0; padding:0" class="body-2">Job Goal:</p>
        <p style="text-align:justify; margin-bottom:0; padding:0">{{candidate.goal}}</p>
      </v-flex>
      <v-flex xs6>
        <p class="body-2" style="margin-top:2.5vw; margin-bottom:0; padding:0; text-align:left"> 
          Experience in years: <span class="title">{{candidate.experience}}</span></p>
      </v-flex>
     <v-flex xs4>
        <p class="body-2" style="margin-top:3vw; margin-bottom:1vw; padding:0; text-align:right"> Strengths match:</p>
        <p class="body-2" style="margin-top:1.5vw; margin-bottom:0; padding:0; text-align:right;"> Culture fit:</p>
        </v-flex>
        <v-flex xs2>
          <p class=title style="margin-top:2.5vw; margin-bottom:1vw; padding:0; text-align:left;"> 
            {{candidate.strengthsfit}}%</p>
        <p class=title style="margin-top:1.8vw; margin-bottom:0; padding:0; text-align:left"> {{candidate.culturefit}}%</p>
        </v-flex>
      <v-flex xs12>
        <div class="fineline"></div>
        <p style="margin-top:0; margin-bottom:0; padding:0" class="body-2">Vision</p>
        <p style="text-align:justify; margin-bottom:0; padding:0">{{candidate.vision}}</p>
        <p style="font-weight:500; margin-top:1.5vw; margin-bottom:0; padding:0">Contact: </p>
        <p style="font-weight:400; margin-top:0.5vw; margin-bottom:0; padding:0"><a :href="candidate.linkedin" style="font-weight:400"> See profile</a> / {{candidate.email}} / {{candidate.phone}}</p>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import firebase from 'firebase'
import firestore from '../main'
import uniqBy from 'lodash/uniqBy'

export default {
    data (){
      return {
        activities: [],
        company: null,
        background1: null,
        experience: null,
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
        leadership: null,
        athmosphere: null,
        roles: null,
        moneysatisfaction: null,
        freedom: null,
        teamwork: null,
        pragmatism: null,
        candidates: [],
        uniquecandidates: [],
        email: null,
        phone: null,
        adaptabilityfit: 0,
        perseverencefit: 0,
        collaborationfit: 0,
        goalorientationfit: 0,
        customerorientationfit: 0,
        detailorientationfit: 0,
        pragmatismfit: 0,
        teamworkfit: 0,
        athmospherefit: 0,
        moneysatisfactionfit: 0,
        leadershipfit: 0,
        rolesfit: 0,
        freedomfit: 0,
        strengthsfit: 0,
        culturefit: 0,
        searchitems:[],
        searchentries: true,
      }
    },

    created () {
    window.scrollTo(0, 0)
    firestore.collection('Users').where('ID', '==', firebase.auth().currentUser.uid).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
       this.company = doc.data().company
       })
    }).then(() => firestore.collection('EmployeeSearches').where('company', '==',this.company).get()).then(querySnapshot => {
      querySnapshot.forEach(doc => {
          this.leadership = doc.data().leadership,
          this.moneysatisfaction = doc.data().moneysatisfaction,
          this.freedom = doc.data().freedom,
          this.roles = doc.data().roles,
          this.teamwork = doc.data().teamwork,
          this.athmosphere = doc.data().athmosphere,
          this.pragmatism = doc.data().pragmatism,
          this.searchentries = false
          let data = {
            description : doc.data().description,
            purpose : doc.data().purpose,
            logo: doc.data().logo,
            design: doc.data().logo,
            business: doc.data().business,
            product: doc.data().product,
            operations: doc.data().operations,
            software: doc.data().software,
            vrar: doc.data().vrar,
            blockchain: doc.data().blockchain,
            ai: doc.data().ai
          }
          this.searchitems.push(data)
        })
    })
},

methods: {
    getCandidates (item) {
    this.candidates = []
    firestore.collection('EmployeeSearches').where('description', '==', item.description).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        this.adaptability=doc.data().adaptability,
        this.collaboration=doc.data().collaboration,
        this.perseverence=doc.data().perseverence,
        this.customerorientation=doc.data().customerorientation,
        this.detailorientation=doc.data().detailorientation,
        this.goalorientation=doc.data().goalorientation
        })
    }).then(() => firestore.collection('Candidates').where('design', '==', item.design).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let data = {
        image: doc.data().profilepicture,
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
        experience: doc.data().experience,
        firstname: doc.data().firstname,
        lastname: doc.data().lastname,
        background1: doc.data().background1,
        background2: doc.data().background2,
        goal: doc.data().goal,
        linkedin: doc.data().linkedin,
        ID: doc.data().ID,
        strengthsfit: this.calculateStrengthsFit(doc),
        culturefit: this.calculateCultureFit(doc),
        fit: (this.strengthsfit+this.culturefit)/2
        }
        this.candidates.push(data)
        })
    }).then(() => firestore.collection('Candidates').where('product', '==', item.product).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let data = {
        image: doc.data().profilepicture,
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
        experience: doc.data().experience,
        firstname: doc.data().firstname,
        lastname: doc.data().lastname,
        background1: doc.data().background1,
        background2: doc.data().background2,
        goal: doc.data().goal,
        linkedin: doc.data().linkedin,
        ID: doc.data().ID,
        strengthsfit: this.calculateStrengthsFit(doc),
        culturefit: this.calculateCultureFit(doc),
        fit: (this.strengthsfit+this.culturefit)/2
        }
        this.candidates.push(data)
        })
    })).then(() => firestore.collection('Candidates').where('business', '==', item.business).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let data = {
        image: doc.data().profilepicture,
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
        experience: doc.data().experience,
        firstname: doc.data().firstname,
        lastname: doc.data().lastname,
        background1: doc.data().background1,
        background2: doc.data().background2,
        goal: doc.data().goal,
        linkedin: doc.data().linkedin,
        ID: doc.data().ID,
        strengthsfit: this.calculateStrengthsFit(doc),
        culturefit: this.calculateCultureFit(doc),
        fit: (this.strengthsfit+this.culturefit)/2
        }
        this.candidates.push(data)
        })
    })).then(() => firestore.collection('Candidates').where('operations', '==', item.operations).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let data = {
        image: doc.data().profilepicture,
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
        experience: doc.data().experience,
        firstname: doc.data().firstname,
        lastname: doc.data().lastname,
        background1: doc.data().background1,
        background2: doc.data().background2,
        goal: doc.data().goal,
        linkedin: doc.data().linkedin,
        ID: doc.data().ID,
        strengthsfit: this.calculateStrengthsFit(doc),
        culturefit: this.calculateCultureFit(doc),
        fit: (this.strengthsfit+this.culturefit)/2
        }
        this.candidates.push(data)
        })
    })).then(() => firestore.collection('Candidates').where('software', '==', item.software).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let data = {
        image: doc.data().profilepicture,
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
        experience: doc.data().experience,
        firstname: doc.data().firstname,
        lastname: doc.data().lastname,
        background1: doc.data().background1,
        background2: doc.data().background2,
        goal: doc.data().goal,
        linkedin: doc.data().linkedin,
        ID: doc.data().ID,
        strengthsfit: this.calculateStrengthsFit(doc),
        culturefit: this.calculateCultureFit(doc),
        fit: (this.strengthsfit+this.culturefit)/2
        }
        this.candidates.push(data)
        })
    })).then(() => firestore.collection('Candidates').where('ai', '==', item.ai).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let data = {
        image: doc.data().profilepicture,
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
        experience: doc.data().experience,
        firstname: doc.data().firstname,
        lastname: doc.data().lastname,
        background1: doc.data().background1,
        background2: doc.data().background2,
        goal: doc.data().goal,
        linkedin: doc.data().linkedin,
        ID: doc.data().ID,
        strengthsfit: this.calculateStrengthsFit(doc),
        culturefit: this.calculateCultureFit(doc),
        fit: (this.strengthsfit+this.culturefit)/2
        }
        this.candidates.push(data)
        })
    })).then(() => firestore.collection('Candidates').where('vrar', '==', item.vrar).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let data = {
        image: doc.data().profilepicture,
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
        experience: doc.data().experience,
        firstname: doc.data().firstname,
        lastname: doc.data().lastname,
        background1: doc.data().background1,
        background2: doc.data().background2,
        goal: doc.data().goal,
        linkedin: doc.data().linkedin,
        ID: doc.data().ID,
        strengthsfit: this.calculateStrengthsFit(doc),
        culturefit: this.calculateCultureFit(doc),
        fit: (this.strengthsfit+this.culturefit)/2
        }
        this.candidates.push(data)
        })
    })).then(() => firestore.collection('Candidates').where('blockchain', '==', item.blockchain).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let data = {
        image: doc.data().profilepicture,
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
        experience: doc.data().experience,
        firstname: doc.data().firstname,
        lastname: doc.data().lastname,
        background1: doc.data().background1,
        background2: doc.data().background2,
        goal: doc.data().goal,
        linkedin: doc.data().linkedin,
        ID: doc.data().ID,
        strengthsfit: this.calculateStrengthsFit(doc),
        culturefit: this.calculateCultureFit(doc),
        fit: (this.strengthsfit+this.culturefit)/2
        }
        this.candidates.push(data)
        })
    })))
  },
  calculateStrengthsFit(doc){
      this.adaptabilityfit = Math.abs(this.adaptability-doc.data().adaptability)
      this.collaborationfit = Math.abs(this.collaboration-doc.data().collaboration)
      this.perseverencefit = Math.abs(this.perseverence-doc.data().perseverence)
      this.goalorientationfit = Math.abs(this.goalorientation-doc.data().goalorientation)
      this.detailorientationfit = Math.abs(this.detailorientation-doc.data().detailorientation)
      this.customerorientationfit = Math.abs(this.customerorientation-doc.data().customerorientation)
      this.strengthsfit = 100-2.77*(this.adaptabilityfit+this.collaborationfit+this.perseverencefit+this.goalorientationfit+this.detailorientationfit+this.customerorientationfit)
      this.strengthsfit = Math.floor(this.strengthsfit)
      return this.strengthsfit
    },
    calculateCultureFit(doc){
      this.pragmatismfit = Math.abs(this.pragmatism-doc.data().pragmatism)
      this.leadershipfit = Math.abs(this.leadership-doc.data().leadership)
      this.athmospherefit = Math.abs(this.athmosphere-doc.data().athmosphere)
      this.rolesfit = Math.abs(this.roles-doc.data().roles)
      this.moneysatisfactionfit = Math.abs(this.moneysatisfaction-doc.data().moneysatisfaction)
      this.freedomfit = Math.abs(this.freedom-doc.data().freedom)
      this.teamworkfit = Math.abs(this.teamwork-doc.data().teamwork)
      this.culturefit = 100-2.85*(this.pragmatismfit+this.leadershipfit+this.athmospherefit+this.rolesfit+this.moneysatisfactionfit+this.freedomfit+this.teamworkfit)
      this.culturefit = Math.floor(this.culturefit)
      return this.culturefit
    }
},

  computed:
  {
    getJobCandidates (){
    this.uniquecandidates = uniqBy(this.candidates, 'ID')
    this.uniquecandidates.sort(function(a, b){return b.fit - a.fit})
    return this.uniquecandidates
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
.fineline {
  position: relative;
  width: 40%;
  height: 1px;
  background: #DDD;
  border-radius: 10%;
  line-height: 0px;
  margin-top: 2.5vw;
  margin-bottom: 2.5vw;
}
</style>
