import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    name: 'Main',
    path: '/',
    component: () => import('@/views/Main.vue'),
  },
  {
    name: 'Create form',
    path: '/create',
    component: () => import('@/views/CreateForm.vue'),
  },
  {
    name: 'Edit form',
    path: '/edit/:id',
    component: () => import('@/views/EditForm.vue'),
  },
  {
    name: '404',
    path: '/404',
    component: () => import('@/views/404.vue'),
  },
  {
    path: '*',
    redirect: '/404',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
