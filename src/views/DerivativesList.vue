<template>
  <div>
    <div class="mb-4 flex flex-row">
      <b-button class="w-2/12 mr-4 is-accent" @click="addDerivative">
        Add Derivative
      </b-button>
      <b-input
        v-model="searchString"
        placeholder="Start typing to search..."
        class="w-4/12 flex-auto mr-4 border-none"
      />
      <div
        class="bg-white rounded shadow px-2 py-1 w-4/12 flex-auto flex flex-row"
      >
        <div class="w-1/6 font-bold align-middle" style="padding-top: 0.125rem">
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

        <div class="w-1/6 flex flex-row">
          <div class="w-1/2">
            <b-tooltip label="Order ascending" position="is-top" animated>
              <ArrowUp
                class="w-full cursor-pointer"
                :class="orderBy.order == 'ascending' ? 'accent' : ''"
                @click="changeOrderByOrder('ascending')"
              />
            </b-tooltip>
          </div>
          <div class="w-1/2">
            <b-tooltip label="Order descending" position="is-top" animated>
              <ArrowDown
                class="w-full cursor-pointer"
                :class="orderBy.order == 'descending' ? 'accent' : ''"
                @click="changeOrderByOrder('descending')"
              />
            </b-tooltip>
          </div>
        </div>

        <div class="w-1/6 flex flex-row">
          <div class="w-1/2">
            <b-tooltip
              :label="
                `${!filters.hideNotDeleted ? 'Hide' : 'Show'} not deleted`
              "
              position="is-top"
              animated
            >
              <DeleteOff
                class="w-full cursor-pointer"
                :class="!filters.hideNotDeleted ? 'accent' : ''"
                @click="
                  changeShowDeleted(
                    'set_hide_not_deleted_filter',
                    !filters.hideNotDeleted
                  )
                "
              />
            </b-tooltip>
          </div>
          <div class="w-1/2">
            <b-tooltip
              :label="`${filters.showDeleted ? 'Hide' : 'Show'} deleted`"
              position="is-top"
              animated
            >
              <Delete
                class="w-full cursor-pointer"
                :class="filters.showDeleted ? 'accent' : ''"
                @click="
                  changeShowDeleted(
                    'set_show_deleted_filter',
                    !filters.showDeleted
                  )
                "
              />
            </b-tooltip>
          </div>
        </div>
      </div>
    </div>

    <b-loading :is-full-page="false" :active.sync="loading"></b-loading>
    <div
      class="text-lg text-center mt-16"
      v-if="!loading && derivatives.length == 0"
    >
      There are no derivatives to show<br />
      Try changing your filters
    </div>
    <b-table
      id="derivative-table"
      :data="!loading ? highlightedData : dummyData"
      :columns="columns"
      :selected.sync="selected"
      :row-class="
        (row, index) =>
          row.deleted == 1
            ? 'line-through text-gray-500 deriv-row'
            : 'deriv-row'
      "
      @select="tableRowSelect($event)"
      v-if="loading || derivatives.length > 0"
    >
    </b-table>
    <b-pagination
      :total="paginationData.total"
      :current.sync="paginationData.currentPage"
      :simple="false"
      :per-page="1"
      style="margin-top: 1rem"
      v-if="loading || derivatives.length > 0"
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
import { EventBus } from "@/event-bus.js";

import Delete from "vue-material-design-icons/Delete.vue";
import ArrowUp from "vue-material-design-icons/ArrowUp.vue";
import ArrowDown from "vue-material-design-icons/ArrowDown.vue";
import DeleteOff from "vue-material-design-icons/DeleteOff.vue";
import AddDerivativeModal from "@/components/derivatives/AddDerivativeModal";

const axios = require("axios");

