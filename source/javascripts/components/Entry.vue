<template lang='jade'>
li.entryList__item
  a.entryList__itemLink(v-link='{ name: "post", params: { id: post.id, slug: post.slug }}')
    img.entryList__itemImage(v-bind:src='post.photos[0].original_size.url')
    div.entryList__itemClone(v-bind:style='{ backgroundImage: "url("+post.photos[0].original_size.url+")" }')
    h3.entryList__itemTitle {{ post.timestamp | moment }}
</template>

<script>
import store from '../store/';

export default {
  props: ['post'],

  computed: {},

  ready() {},

  methods: {},

  filters: {
    moment: (timestamp) => {
      return store.actions.formatDate(timestamp);
    }
  }
};
</script>