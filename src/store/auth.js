/* eslint-disable no-unused-vars, no-useless-catch */
import firebase from "firebase/app";

export default {
  actions: {
    async login({commit}, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        commit('setError', e);
        throw e
      }
    },
    async register({dispatch, commit}, {email, password, name, bill, currency, locale}) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch('getUserId');
        await firebase.database().ref(`users/${uid}/info`).set({
          name,
          bill,
          currency,
          locale
        })
      } catch (e) {
        commit('setError', e);
        throw e
      }
    },
    getUserId() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null
    },
    async logout({commit}) {
      await firebase.auth().signOut();
      commit('clearInfo')
    }
  }
}
