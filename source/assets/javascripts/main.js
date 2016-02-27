import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  history: true,
  saveScrollPosition: true,
  abstract: true
});
export const vueRouter = router;

import Index from './pages/Index.vue';
router.map({
  '/': { component: Index }
});
router.afterEach((transition) => {
  console.log('Successfully navigated to: ' + transition.to.path);
});

import Dncngrl from './Dncngrl.vue';
const App = Vue.extend(Dncngrl);
router.start(App, '#app');