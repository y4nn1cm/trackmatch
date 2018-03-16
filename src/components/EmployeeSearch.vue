<template>
  <v-app>
    <div class="hidden-md-and-up">
    <p v-if="nocompany">Before creating a position, please fill out your profile and provide which company you are working for.</p>
    <div v-else>
      <h3 style="text-align:center">New Team Members For {{forcompany}}</h3>
      <div class="line" style="margin-top:5vw"></div>
      <h4 style="font-weight:500">About {{forcompany}}</h4>
      <form @submit.prevent="createEmployeeSearch">
      <v-layout align-center row wrap>
        <v-flex xs4 >
      <input name="logourl" type="file" style="display:none" ref="fileInput" accept="image/*" @change="logoUpload">
      <img :src="logourl" class="logo">
        </v-flex>
        <v-flex xs8>
      <v-btn class="button" @click="pickFile" style="margin-left:3vw">change logo</v-btn>
        </v-flex>
      </v-layout>
        <v-text-field name="website" style="margin-top:5vw; margin-bottom:0; padding-bottom:0" label="LINK to company website" id="website" type="website" v-model="website" required>
        </v-text-field>
        <v-text-field textarea name="vision" style="margin-bottom:0; padding-bottom:0" label="Company vision in two sentences" multi-line id="vision" type="vision" v-model="vision" required>
        </v-text-field>
        <h4 style="font-weight:500; margin-top:5vw; margin-bottom:3vw">Your Companies Sector</h4>
        <v-select id=discipline1 label="Your Industry" :items="disciplineitems1" v-model="area1" segmented required>
        </v-select>
        <v-select id=discipline2 label="Your Company Type" :items="disciplineitems2" v-model="area2" required segmented>
        </v-select>
        <!--
                      <h4 style="font-weight:500">Job contact</h4>
                      <v-text-field name="name" label="Contact name for applications" id="name" type="name" v-model="name" style="margin-top:0; border:0; font-size:10%" required>
                      </v-text-field>
                      <v-text-field name="email" label="Contact mail for applications" id="email" type="email" v-model="email" style="margin-top:0; border:0; font-size:10%" required>
                      </v-text-field>
                      <v-text-field name="phone" label="Contact number for applications" id="phone" type="phone" v-model="phone" style="margin-top:0; border:0; font-size:10%" required>
                      </v-text-field>
                      -->
        <h4 style="font-weight:500; margin-top:8vw; margin-bottom:0">Your Open Position</h4>
        <v-text-field name="description" label="Name of Position" id="description" type="description" v-model="description" style="margin-top:0; border:0; margin-bottom:0; padding-bottom:0" required>
        </v-text-field>
        <v-text-field name="jobad" style="margin-top:0; border:0; margin-bottom:0; padding-bottom:0" label="LINK to job ad or carreer page" id="jobad" type="jobad" v-model="jobad">
        </v-text-field>
        <v-select segmented label="Preferred Experience Level" id="experience"  v-model="experience" :items="levels" required style="margin-top:5vw; border:0">
        </v-select>
        <v-text-field textarea name="purpose" label="Job purpose for the company" id="purpose" type="purpose" multi-line v-model="purpose" style="margin-top:0; border:0; margin-bottom:0; padding-bottom:0" required>
        </v-text-field>
        <h4 style="margin-top:5vw; font-weight:500">Who are you looking for?</h4>
        <p class="body-2">Business Pros</p>
          <v-checkbox style="margin:0%; padding:0" label="Operations / Finance" v-model="operations" value=true></v-checkbox>
          <v-checkbox style="margin:0%; padding:0" label="Business Dev / Marketing" v-model="business" value=true></v-checkbox>
          <v-checkbox style="margin:0%; padding:0" label="Sales" v-model="sales" value=true></v-checkbox>
          <p class="body-2">User Experts</p>
          <v-checkbox style="margin:0%; padding:0" label="Software / Web Development" v-model="software" value=true></v-checkbox>
          <v-checkbox style="margin:0%; padding:0" label="Product Mgmt and Concept" v-model="product" value=true></v-checkbox>
          <v-checkbox style="margin:0%; padding:0" label="Design and User Experience" v-model="design" value=true></v-checkbox>
          <v-checkbox style="margin:0%; padding:0" label="Customer Success" v-model="customer" value=true></v-checkbox>
          <p class="body-2">Technology Heroes</p>
          <v-checkbox style="margin:0%; padding:0" label="Virtual / Augmented Reality" v-model="vrar" value=true></v-checkbox>
          <v-checkbox style="margin:0%; padding:0" label="Artificial Intelligence" v-model="ai" value=true></v-checkbox>
          <v-checkbox style="margin:0%; padding:0" label="Blockchain" v-model="blockchain" value=true></v-checkbox>
        <div class="text-xs-center">
          <!--
              <p v-if="describestrengths" style="margin-top:5vw; text-align:justify">We recommend applicants based on their strengths and fit with your company culture. Please describe with the following template which profile is most suitable for the job.</p>
              <p v-if="selectemployees" @click="selectemployees=false; describestrengths=true" style='text-align:left; margin-bottom:0px; font-size:2.5vw'>Alternatively, click to choose employees to serve as role models</p>
              <p v-if="describestrengths" @click="selectemployees=true; describestrengths=false" style='text-align:left; margin-bottom:0px; font-size:2.5vw'>Define attributes manually instead</p>
              <v-layout v-if="selectemployees" row wrap>
                <v-flex xs4 v-for="employee in employees" :key="employee.lastname">
                  <v-checkbox style="margin-top:7vw; margin-bottom:0; padding:0" :label="employee.firstname" :value="employee.ID" v-model="employeeselection">
                  </v-checkbox>
                  <img class="employee-picture" :src="employee.image">
                </v-flex>
              </v-layout>
      
              <div style="text-align:left" v-if="describestrengths">
                <p style="margin-top:5vw">Distribute 18 points on the following 6 strengths according to your own priorities: <span style="font-weight:500">required!</span></p>
                <p>Points left: {{pointsleft}}</p>
                <v-layout row wrap align-baseline>
                  <v-flex xs2>
                    <v-btn @click="minusAdaptability" style="min-width:0">-</v-btn>
                  </v-flex>
                  <v-flex xs8>
                    <p class=strengths>Adaptability: {{adaptability}}</p>
                  </v-flex>
                  <v-flex xs2>
                    <v-btn @click='plusAdaptability' style="min-width:0">+</v-btn>
                  </v-flex>
      
                  <v-flex xs2>
                    <v-btn @click='minusDetailorientation' style="min-width:0">-</v-btn>
                  </v-flex>
                  <v-flex xs8>
                    <p class=strengths>Detail orientation: {{detailorientation}}</p>
                  </v-flex>
                  <v-flex xs2>
                    <v-btn @click='plusDetailorientation' style="min-width:0">+</v-btn>
                  </v-flex>
      
                  <v-flex xs2>
                    <v-btn @click='minusGoalorientation' style="min-width:0">-</v-btn>
                  </v-flex>
                  <v-flex xs8>
                    <p class=strengths>Goal orientation: {{goalorientation}}</p>
                  </v-flex>
                  <v-flex xs2>
                    <v-btn @click='plusGoalorientation' style="min-width:0">+</v-btn>
                  </v-flex>
      
                  <v-flex xs2>
                    <v-btn @click='minusCustomerorientation' style="min-width:0">-</v-btn>
                  </v-flex>
                  <v-flex xs8>
                    <p class=strengths>Customer centricity: {{customerorientation}}</p>
                  </v-flex>
                  <v-flex xs2>
                    <v-btn @click='plusCustomerorientation' style="min-width:0">+</v-btn>
                  </v-flex>
      
                  <v-flex xs2>
                    <v-btn @click='minusperseverence' style="min-width:0">-</v-btn>
                  </v-flex>
                  <v-flex xs8>
                    <p class=strengths>Perseverence: {{perseverence}}</p>
                  </v-flex>
                  <v-flex xs2>
                    <v-btn @click='plusperseverence' style="min-width:0">+</v-btn>
                  </v-flex>
      
                  <v-flex xs2>
                    <v-btn @click='minusCollaboration' style="min-width:0">-</v-btn>
                  </v-flex>
                  <v-flex xs8>
                    <p class=strengths>Collaboration: {{collaboration}}</p>
                  </v-flex>
                  <v-flex xs2>
                    <v-btn @click='plusCollaboration' style="min-width:0">+</v-btn>
                  </v-flex>
                </v-layout>
              </div>
              <div style="text-align:left" v-if="describeculture">
                <p style="margin-top:7vw; text-align:justify">Please outline your companies work environment. You can do so by using the following seven categories: <span style="font-weight:500">required!</span></p>
                <v-layout row wrap align-center>
                  <v-flex xs12>
                    <p class="body-2" style="text-align:center; margin-bottom:0">Our Leadership is:</p>
                  </v-flex>
                  <v-flex xs3>
                    <p style="text-align:right; margin-right:15%">Strong</p>
                  </v-flex>
                  <v-flex xs1>
                    <v-radio value="1" v-model="leadership"></v-radio>
                  </v-flex>
                  <v-flex xs1>
                    <v-radio value="2" v-model="leadership"></v-radio>
                  </v-flex>
                  <v-flex xs1>
                    <v-radio value="3" v-model="leadership"></v-radio>
                  </v-flex>
                  <v-flex xs1>
                    <v-radio value="4" v-model="leadership"></v-radio>
                  </v-flex>
                  <v-flex xs1>
                    <v-radio value="5" v-model="leadership"></v-radio>
                  </v-flex>
                  <v-flex xs1>
                    <v-radio value="6" v-model="leadership"></v-radio>
                  </v-flex>
                  <v-flex xs3>
                    <p style="margin-left:10px">Loose</p>
                  </v-flex>
                  <v-flex xs12>
                    <p class="body-2" style="text-align:center; margin-bottom:0">We gain Job Satisfaction from:</p>
                  </v-flex>
                  <v-flex xs3>
                    <p style="text-align:right; margin-right:15%">Salary</p>
                  </v-flex>
                  <v-flex xs1>
                    <v-radio value="1" v-model="moneysatisfaction"></v-radio>
                  </v-flex>
                  <v-flex xs1>
                    <v-radio value="2" v-model="moneysatisfaction"></v-radio>
                  </v-flex>
                  <v-flex xs1>
                    <v-radio value="3" v-model="moneysatisfaction"></v-radio>
                  </v-flex>
                  <v-flex xs1>
                    <v-radio value="4" v-model="moneysatisfaction"></v-radio>
                  </v-flex>
                  <v-flex xs1>
                    <v-radio value="5" v-model="moneysatisfaction"></v-radio>
                  </v-flex>
                  <v-flex xs1>
                    <v-radio value="6" v-model="moneysatisfaction"></v-radio>
                  </v-flex>
                  <v-flex xs3>
                    <p style="margin-left:10px">Impact / Fun</p>
                  </v-flex>
                  <v-flex xs12>
                    <p class="body-2" style="text-align:center; margin-bottom:0">We prefer working with:</p>
                  </v-flex>
                  <v-flex xs3>
                    <p style="text-align:right; margin-right:15%">Freestyle</p>
                  </v-flex>
                  <v-flex xs1>
                    <v-radio value="1" v-model="freedom"></v-radio>
                  </v-flex>
                  <v-flex xs1>
                    <v-radio value="2" v-model="freedom"></v-radio>
                  </v-flex>
                  <v-flex xs1>
                    <v-radio value="3" v-model="freedom"></v-radio>
                  </v-flex>
                  <v-flex xs1>
                    <v-radio value="4" v-model="freedom"></v-radio>
                  </v-flex>
                  <v-flex xs1>
                    <v-radio value="5" v-model="freedom"></v-radio>
                  </v-flex>
                  <v-flex xs1>
                    <v-radio value="6" v-model="freedom"></v-radio>
                  </v-flex>
                  <v-flex xs3>
                    <p style="margin-left:10px">Guidelines</p>
                  </v-flex>
                  <v-flex xs12>
                    <p class="body-2" style="text-align:center; margin-bottom:0">Our ideal Athmosphere is:</p>
                  </v-flex>
                  <v-flex xs3>
                    <p style="text-align:right; margin-right:15%">Relaxed</p>
                  </v-flex>
                  <v-flex xs1>
                    <v-radio value="1" v-model="athmosphere"></v-radio>
                  </v-flex>
                  <v-flex xs1>
                    <v-radio value="2" v-model="athmosphere"></v-radio>
                  </v-flex>
                  <v-flex xs1>
                    <v-radio value="3" v-model="athmosphere"></v-radio>
                  </v-flex>
                  <v-flex xs1>
                    <v-radio value="4" v-model="athmosphere"></v-radio>
                  </v-flex>
                  <v-flex xs1>
                    <v-radio value="5" v-model="athmosphere"></v-radio>
                  </v-flex>
                  <v-flex xs1>
                    <v-radio value="6" v-model="athmosphere"></v-radio>
                  </v-flex>
                  <v-flex xs3>
                    <p style="margin-left:10px">Professional</p>
                  </v-flex>
                  <v-flex xs12>
                    <p class="body-2" style="text-align:center; margin-bottom:0">We preferably work:</p>
                  </v-flex>
                  <v-flex xs3>
                    <p style="text-align:right; margin-right:15%">Alone</p>
                  </v-flex>
                  <v-flex xs1>
                    <v-radio value="1" v-model="teamwork"></v-radio>
                  </v-flex>
                  <v-flex xs1>
                    <v-radio value="2" v-model="teamwork"></v-radio>
                  </v-flex>
                  <v-flex xs1>
                    <v-radio value="3" v-model="teamwork"></v-radio>
                  </v-flex>
                  <v-flex xs1>
                    <v-radio value="4" v-model="teamwork"></v-radio>
                  </v-flex>
                  <v-flex xs1>
                    <v-radio value="5" v-model="teamwork"></v-radio>
                  </v-flex>
                  <v-flex xs1>
                    <v-radio value="6" v-model="teamwork"></v-radio>
                  </v-flex>
                  <v-flex xs3>
                    <p style="margin-left:10px">In Teams</p>
                  </v-flex>
                  <v-flex xs12>
                    <p class="body-2" style="text-align:center; margin-bottom:0">We enjoy our Roles to be:</p>
                  </v-flex>
                  <v-flex xs3>
                    <p style="text-align:right; margin-right:15%">Fluid</p>
                  </v-flex>
                  <v-flex xs1>
                    <v-radio value="1" v-model="roles"></v-radio>
                  </v-flex>
                  <v-flex xs1>
                    <v-radio value="2" v-model="roles"></v-radio>
                  </v-flex>
                  <v-flex xs1>
                    <v-radio value="3" v-model="roles"></v-radio>
                  </v-flex>
                  <v-flex xs1>
                    <v-radio value="4" v-model="roles"></v-radio>
                  </v-flex>
                  <v-flex xs1>
                    <v-radio value="5" v-model="roles"></v-radio>
                  </v-flex>
                  <v-flex xs1>
                    <v-radio value="6" v-model="roles"></v-radio>
                  </v-flex>
                  <v-flex xs3>
                    <p style="margin-left:10px">Fixed</p>
                  </v-flex>
                  <v-flex xs12>
                    <p class="body-2" style="text-align:center; margin-bottom:0">We approach tasks with:</p>
                  </v-flex>
                  <v-flex xs3>
                    <p style="text-align:right; margin-right:15%">Processes</p>
                  </v-flex>
                  <v-flex xs1>
                    <v-radio value="1" v-model="pragmatism"></v-radio>
                  </v-flex>
                  <v-flex xs1>
                    <v-radio value="2" v-model="pragmatism"></v-radio>
                  </v-flex>
                  <v-flex xs1>
                    <v-radio value="3" v-model="pragmatism"></v-radio>
                  </v-flex>
                  <v-flex xs1>
                    <v-radio value="4" v-model="pragmatism"></v-radio>
                  </v-flex>
                  <v-flex xs1>
                    <v-radio value="5" v-model="pragmatism"></v-radio>
                  </v-flex>
                  <v-flex xs1>
                    <v-radio value="6" v-model="pragmatism"></v-radio>
                  </v-flex>
                  <v-flex xs3>
                    <p style="margin-left:10px">Pragmatism</p>
                  </v-flex>
                </v-layout>
              </div>
    -->
          <v-btn class="button"  style="background-color:rgb(56,174,179); color:white; margin-top:10vw; font-size:3.5vw;" type="submit">Create Employee Search</v-btn>
        </div>
      </form>
    </div>
    </div>

    <div class="hidden-sm-and-down">
      <v-layout v-if="nocompany">
        <v-flex md6 offset-md3>
    <p >Before creating a position, please fill out your profile and provide which company you are working for.</p>
    </v-flex>
      </v-layout>
    <div v-else>
      <v-layout row wrap class="center">
        <v-flex md6 offset-md3>
      <h3 style="text-align:center">New Team Members For {{forcompany}}</h3>
      <div class="line" style="margin-top:5vw"></div>
      <p class="title" style="font-weight:500">About {{forcompany}}</p>
      </v-flex>
      </v-layout>
      
      <form style="margin-top:1vw" @submit.prevent="createEmployeeSearch">
      <v-layout align-center row wrap>
        <v-flex md1 offset-md3>
      <input name="logourl" type="file" style="display:none" ref="fileInput" accept="image/*" @change="logoUpload">
      <img :src="logourl" class="logo-desktop">
        </v-flex>
        <v-flex md1>
      <v-btn class="button" @click="pickFile" style="margin-left:3vw">change logo</v-btn>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex md6 offset-md3>
        <v-text-field name="website" style="margin-top:2vw; margin-bottom:0; padding-bottom:0" label="LINK to company website" id="website" type="website" v-model="website" required>
        </v-text-field>
        <v-text-field textarea name="vision" style="margin-bottom:0; padding-bottom:0" label="Company vision in two sentences" multi-line id="vision" type="vision" v-model="vision" required>
        </v-text-field>
        <p class="title" style="font-weight:500; margin-top:3vw; margin-bottom:3vw">Your Companies Sector</p>
        <v-select id=discipline1 label="Your Industry" :items="disciplineitems1" v-model="area1" segmented required>
        </v-select>
        <v-select id=discipline2 label="Your Company Type" :items="disciplineitems2" v-model="area2" required segmented>
        </v-select>
        <p class="title" style="font-weight:500; margin-top:3vw; margin-bottom:1vw">Your Open Position</p>
        <v-text-field name="description" label="Name of Position" id="description" type="description" v-model="description" style="margin-top:0; border:0; margin-bottom:0; padding-bottom:0" required>
        </v-text-field>
        <v-text-field name="jobad" style="margin-top:0; border:0; margin-bottom:0; padding-bottom:0" label="LINK to job ad or carreer page" id="jobad" type="jobad" v-model="jobad">
        </v-text-field>
        <v-select segmented label="Preferred Experience Level" id="experience"  v-model="experience" :items="levels" required style="margin-top:0; border:0">
            </v-select>
        <v-text-field textarea name="purpose" label="Job purpose for the company" id="purpose" type="purpose" multi-line v-model="purpose" style="margin-top:0; border:0; margin-bottom:0; padding-bottom:0" required>
        </v-text-field>
        </v-flex>
        <v-flex md6 offset-md3>
            <p class="title" style="text-align:center; margin-top:3vw; margin-bottom:3vw">Who are you looking for?</p>
            </v-flex>
            </v-layout>
            <v-layout row wrap align-top justify-space-around class="center">
            <v-flex style="padding-left:1vw" md-3 offset-md1 class="text-md-left">
            <p class="body-2">Business Pros</p>
            <v-checkbox style="margin:0%; padding:0" label="Operations / Finance" v-model="operations" value=true></v-checkbox>
            <v-checkbox style="margin:0%; padding:0" label="Business Dev / Marketing" v-model="business" value=true></v-checkbox>
            <v-checkbox style="margin:0%; padding:0" label="Sales" v-model="sales" value=true></v-checkbox>
            </v-flex>
            <v-flex md-3  class="text-md-left">
            <p class="body-2">User Experts</p>
            <v-checkbox style="margin:0%; padding:0" label="Software Development" v-model="software" value=true></v-checkbox>
            <v-checkbox style="margin:0%; padding:0" label="Product Mgmt and Concept" v-model="product" value=true></v-checkbox>
            <v-checkbox style="margin:0%; padding:0" label="Design and User Experience" v-model="design" value=true></v-checkbox>
            <v-checkbox style="margin:0%; padding:0" label="Customer Success" v-model="customer" value=true></v-checkbox>
            </v-flex>
            <v-flex md-3 class="text-md-left">
              <p class="body-2">Technology Heroes</p>
            <v-checkbox style="margin:0%; padding:0" label="Virtual / Augmented Reality" v-model="vrar" value=true></v-checkbox>
            <v-checkbox style="margin:0%; padding:0" label="Data Analysis" v-model="ai" value=true></v-checkbox>
            <v-checkbox style="margin:0%; padding:0" label="Blockchain" v-model="blockchain" value=true></v-checkbox>
            </v-flex>
            </v-layout>
        <div style="text-align:center">
      <v-btn class="button"  style="background-color:rgb(56,174,179); color:white; margin-top:3vw; font-size:1.5vw;" type="submit">Create Employee Search</v-btn>
    </div>
      </form>
    </div>
    </div>
  </v-app>
