<template lang='jade'>
header.header
  h1.header__title.js-headerTitle
    a(v-link='{path:"/"}') Dancing Girl.

  div.header__navi.navi
    .navi__toggle.js-naviToggle
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

export default {
  methods: {
    transitionToTop: store.actions.transitionToTop,
    transitionToAbout: store.actions.transitionToAbout,
    transitionToWork: store.actions.transitionToWork
  }
};
</script>