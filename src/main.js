import Vue from "vue";
import Vuelidate from 'vuelidate';
import Paginate from 'vuejs-paginate';
import VueMeta from 'vue-meta';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import 'materialize-css/dist/js/materialize.min';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import dateFilter from '@/filters/date.filter';
import currencyFilter from '@/filters/currency.filter';
import localizeFilter from '@/filters/localize.filter';
import tooltipDirective from '@/directives/tooltip.directive'
import messagePlugin from '@/utils/message.plugin';
import Loader from '@/components/app/Loader'

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.use(Vuelidate);
Vue.use(VueMeta);
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);
Vue.filter('localize', localizeFilter);
Vue.directive('tooltip', tooltipDirective);
Vue.component('Loader', Loader);
Vue.component('Paginate', Paginate);

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


