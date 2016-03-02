<template lang='jade'>
section.page.js-page.index
  h1.index__title(v-el:title) Dancing Girl.

  a.index__button.button(v-el:button, v-link='{path:"/work"}')
    span WORK
    .button__borderTop
    .button__borderRight
    .button__borderBottom
    .button__borderLeft
</template>

<script>
import store from '../store/';

export default {
  route: {
    activate: function(transition) {
      console.log('index activate');

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
      console.log('index deactivate');

      // ボタン隠す
      $(this.$els.button).removeClass('is--visible');

      $(this.$els.title).removeClass('is--visible');

      // index -> workへ遷移するとき
      if (transition.to.path === '/work') {
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
    console.log('index ready');

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
    }, 600);
  },

  methods: {
    transitionToWork: store.actions.transitionToWork
  }
};
</script>