import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

// state
const state = {
  pageTitle: '',
  siteTitle: 'Dancing Girl.',
  count: 0,
  posts: [],
  page: 0,
  eyecatch: {},
  entryImage: {
    url: '',
    width: 0,
    height: 0,
    offset: {
      top: 0,
      left: 0
    }
  }
};

// vuex initialize
export default new Vuex.Store({
  state,
  actions,
  mutations
});