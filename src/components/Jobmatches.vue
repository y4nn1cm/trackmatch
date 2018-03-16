<template>
  <div>
    <div class="hidden-md-and-up">
      <h3 style="text-align:center">Loading Jobs in Munich</h3>
      <div class="line" style="margin-top:4vw"></div>
      <div style="margin-top:6vw; text-align:center" v-if="!this.ready">
        <p>
          You see all Jobs that are listed on our platform because you have not selected any job roles yet.
        </p>
        <v-btn style="background-color:rgb(56,174,179); color:white" @click="editProfile">update my profile</v-btn>
      </div>
      <div style="margin-top:6vw; text-align:center " v-if="this.jobs.length==0">
        <p>
          There are currently no jobs for you. Please update your profile and the job roles you are looking for.
        </p>
        <v-btn style="background-color:rgb(56,174,179); color:white" @click="editProfile">Update my profile</v-btn>
      </div>
      <v-card v-for="job in getJobs" :key="job.ID" style="margin-top:8vw; margin-left:0; margin-right:0; padding:1vw; padding-bottom:5vw">
        <v-layout align-top style="margin-top:6vw; text-align:center; margin-right:2vw; margin-left:2vw" row wrap>
          <v-flex xs12>
            <img class="employee-picture" :src="job.logo">
          </v-flex>
          <v-flex xs12>
            <p class="body-2" style="margin-top:0; margin-bottom:0; margin-left:0; padding:0"><a target="_blank" :href="job.website" style="font-color: black; font-weight:500; padding:0">{{job.company}}</a><br>{{job.background1}} / {{job.background2}}
            </p>
          </v-flex>
          <v-flex xs12>
            <p class="title" style="margin-bottom:5vw; margin-top:3vw; padding:0">{{job.description}}</p>
          </v-flex>
  
          <v-flex xs12>
            <p style="text-align:justify; margin-top:0vw; margin-bottom:0; padding:0"><span style="font-weight:600">Job Purpose:</span> {{job.purpose}} <a v-if="job.jobad != null" target="_blank" :href="job.jobad"> - see details</a></p>
          </v-flex>
          <v-flex xs12>
            <p class="body-2" style="margin-top:3vw; margin-bottom:0; padding:0; text-align:center">
              <span class="body-2" style="margin-top:1.4vw; margin-bottom:0; text-align:left"><span class="title">{{job.experience}}</span> years experience preferred</span>
            </p>
          </v-flex>
  
          <v-flex xs12>
  
            <v-expansion-panel expand style="margin-bottom:0; margin-top:5vw">
              <v-expansion-panel-content>
                <div style="font-weight:500" slot="header">Read our Vision</div>
                <v-card>
                  <v-card-text style="text-align:justify">{{job.vision}}</v-card-text>
                </v-card>
              </v-expansion-panel-content>
              <v-expansion-panel-content>
                <div style="font-weight:700" slot="header">Meet the Team</div>
                <v-card v-for="advocate in job.advocates" :key="advocate.ID">
                  <v-card-text>
                    <v-layout row wrap align-top>
                      <v-flex xs4>
                        <img class="advocate-picture" :src="advocate.profilepicture">
                      </v-flex>
                      <v-flex xs8>
                        <p style="font-weight:500; margin-top:0; margin-bottom:0; padding:0">
                          {{advocate.firstname}} {{advocate.lastname}}
                        </p>
                        <p style="font-weight:400; margin-top:0; margin-bottom:1vw; padding:0">
                          {{advocate.background1}} / {{advocate.background2}}
                        </p>
                      </v-flex>
                      <v-flex>
                        <p style="font-weight:500; margin-top:2.5vw; margin-bottom:0vw; padding:0">Why you should join us:</p>
                        <p style="text-align:justify; font-weight:400; margin-top:0; margin-bottom:1vw; padding:0">{{advocate.worklove}}</p>
                        <p style="font-weight:500; margin-top:2.5vw; margin-bottom:0vw; padding:0">About myself:</p>
                        <p style="text-align:justify; font-weight:400; margin-top:0; margin-bottom:1vw; padding:0">{{advocate.goal}}</p>
                        <p style="font-weight:500; margin-top:2.5vw; margin-bottom:0vw; padding:0">Please contact me:</p>
                        <p style="font-weight:400; margin-top:0; margin-bottom:1vw; padding:0">
                          <a :href="`mailto:${advocate.email}`" style="font-weight:400">{{advocate.email}}</a>
                        </p>
                        <p style="font-weight:400; margin-top:0; margin-bottom:1vw; padding:0">
                          <a :href="`tel:${advocate.phone}`" style="font-weight:400">{{advocate.phone}}</a>
                        </p>
                        <p style="font-weight:400; margin-top:0; margin-bottom:0; padding:0">
                          <a target="_blank" :href="advocate.linkedin" style="font-weight:400">LinkedIn / Xing</a>
                        </p>
                      </v-flex>
                    </v-layout>
                    <div class=line style="margin-top:2vw"></div>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
  
            </v-expansion-panel>
            <v-btn class="button select" v-if="job.likedbythisuser" @click="removeLike(job)" style="text-align:left; margin-top:7vw; margin-left:0; padding:0">Remove Like</v-btn>
            <v-btn v-else class="button select" @click="giveLike(job)" style="text-align:left; margin-top:7vw; margin-left:0; padding:0; background-color:rgb(56,174,179); color:white">Like</v-btn>
          </v-flex>
        </v-layout>
      </v-card>
    </div>
  
  
    <div class="hidden-sm-and-down">
      <h3 style="text-align:center">Loading Jobs in Munich</h3>
      <div class="line" style="margin-top:4vw"></div>
      <div style="margin-top:6vw; text-align:center" v-if="!this.ready">
        <p>
          You see all Jobs that are listed on our platform because you have not selected any job roles yet.
        </p>
        <v-btn style="background-color:rgb(56,174,179); color:white" @click="editProfile">update my profile</v-btn>
      </div>
      <div style="margin-top:6vw; text-align:center " v-if="this.jobs.length==0">
        <p>
          There are currently no jobs for you. Please update your profile and the roles you are looking for.
        </p>
        <v-btn style="background-color:rgb(56,174,179); color:white" @click="editProfile">Update my profile</v-btn>
      </div>
      <v-layout row wrap>
        <v-flex style="padding:0.7vw" md4 lg4 xl4 v-for="job in getJobs" :key="job.ID">
          <v-card style="margin-top:3vw; margin-left:0; margin-right:0; padding:0.5vw; padding-bottom:2vw">
            <v-layout align-top style="margin-top:2vw; text-align:center; margin-right:0.5vw; margin-left:0.5vw" row wrap>
              <v-flex xs12>
                <img class="employee-picture-desktop" :src="job.logo">
              </v-flex>
              <v-flex xs12>
                <p class="body-2" style="height:5.5vw; margin-top:0; margin-bottom:0; margin-left:0; padding:0"><a target="_blank" :href="job.website" style="font-color: black; font-weight:500; padding:0">{{job.company}}</a><br>{{job.background1}} / {{job.background2}}
                </p>
              </v-flex>
              <v-flex xs12>
                <p class="title" style="height:2.5vw; margin-bottom:2vw; margin-top:1vw; padding:0">{{job.description}}</p>
              </v-flex>
              <v-flex xs12>
                <p class="body-2" style="margin-top:1vw; margin-bottom:0; padding:0; text-align:left">
                  <span class="body-2" style="margin-top:0.6vw; margin-bottom:0; text-align:left"><span class="title">{{job.experience}}</span> years experience preferred</span>
                </p>
              </v-flex>
              <v-flex xs12>
                <v-expansion-panel expand style="margin-bottom:0; margin-top:2vw">
                  <v-expansion-panel-content>
                    <div style="font-weight:500" slot="header">Job Purpose</div>
                    <v-card>
                      <v-card-text style="text-align:justify">{{job.purpose}} 
                        <a v-if="job.jobad != null" target="_blank" :href="job.jobad"> - see details</a></v-card-text>
                    </v-card>
                  </v-expansion-panel-content>
                  <v-expansion-panel-content>
                    <div style="font-weight:500" slot="header">Read our Vision</div>
                    <v-card>
                      <v-card-text style="text-align:justify">{{job.vision}}</v-card-text>
                    </v-card>
                  </v-expansion-panel-content>
                  <v-expansion-panel-content>
                    <div style="font-weight:700" slot="header">Meet the Team</div>
                    <v-card v-for="advocate in job.advocates" :key="advocate.ID">
                      <v-card-text>
                        <v-layout row wrap align-top>
                          <v-flex xs4>
                            <img class="advocate-picture-desktop" :src="advocate.profilepicture">
                          </v-flex>
                          <v-flex xs8>
                            <p style="font-weight:500; margin-top:0; margin-bottom:0.3vw; padding:0">
                              {{advocate.firstname}} {{advocate.lastname}}
                            </p>
                            <p style="font-weight:400; margin-top:0; margin-bottom:0; padding:0">
                              {{advocate.background1}} / {{advocate.background2}}
                            </p>
                          </v-flex>
                          <v-flex>
                            <p style="font-weight:500; margin-top:1vw; margin-bottom:0; padding:0">Why you should join us:</p>
                            <p style="text-align:justify; font-weight:400; margin-top:0; margin-bottom:1vw; padding:0">{{advocate.worklove}}</p>
                            <p style="font-weight:500; margin-top:1vw; margin-bottom:0vw; padding:0">About myself:</p>
                            <p style="text-align:justify; font-weight:400; margin-top:0; margin-bottom:1vw; padding:0">{{advocate.goal}}</p>
                            <p style="font-weight:500; margin-top:1vw; margin-bottom:0vw; padding:0">Please contact me:</p>
                            <p style="font-weight:400; margin-top:0; margin-bottom:0.5vw; padding:0">
                              <a :href="`mailto:${advocate.email}`" style="font-weight:400">{{advocate.email}}</a>
                            </p>
                            <p style="font-weight:400; margin-top:0; margin-bottom:0.5vw; padding:0">
                              <a :href="`tel:${advocate.phone}`" style="font-weight:400">{{advocate.phone}}</a>
                            </p>
                            <p style="font-weight:400; margin-top:0; margin-bottom:0; padding:0">
                              <a target="_blank" :href="advocate.linkedin" style="font-weight:400">LinkedIn / Xing</a>
                            </p>
                          </v-flex>
                        </v-layout>
                        <div class=line style="margin-top:1vw"></div>
                      </v-card-text>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-btn class="button select-desktop" v-if="job.likedbythisuser" @click="removeLike(job)" style="text-align:left; margin-top:2.5vw; margin-left:0; padding:0">Remove Like</v-btn>
                <v-btn v-else class="button select-desktop" @click="giveLike(job)" style="text-align:left; margin-top:2.5vw; margin-left:0; padding:0; background-color:rgb(56,174,179); color:white">Like</v-btn>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
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
        product: "true",
        design: "true",
        sales: "true",
        customer: "true",
        business: "true",
        operations: "true",
        software: "true",
        ai: "true",
        vrar: "true",
        blockchain: "true",
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
        ready: true,
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
        user: {},
        advocates: []
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
            (this.ID = doc.data().ID)
            /*
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
            */
            if (doc.data().pointsleft<19){
            (this.product = doc.data().product),
            (this.design = doc.data().design),
            (this.business = doc.data().business),
            (this.operations = doc.data().operations),
            (this.software = doc.data().software),
            (this.ai = doc.data().ai),
            (this.sales = doc.data().sales),
            (this.customer = doc.data().customer),
            (this.vrar = doc.data().vrar),
            (this.blockchain = doc.data().blockchain)
            }
            else 
            {
              this.ready = false
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
          ).then(() => {
            this.uniquejobs = uniqBy(this.jobs, "ID")
          })
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
          ).then(() =>
            firestore
            .collection("EmployeeSearches")
            .where("sales", "==", this.sales)
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                this.saveJob(doc);
              });
            })
          ).then(() =>
            firestore
            .collection("EmployeeSearches")
            .where("customer", "==", this.customer)
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
            }).then(() =>
              firestore
              .collection("EmployeeSearches")
              .where("sales", "==", this.sales)
              .get()
              .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  this.saveJob(doc);
                });
              })
            ).then(() =>
              firestore
              .collection("EmployeeSearches")
              .where("customer", "==", this.customer)
              .get()
              .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                  this.saveJob(doc);
                });
              })
            ).then(() => {
              this.uniquejobs = uniqBy(this.jobs, "ID")
            })
          );
      },
      saveJob: function(doc) {
        let data = {
          ID: doc.data().ID,
          description: doc.data().description,
          userlikes: doc.data().userlikes,
          likedbythisuser: this.checkLike(doc.data().userlikes),
          company: doc.data().company,
          website: doc.data().website,
          logo: doc.data().logo,
          jobad: doc.data().jobad,
          background1: doc.data().area1,
          background2: doc.data().area2,
          email: doc.data().email,
          phone: doc.data().phone,
          vision: doc.data().vision,
          experience: doc.data().experiencelevels,
          purpose: doc.data().purpose,
          //strengthsfit: this.calculateStrengthsFit(doc),
          advocates: this.getAdvocates(doc.data().advocates),
          //culturefit: this.calculateCultureFit(doc),
          //fit: (this.strengthsfit + this.culturefit) / 2
        };
        this.jobs.push(data);
      },
  
      getAdvocates: function(advocateids) {
        var advocates = []
        advocateids.forEach(ID => {
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
                  worklove: doc.data().worklove,
                  linkedin: doc.data().linkedin,
                  email: doc.data().email,
                  background1: doc.data().background1,
                  background2: doc.data().background2,
                  phone: doc.data().phone
                };
                advocates.push(data);
              });
            });
        })
        return advocates
      },
  
      editProfile: function(event) {
        {
          this.$store.dispatch("openSite", {
            target: "/details"
          });
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
        job.userlikes.push(this.ID);
        this.$store.dispatch("updateLike", {
          userlikes: job.userlikes,
          job: job.ID
        });
        this.uniquejobs.find(item => (item.ID == job.ID)).likedbythisuser = true;
      },
  
      removeLike: function(job) {
        job.userlikes.splice(job.userlikes.indexOf(this.ID), 1);
        this.$store.dispatch("updateLike", {
          userlikes: job.userlikes,
          job: job.ID
        });
        this.uniquejobs.find(item => (item.ID == job.ID)).likedbythisuser = false;
      },
      checkLike(userlikes) {
        // return userlikes.some(userlikes => userlikes.ID === this.ID);
        return userlikes.includes(this.ID)
      }
    },
    computed: {
      getJobs() {
        this.uniquejobs.sort(function(a, b) {
          return b.id - a.id;
        });
        return this.uniquejobs;
      }
    }
  };
</script>

<style scoped>
  @import url("https://fonts.googleapis.com/css?family=Merriweather");
  .employee-picture {
    width: 10vw;
    height: 10vw;
    border-radius: 10%;
    object-fit: cover;
    margin-top: 3vw;
    margin-bottom: 1vw;
  }
  
  .advocate-picture {
    width: 23vw;
    height: 23vw;
    border-radius: 10%;
    object-fit: cover;
    margin-top: 0;
  }

    .employee-picture-desktop {
    width: 5vw;
    height: 5vw;
    border-radius: 10%;
    object-fit: cover;
    margin-top: 0;
    margin-bottom: 0;
  }
  
  .advocate-picture-desktop {
    width: 7vw;
    height: 7vw;
    border-radius: 10%;
    object-fit: cover;
    margin-top: 0.5vw;
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
    font-size: 3.5vw;
    margin-top: 2vw;
    margin-bottom: 2vw;
    width: 30vw;
    padding: 0;
    height: 10vw;
    text-align: center;
  }

    .select-desktop {
    font-size: 1vw;
    margin-top: 1vw;
    margin-bottom: 1vw;
    width: 10vw;
    padding: 0;
    height: 3vw;
    text-align: center;
  }
</style>
