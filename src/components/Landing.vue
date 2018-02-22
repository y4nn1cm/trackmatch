<template>
  <v-layout column>
    <v-flex xs12 class="text-xs-center" mt-5>
      <h3>Welcome to</h3>
      <h2 style="font-family:Merriweather">trackmatch</h2>
    </v-flex>
    <v-flex xs12 sm6 offset-sm3 mt-3>
      <blockquote>
        Where Munich's <span style="font-weight:500">Talents</span> and <span style="font-weight:500">Professionals</span> match with visionary <span style="font-weight:500">Teams</span>!
      </blockquote>
    </v-flex>
    <v-flex class="text-xs-center" mt-5>
      <v-btn primary to="/signup">Sign Up now</v-btn>
      <v-btn to="/signin">Sign In</v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Merriweather');

</style>
