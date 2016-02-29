<template lang='jade'>
li.entryList__item(v-el:entry-item)
  a.entryList__itemLink(v-link='{ name: "post", params: { id: post.id, slug: post.slug }}', v-on:click='setEntryImage')
    img.entryList__itemImage(v-bind:src='post.photos[0].original_size.url')
    div.entryList__itemClone(v-bind:style='{ backgroundImage: "url("+post.photos[0].original_size.url+")" }')
    h3.entryList__itemTitle {{ post.timestamp | moment }}
</template>

<script>
import store from '../store/';
window.jQuery = window.$ = require('jquery');

export default {
  props: ['post'],

  data() {
    return {
      imageUrl: this.post.photos[0].original_size.url
    };
  },

  computed: {
    imageWidth() {
      return $(this.$els.entryItem).width();
    },
    imageHeight() {
      return $(this.$els.entryItem).height();
    },
    imageOffset() {
      return $(this.$els.entryItem).offset();
    },
  },

  ready() {
    // console.log(this.image);
  },

  methods: {
    setEntryImage: function() {
      store.actions.setEntryImage(this.imageUrl, this.imageWidth, this.imageHeight, this.imageOffset);
    }
  },

  filters: {
    moment: (timestamp) => {
      return store.actions.formatDate(timestamp);
    }
  }
};
</script>