<template lang='jade'>
section.page#js-page.js-page.archive
  h1.archive__title(v-el:title)
    span WORK

  .archive__content
    ul.entryList.entryList--photo(v-el:entry-list)
      li.entryList__item.entryList__item--photo(v-for='post in posts', track-by='id')
        component-entryitem(:post='post')
</template>

<script>
import store from '../store/';
import EntryItem from '../components/EntryItem.vue';

window.jQuery = window.$ = require('jquery');
const imagesLoaded = require('imagesloaded');
imagesLoaded.makeJQueryPlugin($);

export default {
  // arrow function使うとthisが取れない
  route: {
    activate: function(transition) {
      // console.log('work activate');

      // set DOM
      const $body = document.body;
      this.$cloneImage = document.getElementById('js-cloneImage');
      this.$eyecatchImage = document.getElementById('js-eyecatchImage');

      // ブラウザバックとかでも絶対ページの一番上から表示
      document.body.scrollTop = 0;

      // inアニメーション
      this.$eyecatchImage.classList.add('is--blur');
      this.$eyecatchImage.classList.remove('is--hidden');

      // single -> workに遷移するとき
      if (transition.from.name === 'post') {
        this.$cloneImage.classList.remove('is--zoomIn');
        setTimeout(() => {
          transition.next();
        }, 1000);
      } else {
        // このページに遷移
        transition.next();
      }
    },
    deactivate: function(transition) {
      // console.log('work deactivate');

      // onScrollTransitionを無効
      $(window).off('.onScrollTransition');

      // infiniteScrollを無効
      $(window).off('.infiniteScroll');

      // work -> single(photo)へ遷移するとき
      if (transition.to.name === 'post') {
        $body.classList.add('is--disableScroll');
        this.$eyecatchImage.classList.add('is--hidden');

        setTimeout(() => {
          this.$cloneImage.classList.add('is--zoomIn');
        }, 1000);
        setTimeout(() => {
          transition.next();
        }, 2000);
      }

      // work -> indexへ遷移するとき
      // work -> aboutへ遷移するとき
      if (transition.to.path === '/' || transition.to.path === '/about') {
        // outアニメーション
        this.$els.title.classList.remove('is--visible');
        this.$els.entryList.remove('is--visible');
        this.$eyecatchImage.classList.remove('is--blur');
        // アニメーション終了後に遷移
        setTimeout(() => {
          transition.next();
        }, 600);
      }

      // work -> newsへ遷移するとき
      if (transition.to.path === '/news') {
        // outアニメーション
        this.$els.title.classList.remove('is--visible');
        this.$els.entryList.remove('is--visible');
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

  data() {
    return {
      $cloneImage: null,
      $eyecatchImage: null
    };
  },

  computed: {
    posts() {
      return store.state.posts;
    },
    pageNum() {
      return store.state.pageNum;
    },
    totalPosts() {
      return store.state.totalPosts;
    }
  },

  ready() {
    // console.log('work ready');

    // set DOM
    const $grain = document.getElementById('js-grain');
    const $headerTitle = document.getElementById('js-headerTitle');
    const $naviOpen = document.getElementById('js-naviOpen');

    // eyecatch
    this.$eyecatchImage.classList.add('is--noanimation');
    setTimeout(() => {
      this.$eyecatchImage.classList.remove('is--noanimation');
    }, 1000);

    // ノイズ停止・隠す
    store.actions.changeGrainStatus('stop');
    $grain.classList.add('is--hidden');

    // ページタイトルを変更
    store.actions.changePageTitle('Work');

    // ページタイトルをフェードイン
    setTimeout(() => {
      this.$els.title.classList.add('is--visible');
    }, 150);

    setTimeout(() => {
      // ヘッダータイトルとナビをフェードイン
      $headerTitle.classList.add('is--visible');
      $naviOpen.classList.add('is--visible');

      // totalPostsとpageNumをリセット
      this.resetPageNum();
      this.resetTotalPosts();

      // 記事取得・表示
      store.actions.loadEntry('photo', 4, null, false, false)
        .then(() => {
          $('.entryList').imagesLoaded(() => {
            // console.log(this.posts);

            // show
            this.$els.entryList.classList.add('is--visible');

            // 無限スクロール
            setTimeout(store.actions.infiniteScroll('photo', 4, false, false), 600);

            // ページの一番上の状態で、上へのスクロールがあったらindexへ遷移
            this.onScrollTransition('/', 'less', 10);
          });
        });
    }, 150+600);
  },

  methods: {
    resetPageNum: store.actions.resetPageNum,
    resetTotalPosts: store.actions.resetTotalPosts,
    onScrollTransition: store.actions.onScrollTransition
  }
};
</script>