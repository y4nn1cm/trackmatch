<template>
  <div>
    <h3 style="text-align:center">Your Job Matches in Munich</h3>
    <div class="line" style="margin-top:4vw"></div>
    <div style="margin-top:6vw; text-align:center " v-if="noSelection()">
    <p>
      You have not selected any job roles. Please edit your profile and select job roles first so we can show your matching jobs.
    </p>
    <v-btn class="teal" style="color:white" @click="editProfile">update my profile</v-btn>
    </div>
    <div style="margin-top:6vw; text-align:center " v-if="this.jobs.length==0">
    <p>
      There are currently no jobs for you. Please update your profile and the roles you are looking for.
    </p>
    <v-btn class="teal" style="color:white;" @click="editProfile">Update my profile</v-btn>
    </div>
    <v-layout align-top style="margin-top:6vw" v-for="job in getJobs" :key="job.description" row wrap>
      <v-flex xs2>
        <img class="employee-picture" :src="job.logo">
      </v-flex>
      <v-flex xs10><p class="title" style="margin-bottom:1vw; margin-left:0; padding:0">{{job.description}}</p>
      <p class="body-2" style="margin-top:0; margin-bottom:0; margin-left:0; padding:0"><a target="_blank" :href="job.website" style="font-color: black; font-weight:500; padding:0">{{job.company}}</a>: {{job.background1}} / {{job.background2}}
      </p>
      </v-flex>
      <v-flex xs12>
        <p style="text-align:justify; margin-top:2vw; margin-bottom:0; padding:0"><span style="font-weight:600">Job purpose:</span> {{job.purpose}} - <a target="_blank" :href="job.jobad"> see details</a></p>
      </v-flex>
      <v-flex xs6>
        <p class="body-2" style="margin-top:2.5vw; margin-bottom:0; padding:0; text-align:left"> 
          Experience in years: <span class="title">{{job.experience}}</span></p>
      </v-flex>
      <v-flex xs4>
        <p class="body-2" style="margin-top:3vw; margin-bottom:1vw; padding:0; text-align:right">Culture fit: </p>
        <p class="body-2" style="margin-top:1.5vw; margin-bottom:0; padding:0; text-align:right">Strengths fit:</p>
        </v-flex>
        <v-flex xs2>
          <p class=title style="margin-top:2.5vw; margin-bottom:1vw; padding:0; text-align:left; color:rgb(34, 120, 207)"> {{job.culturefit}}%</p>
        <p class=title style="margin-top:1.8vw; margin-bottom:5vw; padding:0; text-align:left; color:rgb(34, 120, 207)"> {{job.strengthsfit}}%</p>
        </v-flex>
        
        <!--
        <p style="margin-top:0; margin-bottom:0; padding:0; text-align:right">Adaptability: {{job.adaptability}}</p>
        <p style="margin-top:0; margin-bottom:0; padding:0; text-align:right">Detailorientation: {{job.detailorientation}}</p>
        <p style="margin-top:0; margin-bottom:0; padding:0; text-align:right">Perseverence: {{job.perseverence}}</p>
        <p style="margin-top:0; margin-bottom:0; padding:0; text-align:right">Customerorientation: {{job.customerorientation}}</p>
        <p style="margin-top:0; margin-bottom:0; padding:0; text-align:right">Collaboration: {{job.collaboration}}</p>
        <p style="margin-top:0; margin-bottom:0; padding:0; text-align:right">Goalorientation: {{job.goalorientation}}</p>
        -->

      <v-flex xs12>
        <!--
        <div class="fineline"></div>
        <p style="margin-top:0; margin-bottom:0; padding:0; font-weight:600"> Company vision</p>
        <p style="text-align:justify; margin-bottom:5vw; padding:0">{{job.vision}}</p>
        
        <p style="font-weight:500; margin-top:1.5vw; margin-bottom:0; padding:0">Contact:</p>
        <p style="font-weight:400; margin-top:0.5vw; margin-bottom:0; padding:0">{{job.email}} / {{job.phone}}</p>
        -->
        <v-expansion-panel expand>
          <v-expansion-panel-content>
      <div style="font-weight:500" slot="header">Company Vision</div>
      <v-card>
        <v-card-text>{{job.vision}}</v-card-text>
      </v-card>
    </v-expansion-panel-content>
    <v-expansion-panel-content>
      <div style="font-weight:500" slot="header">See Job Representatives</div>
      <v-card v-for="advocate in job.advocates" :key="advocate.ID">
        <v-card-text>
         <v-layout row wrap>
           <v-flex xs4>
             <img class="advocate-picture" :src="advocate.image">
           </v-flex>
           <v-flex xs8>
          <p style="font-weight:500; margin-top:0; margin-bottom:1vw; padding:0">
        {{advocate.firstname}} {{advocate.lastname}}
      </p>
          <p style="font-weight:400; margin-top:0; margin-bottom:1vw; padding:0">
        <a target="_blank" :href="advocate.linkedin" style="font-weight:400">LinkedIn / Xing</a>
      </p>
          <p style="font-weight:400; margin-top:0; margin-bottom:1vw; padding:0">
        <a :href="`mailto:${advocate.email}`" style="font-weight:400">{{advocate.email}}</a>
      </p> 
          <p style="font-weight:400; margin-top:0; margin-bottom:0; padding:0">
         <a :href="`tel:${advocate.email}`" style="font-weight:400">{{advocate.phone}}</a>
      </p> 
      </v-flex>
      <v-flex>
        <p style="font-weight:500; margin-top:2.5vw; margin-bottom:0vw; padding:0">Why you should join us:</p>
        <p style="font-weight:400; margin-top:0; margin-bottom:1vw; padding:0">{{advocate.worklove}}</p>
        <p style="font-weight:500; margin-top:2.5vw; margin-bottom:0vw; padding:0">About me:</p>
        <p style="font-weight:400; margin-top:0; margin-bottom:1vw; padding:0">{{advocate.goal}}</p>
      </v-flex>
      </v-layout>
      <div class=line style="margin-top:2vw"></div>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
    <v-expansion-panel-content>
      <div style="font-weight:500" slot="header">Application Contact</div>
      <v-card>
        <v-card-text>
          <p style="font-weight:500; margin-top:0; margin-bottom:1vw; padding:0">
        {{job.name}}
      </p>
        <p style="font-weight:400; margin-top:0; margin-bottom:1vw; padding:0">
        <a :href="`mailto:${job.email}`" style="font-weight:400">{{job.email}}</a>
      </p> 
          <p style="font-weight:400; margin-top:0; margin-bottom:0; padding:0">
         <a :href="`tel:${job.email}`" style="font-weight:400">{{job.phone}}</a></p>
         </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
        <v-btn class="button select" v-if="checkLike(job.userlikes)" @click="removeLike(job)" style="margin:5vw; margin-left:0; padding:0">Remove Like</v-btn>
        <v-btn v-else class="button select teal" @click="giveLike(job)" style="margin:5vw; margin-left:0; padding:0; color:white">Like</v-btn>
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
      activities: [],
      ID: null,
      firstname: null,
      lastname: null,
      profilepicture: null,
      background1: null,
      experience: null,
      background2: null,
      adaptability: null,
      perseverence: null,
      collaboration: null,
      goalorientation: null,
      detailorientation: null,
      customerorientation: null,
      pragmatism: 0,
      teamwork: 0,
      athmosphere: 0,
      moneysatisfaction: 0,
      leadership: 0,
      roles: 0,
      freedom: 0,
      product: false,
      design: false,
      business: false,
      operations: false,
      software: false,
      ai: false,
      vrar: false,
      blockchain: false,
      leadership: null,
      athmosphere: null,
      roles: null,
      moneysatisfaction: null,
      freedom: null,
      teamwork: null,
      pragmatism: null,
      jobs: [],
      uniquejobs: [],
      email: null,
      whyme: "",
      goal: "",
      linkedin: null,
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
      user: {}
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
          if (doc.data().pointsleft < 19) {
            (this.ID = doc.data().ID),
              (this.firstname = doc.data().firstname),
              (this.lastname = doc.data().lastname),
              (this.profilepicture = doc.data().profilepicture),
              (this.experience = doc.data().experience),
              (this.background1 = doc.data().background1),
              (this.adaptability = doc.data().adaptability),
              (this.goalorientation = doc.data().goalorientation),
              (this.detailorientation = doc.data().detailorientation),
              (this.customerorientation = doc.data().customerorientation),
              (this.perseverence = doc.data().perseverence),
              (this.collaboration = doc.data().collaboration),
              (this.leadership = doc.data().leadership),
              (this.athmosphere = doc.data().athmosphere),
              (this.roles = doc.data().roles),
              (this.moneysatisfaction = doc.data().moneysatisfaction),
              (this.freedom = doc.data().freedom),
              (this.teamwork = doc.data().teamwork),
              (this.pragmatism = doc.data().pragmatism),
              (this.product = doc.data().product),
              (this.design = doc.data().design),
              (this.business = doc.data().business),
              (this.operations = doc.data().operations),
              (this.software = doc.data().software),
              (this.ai = doc.data().ai),
              (this.vrar = doc.data().vrar),
              (this.blockchain = doc.data().blockchain);
            if (doc.data().whyme != null) {
              this.whyme = doc.data().whyme;
            }
            if (doc.data().phone != null) {
              this.phone = doc.data().phone;
            }
            if (doc.data().goal != null) {
              this.goal = doc.data().goal;
            }
            if (doc.data().background2 != null) {
              this.background2 = doc.data().background2;
            }
            if (doc.data().linkedin != null) {
              this.linkedin = doc.data().linkedin;
            }
          }
        });
      })
      .then(() =>
        firestore
          .collection("EmployeeSearches")
          .where("product", "==", this.product)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              this.saveJob(doc);
            });
          })
          .then(() =>
            firestore
              .collection("EmployeeSearches")
              .where("design", "==", this.design)
              .get()
              .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  this.saveJob(doc);
                });
              })
          )
          .then(() =>
            firestore
              .collection("EmployeeSearches")
              .where("business", "==", this.business)
              .get()
              .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  this.saveJob(doc);
                });
              })
          )
          .then(() =>
            firestore
              .collection("EmployeeSearches")
              .where("operations", "==", this.operations)
              .get()
              .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  this.saveJob(doc);
                });
              })
          )
          .then(() =>
            firestore
              .collection("EmployeeSearches")
              .where("software", "==", this.software)
              .get()
              .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  this.saveJob(doc);
                });
              })
          )
          .then(() =>
            firestore
              .collection("EmployeeSearches")
              .where("ai", "==", this.ai)
              .get()
              .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  this.saveJob(doc);
                });
              })
          )
          .then(() =>
            firestore
              .collection("EmployeeSearches")
              .where("vrar", "==", this.vrar)
              .get()
              .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  this.saveJob(doc);
                });
              })
          )
          .then(() =>
            firestore
              .collection("EmployeeSearches")
              .where("blockchain", "==", this.blockchain)
              .get()
              .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  this.saveJob(doc);
                });
              })
          )
      );
  },

  methods: {
    getallJobs: function() {
      firestore
        .collection("EmployeeSearches")
        .where("product", "==", this.product)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.saveJob(doc);
          });
        })
        .then(() =>
          firestore
            .collection("EmployeeSearches")
            .where("design", "==", this.design)
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                this.saveJob(doc);
              });
            })
        )
        .then(() =>
          firestore
            .collection("EmployeeSearches")
            .where("business", "==", this.business)
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                this.saveJob(doc);
              });
            })
        )
        .then(() =>
          firestore
            .collection("EmployeeSearches")
            .where("operations", "==", this.operations)
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                this.saveJob(doc);
              });
            })
        )
        .then(() =>
          firestore
            .collection("EmployeeSearches")
            .where("software", "==", this.software)
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                this.saveJob(doc);
              });
            })
        )
        .then(() =>
          firestore
            .collection("EmployeeSearches")
            .where("ai", "==", this.ai)
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                this.saveJob(doc);
              });
            })
        )
        .then(() =>
          firestore
            .collection("EmployeeSearches")
            .where("vrar", "==", this.vrar)
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                this.saveJob(doc);
              });
            })
        )
        .then(() =>
          firestore
            .collection("EmployeeSearches")
            .where("blockchain", "==", this.blockchain)
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                this.saveJob(doc);
              });
            })
        );
    },

    saveJob: function(doc) {
      let data = {
        userlikes: doc.data().userlikes,
        company: doc.data().company,
        website: doc.data().website,
        logo: doc.data().logo,
        jobad: doc.data().jobad,
        background1: doc.data().area1,
        background2: doc.data().area2,
        description: doc.data().description,
        email: doc.data().email,
        phone: doc.data().phone,
        vision: doc.data().vision,
        experience: doc.data().experiencelevels,
        purpose: doc.data().purpose,
        strengthsfit: this.calculateStrengthsFit(doc),
        advocates: doc.data().advocates,
        culturefit: this.calculateCultureFit(doc),
        fit: (this.strengthsfit + this.culturefit) / 2
      };
      this.jobs.push(data);
    },

    editProfile: function(event) {
      {
        this.$store.dispatch("openSite", { target: "/details" });
      }
    },

    noSelection() {
      if (
        this.design == false &&
        this.product == false &&
        this.business == false &&
        this.operations == false &&
        this.ai == false &&
        this.vrar == false &&
        this.software == false &&
        this.blockchain == false
      ) {
        return true;
      }
    },
    calculateStrengthsFit(doc) {
      this.adaptabilityfit = Math.abs(
        this.adaptability - doc.data().adaptability
      );
      this.collaborationfit = Math.abs(
        this.collaboration - doc.data().collaboration
      );
      this.perseverencefit = Math.abs(
        this.perseverence - doc.data().perseverence
      );
      this.goalorientationfit = Math.abs(
        this.goalorientation - doc.data().goalorientation
      );
      this.detailorientationfit = Math.abs(
        this.detailorientation - doc.data().detailorientation
      );
      this.customerorientationfit = Math.abs(
        this.customerorientation - doc.data().customerorientation
      );
      this.strengthsfit =
        100 -
        2.77 *
          (this.adaptabilityfit +
            this.collaborationfit +
            this.perseverencefit +
            this.goalorientationfit +
            this.detailorientationfit +
            this.customerorientationfit);
      this.strengthsfit = Math.floor(this.strengthsfit);
      return this.strengthsfit;
    },
    calculateCultureFit(doc) {
      this.pragmatismfit = Math.abs(this.pragmatism - doc.data().pragmatism);
      this.leadershipfit = Math.abs(this.leadership - doc.data().leadership);
      this.athmospherefit = Math.abs(this.athmosphere - doc.data().athmosphere);
      this.rolesfit = Math.abs(this.roles - doc.data().roles);
      this.moneysatisfactionfit = Math.abs(
        this.moneysatisfaction - doc.data().moneysatisfaction
      );
      this.freedomfit = Math.abs(this.freedom - doc.data().freedom);
      this.teamworkfit = Math.abs(this.teamwork - doc.data().teamwork);
      this.culturefit =
        100 -
        2.85 *
          (this.pragmatismfit +
            this.leadershipfit +
            this.athmospherefit +
            this.rolesfit +
            this.moneysatisfactionfit +
            this.freedomfit +
            this.teamworkfit);
      this.culturefit = Math.floor(this.culturefit);
      return this.culturefit;
    },

    giveLike: function(job) {
      this.user = {
        ID: this.ID,
        firstname: this.firstname,
        lastname: this.lastname,
        profilepicture: this.profilepicture,
        goal: this.goal,
        whyme: this.whyme,
        linkedin: this.linkedin,
        culturefit: job.culturefit,
        strengthsfit: job.strengthsfit,
        email: this.email,
        phone: this.phone
      };
      job.userlikes.push(this.user);
      this.$store.dispatch("updateLike", {
        userlikes: job.userlikes,
        job: job.description
      });
      this.jobs = [];
      this.getallJobs();
    },

    removeLike: function(job) {
      job.userlikes.splice(job.userlikes.indexOf(this.ID), 1);
      this.$store.dispatch("updateLike", {
        userlikes: job.userlikes,
        job: job.description
      });
      this.jobs = [];
      this.getallJobs();
    },
    checkLike(userlikes) {
      return userlikes.some(userlikes => userlikes.ID === this.ID);
    }
  },
  computed: {
    getJobs() {
      this.uniquejobs = uniqBy(this.jobs, "description");
      this.uniquejobs.sort(function(a, b) {
        return b.fit - a.fit;
      });
      return this.uniquejobs;
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
}
.advocate-picture {
  width: 23vw;
  height: 23vw;
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
.fineline {
  position: relative;
  width: 40%;
  height: 1px;
  background: #ddd;
  border-radius: 10%;
  line-height: 0px;
  margin-top: 2.5vw;
  margin-bottom: 2.5vw;
}
.select {
  margin-top: 2vw;
  margin-bottom: 2vw;
  width: 30vw;
  padding: 0;
  height: 10vw;
  text-align: center;
}
</style>
