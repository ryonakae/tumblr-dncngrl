import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

const state = {
  count: 0
};

const actions = {
  increment: INCREMENT,
  decrement: DECREMENT,
};

const mutations = {
  [INCREMENT](state) {
    state.count++;
  },
  [DECREMENT](state) {
    state.count--;
  }
};

export default new Vuex.Store({
  state,
  actions,
  mutations
});