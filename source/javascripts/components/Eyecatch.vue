<template lang='pug'>
.eyecatch#js-eyecatch(v-el:eyecatch)
  .image#js-eyecatchImage.js-eyecatchImage(v-bind:style='{ backgroundImage:"url("+eyecatch+")" }')
  .grain#js-grain
</template>

<script>
import store from '../store/';

export default {
  data() {
    return {
      eyecatch: document.body.dataset.eyecatch
    };
  },

  ready() {
    store.actions.setEyecatch(this);
  }
};
</script>