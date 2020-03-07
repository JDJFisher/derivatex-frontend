<template>
  <transition name="slide-fade" mode="out-in">
    <b-menu v-if="activeFilter == null">
      <b-menu-list label="Filters">
        <FilterHeader
          filter-name="Buying Party"
          :filter-string="buyingPartyString"
          @click="activeFilter = 'buyingParty'"
        />
        <FilterHeader
          filter-name="Selling Party"
          :filter-string="sellingPartyString"
          @click="activeFilter = 'sellingParty'"
        />
        <FilterHeader
          filter-name="Asset"
          :filter-string="assetString"
          @click="activeFilter = 'asset'"
        />
        <FilterHeader
          filter-name="Strike Price"
          :filter-string="strikePriceString"
          @click="activeFilter = 'strikePrice'"
        />
        <FilterHeader
          filter-name="Notional Value"
          :filter-string="notionalValueString"
          @click="activeFilter = 'notionalValue'"
        />
      </b-menu-list>
    </b-menu>

    <FilterBody
      filter-string="Buying Party"
      :initialValue="filters.buyingParty"
      mutation="set_buying_party_filter"
      type="multiselect"
      :multiselect-object="true"
      multiselect-key-by="value"
      multiselect-label="label"
      :options="companies"
      v-else-if="activeFilter == 'buyingParty'"
      @close="activeFilter = null"
    />

    <FilterBody
      filter-string="Selling Party"
      :initialValue="filters.sellingParty"
      mutation="set_selling_party_filter"
      type="multiselect"
      :multiselect-object="true"
      multiselect-key-by="value"
      multiselect-label="label"
      :options="companies"
      v-else-if="activeFilter == 'sellingParty'"
      @close="activeFilter = null"
    />

    <FilterBody
      filter-string="Asset"
      :initialValue="filters.asset"
      mutation="set_asset_filter"
      type="multiselect"
      :options="assets"
      v-else-if="activeFilter == 'asset'"
      @close="activeFilter = null"
    />

    <FilterBody
      filter-string="Strike Price"
      :initialValue="filters.strikePrice"
      mutation="set_strike_price_filter"
      type="range"
      v-else-if="activeFilter == 'strikePrice'"
      @close="activeFilter = null"
    />

    <FilterBody
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

import FilterBody from "@/components/ui/FilterBody";
import FilterHeader from "@/components/ui/FilterHeader";

export default {
  components: {
    FilterBody,
    FilterHeader
  },
  computed: {
    ...mapGetters(["filters", "companies", "assets"]),
    buyingPartyString() {
      if (this.filters.buyingParty.length == 0) {
        return "No filter";
      }
      return this.filters.buyingParty
        .reduce((acc, x) => {
          return acc + x.value + ", ";
        }, "")
        .slice(0, -2);
    },
    sellingPartyString() {
      if (this.filters.sellingParty.length == 0) {
        return "No filter";
      }
      return this.filters.sellingParty
        .reduce((acc, x) => {
          return acc + x.value + ", ";
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
