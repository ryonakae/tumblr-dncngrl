<template lang='jade'>
div.top
  h1.top__title
    span Dancing Girl.
  //- div.top__button(v-on:click='transitionToWork') Work
  a.top__button(v-link='{path:"/work"}') Work
</template>

<script>
import store from '../stores/';
import { vueRouter } from '../main.js';
window.jQuery = window.$ = require('jquery');

export default {
  ready() {
    console.log('index ready');

    $(window).scrollTop(0);
    $(window).on('scroll', () => {
      if ( $(window).scrollTop() >= 100 ) {
        vueRouter.go({ path: '/work' });
      }
    });
  },

  methods: {
    transitionToWork: store.actions.transitionToWork
  }
};
</script>