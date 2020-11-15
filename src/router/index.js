import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'


const routes = [
  {
    path: '/docs',
    component: () => import(/* webpackChunkName: "about" */ '../views/Docs.vue')
  },
  {
    path: '/docs/:main/:type/:page',
    name: 'Docs',
    props: true,
    query: {
      main: '',
      type: '',
      page: 1,
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Docs.vue')
  },
  {
    path: '/docs/:id',
    name: 'DocsMenu',
    props: true,
    query: { id: 1 },
    component: () => import(/* webpackChunkName: "about" */ '../views/DocsMenu.vue')
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
    path: '/admin/items',
    name: 'SubCategories',
    component: () => import(/* webpackChunkName: "about" */ '../views/Item.vue')
  },
  {
    path: '/admin/create/category',
    name: 'CreateCategory',
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/AddCategory.vue')
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
    path: "/:catchAll(.*)",
    component: () => import(/* webpackChunkName: "about" */ '../views/Docs.vue'),
    meta: {
      requiresAuth: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeResolve((to) => {
  // If this isn't an initial page load.
  if (to.name) {
    // NProgress.start()
    // console.log('processing');
  }
})

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  // console.log('complete');
  // NProgress.done()
})


export default router
