<template lang='jade'>
div.archive
  h2.archive__title
    span Work
  div.archive__content
    ul.entryList.entryList--photo
      li.entryList__item(v-for='post in posts')
        a.entryList__itemLink(v-link='{ name: "post", params: { id: post.id, slug: post.slug }}')
          img.entryList__itemImage(v-bind:src='post.photos[0].original_size.url')
          div.entryList__itemClone(v-bind:style='{ backgroundImage: "url("+post.photos[0].original_size.url+")" }')
          h3.entryList__itemTitle {{ post.timestamp | moment }}
</template>

<script>
import store from '../stores/';
import { vueRouter } from '../main.js';

window.jQuery = window.$ = require('jquery');
const velocity = require('velocity-animate');
const imagesLoaded = require('imagesloaded');
imagesLoaded.makeJQueryPlugin($);
const moment = require('moment');

export default {
  computed: {
    posts() {
      return store.state.posts_photo;
    }
  },

  ready() {
    console.log('work ready');

    store.actions.loadEntry('photo', 10)
      .then(() => {
        $('.entryList').imagesLoaded(() => {
          console.log(this.posts);

          $('.entryList').addClass('entryList--visible');
        });
      });
  },

  methods: {
    photoFitWindow: function() {
      console.log($(this.$els.post));
    }
  },

  filters: {
    moment: (timestamp) => {
      return store.actions.formatDate(timestamp);
    }
  }
};
</script>