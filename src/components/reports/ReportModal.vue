<template>
  <div class="modal-card">
      <header class="modal-card-head has-background-primary">
          <p class="modal-card-title has-text-white">View Report</p>
      </header>
      <section class="modal-card-body" style="padding-top: 0!important; padding-left: 0!important; padding-right: 0!important;">
          <div class="sticky top-0 bg-white shadow p-4">
            <div class="columns">
              <div class="column w-1/5">
                <b class="has-text-accent">Date of Report:</b>
                {{ reportMeta.target_date | formatDate }}
              </div>
              <div class="column w-1/5">
                <b class="has-text-accent">Date Generated:</b>
                {{ reportMeta.creation_date | formatDate }}
              </div>
              <div class="column w-1/5">
                <b class="has-text-accent">Number of Derivatives:</b>
                {{ reportMeta.derivative_count }}
              </div>
              <div class="column w-1/5">
                <b class="has-text-accent">Version:</b>
                {{ reportMeta.version }}
              </div>
              <div class="column w-1/5">
                <b class="has-text-accent">Status:</b>
                {{ reportMeta.status }}
              </div>
            </div>
          </div>
          <b-loading :is-full-page="false" :active.sync="loading"></b-loading>
          <b-table
            class="p-4"
            :data="!loading ? report : dummyData"
            :columns="columns"
          >
          </b-table>
      </section>
      <footer class="modal-card-foot">
          <button class="button is-primary" type="button" @click="$parent.close()">Close</button>
      </footer>
  </div>
</template>

<script>
const axios = require("axios");

import { mapGetters } from "vuex";

export default {
  data() {
    return {
      report: null,
      loading: true,
      columns: [
        {
          field: "id",
          label: "ID",
          width: "40"
        },
        {
          field: "buying_party",
          label: "Buying Party"
        },
        {
          field: "quantity",
          label: "Quantity"
        },
        {
          field: "asset",
          label: "Asset"
        },
        {
          field: "strike_price",
          label: "Strike Price"
        },
        {
          field: "underlying_price",
          label: "Underlying Price"
        },
        {
          field: "notional_value",
          label: "Notional Value"
        },
        {
          field: "date_of_trade",
          label: "Trade Date"
        },
        {
          field: "maturity_date",
          label: "Maturity Date"
        }
      ]
    };
  },
  mounted() {
    if (this.reportMeta) {
      this.getReport();
    }
  },
  computed: {
    ...mapGetters({"reportMeta": "report"}),
    dummyData() {
      var dummyDerivative = {
        id: "─",
        buying_party: "──────",
        quantity: "──",
        asset: "──────",
        strike_price: "───",
        underlying_price: "───",
        notional_value: "────",
        date_of_trade: "────────",
        maturity_date: "────────"
      };
      return Array(50)
        .fill()
        .map(() => dummyDerivative);
    }
  },
  methods: {
    getReport() {
      this.loading = true;
      axios.get(process.env.VUE_APP_API_BASE + "/reporting/get-report-data/" + this.reportMeta.id)
      .then(response => {
        this.report = response.data.report;
        this.loading = false;
      });
    }
  }
};
</script>
