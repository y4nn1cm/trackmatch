<template>
  <v-layout column>
    <v-flex xs12 class="text-xs-center" mt-5>
      <h3>Sign Up</h3>
    </v-flex>
    <v-flex xs12 sm6 offset-sm3 mt-3>
      <form @submit.prevent="userSignUp">
        <v-layout column>
          <v-flex>
            <v-alert error dismissible v-model="alert">
              {{ error }}
            </v-alert>
          </v-flex>
          <v-flex>
            <v-text-field
              name="email"
              label="Email"
              id="email"
              type="email"
              v-model="email"
              required></v-text-field>
          </v-flex>
          <v-flex>
            <v-text-field
              name="firstname"
              label="Firstname"
              id="firstname"
              type="text"
              v-model="firstname"
              required></v-text-field>
          </v-flex>
          <v-flex>
            <v-text-field
              name="lastname"
              label="Lastname"
              id="lastname"
              type="text"
              v-model="lastname"
              required></v-text-field>
          </v-flex>
          <v-flex>
            <v-text-field
              name="password"
              label="Password"
              id="password"
              type="password"
              v-model="password"
              required></v-text-field>
          </v-flex>
          <v-flex>
            <v-text-field
              name="confirmPassword"
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              v-model="passwordConfirm"
              :rules="[comparePasswords]"
              ></v-text-field>
          </v-flex>
          <v-flex><v-radio style="margin-bottom:0; padding:0" label="I am exploring job opportunities" value="jobs" v-model="reason"></v-radio></v-flex>
        <v-flex><v-radio style="margin-top:0; padding:0" label="Our company is hiring" value="employees" v-model="reason"></v-radio></v-flex>
          <v-flex class="text-xs-center" mt-5>
            <v-btn class="teal select" style="color:white" type="submit">Sign me Up</v-btn>
          </v-flex>
        </v-layout>
      </form>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      passwordConfirm: "",
      firstname: "",
      lastname: "",
      reason: "",
      alert: false
    };
  },
  computed: {
    comparePasswords() {
      return this.password === this.passwordConfirm
        ? true
        : "Passwords don't match";
    },
    error() {
      return this.$store.getters.getError;
    },
    loading() {
      return this.$store.getters.getLoading;
    }
  },
  methods: {
    userSignUp() {
      if (this.reason == "jobs") {
        this.searchjob = true;
        this.helphiring = false;
      }
      if (this.reason == "employees") {
        this.searchjob = true;
        this.helphiring = false;
      }
      if (this.comparePasswords !== true || this.reason == "") {
        return;
      }
      this.$store.dispatch("userSignUp", {
        email: this.email,
        password: this.password,
        firstname: this.firstname,
        lastname: this.lastname,
        reason: this.reason,
        searchjob: this.searchjob,
        helphiring: this.helphiring
      });
    }
  },
  watch: {
    error(value) {
      if (value) {
        this.alert = true;
      }
    },
    alert(value) {
      if (!value) {
        this.$store.dispatch("setError", null);
      }
    }
  }
};
</script>