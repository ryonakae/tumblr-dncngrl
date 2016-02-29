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

export default {
  incrementPage: 'INCREMENT_PAGE',
  decrementPage: 'DECREMENT_PAGE',

  loadEntry: ({ dispatch }, postType, limit) => {
    return new Promise((resolve, reject) => {
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
          dispatch('CLEAR_POSTDATA');
          let newData = res.response.posts;

          // データを日付順にソート
          newData.sort(function(a, b) {
            return ( a.date < b.date ? 1 : -1 );
          });

          // stateにデータ入れる
          dispatch('GET_POSTDATA', newData);

          // ページ数増やす
          dispatch('INCREMENT_PAGE');

          resolve();
        }
      });
    });
  },

  formatDate: ({ dispatch }, timestamp) => {
    return moment.unix(new Date(timestamp)).format('YYYY.M.D');
  },

  setEyecatch: ({ dispatch }, vm) => {
    dispatch('SET_EYECATCH', vm);
  },

  setEntryImage: ({ dispatch }, url, width, height, offset) => {
    dispatch('SET_ENTRY_IMAGE', url, width, height, offset);
  }
};