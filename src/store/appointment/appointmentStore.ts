import {defineStore} from 'pinia';
import {FormType, InjectionType, sessionItemsType, sessionTableType, SoftType, TableItem} from './appointmentTypes.ts'
import {BgColorsOutlined, ColumnWidthOutlined, ExperimentOutlined, FundProjectionScreenOutlined, ToolOutlined} from '@ant-design/icons-vue'
import {reactive, h} from "vue";
import {useRouter} from 'vue-router';
import {uuid} from "vue-uuid";
import {DataItem} from "../common/commonTypes.ts";
import {message} from "ant-design-vue";
import dayjs, {Dayjs} from 'dayjs';
import {UserType, useUserStore} from "../user/userStore.ts";

export const useAppointmentStore = defineStore('appointment', () => {

    const appointmentDatas = reactive<FormType[]>([]);

    const newFormState = (): FormState => {
        return {
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
            createdSession: {},
            medicinalProduct: { id: uuid.v4(), name: ''},
            receptionPath: { id: uuid.v4(), name: ''},
            doses: { id: uuid.v4(), name: ''},
            sessionCount: [],
            sessionDateStart: dayjs(),
            sessionDateEnd: dayjs().add(1, 'day'),
            sessionTableResult: [],
            TreatmentMedicinalProduct: { id: uuid.v4(), name: ''},
            TreatmentReceptionPath: { id: uuid.v4(), name: ''},
            TreatmentDoses: { id: uuid.v4(), name: ''},
            TreatmentReceptionCount: { id: uuid.v4(), name: ''},
            TreatmentSessionDateStart: dayjs(),
            TreatmentSessionDateEnd: dayjs().add(1, 'day'),
            TreatmentReport: [],
            recommendationValue: '',
            recommendations: [],
            dateAppointment: dayjs(),
            doctor: useUserStore().user
        }
    }

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
        createdSession: {},
        medicinalProduct: { id: uuid.v4(), name: ''},
        receptionPath: { id: uuid.v4(), name: ''},
        doses: { id: uuid.v4(), name: ''},
        sessionCount: [],
        sessionDateStart: dayjs(),
        sessionDateEnd: dayjs().add(1, 'day'),
        sessionTableResult: [],
        TreatmentMedicinalProduct: { id: uuid.v4(), name: ''},
        TreatmentReceptionPath: { id: uuid.v4(), name: ''},
        TreatmentDoses: { id: uuid.v4(), name: ''},
        TreatmentReceptionCount: { id: uuid.v4(), name: ''},
        TreatmentSessionDateStart: dayjs(),
        TreatmentSessionDateEnd: dayjs().add(1, 'day'),
        TreatmentReport: [],
        recommendationValue: '',
        recommendations: [],
        dateAppointment: dayjs(),
        doctor: useUserStore().user
    });

    const createdSession = () => {

        let date:sessionItemsType = {
            softType: { component: () => h(FundProjectionScreenOutlined), title: 'Программа аппарата', text: '' },
            dialyzer: { component: () => h(ColumnWidthOutlined), title: 'Диализатор', text: '' },
            concentrator: { component: () => h(BgColorsOutlined), title: 'Концентратор', text: '' },
            spineCatheter: { component: () => h(ToolOutlined), title: 'Игла/Катетер', text: '' },
            bicarbonate: { component: () => h(ExperimentOutlined), title: 'Бикарбонат', text: '' },
            anticoagulation: { component: () => h(ExperimentOutlined), title: 'Антикоагуляция', text: '' },
            anticoagulationVolume: { component: () => h(ExperimentOutlined), title: 'Сухой Вес пациента', text: '' }
        }

        if (formState.dialyzer.name === '') {
            message.error('Выберите диализатор', 10);
            return;
        }
        else {
            date.dialyzer.text = formState.dialyzer.name
        }

        if (formState.concentrator.name === '') {
            message.error('Выберите концентратор', 10);
            return;
        }
        else {
            date.concentrator.text = formState.concentrator.name
        }

        if (formState.injectionType === InjectionType.Spine) {
            if (formState.spineType.name === '' && formState.spine.name === '') {
                message.error('Выберите иглу и тип иглы', 10);
                return;
            }
            else {
                date.spineCatheter.text = formState.spineType.name + '- ' + formState.spine.name
            }
        }
        else {
            if (formState.catheterType.name === '' && formState.catheter.name === '') {
                message.error('Выберите катетер и тип катетер', 10);
                return;
            }
            else {
                date.spineCatheter.text = formState.catheterType.name + '-' + formState.catheter.name
            }
        }

        if (formState.bicarbonate.name === '') {
            message.error('Выберите Бикарбонат', 10);
            return;
        }
        else {
            date.bicarbonate.text = formState.bicarbonate.name
        }

        if (formState.anticoagulation === '') {
            message.error('Введите Антикоагуляция', 10);
            return;
        }
        else {
            date.anticoagulation.text = formState.anticoagulation
        }

        date.anticoagulationVolume.text = formState.anticoagulation.toString()


        message.success('Сеанс гемодиализа назначен', 10);

        formState.createdSession = {...date}

    }

    // setDataIttem функция для присвоения значения из списка модального окна в в поле formState
    const setDataIttem = (inputField: string, dataItem: DataItem) => {
        if(formState[inputField]){
            formState[inputField].id = dataItem.id
            formState[inputField].name = dataItem.name
        }
    }
    const checkSessionCount = (sessionCount: number) => {
        return formState.sessionCount.includes(sessionCount);
    }

    const changeSessionCount = (sessionCount: number) => {
        if (checkSessionCount(sessionCount)) {
            formState.sessionCount = formState.sessionCount.filter(item => item !== sessionCount);
        } else {
            formState.sessionCount.push(sessionCount);
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

    const treatmentReportSave = () => {

        let report:string = ''

        if (formState.TreatmentMedicinalProduct.name === '') {
            message.error('Выберите лекарственный препарат', 10);
            return;
        }
        else {
            report += formState.TreatmentMedicinalProduct.name + ' - '
        }

        if (formState.TreatmentReceptionPath.name === '') {
            message.error('Выберите путь приёма', 10);
            return;
        }
        else {
            report += formState.TreatmentReceptionPath.name + ' - '
        }

        if (formState.TreatmentDoses.name === '') {
            message.error('Выберите дозу', 10);
            return;
        }
        else {
            report += formState.TreatmentDoses.name + ' - '
        }

        if (formState.TreatmentReceptionCount.name === '') {
            message.error('Выберите кратность приема', 10);
            return;
        }
        else {
            report += formState.TreatmentReceptionCount.name + ' - '
        }

        report += `с ${formState.sessionDateStart.format('DD-MM-YYYY')} по ${report = formState.sessionDateEnd.format('DD-MM-YYYY')} -`
        report += formState.sessionDateEnd.diff(formState.sessionDateStart, 'days').toString()
        message.success('Лечение  сформированы', 10);

        formState.TreatmentReport.push(report)
    }

    const delSessionTable = (index: number) => {
        if (formState.sessionTableResult.length > 0) {
            formState.sessionTableResult.splice(index, 1);
        }
    }

    const newRecomendation = () => {
        if (formState.recommendationValue !== '') {
            formState.recommendations.push(formState.recommendationValue)
        }
    }

    const save = () => {
        appointmentDatas.push()
    }

    return {
        save,
        appointmentDatas,
        formState,
        setDataIttem,
        changeSessionCount,
        addSessionTable,
        delSessionTable,
        checkSessionCount,
        createdSession,
        treatmentReportSave,
        newRecomendation
    };
});
