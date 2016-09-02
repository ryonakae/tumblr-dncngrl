<template lang='pug'>
section.page#js-page.js-page.archive
  h1.archive__title(v-el:title)
    span NEWS

  .archive__content
    ul.entryList.entryList--news(v-el:entry-list)
      li.entryList__item(v-for='post in posts', track-by='id')
        component-entryitem(:post='post')
</template>

<script>
import store from '../store/';
import EntryItem from '../components/EntryItem.vue';

window.jQuery = window.$ = require('jquery');

export default {
  route: {
    activate: function(transition) {
      $(window).scrollTop(0);

      // inアニメーション
      $('.js-eyecatchImage').addClass('is--blur').removeClass('is--hidden');

      // single -> newsに遷移するとき
      if (transition.from.name === 'post') {
        $('.cloneImage').removeClass('is--zoomIn');
        setTimeout(() => {
          transition.next();
        }, 1000);
      }
      else {
        // このページに遷移
        transition.next();
      }
    },
    deactivate: function(transition) {
      // infiniteScrollを無効
      $(window).off('.infiniteScroll');

      // news -> single(news)へ遷移するとき
      if (transition.to.name === 'post') {
        $(this.$els.title).removeClass('is--visible');
        $(this.$els.entryList).removeClass('is--visible');
        $('.js-eyecatchImage').addClass('is--hidden');

        setTimeout(() => {
          transition.next();
        }, 600);
      }

      // news -> indexへ遷移するとき
      // news -> aboutへ遷移するとき
      if (transition.to.path === '/' || transition.to.path === '/about') {
        // outアニメーション
        $(this.$els.title).removeClass('is--visible');
        $(this.$els.entryList).removeClass('is--visible');
        $('.js-eyecatchImage').removeClass('is--blur');
        // アニメーション終了後に遷移
        setTimeout(() => {
          transition.next();
        }, 600);
      }

      // news -> workへ遷移するとき
      if (transition.to.path === '/work') {
        // outアニメーション
        $(this.$els.title).removeClass('is--visible');
        $(this.$els.entryList).removeClass('is--visible');
        // アニメーション終了後に遷移
        setTimeout(() => {
          transition.next();
        }, 600);
      }
    }
  },

  components: {
    'component-entryitem': EntryItem
  },

  computed: {
    posts() {
      return store.state.posts;
    },
    pageNum() {
      return store.state.pageNum;
    },
    eyecatch() {
      return store.state.eyecatch;
    }
  },

  ready() {
    // eyecatch
    $('.js-eyecatchImage').addClass('is--noanimation');
    setTimeout(() => {
      $('.js-eyecatchImage').removeClass('is--noanimation');
    }, 1000);

    // ページタイトルを変更
    store.actions.changePageTitle('News');

    // ページタイトルをフェードイン
    setTimeout(() => {
      $(this.$els.title).addClass('is--visible');
    }, 150);

    setTimeout(() => {
      // ヘッダータイトルとナビをフェードイン
      $('.js-headerTitle').addClass('is--visible');
      $('.js-naviOpen').addClass('is--visible');

      // totalPostsとpageNumをリセット
      this.resetPageNum();
      this.resetTotalPosts();

      store.actions.loadEntry('text', 4, null, false, true)
        .then(() => {
          $(this.$els.entryList).addClass('is--visible');

          // 無限スクロール
          setTimeout(store.actions.infiniteScroll('text', 4, false, true), 600);
        });
    }, 150+600);
  },

  methods: {
    resetPageNum: store.actions.resetPageNum,
    resetTotalPosts: store.actions.resetTotalPosts
  }
};
</script>