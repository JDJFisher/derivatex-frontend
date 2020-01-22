import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    page: "derivatives",
    rightSidebarShow: false
  },
  mutations: {
    set_page(state, page) {
      state.page = page;
    },
    set_right_sidebar_show(state, rightSidebarShow) {
      state.rightSidebarShow = rightSidebarShow;
    }
  },
  actions: {
    set_page({ commit }, page) {
      commit("set_page", page);
    },
    set_right_sidebar_show({ commit }, rightSidebarShow) {
      commit("set_right_sidebar_show", rightSidebarShow);
    }
  },
  getters: {
    page: state => {
      return state.page;
    },
    rightSidebarShow: state => {
      return state.rightSidebarShow;
    }
  },
  modules: {}
});
