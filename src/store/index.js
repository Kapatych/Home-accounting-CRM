import Vue from "vue";
import Vuex from "vuex";
import auth from './auth'
import info from './info'
import category from './category'
import record from './record'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    }
  },
  actions: {
    async fetchCurrency({commit}, base) {
      try {
        const res = await fetch(`https://api.exchangeratesapi.io/latest?base=${base}`);
        return await res.json();
      } catch (e) {
        commit('setError', e);
        throw e
      }
    }
  },
  getters: {
    error: state => state.error
  },
  modules: {
    auth,
    info,
    category,
    record
  }
});
