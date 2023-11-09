import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/pages/MainPage'
import SaibaMaisPage from '@/pages/SaibaMaisPage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import UserPage from '@/pages/UserPage'
import SchedulePage from '@/pages/SchedulePage'
// import TableComponent from '@/components/TableComponent'
import store from './store'

// import axios from 'axios'



const routes = [
    {
        name: 'homeScreen',
        path: '/',
        component: MainPage
    },
    {
        name: 'saibaMaisScreen',
        path: '/saibaMais',
        component: SaibaMaisPage
    },
    {
        name: 'loginScreen',
        path: '/login',
        component: LoginPage
    },
    {
        name: 'RegisterScreen',
        path: '/cadastrar',
        component: RegisterPage
    },
    {
        name: 'UserScreen',
        path: '/paciente',
        component: UserPage,
        meta: {requiresAuth: true},
        children: [
            {
                name: "MainContent",
                path: '',
                components: {
                    userContent: SchedulePage
                }
            },
            {
                name: "AgendarContent",
                path: '/paciente/minhasconsultas',
                components: {
                    userContent: SchedulePage
                }
            },

        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to, from, next) => {
  await store.dispatch('initializeApp');

  const token = localStorage.getItem('token');

  if (to.meta.requiresAuth && !store.state.isAuthenticated) {
    if (!token) {
      next('/login');
    } else {
      next(); 
    }
  } else {
    next();
  }
});


export default router;