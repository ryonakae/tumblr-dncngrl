<template lang='jade'>
#Dncngrl
  component-eyecatch
  component-header
  //- router-view(keep-alive)
  router-view
</template>

<script>
import Vue from 'vue';

import Eyecatch from './components/Eyecatch.vue';
import Header from './components/Header.vue';

Vue.component('component-eyecatch', Eyecatch);
Vue.component('component-header', Header);
</script>