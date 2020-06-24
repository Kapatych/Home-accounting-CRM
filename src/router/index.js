import Vue from "vue";
import VueRouter from "vue-router";
import firebase from 'firebase/app'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    meta: {auth: true},
    component: () => import('../views/Home')
  },
  {
    path: "/categories",
    name: "categories",
    meta: {auth: true},
    component: () => import('../views/Categories')
  },
  {
    path: "/detail/:id",
    name: "detail",
    meta: {auth: true},
    component: () => import('../views/Detail')
  },
  {
    path: "/history",
    name: "history",
    meta: {auth: true},
    component: () => import('../views/History')
  },
  {
    path: "/planning",
    name: "planning",
    meta: {auth: true},
    component: () => import('../views/Planning')
  },
  {
    path: "/profile",
    name: "profile",
    meta: {auth: true},
    component: () => import('../views/Profile')
  },
  {
    path: "/record",
    name: "record",
    meta: {auth: true},
    component: () => import('../views/Record')
  },
  {
    path: "/login",
    name: "login",
    meta: {layout: 'empty'},
    component: () => import('../views/Login')
  },
  {
    path: "/register",
    name: "register",
    meta: {layout: 'empty'},
    component: () => import('../views/Register')
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requireAuth = to.matched.some(m => m.meta.auth);

  if (!currentUser && requireAuth) {
    next('/login?message=login')
  } else {
    next()
  }

});

export default router;
