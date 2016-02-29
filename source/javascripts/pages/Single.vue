<template lang='jade'>
.single
  .single__photo
    img(v-for='photo in posts[0].photos', v-bind.src='photo.original_size.url')
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
      transition.next();
    },
  },

  data() {
    return {
      id: '',
      slug: '',
      post: []
    };
  },

  computed: {
    posts() {
      return store.state.posts;
    }
  },

  ready() {
    store.actions.loadEntry(null, null, this.id, true, true)
      .then(() => {
        $('.single').imagesLoaded(() => {
          console.log(this.posts);
          this.$set('post', this.posts[0]);
          console.log(this.post);

          this.clearEntryImage();
          $('.cloneImage').removeClass('is--zoomIn');
          $('body').removeClass('disableScroll');
        });
      });
  },

  methods: {
    clearEntryImage: store.actions.clearEntryImage
  },
};
</script>