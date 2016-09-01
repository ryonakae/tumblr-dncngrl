<template lang='pug'>
section.page#js-page.js-page.about
  .about__content.js-aboutContent(v-el:content)
    article.entry(v-el:entry)
      h1.entry__title About
      .entry__body {{{articleData}}}
</template>

<script>
import store from '../store/';
window.jQuery = window.$ = require('jquery');

export default {
  route: {
    activate: function(transition) {
      transition.next();
    },
    deactivate: function(transition) {
      // outアニメーション
      setTimeout(() => {
        $(this.$els.content).removeClass('is--visible');
      }, 150);
      setTimeout(() => {
        $('.js-eyecatchImage').removeClass('is--shiftLeft');
      }, 300);

      // about -> workへ遷移するとき
      // about -> newsへ遷移するとき
      if (transition.to.path === '/work' || transition.to.path === '/news') {
        setTimeout(() => {
          $('.js-eyecatchImage').addClass('is--blur');
        }, 1300);
        setTimeout(() => {
          transition.next();
        }, 2300);
      }
      else {
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
    const $eyecatch = document.getElementById('js-eyecatch');

    $($eyecatch).imagesLoaded({background: true}, ()=>{
      // アイキャッチ表示
      $eyecatch.classList.add('is--visible');

      // アイキャッチとコンテンツを移動
      setTimeout(() => {
        $(this.$els.content).addClass('is--visible');
      }, 150);
      setTimeout(() => {
        $('.js-eyecatchImage').addClass('is--shiftLeft');
      }, 300);

      // ノイズ隠す
      document.getElementById('js-grain').classList.add('is--hidden');

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
    });
  },

  methods: {
    getAboutContent: function() {
      return new Promise((resolve, reject) => {
        // jquery.xdomainajax.jsを使う場合、$.ajax();ではなくjQuery.ajax();としないとダメ
        jQuery.ajax({
          type: 'GET',
          url: 'http://dncngrl.com/about',
          dataType: 'html',
          cache: false,
          timeout: 10000,
          success: (res) => {
            const article = $(res).find('#article').html();
            this.articleData = article;
            resolve();
          }
        });
      });
    }
  }
};
</script>