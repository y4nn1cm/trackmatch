<template>
  <v-app>
    <div class="center hidden-md-and-up">
      <!-- TO DO : Picture Upload -->
      <input name="imageurl" type="file" style="display:none" ref="fileInput" accept="image/*" @change="pictureUpload">
      <img @click="pickFile" :src="profilepicture" class="profile-picture">
      <h2>Hello {{ user }}</h2>
      <h3>Great that you are here!</h3>
      <v-layout style=margin-top:5vw row wrap>
        <v-flex class="text-xs-center">
          <div v-if="searchjob">
            <div v-if="ready==null">
              <v-btn style="background-color:rgb(56,174,179); color:white" class="select" @click="editProfile">First create my profile</v-btn>
              <v-btn @click="openSite('jobmatches')" style="background-color:rgb(56,174,179); color:white" class="select">Explore Job Opportunities</v-btn>
            </div>
            <v-btn v-else @click="openSite('jobmatches')" style="background-color:rgb(56,174,179); color:white" class="select">Explore Job Opportunities</v-btn>
          </div>
          <div v-else-if="helphiring">
            <div v-if="ready==null">
              <v-btn style="background-color:rgb(56,174,179); color:white" class="select" @click="editProfile">First create my profile</v-btn>
              <v-btn disabled @click="openSite('employeesearch')" style="background-color:rgb(56,174,179); color:white" class="select">create open position</v-btn><br>
              <v-btn disabled @click="openSite('candidates')" style="background-color:rgb(56,174,179); color:white" class="select">represent open position</v-btn><br>
            </div>
            <div v-else>
              <div v-if="noentries">
                <v-btn @click="openSite('employeesearch')" style="background-color:rgb(56,174,179); color:white" class="select">create open position</v-btn><br>
                <v-btn disabled @click="openSite('candidates')" style="background-color:rgb(56,174,179); color:white" class="select">represent open position</v-btn><br>
              </div>
              <div v-else>
                <v-btn @click="openSite('candidates')" style="background-color:rgb(56,174,179); color:white" class="select">represent open position</v-btn><br>
              </div>
            </div>
          </div>
          <div v-else>
            <v-btn class="select" style="background-color:rgb(56,174,179)" @click="togglejobsearch">I am open for a new job</v-btn><br>
            <v-btn class="select" style="background-color:rgb(56,174,179)" @click="togglehiring">our company is hiring</v-btn>
          </div>
        </v-flex>
      </v-layout>
    </div>
  
  
  
    <div class="hidden-sm-and-down">
      <v-layout row wrap align-center style="margin-top:6vw">
        <v-flex md5 style="text-align:center">
          <input name="imageurl" type="file" style="display:none" ref="fileInput" accept="image/*" @change="pictureUpload">
      <img @click="pickFile" :src="profilepicture" class="profile-picture-desktop">
        </v-flex>
        <v-flex md7>
          <h2>Hello {{ user }}</h2>
          <h3>Great that you are here!</h3>
        </v-flex>
        <v-flex style="margin-top:3vw" class="text-xs-left" md-7 offset-md5>
          <div v-if="searchjob">
            <div v-if="ready!=0">
              <v-btn style="background-color:rgb(56,174,179); color:white" class="select-desktop" @click="editProfile">First create my profile</v-btn><br>
              <v-btn @click="openSite('jobmatches')" style="background-color:rgb(56,174,179); color:white" class="select-desktop">Explore Job Opportunities</v-btn><br>
            </div>
            <v-btn v-else @click="openSite('jobmatches')" style="background-color:rgb(56,174,179); color:white" class="select-desktop">Explore Job Opportunities</v-btn><br>
          </div>
          <div v-else-if="helphiring">
            <div v-if="ready!=0">
              <v-btn style="background-color:rgb(56,174,179); color:white" class="select-desktop" @click="editProfile">First create my profile</v-btn><br>
              <v-btn disabled @click="openSite('employeesearch')" style="background-color:rgb(56,174,179); color:white" class="select-desktop"> create open position </v-btn><br>
              <v-btn disabled @click="openSite('candidates')" style="background-color:rgb(56,174,179); color:white" class="select-desktop">represent open position</v-btn><br>
            </div>
            <div v-else>
              <div v-if="noentries">
                <v-btn @click="openSite('employeesearch')" style="background-color:rgb(56,174,179); color:white" class="select-desktop">create open position</v-btn><br>
                <v-btn disabled @click="openSite('candidates')" style="background-color:rgb(56,174,179); color:white" class="select-desktop">represent open position</v-btn><br>
              </div>
              <div v-else>
                <v-btn @click="openSite('candidates')" style="background-color:rgb(56,174,179); color:white" class="select-desktop">represent open position</v-btn><br>
              </div>
            </div>
          </div>
          <div v-else>
            <v-btn style="background-color:rgb(56,174,179); color:white" class="select-desktop" @click="togglejobsearch">I am open for a new job</v-btn><br>
            <v-btn style="background-color:rgb(56,174,179); color:white" class="select-desktop" @click="togglehiring">our company is hiring</v-btn>
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
        image: null,
        user: "",
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
            if (doc.data().profilepicture != null ){
            this.profilepicture = doc.data().profilepicture;
            }
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
      },
      pickFile() {
        this.$refs.fileInput.click();
      },

      pictureUpload(event) {
        const files = event.target.files
        let filename = files[0].name
        if (filename.lastIndexOf(".") <= 0) {
          return alert("please add a valid file");
        }  
        const filereader = new FileReader()
        filereader.addEventListener("load", () => {
          this.profilepicture = filereader.result
        })
        filereader.readAsDataURL(files[0])
        this.image=files[0]
        this.$store.dispatch("pictureUpload", {
          image: this.image
        })
      },
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
    color: white;
  }

    .select-desktop {
    font-size: 1.5vw;
    margin-top: 1.5vw;
    margin-bottom: 1vw;
    width: 25vw;
    padding: 0;
    height: 4vw;
    color: white;
  }
  
  .line {
    position: relative;
    width: 100%;
    height: 1px;
    background: #ddd;
    border-radius: 10%;
    line-height: 0px;
  }
</style>
