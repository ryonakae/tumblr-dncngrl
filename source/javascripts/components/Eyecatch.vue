<template lang='jade'>
.eyecatch(v-el:eyecatch)
  .image.js-eyecatchImage
</template>

<script>
import store from '../store/';

export default {
  ready() {
    store.actions.setEyecatch(this);
  }
};
</script>