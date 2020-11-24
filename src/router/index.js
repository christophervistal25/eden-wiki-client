import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'


const routes = [
  {
    path: '/docs',
    name: 'DocsMain',
    component: () => import(/* webpackChunkName: "about" */ '../views/Docs.vue')
  },
  {
    path: '/docs/:main/:type/:page',
    name: 'Docs',
    component: () => import(/* webpackChunkName: "about" */ '../views/DocsItem.vue')
  },
  {
    path: '/docs/:menu/:page',
    name: 'DocsMenu',
    component: () => import(/* webpackChunkName: "about" */ '../views/DocsMenu.vue'),
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue')
  },
  {
    path: '/admin/create/category',
    name: 'AdminCreateCategory',
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/AddCategory.vue')
  },
  {
    path: '/admin/edit/category/:id',
    name: 'AdminEditCategory',
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/EditCategory.vue')
  },
  {
    path: '/admin/items',
    name: 'AdminSubCategories',
    component: () => import(/* webpackChunkName: "about" */ '../views/Item.vue')
  },
  {
    path: '/admin/sets',
    name: 'AdminSets',
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/Set.vue')
  },
  {
    path: '/admin/set/create',
    name: 'AdminSetCreate',
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/SetCreate.vue')
  },
  {
    path: '/admin/set/edit/:id',
    name: 'AdminEditSet',
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/SetEdit.vue')
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