</template>

<script>
  import firebase from "firebase";
  import firestore from "../main";
  
  export default {
    data() {
      return {
        nocompany: true,
        name: null,
        //describeculture: true,
        vision: "",
        //describestrengths: true,
        selectemployees: false,
        forcompany: null,
        description: "",
        experience: null,
        //leadership: null,
        //athmosphere: null,
        //roles: null,
        //moneysatisfaction: null,
        //freedom: null,
        //teamwork: null,
        //pragmatism: null,
        phone: null,
        email: null,
        area1: null,
        area2: null,
        website: null,
        jobad: null,
        toselect: true,
        select: false,
        ID: null,
        logourl: null,
        image: null,
        imageurl: null,
        employeeselection: [],
        levels: [
          "Student",
          "Graduate",         
          "Intermediate",
          "Experienced",
          "Senior",
          "Advanced",
          "Expert"
        ],
        disciplineitems1: [
          "Automotive & Aviation",
          "Building Industries",
          "Chemical Industry",
          "Consumer Industry",
          "Corporate Services",
          "Demographic Change",
          "Digital Economy",
          "Electronics & Microtechnology",
          "Energy",
          "Environmental Technologies",
          "Finance",
          "Information Technologies",
          "Insurance",
          "Healthcare and Life Sciences",
          "Lightweight Industry",
          "Logistics Industry",
          "Machinery & Equipment",
          "Material Processing & Technologies",
          "Media",
          "Mobility",
          "Tourism",
          "Trade"
        ],
        disciplineitems2: [
          "Agency",
          "Company Builder",
          "Construction",
          "Consulting",
          "Production",
          "Service Provider",
          "Software Provider",
          "Start-Up",
          "Venture Capital",
        ],
        employees: [],
        //pointsleft: 18,
        //adaptability: 0,
        //goalorientation: 0,
        //detailorientation: 0,
        //customerorientation: 0,
        //perseverence: 0,
        //collaboration: 0,
        product: null,
        design: null,
        customer: null,
        sales: null,
        business: null,
        operations: null,
        software: null,
        ai: null,
        vrar: null,
        blockchain: null,
        purpose: null
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
              this.forcompany = doc.data().company;
              this.phone = doc.data().phone;
              this.email = doc.data().email;
              (this.name = doc.data().firstname + " " + doc.data().lastname),
              (this.nocompany = false);
              this.ID = doc.data().ID;
            }
          });
        })
        .then(() =>
          firestore
          .collection("Companies")
          .where("companyname", "==", this.forcompany)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              this.website = doc.data().website;
              this.area1 = doc.data().area1;
              this.area2 = doc.data().area2;
              this.logourl = doc.data().logo;
              this.imageurl = doc.data().logo
              this.vision = doc.data().vision;
              //this.pragmatism = doc.data().pragmatism;
              //this.roles = doc.data().roles;
              //this.freedom = doc.data().freedom;
              //this.moneysatisfaction = doc.data().moneysatisfaction;
              //this.athmosphere = doc.data().athmosphere;
              //this.teamwork = doc.data().teamwork;
              //this.leadership = doc.data().leadership;
            });
          })
        );
    },
  
    computed: {
      uniqueID() {
        var d = new Date();
  
        function chr4() {
          return Math.random().toString(16).slice(-4);
        }
        return d.getUTCFullYear().toString() + d.getUTCMonth().toString() +
          d.getUTCDate().toString() +
          d.getUTCHours().toString() +
          chr4() + chr4() + chr4() + chr4();
      }
    },
  
    methods: {
      /* Relevant for choosing employees instead of specifying job themself
      continuePress: function (event) {
          firestore.collection('Users').where('company', '==', this.forcompany).get().then(querySnapshot => {
          querySnapshot.forEach(doc => {
            let data = {
            firstname : doc.data().firstname,
            lastname : doc.data().lastname,
            image : doc.data().profilepicture,
            ID : doc.data().ID
            }
            this.employees.push(data)
          })
        })
        this.toselect = false
        },
        */
  
      /*
          plusCollaboration() {
            if (this.pointsleft > 0 && this.collaboration < 6) {
              this.pointsleft -= 1;
              this.collaboration += 1;
            }
          },
      
          minusCollaboration() {
            if (this.collaboration > 0) {
              this.pointsleft += 1;
              this.collaboration -= 1;
            }
          },
      
          plusDetailorientation() {
            if (this.pointsleft > 0 && this.detailorientation < 6) {
              this.pointsleft -= 1;
              this.detailorientation += 1;
            }
          },
      
          minusDetailorientation() {
            if (this.detailorientation > 0) {
              this.pointsleft += 1;
              this.detailorientation -= 1;
            }
          },
      
          plusCustomerorientation() {
            if (this.pointsleft > 0 && this.customerorientation < 6) {
              this.pointsleft -= 1;
              this.customerorientation += 1;
            }
          },
      
          minusCustomerorientation() {
            if (this.customerorientation > 0) {
              this.pointsleft += 1;
              this.customerorientation -= 1;
            }
          },
      
          plusperseverence() {
            if (this.pointsleft > 0 && this.perseverence < 6) {
              this.pointsleft -= 1;
              this.perseverence += 1;
            }
          },
      
          minusperseverence() {
            if (this.perseverence > 0) {
              this.pointsleft += 1;
              this.perseverence -= 1;
            }
          },
      
          plusAdaptability() {
            if (this.pointsleft > 0 && this.adaptability < 6) {
              this.pointsleft -= 1;
              this.adaptability += 1;
            }
          },
      
          minusAdaptability() {
            if (this.adaptability > 0) {
              this.pointsleft += 1;
              this.adaptability -= 1;
            }
          },
      
          plusGoalorientation() {
            if (this.pointsleft > 0 && this.goalorientation < 6) {
              this.pointsleft -= 1;
              this.goalorientation += 1;
            }
          },
      
          minusGoalorientation() {
            if (this.goalorientation > 0) {
              this.pointsleft += 1;
              this.goalorientation -= 1;
            }
          },
          */
       pickFile() {
        this.$refs.fileInput.click();
      },
  
      logoUpload(event) {
        const files = event.target.files
        let filename = files[0].name
        
        if (filename.lastIndexOf(".") <= 0) {
          return alert("please add a valid file");
        }
        const filereader = new FileReader()
        filereader.addEventListener("load", () => {
        this.logourl = filereader.result
        })
        filereader.readAsDataURL(files[0])
        this.image=files[0]
        this.$store.dispatch("logoUpload", {
          image: this.image,
          company: this.forcompany
        }).then(()=> {
          firestore
          .collection("Companies")
          .where("companyname", "==", this.forcompany)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              this.imageurl = doc.data().logo
            });
          })
        })
      },
  
      createEmployeeSearch: function(event) {
        /*
        if (
          this.pointsleft < 1 &&
          this.leadership > 0 &&
          this.athmosphere > 0 &&
          this.roles > 0 &&
          this.moneysatisfaction > 0 &&
          this.freedom > 0 &&
          this.teamwork > 0 &&
          this.pragmatism > 0
        ) 
        */
        {
          this.$store.dispatch("createEmployeeSearch", {
            ID: this.uniqueID,
            selectemployees: this.selectemployees,
            rolemodels: this.employeeselection,
            //adaptability: this.adaptability,
            //perseverence: this.perseverence,
            //detailorientation: this.detailorientation,
            //customerorientation: this.customerorientation,
            //goalorientation: this.goalorientation,
            //collaboration: this.collaboration,
            experiencelevels: this.experience,
            product: this.product,
            design: this.design,
            sales: this.sales,
            customer: this.customer,
            business: this.business,
            operations: this.operations,
            software: this.software,
            ai: this.ai,
            vrar: this.vrar,
            blockchain: this.blockchain,
            company: this.forcompany,
            website: this.website,
            jobad: this.jobad,
            area1: this.area1,
            area2: this.area2,
            logo: this.imageurl,
            description: this.description,
            phone: this.phone,
            email: this.email,
            vision: this.vision,
            purpose: this.purpose,
            //pragmatism: this.pragmatism,
            //roles: this.roles,
            //freedom: this.freedom,
            //moneysatisfaction: this.moneysatisfaction,
            //athmosphere: this.athmosphere,
            //teamwork: this.teamwork,
            //leadership: this.leadership,
            name: this.name
          });
          this.$store.dispatch("openSite", {
            target: "/candidates"
          });
        }
      }
    }
  };
</script>

<style scoped>
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
  
  .strengths {
    padding-left: 20%;
  }
  
  .logo {
    width: 22vw;
    height: 22vw;
    border-radius: 10%;
    object-fit: cover;
    margin-top: 0;
  }

  .logo-desktop {
    width: 8vw;
    height: 8vw;
    border-radius: 10%;
    object-fit: cover;
    margin-top: 0;
  }
</style>

