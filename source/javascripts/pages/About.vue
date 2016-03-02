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

      transition.next();
    },
    deactivate: function(transition) {
      console.log('about deactivate');

      // outアニメーション
      setTimeout(() => {
        $(this.$els.page).removeClass('is--visible');
      }, 100);
      setTimeout(() => {
        $('.js-eyecatchImage').removeClass('is--shiftLeft');
      }, 300);

      // about -> workへ遷移するとき
      if (transition.to.path === '/work') {
        setTimeout(() => {
          $('.js-eyecatchImage').addClass('is--blur');
        }, 1300);
        setTimeout(() => {
          transition.next();
        }, 2300);
      } else {
        setTimeout(() => {
          transition.next();
        }, 1300);
      }
    }
  },

  data() {
    return {
      articleData: {}
    };
  },

  ready() {
    console.log('about ready');

    // アイキャッチとコンテンツを移動
    setTimeout(() => {
      $(this.$els.page).addClass('is--visible');
    }, 100);
    setTimeout(() => {
      $('.js-eyecatchImage').addClass('is--shiftLeft');
    }, 300);

    // ノイズ停止・隠す
    store.actions.changeGrainStatus('stop');
    $('.js-grain').addClass('is--hidden');

    // ページタイトルを変更
    store.actions.changePageTitle('About');

    // ヘッダータイトルとナビをフェードイン
    setTimeout(() => {
      $('.js-headerTitle').addClass('is--visible');
      $('.js-naviOpen').addClass('is--visible');
    }, 600);

    // ページ内容取得してフェードイン
    this.getAboutContent()
      .then(() => {
        setTimeout(() => {
          $(this.$els.entry).addClass('is--visible');
        }, 1200);
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