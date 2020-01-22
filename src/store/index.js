import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    page: "derivatives"
  },
  mutations: {
    set_page(state, page) {
      state.page = page;
    }
  },
  actions: {
    set_page({ commit }, page) {
      commit("set_page", page);
    }
  },
  getters: {
    page: state => {
      return state.page;
    }
  },
  modules: {}
});
