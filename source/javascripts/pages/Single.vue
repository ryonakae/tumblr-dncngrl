<template lang='jade'>
section.page.js-page.single
  article.entry.entry--photo(v-el:entry)
    .entry__photo
      img(v-for='photo in post.photos', v-bind:src='photo.original_size.url')

    .entry__textarea
      .entry__textareaInner
        h1.entry__title {{ post.timestamp | moment }}

        .entry__info
          small.notes {{post.note_count}} Notes
          small.tags
            span.tags__item(v-for='tag in post.tags') {{tag}}

        .entry__body {{{post.caption}}}
        .entry__reblog
          a(v-bind:href='reblogUrl', target='_blank') Reblog this article

    .entry__back
      a(v-link='{path:"/work"}') BACK TO WORK
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
    deactivate: function(transition) {
      $(this.$els.entry).removeClass('is--visible');
      setTimeout(() => {
        transition.next();
      }, 600);
    }
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
    },
    reblogUrl() {
      let id = this.post.id;
      let reblogKey = this.post.reblog_key;
      return 'https://www.tumblr.com/reblog/' + id + '/' + reblogKey;
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
        // storeから取得したpostsの最初のオブジェクトをdataのpostに入れる
        this.post = this.posts[0];

        // ページタイトルを変更
        if (this.post.type === 'photo') {
          let timestamp = this.post.timestamp;
          let date = store.actions.formatDate(timestamp);
          store.actions.changePageTitle(date);
        } else {
          store.actions.changePageTitle(this.post.type === 'text');
        }

        // 画像読み込み後
        $(this.$els.entry).imagesLoaded(() => {
          // 記事をフェードイン
          setTimeout(() => {
            $(this.$els.entry).addClass('is--visible');
          }, 100);

          // 記事フェードイン後
          setTimeout(() => {
            this.clearEntryImage();
            $('.cloneImage').removeClass('is--zoomIn');
            $('body').removeClass('is--disableScroll');
          }, 700);
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