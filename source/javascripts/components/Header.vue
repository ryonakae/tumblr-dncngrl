<template lang='jade'>
header.header
  h1.header__title.js-headerTitle
    a(v-link='{path:"/"}') Dancing Girl.

  div.header__navi.navi
    .navi__toggle.js-naviToggle(v-on:click='naviToggle')
    ul.navi__list
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
      $('.js-page').toggleClass('is--blur');
      $('.js-eyecatchImage').toggleClass('is--blur');
      $('body').toggleClass('is--naviActive');
    }
  }
};
</script>