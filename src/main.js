import Vue from "vue";
import Vuelidate from 'vuelidate';
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import 'materialize-css/dist/js/materialize.min';

import dateFilter from '@/filters/date.filter';
import messagePlugin from '@/utils/message.plugin';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.filter('date', dateFilter);

firebase.initializeApp({
  apiKey: "AIzaSyB6Q72lfDKSliBoaGB-ibTCoQlEabSI8Wg",
  authDomain: "vue-crm-27ecc.firebaseapp.com",
  databaseURL: "https://vue-crm-27ecc.firebaseio.com",
  projectId: "vue-crm-27ecc",
  storageBucket: "vue-crm-27ecc.appspot.com",
  messagingSenderId: "255988136888",
  appId: "1:255988136888:web:2c68dd58c34951672eed4d"
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});


