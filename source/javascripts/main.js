import Vue from 'vue';

// import vue-router
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// vue-router initialize
const router = new VueRouter({
  history: true,
  saveScrollPosition: true,
  // abstract: true
});
export const vueRouter = router;

// import pages
import Index from './pages/Index.vue';
import About from './pages/About.vue';

// vue-router mapping
router.map({
  '/': { component: Index },
  '/about': { component: About }
});
router.afterEach((transition) => {
  console.log('Successfully navigated to: ' + transition.to.path);
});

// import app
import Dncngrl from './Dncngrl.vue';
const App = Vue.extend(Dncngrl);

// start app
router.start(App, '#app');