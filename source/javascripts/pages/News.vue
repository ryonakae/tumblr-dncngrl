<template lang='jade'>
section.page.js-page.archive
  h1.archive__title(v-el:title) NEWS

  .archive__content
    ul.entryList.entryList--news(v-el:entry-list)
      li.entryList__item(v-for='post in posts', track-by='id')
        component-entryitem(:post='post')
</template>

<script>
import store from '../store/';
import EntryItem from '../components/EntryItem.vue';

window.jQuery = window.$ = require('jquery');

export default {
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
    console.log('news ready');

    // ノイズ停止・隠す
    store.actions.changeGrainStatus('stop');
    $('.js-grain').addClass('is--hidden');

    // ページタイトルを変更
    store.actions.changePageTitle('News');

    // ページタイトルをフェードイン
    setTimeout(() => {
      $(this.$els.title).addClass('is--visible');
    }, 100);

    // ヘッダータイトルとナビをフェードイン
    setTimeout(() => {
      $('.js-headerTitle').addClass('is--visible');
      $('.js-naviOpen').addClass('is--visible');
    }, 600);

    store.actions.loadEntry('text', 10, null, false, false)
      .then(() => {
        console.log(this.posts);
        $(this.$els.entryList).addClass('is--visible');
      });
  }
};
</script>