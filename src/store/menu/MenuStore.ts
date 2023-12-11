
import { defineStore } from 'pinia';
import {h, watch, reactive, ref, Ref, computed} from 'vue';
import { MailOutlined } from '@ant-design/icons-vue';
import { MenuItem, MenuState } from './menuTypes.ts';
import { useRouter, useRoute } from 'vue-router';

export const useMenuStore = defineStore('menu', () => {
    const route = useRoute();
    const router = useRouter();

    const pageName = computed( () => route.query.page )

    const loading: Ref<boolean> = ref(false)

    const menuItems = reactive<MenuItem[]>([
        {
            key: 'sub1',
            icon: () => h(MailOutlined),
            label: 'Справочники',
            title: 'Navigation One',
            name: 'h3',
            children: [
                {
                    key: '1',
                    label: 'Типы игл',
                    title: 'common',
                    name: 'spineType',
                    options: true
                },
                {
                    key: '2',
                    label: 'Иглы',
                    title: 'common',
                    name: 'spine',
                    options: true
                },
                {
                    key: '3',
                    label: 'Катетеры',
                    title: 'common',
                    name: 'catheter',
                    options: true
                },
                {
                    key: '4',
                    label: 'Бикарбонат',
                    title: 'common',
                    name: 'bicarbonate',
                    options: false
                },
                {
                    key: '5',
                    label: 'Лекарственные препараты',
                    title: 'common',
                    name: 'medicinalProducts',
                    options: true
                },
                {
                    key: '6',
                    label: 'Путь приема',
                    title: 'common',
                    name: 'receptionPath',
                    options: false
                },
                {
                    key: '7',
                    label: 'Дозы препаратов',
                    title: 'common',
                    name: 'doses',
                    options: false
                },
                {
                    key: '8',
                    label: 'Кратность приема',
                    title: 'common',
                    name: 'frequencyAdmission',
                    options: false
                }
            ],
            options: false
        },
        {
            key: '9',
            icon: () => h(MailOutlined),
            label: 'Назначения',
            title: 'AppointmentList',
            name: 'AppointmentList',
            options: false
        },
    ])

    const selectedPage = computed(() => {
        if(pageName){
            for (const item of menuItems) {
                if (item.children) {
                    if(item.children.find(subItem => subItem.name === pageName.value)) {
                        return item.children.find(subItem => subItem.name === pageName.value)
                    }
                    else {
                        return null
                    }
                } else {
                    if (item.name === pageName.value) {
                        return item
                    }
                    else {
                        return null
                    }
                }
            }
        }
    });

    const menu = reactive<MenuState>(<MenuState>{
        collapsed: false,
        selectedKeys: selectedPage ? [selectedPage.value?.key] : ['1'],
        openKeys: ['sub1'],
        preOpenKeys: ['sub1'],
    })

    const updateOpenKeys = (newVal: string[]) => {

        loading.value = true

        menu.openKeys = newVal;

        let routerPath: any

        for (const item of menuItems) {
            if (item.children) {
                for (const subItem of item.children) {
                    if (subItem.key === newVal[newVal.length - 1]) {
                        routerPath = subItem;
                        break
                    }
                }
            } else {
                if (item.key === newVal[newVal.length - 1]) {
                    routerPath = item;
                    break
                }
            }
        }

        router.push({
            name : routerPath.title,
            query: !routerPath.children ? { page: routerPath.name } : {}
        })

        loading.value = false
    };

    watch(() => menu.selectedKeys, (newVal) => {
        updateOpenKeys(newVal)
    });

    return {
        pageName,
        selectedPage,
        menu,
        menuItems,
        loading
    };
});
