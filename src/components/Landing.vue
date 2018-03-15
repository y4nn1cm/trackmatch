<template>
  <v-layout column>
    <v-flex xs12 class="text-xs-center" mt-5>
      <h3>Welcome to</h3>
      <img class="logo" src="../assets/trackmatch_logo_white.png">
    </v-flex>
    <v-flex xs12 sm6 offset-sm3 mt-3>
      <blockquote>
        Where Munich's <span style="font-weight:500">Talents</span> and <span style="font-weight:500">Professionals</span> meet <span style="font-weight:500">Employees</span> of visionary <span style="font-weight:500">Companies</span> to find and
        fill rewarding job opportunities!
      </blockquote>
    </v-flex>
    <v-flex class="text-xs-center" mt-5>
      <v-btn style="background-color:rgb(56,174,179); color:white" to="/signup">sign me up</v-btn>
      <v-btn to="/signin">login</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {};
</script>

<style>
  @import url("https://fonts.googleapis.com/css?family=Merriweather");

  .logo {
    width: 25vw;
    margin:2vw;
  }
</style>
