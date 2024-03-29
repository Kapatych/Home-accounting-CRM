import firebase from "firebase/app";

export default {
  state: {
    info: {}
  },
  actions: {
    async fetchInfo({dispatch, commit}) {
      try {
        const uid = await dispatch('getUserId');
        const info = (await firebase.database().ref(`users/${uid}/info`).once('value')).val();
        commit('setInfo', info)
      } catch (e) {
        commit('setError', e);
        throw e
      }
    },
    async updateInfo({dispatch, commit, getters}, payload) {
      try {
        const uid = await dispatch('getUserId');
        const updateData = {...getters.info, ...payload};
        await firebase.database().ref(`/users/${uid}/info`).update(updateData);
        commit('setInfo', updateData)
      }catch (e) {
        commit('setError', e);
        throw e
      }
    }
  },
  mutations: {
    setInfo(state, info) {
      state.info = info
    },
    clearInfo(state) {
      state.info = {}
    }
  },
  getters: {
    info: state => state.info
  }
}
