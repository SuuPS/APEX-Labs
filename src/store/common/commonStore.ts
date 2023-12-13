import { defineStore } from 'pinia';
import {reactive, ref, computed} from 'vue';
import {CustomColumn, DataItem, DataSources, SoucessColumn} from './commonTypes.ts';
import {UnwrapRef} from "vue";
import {cloneDeep} from "lodash-es";
import {uuid} from "vue-uuid";
export const useCommonStore = defineStore('common', () => {

    const formState = reactive<DataItem>({
        id: uuid.v4(),
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

    const currentDataSource = ref<any>('')

    const dataSources = reactive<DataSources>({
        dialyzer: {
            name: 'Диализатор',
            datas: [
                {
                    id: uuid.v4(),
                    name: 'Диализатор №1',
                },
                {
                    id: uuid.v4(),
                    name: 'Диализатор №2',
                },
                {
                    id: uuid.v4(),
                    name: 'Диализатор №3',
                }
            ]
        },
        concentrator: {
            name: 'Концентратор',
            datas: [
                {
                    id: uuid.v4(),
                    name: 'Концентратор №1',
                },
                {
                    id: uuid.v4(),
                    name: 'Концентратор №2',
                },
                {
                    id: uuid.v4(),
                    name: 'Концентратор №3',
                }
            ]
        },
        spineType: {
            name: 'Лекарственные препараты',
            datas: [
                {
                    id: uuid.v4(),
                    name: 'Игла размер №1',
                },
                {
                    id: uuid.v4(),
                    name: 'Игла размер №2',
                },
                {
                    id: uuid.v4(),
                    name: 'Игла размер №3',
                },
                {
                    id: uuid.v4(),
                    name: 'Игла размер №4',
                }
            ]
        },
        spine: {
            name: 'Справочник иглы',
            datas: [
                {
                    id: uuid.v4(),
                    name: 'Венозные',
                },
                {
                    id: uuid.v4(),
                    name: 'Артериальные',
                }
            ]
        },
        catheter: {
            name: 'Справочник катетеры',
            datas: [
                {
                    id: uuid.v4(),
                    name: 'Катетер Фолея',
                },
                {
                    id: uuid.v4(),
                    name: 'Катетер Малеко',
                },
                {
                    id: uuid.v4(),
                    name: 'Катетер Пеццера',
                },
                {
                    id: uuid.v4(),
                    name: 'Катетер Тиманна',
                },
                {
                    id: uuid.v4(),
                    name: 'Катетер Нелатона',
                }
            ]
        },
        bicarbonate: {
            name: 'Справочник бикарбонат',
            datas: [
                {
                    id: uuid.v4(),
                    name: 'граммов',
                },
                {
                    id: uuid.v4(),
                    name: 'литров',
                }
            ]
        },
        medicinalProducts: {
            name: 'Справочник лекарственные препараты',
            datas: [
                {
                    id: uuid.v4(),
                    name: 'Лекарственный препарат №1',
                },
                {
                    id: uuid.v4(),
                    name: 'Лекарственный препарат №2',
                },
                {
                    id: uuid.v4(),
                    name: 'Лекарственный препарат №3',
                },
                {
                    id: uuid.v4(),
                    name: 'Лекарственный препарат №4',
                }
            ]
        },
        receptionPath: {
            name: 'Справочник путь приема',
            datas: [
                {
                    id: uuid.v4(),
                    name: 'Перорально',
                },
                {
                    id: uuid.v4(),
                    name: 'Подкожно',
                },
                {
                    id: uuid.v4(),
                    name: 'Аретериально',
                }
            ]
        },
        doses: {
            name: 'Справочник дозы препаратов',
            datas: [
                {
                    id: uuid.v4(),
                    name: 'мкг',
                },
                {
                    id: uuid.v4(),
                    name: 'мл',
                },
                {
                    id: uuid.v4(),
                    name: 'мг/кг',
                }
            ]
        },
        frequencyAdmission: {
            name: 'Справочник кратность приема',
            datas: [
                {
                    id: uuid.v4(),
                    name: '1 раз в день',
                },
                {
                    id: uuid.v4(),
                    name: '2 раза в день',
                },
                {
                    id: uuid.v4(),
                    name: '3 раза в день',
                }
            ]
        }
    });

    const search = ref<string>('');

    const getTitle = computed(()=>{
            const currentArray:SoucessColumn = dataSources[currentDataSource.value];

            if (currentArray) {
                return currentArray.name;
            } else {
                return ''
            }
    })

    const setCurrentDataSource = (id: string | null) => {
        currentDataSource.value = id
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
            currentArray.datas.push({
                id: uuid.v4(),
                name: item.name,
            });
        }
    };

    const edit = (id: string) => {
        editableData[id] = cloneDeep(dataSources[currentDataSource.value].datas.filter(item => id === item.id)[0]);
    };
    const save = (id: string) => {
        Object.assign(dataSources[currentDataSource.value].datas.filter(item => id === item.id)[0], editableData[id]);
        delete editableData[id];
    };
    const cancel = (id: string) => {
        delete editableData[id];
    };
    const deleteRow = (id: string) => {
        const index = dataSources[currentDataSource.value].datas.findIndex(item => item.id === id);
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
