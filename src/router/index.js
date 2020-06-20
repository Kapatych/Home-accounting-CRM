import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import('../views/Home')
  },
  {
    path: "/categories",
    name: "categories",
    component: () => import('../views/Categories')
  },
  {
    path: "/detail",
    name: "detail",
    component: () => import('../views/Detail')
  },
  {
    path: "/history",
    name: "history",
    component: () => import('../views/History')
  },
  {
    path: "/planning",
    name: "planning",
    component: () => import('../views/Planning')
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import('../views/Profile')
  },
  {
    path: "/record",
    name: "record",
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

export default router;
