import { createRouter, createWebHistory } from 'vue-router';
import AdminLogin from '../views/AdminLogin.vue';
import AdminPanel from '../views/AdminPanel.vue';
import HomePage from '../views/HomePage.vue'; // NOVO

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/admin', name: 'AdminLogin', component: AdminLogin },
    {
        path: '/admin/panel',
        name: 'AdminPanel',
        component: AdminPanel,
        meta: { requiresAuth: true }
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('adminToken');
    if (to.meta.requiresAuth && !token) {
        next({ name: 'AdminLogin' });
    } else {
        next();
    }
});
export default router;