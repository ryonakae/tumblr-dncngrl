<template lang='jade'>
div.index
  h1.index__title
    span Dancing Girl.
  a.index__button(v-link='{path:"/work"}') Work
</template>

<script>
import store from '../store/';
import { vueRouter } from '../main.js';
window.jQuery = window.$ = require('jquery');

export default {
  ready() {
    console.log('index ready');
  },

  methods: {
    transitionToWork: store.actions.transitionToWork
  }
};
</script>