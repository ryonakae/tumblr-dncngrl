<template lang='jade'>
section.page.js-page.about
  div {{{articleData}}}
</template>

<script>
import store from '../store/';
window.jQuery = window.$ = require('jquery');
require('../lib/jquery.xdomainajax.js');

export default {
  data() {
    return {
      articleData: {}
    }
  },

  ready() {
    console.log('about ready');

    // ノイズ停止
    store.actions.changeGrainStatus('stop');

    // ページタイトルを変更
    store.actions.changePageTitle('About');

    // ヘッダータイトルとナビをフェードイン
    setTimeout(() => {
      $('.js-headerTitle').addClass('is--visible');
      $('.js-naviToggle').addClass('is--visible');
    }, 600);

    // ajax
    // jquery.xdomainajax.jsを使う場合、$.ajax();ではなくjQuery.ajax();としないとダメ
    jQuery.ajax({
      type: 'GET',
      url: 'http://dncngrl.com/about',
      timeout: 10000,
      success: (res) => {
        const article = $(res.responseText).find('#article').html();
        console.log(article);
        this.articleData = article;
      }
    });
  }
};
</script>