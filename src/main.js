import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import { store } from './store'
import firebase from 'firebase'
import 'firebase/firestore'
import { firebaseConfig } from './config'

Vue.use(Vuetify)
Vue.config.productionTip = false
// Initialize firebase app with config const that is saved in ./config
const firebaseApp = firebase.initializeApp(firebaseConfig)

/* eslint-disable no-new */
const unsubscribe = firebase.auth()
.onAuthStateChanged((firebaseUser) => {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    created () {
      store.dispatch('autoSignIn', firebaseUser)
    }
  })
  unsubscribe()
})

export default firebaseApp.firestore()

