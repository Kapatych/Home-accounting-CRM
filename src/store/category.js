import firebase from "firebase/app";

export default {
  actions: {
    async fetchCategories ({dispatch, commit}) {
      try {
        const uid = await dispatch('getUserId');
        const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {};
        return Object.keys(categories).map(key => ({...categories[key], id: key}))
      } catch (e) {
        commit('setError', e);
        throw e
      }
    },
    async fetchCategoryById ({dispatch, commit}, id) {
      try {
        const uid = await dispatch('getUserId');
        const category = (await firebase.database().ref(`/users/${uid}/categories`).child(id).once('value')).val() || {};
        return {...category, id}
      } catch (e) {
        commit('setError', e);
        throw e
      }
    },
    async createCategory({dispatch, commit}, {title, limit}) {
      try {
        const uid = await dispatch('getUserId');
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({title, limit});
        return {title, limit, id: category.key}
      } catch (e) {
        commit('setError', e);
        throw e
      }
    },
    async updateCategory ({dispatch, commit}, {id, title, limit}) {
      try {
        const uid = await dispatch('getUserId');
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({title, limit})
      } catch (e) {
        commit('setError', e);
        throw e
      }
    },
    async removeCategory ({dispatch, commit, getters}, id) {
      try {
        const uid = await dispatch('getUserId');
        const records = await dispatch('fetchRecords');
        const recordsToRemove = records.filter(rec => rec.categoryId === id);
        const recordsToRemoveCost = recordsToRemove.reduce((total, rec) => {
          rec.type === 'income' ? total -= +rec.amount : total += +rec.amount;
          return total
        }, 0);

        await dispatch('updateInfo', {bill: getters.info.bill + recordsToRemoveCost});
        await firebase.database().ref(`/users/${uid}/categories`).child(id).remove();
        await recordsToRemove.forEach(r => firebase.database().ref(`/users/${uid}/records`).child(r.id).remove())
      } catch (e) {
        commit('setError', e);
        throw e
      }
    },
  }
}
