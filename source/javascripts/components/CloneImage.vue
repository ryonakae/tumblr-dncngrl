<template lang='jade'>
  .cloneImage(v-bind:style='{ width:imageWidth+"px", height:imageHeight+"px", top:imageOffsetTop+"px" }')
    .image(v-bind:style='{ backgroundImage:"url("+imageUrl+")" }')
</template>

<script>
import store from '../store/';
window.jQuery = window.$ = require('jquery');

export default {
  computed: {
    imageUrl() {
      return store.state.entryImage.url;
    },
    imageWidth() {
      return store.state.entryImage.width;
    },
    imageHeight() {
      return store.state.entryImage.height;
    },
    imageOffsetTop() {
      let imageOffset = store.state.entryImage.offset.top;
      let scrollTop = $(window).scrollTop();
      return imageOffset - scrollTop;
    }
  }
};
</script>