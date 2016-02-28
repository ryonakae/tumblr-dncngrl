<template lang='jade'>
div
  h2 Work
  ul.postList.postList--photo
    li.postList__item(v-for='post in posts')
      img.postList__itemImage(v-bind:src='post.photos[0].original_size.url')
      h3.postList__title {{ post.timestamp | moment }}
      //- h3.postList__title {{ post.timestamp }}
</template>

<script>
import store from '../stores/';
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

    $('.eyecatch__image').addClass('eyecatch__image--blur');

    store.actions.loadEntry('photo', 10)
      .then(() => {
        $('.postList').imagesLoaded(() => {
          console.log(this.posts);

          $('.postList').velocity({ opacity: 1 }, {
            duration: 400
          });
        });
      });

    console.log( store.actions.formatDate(1450686975) );
  },

  methods: {
    formatDate: (timestamp) => {
      store.actions.formatDate(timestamp);
    }
  },

  filters: {
    moment: (timestamp) => {
      return moment.unix(new Date(timestamp)).format('YYYY.M.D');
    }
  }
};
</script>