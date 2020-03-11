<template>
  <div class="p-4 w-full flex flex-col">
    <div class="mb-4">
      <p class="subtitle is-5 pt-4 has-text-accent">
        Derivative: {{ derivative.code }}
      </p>
    </div>
    <div class="mb-4">
      <b-button
        class="is-accent"
        :disabled="derivative.absolute"
        @click="editDerivative"
      >
        Edit
      </b-button>
      <b-button
        class="is-danger float-right"
        :disabled="derivative.absolute"
        @click="deleteDerivative"
      >
        Delete
      </b-button>
      <p
        class="text-xs text-center italic pt-2"
        v-if="derivative.absolute && !derivative.deleted"
      >
        Derivative cannot be edited or deleted - it is absolute.
      </p>
      <p
        class="text-xs text-center italic pt-2 has-text-danger"
        v-if="derivative.deleted"
      >
        Derivative has been deleted.
      </p>
    </div>
    <div>
      <div class="content">
        <b>Asset</b>: <span v-html="derivative.asset">{{ derivative.asset }}</span><br />
        <b>Buying Party</b>: <span v-html="derivative.buying_party"></span><br />
        <b>Selling Party</b>: <span v-html="derivative.selling_party"></span><br />
        <b>Trade Date</b>: <span v-html="derivative.date_of_trade"></span><br />
        <b>Maturity Date</b>: <span v-html="derivative.maturity_date"></span><br />
        <b>Quantity</b>: <span v-html="derivative.quantity"></span><br />
        <b>Strike Price</b>: <span v-html="derivative.strike_price"></span><br />
        <b>Underlying Price</b>: <span v-html="derivative.underlying_price"></span><br />
        <b>Notional Value</b>: <span v-html="derivative.notional_value"></span><br />
      </div>
      <hr />
    </div>
    <div>
      <p class="subtitle is-5 pt-4 has-text-accent">
        Activity
      </p>
      <div class="">
        <v-timeline dense>
          <v-timeline-item
            fill-dot
            right
            small
            v-for="action in actions"
            :key="action.id"
          >
            <template v-slot:icon>
              <v-avatar>
                <img :src="action.user.profile_image" class="object-cover" />
              </v-avatar>
            </template>
            <v-card class="p-2">
              <b
                ><i>{{ action.user.f_name }} {{ action.user.l_name }}</i></b
              ><br />
              <span class="text-xs"
                >{{ action.timestamp | formatDateTime }}<br
              /></span>
              <b>{{ action.type | titleCase }}</b>
              <span class="text-sm ml-1">{{
                (action.type == "UPDATE" ? action.update_log.attribute : "")
                  | titleCase
              }}</span>
              <p v-if="action.type == 'UPDATE'">
                <span class="text-xs">
                  <i
                    >{{ action.update_log.old_value }} →
                    {{ action.update_log.new_value }}</i
                  >
                </span>
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

import EditDerivativeModal from "@/components/derivatives/EditDerivativeModal";
import DeleteDerivativeModal from "@/components/derivatives/DeleteDerivativeModal";

export default {
  computed: {
    ...mapGetters({ derivative: "rightSidebarData" })
  },
  data() {
    return {
      actions: [],
      loadingActions: false
    };
  },
  watch: {
    "derivative.associated_actions": function() {
      this.refreshActions();
    }
  },
  methods: {
    editDerivative() {
      this.$buefy.modal.open({
        parent: this,
        component: EditDerivativeModal,
        hasModalCard: true,
        trapFocus: true
      });
    },
    deleteDerivative() {
      this.$buefy.modal.open({
        parent: this,
        component: DeleteDerivativeModal,
        hasModalCard: true,
        trapFocus: true
      });
    },
    refreshActions() {
      this.actions = [];
      this.loadingActions = true;
      var actionsToLoad = this.derivative.associated_actions.length;
      this.derivative.associated_actions.forEach(actionId => {
        axios
          .get(
            `${process.env.VUE_APP_API_BASE}/action-management/get-action/${actionId}`
          )
          .then(response => {
            axios
              .get(
                `${process.env.VUE_APP_API_BASE}/user-account-control/get-user/${response.data.action.user_id}`
              )
              .then(userResponse => {
                actionsToLoad -= 1;
                response.data.action.user = userResponse.data.user;
                this.actions.push(response.data.action);
                if (actionsToLoad == 0) {
                  this.loading = false;
                  this.actions.sort((a, b) => {
                    return Moment(b.timestamp).diff(Moment(a.timestamp));
                  });
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
