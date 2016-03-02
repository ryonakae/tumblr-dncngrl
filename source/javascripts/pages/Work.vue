<template lang='jade'>
section.page.js-page.archive
  h1.archive__title(v-el:title) WORK

  .archive__content
    ul.entryList.entryList--photo(v-el:entry-list)
      li.entryList__item(v-for='post in posts', track-by='id')
        component-entryitem(:post='post')
</template>

<script>
import store from '../store/';
import EntryItem from '../components/EntryItem.vue';

window.jQuery = window.$ = require('jquery');
const imagesLoaded = require('imagesloaded');
imagesLoaded.makeJQueryPlugin($);

export default {
  // arrow function使うとthisが取れない
  route: {
    activate: function(transition) {
      console.log('work activate');

      // inアニメーション
      $(this.eyecatch).find('.image')
        .addClass('is--blur')
        .removeClass('is--hidden');

      // single -> workに遷移するとき
      if (transition.from.name === 'post') {
        $('.cloneImage').removeClass('is--zoomIn');
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
        $('body').addClass('is--disableScroll');
        $(this.eyecatch).find('.image').addClass('is--hidden');

        setTimeout(() => {
          $('.cloneImage').addClass('is--zoomIn');
        }, 1000);
        setTimeout(() => {
          transition.next();
        }, 2000);
      }

      // work -> indexへ遷移するとき
      if (transition.to.path === '/') {
        // outアニメーション
        $(this.$els.title).removeClass('is--visible');
        $(this.$els.entryList).removeClass('is--visible');
        $(this.eyecatch).find('.image').removeClass('is--blur');
        // アニメーション終了後に遷移
        setTimeout(() => {
          transition.next();
        }, 600);
      }
    }
  },

  components: {
    'component-entryitem': EntryItem
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

    // ノイズ停止
    store.actions.changeGrainStatus('stop');

    // ページタイトルを変更
    store.actions.changePageTitle('Work');

    // ページタイトルをフェードイン
    setTimeout(() => {
      $(this.$els.title).addClass('is--visible');
    }, 100);

    // ヘッダータイトルとナビをフェードイン
    setTimeout(() => {
      $('.js-headerTitle').addClass('is--visible');
      $('.js-naviOpen').addClass('is--visible');
    }, 600);

    store.actions.loadEntry('photo', 10, null, false, false)
      .then(() => {
        $('.entryList').imagesLoaded(() => {
          console.log(this.posts);

          $(this.$els.entryList).addClass('is--visible');
        });
      });
  }
};
</script>