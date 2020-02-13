<template>
  <div>
    <div class="mb-4 flex flex-row">
      <b-input
        v-model="searchString"
        placeholder="Start typing to search..."
        class="w-9/12 flex-auto mr-4 border-none"
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

    <b-table
      :data="data"
      :columns="columns"
      :selected.sync="selected"
      @select="$store.dispatch('set_right_sidebar_show', true)"
    >
    </b-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import ArrowUp from "vue-material-design-icons/ArrowUp.vue";
import ArrowDown from "vue-material-design-icons/ArrowDown.vue";

export default {
  components: {
    ArrowUp,
    ArrowDown
  },
  computed: {
    ...mapGetters(["orderBy"])
  },
  data() {
    const data = [
      {
        id: 1,
        underlying_asset: "Housing",
        currency: "GBP",
        date: "2016-10-15 13:43:27",
        value: "£1.40"
      },
      {
        id: 2,
        underlying_asset: "Currency",
        currency: "USB",
        date: "2017-08-07 13:43:27",
        value: "£10.20"
      },
      {
        id: 3,
        underlying_asset: "Assets",
        currency: "USD",
        date: "2018-01-21 13:43:27",
        value: "£25.20"
      },
      {
        id: 4,
        underlying_asset: "Derivatives",
        currency: "JPY",
        date: "2018-03-16 13:43:27",
        value: "£15.10"
      },
      {
        id: 5,
        underlying_asset: "Stock ISA",
        currency: "AFB",
        date: "2019-05-18 13:43:27",
        value: "£9.50"
      }
    ];

    return {
      data,
      selected: null,
      newOrderByField: null,
      searchString: null,
      columns: [
        {
          field: "id",
          label: "ID",
          width: "40",
          numeric: true
        },
        {
          field: "underlying_asset",
          label: "Underlying Asset"
        },
        {
          field: "currency",
          label: "Currency"
        },
        {
          field: "date",
          label: "Date",
          centered: true
        },
        {
          field: "value",
          label: "Value"
        }
      ]
    };
  },
  mounted() {
    this.newOrderByField = this.orderBy.field;
  },
  methods: {
    changeOrderByField() {
      this.$store.dispatch("set_order_by", {
        order: this.orderBy.order,
        field: this.newOrderByField
      });
    },
    changeOrderByOrder(value) {
      this.$store.dispatch("set_order_by", {
        order: value,
        field: this.orderBy.field
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
