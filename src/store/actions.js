import firebase from 'firebase'
import firestore from '../main'
import router from '@/router'

export const actions = {
  autoSignIn ({commit}, payload) {
    commit('setUser', payload)
    router.push('/home')
  },

  pictureUpload ({commit}, payload) {
    firestore.collection('Users').doc(firebase.auth().currentUser.uid).set({
      profilepicture: payload.imageurl
    }, { merge: true }).then(() => { console.log('image url has been saved') })
  },

  editGiveFeedback ({commit}, payload) {
    firestore.collection('Users').doc(firebase.auth().currentUser.uid).set({
      givefeedback: payload.givefeedback
    }, { merge: true }).then(() => { console.log('GiveFeedback has been saved') })
  },

  editHelpHiring ({commit}, payload) {
    firestore.collection('Users').doc(firebase.auth().currentUser.uid).set({
      helphiring: payload.helphiring
    }, { merge: true }).then(() => { console.log('HelpHiring has been saved') })
  },

  editSearchJob ({commit}, payload) {
    firestore.collection('Users').doc(firebase.auth().currentUser.uid).set({
      searchjob: payload.searchjob
    }, { merge: true }).then(() => { console.log('SearchJob has been saved') })
  },

  userSignUp ({commit}, payload) {
    commit('setLoading', true)
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(firebaseUser => {
      firebaseUser.sendEmailVerification().then(() => { console.log('welcome email has been sent') })
      commit('setUser', firebaseUser)
      commit('setLoading', false)
      commit('setError', null)
      router.push('/home')
      // Extend User Signup by firstname and lastname and save it together with e-mail in database
      firestore.collection('Users').doc(firebase.auth().currentUser.uid).set({
        ID: firebase.auth().currentUser.uid,
        firstname: payload.firstname,
        lastname: payload.lastname,
        email: payload.email
      }).then(() => { console.log('user data has been saved') })
    })
    .catch(error => {
      commit('setError', error.message)
      commit('setLoading', false)
    })
  },

  userSetObjective ({commit}, payload) {
  },

  userSignIn ({commit}, payload) {
    commit('setLoading', true)
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
    .then(firebaseUser => {
      commit('setUser', firebaseUser)
      commit('setLoading', false)
      commit('setError', null)
      router.push('/home')
    })
    .catch(error => {
      commit('setError', error.message)
      commit('setLoading', false)
    })
  },
  userSignOut ({commit}) {
    firebase.auth().signOut()
    commit('setUser', null)
    router.push('/')
  }
}
