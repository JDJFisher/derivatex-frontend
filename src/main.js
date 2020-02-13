import Vue from "vue";
import Buefy from "buefy";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
Vue.use(Buefy);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
