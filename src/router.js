import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home.vue";
import Demo from "./views/Demo.vue";
import Tutorial from "./views/Tutorial.vue";
import Application from "./views/Application.vue";
import About from "./views/About.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/demo",
      name: "demo",
      component: Demo
    },
    {
      path: "/tutorial",
      name: "tutorial",
      component: Tutorial
    },
    {
      path: "/application",
      name: "applicatioin",
      component: Application
    },
    {
      path: "/about",
      name: "about",
      component: About
    }
  ]
});
