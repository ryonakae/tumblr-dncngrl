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

import { myUaManager } from './bundle.js';

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
    // console.log('dncngrl ready');

    // UA見てbodyにclass付与
    myUaManager.init();

    this.$watch('pageTitle', () => {
      if (this.pageTitle === 'Top' || this.pageTitle === 'Index') {
        document.title = store.state.siteTitle;
      } else {
        document.title = this.pageTitle + ' | ' + store.state.siteTitle;
      }
    });
  }
};
</script>