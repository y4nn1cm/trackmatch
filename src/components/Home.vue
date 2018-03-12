<template>
  <v-app>
    <div class="center hidden-md-and-up">
      <img @click="editpicture=!editpicture" :src="profilepicture" class="profile-picture">
      <div v-if="profilepicture === 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCmabCGq2mC6eLOAHLuIHI30k837EGKTzQB7wLe8DNRIIqaR0b'">
        <a @click="editpicture=true" v-if="editpicture === false" style='text-align:center; font-size:2.5vw'>
          <p>press to edit profile picture</p>
        </a>
        <div v-if="editpicture === true">
          <a @click="editpicture=false">
            <p style='text-align:center; margin-bottom:0px; font-size:2.5vw;'>press to close</p>
          </a>
          <form @submit.prevent="pictureUpload">
            <v-text-field name="imageurl" label="PASTE LINK TO IMAGE HERE" id="imageurl" type="imageurl" v-model="imageurl" style="margin-bottom:0; padding-bottom:0">
            </v-text-field>
            <v-btn class="button teal" type="submit" style="margin-top:0; margin-bottom:5vw; padding-top:0; color:white">submit</v-btn>
          </form>
        </div>
      </div>
      <h2>Hello {{ user }}</h2>
      <h3>Great that you are here!</h3>
      <v-layout style=margin-top:5vw row wrap>
        <v-flex class="text-xs-center">
          <div v-if="searchjob">
            <div v-if="ready!=0">
              <v-btn class="teal select" @click="editProfile">First create my profile</v-btn>
              <v-btn disabled @click="openSite('jobmatches')" class="teal select">Show my job matches</v-btn>
            </div>
            <v-btn v-else @click="openSite('jobmatches')" class="teal select">Show my job matches</v-btn>
          </div>
          <div v-else-if="helphiring">
            <div v-if="ready==null">
              <v-btn class="teal select" @click="editProfile">First create my profile</v-btn>
              <v-btn disabled @click="openSite('employeesearch')" class="teal select">create position</v-btn><br>
              <v-btn disabled @click="openSite('candidates')" class="teal select">Show candidate matches</v-btn><br>
              <v-btn disabled @click="openSite('searchlist')" class="teal select">Represent Jobs</v-btn>
            </div>
            <div v-else>
              <div v-if="noentries">
                <v-btn @click="openSite('employeesearch')" class="teal select">Next, create a position</v-btn><br>
                <v-btn disabled @click="openSite('candidates')" class="teal select">Show candidate matches</v-btn><br>
                <v-btn disabled @click="openSite('searchlist')" class="teal select">represent Jobs</v-btn>
              </div>
              <div v-else>
                <v-btn @click="openSite('employeesearch')" class="teal select" style="color:white">create a position</v-btn><br>
                <v-btn @click="openSite('candidates')" class="teal select">Show candidate matches</v-btn><br>
                <v-btn @click="openSite('searchlist')" class="teal select">Represent Jobs</v-btn>
              </div>
            </div>
          </div>
          <div v-else>
            <v-btn class="teal select" @click="togglejobsearch">I am open for a new job</v-btn><br>
            <v-btn class="teal select" @click="togglehiring">our company is hiring</v-btn>
          </div>
        </v-flex>
      </v-layout>
    </div>
  
  
  
    <div class="hidden-sm-and-down">
      <v-layout row wrap style="margin-top:6vw">
        <v-flex md5 style="text-align:center">
          <img @click="editpicture=!editpicture" :src="profilepicture" class="profile-picture-desktop">
        </v-flex>
        <v-flex md7>
          <h2>Hello {{ user }}</h2>
          <h3>Great that you are here!</h3>
        </v-flex>
        <v-flex md3 offset-md1 class="text-md-center" style="margin-top:1vw; text-align:center;">
          <div>
            <a @click="editpicture=true" v-if="editpicture === false" style='text-align:center; font-size:1vw'>
              <p>press to edit profile picture</p>
            </a>
            <div v-if="editpicture === true">
              <a @click="editpicture=false">
                <p style='margin-bottom:0px; font-size:1vw;'>press to close</p>
              </a>
              <form @submit.prevent="pictureUpload">
                <v-text-field name="imageurl" label="PASTE LINK TO IMAGE HERE" id="imageurl" type="imageurl" v-model="imageurl" style="padding-bottom:0">
                </v-text-field>
                <v-btn class="button teal" type="submit" style="margin-top:0; margin-bottom:5vw; padding-top:0; color:white">submit</v-btn>
              </form>
            </div>
          </div>
        </v-flex>
        <v-flex class="text-xs-left" md-7 offset-md1>
          <div v-if="searchjob">
            <div v-if="ready!=0">
              <v-btn class="teal select-desktop" @click="editProfile">First create my profile</v-btn>
              <v-btn disabled @click="openSite('jobmatches')" class="teal select-desktop">Show my job matches</v-btn>
            </div>
            <v-btn v-else @click="openSite('jobmatches')" class="teal select-desktop">Show my job matches</v-btn>
          </div>
          <div v-else-if="helphiring">
            <div v-if="ready!=0">
              <v-btn class="teal select-desktop" @click="editProfile">First create my profile</v-btn>
              <v-btn disabled @click="openSite('employeesearch')" class="teal select-desktop">create position</v-btn><br>
              <v-btn disabled @click="openSite('candidates')" class="teal select-desktop">Show candidate matches</v-btn><br>
              <v-btn disabled @click="openSite('searchlist')" class="teal select-desktop">Represent Jobs</v-btn>
            </div>
            <div v-else>
              <div v-if="noentries">
                <v-btn @click="openSite('employeesearch')" class="teal select-desktop">Next, create a position</v-btn><br>
                <v-btn disabled @click="openSite('candidates')" class="teal select-desktop">Show candidate matches</v-btn><br>
                <v-btn disabled @click="openSite('searchlist')" class="teal select-desktop">represent Jobs</v-btn>
              </div>
              <div v-else>
                <v-btn @click="openSite('employeesearch')" class="teal select-desktop" style="color:white">create a position</v-btn><br>
                <v-btn @click="openSite('candidates')" class="teal select-desktop">Show candidate matches</v-btn><br>
                <v-btn @click="openSite('searchlist')" class="teal select-desktop">Represent Jobs</v-btn>
              </div>
            </div>
          </div>
          <div v-else>
            <v-btn class="teal select-desktop" @click="togglejobsearch">I am open for a new job</v-btn><br>
            <v-btn class="teal select-desktop" @click="togglehiring">our company is hiring</v-btn>
          </div>
        </v-flex>
      </v-layout>
    </div>
  </v-app>
