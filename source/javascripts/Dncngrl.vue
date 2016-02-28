<template lang='jade'>
#Dncngrl
  component-header
  router-view(keep-alive)
</template>

<script>
import Vue from 'vue';

import Header from './components/Header.vue';
Vue.component('component-header', Header);
</script>