import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import EditView from '../views/EditView.vue';
import CreateView from '../views/CreateView.vue';
import DeleteView from '../views/DeleteView.vue';
import InfoView from '../views/InfoView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/edit/:id/:name',
    name: 'edit',
    component: EditView
  },
  {
    path: '/delete/:id/:name',
    name: 'delete',
    component: DeleteView,
  },
  {
    path: '/create',
    name: 'create',
    component: CreateView
  },
  {
    path: '/info/:id/',
    name: 'info',
    component: InfoView
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
