import {defineStore} from 'pinia';
import {FormType, InjectionType, SoftType, TableItem} from './appointmentTypes.ts'
import type {TableColumnsType} from 'ant-design-vue';
import {reactive} from "vue";
import {useRoute, useRouter} from 'vue-router';
import {uuid} from "vue-uuid";
import {DataItem} from ".//src/store/common/commonTypes.ts";

export const useAppointmentStore = defineStore('appointment', () => {

    const route = useRoute();
    const router = useRouter();

    const columns: TableColumnsType = [
        { title: 'Column 1', dataIndex: 'address', key: '1', width: 150 },
        { title: 'Column 2', dataIndex: 'address', key: '2', width: 150 },
        { title: 'Column 3', dataIndex: 'address', key: '3', width: 150 },
        { title: 'Column 4', dataIndex: 'address', key: '4', width: 150 },
        { title: 'Column 5', dataIndex: 'address', key: '5', width: 150 },
        { title: 'Column 6', dataIndex: 'address', key: '6', width: 150 },
        { title: 'Column 7', dataIndex: 'address', key: '7', width: 150 },
        { title: 'Column 8', dataIndex: 'address', key: '8' },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: 100,
        },
    ];

    const data = reactive<TableItem[]>([]);

    const formState = reactive<FormType>({
        id: uuid.v4(),
        softType: SoftType.HD,
        dialyzer: { id: uuid.v4(), name: ''},
        concentrator: { id: uuid.v4(), name: ''},
        concentratorVolume: 0,
        injectionType: InjectionType.Spine,
        spine: { id: uuid.v4(), name: ''},
        catheter: { id: uuid.v4(), name: ''},
    });

    for (let i = 0; i < 100; i++) {
        data.push({
            key: i,
            name: `Edrward ${i}`,
            age: 32,
            address: `London Park no. ${i}`,
        });
    }

    const setDataIttem = (inputField: string, dataItem: DataItem) => {
        formState[inputField].id = dataItem.id
        formState[inputField].name = dataItem.name
    }

    const add = () => {
        router.push({name : 'AppointmentForm'})
    }

    return {
        columns,
        data,
        formState,
        add,
        setDataIttem
    };
});
