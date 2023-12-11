import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Menu',
        component: () => import("../components/MenuComponent.vue"),
        children: [
            {
                path: '/menu/common',
                name: 'SpineView',
                component: () => import('../views/common/SpineView.vue')
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router;
