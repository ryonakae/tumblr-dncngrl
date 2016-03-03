<template lang='jade'>
section.page.js-page.single
  //- photo
  article.entry.entry--photo(v-el:entry, v-if='post.type === "photo"')
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

  //- news
  article.entry.entry--news(v-el:entry, v-if='post.type === "text"')
    .entry__content
      h1.entry__title {{post.title}}
      .entry__body {{{post.body}}}
      .entry__reblog
        a(v-bind:href='reblogUrl', target='_blank') Reblog this article

    .entry__back
      a(v-link='{path:"/news"}') BACK TO NEWS
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

      $('.js-eyecatchImage').addClass('is--blur').addClass('is--hidden');

      transition.next();
    },
    deactivate: function(transition) {
      $(this.$els.entry).removeClass('is--visible');

      // single -> aboutへ遷移するとき
      if (transition.to.path === '/about') {
        $('.js-eyecatchImage').removeClass('is--blur').removeClass('is--hidden');
        setTimeout(() => {
          transition.next();
        }, 1000);
      } else {
        setTimeout(() => {
          transition.next();
        }, 600);
      }
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
      const id = this.post.id;
      const reblogKey = this.post.reblog_key;
      return 'https://www.tumblr.com/reblog/' + id + '/' + reblogKey;
    }
  },

  ready() {
    // ノイズ停止・隠す
    store.actions.changeGrainStatus('stop');
    $('.js-grain').addClass('is--hidden');

    // ヘッダータイトルとナビをフェードイン
    setTimeout(() => {
      $('.js-headerTitle').addClass('is--visible');
      $('.js-naviOpen').addClass('is--visible');
    }, 600);

    store.actions.loadEntry(null, null, this.id, true, true)
      .then(() => {
        // storeから取得したpostsの最初のオブジェクトをdataのpostに入れる
        this.post = this.posts[0];

        // ページタイトルを変更
        if (this.post.type === 'photo') {
          const timestamp = this.post.timestamp;
          const date = store.actions.formatDate(timestamp);
          store.actions.changePageTitle(date);
        } else {
          store.actions.changePageTitle(this.post.title);
        }

        // 画像読み込み後にフェードイン
        $(this.$els.entry).imagesLoaded(() => {
          // 記事をフェードイン
          setTimeout(() => {
            $(this.$els.entry).addClass('is--visible');
          }, 100);

          // 記事フェードイン後
          setTimeout(() => {
            store.actions.clearEntryImage();
            $('.cloneImage').removeClass('is--zoomIn');
            $('body').removeClass('is--disableScroll');
          }, 700);
        });
      });
  },

  filters: {
    moment: (timestamp) => {
      return store.actions.formatDate(timestamp);
    }
  }
};
</script>