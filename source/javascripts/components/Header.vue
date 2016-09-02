<template lang='pug'>
header.header
  h1.header__title#js-headerTitle.js-headerTitle
    a(v-link='{path:"/"}') Dancing Girl.

  div.header__navi.navi
    .navi__toggle
      .open#js-naviOpen.js-naviOpen(v-on:click='naviToggle')
      .close#js-naviClose.js-naviClose(v-on:click='naviToggle')
        .inner

    .navi__list#js-navi.js-navi
      ul
        li
          a(v-link='{path:"/"}', v-on:click='naviClose', data-path='/') TOP
        li
          a(v-link='{path:"/about"}', v-on:click='naviClose', data-path='/about') ABOUT
        li
          a(v-link='{path:"/work"}', v-on:click='naviClose', data-path='/work') WORK
        li
          a(v-link='{path:"/news"}', v-on:click='naviClose', data-path='/news') NEWS
        li
          a(href='/archive', target='_blank') ARCHIVE
</template>

<script>
import {vueRouter} from '../bundle';
window.jQuery = window.$ = require('jquery');

export default {
  methods: {
    naviToggle: function() {
      const $body = document.body;
      const $navi = document.getElementById('js-navi');
      const $naviOpen = document.getElementById('js-naviOpen');
      const $naviClose = document.getElementById('js-naviClose');

      $body.classList.toggle('is--naviActive');
      $navi.classList.toggle('is--visible');
      $naviOpen.classList.toggle('is--visible');
      $naviClose.classList.toggle('is--visible');
    },

    naviClose: function(e) {
      const $body = document.body;
      const $navi = document.getElementById('js-navi');
      const $naviOpen = document.getElementById('js-naviOpen');
      const $naviClose = document.getElementById('js-naviClose');

      $body.classList.remove('is--naviActive');
      $navi.classList.remove('is--visible');
      $naviClose.classList.remove('is--visible');

      // 今のページと同じリンクをクリックした時に、naviOpenを表示する
      const dataPath = $(e.target.outerHTML).data('path');
      const routerPath = vueRouter._currentRoute.path;
      if (dataPath === routerPath) {
        $naviOpen.classList.add('is--visible');
      }
    }
  }
};
</script>