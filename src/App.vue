<template>
  <v-app>
  
    <v-navigation-drawer temporary v-model="sidebar">
      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.title" :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="isAuthenticated" @click="userSignOut">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Sign Out</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  
    <v-toolbar fixed>
      <span class="hidden-md-and-up">
          <v-toolbar-side-icon @click.stop="loadMenu(), sidebar = !sidebar">
          </v-toolbar-side-icon>
        </span>
      <v-toolbar-title>
        
      </v-toolbar-title>
      <v-spacer></v-spacer>
  
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn v-if="isAuthenticated" flat @click="userSignOut">
          <v-icon left>exit_to_app</v-icon>
          Sign Out
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <v-container fluid style="padding:4vw">
        <router-view></router-view>
      </v-container>
    </main>
  </v-app>
</template>

<script>
  import firebase from 'firebase'
  import firestore from './main'
  export default {
    data() {
      return {
        // appTitle: 'trackmatch',
        sidebar: false,
        searchjob: false,
        helphiring: false
      }
    },
  
    created() {
      window.scrollTo(0, 0)
      firestore.collection('Users').where('ID', '==', firebase.auth().currentUser.uid).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.searchjob = doc.data().searchjob
          this.helphiring = doc.data().helphiring
        })
      })
    },
  
    computed: {
      appTitle() {
        return this.$store.getters.appTitle
      },
      isAuthenticated() {
        return this.$store.getters.getUser !== null && this.$store.getters.getUser !== undefined
      },
      menuItems() {
        if (this.isAuthenticated) {
  
          if (this.searchjob == true && this.helphiring == true) {
            return [{
                title: 'Browse Job Postings',
                path: '/jobmatches',
                icon: 'check_circle'
              },
              {
                title: 'Create Position',
                path: '/employeesearch',
                icon: 'find_in_page'
              },
              {
                title: 'Our Open Positions',
                path: '/searchlist',
                icon: 'list'
              },
              {
                title: 'Browse Candidates',
                path: '/candidates',
                icon: 'perm_identity'
              },
              {
                title: 'Edit Profile',
                path: '/details',
                icon: 'face'
              }
            ]
          }
  
          if (this.searchjob == true && this.helphiring == false) {
            return [{
                title: 'Browse Job Postings',
                path: '/jobmatches',
                icon: 'check_circle'
              },
              {
                title: 'Edit Profile',
                path: '/details',
                icon: 'face'
              }
            ]
          }
  
          if (this.searchjob == false && this.helphiring == true) {
            return [{
                title: 'Browse Job Postings',
                path: '/jobmatches',
                icon: 'check_circle'
              },
              {
                title: 'Create Position',
                path: '/employeesearch',
                icon: 'find_in_page'
              },
              {
                title: 'Our Open Positions',
                path: '/searchlist',
                icon: 'list'
              },
              {
                title: 'Browse Candidates',
                path: '/candidates',
                icon: 'perm_identity'
              },
              {
                title: 'Edit Profile',
                path: '/details',
                icon: 'face'
              }
            ]
          }
  
          if (this.searchjob == false && this.helphiring == false) {
            return [{
                title: 'Home',
                path: '/home',
                icon: 'home'
              },
              {
                title: 'Edit Profile',
                path: '/details',
                icon: 'face'
              },
            ]
          }
  
        } else {
          return [{
              title: 'Sign Up',
              path: '/signup',
              icon: 'face'
            },
            {
              title: 'Login',
              path: '/signin',
              icon: 'lock_open'
            }
          ]
        }
      }
    },
    methods: {
      userSignOut() {
        this.$store.dispatch('userSignOut')
      },
  
      loadMenu() {
        if (this.isAuthenticated) {
          firestore.collection('Users').where('ID', '==', firebase.auth().currentUser.uid).get().then(querySnapshot => {
            querySnapshot.forEach(doc => {
              this.searchjob = doc.data().searchjob
              this.helphiring = doc.data().helphiring
            })
          })
        }
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
  @import url('https://fonts.googleapis.com/css?family=Merriweather');
</style>