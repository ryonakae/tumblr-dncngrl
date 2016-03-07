<template lang='jade'>
section.page.js-page.about
  .about__content.js-aboutContent(v-el:content)
    article.entry(v-el:entry)
      h1.entry__title About
      .entry__body {{{articleData}}}
      //- .entry__body.
      //-   <p><img src="http://static.tumblr.com/xm1j4jr/GKXnym2bx/about_visual.png"/></p>
      //-
      //-   <p>
      //-     Dancing Girl.は<a href="http://brdr.jp" target="_blank">Ryo Nakae</a>主宰の同人サークルです。<br/>
      //-     アニメ・マンガ作品の二次創作を中心に活動予定。
      //-   </p>
      //-
      //-   <h2>Member</h2>
      //-
      //-   <h3>Ryo Nakae</h3>
      //-
      //-   <p>Webデザイナー。1989年生まれ。サークル「Dancing Girl.」主宰。</p>
      //-
      //-   <ul><li><a href="https://www.facebook.com/ryo.nakae" target="_blank">Facebook</a></li>
      //-     <li><a href="https://twitter.com/ryo_dg" target="_blank">Twitter</a></li>
      //-     <li><a href="https://dribbble.com/ryo_dg" target="_blank">Dribbble</a></li>
      //-     <li><a href="https://www.behance.net/ryo_dg" target="_blank">Behance</a></li>
      //-     <li><a href="https://jypg.net/ryo_dg" target="_blank">JAYPEG</a></li>
      //-     <li><a href="https://github.com/ryonakae" target="_blank">GitHub</a></li>
      //-     <li><a href="http://pixiv.me/ryo_dg" target="_blank">Pixiv</a></li>
      //-     <li><a href="mailto:me@ryonakae.com">E-Mail</a></li>
      //-   </ul>
</template>

<script>
import store from '../store/';
window.jQuery = window.$ = require('jquery');
// require('../lib/jquery.xdomainajax.js');

export default {
  route: {
    activate: function(transition) {
      // console.log('about activate');

      transition.next();
    },
    deactivate: function(transition) {
      // console.log('about deactivate');

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
    // console.log('about ready');

    // アイキャッチとコンテンツを移動
    setTimeout(() => {
      $(this.$els.content).addClass('is--visible');
    }, 150);
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

    // setTimeout(() => {
    //   $(this.$els.entry).addClass('is--visible');
    // }, 1200);
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
            // console.log(article);
            this.articleData = article;
            resolve();
          }
        });
      });
    }
  }
};
</script>