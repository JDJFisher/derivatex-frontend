import Vue from "vue";
import Buefy from "buefy";
import App from "./App.vue";
import store from "./store";
import Moment from "moment";
import router from "./router";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;
Vue.use(Buefy);

Vue.filter("formatDate", function(value) {
  return Moment(value).format("Do MMM YYYY");
});

Vue.filter("titleCase", function(str) {
  if (!str) {return "";}
  str = str.replace(/_/g, " ");
  str = str.toLowerCase().split(" ");
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(" ");
});

Vue.filter("formatDateTime", function(value) {
  return Moment(value).format("Do MMM YYYY HH:mm");
});

Vue.filter("formatDateShort", function(value) {
  return Moment(value).format("DD/MM/YYYY");
});

Vue.filter("formatDateJson", function(value) {
  return Moment(value).format("YYYY-MM-DD");
});

Vue.filter("formatCurrency", function(value, symbol, currency) {
  if (symbol != "?") {
    if (symbol.length > 1) {
      return symbol + " " + value.toFixed(2);
    } else {
      return symbol + value.toFixed(2);
    }
  } else {
    return value.toFixed(2) + " " + currency;
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
