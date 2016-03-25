import store from '../store/';

import { vueRouter } from '../main.js';
import { myUaManager } from '../main.js';

window.jQuery = window.$ = require('jquery');
const moment = require('moment');

// tumblr api
import config from '../config.js';
const tumblr = {
  url: config.tumblrUrl,
  apiKey: config.apiKey
};

export default {
  incrementPageNum: 'INCREMENT_PAGE_NUM',
  decrementPageNum: 'DECREMENT_PAGE_NUM',
  resetPageNum: 'RESET_PAGE_NUM',

  setTotalPosts: ({ dispatch }, totalPosts) => {
    dispatch('SET_TOTAL_POSTS', totalPosts);
  },
  resetTotalPosts: 'RESET_TOTAL_POSTS',

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
  },

  loadEntry: ({ dispatch }, postType, limit, id, reblogInfo, notesInfo) => {
    return new Promise((resolve, reject) => {
      // ページ数増やす
      dispatch('INCREMENT_PAGE_NUM');

      $.ajax({
        type: 'GET',
        url: tumblr.url,
        data: {
          api_key: tumblr.apiKey,
          limit: limit * store.state.pageNum,
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
          // console.log(newData);

          // データを日付順にソート
          newData.sort(function(a, b) {
            return ( a.date < b.date ? 1 : -1 );
          });

          // stateにデータ入れる
          dispatch('GET_POSTDATA', newData);

          // totalPostsをセット
          store.actions.setTotalPosts(res.response.total_posts);

          resolve();
        }
      });
    });
  },

  infiniteScroll: ({ dispatch }, postType, limit, reblogInfo, notesInfo) => {
    let loadLock = false;

    $(window).on('resize.infiniteScroll scroll.infiniteScroll mousewheel.infiniteScroll', () => {
      let scrollTop = $(window).scrollTop();
      let windowHeight = $(window).height();
      let documentHeight = $(document).height();

      // // console.log('scroll bottom line:', scrollTop + windowHeight);
      // // console.log('document height:', documentHeight);

      // 記事数がtotal_post未満で、
      // スクロールが7割位になったら次のポストロード
      if (store.state.posts.length < store.state.totalPosts && scrollTop + windowHeight > documentHeight * 0.7) {
        // lockがtrueなら以下スキップ
        if (loadLock) return;

        // lockする
        loadLock = true;

        // 記事取得
        store.actions.loadEntry(postType, limit, null, reblogInfo, notesInfo)
          .then(() => {
            // console.log(store.state.posts);

            // lock解除
            setTimeout(() => {
              loadLock = false;
            }, 100);
          });
      }
    });
  },

  onScrollTransition: ({ dispatch }, path, moreOrLess, quantity) => {
    const ua = myUaManager.device();
    let moveAmount;

    if (ua === 'pc') {
      $(window).on('wheel.onScrollTransition', (e) => {
        moveAmount = e.originalEvent.deltaY;

        if (moreOrLess === 'more') {
          if (window.pageYOffset === 0 && moveAmount > quantity) {
            vueRouter.go({ path: path });
          }
        } else if (moreOrLess === 'less') {
          if (window.pageYOffset === 0 && moveAmount < -quantity) {
            vueRouter.go({ path: path });
          }
        }
      });
    } else if (ua === 'mobile') {
      let touchStartY;
      let touchMoveY;

      $(window).on('touchstart.onScrollTransition', (e) => {
        touchStartY = e.originalEvent.changedTouches[0].pageY;
      });

      $(window).on('touchmove.onScrollTransition', (e) => {
        touchMoveY = e.originalEvent.changedTouches[0].pageY;
        moveAmount = touchStartY - touchMoveY;

        if (moreOrLess === 'more') {
          if (window.pageYOffset === 0 && moveAmount > quantity) {
            vueRouter.go({ path: path });
          }
        } else if (moreOrLess === 'less') {
          if (window.pageYOffset === 0 && moveAmount < -quantity) {
            vueRouter.go({ path: path });
          }
        }
      });
    }
  }
};