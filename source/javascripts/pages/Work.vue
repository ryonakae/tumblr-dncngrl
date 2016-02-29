<template lang='jade'>
div.archive
  h2.archive__title(v-el:title)
    span Work
  div.archive__content
    ul.entryList.entryList--photo(v-el:entry-list)
      component-entry(v-for='post in posts', track-by='id', :post='post')
</template>

<script>
import store from '../store/';
import Entry from '../components/Entry.vue';

window.jQuery = window.$ = require('jquery');
const velocity = require('velocity-animate');
const imagesLoaded = require('imagesloaded');
imagesLoaded.makeJQueryPlugin($);

export default {
  // arrow function使うとthisが取れない
  route: {
    activate: function(transition) {
      console.log('work activate');

      // inアニメーション
      $(this.eyecatch).find('.eyecatch__image').addClass('eyecatch__image--blur');
      $(this.eyecatch).find('.eyecatch__image').removeClass('eyecatch__image--hidden');

      // single -> workに遷移するとき
      if (transition.from.name === 'post') {
        $('.cloneImage').removeClass('cloneImage--zoomIn');
        setTimeout(() => {
          transition.next();
        }, 1000);
      } else {
        // このページに遷移
        transition.next();
      }
    },
    deactivate: function(transition) {
      console.log('work deactivate');

      // work -> singleへ遷移するとき
      if (transition.to.name === 'post') {
        $('body').addClass('disableScroll');
        $(this.eyecatch).find('.eyecatch__image').addClass('eyecatch__image--hidden');

        setTimeout(() => {
          $('.cloneImage').addClass('cloneImage--zoomIn');
        }, 1000);
        setTimeout(() => {
          transition.next();
        }, 2000);
      }

      // work -> indexへ遷移するとき
      if (transition.to.path === '/') {
        // outアニメーション
        $(this.$els.title).removeClass('archive__title--active');
        $(this.$els.entryList).removeClass('entryList--visible');
        $(this.eyecatch).find('.eyecatch__image').removeClass('eyecatch__image--blur');
        // アニメーション終了後に遷移
        setTimeout(() => {
          transition.next();
        }, 600);
      }
    }
  },

  components: {
    'component-entry': Entry
  },

  computed: {
    posts() {
      return store.state.posts;
    },
    pageNum() {
      return store.state.page;
    },
    eyecatch() {
      return store.state.eyecatch;
    }
  },

  ready() {
    console.log('work ready');

    // ページタイトルをフェードイン
    setTimeout(() => {
      $(this.$els.title).addClass('archive__title--active');
    }, 10);

    store.actions.loadEntry('photo', 10)
      .then(() => {
        $('.entryList').imagesLoaded(() => {
          console.log(this.posts);

          $(this.$els.entryList).addClass('entryList--visible');
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