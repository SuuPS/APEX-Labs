// menu.ts
import { defineStore } from 'pinia';
import { h, watch } from 'vue';
import { MailOutlined, PieChartOutlined } from '@ant-design/icons-vue';
import { MenuItem, MenuState } from './menuTypes';

export const useMenuStore = defineStore('menu', () => {
    const menuItems: MenuItem[] = [
        {
            key: 'sub1',
            icon: () => h(MailOutlined),
            label: 'Справочники',
            title: 'Navigation One',
            "children": [
                {
                    key: '1',
                    label: 'Иглы',
                    title: 'Option 5',
                },
                {
                    key: '2',
                    label: 'Лекарственные препараты',
                    title: 'Option 6',
                },
            ],
        },
        {
            key: '3',
            icon: () => h(PieChartOutlined),
            label: 'Назначения',
            title: 'Option 1',
        },
    ];

    const menu: MenuState = {
        collapsed: false,
        selectedKeys: ['1'],
        openKeys: ['sub1'],
        preOpenKeys: ['sub1'],
    };

    const menuStore = useMenuStore();

    const updateOpenKeys = (newVal: string[]) => {
        menuStore.menu.openKeys = newVal;
    };

    watch(() => menu.openKeys, (newVal) => {
        updateOpenKeys(newVal);
    });

    return {
        menu,
        menuItems,
    };
});
