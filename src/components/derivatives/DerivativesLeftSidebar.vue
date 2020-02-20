<template>
  <transition name="slide-fade" mode="out-in">
    <b-menu v-if="activeFilter == null">
      <b-menu-list label="Filters">
        <DerivativeFilterHeader
          filter-name="Buying Party"
          :filter-string="buyingPartyString"
          @click="activeFilter = 'buyingParty'"
        />
        <DerivativeFilterHeader
          filter-name="Selling Party"
          :filter-string="sellingPartyString"
          @click="activeFilter = 'sellingParty'"
        />
        <DerivativeFilterHeader
          filter-name="Asset"
          :filter-string="assetString"
          @click="activeFilter = 'asset'"
        />
        <DerivativeFilterHeader
          filter-name="Strike Price"
          :filter-string="strikePriceString"
          @click="activeFilter = 'strikePrice'"
        />
        <DerivativeFilterHeader
          filter-name="Notional Value"
          :filter-string="notionalValueString"
          @click="activeFilter = 'notionalValue'"
        />
      </b-menu-list>
    </b-menu>

    <DerivativeFilter
      filter-string="Buying Party"
      :initialValue="filters.buyingParty"
      mutation="set_buying_party_filter"
      type="multiselect"
      :options="[1, 2, 3]"
      v-else-if="activeFilter == 'buyingParty'"
      @close="activeFilter = null"
    />

    <DerivativeFilter
      filter-string="Selling Party"
      :initialValue="filters.sellingParty"
      mutation="set_selling_party_filter"
      type="multiselect"
      :options="[4, 5, 6]"
      v-else-if="activeFilter == 'sellingParty'"
      @close="activeFilter = null"
    />

    <DerivativeFilter
      filter-string="Asset"
      :initialValue="filters.asset"
      mutation="set_asset_filter"
      type="multiselect"
      :options="[7, 8, 9]"
      v-else-if="activeFilter == 'asset'"
      @close="activeFilter = null"
    />

    <DerivativeFilter
      filter-string="Strike Price"
      :initialValue="filters.strikePrice"
      mutation="set_strike_price_filter"
      type="range"
      v-else-if="activeFilter == 'strikePrice'"
      @close="activeFilter = null"
    />

    <DerivativeFilter
      filter-string="Notional Value"
      :initialValue="filters.notionalValue"
      mutation="set_notional_value_filter"
      type="range"
      v-else-if="activeFilter == 'notionalValue'"
      @close="activeFilter = null"
    />
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

import DerivativeFilter from "@/components/derivatives/DerivativeFilter";
import DerivativeFilterHeader from "@/components/derivatives/DerivativeFilterHeader";

export default {
  components: {
    DerivativeFilter,
    DerivativeFilterHeader
  },
  computed: {
    ...mapGetters(["filters"]),
    buyingPartyString() {
      if (this.filters.buyingParty.length == 0) {
        return "No filter";
      }
      return this.filters.buyingParty
        .reduce((acc, x) => {
          return acc + x + ", ";
        }, "")
        .slice(0, -2);
    },
    sellingPartyString() {
      if (this.filters.sellingParty.length == 0) {
        return "No filter";
      }
      return this.filters.sellingParty
        .reduce((acc, x) => {
          return acc + x + ", ";
        }, "")
        .slice(0, -2);
    },
    assetString() {
      if (this.filters.asset.length == 0) {
        return "No filter";
      }
      return this.filters.asset
        .reduce((acc, x) => {
          return acc + x + ", ";
        }, "")
        .slice(0, -2);
    },
    strikePriceString() {
      if (this.filters.strikePrice.min == null) {
        return "No filter";
      }
      return `$${this.filters.strikePrice.min} - $${this.filters.strikePrice.max}`;
    },
    notionalValueString() {
      if (this.filters.notionalValue.min == null) {
        return "No filter";
      }
      return `$${this.filters.notionalValue.min} - $${this.filters.notionalValue.max}`;
    }
  },
  data() {
    return {
      isActive: true,
      activeFilter: null
    };
  }
};
</script>
