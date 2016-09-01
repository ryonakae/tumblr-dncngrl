<template lang='pug'>
//- photo
article.entryItem.entryItem--photo(ref='entry-item', v-if='post.type === "photo"')
  a.link(v-link='{ name: "post", params: { id: post.id, slug: post.slug }}', v-on:click='setEntryImage')
    img.image(v-bind:src='post.photos[0].original_size.url')
    h1.title {{ post.timestamp | moment }}
    div.notes {{ post.note_count }} Notes

//- news
article.entryItem.entryItem--news(ref='entry-item', v-if='post.type === "text"')
  a.link(v-link='{ name: "post", params: { id: post.id, slug: post.slug }}')
    .info
      small.date {{ post.timestamp | moment }}
      small.notes {{ post.note_count }} Notes
    h1.title {{post.title}}
</template>

<script>
import store from '../store/';

export default {
  props: ['post'],

  computed: {
    imageUrl() {
      if (this.post.type === 'photo') {
        return this.post.photos[0].original_size.url;
      }
    },
    imageWidth() {
      return this.$refs.entryItem.clientWidth;
    },
    imageHeight() {
      return this.$refs.entryItem.clientHeight;
    },
    imageOffset() {
      const $element = this.$refs.entryItem;
      const rect = $element.getBoundingClientRect();
      const offset = {
        top: rect.top + window.pageYOffset,
        left: rect.left + window.pageXOffset
      };
      return offset;
    },
  },

  mounted() {
    // // console.log(this.image);
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