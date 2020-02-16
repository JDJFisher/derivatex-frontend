import Vue from "vue";
import Vuex from "vuex";

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
      notionalValue: { in: null, max: null }
    },
    orderBy: {
      field: "date_of_trade",
      order: "descending"
    },
    report: null
  },
  mutations: {
    set_page(state, page) {
      state.page = page;
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
    set_order_by({ commit }, value) {
      commit("set_order_by", value);
    },
    set_right_sidebar_data({ commit }, value) {
      commit("set_right_sidebar_data", value);
    },
    set_report({ commit }, value) {
      commit("set_report", value);
    }
  },
  getters: {
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
