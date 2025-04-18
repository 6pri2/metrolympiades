/*import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router*/

import { createRouter, createWebHistory } from 'vue-router';
import RegisterView from '../views/RegisterView.vue';
import LoginView from '@/views/LoginView.vue';
import LeaderBoardView from '@/views/LeaderBoardView.vue';

const routes = [
  {
    path: '/',
    redirect: '/register' 
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },

  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  
  {
    path: '/leaderboard',
    name: 'leaderboard',
    component: LeaderBoardView
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
