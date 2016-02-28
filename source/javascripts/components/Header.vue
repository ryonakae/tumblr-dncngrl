<template lang='jade'>
header.header
  h1.header__logo
    a(v-link='{path:"/"}') Dancing Girl.

  ul.header__navi
    li.header__naviList
      span(v-on:click='transitionToTop') Top
    li.header__naviList
      span(v-on:click='transitionToAbout') About
    li.header__naviList
      span(v-on:click='transitionToWork') Work
    li.header__naviList
      a(href='/archive') Archive
</template>

<script>
import store from '../stores/';

export default {
  methods: {
    transitionToTop: store.actions.transitionToTop,
    transitionToAbout: store.actions.transitionToAbout,
    transitionToWork: store.actions.transitionToWork
  }
};
</script>