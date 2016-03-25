<template lang='jade'>
section.page.js-page.index
  h1.index__title(v-el:title) Dancing Girl.

  a.index__more(v-el:button, v-link='{path:"/work"}')
    span.text WORK
    .icon
</template>

<script>
import store from '../store/';
import { vueRouter } from '../main.js';
window.jQuery = window.$ = require('jquery');

export default {
  route: {
    activate: function(transition) {
      // console.log('index activate');

      // ヘッダータイトル隠す
      $('.js-headerTitle').removeClass('is--visible');

      // single -> indexに遷移するとき
      if (transition.from.name === 'post') {
        $('.cloneImage').removeClass('is--zoomIn');
        $('.js-eyecatchImage').removeClass('is--blur').removeClass('is--hidden');
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

      // wheelイベントをunbind
      $(window).off('.transitionToWork');

      // タイトルロゴとボタン隠す
      $(this.$els.button).removeClass('is--visible');
      $(this.$els.title).removeClass('is--visible');

      // index -> workへ遷移するとき
      // index -> newsへ遷移するとき
      if (transition.to.path === '/work' || transition.to.path === '/news') {
        $('.js-eyecatchImage').addClass('is--blur');
      }

      setTimeout(() => {
        transition.next();
      }, 600);
    }
  },

  computed: {
    eyecatch() {
      return store.state.eyecatch;
    }
  },

  ready() {
    // console.log('index ready');

    // ノイズ開始・表示する
    store.actions.changeGrainStatus('start');
    $('.js-grain').removeClass('is--hidden');

    // ページタイトルを変更
    store.actions.changePageTitle('Top');

    setTimeout(() => {
      $(this.$els.title).addClass('is--visible');
    }, 100);

    setTimeout(() => {
      $(this.$els.button).addClass('is--visible');
      $('.js-naviOpen').addClass('is--visible');

      // 下へのスクロールがあったらworkへ遷移
      $(window).on('wheel.transitionToWork', (e) => {
        if (e.originalEvent.deltaY > 20) {
          vueRouter.go({ path: '/work' });
        }
      });
    }, 600);
  }
};
</script>