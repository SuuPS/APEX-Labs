import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Menu',
        component: () => import("../components/MenuComponent.vue"),
        children: [
            {
                path: '/Menu/h1',
                name: 'H1',
                component: () => import('../views/HaView.vue')
            },
            {
                path: '/Menu/h2',
                name: 'H2',
                component: () => import('../views/HsComponent.vue')
            },
            {
                path: '/Menu/h3',
                name: 'H3',
                component: () => import('../views/HrgComponent.vue')
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
    // scrollBehavior(to, from: RouteLocationNormalizedLoaded, savedPosition) {
    //     return savedPosition || { left: 0, top: 0 };
    // },
});

export default router;
