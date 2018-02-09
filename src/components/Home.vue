<template>
  <div>
    <v-container id="box">
      <div class="center">
        <h1 style="margin-bottom:5%; margin-top:5%; font-family:merriweather; font-size:10vw">trackmatch</h1>
        <div class="line"></div>
        <img :src="profilepicture" class="profile-picture"/> 
        <h1 style="font-size:7vw;">Hello {{username}}</h1>

        <strong style="font-size:5vmin">Why are you here?</strong>
    
        <v-layout row wrap> 
          <v-flex xs6>
            <v-btn @click="togglejob" color: light v-bind:class="{primary: jobactive}" class="select" id=jobsearch>Find a job</v-btn>
          </v-flex>
          <v-flex xs6>
          <v-btn @click="togglework" color: light v-bind:class="{primary: workactive}" class="select" id=work>Help my company</v-btn>
          </v-flex>
        </v-layout>
      </div>
    </v-container>
  </div>
</template>

<script>
  
export default {
  
  name: 'Hello',
  data () {
    return {
      username: 'Robert',
      profilepicture: "http://www.indiewire.com/wp-content/uploads/2014/12/de-niro-a-life.jpg?w=780",
      jobactive:false,
      workactive:false,
    }
  },
      methods:
      {
        togglejob: function(event) {
          this.jobactive = !this.jobactive;
        },

        togglework: function(event) {
          this.workactive = !this.workactive;
        }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Merriweather');

.profile-picture {
  width:30vw;
  height:30vw;
  border-radius: 50%;
  object-fit:cover;
  margin:4vw;
  margin-bottom:6vw;
}

.center {
  position: relative;
  text-align: center;
  box-sizing: border-box;
  padding:2%;
  width: 100%;
  height:100%;
}

#box {
  position: relative;
  text-align: center;
  width: 94%;
  margin-top:5%;
  margin-bottom:5%;
  background: rgb(245, 245, 245);
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}

.select{
  margin-top:7.5%;
  margin-bottom:5%;
  background-color:rgb(230, 230, 230);
  width:90%;
  font-size: 2.5vw;
  color: black;
  padding:0;
  height:40px;
  text-align:center;
}



.line {
  position: relative;
  width: 100%;
  margin-top:5%;
  margin-bottom:5%;
  height: 1px;
  background: #DDD;
  border-radius: 10%;
  line-height: 0px;
}

h1, h2 {
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
