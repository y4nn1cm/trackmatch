<template>
  <div>
    <h3 style="text-align:center">Candidates in Munich</h3>
    <h4>What are you looking for?</h4>
        <p class="body-2">Business and Product</p>
        <v-checkbox style="margin:0; padding:0" label="Product Management and Conceptualization" v-model="product" value=true></v-checkbox>
        <v-checkbox style="margin:0; padding:0" label="Design and User Experience" v-model="design" value=true></v-checkbox>
        <v-checkbox style="margin:0; padding:0" label="Operations / Finance" v-model="operations" value=true></v-checkbox>
        <v-checkbox style="margin:0; padding:0" label="Business Development / Marketing" v-model="business" value=true></v-checkbox>
        <p class="body-2">Technology</p>
        <v-checkbox style="margin:0; padding:0" label="Software / Web Development" v-model="software" value=true></v-checkbox>
        <v-checkbox style="margin:0; padding:0" label="Virtual / Augmented Reality" v-model="vrar" value=true></v-checkbox>
        <v-checkbox style="margin:0; padding:0" label="Artificial Intelligence" v-model="ai" value=true></v-checkbox>
        <v-checkbox style="margin:0; padding:0" label="Blockchain" v-model="blockchain" value=true></v-checkbox>
        <div style=text-align:center>
    <v-btn primary class="button" @click="getCandidates" style="margin:3vw; padding-top:0">See Candidates</v-btn>
    </div>
    <div class="line" style="margin-top:4vw"></div>
    <v-layout align-top style="margin-top:6vw" v-for="candidate in getJobCandidates" :key="candidate.uid" row wrap>
      <v-flex xs2>
        <img class="employee-picture" :src="candidate.image">
      </v-flex>
      <v-flex class="body-2" xs10><p style="margin-top:0; margin-bottom:0.5vw; margin-left:0; padding:0">{{candidate.firstname}} {{candidate.lastname}}</p>
      <p style="margin-top:0; margin-bottom:0; margin-left:0; padding:0">{{candidate.background1}} / {{candidate.background2}}
      </p>
      </v-flex>
      <v-flex xs12>
        <p style="margin-top:1vw; margin-bottom:0; padding:0" class="body-2">Job Goal:</p>
        <p style="text-align:justify; margin-bottom:0; padding:0">{{candidate.goal}}</p>
      </v-flex>
      <v-flex xs6>
        <p style="margin-top:2.5vw; margin-bottom:2.5vw; padding:0; font-weight:500;">Experience: {{candidate.experience}} years</p>
        <a :href="candidate.linkedin">See profile</a>
        <p style="font-weight:500; margin-top:2.5vw; margin-bottom:0; padding:0">Contact:</p>
        <p style="margin-top:0; margin-bottom:0; padding:0">{{candidate.phone}}</p>  
        <p style="margin-top:0; margin-bottom:0; padding:0">{{candidate.email}}</p>
        <p style="margin-top:1.5vw; margin-bottom:0; padding:0" class="body-2">Culture fit: coming soon</p>
      </v-flex>
      <v-flex xs6>
        <p style="font-weight:500; margin-top:2.5vw; margin-bottom:1vw; padding:0; text-align:right">Candidate Profile:</p>
        <p style="margin-top:0; margin-bottom:0.15vw; padding:0; text-align:right">Adaptability: {{candidate.adaptability}}</p>
        <p style="margin-top:0; margin-bottom:0.15vw; padding:0; text-align:right">Detailorientation: {{candidate.detailorientation}}</p>
        <p style="margin-top:0; margin-bottom:0.15vw; padding:0; text-align:right">Perseverence: {{candidate.perseverence}}</p>
        <p style="margin-top:0; margin-bottom:0.15vw; padding:0; text-align:right">Customerorientation: {{candidate.customerorientation}}</p>
        <p style="margin-top:0; margin-bottom:0.15vw; padding:0; text-align:right">Collaboration: {{candidate.collaboration}}</p>
        <p style="margin-top:0; margin-bottom:0; padding:0; text-align:right">Goalorientation: {{candidate.goalorientation}}</p>  
      </v-flex>
      <v-flex xs12>
        <p style="margin-top:2.5vw; margin-bottom:0; padding:0" class="body-2">Vision</p>
        <p style="text-align:justify; margin-bottom:0; padding:0">{{candidate.vision}}</p>
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
        candidates: [],
        email: null,
        phone: null,
      }
    },

    created () {
    window.scrollTo(0, 0)
},

methods: {
    getCandidates () {
    this.candidates = []
    firestore.collection('Candidates').where('product', '==', this.product).get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let data = {
        image: doc.data().profilepicture,
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
        experience: doc.data().experience,
        firstname: doc.data().firstname,
        lastname: doc.data().lastname,
        background1: doc.data().background1,
        background2: doc.data().background2,
        goal: doc.data().goal,
        linkedin: doc.data().linkedin,
        ID: doc.data().ID
        }
        this.candidates.push(data)
        })
    }).then(() => firestore.collection('Candidates').where('design', '==', this.design).get().then(querySnapshot => {
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
        ID: doc.data().ID
        }
        this.candidates.push(data)
        })
    })).then(() => firestore.collection('Candidates').where('business', '==', this.business).get().then(querySnapshot => {
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
        ID: doc.data().ID
        }
        this.candidates.push(data)
        })
    })).then(() => firestore.collection('Candidates').where('operations', '==', this.operations).get().then(querySnapshot => {
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
        ID: doc.data().ID
        }
        this.candidates.push(data)
        })
    })).then(() => firestore.collection('Candidates').where('software', '==', this.software).get().then(querySnapshot => {
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
        ID: doc.data().ID
        }
        this.candidates.push(data)
        })
    })).then(() => firestore.collection('Candidates').where('ai', '==', this.ai).get().then(querySnapshot => {
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
        ID: doc.data().ID
        }
        this.candidates.push(data)
        })
    })).then(() => firestore.collection('Candidates').where('vrar', '==', this.vrar).get().then(querySnapshot => {
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
        ID: doc.data().ID
        }
        this.candidates.push(data)
        })
    })).then(() => firestore.collection('Candidates').where('blockchain', '==', this.blockchain).get().then(querySnapshot => {
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
        ID: doc.data().ID
        }
        this.candidates.push(data)
        })
    }))
  }
},

  computed:
  {
    getJobCandidates (){
    return uniqBy(this.candidates, 'ID');
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
