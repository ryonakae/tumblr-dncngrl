<template lang='jade'>
#Dncngrl
  component-eyecatch
  component-cloneimage
  component-header

  //- router-view(keep-alive)
  router-view
</template>

<script>
// import Vue from 'vue';

import Eyecatch from './components/Eyecatch.vue';
import Header from './components/Header.vue';
import CloneImage from './components/CloneImage.vue';

// Vue.component('component-eyecatch', Eyecatch);
// Vue.component('component-header', Header);
// Vue.component('component-cloneImage', CloneImage);

export default {
  components: {
    'component-eyecatch': Eyecatch,
    'component-header': Header,
    'component-cloneimage': CloneImage
  },
};
</script>