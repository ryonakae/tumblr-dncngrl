<template lang='pug'>
section.page#js-page.js-page.index
  h1.index__title(v-el:title) Dancing Girl.

  a.index__more(v-el:button, v-link='{path:"/work"}')
    span.text WORK
    .icon
</template>

<script>
import store from '../store/';
window.jQuery = window.$ = require('jquery');

export default {
  route: {
    activate: function(transition) {
      // console.log('index activate');

      // set DOM
      this.$headerTitle = document.getElementById('js-headerTitle');
      this.$cloneImage = document.getElementById('js-cloneImage');
      this.$eyecatchImage = document.getElementById('js-eyecatchImage');

      // ヘッダータイトル隠す
      this.$headerTitle.classList.remove('is--visible');

      // single -> indexに遷移するとき
      if (transition.from.name === 'post') {
        this.$cloneImage.classList.remove('is--zoomIn');
        this.$eyecatchImage.classList.remove('is--blur', 'is--hidden');
        setTimeout(() => {
          transition.next();
        }, 1000);
      } else {
        // このページに遷移
        transition.next();
      }
    },
    deactivate: function(transition) {
      // console.log('index deactivate');

      // onScrollTransitionをunbind
      $(window).off('.onScrollTransition');

      // fitWindowをunbind
      $(window).off('.fitWindow');

      // タイトルロゴとボタン隠す
      this.$els.button.classList.remove('is--visible');
      this.$els.title.classList.remove('is--visible');

      // index -> workへ遷移するとき
      // index -> newsへ遷移するとき
      if (transition.to.path === '/work' || transition.to.path === '/news') {
        this.$eyecatchImage.classList.add('is--blur');
      }

      setTimeout(() => {
        transition.next();
      }, 600);
    }
  },

  data() {
    return {
      windowHeight: '',
      $headerTitle: null,
      $cloneImage: null,
      $eyecatchImage: null
    };
  },

  computed: {
    eyecatch() {
      return store.state.eyecatch;
    }
  },

  ready() {
    // console.log('index ready');

    // set DOM
    const $grain = document.getElementById('js-grain');
    const $naviOpen = document.getElementById('js-naviOpen');

    // ノイズ開始・表示する
    store.actions.changeGrainStatus('start');
    $grain.classList.remove('is--hidden');

    // ページタイトルを変更
    store.actions.changePageTitle('Top');

    setTimeout(() => {
      this.$els.title.classList.add('is--visible');
    }, 100);

    setTimeout(() => {
      this.$els.button.classList.add('is--visible');
      $naviOpen.classList.add('is--visible');

      // 下へのスクロールがあったらworkへ遷移
      this.onScrollTransition('/work', 'more', 10);

      this.fitWindow();
      $(window).on('resize.fitWindow orientationchange.fitWindow', this.fitWindow);
    }, 600);
  },

  methods: {
    onScrollTransition: store.actions.onScrollTransition,

    fitWindow: function() {
      const $page = document.getElementById('js-page');
      this.windowHeight = window.document.documentElement.clientHeight;
      $page.style.height = this.windowHeight + 'px';
    }
  }
};
</script>