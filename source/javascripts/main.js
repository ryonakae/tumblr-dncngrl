import Vue from 'vue';
window.jQuery = window.$ = require('jquery');

// import stores
import store from './store/';

// import vue-router
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// vue-router initialize
const router = new VueRouter({
  // history: true,
  // saveScrollPosition: true,
  // abstract: true
});
export const vueRouter = router;

// import pages
import Index from './pages/Index.vue';
import About from './pages/About.vue';
import Work from './pages/Work.vue';
import Single from './pages/Single.vue';

// vue-router mapping
router.map({
  '/': { component: Index },
  '/about': { component: About },
  '/work': { component: Work },
  '/post/:id/:slug': {
    name: 'post',
    component: Single
  }
});

// import app
import Dncngrl from './Dncngrl.vue';
const App = Vue.extend(Dncngrl);

// start app
router.start(App, '#app');