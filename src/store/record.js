import firebase from 'firebase/app'

export default {
  actions: {
    async fetchRecords({dispatch, commit}) {
      try {
        const uid = await dispatch('getUserId');
        const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val();
        return Object.keys(records).map(key => ({...records[key], id: key}))
      } catch (e) {
        commit('setError', e);
        throw e
      }
    },
    async createRecord({dispatch, commit}, record) {
      try {
        const uid = await dispatch('getUserId');
        await firebase.database().ref(`users/${uid}/records`).push(record)
      } catch (e) {
        commit('setError', e);
        throw e
      }
    }
  }
}
