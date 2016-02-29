<template lang='jade'>
  div.cloneImage(v-bind:style='{ backgroundImage:"url("+imageUrl+")" , width:imageWidth+"px", height:imageHeight+"px", top:imageOffsetTop+"px", left:imageOffsetLeft+"px" }')
</template>

<script>
import store from '../store/';

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
      return store.state.entryImage.offset.top;
    },
    imageOffsetLeft() {
      return store.state.entryImage.offset.left;
    }
  }
};
</script>