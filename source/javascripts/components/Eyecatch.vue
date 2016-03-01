<template lang='jade'>
.eyecatch(v-el:eyecatch)
  .image.js-eyecatchImage(v-bind:style='{ backgroundImage:"url("+eyecatch+")" }')
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