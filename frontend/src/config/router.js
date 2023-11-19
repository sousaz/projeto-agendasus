import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/pages/MainPage'
import SaibaMaisPage from '@/pages/SaibaMaisPage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import UserPage from '@/pages/UserPage'
import SchedulePage from '@/pages/SchedulePage'
import UbsPage from '@/pages/UbsPage'
import RegisterDoctorComponent from '@/components/RegisterDoctorComponent'
import RegisterQueriesComponent from '@/components/RegisterQueriesComponent'
import UbsTableComponent from '@/components/UbsTableComponent'
import store from './store'





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
        meta: {requiresAdmin: true},
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
            {
                name: "UbsTableContent",
                path: '/ubs/consultas',
                components: {
                    userContent: UbsTableComponent
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
  
    if (to.meta.requiresAuth) {
      if (!store.state.isLogged) {
        next('/login');
      } else {
        next();
        store.commit('setTableData', {});
      }
    } else if(to.meta.requiresAdmin) {
        await store.dispatch('validateAdmin')
        if (!store.state.isLogged) {
            next('/login');
        } else {
            next();
        }
    } else {
        next()
    }
  });
  


export default router;