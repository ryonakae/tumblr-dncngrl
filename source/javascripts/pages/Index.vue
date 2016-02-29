<template lang='jade'>
.index
  h1.index__title(v-el:title) Dancing Girl.
  a.index__button(v-link='{path:"/work"}') Work
</template>

<script>
import store from '../store/';

export default {
  route: {
    activate: function(transition) {
      console.log('index activate');

      // single -> indexに遷移するとき
      if (transition.from.name === 'post') {
        $('.cloneImage').removeClass('is--zoomIn');
        $(this.eyecatch).find('.image')
          .removeClass('is--blur')
          .removeClass('is--hidden');
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
    }, 10);
  },

  methods: {
    transitionToWork: store.actions.transitionToWork
  }
};
</script>