export default {
  components: {
    Delete,
    ArrowUp,
    ArrowDown,
    DeleteOff
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
      loadCounter: 0,
      loading: false,
      columns: [
        {
          field: "code",
          label: "Code",
          renderHtml: true
        },
        {
          field: "buying_party",
          label: "Buying Party",
          renderHtml: true
        },
        {
          field: "selling_party",
          label: "Selling Party",
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
          field: "underlying_price",
          label: "Underlying Price",
          renderHtml: true
        },
        {
          field: "notional_value",
          label: "Notional Value",
          renderHtml: true
        },
        {
          field: "date_of_trade",
          label: "Trade Date",
          renderHtml: true
        },
        {
          field: "maturity_date",
          label: "Maturity Date",
          renderHtml: true
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
    },
    searchString: function() {
      this.$store.dispatch("set_search_term_filter", this.searchString);
      EventBus.$emit("refreshFilters");
    }
  },
  computed: {
    ...mapGetters(["orderBy", "filters"]),
    dummyData() {
      var dummyDerivative = {
        code: "─",
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
    },
    highlightedData() {
      if (!this.searchString) {
        return this.derivatives;
      }
      return this.derivatives.map(derivative => {
        var highlighted = { ...derivative };
        var regex = new RegExp(this.searchString, "i");
        var fields = [
          "code",
          "buying_party",
          "selling_party",
          "asset",
          "date_of_trade",
          "maturity_date"
        ];
        fields.forEach(property => {
          highlighted[property] = highlighted[property].replace(
            regex,
            "<span class='highlight'>$&</span>"
          );
        });
        return highlighted;
      });
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
    changeShowDeleted(mutation, value) {
      this.$store.dispatch(mutation, value);
      EventBus.$emit("refreshFilters");
    },
    getDerivatives(page_number) {
      this.derivatives = [];
      this.loadCounter += 1;
      var thisLoadCounter = this.loadCounter;
      this.loading = true;
      var derivativesLeftToLoad = 0;

      var url = `/derivative-management/index-derivatives?page_number=${page_number -
        1}&order_key=${this.orderBy.field}`;
      if (this.orderBy.order == "descending") {
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
      this.filters.buyingParty.map(buying_party => {
        url += `&buyers=${buying_party.value}`;
      });
      this.filters.sellingParty.map(selling_party => {
        url += `&sellers=${selling_party.value}`;
      });
      this.filters.asset.map(asset => {
        url += `&assets=${asset}`;
      });
      if (this.filters.showDeleted) {
        url += `&show_deleted=true`;
      }
      if (this.filters.hideNotDeleted) {
        url += `&hide_not_deleted=true`;
      }
      if (this.filters.searchTerm.length > 0) {
        url += `&search_term=${this.filters.searchTerm}`;
      }

      axios
        .get(process.env.VUE_APP_API_BASE + url)
        .then(response => {
          this.derivativeIds = response.data.derivatives;
          derivativesLeftToLoad = response.data.derivatives.length;
          if (derivativesLeftToLoad == 0) {
            this.loading = false;
          }
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
                newDerivative.maturity_date_orig = newDerivative.maturity_date;
                newDerivative.date_of_trade_orig = newDerivative.date_of_trade;
                newDerivative.strike_price_orig = newDerivative.strike_price;
                newDerivative.underlying_price_orig =
                  newDerivative.underlying_price;
                newDerivative.notional_value_orig =
                  newDerivative.notional_value;

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
                newDerivative.maturity_date = this.$options.filters.formatDate(
                  newDerivative.maturity_date
                );
                newDerivative.date_of_trade = this.$options.filters.formatDate(
                  newDerivative.date_of_trade
                );
                newDerivative.notional_value = this.$options.filters.formatCurrency(
                  newDerivative.notional_value,
                  newDerivative.notional_curr_symbol,
                  newDerivative.notional_curr_code
                );
                if (thisLoadCounter == this.loadCounter) {
                  this.derivatives.push(newDerivative);
                  derivativesLeftToLoad -= 1;
                  if (derivativesLeftToLoad == 0) {
                    this.loading = false;
                    this.derivatives.sort((a, b) => {
                      return (
                        this.derivativeIds.findIndex(x => x == a.id) -
                        this.derivativeIds.findIndex(x => x == b.id)
                      );
                    });
                  }
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
.highlight {
  color: red;
  font-weight: bold !important;
  animation: pulse 2s 1;
  border-radius: 5px;
  box-shadow: 0 0 0 0 rgba(255, 0, 0, 1);
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(255, 0, 0, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
  }
}

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
