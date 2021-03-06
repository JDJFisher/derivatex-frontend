import Vue from "vue";
import Vuex from "vuex";
import Moment from "moment";

import { EventBus } from "@/event-bus.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    page: "derivatives",
    rightSidebarShow: false,
    rightSidebarData: {},
    filters: {
      buyingParty: [],
      sellingParty: [],
      asset: [],
      strikePrice: { min: null, max: null },
      notionalValue: { in: null, max: null },
      dateFrom: Moment()
        .startOf("week")
        .subtract(1, "week"),
      dateTo: Moment()
        .endOf("week")
        .subtract(1, "week"),
      showDeleted: false,
      hideNotDeleted: false,
      searchTerm: ""
    },
    orderBy: {
      field: "date_of_trade",
      order: "ascending"
    },
    report: null,
    user: null,
    companies: [],
    assets: [],
    currencies: [],
    learnedBehaviour: {}
  },
  mutations: {
    set_page(state, page) {
      state.page = page;
      state.filters.searchTerm = "";
      if (state.page == 'derivatives') {
        EventBus.$emit("refreshFilters");
      }
    },
    set_right_sidebar_show(state, rightSidebarShow) {
      state.rightSidebarShow = rightSidebarShow;
    },
    set_filter(state, payload) {
      state.filters[payload.filter] = payload.value;
    },
    set_order_by(state, orderBy) {
      state.orderBy = orderBy;
    },
    set_right_sidebar_data(state, rightSidebarData) {
      state.rightSidebarData = rightSidebarData;
    },
    set_report(state, report) {
      state.report = report;
    },
    set_user(state, user) {
      state.user = user;
    },
    set_companies(state, companies) {
      state.companies = companies;
    },
    set_assets(state, assets) {
      state.assets = assets;
    },
    set_currencies(state, currencies) {
      state.currencies = currencies;
    },
    set_learned_behaviour(state, learnedBehaviour) {
      state.learnedBehaviour = learnedBehaviour;
    }
  },
  actions: {
    set_page({ commit }, page) {
      commit("set_page", page);
    },
    set_right_sidebar_show({ commit }, rightSidebarShow) {
      commit("set_right_sidebar_show", rightSidebarShow);
    },
    set_buying_party_filter({ commit }, value) {
      commit("set_filter", { filter: "buyingParty", value: value });
    },
    set_selling_party_filter({ commit }, value) {
      commit("set_filter", { filter: "sellingParty", value: value });
    },
    set_asset_filter({ commit }, value) {
      commit("set_filter", { filter: "asset", value: value });
    },
    set_strike_price_filter({ commit }, value) {
      commit("set_filter", { filter: "strikePrice", value: value });
    },
    set_notional_value_filter({ commit }, value) {
      commit("set_filter", { filter: "notionalValue", value: value });
    },
    set_date_from_filter({ commit }, value) {
      commit("set_filter", { filter: "dateFrom", value: value });
    },
    set_date_to_filter({ commit }, value) {
      commit("set_filter", { filter: "dateTo", value: value });
    },
    set_show_deleted_filter({ commit }, value) {
      commit("set_filter", { filter: "showDeleted", value: value });
    },
    set_hide_not_deleted_filter({ commit }, value) {
      commit("set_filter", { filter: "hideNotDeleted", value: value });
    },
    set_search_term_filter({ commit }, value) {
      commit("set_filter", { filter: "searchTerm", value: value });
    },
    set_order_by({ commit }, value) {
      commit("set_order_by", value);
    },
    set_right_sidebar_data({ commit }, value) {
      commit("set_right_sidebar_data", value);
    },
    set_report({ commit }, value) {
      commit("set_report", value);
    },
    set_user({ commit }, value) {
      commit("set_user", value);
    },
    set_companies({ commit }, value) {
      commit("set_companies", value);
    },
    set_assets({ commit }, value) {
      commit("set_assets", value);
    },
    set_currencies({ commit }, value) {
      commit("set_currencies", value);
    },
    set_learned_behaviour({ commit }, value) {
      commit("set_learned_behaviour", value);
    }
  },
  getters: {
    learnedBehaviour: state => {
      return state.learnedBehaviour;
    },
    companies: state => {
      return state.companies;
    },
    assets: state => {
      return state.assets;
    },
    currencies: state => {
      return state.currencies;
    },
    user: state => {
      return state.user;
    },
    page: state => {
      return state.page;
    },
    rightSidebarShow: state => {
      return state.rightSidebarShow;
    },
    rightSidebarData: state => {
      return state.rightSidebarData;
    },
    filters: state => {
      return state.filters;
    },
    orderBy: state => {
      return state.orderBy;
    },
    filterCount: state => {
      var result = 0;
      if (state.filters.buyingParty.length > 0) {
        result += 1;
      }
      if (state.filters.sellingParty.length > 0) {
        result += 1;
      }
      if (state.filters.asset.length > 0) {
        result += 1;
      }
      if (state.filters.strikePrice.max != null) {
        result += 1;
      }
      if (state.filters.notionalValue.max != null) {
        result += 1;
      }
      return result;
    },
    report: state => {
      return state.report;
    }
  },
  modules: {}
});
