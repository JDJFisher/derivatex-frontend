import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    page: "derivatives",
    rightSidebarShow: false,
    filters: {
      buyingParty: [],
      sellingParty: [],
      asset: [],
      strikePrice: { min: null, max: null },
      notionalValue: { in: null, max: null }
    }
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
    }
  },
  getters: {
    page: state => {
      return state.page;
    },
    rightSidebarShow: state => {
      return state.rightSidebarShow;
    },
    filters: state => {
      return state.filters;
    }
  },
  modules: {}
});
