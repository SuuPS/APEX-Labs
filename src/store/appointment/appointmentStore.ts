import {defineStore} from 'pinia';
import {FormType, InjectionType, sessionTableType, SoftType, TableItem} from './appointmentTypes.ts'
import type {TableColumnsType} from 'ant-design-vue';
import {reactive} from "vue";
import {useRouter} from 'vue-router';
import {uuid} from "vue-uuid";
import {DataItem} from "../common/commonTypes.ts";
import {message} from "ant-design-vue";
import dayjs, { Dayjs } from 'dayjs';

export const useAppointmentStore = defineStore('appointment', () => {

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
        spineType: { id: uuid.v4(), name: '' },
        spine: { id: uuid.v4(), name: ''},
        catheterType: { id: uuid.v4(), name: ''},
        catheter: { id: uuid.v4(), name: ''},
        bicarbonate: { id: uuid.v4(), name: ''},
        patientWeight: 0,
        anticoagulation: '',
        anticoagulationVolume: 0,
        createdSession: false,
        medicinalProduct: { id: uuid.v4(), name: ''},
        receptionPath: { id: uuid.v4(), name: ''},
        doses: { id: uuid.v4(), name: ''},
        sessionCount: [],
        sessionDateStart: dayjs(),
        sessionDateEnd: dayjs().add(1, 'day'),
        sessionTableResult: []
    });

    const createdSession = () => {
        formState.createdSession = true;
        message.success('Сеанс гемодиализа назначен', 10);
    }

    // setDataIttem функция для присвоения значения из списка модального окна в в поле formState
    const setDataIttem = (inputField: string, dataItem: DataItem) => {
        if(formState[inputField]){
            formState[inputField].id = dataItem.id
            formState[inputField].name = dataItem.name
        }
    }

    const checkSessionCount = (sessionCount: number) => {
        return formState.sessionCount.includes(sessionCount) ? true : false
    }
    const changeSessionCount = (sessionCount: number) => {
        if (checkSessionCount(sessionCount)){
            formState.sessionCount.splice(sessionCount - 1, 1);
        }
        else {
            formState.sessionCount.push(sessionCount)
        }
    }

    const addSessionTable = () => {

        let sessionTable:sessionTableType = {
            medicinalProduct: '',
            receptionPath: '',
            doses: '',
            sessionCount: '',
            sessionDateStart: '',
            sessionDateEnd: '',
            days: ''
        }

        if (formState.medicinalProduct.name === '') {
            message.error('Выберите лекарственный препарат', 10);
            return;
        }
        else {
            sessionTable.medicinalProduct = formState.medicinalProduct.name
        }

        if (formState.receptionPath.name === '') {
            message.error('Выберите путь приема', 10);
            return;
        }
        else {
            sessionTable.receptionPath = formState.receptionPath.name
        }

        if (formState.doses.name === '') {
            message.error('Выберите дозу', 10);
            return;
        }
        else {
            sessionTable.doses = formState.doses.name
        }

        if (formState.sessionCount.length > 0) {
            sessionTable.sessionCount = formState.sessionCount.map(item => item).join(',')
        } else {
            message.error('Выберите номер сеансов', 10);
            return;
        }

        sessionTable.sessionDateStart = formState.sessionDateStart.format('DD-MM-YYYY')
        sessionTable.sessionDateEnd = formState.sessionDateEnd.format('DD-MM-YYYY')
        sessionTable.days = formState.sessionDateEnd.diff(formState.sessionDateStart, 'days').toString()
        message.success('Назначения после сеанса сформированы', 10);

        formState.sessionTableResult.push(sessionTable)
    }

    const delSessionTable = (index: number) => {
        if (formState.sessionTableResult.length > 0) {
            formState.sessionTableResult.splice(index, 1);
        }
    }

    const add = () => {
        router.push({name : 'AppointmentForm'})
    }

    return {
        columns,
        data,
        formState,
        add,
        setDataIttem,
        changeSessionCount,
        addSessionTable,
        delSessionTable,
        checkSessionCount,
        createdSession
    };
});
