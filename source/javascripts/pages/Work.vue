<template lang='jade'>
div.archive
  h2.archive__title
    span Work
  div.archive__content
    ul.postList.postList--photo
      li.postList__item(v-for='post in posts')
        a.postList__itemLink(v-link='{ name: "post", params: { id: post.id, slug: post.slug }}')
          img.postList__itemImage(v-bind:src='post.photos[0].original_size.url')
          div.postList__itemClone(v-bind:style='{ backgroundImage: "url("+post.photos[0].original_size.url+")" }')
          h3.postList__itemTitle {{ post.timestamp | moment }}
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
        $('.postList').imagesLoaded(() => {
          console.log(this.posts);

          $('.postList').addClass('postList--visible');
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