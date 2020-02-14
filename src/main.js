import Vue from "vue";
import Buefy from "buefy";
import App from "./App.vue";
import store from "./store";
import Moment from "moment";
import router from "./router";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
Vue.use(Buefy);

Vue.filter('formatDate', function (value) {
  return Moment(value).format("Do MMM YYYY");
})

Vue.filter('formatCurrency', function (value, symbol, currency) {
  return value + " " + currency;
})

export const eventBus = new Vue();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
