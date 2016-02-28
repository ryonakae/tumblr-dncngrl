<template lang='jade'>
div
  h1 Index
  p Clicked {{count}} times
  button(v-on:click='increment') ふえる
  button(v-on:click='decrement') へる
</template>

<script>
import store from '../store.js';

export default {
  computed: {
    count () {
      return store.state.count
    }
  },
  methods: store.actions
};
</script>