<template lang='jade'>
div.archive
  h2.archive__title
    span Work
  div.archive__content
    ul.entryList.entryList--photo
      component-entry(v-for='post in posts', track-by='id', :post='post')
</template>

<script>
import store from '../store/';
import { vueRouter } from '../main.js';
import Entry from '../components/Entry.vue';

window.jQuery = window.$ = require('jquery');
const velocity = require('velocity-animate');
const imagesLoaded = require('imagesloaded');
imagesLoaded.makeJQueryPlugin($);

export default {
  components: {
    'component-entry': Entry
  },

  computed: {
    posts() {
      return store.state.posts;
    },
    pageNum() {
      return store.state.page;
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