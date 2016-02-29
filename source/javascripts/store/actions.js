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

  beforeInIndex: () => {
    $(window).scrollTop(0);
    $('.eyecatch__image').removeClass('eyecatch__image--blur');
  },
  beforeLeaveIndex: () => {
    $('.index__title').removeClass('index__title--active');
  },
  afterInIndex: () => {
    setTimeout(() => {
      $('.index__title').addClass('index__title--active');
    }, 100);
  },

  beroreInArchive: () => {
    $('.eyecatch__image').addClass('eyecatch__image--blur');
  },
  beroreLeaveArchive: () => {
    $('.archive__title').removeClass('archive__title--active');
    $('.entryList').removeClass('entryList--visible');
  },
  afterInArchive: () => {
    setTimeout(() => {
      $('.archive__title').addClass('archive__title--active');
    }, 100);
  }
};