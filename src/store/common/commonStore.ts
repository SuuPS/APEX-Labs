import { defineStore } from 'pinia';
import {reactive, ref, computed} from 'vue';
import { CustomColumn, DataItem, DataSources } from './commonTypes.ts';
import {UnwrapRef} from "vue";
import {cloneDeep} from "lodash-es";

export const useCommonStore = defineStore('common', () => {

    const formState = reactive<DataItem>({
        key:'',
        name: ''
    });

    const columns: CustomColumn[] = reactive([
        {
            title: 'Название',
            dataIndex: 'name',
            width: '70%',
        },
        {
            title: 'Действия',
            dataIndex: 'operation',
            width: '10%',
        },
    ])

    const currentDataSource = ref<string>('')

    const dataSources = reactive<DataSources>({
        dialyzer: {
            name: 'Диализатор',
            datas: [
                {
                    key: '1',
                    name: 'Диализатор №1',
                },
                {
                    key: '2',
                    name: 'Диализатор №2',
                },
                {
                    key: '3',
                    name: 'Диализатор №3',
                }
            ]
        },
        concentrator: {
            name: 'Концентратор',
            datas: [
                {
                    key: '1',
                    name: 'Концентратор №1',
                },
                {
                    key: '2',
                    name: 'Концентратор №2',
                },
                {
                    key: '3',
                    name: 'Концентратор №3',
                }
            ]
        },
        spineType: {
            name: 'Справочник типы игл',
            datas: [
                {
                    key: '1',
                    name: 'Игла размер №1',
                },
                {
                    key: '2',
                    name: 'Игла размер №2',
                },
                {
                    key: '3',
                    name: 'Игла размер №3',
                },
                {
                    key: '4',
                    name: 'Игла размер №4',
                }
            ]
        },
        spine: {
            name: 'Справочник иглы',
            datas: [
                {
                    key: '1',
                    name: 'Венозные',
                },
                {
                    key: '2',
                    name: 'Артериальные',
                }
            ]
        },
        catheter: {
            name: 'Справочник катетеры',
            datas: [
                {
                    key: '1',
                    name: 'Катетер Фолея',
                },
                {
                    key: '2',
                    name: 'Катетер Малеко',
                },
                {
                    key: '2',
                    name: 'Катетер Пеццера',
                },
                {
                    key: '2',
                    name: 'Катетер Тиманна',
                },
                {
                    key: '2',
                    name: 'Катетер Нелатона',
                }
            ]
        },
        bicarbonate: {
            name: 'Справочник бикарбонат',
            datas: [
                {
                    key: '1',
                    name: 'граммов',
                },
                {
                    key: '2',
                    name: 'литров',
                }
            ]
        },
        medicinalProducts: {
            name: 'Справочник лекарственные препараты',
            datas: [
                {
                    key: '1',
                    name: 'Лекарственный препарат №1',
                },
                {
                    key: '2',
                    name: 'Лекарственный препарат №2',
                },
                {
                    key: '3',
                    name: 'Лекарственный препарат №3',
                },
                {
                    key: '4',
                    name: 'Лекарственный препарат №4',
                }
            ]
        },
        receptionPath: {
            name: 'Справочник путь приема',
            datas: [
                {
                    key: '1',
                    name: 'Перорально',
                },
                {
                    key: '2',
                    name: 'Подкожно',
                },
                {
                    key: '2',
                    name: 'Аретериально',
                }
            ]
        },
        doses: {
            name: 'Справочник дозы препаратов',
            datas: [
                {
                    key: '1',
                    name: 'мкг',
                },
                {
                    key: '2',
                    name: 'мл',
                },
                {
                    key: '2',
                    name: 'мг/кг',
                }
            ]
        },
        frequencyAdmission: {
            name: 'Справочник кратность приема',
            datas: [
                {
                    key: '1',
                    name: '1 раз в день',
                },
                {
                    key: '2',
                    name: '2 раза в день',
                },
                {
                    key: '2',
                    name: '3 раза в день',
                }
            ]
        }
    });

    const search = ref<string>('');

    const getTitle = computed(()=>{
            const currentArray = dataSources[currentDataSource.value];

            if (currentArray) {
                return currentArray.name;
            } else {
                return ''
            }
    })

    const setCurrentDataSource = (key: string | null | LocationQueryValue[]) => {
        currentDataSource.value = key
    }

    const filteredDataSource = computed(() => {
        if(currentDataSource.value !== ''){
            const searchQuery = search.value.toLowerCase();
            const currentArray = dataSources[currentDataSource.value].datas;

            if (currentArray) {
                return currentArray.filter(item => item.name.toLowerCase().includes(searchQuery));
            } else {
                return [] as any[];;
            }
        }
        else {
            return [] as any[];
        }
    })

    const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});

    const add = (item: DataItem) => {
        const currentArray = dataSources[currentDataSource.value];

        if (currentArray && currentArray.datas) {
            const lastItem = currentArray.datas[currentArray.datas.length - 1];
            const newKey = lastItem ? Number(lastItem.key) + 1 : 1;

            currentArray.datas.push({
                key: newKey.toString(),
                name: item.name,
            });
        }
    };

    const edit = (key: string) => {
        editableData[key] = cloneDeep(dataSources[currentDataSource.value].datas.filter(item => key === item.key)[0]);
    };
    const save = (key: string) => {
        Object.assign(dataSources[currentDataSource.value].datas.filter(item => key === item.key)[0], editableData[key]);
        delete editableData[key];
    };
    const cancel = (key: string) => {
        delete editableData[key];
    };
    const deleteRow = (key: string) => {
        const index = dataSources[currentDataSource.value].datas.findIndex(item => item.key === key);
        if (index !== -1) {
            dataSources[currentDataSource.value].datas.splice(index, 1);
        }
    };

    return {
        currentDataSource,
        filteredDataSource,
        search,
        formState,
        columns,
        getTitle,
        dataSources,
        editableData,
        setCurrentDataSource,
        add,
        edit,
        save,
        cancel,
        deleteRow
    };
});
