<template>
  <v-app style="text-align:center">
  
    <div v-if="this.pragmatism>0">
      <h3>Great! Your profile is filled out!</h3>
      <p class="body-2">You can now use our app to help you...</p>
      <p class="blocktext" v-if="this.searchjob"><span class="body-2">Finding a new job:</span><br>Navigate to the <span class="body-2">»Find Jobs«</span> section and check out your matching job offers.</p>
      <p class="blocktext" v-if="this.helphiring"><span class="body-2">Hiring new employees:</span><br>First navigate to the <span class="body-2">»Create Position«</span> section and create a job posting. Job seekers will then see this position. Afterwards you can also go to the <span class="body-2">»Find Employees«</span>      section to contact candidates yourself.</p>
      <p class="blocktext" v-if="this.givefeedback"><span class="body-2">Creating a better company culture:</span><br>unfortunately this feature is not fully implemented yet, but we are doing our best to deliver it as soon as possible. For now, your input is already valuable to create better job postings,
        so it was definitely worth giving it.</p>
    </div>
  
    <div v-else>
      <h3>It's great that you are here!</h3>
      <p class="body-2">First, we have to ask you to fill out your profile...</p>
      <p class="blocktext" v-if="this.searchjob">...to help you <span class="body-2">finding a new job</span>. Afterwards you can check out your matching job offers and get in contact with employees.</p>
      <p class="blocktext" v-if="this.helphiring">...to help you <span class="body-2">hiring new employees</span>. Afterwards you can create open positions and check out candidates.</p>
      <p class="blocktext" v-if="this.givefeedback">...to help you <span class="body-2">creating a better company culture</span>. You can give insights about your desired work environment and feedback about the actual work environment you are working in. Your input is only visible as an aggregated
        and anonymized feedback for the whole company, so that all employees can improve on the company culture together</p>
    </div>
    <v-btn style="background-color:rgb(56,174,179); color:white" @click="openDetails">Edit Profile now</v-btn>
  
  
  
  
  
  </v-app>
</template>

<script>
  import firebase from "firebase";
  import firestore from "../main";
  export default {
    data() {
      return {
        profilepicture: "",
        searchjob: false,
        givefeedback: false,
        helphiring: false,
        findevents: false,
        findcoach: false,
        user: "",
        experience: null,
        pragmatism: null
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
            this.profilepicture = doc.data().profilepicture;
            this.searchjob = doc.data().searchjob;
            this.helphiring = doc.data().helphiring;
            this.givefeedback = doc.data().givefeedback;
            this.findevents = doc.data().findevents;
            this.findcoach = doc.data().findcoach;
            this.experience = doc.data().experience;
            this.pragmatism = doc.data().pragmatism;
          });
        });
    },
    methods: {
      openDetails() {
        this.$store.dispatch("openSite", {
          target: "/details"
        });
      }
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
  
  .blocktext {
    text-align: justify;
    margin-bottom: 5vw;
  }
  
  #imageurl {
    margin-bottom: 0;
    font-size: 2vw;
  }
  
  .center {
    position: relative;
    text-align: center;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
  
  .select {
    margin-top: 2.5%;
    margin-bottom: 2.5%;
    width: 90%;
    padding: 0;
    height: 10vw;
    text-align: center;
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
