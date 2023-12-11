import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Menu',
        component: () => import("../components/MenuComponent.vue"),
        children: [
            {
                path: '/menu/common',
                name: 'common',
                component: () => import('../components/CommonModal.vue')
            },
            {
                path: '/menu/appointment-list',
                name:'AppointmentList',
                component: () => import('../components/AppointmentList.vue')
            },
            {
                path: '/menu/appointment-form',
                name:'AppointmentForm',
                component: () => import('../components/AppointmentForm.vue')
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router;
