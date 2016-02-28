<template lang='jade'>
div.archive
  h2.archive__title
    span Work
  div.archive__content
    ul.postList.postList--photo
      li.postList__item(v-for='post in posts')
        img.postList__itemImage(v-bind:src='post.photos[0].original_size.url')
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

    $(window).scrollTop(100);
    $(window).on('scroll', () => {
      if ( $(window).scrollTop() <= 0 ) {
        vueRouter.go({ path: '/' });
      }
    });

    store.actions.loadEntry('photo', 10)
      .then(() => {
        $('.postList').imagesLoaded(() => {
          console.log(this.posts);

          $('.postList').addClass('postList--visible');
        });
      });
  },

  methods: {},

  filters: {
    moment: (timestamp) => {
      return store.actions.formatDate(timestamp);
    }
  }
};
</script>