import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/pages/MainPage'
import SaibaMaisPage from '@/pages/SaibaMaisPage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import UserPage from '@/pages/UserPage'
import HomePage from '@/pages/HomePage'
import SchedulePage from '@/pages/SchedulePage'


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
        path: '/user',
        component: UserPage,
        children: [
            {
                name: "MainContent",
                path: '',
                components: {
                    userContent: HomePage
                }
            },
            {
                name: "AgendarContent",
                path: '/user/agendar',
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

export default router;