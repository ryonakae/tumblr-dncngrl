import Vue from 'vue';
window.jQuery = window.$ = require('jquery');

// debug mode
// Vue.config.debug = true;

// import vue-router
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// vue-router initialize
const router = new VueRouter({
  history: true,
  saveScrollPosition: false,
  // abstract: true
});
export const vueRouter = router;

// uaManager
import UaManager from './modules/UaManager';
const uaManager = new UaManager();
export const myUaManager = uaManager;

// import pages
import Index from './pages/Index.vue';
import About from './pages/About.vue';
import Work from './pages/Work.vue';
import News from './pages/News.vue';
import Single from './pages/Single.vue';

// vue-router mapping
router.map({
  '/': { component: Index },
  '/about': { component: About },
  '/work': { component: Work },
  '/news': { component: News },
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