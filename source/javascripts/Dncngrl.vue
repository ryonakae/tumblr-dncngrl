<template lang='pug'>
#Dncngrl
  component-eyecatch
  component-cloneimage
  component-header

  //- router-view(keep-alive)
  router-view
</template>

<script>
import store from './store/';

import Eyecatch from './components/Eyecatch.vue';
import Header from './components/Header.vue';
import CloneImage from './components/CloneImage.vue';

import {myUaManager} from './bundle.js';

window.jQuery = window.$ = require('jquery');
const imagesLoaded = require('imagesloaded');
imagesLoaded.makeJQueryPlugin($);

export default {
  components: {
    'component-eyecatch': Eyecatch,
    'component-header': Header,
    'component-cloneimage': CloneImage
  },

  computed: {
    pageTitle() {
      return store.state.pageTitle;
    }
  },

  ready() {
    // UA見てbodyにclass付与
    myUaManager.init();

    this.$watch('pageTitle', () => {
      if (this.pageTitle === 'Top' || this.pageTitle === 'Index') {
        document.title = store.state.siteTitle;
      }
      else {
        document.title = this.pageTitle + ' | ' + store.state.siteTitle;
      }
    });

    // eyecatch画像がロードされたら表示
    console.log(store.state.eyecatchImage);
    $(store.state.eyecatchImage).imagesLoaded({background: true}, ()=>{
      setTimeout(()=>{
        $('#js-eyecatch').removeClass('is--hidden');
      }, 100);
    });
  }
};
</script>