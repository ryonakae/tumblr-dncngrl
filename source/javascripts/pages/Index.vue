<template lang='jade'>
section.index
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
      // ナビ出す
      $('.js-naviToggle').addClass('is--visible');

      // single -> indexに遷移するとき
      if (transition.from.name === 'post') {
        $('.cloneImage').removeClass('is--zoomIn');
        $(this.eyecatch).find('.image').removeClass('is--blur').removeClass('is--hidden');
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

      // index -> workへ遷移するとき
      if (transition.to.path === '/work') {
        $(this.$els.title).removeClass('is--visible');
        $(this.eyecatch).find('.image').addClass('is--blur');
        setTimeout(() => {
          transition.next();
        }, 600);
      } else {
        transition.next();
      }
    }
  },

  computed: {
    eyecatch() {
      return store.state.eyecatch;
    }
  },

  ready() {
    console.log('index ready');

    // サイトタイトルをフェードイン
    setTimeout(() => {
      $(this.$els.title).addClass('is--visible');
      $(this.$els.button).addClass('is--visible');
    }, 10);
  },

  methods: {
    transitionToWork: store.actions.transitionToWork
  }
};
</script>