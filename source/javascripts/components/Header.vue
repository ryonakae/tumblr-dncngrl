<template lang='jade'>
header.header
  h1.header__title.js-headerTitle
    a(v-link='{path:"/"}') Dancing Girl.

  div.header__navi.navi
    .navi__toggle
      .open.js-naviOpen(v-on:click='naviToggle')
      .close.js-naviClose(v-on:click='naviToggle')
        .inner

    .navi__list.js-navi(v-el:navi)
      ul
        li
          a(v-link='{path:"/"}', v-on:click='naviClose') Top
        li
          a(v-link='{path:"/about"}', v-on:click='naviClose') About
        li
          a(v-link='{path:"/work"}', v-on:click='naviClose') Work
        li
          a(href='/archive') Archive
</template>

<script>
import store from '../store/';
window.jQuery = window.$ = require('jquery');

export default {
  methods: {
    naviToggle: () => {
      $('body').toggleClass('is--naviActive');
      $('.js-navi').toggleClass('is--visible');
      $('.js-naviOpen').toggleClass('is--visible');
      $('.js-naviClose').toggleClass('is--visible');
    },

    naviClose: () => {
      $('body').removeClass('is--naviActive');
      $('.js-navi').removeClass('is--visible');
      $('.js-naviClose').removeClass('is--visible');
    }
  }
};
</script>