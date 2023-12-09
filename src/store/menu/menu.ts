// menu.ts
import { defineStore } from 'pinia';
import { h, watch } from 'vue';
import { MailOutlined, PieChartOutlined } from '@ant-design/icons-vue';

interface MenuItem {
    key: string;
    icon: () => JSX.Element;
    label: string;
    title: string;
    subItems?: MenuItem[]; // Переименование свойства "children" в "subItems"
}

interface MenuState {
    collapsed: boolean;
    selectedKeys: string[];
    openKeys: string[];
    preOpenKeys: string[];
}

export const useMenuStore = defineStore('menu', () => {
    const menuItems: MenuItem[] = [
        {
            key: 'sub1',
            icon: () => h(MailOutlined),
            label: 'Справочники',
            title: 'Navigation One',
            subItems: [ // Изменение свойства "children" на "subItems"
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
            key: '5',
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

    watch(() => menu.openKeys, (newVal, oldVal) => {
        menuStore.updateOpenKeys(newVal);
    });

    return {
        menu,
        menuItems,
    };
});
