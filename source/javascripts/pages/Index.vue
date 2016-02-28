<template lang='jade'>
div
  h1 Dancing Girl.
  //- p Clicked {{count}} times
  //- button(v-on:click='increment') ふえる
  //- button(v-on:click='decrement') へる
  div(v-on:click='transitionToWork') Work
</template>

<script>
import store from '../stores/';

export default {
  // computed: {
  //   count() {
  //     return store.state.count;
  //   }
  // },
  // methods: store.actions

  ready() {
    console.log('index ready');
  },

  methods: {
    transitionToWork: store.actions.transitionToWork
  }
};
</script>