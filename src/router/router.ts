import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Menu',
        component: () => import("../components/MenuComponent.vue"),
        children: [
            {
                path: '/menu/spineView',
                name: 'SpineView',
                component: () => import('../views/common/SpineView.vue')
            },
            {
                path: '/menu/medicinal-products',
                name: 'Medicinal-products',
                component: () => import('../views/common/Medicinalproducts.vue')
            },
            {
                path: '/Menu/h3',
                name: 'H3',
                component: () => import('../views/common/HrgComponent.vue')
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router;
