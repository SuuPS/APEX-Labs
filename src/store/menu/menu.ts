
import { defineStore } from 'pinia';
import { h, watch, reactive } from 'vue';
import { MailOutlined, PieChartOutlined } from '@ant-design/icons-vue';
import { MenuItem, MenuState } from './menuTypes';
import { useRouter } from 'vue-router';

export const useMenuStore = defineStore('menu', () => {
    const router = useRouter();

    const menuItems: MenuItem[] = reactive([
        {
            key: 'sub1',
            icon: () => h(MailOutlined),
            label: 'Справочники',
            title: 'Navigation One',
            children: [
                {
                    key: '1',
                    label: 'Иглы',
                    title: 'H1',
                },
                {
                    key: '2',
                    label: 'Лекарственные препараты',
                    title: 'H2',
                },
            ],
        },
        {
            key: '3',
            icon: () => h(PieChartOutlined),
            label: 'Назначения',
            title: 'H3',
        },
    ])

    const menu: MenuState = reactive({
        collapsed: false,
        selectedKeys: ['1'],
        openKeys: ['sub1'],
        preOpenKeys: ['sub1'],
    })

    const updateOpenKeys = (newVal: string[]) => {
        console.log(newVal)
        menu.openKeys = newVal;

        let routerPath: string = ''

        for (const item of menuItems) {
            if (item.children) {
                for (const subItem of item.children) {
                    if (subItem.key === newVal[newVal.length - 1]) {
                        routerPath = subItem.title;
                        break; // Прерываем цикл, так как мы уже нашли соответствие
                    }
                }
            } else {
                if (item.key === newVal[newVal.length - 1]) {
                    routerPath = item.title;
                    break; // Прерываем цикл, так как мы уже нашли соответствие
                }
            }
        }

        router.push({name : routerPath})
    };

    watch(() => menu.selectedKeys, (newVal) => {
        updateOpenKeys(newVal)
    });

    return {
        menu,
        menuItems
    };
});
