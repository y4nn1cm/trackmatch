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
      <v-flex>
      <v-expansion-panel expand style="margin-top:5vw; margin-bottom:3vw">
          <v-expansion-panel-content>
      <div style="font-weight:500" slot="header">Job purpose</div>
      <v-card>
        <v-card-text>
        <p style="text-align:justify; margin-bottom:0; padding:0">{{job.purpose}}</p>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
    <v-expansion-panel-content>
      <div style="font-weight:500" slot="header">Contact:</div>
      <v-card>
        <v-card-text>
          <p style="margin-top:0; margin-bottom:0; padding:0">{{job.phone}}</p>  
        <p style="margin-top:0; margin-bottom:0; padding:0">{{job.email}}</p>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
    <v-expansion-panel-content>
      <div style="font-weight:500" slot="header">Candidate Profile</div>
      <v-card>
        <v-card-text>
          <p style="margin-top:0; margin-bottom:1vw; padding:0; text-align:right">Experience: {{job.experience}} years</p>
          <p style="margin-top:0; margin-bottom:0; padding:0; text-align:right">Adaptability: {{job.adaptability}}</p>
          <p style="margin-top:0; margin-bottom:0; padding:0; text-align:right">Detail orientation: {{job.detailorientation}}</p>
          <p style="margin-top:0; margin-bottom:0; padding:0; text-align:right">Perseverence: {{job.perseverence}}</p>
          <p style="margin-top:0; margin-bottom:0; padding:0; text-align:right">Customer centric: {{job.customerorientation}}</p>
          <p style="margin-top:0; margin-bottom:0; padding:0; text-align:right">Collaboration: {{job.collaboration}}</p>
          <p style="margin-top:0; margin-bottom:0; padding:0; text-align:right">Goal orientation: {{job.goalorientation}}</p>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
      </v-expansion-panel>
      </v-flex>
      <v-flex>
        <div v-if="neutral" style="text-align:left">
        <v-btn class="select" v-if="checkAdvocacy(job.advocates)" @click="removeAdvocacy(job)" style="margin-left:0; margin-right:1vw; margin-top:5vw; padding:0">Unrepresent</v-btn>
        <v-btn v-else class="button select teal" @click="becomeAdvocate(job)" style="margin-left:0; margin-right:1vw; margin-top:5vw; padding:0; color:white">Represent Job</v-btn>
        <v-btn class="select" style="margin-left:1vw; margin-right:0; margin-top:5vw; padding:0" @click="neutral = !neutral">Delete Job</v-btn>
        </div>
        <div v-else> 
        <v-btn class="select" @click="deleteJobsearch(job.description)" style="margin:0; padding:0; margin-top:5vw; width:12vw">Confirm</v-btn>
        <v-btn class="select" @click="neutral = !neutral" style="margin:0; margin-top:5vw; padding:0; width:12vw">Cancel</v-btn>
        </div>
      </v-flex>
      <div class="line" style="margin-top:4vw"></div>
    </v-layout>
  </div>
</template>

<script>
import firebase from "firebase";
import firestore from "../main";
import uniqBy from "lodash/uniqBy";

export default {
  data() {
    return {
      jobs: [],
      company: null,
      neutral: true,
      ID: null,
      phone: null,
      email: null,
      linkedin: null,
      profilepicture: null,
      job: null,
      vision: null,
      firstname: null,
      lastname: null,
      goal: null,
      worklove: null,
      advocate: {}
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
          if (doc.data().company != null) {
            this.company = doc.data().company;
          }
          this.ID = doc.data().ID;
          /*
          this.phone = doc.data().phone
          this.email = doc.data().email
          this.linkedin = doc.data().linkedin
          this.profilepicture = doc.data().profilepicture
          this.job = doc.data().goal
          this.vision = doc.data().vision
          */
          if (doc.data().phone != null) {
            this.phone = doc.data().phone;
          }
          if (doc.data().goal != null) {
            this.goal = doc.data().goal;
          }
          if (doc.data().worklove != null) {
            this.worklove = doc.data().worklove;
          }
          if (doc.data().background2 != null) {
            this.background2 = doc.data().background2;
          }
          if (doc.data().background1 != null) {
            this.background1 = doc.data().background1;
          }
          if (doc.data().linkedin != null) {
            this.linkedin = doc.data().linkedin;
          }
          if (doc.data().profilepicture != null) {
            this.profilepicture = doc.data().profilepicture;
          }
        });
      })
      .then(() =>
        firestore
          .collection("EmployeeSearches")
          .where("company", "==", this.company)
          .get()
          .then(querySnapshot => {
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
              };
              this.jobs.push(data);
            });
          })
      );
  },

  methods: {
    becomeAdvocate: function(job) {
      this.advocate = {
        ID: this.ID,
        firstname: this.firstname,
        lastname: this.lastname,
        profilepicture: this.profilepicture,
        goal: this.goal,
        worklove: this.worklove,
        linkedin: this.linkedin,
        email: this.email,
        phone: this.phone
      };
      job.advocates.push(this.advocate);
      this.$store
        .dispatch("updateAdvocacy", {
          job: job.description,
          advocates: job.advocates
        })
        .then(function() {
          console.log("You successfully became an advocate!");
        })
        .catch(function(error) {
          console.error("Error adding advocacy: ", error);
        })
        .then(() =>
          firestore
            .collection("EmployeeSearches")
            .where("company", "==", this.company)
            .get()
            .then(querySnapshot => {
              this.jobs = [];
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
                };
                this.jobs.push(data);
              });
            })
        );
      this.neutral = true;
    },

    removeAdvocacy: function(job) {
      job.advocates.splice(job.advocates.indexOf(this.ID), 1);
      this.$store
        .dispatch("updateAdvocacy", {
          search: job.description,
          advocates: job.advocates
        })
        .then(function() {
          console.log("Advocacy removed");
        })
        .catch(function(error) {
          console.error("Error removing advocacy: ", error);
        })
        .then(() =>
          firestore
            .collection("EmployeeSearches")
            .where("company", "==", this.company)
            .get()
            .then(querySnapshot => {
              this.jobs = [];
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
                };
                this.jobs.push(data);
              });
            })
        );
      this.neutral = true;
    },

    checkAdvocacy(advocates) {
      return advocates.some(advocates => advocates.ID === this.ID);
    },

    deleteJobsearch: function(desc) {
      this.$store
        .dispatch("deleteDocument", {
          document: desc,
          collection: "EmployeeSearches"
        })
        .then(function() {
          console.log("Document successfully deleted!");
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        })
        .then(() =>
          firestore
            .collection("EmployeeSearches")
            .where("company", "==", this.company)
            .get()
            .then(querySnapshot => {
              this.jobs = [];
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
                };
                this.jobs.push(data);
              });
            })
        );
      this.neutral = true;
    }
  },
  computed: {
    getJobs() {
      return uniqBy(this.jobs, "description");
    }
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Merriweather");

.employee-picture {
  width: 10vw;
  height: 10vw;
  border-radius: 10%;
  object-fit: cover;
  margin-top: 1vw;
}
.line {
  position: relative;
  width: 100%;
  height: 1px;
  background: #ddd;
  border-radius: 10%;
  line-height: 0px;
}
.select {
  margin-top: 2vw;
  margin-bottom: 2vw;
  width: 40vw;
  padding: 0;
  height: 10vw;
  text-align: center;
}
</style>
