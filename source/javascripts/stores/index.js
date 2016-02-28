import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import { vueRouter } from '../main.js';

// state
const state = {
  count: 0
};

// actions
const actions = {
  increment: 'INCREMENT',
  decrement: 'DECREMENT',

  transitionToTop: () => {
    setTimeout(() => {
      vueRouter.go({ path: '/' });
    }, 1000);
  },

  transitionToAbout: () => {
    setTimeout(() => {
      vueRouter.go({ path: '/about' });
    }, 1000);
  },

  transitionToWork: () => {
    setTimeout(() => {
      vueRouter.go({ path: '/work' });
    }, 1000);
  }
};

// mutations
const mutations = {
  INCREMENT(state) {
    state.count++;
  },
  DECREMENT(state) {
    state.count--;
  }
};

// vuex initialize
export default new Vuex.Store({
  state,
  actions,
  mutations
});