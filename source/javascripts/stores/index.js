import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import { vueRouter } from '../main.js';

window.jQuery = window.$ = require('jquery');
const velocity = require('velocity-animate');

const moment = require('moment');

// tumblr api
import config from '../config.js';
const tumblr = {
  url: config.tumblrUrl,
  apiKey: config.apiKey
};

// state
const state = {
  count: 0,
  posts_photo: [],
  page_photo: 1,
  posts_text: [],
  page_text: 1
};

// actions
const actions = {
  increment: 'INCREMENT',
  decrement: 'DECREMENT',

  transitionToTop: () => {
    $('.eyecatch__image').removeClass('eyecatch__image--blur');

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
    $('.eyecatch__image').addClass('eyecatch__image--blur');

    setTimeout(() => {
      vueRouter.go({ path: '/work' });
    }, 1000);
  },

  loadEntry: ({ dispatch }, postType, limit) => {
    return new Promise((resolve, reject) => {
      console.log('loadEntry', postType, limit);

      $.ajax({
        type: 'GET',
        url: tumblr.url,
        data: {
          api_key: tumblr.apiKey,
          limit: limit,
          // offset: self.state.page * limit - limit,
          reblog_info: false,
          notes_info: false,
          format: 'html',
          type: postType
        },
        type: 'photo',
        dataType: 'jsonp',
        timeout: 10000,
        success: (res) => {
          // 関数実行のたびに配列を空にする
          state.posts_photo = [];
          let newData = res.response.posts;

          // データを日付順にソート
          newData.sort(function(a, b) {
            return ( a.date < b.date ? 1 : -1 );
          });

          // stateにデータ入れる
          state.posts_photo = newData;
          console.log(state.posts_photo);
          resolve();
        }
      });
    });
  },

  formatDate: ({ dispatch }, timestamp) => {
    return moment.unix(new Date(timestamp)).format('YYYY.M.D');
  },

  beforeInIndex: () => {
    $('.eyecatch__image').removeClass('eyecatch__image--blur');
  },
  beforeLeaveIndex: () => {
    $('.top__title').removeClass('top__title--active');
  },
  afterInIndex: () => {
    setTimeout(() => {
      $('.top__title').addClass('top__title--active');
    }, 100);
  },

  beroreInArchive: () => {
    $('.eyecatch__image').addClass('eyecatch__image--blur');
  },
  beroreLeaveArchive: () => {
    $('.archive__title').removeClass('archive__title--active');
    $('.postList').removeClass('postList--visible');
  },
  afterInArchive: () => {
    setTimeout(() => {
      $('.archive__title').addClass('archive__title--active');
    }, 100);
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