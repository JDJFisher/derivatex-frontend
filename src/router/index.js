import Vue from "vue";
import VueRouter from "vue-router";
import DerivativesList from "../views/DerivativesList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "derivativesList",
    component: DerivativesList
  }
];

const router = new VueRouter({
  routes
});

export default router;
