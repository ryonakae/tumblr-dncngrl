<template lang='jade'>
section.single
  article.entry.entry--photo(v-el:entry)
    .entry__photo
      img(v-for='photo in post.photos', v-bind:src='photo.original_size.url')
    .entry__textarea
      h1.entry__title {{ post.timestamp | moment }}
      .entry__info
        small.entry__infoNotes {{post.note_count}} Notes
        small.entry__infoTags
          span.entry__infoTagsItem(v-for='tag in post.tags') {{tag}}
      .entry__body {{{post.caption}}}
</template>

<script>
import store from '../store/';
window.jQuery = window.$ = require('jquery');
const imagesLoaded = require('imagesloaded');
imagesLoaded.makeJQueryPlugin($);

export default {
  route: {
    activate: function(transition) {
      console.log('single activate');
      this.$set('id', transition.to.params.id);
      this.$set('slug', transition.to.params.slug);

      $('.js-eyecatchImage').addClass('is--blur').removeClass('is--hidden');

      transition.next();
    },
  },

  data() {
    return {
      id: '',
      slug: '',
      post: {}
    };
  },

  computed: {
    posts() {
      return store.state.posts;
    }
  },

  ready() {
    // ヘッダータイトルとナビをフェードイン
    setTimeout(() => {
      $('.js-headerTitle').addClass('is--visible');
      $('.js-naviToggle').addClass('is--visible');
    }, 600);

    store.actions.loadEntry(null, null, this.id, true, true)
      .then(() => {
        this.post = this.posts[0];
        $(this.$els.entry).imagesLoaded(() => {
          this.clearEntryImage();
          $('.cloneImage').removeClass('is--zoomIn');
          $('body').removeClass('is--disableScroll');
        });
      });
  },

  methods: {
    clearEntryImage: store.actions.clearEntryImage
  },

  filters: {
    moment: (timestamp) => {
      return store.actions.formatDate(timestamp);
    }
  }
};
</script>