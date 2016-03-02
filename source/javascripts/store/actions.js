window.jQuery = window.$ = require('jquery');
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

  loadEntry: ({ dispatch }, postType, limit, id, reblogInfo, notesInfo) => {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'GET',
        url: tumblr.url,
        data: {
          api_key: tumblr.apiKey,
          limit: limit,
          // offset: self.state.page * limit - limit,
          id: id,
          reblog_info: reblogInfo,
          notes_info: notesInfo,
          format: 'html',
          type: postType
        },
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
    return new Promise((resolve, reject) => {
      dispatch('SET_ENTRY_IMAGE', url, width, height, offset);
      resolve();
    });
  },

  clearEntryImage: ({ dispatch }) => {
    dispatch('CLEAR_ENTRY_IMAGE');
  },

  changePageTitle: ({ dispatch }, title) => {
    dispatch('CHANGE_PAGE_TITLE', title);
  },

  changeGrainStatus: ({ dispatch }, status) => {
    dispatch('CHANGE_GRAIN_STATUS', status);
  }
};