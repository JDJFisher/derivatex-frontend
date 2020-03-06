<template>
  <div>
    <div class="mb-4 flex flex-row">
      <b-button
        class="w-1/12 mr-4 is-accent"
        @click="addDerivative"
      >
        Add Derivative
      </b-button>
      <b-input
        v-model="searchString"
        placeholder="Start typing to search..."
        class="w-6/12 flex-auto mr-4 border-none"
      />
      <div
        class="bg-white rounded shadow px-2 py-1 w-3/12 flex-auto flex flex-row"
      >
        <div class="w-1/4 font-bold align-middle" style="padding-top: 0.125rem">
          Order By
        </div>

        <b-select
          class="w-1/2"
          style="padding-top: 0.125rem"
          v-model="newOrderByField"
          @input="changeOrderByField"
        >
          <option value="buying_party">
            Buying Party
          </option>
          <option value="selling_party">
            Selling Party
          </option>
          <option value="strike_price">
            Strike Price
          </option>
          <option value="notional_value">
            Notional Value
          </option>
          <option value="maturity_date">
            Maturity Date
          </option>
          <option value="date_of_trade">
            Date of Trade
          </option>
        </b-select>

        <div class="w-1/4 flex flex-row">
          <ArrowUp
            class="w-1/2 cursor-pointer"
            :class="orderBy.order == 'ascending' ? 'accent' : ''"
            @click="changeOrderByOrder('ascending')"
          />
          <ArrowDown
            class="w-1/2 cursor-pointer"
            :class="orderBy.order == 'descending' ? 'accent' : ''"
            @click="changeOrderByOrder('descending')"
          />
        </div>
      </div>
    </div>

    <b-loading :is-full-page="false" :active.sync="loading"></b-loading>
    <b-table
      :data="!loading ? derivatives : dummyData"
      :columns="columns"
      :selected.sync="selected"
      @select="tableRowSelect($event)"
    >
    </b-table>
    <b-pagination
      :total="paginationData.total"
      :current.sync="paginationData.currentPage"
      :simple="false"
      :per-page="1"
      style="margin-top: 1rem"
    >
      <b-pagination-button
        slot="previous"
        slot-scope="props"
        :page="props.page"
      >
        Previous
      </b-pagination-button>

      <b-pagination-button slot="next" slot-scope="props" :page="props.page">
        Next
      </b-pagination-button>
    </b-pagination>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { EventBus } from '@/event-bus.js';

import ArrowUp from "vue-material-design-icons/ArrowUp.vue";
import ArrowDown from "vue-material-design-icons/ArrowDown.vue";
import AddDerivativeModal from "@/components/derivatives/AddDerivativeModal";

const axios = require("axios");

