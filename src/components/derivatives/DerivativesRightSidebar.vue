<template>
  <div class="p-4 w-full flex flex-col">
    <div class="mb-4">
      <p class="subtitle is-5 pt-4 has-text-accent">
        Derivative: {{ derivative.code }}
      </p>
    </div>
    <div class="mb-4">
      <b-button class="is-accent">
        Edit
      </b-button>
      <b-button class="is-danger float-right">
        Delete
      </b-button>
    </div>
    <div>
      <div class="content">
        <b>Asset</b>: {{ derivative.asset }}<br />
        <b>Buying Party</b>: {{ derivative.buying_party }}<br />
        <b>Selling Party</b>: {{ derivative.selling_party }}<br />
        <b>Trade Date</b>: {{ derivative.date_of_trade }}<br />
        <b>Maturity Date</b>: {{ derivative.maturity_date }}<br />
        <b>Quantity</b>: {{ derivative.quantity }}<br />
        <b>Strike Price</b>: {{ derivative.strike_price }}<br />
        <b>Underlying Price</b>: {{ derivative.underlying_price }}<br />
        <b>Notional Value</b>: {{ derivative.notional_value }}<br />
      </div>
      <hr />
    </div>
    <div>
      <p class="subtitle is-5 pt-4 has-text-accent">
        Activity
      </p>
      <div class="">
        <v-timeline dense>

          <v-timeline-item fill-dot right small v-for="action in actions" :key="action.id">
            <template v-slot:icon>
              <v-avatar>
                <img :src="action.user.profile_image" class="object-cover">
              </v-avatar>
            </template>
            <v-card class="p-2">
              <b><i>{{ action.user.f_name }} {{ action.user.l_name }}</i></b><br>
              {{ action.timestamp | formatDateTime }}<br><br>
              <b>{{ action.type | titleCase }}</b>
              <p v-if="action.type == 'UPDATE'">
                <b>{{ action.update_log.attribute | titleCase}}</b><br>
                <i>{{ action.update_log.old_value }} → {{ action.update_log.new_value }}</i>
              </p>
            </v-card>
          </v-timeline-item>

        </v-timeline>
      </div>
    </div>
  </div>
</template>

<script>
import Moment from "moment";
const axios = require("axios");
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({ derivative: "rightSidebarData" }),
  },
  data() {
    return {
      actions: [],
      loadingActions: false
    }
  },
  watch: {
    'derivative.associated_actions': function() {
      this.refreshActions();
    }
  },
  methods: {
    refreshActions() {
      this.actions = [];
      this.loadingActions = true;
      var actionsToLoad = this.derivative.associated_actions.length;
      this.derivative.associated_actions.forEach(actionId => {
        axios
          .get(
            `${process.env.VUE_APP_API_BASE}/action-management/get-action/${actionId}`
          )
          .then((response) => {
            axios
              .get(
                `${process.env.VUE_APP_API_BASE}/user-account-control/get-user/${response.data.action.user_id}`
              )
              .then((userResponse) => {
                actionsToLoad -= 1;
                response.data.action.user = userResponse.data.user;
                this.actions.push(response.data.action);
                if (actionsToLoad == 0) {
                  this.loading = false;
                  this.actions.sort((a, b) => {
                    return Moment(b.timestamp).diff(Moment(a.timestamp));
                  })
                }
              });
          });
      });
    }
  },
  mounted() {
    this.refreshActions();
  }
};
</script>