</template>

<script>
  import firebase from "firebase";
  import firestore from "../main";
  export default {
    data() {
      return {
        profilepicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCmabCGq2mC6eLOAHLuIHI30k837EGKTzQB7wLe8DNRIIqaR0b",
        searchjob: null,
        givefeedback: null,
        helphiring: null,
        findevents: null,
        findcoach: null,
        imageurl: "",
        user: "",
        editpicture: false,
        ready: null,
        noentries: true,
        company: null
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
            this.user = doc.data().firstname;
            this.ready = doc.data().pointsleft;
            this.profilepicture = doc.data().profilepicture;
            this.searchjob = doc.data().searchjob;
            this.helphiring = doc.data().helphiring;
            this.givefeedback = doc.data().givefeedback;
            this.findevents = doc.data().findevents;
            this.findcoach = doc.data().findcoach;
            this.company = doc.data().company;
            if (this.company == null) {
              this.company = "";
            }
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
          });
        });
    },
  
    methods: {
      pictureUpload() {
        if (this.imageurl.length > 10) {
          this.editpicture = false;
          this.$store.dispatch("pictureUpload", {
            imageurl: this.imageurl
          });
          firestore
            .collection("Users")
            .where("ID", "==", firebase.auth().currentUser.uid)
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                this.profilepicture = doc.data().profilepicture;
              });
            });
        }
      },
      editProfile: function(event) {
        {
          this.$store.dispatch("openSite", {
            target: "/details"
          });
        }
      },
  
      openSite: function(page) {
        {
          this.$store.dispatch("openSite", {
            target: page
          });
        }
      },
  
      togglejobsearch: function(event) {
        this.searchjob = !this.searchjob;
        this.$store.dispatch("editGoals", {
          givefeedback: this.givefeedback,
          helphiring: this.helphiring,
          searchjob: this.searchjob,
          findevents: this.findevents,
          findcoach: this.findcoach
        });
      },
  
      togglehiring: function(event) {
        this.helphiring = !this.helphiring;
        this.$store.dispatch("editGoals", {
          givefeedback: this.givefeedback,
          helphiring: this.helphiring,
          searchjob: this.searchjob,
          findevents: this.findevents,
          findcoach: this.findcoach
        });
      }
      /*
          togglefeedback: function (event) {
            this.givefeedback = !this.givefeedback
          },
        
          toggleevent: function (event) {
            this.findevents = !this.findevents
          },
        
          togglecoach: function (event) {
            this.findcoach = !this.findcoach
          },
        
          editGoals: function (event) {
            this.$store.dispatch('editGoals', {givefeedback: this.givefeedback, helphiring: this.helphiring, searchjob: this.searchjob, findevents: this.findevents, findcoach: this.findcoach})
            if (this.searchjob==true || this.helphiring==true){
            this.$store.dispatch('openSite', {target: '/start'})
            }
          }
          */
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import url("https://fonts.googleapis.com/css?family=Merriweather");
  .profile-picture {
    width: 30vw;
    height: 30vw;
    border-radius: 50%;
    object-fit: cover;
    margin: 6vw;
  }
  
  .profile-picture-desktop {
    width: 12vw;
    height: 12vw;
    border-radius: 50%;
    object-fit: cover;
  }
  
  #imageurl {
    margin-bottom: 0;
    font-size: 1vw;
  }
  
  .center {
    position: relative;
    text-align: center;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
  
  .select {
    font-size: 4vw;
    margin-top: 2vw;
    margin-bottom: 2vw;
    width: 65vw;
    padding: 0;
    height: 10vw;
    text-align: center;
    color: white;
  }

    .select-desktop {
    font-size: 1.5vw;
    margin-top: 2vw;
    margin-bottom: 2vw;
    width: 25vw;
    padding: 0;
    height: 4vw;
    text-align: left;
    color: white;
  }
  
  .line {
    position: relative;
    width: 100%;
    margin-top: 5%;
    margin-bottom: 5%;
    height: 1px;
    background: #ddd;
    border-radius: 10%;
    line-height: 0px;
  }
  
  h1,
  h2 {
    font-weight: normal;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    display: inline-block;
    margin: 0 10px;
  }
  
  a {
    color: #42b983;
  }
</style>
