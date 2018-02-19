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

  createEmployeeSearch ({commit}, payload) {
    firestore.collection('EmployeeSearches').add({
      rolemodels: payload.rolemodels,
      uniquename: payload.uniquename,
      experiencelevels: payload.experiencelevels,
      activities: payload.activities,
      company: payload.company,
      logo: payload.logo,
      website: payload.website,
      jobad: payload.jobad,
      area1: payload.area1,
      area2: payload.area2
    }).then(() => { console.log('Job Search has been created') })
  },

  createCompanyDetails ({commit}, payload) {
    firestore.collection('Companies').doc(payload.company).set({
      companyname: payload.company,
      logo: payload.logo,
      website: payload.website,
      area1: payload.area1,
      area2: payload.area2
    }, { merge: true }).then(() => { console.log('Company has been updated') })
  },

  createCompany ({commit}, payload) {
    firestore.collection('Companies').doc(payload.company).set({
      companyname: payload.company
    }, { merge: true }).then(() => { console.log('Company has been created') })
  },

  editDetails ({commit}, payload) {
    firestore.collection('Users').doc(firebase.auth().currentUser.uid).set({
      experience: payload.experience,
      background1: payload.background1,
      background2: payload.background2,
      adaptability: payload.adaptability,
      goalorientation: payload.goalorientation,
      detailorientation: payload.detailorientation,
      customerorientation: payload.customerorientation,
      perseverence: payload.perseverence,
      collaboration: payload.collaboration,
      leadership: payload.leadership,
      athmosphere: payload.athmosphere,
      roles: payload.roles,
      moneysatisfaction: payload.moneysatisfaction,
      freedom: payload.freedom,
      teamwork: payload.teamwork,
      pragmatism: payload.pragmatism,
      feedbackleadership: payload.feedbackleadership,
      feedbackathmosphere: payload.feedbackathmosphere,
      feedbackroles: payload.feedbackroles,
      feedbackmoneysatisfaction: payload.feedbackmoneysatisfaction,
      feedbackfreedom: payload.feedbackfreedom,
      feedbackteamwork: payload.feedbackteamwork,
      feedbackpragmatism: payload.feedbackpragmatism,
      factor1: payload.factor1,
      factor2: payload.factor2,
      factor3: payload.factor3,
      activities: payload.activities,
      pointsleft: payload.pointsleft,
      company: payload.company,
      forcompany: payload.forcompany
    }, { merge: true }).then(() => { console.log('Details have been saved') })
  },

  editGoals ({commit}, payload) {
    firestore.collection('Users').doc(firebase.auth().currentUser.uid).set({
      givefeedback: payload.givefeedback,
      helphiring: payload.helphiring,
      findevents: payload.findevents,
      findcoach: payload.findcoach,
      searchjob: payload.searchjob
    }, { merge: true }).then(() => { console.log('Goals have been saved') })
  },

  openSite ({commit}, payload) {
    router.push(payload.target)
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
