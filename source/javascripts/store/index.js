import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

// state
const state = {
  count: 0,
  posts: [],
  page: 0,
  eyecatch: {}
};

// vuex initialize
export default new Vuex.Store({
  state,
  actions,
  mutations
});