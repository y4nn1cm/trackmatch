<template>
  <div>
    <h3 v-if="select" style="text-align:center">Press a job to find candidates</h3>
    <div v-else style="text-align:center">
      <h3 style="text-align:center; margin-bottom:0">Candidates for</h3>
      <p class="title" style="margin-top:0">{{description}}</p>
      <v-btn class="select" style="background-color:rgb(56,174,179); color:white; width:50vw" @click="select=true; candidates = []">Back to Job postings</v-btn>
    </div>
    <p style="text-align:center" v-if="noentries">Please create a position to find employees.</p>
    <v-layout v-if="select" row wrap v-for="item in searchitems" :key="item.ID">
      <div class="line" style="margin-top:6vw; margin-bottom:2vw"></div>
      <v-flex xs2 @click="getCandidates(item)">
        <img class="logo-picture" style="margin-top:3vw" :src="item.logo">
      </v-flex>
      <v-flex xs10 @click="getCandidates(item)">
        <p class="title" style="margin-top:3vw; margin-bottom:1.5vw; margin-left:0; padding:0">{{item.description}}</p>
      </v-flex>
      <v-flex>
        <v-expansion-panel style="margin-top:3vw">
          <v-expansion-panel-content>
            <div style="font-weight:500" slot="header">Job description</div>
            <v-card>
              <v-card-text>
                {{item.purpose}}
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
              <div style="font-weight:700" slot="header">See likes of job seekers</div>
              <v-card v-for="like in item.likes" :key="like.ID">
                <v-card-text>
                  <v-layout row wrap>
                    <v-flex xs4>
                      <img class="seeker-picture" :src="like.profilepicture">
                    </v-flex>
                    <v-flex xs8>
                      <p style="font-weight:500; margin-top:0; margin-bottom:1vw; padding:0">
                        {{like.firstname}} {{like.lastname}}
                      </p>
                      <p style="font-weight:400; margin-top:0; margin-bottom:1vw; padding:0">
                        {{like.background1}} / {{like.background2}}
                      </p>
                      <p style="font-weight:400; margin-top:0; margin-bottom:1vw; padding:0">
                        <a target="_blank" :href="like.linkedin" style="font-weight:400">LinkedIn / Xing</a>
                      </p>
                    </v-flex>
                    <v-flex>
                      <p style="font-weight:500; margin-top:2.5vw; margin-bottom:0vw; padding:0">Why you should hire me:</p>
                      <p style="text-align:justify; font-weight:400; margin-top:0; margin-bottom:1vw; padding:0">{{like.whyme}}</p>
                      <p style="font-weight:500; margin-top:2.5vw; margin-bottom:0vw; padding:0">About myself:</p>
                      <p style="text-align:justify; font-weight:400; margin-top:0; margin-bottom:1vw; padding:0">{{like.goal}}</p>
                      <p style="font-weight:500; margin-top:2.5vw; margin-bottom:0vw; padding:0">Please contact me:</p>
                      <p style="font-weight:400; margin-top:0; margin-bottom:1vw; padding:0">
                        <a :href="`mailto:${like.email}`" style="font-weight:400">{{like.email}}</a>
                      </p>
                      <p style="font-weight:400; margin-top:0; margin-bottom:0; padding:0">
                        <a :href="`tel:${like.phone}`" style="font-weight:400">{{like.phone}}</a>
                      </p>
                    </v-flex>
                  </v-layout>
                  <div class=line style="margin-top:2vw"></div>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
    <v-card v-for="candidate in getJobCandidates" :key="candidate.ID" row wrap style="margin-top:8vw; padding-top:5vw; padding-bottom:5vw; padding-left:4vw; padding-right:4vw">
      <v-layout align-top style="text-align:center" row wrap>
        <v-flex xs12>
          <img class="seeker-picture" :src="candidate.image">
        </v-flex>
        <v-flex xs12>
          <p class="title" style="margin-bottom:2vw; margin-top:2vw; padding:0">{{candidate.firstname}} {{candidate.lastname}}</p>
        </v-flex>
        <v-flex xs12>
          <p class="body-2" style="margin-top:0; margin-bottom:3vw; margin-left:0; padding:0">
            {{candidate.background1}} / {{candidate.background2}}
          </p>
        </v-flex>
        <v-flex xs12>
          <p style="text-align:justify; margin-top:0vw; margin-bottom:0; padding:0"><span style="font-weight:600">My job goal:</span> {{candidate.goal}}</p>
        </v-flex>
        <v-flex xs12>
          <p class="body-2" style="margin-top:3vw; margin-bottom:0; padding:0; text-align:left">
            <span class="body-2" style="margin-top:1.4vw; margin-bottom:0; text-align:left"><span class="title">{{candidate.experience}}</span> years experience</span>
          </p>
        </v-flex>
        <v-flex xs12>
          <v-expansion-panel expand style="margin-bottom:2vw; margin-top:5vw">
            <v-expansion-panel-content>
              <div style="font-weight:500" slot="header">Why you should hire me</div>
              <v-card>
                <v-card-text>{{candidate.whyme}}</v-card-text>
              </v-card>
            </v-expansion-panel-content>
            <v-expansion-panel-content>
              <div style="font-weight:500" slot="header">Contact</div>
              <v-card>
                <v-card-text>
                  <p style="font-weight:400; margin-top:0; margin-bottom:1vw; padding:0">
                    <a target="_blank" :href="candidate.linkedin" style="font-weight:400">LinkedIn / Xing</a>
                  </p>
                  <p style="font-weight:400; margin-top:0; margin-bottom:1vw; padding:0">
                    <a :href="`mailto:${candidate.email}`" style="font-weight:400">{{candidate.email}}</a>
                  </p>
                  <p style="font-weight:400; margin-top:0; margin-bottom:0; padding:0">
                    <a :href="`tel:${candidate.email}`" style="font-weight:400">{{candidate.phone}}</a>
                  </p>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
  import firebase from "firebase";
  import firestore from "../main";
  import uniqBy from "lodash/uniqBy";
  
  export default {
    data() {
      return {
        select: true,
        activities: [],
        company: null,
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
        searchitems: [],
        noentries: true,
        description: null,
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
            this.company = doc.data().company;
          });
        })
        .then(() =>
          firestore
          .collection("EmployeeSearches")
          .where("company", "==", this.company)
          .get()
        )
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.noentries = false;
            let data = {
              ID: doc.data().ID,
              description: doc.data().description,
              purpose: doc.data().purpose,
              logo: doc.data().logo,
              design: doc.data().logo,
              business: doc.data().business,
              product: doc.data().product,
              operations: doc.data().operations,
              software: doc.data().software,
              vrar: doc.data().vrar,
              blockchain: doc.data().blockchain,
              ai: doc.data().ai,
              sales: doc.data().sales,
              customer: doc.data().customer,
              likes: this.getLikes(doc.data().userlikes),
            };
            this.searchitems.push(data);
          });
        });
    },
  
    methods: {
      getLikes: function(userlikes) {
        var likes = []
        userlikes.forEach(ID => {
          firestore
            .collection("Users")
            .where("ID", "==", ID)
            .get().then(querySnapshot => {
              querySnapshot.forEach(doc => {
                let data = {
                  ID: doc.data().ID,
                  firstname: doc.data().firstname,
                  lastname: doc.data().lastname,
                  profilepicture: doc.data().profilepicture,
                  goal: doc.data().goal,
                  whyme: doc.data().whyme,
                  linkedin: doc.data().linkedin,
                  email: doc.data().email,
                  background1: doc.data().background1,
                  background2: doc.data().background2,
                  phone: doc.data().phone
                };
                likes.push(data);
              });
            });
        })
        return likes
      },

      getCandidates(item) {
        this.candidates = [];
        firestore
          .collection("EmployeeSearches")
          .where("ID", "==", item.ID)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              (this.leadership = doc.data().leadership),
              (this.moneysatisfaction = doc.data().moneysatisfaction),
              (this.freedom = doc.data().freedom),
              (this.roles = doc.data().roles),
              (this.teamwork = doc.data().teamwork),
              (this.athmosphere = doc.data().athmosphere),
              (this.pragmatism = doc.data().pragmatism),
              (this.adaptability = doc.data().adaptability),
              (this.collaboration = doc.data().collaboration),
              (this.perseverence = doc.data().perseverence),
              (this.customerorientation = doc.data().customerorientation),
              (this.detailorientation = doc.data().detailorientation),
              (this.goalorientation = doc.data().goalorientation);
            });
          })
          .then(() =>
            firestore
            .collection("Users")
            .where("design", "==", item.design)
            .where("searchjob", "==", true)
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                this.saveCandidate(doc);
              });
            })
            .then(() =>
              firestore
              .collection("Users")
              .where("product", "==", item.product)
              .where("searchjob", "==", true)
              .get()
              .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  this.saveCandidate(doc);
                });
              })
            )
            .then(() =>
              firestore
              .collection("Users")
              .where("business", "==", item.business)
              .where("searchjob", "==", true)
              .get()
              .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  this.saveCandidate(doc);
                });
              })
            )
            .then(() =>
              firestore
              .collection("Users")
              .where("operations", "==", item.operations)
              .where("searchjob", "==", true)
              .get()
              .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  this.saveCandidate(doc);
                });
              })
            )
            .then(() =>
              firestore
              .collection("Users")
              .where("software", "==", item.software)
              .where("searchjob", "==", true)
              .get()
              .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  this.saveCandidate(doc);
                });
              })
            )
            .then(() =>
              firestore
              .collection("Users")
              .where("ai", "==", item.ai)
              .where("searchjob", "==", true)
              .get()
              .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  this.saveCandidate(doc);
                });
              })
            )
            .then(() =>
              firestore
              .collection("Users")
              .where("vrar", "==", item.vrar)
              .where("searchjob", "==", true)
              .get()
              .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  this.saveCandidate(doc);
                });
              })
            )
            .then(() =>
              firestore
              .collection("Users")
              .where("blockchain", "==", item.blockchain)
              .where("searchjob", "==", true)
              .get()
              .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  this.saveCandidate(doc);
                });
              }).then(() =>
                firestore
                .collection("Users")
                .where("sales", "==", item.sales)
                .where("searchjob", "==", true)
                .get()
                .then(querySnapshot => {
                  querySnapshot.forEach(doc => {
                    this.saveCandidate(doc);
                  });
                })
              ).then(() =>
                firestore
                .collection("Users")
                .where("customer", "==", item.customer)
                .where("searchjob", "==", true)
                .get()
                .then(querySnapshot => {
                  querySnapshot.forEach(doc => {
                    this.saveCandidate(doc);
                  });
                })
              )
            )
          );
        this.select = false;
        this.uniquejobs = uniqBy(this.jobs, "ID");
        this.description = item.description;
        window.scrollTo(0, 0);
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
      bookMark(candidate) {
        /*
        this.$store.dispatch("updateBookmark", {
            bookmarks: this.bookmarks,
            ID: this.ID
          }); 
          */
      },
  
  
      saveCandidate: function(doc) {
        let data = {
          image: doc.data().profilepicture,
          adaptability: doc.data().adaptability,
          perseverence: doc.data().perseverence,
          collaboration: doc.data().collaboration,
          goalorientation: doc.data().goalorientation,
          customerorientation: doc.data().customerorientation,
          detailorientation: doc.data().detailorientation,
          email: doc.data().email,
          phone: doc.data().phone,
          whyme: doc.data().whyme,
          experience: doc.data().experience,
          firstname: doc.data().firstname,
          lastname: doc.data().lastname,
          background1: doc.data().background1,
          background2: doc.data().background2,
          goal: doc.data().goal,
          linkedin: doc.data().linkedin,
          ID: doc.data().ID,
          //strengthsfit: this.calculateStrengthsFit(doc),
          //culturefit: this.calculateCultureFit(doc),
          //fit: (this.strengthsfit + this.culturefit) / 2
        };
        this.candidates.push(data);
      }
    },
    computed: {
      getJobCandidates() {
        this.uniquecandidates = uniqBy(this.candidates, "ID");
        this.uniquecandidates.sort(function(a, b) {
          return b.ID - a.ID;
        });
        return this.uniquecandidates;
      }
    }
  };
</script>

<style>
  @import url("https://fonts.googleapis.com/css?family=Merriweather");
  
  .seeker-picture {
    width: 20vw;
    height: 20vw;
    border-radius: 10%;
    object-fit: cover;
  }
  
  .logo-picture {
    width: 10vw;
    height: 10vw;
    border-radius: 10%;
    object-fit: cover;
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
    padding: 0;
    height: 10vw;
    font-size: 3.5vw;
    text-align: center;
    color: white;
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
</style>
