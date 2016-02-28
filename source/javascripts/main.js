import Vue from 'vue';
window.jQuery = window.$ = require('jquery');
import store from './stores/';

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

// before routing
let isFirst = true;
router.beforeEach((transition) => {
  console.log(transition);
  console.log('Go: ' + transition.to.path);

  // work -> index
  if (transition.from.path === '/work' && transition.to.path === '/') {
    console.log('workからindexに遷移するぞ');
    store.actions.beroreLeaveArchive();
    store.actions.beforeInIndex();
  }
  // index -> work
  else if (transition.from.path === '/' && transition.to.path === '/work') {
    console.log('indexからworkに遷移するぞ');
    store.actions.beforeLeaveIndex();
    store.actions.beroreInArchive();
  }
  // work -> single
  else if (transition.from.path === '/work' && transition.to.name === 'post') {
    console.log('workからsingleに遷移するぞ');
  }
  // single -> work
  else if (transition.from.name === 'post' && transition.to.path === '/work') {
    console.log('singleからworkに遷移するぞ');
  }

  if (isFirst) {
    console.log('initial transition');
    transition.next();
    isFirst = false;
  } else {
    setTimeout(() => {
      transition.next();
    }, 1000);
  }
});

// after routing
router.afterEach((transition) => {
  console.log('Successfully navigated to: ' + transition.to.path);

  if (transition.to.path === '/') {
    store.actions.afterInIndex();
  } else if (transition.to.path === '/work') {
    store.actions.afterInArchive();
  }
});

// import app
import Dncngrl from './Dncngrl.vue';
const App = Vue.extend(Dncngrl);

// start app
router.start(App, '#app');