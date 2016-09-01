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
          a(v-link='{path:"/"}', v-on:click='naviClose') TOP
        li
          a(v-link='{path:"/about"}', v-on:click='naviClose') ABOUT
        li
          a(v-link='{path:"/work"}', v-on:click='naviClose') WORK
        li
          a(v-link='{path:"/news"}', v-on:click='naviClose') NEWS
        li
          a(href='/archive') ARCHIVE
</template>

<script>
export default {
  methods: {
    naviToggle: () => {
      const $body = document.body;
      const $navi = document.getElementById('js-navi');
      const $naviOpen = document.getElementById('js-naviOpen');
      const $naviClose = document.getElementById('js-naviClose');
      const $page = document.getElementById('js-page');
      const $grain = document.getElementById('js-grain');

      $body.classList.toggle('is--naviActive');
      $navi.classList.toggle('is--visible');
      $naviOpen.classList.toggle('is--visible');
      $naviClose.classList.toggle('is--visible');

      if ($page.classList.contains('index')) {
        $grain.classList.toggle('is--hidden');
      }
    },

    naviClose: () => {
      const $body = document.body;
      const $navi = document.getElementById('js-navi');
      const $naviClose = document.getElementById('js-naviClose');

      $body.classList.remove('is--naviActive');
      $navi.classList.remove('is--visible');
      $naviClose.classList.remove('is--visible');
    }
  }
};
</script>