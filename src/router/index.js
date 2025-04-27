import { createRouter, createWebHistory } from 'vue-router';
import RegisterView from '../views/RegisterView.vue';
import LoginView from '@/views/LoginView.vue';
import LeaderBoardView from '@/views/LeaderBoardView.vue';
import TeamPage from '@/views/TeamPage.vue';
import GameView from '@/views/GameView.vue';
import CreateMatchView from '@/views/CreateMatchView.vue';


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
  },
  {
    path: '/team',
    name: 'team',
    component: TeamPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/games',
    name: 'games',
    component: GameView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/game',
    name: 'game',
    component: CreateMatchView,
    meta: {
      requiresAuth: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Garde de navigation pour sécuriser certaines routes
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
