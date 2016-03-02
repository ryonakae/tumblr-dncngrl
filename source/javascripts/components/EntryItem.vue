<template lang='jade'>
//- photo
article.entryItem.entryItem--photo(v-el:entry-item, v-if='post.type === "photo"')
  a.link(v-link='{ name: "post", params: { id: post.id, slug: post.slug }}', v-on:click='setEntryImage')
    img.image(v-bind:src='post.photos[0].original_size.url')
    h1.title {{ post.timestamp | moment }}

//- news
article.entryItem.entryItem--news(v-el:entry-item, v-if='post.type === "text"')
  h1.title {{post.title}}
  small.date {{ post.timestamp | moment }}
</template>

<script>
import store from '../store/';
window.jQuery = window.$ = require('jquery');

export default {
  props: ['post'],

  // data() {
  //   return {
  //     imageUrl: this.post.photos[0].original_size.url
  //   };
  // },

  computed: {
    imageUrl() {
      if (this.post.type === 'photo') {
        return this.post.photos[0].original_size.url;
      }
    },
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