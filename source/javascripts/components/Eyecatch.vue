<template lang='jade'>
div.eyecatch(v-el:eyecatch)
  div.eyecatch__image
</template>

<script>
import store from '../store/';

export default {
  ready() {
    store.actions.setEyecatch(this);
  }
};
</script>