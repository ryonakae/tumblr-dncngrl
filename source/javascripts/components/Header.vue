<template lang='jade'>
header.header
  h1.header__title.js-headerTitle
    a(v-link='{path:"/"}') Dancing Girl.

  div.header__navi.navi
    .navi__toggle.js-naviToggle(v-on:click='naviToggle')
    ul.navi__list.js-navi(v-el:navi)
      li.navi__listItem
        a(v-link='{path:"/"}') Top
      li.navi__listItem
        a(v-link='{path:"/about"}') About
      li.navi__listItem
        a(v-link='{path:"/work"}') Work
      li.navi__listItem
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
      $('.js-naviToggle').toggleClass('is--visible');
    }
  }
};
</script>