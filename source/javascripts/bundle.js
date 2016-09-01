import Vue from 'vue';
// window.jQuery = window.$ = require('jquery');

// import vue-router
import VueRouter from 'vue-router';
Vue.use(VueRouter);

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
const routes = [
  {path: '/', component: Index},
  {path: '/about', component: About},
  {path: '/work', component: Work},
  {path: '/news', component: News},
  {path: '/post/:id/:slug', component: Single, name: 'post'},
];

// vue-router initialize
const router = new VueRouter({
  routes: routes,
  history: true,
  saveScrollPosition: false,
  // abstract: true
});
export const vueRouter = router;

// import app
import Dncngrl from './Dncngrl.vue';
const App = Vue.extend(Dncngrl);

// start app
new Vue({
  router: router,
}).$mount('#app');