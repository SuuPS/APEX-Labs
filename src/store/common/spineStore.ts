import { defineStore } from 'pinia';
import {reactive, ref, computed} from 'vue';
import { CustomColumn, DataItem } from './spineTypes.ts';
import {UnwrapRef} from "vue";
import {cloneDeep} from "lodash-es";

export const useSpineStore = defineStore('spine', () => {

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

    const dataSource = ref<DataItem[]>([
        {
            key: '1',
            name: 'Венозные',
        },
        {
            key: '2',
            name: 'Артериальные',
        }
    ]);

    const value = ref<string>('');

    const filteredDataSource = computed(() => {
        const searchQuery = value.value.toLowerCase();
        return dataSource.value.filter(item => item.name.toLowerCase().includes(searchQuery));
    });

    const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});

    const add = (item: DataItem) => {
        dataSource.value.push({
            key: Number(dataSource.value[dataSource.value.length - 1].key) + 1 + '',
            name: item.name,
        })
    }
    const edit = (key: string) => {
        editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
    };
    const save = (key: string) => {
        Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
        delete editableData[key];
    };
    const cancel = (key: string) => {
        delete editableData[key];
    };
    const deleteRow = (key: string) => {
        dataSource.value = dataSource.value.filter(item => item.key !== key);
    };

    return {
        filteredDataSource,
        value,
        formState,
        columns,
        dataSource,
        editableData,
        add,
        edit,
        save,
        cancel,
        deleteRow,
    };
});
