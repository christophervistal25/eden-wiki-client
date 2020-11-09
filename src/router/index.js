import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'


const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "about" */ '../views/Docs.vue')
  },
  {
    path: '/admin/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/docs/:main?/:type?/:page?',
    name: 'Docs',
    props: true,
    query: {
      main: '',
      type: '',
      page: 1,
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Docs.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeResolve((to) => {
  // If this isn't an initial page load.
  if (to.name) {
    // console.log('processing');
  }
})

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  // console.log('complete');
})


export default router
