<template>
  <div class="relative">
    <b-loading :is-full-page="false" :active.sync="loading"></b-loading>

    <b-button class="is-accent mb-4" @click="refresh">
      {{ flags ? 'Reload Flags' : 'Load Flags' }}
    </b-button>

    <b-button class="is-success mb-4 is-pulled-right" @click="changeSelected" :disabled="checkedRows.length == 0" v-if="node.suggested_value">
      Apply changes
    </b-button>

    <b-table
      id="derivative-table"
      v-if="!(flags == null || flags.length == 0 )"
      :columns="columns"
      :data="tableData"
      :checked-rows.sync="checkedRows"
      checkable
    >
    </b-table>

    <p class="italic text-center mt-24" v-if="!loading && flags && flags.length == 0">
      No derivates are being flagged.
    </p>

    <p class="italic text-center mt-24" v-if="!flags">
      Click 'Load Flags' to load flags.
    </p>

  </div>
</template>

<script>
const axios = require("axios");
import Moment from "moment";
import { EventBus } from "@/event-bus.js";

import EditDerivativeModal from "@/components/derivatives/EditDerivativeModal"

export default {
  props: {
    node: Object
  },
  data() {
    return {
      flags: null,
      loading: false,
      checkedRows: [],
      columns: [
        {
          field: "code",
          label: "Code",
          renderHtml: true
        },
        {
          field: "buying_party",
          label: "Buyer",
          renderHtml: true
        },
        {
          field: "selling_party",
          label: "Seller",
          renderHtml: true
        },
        {
          field: "quantity",
          label: "Quantity",
          renderHtml: true
        },
        {
          field: "asset",
          label: "Asset",
          renderHtml: true
        },
        {
          field: "strike_price",
          label: "Strike Price",
          renderHtml: true
        },
        {
          field: "date_of_trade",
          label: "Trade Date",
          renderHtml: true
        }
      ]
    };
  },
  computed: {
    tableData() {
      return this.flags.map(flag => {
        var result = {...flag.derivative};
        result.oldValue = result[this.node.suggested_feature];
        result[this.node.suggested_feature] = `<span class="line-through has-text-danger">${result[this.node.suggested_feature]}</span>`
        if (this.node.suggested_value) {
          result[this.node.suggested_feature] += `<br><span class="font-bold has-text-success">${this.node.suggested_value}</span>`
        }
        return result;
      });
    }
  },
  watch: {
    checkedRows: function() {
      if (this.node.suggested_value == null && this.checkedRows.length > 0) {
        var derivativeData = {...this.checkedRows[0]};
        derivativeData[this.node.suggested_feature] = derivativeData.oldValue;
        derivativeData.strike_price_orig = derivativeData.strike_price;
        derivativeData.date_of_trade_orig = derivativeData.date_of_trade;
        derivativeData.maturity_date_orig = derivativeData.maturity_date;
        this.$store.dispatch('set_right_sidebar_data', derivativeData);
        this.$buefy.modal.open({
          parent: this,
          component: EditDerivativeModal,
          hasModalCard: true,
          trapFocus: true
        });
        this.checkedRows = [];
      }
    }
  },
  methods: {
    refresh() {
      this.loading = true;
      this.flags = [];
      axios
        .get(`${process.env.VUE_APP_API_BASE}/learned-behaviour/get-flags/${this.node.id}`)
        .then(response => {
          this.loading = false;
          this.flags = response.data.flags;
        })
        .catch(error => {
          this.loading = false;
          this.$buefy.snackbar.open({
            message: "Failed to fetch flags.<br>" + error.response.data,
            type: "is-warning",
            position: "is-top",
            indefinite: false
          });
        });
    },
    changeSelected() {
      var leftToChange = this.checkedRows.length;
      this.checkedRows.map(row => {
        this.changeFlag(row.id).then(() => {
          leftToChange -= 1;
          this.flags = this.flags.filter(flag => flag.derivative.id != row.id);
          var newLearnedBehaviour = {...this.$store.getters['learnedBehaviour']};
          newLearnedBehaviour.actions.push({
            derivative_id: row.id,
            timestamp: Moment(),
            attribute: this.node.suggested_feature,
            old_value: row.oldValue,
            new_value: this.node.suggested_value,
            user_id: this.$store.getters['user'].id
          });
          this.$store.dispatch('set_learned_behaviour', newLearnedBehaviour);
          if (leftToChange == 0) {
            EventBus.$emit("refreshLB");
          }
        });
      });
    },
    changeFlag(derivativeId) {
      var updates = {};
      updates[this.node.suggested_feature] = this.node.suggested_value;
      return axios
        .post(`${process.env.VUE_APP_API_BASE}/derivative-management/update-derivative/${derivativeId}`,
        {
          updates: updates,
          user_id: this.$store.getters['user'].id,
          tree_id: this.node.id
        })
        .catch(error => {
          this.$buefy.snackbar.open({
            message: "Failed to modify derivative.<br>" + error.response.data,
            type: "is-warning",
            position: "is-top",
            indefinite: false
          });
        });
    }
  }
};
</script>
