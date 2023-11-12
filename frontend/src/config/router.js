import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/pages/MainPage'
import SaibaMaisPage from '@/pages/SaibaMaisPage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import UserPage from '@/pages/UserPage'
import SchedulePage from '@/pages/SchedulePage'
import UbsPage from '@/pages/UbsPage'
// import TableComponent from '@/components/TableComponent'
import RegisterDoctorComponent from '@/components/RegisterDoctorComponent'
import RegisterQueriesComponent from '@/components/RegisterQueriesComponent'
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
                },
            },

        ]
    },
    {
        name: "UbsScreen",
        path: '/ubs',
        component: UbsPage,
        meta: {requiresAuth: true},
        children: [
            {
                name: "RegisterDoctorContent",
                path: '',
                components: {
                    userContent: RegisterDoctorComponent
                }
            },
            {
                name: "RegisterQueryContent",
                path: '/ubs/consulta',
                components: {
                    userContent: RegisterQueriesComponent
                }
            },
        ]
    }
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
      store.commit('setTableData', {})
    }
  } else {
    next();
  }
});


export default router;