export default {
  components: {
    ArrowUp,
    ArrowDown
  },
  data() {
    return {
      selected: null,
      newOrderByField: null,
      searchString: null,
      derivatives: [],
      derivativeIds: [],
      paginationData: {
        total: 0,
        currentPage: 1
      },
      loading: false,
      columns: [
        {
          field: "code",
          label: "Code"
        },
        {
          field: "buying_party",
          label: "Buying Party"
        },
        {
          field: "selling_party",
          label: "Selling Party"
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
    this.newOrderByField = this.orderBy.field;
    this.getDerivatives(1);
    EventBus.$on("refreshFilters", () => {
      this.getDerivatives(this.paginationData.currentPage);
    });
  },
  watch: {
    "paginationData.currentPage": function() {
      this.getDerivatives(this.paginationData.currentPage);
    }
  },
  computed: {
    ...mapGetters(["orderBy", "filters"]),
    dummyData() {
      var dummyDerivative = {
        id: "─",
        buying_party: "──────",
        selling_party: "──────",
        quantity: "──",
        asset: "──────",
        strike_price: "───",
        underlying_price: "───",
        notional_value: "────",
        date_of_trade: "────────",
        maturity_date: "────────"
      };
      return Array(15)
        .fill()
        .map(() => dummyDerivative);
    }
  },
  methods: {
    addDerivative() {
      this.$buefy.modal.open({
          parent: this,
          component: AddDerivativeModal,
          hasModalCard: true,
          trapFocus: true
      });
    },
    tableRowSelect(payload) {
      this.$store.dispatch("set_right_sidebar_show", true);
      this.$store.dispatch("set_right_sidebar_data", payload);
    },
    changeOrderByField() {
      this.$store.dispatch("set_order_by", {
        order: this.orderBy.order,
        field: this.newOrderByField
      });
      this.getDerivatives(this.paginationData.currentPage);
    },
    changeOrderByOrder(value) {
      this.$store.dispatch("set_order_by", {
        order: value,
        field: this.orderBy.field
      });
      this.getDerivatives(this.paginationData.currentPage);
    },
    getDerivatives(page_number) {
      this.derivatives = [];
      this.loading = true;
      var derivativesLeftToLoad = 0;

      var url = `/derivative-management/index-derivatives?page_number=${(page_number - 1)}&order_key=${this.orderBy.field}`;
      if (this.orderBy.order == 'descending') {
        url += "&reverse_order=true";
      }
      if (this.filters.strikePrice.min) {
        url += `&min_strike_price=${this.filters.strikePrice.min}`;
      }
      if (this.filters.strikePrice.max) {
        url += `&max_strike_price=${this.filters.strikePrice.max}`;
      }
      if (this.filters.notionalValue.min) {
        url += `&min_notional_value=${this.filters.notionalValue.min}`;
      }
      if (this.filters.notionalValue.max) {
        url += `&min_notional_value=${this.filters.notionalValue.max}`;
      }

      axios
        .get(
          process.env.VUE_APP_API_BASE + url
        )
        .then(response => {
          this.derivativeIds = response.data.derivatives;
          derivativesLeftToLoad = response.data.derivatives.length;
          response.data.derivatives.forEach(deriativeId => {
            axios
              .get(
                process.env.VUE_APP_API_BASE +
                  "/derivative-management/get-derivative/" +
                  deriativeId
              )
              .then(response => {
              /* eslint no-console: ["error", { allow: ["log"] }] */
                var newDerivative = response.data.derivative;
                newDerivative.maturity_date = this.$options.filters.formatDate(
                  newDerivative.maturity_date
                );
                newDerivative.date_of_trade = this.$options.filters.formatDate(
                  newDerivative.date_of_trade
                );
                newDerivative.strike_price = this.$options.filters.formatCurrency(
                  newDerivative.strike_price,
                  newDerivative.underlying_curr_symbol,
                  newDerivative.underlying_curr_code
                );
                newDerivative.underlying_price = this.$options.filters.formatCurrency(
                  newDerivative.underlying_price,
                  newDerivative.underlying_curr_symbol,
                  newDerivative.underlying_curr_code
                );
                newDerivative.notional_value = this.$options.filters.formatCurrency(
                  newDerivative.notional_value,
                  newDerivative.notional_curr_symbol,
                  newDerivative.notional_curr_code
                );
                this.derivatives.push(newDerivative);
                derivativesLeftToLoad -= 1;
                if (derivativesLeftToLoad == 0) {
                  this.loading = false;
                  this.derivatives.sort((a, b) => {
                    return this.derivativeIds.findIndex(x => x == a.id) - this.derivativeIds.findIndex(x => x == b.id);
                  });
                }
              });
          });
          this.paginationData.total = response.data.page_count;
        })
        .catch(error => {
          this.$buefy.snackbar.open({
            message: "Failed to fetch Derivatives.<br>" + error,
            type: "is-warning",
            position: "is-top",
            actionText: "Retry",
            indefinite: false,
            onAction: () => {
              this.getDerivatives(this.paginationData.currentPage);
            }
          });
        });
    }
  }
};
</script>

<style>
select {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  border-width: 0 !important;
  border: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  padding-left: 0 !important;
  height: 1.5em !important;
}

select:focus {
  border-width: 0 !important;
  border: 0 !important;
  box-shadow: none !important;
}

.select {
  height: 1.5em !important;
}

.accent {
  color: #2e9cea;
}
</style>
