<template lang='jade'>
div.single single
</template>

<script>
import store from '../store/';

export default {
  ready() {
    setTimeout(() => {
      this.clearEntryImage();
      $('.cloneImage').removeClass('cloneImage--zoomIn');
      $('body').removeClass('disableScroll');
    }, 3000);
  },

  methods: {
    clearEntryImage: store.actions.clearEntryImage
  },
};
</script>