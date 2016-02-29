<template lang='jade'>
div.index
  h1.index__title(v-el:title)
    span Dancing Girl.
  a.index__button(v-link='{path:"/work"}') Work
</template>

<script>
import store from '../store/';

export default {
  route: {
    activate: function(transition) {
      console.log('index activate');
      transition.next();
    },
    deactivate: function(transition) {
      console.log('index deactivate');

      // index -> workへ遷移するとき
      if (transition.to.path === '/work') {
        $(this.$els.title).removeClass('index__title--active');
        $(this.eyecatch).find('.eyecatch__image').addClass('eyecatch__image--blur');
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
      $(this.$els.title).addClass('index__title--active');
    }, 10);
  },

  methods: {
    transitionToWork: store.actions.transitionToWork
  }
};
</script>