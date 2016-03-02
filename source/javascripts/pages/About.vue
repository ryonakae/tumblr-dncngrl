<template lang='jade'>
section.page.js-page.about(v-el:page)
  div.entry(v-el:entry)
    h1.entry__title About
    div.entry__body {{{articleData}}}
</template>

<script>
import store from '../store/';
window.jQuery = window.$ = require('jquery');
require('../lib/jquery.xdomainajax.js');

export default {
  route: {
    activate: function(transition) {
      console.log('about activate');

      // inアニメーション
      $('.js-eyecatchImage').addClass('is--shiftLeft');

      setTimeout(() => {
        transition.next();
      }, 1000);
    },
    deactivate: function(transition) {
      console.log('about deactivate');

      // outアニメーション
      $('.js-eyecatchImage').removeClass('is--shiftLeft');

      setTimeout(() => {
        transition.next();
      }, 1000);
    }
  },

  data() {
    return {
      articleData: {}
    };
  },

  ready() {
    console.log('about ready');

    // ノイズ停止・隠す
    store.actions.changeGrainStatus('stop');
    $('.js-grain').addClass('is--hidden');

    // ページタイトルを変更
    store.actions.changePageTitle('About');

    // ヘッダータイトルとナビをフェードイン
    // コンテンツも
    setTimeout(() => {
      $('.js-headerTitle').addClass('is--visible');
      $('.js-naviOpen').addClass('is--visible');
      $(this.$els.page).addClass('is--visible');
    }, 600);

    // ページ内容取得してフェードイン
    this.getAboutContent()
      .then(() => {
        $(this.$els.page).addClass('is--visible');
        setTimeout(() => {
          $(this.$els.entry).addClass('is--visible');
        }, 1000);
      });
  },

  methods: {
    getAboutContent: function() {
      return new Promise((resolve, reject) => {
        // jquery.xdomainajax.jsを使う場合、$.ajax();ではなくjQuery.ajax();としないとダメ
        jQuery.ajax({
          type: 'GET',
          url: 'http://dncngrl.com/about',
          timeout: 10000,
          success: (res) => {
            const article = $(res.responseText).find('#article').html();
            console.log(article);
            this.articleData = article;
            resolve();
          }
        });
      });
    }
  }
};
</script>